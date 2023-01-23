import React from "react";

import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";

import { Card } from "../../../components/Card/Card";
import { StrictModeDroppable } from "../../../components/StrictModeDroppable/StrictModeDroppable";

import { ICard } from "../../../types";
import ScrollContainer from "react-indiana-drag-scroll";
import { reorder } from "../../../utils/reorder";
import { updateCard } from "../../../api/update-card";

interface MainProps {
  cards: ICard[];
  children: JSX.Element;
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
}

export const Main: React.FC<MainProps> = ({ cards, setCards, children }) => {
  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    const card = reorder<ICard>(
      cards,
      result.source.index,
      result.destination.index
    ).map((card, i) => ({ ...card, order: i }));
    setCards(card);
    void updateCard(card);
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
                {...provide.dragHandleProps}
                {...provide.draggableProps}
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
          <StrictModeDroppable droppableId="cardList" direction="horizontal">
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
