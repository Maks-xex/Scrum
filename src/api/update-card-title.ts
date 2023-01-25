import { DATABASE_URL } from "../store/firebase-store";

import { Inputs } from "../components/CreateCardForm/CreateCardForm";

export const updateCardTitle = async (
  data: Inputs,
  id: string
): Promise<void> => {
  if (!DATABASE_URL) return;
  await fetch(`${DATABASE_URL}/cardList/${id}.json`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
