import { useMutation, useQueryClient } from 'react-query';
import { SessionKey } from '../apiQueryKeys';
import httpClient from '../httpClient';
import { LoginRequest, LoginResponse } from './types';

export default function useLoginSessionMutation() {
    const queryClient = useQueryClient();

    return useMutation(
        async (request: LoginRequest) => {
            const response = await httpClient.post<LoginResponse>('auth/login', request);
            return response.data;
        },
        {
            onSuccess: (data) => {
                queryClient.setQueryData(SessionKey, data);
            },
        }
    );
}
