import { API_URL } from "../store/firebase-store";

export const deleteCard = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/cardList/${id}.json`, {
    method: "DELETE",
  });
};
