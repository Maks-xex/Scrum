import React from "react";
import classes from "./context-menu.module.scss";

interface ContextMenuProps {
  children: React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  >;
  isOpen?: boolean;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  isOpen,
}) => {
  return (
    <dialog open={isOpen} className={classes.back}>
      <ul className={classes.contextMenu}>
        <>{children}</>
      </ul>
    </dialog>
  );
};
