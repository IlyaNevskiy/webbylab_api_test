export interface ISession {
    email: string;
    password: string;
}

export interface INewUser {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}
