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

  