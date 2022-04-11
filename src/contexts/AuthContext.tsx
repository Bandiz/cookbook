import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import dayjs from 'dayjs';

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
    const [token, setToken] = useState<string>();
    const [user, setUser] = useState<User | null>();
    const interceptorRef = useRef<number>();

    useEffect(() => {
        if (!token) {
            if (interceptorRef.current) {
                httpClient.interceptors.request.eject(interceptorRef.current);
                delete interceptorRef.current;
            }
            return;
        }

        const decodedToken = jwt_decode<JwtPayload>(token);
        if (!decodedToken || !decodedToken.exp || dayjs.unix(decodedToken.exp).isBefore(dayjs())) {
            clearSession();
            return;
        }

        interceptorRef.current = httpClient.interceptors.request.use((req) => {
            if (req.headers) {
                req.headers.Authorization = `Bearer ${token}`;
            }
            return req;
        });
        const expirationTime = dayjs.unix(decodedToken.exp).diff();
        const handler = setTimeout(() => {
            logout();
        }, expirationTime);

        return () => clearTimeout(handler);
    }, [token]);

    useEffect(() => {
        const userStore = sessionStorage.getItem('user');
        const tokenStore = sessionStorage.getItem('token');

        if (!userStore || !tokenStore) {
            clearSession();
        } else {
            setUser(JSON.parse(userStore) as User);
            setToken(tokenStore);
        }
    }, []);

    function clearSession() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
    }

    function login(session: UserSession) {
        setUser(session.user);
        setToken(session.token);
        sessionStorage.setItem('user', JSON.stringify(session.user));
        sessionStorage.setItem('token', session.token);
    }

    function logout() {
        setUser(null);
        setToken('');
        clearSession();
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: Boolean(token) && Boolean(user),
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
