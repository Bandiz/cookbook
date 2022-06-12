import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { CategoryDetails } from '../../types';
import httpClient, { dataGet } from '../httpClient';
import {
    CategoryDetailsResponse,
    CategoryListResponse,
    CategoryNameListResponse,
    DeleteCategoryContext,
    DeleteCategoryVariables,
} from './types';

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

export function useDeleteCategoryMutation() {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, DeleteCategoryVariables, DeleteCategoryContext>(
        async ({ categoryName }) => {
            await httpClient.delete(`category/${categoryName}`);
        },
        {
            onMutate: ({ categoryName }) => {
                queryClient.cancelQueries(categoryListKey);

                const previousCategories = queryClient.getQueryData<CategoryListResponse>(categoryListKey);

                if (previousCategories) {
                    queryClient.setQueryData<CategoryListResponse>(
                        categoryListKey,
                        previousCategories.filter((x) => x.categoryName !== categoryName)
                    );
                }

                const previousDetails = queryClient.getQueryData<CategoryDetails>([categoryListKey, categoryName]);

                if (previousDetails) {
                    queryClient.removeQueries([categoryListKey, categoryName]);
                }

                return { previousCategories, previousDetails };
            },
            onError: (_err, variables, context) => {
                if (context?.previousCategories) {
                    queryClient.setQueryData<CategoryListResponse>(categoryListKey, context.previousCategories);
                }

                if (context?.previousDetails) {
                    queryClient.setQueryData<CategoryDetails>(
                        [categoryListKey, variables.categoryName],
                        context.previousDetails
                    );
                }
            },
            // TODO: invaliadte recipes
        }
    );
}
