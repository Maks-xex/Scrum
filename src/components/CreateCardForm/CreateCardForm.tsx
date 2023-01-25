import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../Button/Button";
import { TextArea } from "../TextArea/TextArea";

import classes from "./create-card-form.module.scss";

interface CreateCardFormProps {
  onSubmit?: SubmitHandler<Inputs>;
  className?: string;
  addButton?: boolean;
  autoFocus?: boolean;
  autoSize?: boolean;
  classNameInput?: string;
  defaultValue?: string;
  inputOption: "input" | "textarea";
}

export interface Inputs {
  title: string;
  body?: { title: string };
}

export const CreateCardForm: React.FC<CreateCardFormProps> = ({
  onSubmit,
  className,
  addButton = true,
  autoFocus,
  inputOption,
  classNameInput,
  autoSize,
  defaultValue,
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitFormHandler: SubmitHandler<Inputs> = async (
    data,
    evt
  ): Promise<void> => {
    evt?.preventDefault();
    if (onSubmit !== undefined) {
      onSubmit(data);
    }
    reset();
  };
  const textEnterSubmit = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const data = { title: e.currentTarget.value };
      handleSubmit(onSubmitFormHandler(data));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitFormHandler)}
      className={`${className ?? ""} ${classes.form}`}
    >
      {inputOption === "input" ? (
        <input
          autoFocus={autoFocus}
          {...register("title", { required: true })}
          className={`${classes.form__input} ${classNameInput ?? ""}`}
          style={errors.title && { outlineColor: "red", borderColor: "red" }}
        />
      ) : (
        <TextArea
          className={classNameInput}
          autoSize={autoSize}
          defaultValue={defaultValue}
          onKeyPress={textEnterSubmit}
        />
      )}
      {addButton && (
        <Button type="submit" className={classes.form__addList}>
          <span>add card</span>
        </Button>
      )}
    </form>
  );
};
