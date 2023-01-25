import { DATABASE_URL } from "../store/firebase-store";
import { ICard } from "../types";

export const updateCardBody = async (data: ICard[]): Promise<void> => {
  const obj = Object.fromEntries(
    data.map((card, i) => {
      let body;
      if (card.body) {
        body = {
          ...Object.fromEntries(
            card.body.map((body, i) => [
              body.id,
              { img: body.img, title: body.title },
            ])
          ),
        };
      }
      return [
        card.id,
        {
          title: card.title,
          body,
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
