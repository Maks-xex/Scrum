import { DropResult } from "react-beautiful-dnd";
import { reorder } from "./reorder";
// type DragType = "outside" | "inside" | "both" | "fromToAnother";

export const onDrag = <T extends { id: string; body?: K[] }, K>(
  result: DropResult,
  cards: T[]
): T[] | null => {
  const { destination, source, type } = result;

  if (!destination) {
    return null;
  }
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return null;
  }
  const home = cards.find((card) => card.id === source.droppableId);
  const foreign = cards.find((card) => card.id === destination.droppableId);
  let newState: T[] = [];
  if (type === "column") {
    const card = reorder<T>(cards, source.index, destination.index).map(
      (card, i) => ({ ...card, order: i })
    );
    newState = card;
  }

  // move to the same card

  if (home === foreign && home?.body) {
    const cardBody = reorder<K>(
      home?.body,
      source.index,
      destination.index
    ).map((card, i) => ({ ...card, order: i }));
    newState = cards.map((card) => {
      if (card.id === source.droppableId) {
        card.body = cardBody;
      }
      return card;
    });
  }
  // move from one to another card

  if (type === "cardBody" && home?.body) {
    const homeBody = Array.from(home?.body);
    const [removed] = homeBody.splice(source.index, 1);

    if (!foreign?.body && foreign) {
      foreign.body = [];
    }
    if (foreign?.body && home !== foreign) {
      const foreignBody = Array.from(foreign.body);
      foreignBody.splice(destination.index, 0, removed);

      newState = cards.map((card) => {
        if (card.id === source.droppableId) {
          card.body = homeBody.map((card, i) => ({ ...card, order: i }));
        }
        if (card.id === destination.droppableId) {
          card.body = foreignBody.map((card, i) => ({ ...card, order: i }));
        }
        return card;
      });
    }
  }
  return newState;
};
