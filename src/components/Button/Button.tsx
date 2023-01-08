import React from "react";
import classes from "./button.module.scss";

interface ButtonProps {
  children: JSX.Element | string;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, type, className }, ref): JSX.Element => {
    return (
      <button
        type={type ?? "button"}
        className={`${classes.button} ${className ?? ""}`}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
