import { userType } from "./userType";

export type SignupState = {
  error: null | string;
  signupStatus: "idle" | "loading" | "failed" | "succeeded";
  userDetails: {};
};

export type LoginState = {
  loginStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  userDetails: {} | null;
};
export type SignupProps = {
  email: string;
  name: string;
  password: string;
};

export type PasswordState = {
  isLoading: boolean;
  isError: string | null;
  passwordStatus: "idle" | "loading" | "succeeded" | "failed";
};

export type passwordProps = {
  password?: string;
  email?: string;
  token?: string;
};

export type VerifyTokenState = {
  isLoading: boolean;
  isError: string | null;
  token?: string;
  user: userType;
};

export type urlProp = {
  url: string;
};
export type urlAnalyticProp = {
  code: string | undefined;
};

export type urlType = {
  user_email?: any;
  analytics?: urlAnalyticType;
  id?: string;
  originalUrl?: string;
  qrCode?:string;
  shortUrl?: string;
  urlCode?: string;
  active?:boolean;
  user?:userType
};

export type urlEditType={
  urlCode:string;
  newUrlCode?:string;
};
export type urlAnalyticType = {
  analytic:{id?: string;
  url?: urlType;
  url_id?: string;
  clicked?: number;
  updatedAt?: string}
};

export type urlState = {
  isLoading: boolean;
  isError: boolean;
  url: urlType;
  urls?:urlType[];
};
export type urlAnalyticState = {
  isLoading: boolean;
  isError: boolean;
  urlAnalytic: urlAnalyticType;
};
