export interface GetUserListResponse {
    users: Array<UserResponse>;
}

export interface UserResponse {
    id: string;
    name: string;
    lastName: string;
    roles: Array<string>;
    userName: string;
    email: string;
    lockoutEnd?: string | null;
    lockoutEnabled: boolean;
    accessFailedCount: number;
}
