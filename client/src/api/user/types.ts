export interface GetUserListResponse {
    users: Array<UserResponse>;
}

export interface UserResponse {
    name: string;
    lastName: string;
    roles: Array<string>;
    userName: string;
    email: string;
    lockoutEnd: string;
    lockoutEnabled: boolean;
    accessFailedCount: number;
}
