import { MouseEventHandler } from "react";

  export type buttonType = {
    text:string;
    width?:string;
    onClick?:MouseEventHandler<HTMLButtonElement> | undefined;
  };