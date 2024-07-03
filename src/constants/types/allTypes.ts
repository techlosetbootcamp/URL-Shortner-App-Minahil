import { MouseEventHandler } from "react";

export type inputType = {
    type:string;
    placeholder:string
  };
  export type buttonType = {
    text:string;
    width?:string;
    onClick?:MouseEventHandler<HTMLButtonElement> | undefined;
  };