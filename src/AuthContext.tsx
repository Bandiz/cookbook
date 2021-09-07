import { createContext, ReactNode, useContext, useState } from "react";
import axios, { AxiosInstance } from "axios";

interface AuthObject {
    isAuthenticated: boolean;
    httpClient: AxiosInstance;
    token?: string;
}

const httpClient = axios.create({ baseURL: `${process.env.REACT_APP_BASE_API_URL}` });

export const AuthContext = createContext<AuthObject>({ isAuthenticated: false, httpClient });

interface AuthProviderProps {
    children?: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                httpClient,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
