export type LoginResponse = {
    email: string;
    isAdmin: boolean;
    lastName: string;
    name: string;
};

export type User = LoginResponse;

export type LoginRequest = {
    username: string;
    password: string;
}