import React, { useEffect, useRef, useState } from "react";

import { TextArea } from "../../TextArea/TextArea";
import { Button } from "../../Button/Button";
import { ContextMenu } from "../../ContextMenu/ContextMenu";

import classes from "./card-header.module.scss";

interface CardHeaderProps {
  title: string;
  id: string;
  onClick: Function;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  id,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const myRefButton = useRef(null);
  const myRefLi = useRef(null);

  const handleClickOutside = (evt: MouseEvent): void => {
    if (evt.target !== myRefButton.current && evt.target !== myRefLi.current)
      setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={classes.card__header}>
      <h2 className="hidden">{title}</h2>
      <TextArea defaultValue={title} className={classes.card__title} autoSize />
      <Button
        className={classes.card__configButon}
        onClick={() => setIsOpen((prev) => !prev)}
        myRef={myRefButton}
      >
        <>
          <span></span>
          <span></span>
          <span></span>
        </>
      </Button>
      <ContextMenu isOpen={isOpen}>
        <>
          <li ref={myRefLi} onClick={() => onClick(id)}>
            delete
          </li>
          <li>Set</li>
        </>
      </ContextMenu>
    </div>
  );
};
