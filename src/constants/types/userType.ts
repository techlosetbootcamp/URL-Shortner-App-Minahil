export type userType={
    name: string,
    email: string,
    password?:string
};

export type userState={
    isLoading:boolean,
    isError:boolean,
    user:userType
};