import React from "react";

interface InputProps {
  name?: string;
  id?: string;
  classNameInput: string;
  classNameLabel: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  accept: string;
  children: JSX.Element | string;
}

export const InputFile: React.FC<InputProps> = ({
  name,
  id,
  classNameInput,
  classNameLabel,
  onChange,
  accept,
  children,
}) => {
  return (
    <>
      <label htmlFor={id} className={classNameLabel}>
        {children}
      </label>
      <input
        type="file"
        id={id}
        name={name}
        accept={accept}
        className={classNameInput}
        onChange={onChange}
      />
    </>
  );
};
