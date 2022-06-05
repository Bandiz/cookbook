import { createContext, ReactNode, useContext } from 'react';
import { AxiosInstance } from 'axios';
import { User } from '../api/session/types';
import { useSession } from '../api/session';
import httpClient from '../api/httpClient';

interface AuthObject {
    isAuthenticated: boolean;
    httpClient: AxiosInstance;
    user: User | null;
}

export const AuthContext = createContext<AuthObject>({ isAuthenticated: false, httpClient } as AuthObject);

interface AuthProviderProps {
    children?: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const session = useSession();

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: session.data?.isLoggedIn ?? false,
                httpClient,
                user: session.data?.user ?? null,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
