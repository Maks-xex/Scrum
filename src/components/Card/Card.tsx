import React, { useRef } from "react";

import { TextArea } from "../TextArea/TextArea";
import { Button } from "../Button/Button";
import { ContextMenu, Handlers } from "../ContextMenu/ContextMenu";

import classes from "./card.module.scss";

interface CardListProps {
  title: string;
  body: string;
  id: string;
  onClick: Function;
}

export const Card: React.FC<CardListProps> = ({ title, body, id, onClick }) => {
  const handleContextMenu = useRef<Handlers["setIsOpen"]>();
  const contextMenu = useRef<Handlers["isOpen"]>();

  return (
    <div className={classes.card}>
      <div className={classes.card__header}>
        <h2 className="hidden">{title}</h2>
        <TextArea
          defaultValue={title}
          className={classes.card__title}
          autoSize
        />
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
      <div className={classes.card__main}>{body}</div>
      <div className={classes.card__footer}>
        <Button
          className={classes.cardFooter__addCard}
          onClick={(evt) => console.log(evt.currentTarget)}
        >
          <>
            <span className="mr-2 text-3xl">+</span>Add card
          </>
        </Button>
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
