import { ICard } from "../types";
import { DATABASE_URL } from "../store/firebase-store";

type Response = Record<string, Omit<ICard, "id">>;

export const getCards = async (): Promise<ICard[]> => {
  if (!DATABASE_URL) return [];
  const response = await fetch(`${DATABASE_URL}/cardList.json`);
  const data = (await response.json()) as Response;

  return (
    data && Object.entries(data).map(([id, values]) => ({ id, ...values }))
  );
};
