import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { Category, CategoryDetails } from '../../types';
import httpClient, { dataGet } from '../httpClient';
import { mapCategoryDetail } from './mapCategory';
import {
    CategoryDetailsResponse,
    CategoryListResponse,
    CategoryNameListResponse,
    DeleteCategoryContext,
    DeleteCategoryVariables,
    UpdateCategoryVisibilityContext,
    UpdateCategoryVisibilityVariables,
} from './types';

export const categoryKey = 'category';
export const categoryListKey = 'categoryList';

export function useCategoryNameList() {
    return useQuery(categoryKey, dataGet<CategoryNameListResponse>('category'));
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
        () =>
            dataGet<CategoryDetailsResponse>(`category/${categoryName}/details`)().then((x) => {
                return { recipes: x.recipes.map(mapCategoryDetail) };
            }),
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
            onError: (_err, { categoryName }, context) => {
                if (!context) {
                    return;
                }
                const { previousCategories, previousDetails } = context;
                if (previousCategories) {
                    queryClient.setQueryData<CategoryListResponse>(categoryListKey, previousCategories);
                }

                if (previousDetails) {
                    queryClient.setQueryData<CategoryDetails>([categoryListKey, categoryName], previousDetails);
                }
            },
            onSettled: (_data, _err, { categoryName }) => {
                queryClient.invalidateQueries(categoryListKey);
                queryClient.removeQueries([categoryListKey, categoryName]);
            },
        }
    );
}

export function useUpdateCategoryVisibilityMutation() {
    const queryClient = useQueryClient();

    return useMutation<Category, AxiosError, UpdateCategoryVisibilityVariables, UpdateCategoryVisibilityContext>(
        async ({ categoryName, isVisible }) => {
            const response = await httpClient.put(`category/${categoryName}/visible/${isVisible}`);
            return response.data;
        },
        {
            onMutate: ({ categoryName, isVisible }) => {
                const previousCategories = queryClient.getQueryData<CategoryListResponse>(categoryListKey);

                if (previousCategories) {
                    queryClient.setQueryData<CategoryListResponse>(
                        categoryListKey,
                        previousCategories.map((x) => {
                            if (x.categoryName === categoryName) {
                                x.visible = isVisible;
                            }
                            return x;
                        })
                    );
                }

                return { previousCategories };
            },
            onError: (_err, _variables, context) => {
                if (!context) {
                    return;
                }
                const { previousCategories } = context;
                if (previousCategories) {
                    queryClient.setQueryData<CategoryListResponse>(categoryListKey, previousCategories);
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(categoryListKey);
            },
        }
    );
}
