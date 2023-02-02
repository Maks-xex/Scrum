import { DATABASE_URL } from "../store/firebase-store";

export const deleteCardBody = async (
  cardId: string,
  bodyId: string
): Promise<void> => {
  if (!DATABASE_URL) return;
  await fetch(`${DATABASE_URL}/cardList/${cardId}/body/${bodyId}.json`, {
    method: "DELETE",
  });
};
