import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserSession } from '../../types';

type GetSessionResponse =
    | { type: 'response'; payload: UserSession }
    | {
          type: 'error';
          error: string;
      };

export function GetSessionWithGoogle() {
    const { httpClient } = useAuth();
    const [loading, setLoading] = useState(false);
    const request = async (token: string): Promise<GetSessionResponse> => {
        if (!token) {
            return {
                type: 'error',
                error: 'Unauthorized',
            };
        }

        setLoading(true);
        try {
            const response = await httpClient.get<UserSession>(`${process.env.REACT_APP_API_URL}v1/token`, {
                params: {
                    t: token,
                },
            });
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
        getSessionWithGoogleRequest: request,
        getSessionWithGoogleLoading: loading,
    };
}
