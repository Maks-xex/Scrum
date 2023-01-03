import { API_URL } from "./constants";

export const deleteCard = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/cardList/${id}.json`, {
    method: "DELETE",
  });
};
