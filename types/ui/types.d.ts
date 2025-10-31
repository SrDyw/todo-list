import React, { MouseEventHandler } from "react";

export interface ButtonProps {
    Content?: string,
    Icon?: React.ReactNode,
    OnClick?: MouseEventHandler<HTMLButtonElement>,
    className?: string
}