import React from "react";

import { Draggable } from "react-beautiful-dnd";

import { ICardBody } from "../../../types";

interface CardBodyProps {
  body?: ICardBody[];
}

export const CardBody: React.FC<CardBodyProps> = ({ body }) => (
  <ul>
    {body
      ?.sort((a, b) => a.order - b.order)
      .map((body, i) => (
        <Draggable draggableId={body.id} index={i} key={body.id}>
          {(provided) => (
            <li
              className={"bg-slate-100 border rounded-lg"}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              {body.img && (
                <img className="border-b border-black" src={body.img} alt="" />
              )}
              <h3 className="px-[5px]">{body.title}</h3>
            </li>
          )}
        </Draggable>
      ))}
    {(!body || body.length === 0) && (
      <li className={"bg-slate-100 border rounded-lg"}></li>
    )}
  </ul>
);
