import React from "react";
import classes from "./button.module.scss";

interface ButtonProps {
  children: JSX.Element | string;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset";
  className?: string;
  myRef?: React.RefObject<HTMLButtonElement>;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  className,
  myRef,
}) => {
  return (
    <button
      type={type ?? "button"}
      className={`${classes.button} ${className ?? ""}`}
      onClick={onClick}
      ref={myRef}
    >
      {children}
    </button>
  );
};
