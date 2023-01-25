import { DATABASE_URL } from "../store/firebase-store";
import { ICard } from "../types";

export const updateCardBody = async (data: ICard[]): Promise<void> => {
  const obj = Object.fromEntries(
    data.map((card) => {
      let body;
      if (card.body) {
        body = {
          ...Object.fromEntries(
            card.body.map((body) => [
              body.id,
              { img: body.img, title: body.title, order: body.order },
            ])
          ),
        };
      }
      return [
        card.id,
        {
          title: card.title,
          body,
          order: card.order,
        },
      ];
    })
  );
  if (!DATABASE_URL) return;
  await fetch(`${DATABASE_URL}/cardList.json`, {
    method: "PUT",
    body: JSON.stringify(obj),
  });
};
