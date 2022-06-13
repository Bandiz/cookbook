import { useMutation, useQueryClient } from 'react-query';
import { SessionKey } from '../apiQueryKeys';
import httpClient from '../httpClient';
import { createSessionObject } from './utils';
import { UserSession } from './types';

export default function useLoginSessionMutation() {
    const queryClient = useQueryClient();

    return useMutation(
        async (formData: FormData) => {
            const response = await httpClient.post<UserSession>('auth/login', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
