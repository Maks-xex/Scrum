import { DATABASE_URL } from "../store/firebase-store";

export interface CreateCardInput {
  title: string;
}

export const createCard = async (card: CreateCardInput): Promise<void> => {
  if (!DATABASE_URL) return;
  await fetch(`${DATABASE_URL}/cardList.json`, {
    method: "POST",
    body: JSON.stringify(card),
  });
};
