import { createContext, ReactNode, useContext, useState } from 'react';
import axios, { AxiosInstance } from 'axios';

import { User, UserSession } from '../types';

interface AuthObject {
    isAuthenticated: boolean;
    httpClient: AxiosInstance;
    user?: User | null;
    login: (session: UserSession) => void;
    logout: () => void;
}

const httpClient = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}` });

export const AuthContext = createContext<AuthObject>({ isAuthenticated: false, httpClient } as AuthObject);

interface AuthProviderProps {
    children?: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>();

    function login(session: UserSession) {
        setUser(session.user);
        httpClient.defaults.headers.common['Authorization'] = `Bearer ${session.token}`;
        setIsAuthenticated(true);
    }

    function logout() {
        setUser(null);
        delete httpClient.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                httpClient,
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
