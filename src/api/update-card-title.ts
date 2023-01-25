import { DATABASE_URL } from "../store/firebase-store";
import { ICard } from "../types";

export const updateCardTitle = async (
  data: Omit<ICard, "id" | "order">,
  id: string
): Promise<void> => {
  if (!DATABASE_URL) return;
  await fetch(`${DATABASE_URL}/cardList/${id}.json`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
