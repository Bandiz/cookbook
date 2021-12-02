import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserSession } from '../../types';

type GetSessionResponse =
    | { type: 'response'; payload: UserSession }
    | {
          type: 'error';
          error: string;
      };

export function GetSessionWithLogin() {
    const { httpClient } = useAuth();
    const [loading, setLoading] = useState(false);
    const request = async (username: string, password: string): Promise<GetSessionResponse> => {
        if (!username || !password) {
            return {
                type: 'error',
                error: 'Unauthorized',
            };
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            const response = await httpClient.post<UserSession>(
                `${process.env.REACT_APP_API_URL}v1/token/login`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
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
        getSessionWithLoginRequest: request,
        getSessionWithLoginLoading: loading,
    };
}
