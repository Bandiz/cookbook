export interface GetUserListResponse {
    users: Array<User>;
}

export enum Role {
    Admin = 'Admin',
    User = 'User',
}

export interface User {
    id: string;
    name: string;
    lastName: string;
    roles: Array<Role>;
    userName: string;
    email: string;
    lockoutEnd?: string | null;
    lockoutEnabled: boolean;
    accessFailedCount: number;
}

export interface UpdateUserRequest {
    email?: string;
    userName?: string;
    name?: string;
    lastName?: string;
    roles?: Array<Role>;
}

export type UpdateUserResponse = User;

export interface UpdateUserVariables extends UpdateUserRequest {
    id: string;
}
