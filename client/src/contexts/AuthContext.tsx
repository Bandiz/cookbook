import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useSession } from '../api/session';
import { User } from '../api/session/types';

interface AuthObject {
    isAuthenticated: boolean;
    user: User | null;
    isAdmin: boolean;
    isLoading: boolean;
}

const defaultContextObject: AuthObject = {
    isAuthenticated: false,
    user: null,
    isAdmin: false,
    isLoading: true,
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
            user: user ?? null,
            isAdmin: user?.isAdmin ?? false,
            isLoading: session.isLoading,
        };
    }, [session.data]);

    return <AuthContext.Provider value={contextObject}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
