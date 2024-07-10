import { MouseEventHandler } from "react";

  export type buttonType = {
    type?: string;
    text:string;
    width?:string;
    disabled?: boolean;
    onClick?:MouseEventHandler<HTMLButtonElement> | undefined;
  };