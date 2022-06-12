import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { dataGet } from '../httpClient';
import { CategoryDetailsResponse, CategoryListResponse, CategoryNameListResponse } from './types';

export const categoryKey = 'category';
export const categoryListKey = 'categoryList';

export function useCategoryNameList() {
    return useQuery(categoryKey, dataGet<CategoryNameListResponse>('category'), {
        cacheTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}

export function useCategoryList() {
    const { isAuthenticated } = useAuth();
    return useQuery(categoryListKey, dataGet<CategoryListResponse>('category/list'), {
        enabled: isAuthenticated,
    });
}

export function useCategoryDetails(categoryName: string, opened?: boolean) {
    const { isAuthenticated } = useAuth();

    return useQuery(
        [categoryListKey, categoryName],
        dataGet<CategoryDetailsResponse>(`category/${categoryName}/details`),
        {
            initialData: { recipes: [] },
            enabled: isAuthenticated && opened,
        }
    );
}
