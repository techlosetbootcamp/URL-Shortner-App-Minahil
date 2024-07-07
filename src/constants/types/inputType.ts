import { ChangeEvent } from "react";

export type inputType = {
    type?:string;
    placeholder?:string;
    value?:string;
    label?:string;
    onChange?:(e:ChangeEvent<HTMLInputElement>)=>void;
    disabled?:boolean;
  };