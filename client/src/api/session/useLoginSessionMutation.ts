import { useMutation, useQueryClient } from 'react-query';
import { SessionKey } from '../apiQueryKeys';
import httpClient from '../httpClient';
import { createSessionObject } from './utils';
import { LoginRequest, UserSession } from './types';

export default function useLoginSessionMutation() {
    const queryClient = useQueryClient();

    return useMutation(
        async (request: LoginRequest) => {
            const response = await httpClient.post<UserSession>('auth/login', request);
            return response.data;
        },
        {
            onSuccess: (data) => {
                queryClient.setQueryData(SessionKey, createSessionObject(data));
            },
        }
    );
}
