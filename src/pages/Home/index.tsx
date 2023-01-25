import React, { useRef, useState } from "react";

import { useQuery, useQueryClient } from "react-query";

import { getCards } from "../../api/get-cards";
import { createCard } from "../../api/create-card";

import { Main } from "./Main/Main";

import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";
import { Handlers, Modal } from "../../components/Modal/Modal";
import {
  CreateCardForm,
  Inputs,
} from "../../components/CreateCardForm/CreateCardForm";

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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Main cards={cards} setCards={setCards}>
            <Button
              onClick={() => handleModal.current?.(true)}
              className={`${classes.button} min-w-[300px]`}
            >
              Add List
            </Button>
          </Main>
          <Modal
            handlers={({ setIsOpen }) => {
              handleModal.current = setIsOpen;
            }}
          >
            <CreateCardForm onSubmit={onSubmitFormHandler} />
          </Modal>
        </>
      )}
    </>
  );
};
