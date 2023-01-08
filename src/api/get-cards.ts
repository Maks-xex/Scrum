import { ICard } from "../types";
import { API_URL } from "./constants";

type Response = Record<string, Omit<ICard, "id">>;

export const getCards = async (): Promise<ICard[]> => {
  const response = await fetch(`${API_URL}/cardList.json`);
  const data = (await response.json()) as Response;

  return (
    data && Object.entries(data).map(([id, values]) => ({ id, ...values }))
  );
};
