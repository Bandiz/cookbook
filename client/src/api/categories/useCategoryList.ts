import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { CategoryListKey } from '../apiQueryKeys';
import httpClient from '../httpClient';
import { CategoryListResponse } from './types';
import { mapCategory } from './utils';

export default function useCategoryList() {
    const { isAdmin } = useAuth();

    return useQuery(
        CategoryListKey,
        () => httpClient.get<CategoryListResponse>('category/list').then((x) => x.data.map(mapCategory)),
        {
            enabled: isAdmin,
        }
    );
}
