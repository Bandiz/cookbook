import { useQuery } from 'react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { UserListKey } from '../../apiQueryKeys';
import httpClient from '../../httpClient';
import { GetUserListResponse } from './types';

export default function useUserList() {
    const { isAdmin } = useAuth();

    return useQuery(UserListKey, () => httpClient.get<GetUserListResponse>('user'), {
        enabled: isAdmin,
    });
}
