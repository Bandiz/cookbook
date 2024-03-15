import { createContext, ReactNode, useContext, useMemo } from 'react';
import { AxiosInstance } from 'axios';
import { User } from '../api/session/types';
import { useSession } from '../api/session';
import httpClient from '../api/httpClient';

interface AuthObject {
    isAuthenticated: boolean;
    httpClient: AxiosInstance;
    user: User | null;
    isAdmin: boolean;
}

const defaultContextObject: AuthObject = {
    isAuthenticated: false,
    httpClient,
    user: null,
    isAdmin: false,
};

export const AuthContext = createContext(defaultContextObject);

interface AuthProviderProps {
    children?: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const session = useSession();

    const contextObject = useMemo(() => {
        if (!session.data) {
            return defaultContextObject;
        }

        const { isLoggedIn, user } = session.data;

        return {
            isAuthenticated: isLoggedIn,
            httpClient,
            user: user ?? null,
            isAdmin: user?.isAdmin ?? false,
        };
    }, [session.data]);

    return <AuthContext.Provider value={contextObject}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
