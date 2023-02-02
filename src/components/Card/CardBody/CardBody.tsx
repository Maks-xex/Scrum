import React, { useState } from "react";

import { useQueryClient } from "react-query";

import { Draggable } from "react-beautiful-dnd";

import { deleteCardBody } from "../../../api/delete-card-body";

import { Button } from "../../Button/Button";

import { ICardBody } from "../../../types";

import classess from "./card-body.module.scss";

interface CardBodyProps {
  body?: ICardBody[];
  id: string;
}
export const CardBody: React.FC<CardBodyProps> = ({ body, id }) => {
  const [hoverId, setHoverId] = useState("");
  const queryClient = useQueryClient();
  const onDeleteCardBodyHandler = async (bodyId: string): Promise<void> => {
    await deleteCardBody(id, bodyId);
    void queryClient.invalidateQueries("cards");
  };

  return (
    <ul>
      {body
        ?.sort((a, b) => a.order - b.order)
        .map((body, i) => {
          return (
            <Draggable draggableId={body.id} index={i} key={body.id}>
              {(provided) => (
                <li
                  onMouseEnter={() => setHoverId(body.id)}
                  onMouseLeave={() => setHoverId("")}
                  className={
                    "bg-slate-100 border rounded-lg flex box-border mb-2 flex-col"
                  }
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                >
                  {body.img && (
                    <img
                      className="border-b border-black"
                      src={body.img}
                      alt=""
                    />
                  )}
                  <h3 className="px-[5px]">{body.title}</h3>
                  {body.id === hoverId && (
                    <Button
                      className={`absolute right-[18px] mt-[6px] flex p-[7px] items-center flex-col ${classess.editButton}`}
                      onClick={async () =>
                        await onDeleteCardBodyHandler(body.id)
                      }
                    >
                      <>
                        <i
                          className={`fa fa-pencil text-[18px] text-white`}
                          aria-hidden="true"
                        ></i>
                      </>
                    </Button>
                  )}
                </li>
              )}
            </Draggable>
          );
        })}
      {(!body || body.length === 0) && (
        <li className={"bg-slate-100 border rounded-lg"}></li>
      )}
    </ul>
  );
};
