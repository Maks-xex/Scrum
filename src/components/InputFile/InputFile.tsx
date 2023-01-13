import React from "react";

interface InputProps {
  id: string;
  name?: string;
  classNameInput: string;
  classNameLabel: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  accept: string;
  children: JSX.Element | string;
}

export const InputFile: React.FC<InputProps> = ({
  id,
  name,
  classNameInput,
  classNameLabel,
  onChange,
  accept,
  children,
}) => {
  return (
    <>
      <label htmlFor={`image-${id}`} className={classNameLabel}>
        {children}
      </label>
      <input
        type="file"
        id={`image-${id}`}
        name={name}
        accept={accept}
        className={classNameInput}
        onChange={onChange}
      />
    </>
  );
};
