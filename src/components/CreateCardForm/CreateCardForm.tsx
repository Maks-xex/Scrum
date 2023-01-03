import React, { useEffect } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../Button/Button";

import classes from "./create-card-form.module.scss";

interface CreateCardFormProps {
  onSubmit?: SubmitHandler<Inputs>;
}

export interface Inputs {
  title: string;
}

export const CreateCardForm: React.FC<CreateCardFormProps> = ({
  onSubmit,
}): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmitFormHandler: SubmitHandler<Inputs> = async (
    data
  ): Promise<void> => {
    if (onSubmit !== undefined) {
      onSubmit(data);
    }
    reset();
  };

  useEffect(() => {
    setFocus("title");
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmitFormHandler)} className={classes.form}>
      <input
        {...register("title", { required: true })}
        className={classes.form__input}
        style={errors.title && { outlineColor: "red", borderColor: "red" }}
      />
      <Button type="submit" className={classes.form__addList}>
        <span>add card</span>
      </Button>
    </form>
  );
};
