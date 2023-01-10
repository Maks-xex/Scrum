import { DATABASE_URL } from "../store/firebase-store";

export const deleteCard = async (id: string): Promise<void> => {
  if (!DATABASE_URL) return;
  await fetch(`${DATABASE_URL}/cardList/${id}.json`, {
    method: "DELETE",
  });
};
