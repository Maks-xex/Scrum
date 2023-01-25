import React, { useState, useRef } from "react";
import { useAutosizeTextArea } from "../../hooks/useAutosizeTextArea";

interface TextAreaProps {
  className?: string;
  maxLength?: number;
  defaultValue?: string;
  autoSize?: boolean;
  onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

export const TextArea: React.FC<TextAreaProps> = ({
  className,
  maxLength,
  autoSize,
  defaultValue,
  onKeyPress,
}) => {
  const [value, setValue] = useState<string>(defaultValue ?? "");
  const [height, setHeight] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  const onChangeHandler = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setValue(evt.target.value);
  };

  autoSize && useAutosizeTextArea(ref?.current, value);

  return (
    <textarea
      style={{ height }}
      className={className}
      maxLength={maxLength ?? 512}
      ref={ref}
      rows={1}
      value={value}
      onChange={onChangeHandler}
      autoFocus
      onFocus={(e) => {
        e.currentTarget.setSelectionRange(
          e.currentTarget.value.length,
          e.currentTarget.value.length
        );
        setHeight(`${e.currentTarget.scrollHeight}px`);
      }}
      onKeyDown={onKeyPress}
    ></textarea>
  );
};
