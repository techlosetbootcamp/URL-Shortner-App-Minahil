import { USER_TYPE } from "./userType";
import { MouseEventHandler } from "react";
import { ChangeEvent } from "react";
import { Dispatch, SetStateAction } from "react";
export type SIGN_UP_STATE = {
  error: null | string;
  signupStatus: "idle" | "loading" | "failed" | "succeeded";
  userDetails: {};
};

export type LOGIN_STATE = {
  loginStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  userDetails: {} | null;
};
export type SIGN_UP_PROPS = {
  email: string;
  name: string;
  password: string;
};

export type PASSWORD_STATE = {
  isLoading: boolean;
  isError: string | null;
  passwordStatus: "idle" | "loading" | "succeeded" | "failed";
};

export type PASSWORD_PROPS = {
  password?: string;
  email?: string;
  token?: string;
};

export type VERIFY_TOKEN_STATE = {
  isLoading: boolean;
  isError: string | null;
  token?: string;
  user: USER_TYPE;
};

export type URL_PROPS = {
  url: string;
  customSlug?: string;
};
export type URL_ANALYTIC_PROPS = {
  code: string | undefined;
};

export type URL_TYPE = {
  user_email?: string;
  analytics?: URL_ANALYTIC_TYPE;
  id?: string;
  originalUrl?: string;
  iconImg?: string;
  qrCode?: string;
  shortUrl?: string;
  urlCode?: string;
  active?: boolean;
  user?: USER_TYPE;
};

export type URL_EDIT_TYPE = {
  urlCode: string;
  newUrlCode?: string;
};
export type URL_ANALYTIC_TYPE = {
  analytic: {
    id?: string;
    url?: URL_TYPE;
    url_id?: string;
    clicked?: number;
    updatedAt?: string;
  };
};

export type URL_STATE = {
  isLoading: boolean;
  isError: boolean;
  url: URL_TYPE;
  urls?: URL_TYPE[];
};

export type URL_ANALYTIC_STATE = {
  isLoading: boolean;
  isError: boolean;
  urlAnalytic: URL_ANALYTIC_TYPE;
};

export type SLUG_STATE = {
  isLoading: boolean;
  isError: boolean;
  slug: string;
};

export type BUTTON_TYPE = {
  type?: string;
  text: string;
  width?: string;
  paddingRight?: string;
  paddingLeft?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export type INPUT_TYPE = {
  type?: string;
  placeholder?: string;
  value?: string;
  label?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export type FILTER_PROPS = {
  onFilterChange: (criteria: string) => void;
};

export type ON_CHANGE_PROPS={
  onChange:Dispatch<SetStateAction<boolean>>
  };