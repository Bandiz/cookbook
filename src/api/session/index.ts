import { useMutation, useQuery, useQueryClient } from 'react-query';
import httpClient, { dataGet } from '../httpClient';
import { SessionCheck, UserSession } from './types';

const sessionKey = 'session';

export function useSession() {
    return useQuery(sessionKey, dataGet<SessionCheck>('auth/isLoggedIn'), {
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: true,
        refetchInterval: 5 * 60 * 1000,
    });
}

export function useGoogleSessionMutation() {
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
                queryClient.setQueryData(sessionKey, createSessionObject(data));
            },
        }
    );
}

export function useLoginSessionMutation() {
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
                queryClient.setQueryData(sessionKey, createSessionObject(data));
            },
        }
    );
}

export function useLogoutSessionMutation() {
    const queryClient = useQueryClient();
    return useMutation(
        async () => {
            const response = await httpClient.delete('auth/logout');
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.setQueryData(sessionKey, createSessionObject());
            },
        }
    );
}

function createSessionObject(data?: UserSession) {
    const session: SessionCheck = { isLoggedIn: Boolean(data?.user), user: data?.user };
    return session;
}
