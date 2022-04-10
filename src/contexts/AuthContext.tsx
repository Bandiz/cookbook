import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
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
let token: string;

httpClient.interceptors.request.use((req) => {
    if (token && req.headers) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const AuthContext = createContext<AuthObject>({ isAuthenticated: false, httpClient } as AuthObject);

interface AuthProviderProps {
    children?: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>();

    useEffect(() => {
        const userStore = sessionStorage.getItem('user');
        const tokenStore = sessionStorage.getItem('token');

        if (!userStore || !tokenStore) {
            clearSession();
        } else {
            setIsAuthenticated(true);
            setUser(JSON.parse(userStore) as User);
            token = tokenStore;
        }
    }, []);

    function clearSession() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    }

    function login(session: UserSession) {
        setUser(session.user);
        token = session.token;
        sessionStorage.setItem('user', JSON.stringify(session.user));
        sessionStorage.setItem('token', session.token);
        setIsAuthenticated(true);
    }

    function logout() {
        setUser(null);
        setIsAuthenticated(false);
        clearSession();
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
