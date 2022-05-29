import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

type LogoutResponse =
    | { type: 'response' }
    | {
          type: 'error';
          error: string;
      };

export function Logout() {
    const { httpClient } = useAuth();
    const [loading, setLoading] = useState(false);
    const request = async (): Promise<LogoutResponse> => {
        setLoading(true);
        try {
            await httpClient.delete('auth/v1/logout');
            return {
                type: 'response',
            };
        } catch (e) {
            return {
                type: 'error',
                error: 'problem with unknowns',
            };
        } finally {
            setLoading(false);
        }
    };
    return {
        logoutRequest: request,
        logoutLoading: loading,
    };
}
