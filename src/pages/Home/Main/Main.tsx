import React from "react";

import ScrollContainer from "react-indiana-drag-scroll";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";

import { onDrag } from "../../../utils/onDrag";

import { updateCard } from "../../../api/update-card";

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
    const newState = onDrag<ICard, ICardBody>(result, cards);
    if (newState) {
      setCards(newState);
      void updateCard(newState);
    }
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
                <Card
                  title={card.title}
                  id={card.id}
                  body={card.body}
                  order={card.order}
                />
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
