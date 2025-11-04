import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";

export interface ButtonProps {
  Content?: string;
  Icon?: React.ReactNode;
  OnClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  IconBlur?: boolean;
  Disabled?: boolean;
}

export interface InputTextProps {
  Value?: string;
  Label?: { Name: string; Icon?: React.ReactNode };
  SubmitConfig?: ButtonProps;
  Placeholder: string;
  Type?: "text" | "number" | "email";
  className?: string;
  containerClassName?: string;
  OnChange?: (v: string) => void;
}
