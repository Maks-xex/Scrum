import { API_URL } from "./constants";

export interface CreateCardInput {
  title: string;
}

export const createCard = async (body: CreateCardInput): Promise<void> => {
  await fetch(`${API_URL}/cardList.json`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
