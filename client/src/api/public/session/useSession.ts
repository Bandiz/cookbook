import { useQuery } from 'react-query';
import { SessionKey } from '../../apiQueryKeys';
import { dataGet } from '../../httpClient';
import { LoginResponse } from './types';

export default function useSession() {
    return useQuery(SessionKey, dataGet<LoginResponse>('auth/isLoggedIn'), {
        refetchIntervalInBackground: true,
        refetchInterval: 5 * 60 * 1000,
    });
}
