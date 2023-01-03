import React, { useState } from "react";
import classes from "./modal.module.scss";

export interface Handlers {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ModalProps {
  children: JSX.Element;
  handlers: ({ setIsOpen }: Handlers) => void;
}

export const Modal: React.FC<ModalProps> = ({ children, handlers }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <dialog open={isOpen} className={classes.fade}>
      <div className={classes.modal}>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className={classes.modal__close}
        >
          <i className="fa fa-window-close" aria-hidden="true"></i>
        </button>
        {isOpen && children}
        <>{handlers({ setIsOpen })}</>
      </div>
    </dialog>
  );
};
