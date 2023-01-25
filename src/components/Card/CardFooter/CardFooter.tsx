import React, { useState } from "react";

import { useQueryClient } from "react-query";

import { createCardBody } from "../../../api/create-card-body";

import { Button } from "../../Button/Button";
import { InputFile } from "../../InputFile/InputFile";
import { CreateCardForm, Inputs } from "../../CreateCardForm/CreateCardForm";

import { storage, writeImageUrl } from "../../../store/firebase-store";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import classes from "./card-footer.module.scss";

interface CardFooterProps {
  id: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ id }) => {
  const queryClient = useQueryClient();
  const [isVissible, setIsVissible] = useState(false);

  const createCardBodyHandler = async (data: Inputs): Promise<void> => {
    await createCardBody(data, id);
    void queryClient.invalidateQueries("cards");
    setIsVissible(false);
  };

  const handleFile = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    if (!evt.target.files) return;
    const file = evt.target.files[0];
    const storageRef = ref(storage, `/img/${file.name}`);
    void uploadBytesResumable(storageRef, file).then((snap) => {
      void getDownloadURL(snap.ref).then((url) =>
        writeImageUrl(url, file.name, id, queryClient)
      );
    });
  };

  return (
    <div
      className={classes.card__footer}
      onKeyDown={(e) => e.key === "Escape" && setIsVissible(false)}
    >
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
          inputOption="input"
          autoFocus
        />
      )}
      <InputFile
        id={id}
        classNameLabel={classes.cardFooter__addFile}
        classNameInput="hidden cursor-pointer"
        accept="image/*"
        onChange={handleFile}
      >
        <i
          className="fal fa-image text-[#4E4E4E] hover:text-[#2148d9] cursor-pointer"
          tabIndex={0}
        ></i>
      </InputFile>
    </div>
  );
};
