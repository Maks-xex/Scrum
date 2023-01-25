import React from "react";

import ScrollContainer from "react-indiana-drag-scroll";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";

import { reorder } from "../../../utils/reorder";

import { updateCardBody } from "../../../api/update-card-body";

import { Card } from "../../../components/Card/Card";
import { StrictModeDroppable } from "../../../components/StrictModeDroppable/StrictModeDroppable";

import { ICard, ICardBody } from "../../../types";

interface MainProps {
  cards: ICard[];
  children: JSX.Element;
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}

export const Main: React.FC<MainProps> = ({ cards, setCards, children }) => {
  const onDragEnd = (result: DropResult): void => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const home = cards.find((card) => card.id === source.droppableId);
    const foreign = cards.find((card) => card.id === destination.droppableId);
    let newState: ICard[] = [];

    if (type === "column") {
      const card = reorder<ICard>(cards, source.index, destination.index).map(
        (card, i) => ({ ...card, order: i })
      );
      newState = card;
    }
    // move to the same card
    if (home === foreign && home?.body) {
      const cardBody = reorder<ICardBody>(
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
    setCards(newState);
    void updateCardBody(newState);
  };

  const renderCards = (): JSX.Element => (
    <>
      {cards
        .sort((a, b) => a.order - b.order)
        .map((card, i) => (
          <Draggable draggableId={card.id} index={i} key={card.id}>
            {(provide) => (
              <div
                className="h-fit"
                ref={provide.innerRef}
                {...provide.draggableProps}
                {...provide.dragHandleProps}
              >
                <Card title={card.title} id={card.id} body={card.body} />
              </div>
            )}
          </Draggable>
        ))}
    </>
  );

  return (
    <main className="pt-[70px] px-[20px] flex flex-nowrap flex-row">
      <ScrollContainer
        className="flex overflow-x-auto"
        ignoreElements="div[role=button]"
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <StrictModeDroppable
            type="column"
            droppableId="cardList"
            direction="horizontal"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex gap-4 mx-[20px]"
              >
                {cards && renderCards()}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
        {children}
      </ScrollContainer>
    </main>
  );
};
