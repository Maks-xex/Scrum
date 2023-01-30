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
import { Error } from "../../components/Error/Error";

import { ICard } from "../../types";

import classes from "./index.module.scss";

export const HomePage: React.FC = () => {
  const queryClient = useQueryClient();
  const handleModal = useRef<Handlers["setIsOpen"]>();
  const [cards, setCards] = useState<ICard[]>([]);

  const { isLoading, isError, error } = useQuery<ICard[], Error>(
    "cards",
    getCards,
    {
      onSuccess(data) {
        setCards(data);
      },
    }
  );

  const onSubmitFormHandler = async (data: Inputs): Promise<void> => {
    handleModal.current?.(false);
    await createCard(data);
    void queryClient.invalidateQueries("cards");
  };

  return (
    <>
      {isError && (
        <Error error={error}>
          <h4>Something went wrong, try to refresh page</h4>
        </Error>
      )}
      {isLoading && <Loader />}
      {!isLoading && !isError && (
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
            <CreateCardForm
              onSubmit={onSubmitFormHandler}
              autoFocus
              inputOption="input"
            />
          </Modal>
        </>
      )}
    </>
  );
};
