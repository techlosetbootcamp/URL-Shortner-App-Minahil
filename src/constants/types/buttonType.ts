import { MouseEventHandler } from "react";

  export type buttonType = {
    type?: string;
    text:string;
    width?:string;
    paddingRight?:string;
    paddingLeft?:string;
    disabled?: boolean;
    onClick?:MouseEventHandler<HTMLButtonElement> | undefined;
  };