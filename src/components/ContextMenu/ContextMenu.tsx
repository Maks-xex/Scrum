import React, { useState } from "react";
import classes from "./context-menu.module.scss";

export interface Handlers {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen?: boolean;
}

interface ContextMenuProps {
  children: React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >;
  handlers: ({ setIsOpen, isOpen }: Handlers) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  handlers,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <dialog open={isOpen} className={classes.back}>
      <ul className={classes.contextMenu}>
        <>{children}</>
      </ul>
      <>{handlers({ setIsOpen, isOpen })}</>
    </dialog>
  );
};
