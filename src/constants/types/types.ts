
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
    password?:string,
    email?:string,
    token?:string,
  };

  