import { SessionCheck, UserSession } from './types';

export function createSessionObject(data?: UserSession) {
    const session: SessionCheck = { isLoggedIn: Boolean(data?.user), user: data?.user };
    return session;
}
