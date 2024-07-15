export type userType={
    id?:string,
    name: string,
    email?: string,
    password?:string,
    newEmail?: string,
};

export type editUserProps={
    id:string,
    name: string,
    newEmail: string,
};

export type userState={
    isLoading:boolean,
    isError:boolean,
    user:userType
};