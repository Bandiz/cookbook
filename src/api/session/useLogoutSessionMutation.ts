import { useMutation, useQueryClient } from 'react-query';
import { SessionKey } from '../apiQueryKeys';
import httpClient from '../httpClient';
import { createSessionObject } from './utils';

export default function useLogoutSessionMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        async () => {
            const response = await httpClient.delete('auth/logout');
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.setQueryData(SessionKey, createSessionObject());
            },
        }
    );
}
