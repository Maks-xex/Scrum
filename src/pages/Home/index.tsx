import React, { useRef, useState } from "react";

import { useQuery, useQueryClient } from "react-query";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import ScrollContainer from "react-indiana-drag-scroll";

import { getCards } from "../../api/get-cards";
import { createCard } from "../../api/create-card";
import { updateCard } from "../../api/update-card";

import { Loader } from "../../components/Loader/Loader";
import { Button } from "../../components/Button/Button";
import { Handlers, Modal } from "../../components/Modal/Modal";
import { Card } from "../../components/Card/Card";
import {
  CreateCardForm,
  Inputs,
} from "../../components/CreateCardForm/CreateCardForm";
import { StrictModeDroppable } from "../../components/StrictModeDroppable/StrictModeDroppable";

import { ICard } from "../../types";

import classes from "./index.module.scss";

export const HomePage: React.FC = () => {
  const queryClient = useQueryClient();
  const handleModal = useRef<Handlers["setIsOpen"]>();
  const [cards, setCards] = useState<ICard[]>([]);

  const { isLoading } = useQuery<ICard[]>("cards", getCards, {
    onSuccess(data) {
      setCards(data);
    },
    onError(err) {
      console.log(err);
    },
  });

  const onSubmitFormHandler = async (data: Inputs): Promise<void> => {
    handleModal.current?.(false);
    await createCard(data);
    void queryClient.invalidateQueries("cards");
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

  const reorder = (
    list: ICard[],
    startIndex: number,
    endIndex: number
  ): ICard[] => {
    const arr = Array.from(list);
    const [removed] = arr.splice(startIndex, 1);
    arr.splice(endIndex, 0, removed);
    const result = arr.map((card, i) => ({ ...card, order: i }));

    return result;
  };

  const onDragEnd = (result: DropResult, cards: ICard[]): void => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    const card = reorder(cards, result.source.index, result.destination.index);
    setCards(card);
    void updateCard(card);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="pt-[70px] px-[20px] flex flex-nowrap flex-row">
          <ScrollContainer
            className="flex overflow-x-auto"
            ignoreElements="div[role=button]"
          >
            <DragDropContext onDragEnd={(result) => onDragEnd(result, cards)}>
              <StrictModeDroppable
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
            <Button
              onClick={() => handleModal.current?.(true)}
              className={`${classes.button} min-w-[300px]`}
            >
              Add List
            </Button>
          </ScrollContainer>
          <Modal
            handlers={({ setIsOpen }) => {
              handleModal.current = setIsOpen;
            }}
          >
            <CreateCardForm onSubmit={onSubmitFormHandler} />
          </Modal>
        </main>
      )}
    </>
  );
};
