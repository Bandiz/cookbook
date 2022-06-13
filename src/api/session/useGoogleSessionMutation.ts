import { useMutation, useQueryClient } from 'react-query';
import { SessionKey } from '../apiQueryKeys';
import httpClient from '../httpClient';
import { createSessionObject } from './utils';
import { UserSession } from './types';

export default function useGoogleSessionMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        async (token: string) => {
            const response = await httpClient.post<UserSession>('auth/login/google', null, {
                params: {
                    t: token,
                },
            });
            return response.data;
        },
        {
            onSuccess: (data) => {
                queryClient.setQueryData(SessionKey, createSessionObject(data));
            },
        }
    );
}
