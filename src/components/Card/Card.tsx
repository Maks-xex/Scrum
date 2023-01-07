import React from "react";

import { CardBody } from "./CardBody/CardBody";
import { CardFooter } from "./CardFooter/CardFooter";

import { ICardBody } from "../../types";

import classes from "./card.module.scss";
import { CardHeader } from "./CardHeader/CardHeader";
import { useQueryClient } from "react-query";
import { deleteCard } from "../../api/delete-card";

interface CardListProps {
  title: string;
  body?: ICardBody[];
  id: string;
}

export const Card: React.FC<CardListProps> = ({ title, body, id }) => {
  const queryClient = useQueryClient();
  const onDeleteCardHandler = async (id: string): Promise<void> => {
    await deleteCard(id);
    void queryClient.invalidateQueries("cards");
  };
  return (
    <div className={classes.card}>
      <CardHeader title={title} id={id} onClick={onDeleteCardHandler} />
      <CardBody body={body} />
      <CardFooter id={id} />
    </div>
  );
};
