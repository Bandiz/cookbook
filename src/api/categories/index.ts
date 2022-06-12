import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { dataGet } from '../httpClient';
import { CategoryListResponse, CategoryNameListResponse } from './types';

const categoryKey = 'category';

export function useCategoryNameList() {
    return useQuery(categoryKey, dataGet<CategoryNameListResponse>('category'), {
        cacheTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}

export function useCategoryList() {
    const { isAuthenticated } = useAuth();
    return useQuery(categoryKey, dataGet<CategoryListResponse>('category/list'), {
        enabled: isAuthenticated,
    });
}
