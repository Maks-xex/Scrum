import React from "react";

import { CardBody } from "./CardBody/CardBody";
import { CardFooter } from "./CardFooter/CardFooter";

import { ICardBody } from "../../types";

import classes from "./card.module.scss";
import { CardHeader } from "./CardHeader/CardHeader";
import { StrictModeDroppable } from "../StrictModeDroppable/StrictModeDroppable";

interface CardListProps {
  title: string;
  body?: ICardBody[];
  id: string;
  order: number;
}

export const Card: React.FC<CardListProps> = ({ title, body, id, order }) => {
  return (
    <div className={classes.card}>
      <CardHeader title={title} id={id} body={body} order={order} />
      <StrictModeDroppable droppableId={id} type="cardBody">
        {(provided) => (
          <div
            className={classes.card__main}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <CardBody body={body} id={id} />
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
      <CardFooter id={id} />
    </div>
  );
};
