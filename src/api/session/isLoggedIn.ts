import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { SessionCheck } from './types';

type GetSessionResponse =
    | { type: 'response'; payload: SessionCheck }
    | {
          type: 'error';
          error: string;
      };

export function GetIsLoggedIn() {
    const { httpClient } = useAuth();
    const [loading, setLoading] = useState(false);
    const request = async (): Promise<GetSessionResponse> => {
        setLoading(true);
        try {
            const response = await httpClient.get<SessionCheck>('auth/v1/isLoggedIn');
            return {
                type: 'response',
                payload: response.data,
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
        isLoggedInRequest: request,
        isLoggedInLoading: loading,
    };
}
