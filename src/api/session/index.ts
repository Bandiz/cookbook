import { useMutation, useQuery, useQueryClient } from 'react-query';
import httpClient, { dataGet } from '../httpClient';
import { SessionCheck, UserSession } from './types';

export function useSession() {
    return useQuery('session', dataGet<SessionCheck>('auth/v1/isLoggedIn'));
}

export function useGoogleSessionMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        (token: string) =>
            httpClient
                .post<UserSession>('auth/v1/login/google', null, {
                    params: {
                        t: token,
                    },
                })
                .then((x) => x.data),
        {
            onSuccess: (data) => {
                queryClient.setQueryData<SessionCheck>('session', { isLoggedIn: true, user: data.user });
            },
        }
    );
}

export function useLoginSessionMutation() {
    const queryClient = useQueryClient();

    return useMutation(
        (formData: FormData) =>
            httpClient
                .post<UserSession>('auth/v1/login', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((x) => x.data),
        {
            onSuccess: (data) => {
                queryClient.setQueryData<SessionCheck>('session', { isLoggedIn: true, user: data.user });
            },
        }
    );
}

export function useLogoutSessionMutation() {
    const queryClient = useQueryClient();
    return useMutation(() => httpClient.delete('auth/v1/logout').then((x) => x.data), {
        onSuccess: () => {
            queryClient.invalidateQueries('session');
        },
    });
}
