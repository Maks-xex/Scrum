import React from "react";
import { ICardBody } from "../../../types";

import classes from "./card-body.module.scss";

interface CardBodyProps {
  body?: ICardBody[];
}

export const CardBody: React.FC<CardBodyProps> = ({ body }) => {
  type CardBody = Record<string, Omit<ICardBody, "id">>;
  let data: ICardBody[] = [];
  body &&
    (data = Object.entries(body as unknown as CardBody).map(([id, value]) => ({
      id,
      ...value,
    })));
  return (
    <div className={classes.card__main}>
      <ul>
        {data.map((cardBody) => (
          <li key={cardBody.id}>
            <img className="border-b border-black" src={cardBody.img} alt="" />
            <h3 className="bg-white">{cardBody.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
