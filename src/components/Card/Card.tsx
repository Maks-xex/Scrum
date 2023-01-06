import React, { useState } from "react";
import { useQueryClient } from "react-query";

import { createCardBody } from "../../api/create-card-body";

import { TextArea } from "../TextArea/TextArea";
import { Button } from "../Button/Button";
import { ContextMenu } from "../ContextMenu/ContextMenu";
import { CreateCardForm, Inputs } from "../CreateCardForm/CreateCardForm";

import { ICardBody } from "../../types";

import classes from "./card.module.scss";
import { storage, writeImageUrl } from "../../store/firebase-store";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CardBody } from "../CardBody/CardBody";
import { InputFile } from "../InputFile/InputFile";

interface CardListProps {
  title: string;
  body?: ICardBody[];
  id: string;
  onClick: Function;
}

export const Card: React.FC<CardListProps> = ({ title, body, id, onClick }) => {
  const queryClient = useQueryClient();
  const [isVissible, setIsVissible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleFile = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (!evt.target.files) return;
    const file = evt.target.files[0];
    const storageRef = ref(storage, `/img/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    void getDownloadURL(uploadTask.snapshot.ref).then((url) =>
      writeImageUrl(url, file.name, id, queryClient)
    );
  };

  const createCardBodyHandler = async (data: Inputs): Promise<void> => {
    await createCardBody(data, id);
    void queryClient.invalidateQueries("cards");
    setIsVissible(false);
  };

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
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <>
            <span></span>
            <span></span>
            <span></span>
          </>
        </Button>
        <ContextMenu isOpen={isOpen}>
          <>
            <li onClick={() => onClick(id)}>delete</li>
            <li>Set</li>
          </>
        </ContextMenu>
      </div>
      <CardBody body={body} />
      <div className={classes.card__footer}>
        <Button
          className={classes.cardFooter__addCard}
          onClick={() => setIsVissible(true)}
        >
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
        <InputFile
          id="image"
          classNameLabel={classes.cardFooter__addFile}
          classNameInput="hidden cursor-pointer"
          accept="image/*"
          onChange={handleFile}
        >
          <i className="fal fa-image text-[#4E4E4E] hover:text-[#2148d9] cursor-pointer"></i>
        </InputFile>
      </div>
    </div>
  );
};
