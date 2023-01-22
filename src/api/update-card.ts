import { DATABASE_URL } from "../store/firebase-store";
import { ICard } from "../types";

export const updateCard = async (data: ICard[]): Promise<void> => {
  const obj = Object.fromEntries(
    data.map((card, i) => [
      card.id,
      { title: card.title, body: card.body, order: i },
    ])
  );
  if (!DATABASE_URL) return;
  await fetch(`${DATABASE_URL}/cardList.json`, {
    method: "PUT",
    body: JSON.stringify(obj),
  });
};
