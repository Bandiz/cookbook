import { useMutation, useQueryClient } from 'react-query';
import { SessionKey } from '../../apiQueryKeys';
import httpClient from '../../httpClient';
import { LoginRequest, LoginResponse } from './types';

export default function useLoginSessionMutation() {
    const queryClient = useQueryClient();

    return useMutation(
        async (request: LoginRequest) => {
            const formData = new FormData();
            formData.append('username', request.username);
            formData.append('password', request.password);

            const response = await httpClient.post<LoginResponse>('auth/login', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        {
            onSuccess: (data) => {
                queryClient.setQueryData(SessionKey, data);
            },
        }
    );
}
