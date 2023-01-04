import React, { useRef, useState } from "react";
import { useQueryClient } from "react-query";

import { createCardBody } from "../../api/create-card-body";

import { TextArea } from "../TextArea/TextArea";
import { Button } from "../Button/Button";
import { ContextMenu, Handlers } from "../ContextMenu/ContextMenu";
import { CreateCardForm, Inputs } from "../CreateCardForm/CreateCardForm";

import { ICardBody } from "../../types";

import classes from "./card.module.scss";

type CardBody = Record<string, Omit<ICardBody, "id">>;

interface CardListProps {
  title: string;
  body?: ICardBody[];
  id: string;
  onClick: Function;
}

export const Card: React.FC<CardListProps> = ({ title, body, id, onClick }) => {
  const queryClient = useQueryClient();
  const handleContextMenu = useRef<Handlers["setIsOpen"]>();
  const contextMenu = useRef<Handlers["isOpen"]>();
  const [isVissible, setIsVissible] = useState(false);

  const createCardBodyHandler = async (data: Inputs): Promise<void> => {
    await createCardBody(data, id);
    void queryClient.invalidateQueries("cards");
    setIsVissible(false);
  };

  const renderCardBody = (): JSX.Element => {
    const data: ICardBody[] = Object.entries(body as unknown as CardBody).map(([id, value]) => ({
      id,
      ...value,
    }));
    return (
      <div className={classes.card__main}>
        <ul>
          {data.map((cardBody) => (
            <li key={cardBody.id}>{cardBody.title}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={classes.card}>
      <div className={classes.card__header}>
        <h2 className="hidden">{title}</h2>
        <TextArea defaultValue={title} className={classes.card__title} autoSize />
        <Button
          className={classes.card__configButon}
          onClick={() => handleContextMenu.current?.(!contextMenu.current)}
        >
          <>
            <span></span>
            <span></span>
            <span></span>
          </>
        </Button>
        <ContextMenu
          handlers={({ setIsOpen, isOpen }) => {
            handleContextMenu.current = setIsOpen;
            contextMenu.current = isOpen;
          }}
        >
          <>
            <li onClick={() => onClick(id)}>delete</li>
            <li>Set</li>
          </>
        </ContextMenu>
      </div>
      {body && renderCardBody()}
      <div className={classes.card__footer}>
        <Button className={classes.cardFooter__addCard} onClick={() => setIsVissible(true)}>
          <>
            <span className="mr-2 text-3xl">+</span>Add card
          </>
        </Button>
        {isVissible && (
          <CreateCardForm
            addButton={false}
            className="absolute p-0 rounded"
            onSubmit={createCardBodyHandler}
          />
        )}
        <Button
          className={classes.cardFooter__addFile}
          onClick={(evt) => console.log(evt.currentTarget)}
        >
          <i className="fal fa-image text-[#4E4E4E] hover:text-[#2148d9]"></i>
        </Button>
      </div>
    </div>
  );
};
