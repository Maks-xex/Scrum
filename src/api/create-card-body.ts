import { Inputs } from "../components/CreateCardForm/CreateCardForm";
import { DATABASE_URL } from "../store/firebase-store";

export const createCardBody = async (
  data: Inputs,
  id: string
): Promise<void> => {
  if (!DATABASE_URL) return;
  await fetch(`${DATABASE_URL}/cardList/${id}/body.json`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
