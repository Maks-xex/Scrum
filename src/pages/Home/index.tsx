import React, { useRef } from "react";
import { useQuery, useQueryClient } from "react-query";

import { getCards } from "../../api/get-cards";
import { createCard } from "../../api/create-card";

import { Button } from "../../components/Button/Button";
import { Handlers, Modal } from "../../components/Modal/Modal";
import { Card } from "../../components/Card/Card";
import {
  CreateCardForm,
  Inputs,
} from "../../components/CreateCardForm/CreateCardForm";

import { ICard } from "../../types";

import classes from "./index.module.scss";

export const HomePage: React.FC = () => {
  const queryClient = useQueryClient();
  const handleModal = useRef<Handlers["setIsOpen"]>();
  const { data: cards = [] } = useQuery<ICard[]>("cards", getCards);

  const onSubmitFormHandler = async (data: Inputs): Promise<void> => {
    handleModal.current?.(false);
    await createCard(data);
    void queryClient.invalidateQueries("cards");
  };

  const renderCards = (): JSX.Element => (
    <>
      {cards.map((card) => (
        <Card key={card.id} title={card.title} id={card.id} body={card.body} />
      ))}
    </>
  );

  return (
    <main className="mt-[50px] max-w-[60%] m-auto flex flex-wrap flex-row gap-4">
      <Modal
        handlers={({ setIsOpen }) => {
          handleModal.current = setIsOpen;
        }}
      >
        <CreateCardForm onSubmit={onSubmitFormHandler} />
      </Modal>
      {cards && renderCards()}
      <Button
        onClick={() => handleModal.current?.(true)}
        className={`${classes.button} min-w-[300px]`}
      >
        Add List
      </Button>
    </main>
  );
};
