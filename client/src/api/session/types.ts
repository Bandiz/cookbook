export type User = {
    email: string;
    isAdmin: boolean;
    lastName: string;
    name: string;
};

export type UserSession = {
    user: User;
};

export type SessionCheck = {
    isLoggedIn: boolean;
    user?: User;
};

export type LoginRequest = {
    username: string;
    password: string;
}