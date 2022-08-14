export interface UserDetailsDto {
    id: number;
    roleName: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    authToken: string;
}

export interface LoginDto {
    username: string;
    password: string;
}

export const ANONYMOUS_USER: UserDetailsDto = {
    id: -1,
    roleName: "ANONYMOUS",
    name: "Anonymous",
    surname: "Anonymous",
    email: "",
    phone: "",
    authToken: ""
}

