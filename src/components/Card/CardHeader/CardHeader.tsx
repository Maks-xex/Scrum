import React, { useEffect, useRef, useState } from "react";

import { useQueryClient } from "react-query";

import { deleteCard } from "../../../api/delete-card";
import { updateCardTitle } from "../../../api/update-card-title";

import { Button } from "../../Button/Button";
import { ContextMenu } from "../../ContextMenu/ContextMenu";
import { CreateCardForm, Inputs } from "../../CreateCardForm/CreateCardForm";

import classes from "./card-header.module.scss";
import { ICardBody } from "../../../types";

interface CardHeaderProps {
  title: string;
  body?: ICardBody[];
  id: string;
  order: number;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  id,
  body,
  order,
}) => {
  const [showTextArea, setShowTextArea] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);
  const liRef = useRef(null);

  const queryClient = useQueryClient();
  const onDeleteCardHandler = async (id: string): Promise<void> => {
    await deleteCard(id);
    void queryClient.invalidateQueries("cards");
  };
  const handleClickOutside = (evt: MouseEvent): void => {
    if (evt.target !== btnRef.current && evt.target !== liRef.current)
      setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onClickTitleHandler = (): void => {
    setShowTextArea(true);
  };

  const onSubmitFormHandler = async (data: Inputs): Promise<void> => {
    setShowTextArea(false);
    await updateCardTitle({ ...data, body, order }, id);
    void queryClient.invalidateQueries("cards");
  };

  return (
    <div className={classes.card__header}>
      {!showTextArea ? (
        <h2 className={classes.card__title} onClick={onClickTitleHandler}>
          {title}
        </h2>
      ) : (
        <CreateCardForm
          inputOption="textarea"
          autoSize
          addButton={false}
          className={"p-0 overflow-hidden bg-transparent"}
          classNameInput={classes.card__title}
          onSubmit={onSubmitFormHandler}
          defaultValue={title}
        />
      )}
      <Button
        className={classes.card__configButon}
        onClick={() => setIsOpen((prev) => !prev)}
        ref={btnRef}
      >
        <>
          <span></span>
          <span></span>
          <span></span>
        </>
      </Button>
      <ContextMenu isOpen={isOpen}>
        <>
          <li ref={liRef} onClick={async () => await onDeleteCardHandler(id)}>
            delete
          </li>
          <li>Set</li>
        </>
      </ContextMenu>
    </div>
  );
};
