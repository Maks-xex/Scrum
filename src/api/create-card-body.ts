import { Inputs } from "../components/CreateCardForm/CreateCardForm";
import { API_URL } from "./constants";

export const createCardBody = async (
  data: Inputs,
  id: string
): Promise<void> => {
  await fetch(`${API_URL}/cardList/${id}/body.json`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
