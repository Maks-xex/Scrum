import { DATABASE_URL } from "../store/firebase-store";
import { ICard } from "../types";

export const updateCardTitle = async (
  data: Omit<ICard, "id">,
  id: string
): Promise<void> => {
  if (data.body)
    Object.fromEntries(
      data.body.map((body) => [
        body.id,
        { img: body.img, title: body.title, order: body.order },
      ])
    );
  if (!DATABASE_URL) return;
  await fetch(`${DATABASE_URL}/cardList/${id}.json`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
