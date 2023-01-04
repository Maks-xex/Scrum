import React, { useState, useRef } from "react";
import { useAutosizeTextArea } from "../../hooks/useAutosizeTextArea";

interface TextAreaProps {
  className?: string;
  maxLength?: number;
  defaultValue?: string;
  autoSize?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  className,
  maxLength,
  autoSize,
  defaultValue,
}) => {
  const [value, setValue] = useState<string>("");
  const ref = useRef<HTMLTextAreaElement>(null);

  const onChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(evt.target.value);
  };

  autoSize && useAutosizeTextArea(ref?.current, value);

  return (
    <textarea
      className={className}
      maxLength={maxLength ?? 512}
      aria-label={value.length === 0 ? defaultValue : value}
      ref={ref}
      rows={1}
      value={value.length === 0 ? defaultValue : value}
      onChange={onChangeHandler}
    ></textarea>
  );
};
