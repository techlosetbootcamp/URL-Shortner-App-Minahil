export type USER_TYPE={
    id?:string,
    name?: string,
    email?: string,
    password?:string,
    newEmail?: string,
};


export type EDIT_USER_PROPS={
    id:string,
    name: string,
    newEmail: string,
};

export type USER_STATE={
    isLoading:boolean,
    isError:boolean,
    user:USER_TYPE
};
