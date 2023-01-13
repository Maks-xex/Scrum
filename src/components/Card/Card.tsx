import React from "react";

import { CardBody } from "./CardBody/CardBody";
import { CardFooter } from "./CardFooter/CardFooter";

import { ICardBody } from "../../types";

import classes from "./card.module.scss";
import { CardHeader } from "./CardHeader/CardHeader";

interface CardListProps {
  title: string;
  body?: ICardBody[];
  id: string;
}

export const Card: React.FC<CardListProps> = ({ title, body, id }) => {
  return (
    <div className={classes.card}>
      <CardHeader title={title} id={id} />
      <CardBody body={body} />
      <CardFooter id={id} />
    </div>
  );
};
