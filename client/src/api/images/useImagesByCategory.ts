import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import httpClient from '../httpClient';
import { ByCategoryKey } from '../apiQueryKeys';
import { ImagesByCategoryResponse } from './types';

export function useImagesByCategory() {
    const { isAdmin } = useAuth();

    return useQuery(
        ByCategoryKey,
        () => httpClient.get<ImagesByCategoryResponse>('image/byCategory').then((x) => x.data),
        {
            enabled: isAdmin,
        }
    );
}
