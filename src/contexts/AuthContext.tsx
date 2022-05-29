import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';
import { User, UserSession } from '../api/session/types';
import { GetIsLoggedIn } from '../api/session/isLoggedIn';
import { Logout } from '../api/session/logout';

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
    const { isLoggedInRequest } = GetIsLoggedIn();
    const { logoutRequest } = Logout();

    useEffect(() => {
        (async () => {
            const response = await isLoggedInRequest();
            if (response.type !== 'response' || !response.payload.isLoggedIn) {
                return;
            }

            setIsAuthenticated(true);
            setUser(response.payload.user);
        })();
    }, []);

    function login(session: UserSession) {
        setIsAuthenticated(true);
        setUser(session.user);
    }

    async function logout() {
        const response = await logoutRequest();

        if (response.type === 'error') {
            return;
        }
        setIsAuthenticated(false);
        setUser(null);
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
