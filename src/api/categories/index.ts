import { AxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { Category, CategoryDetails } from '../../types';
import { CategoryKey, CategoryListKey } from '../apiQueryKeys';
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

export function useCategoryNameList() {
    return useQuery(CategoryKey, dataGet<CategoryNameListResponse>('category'));
}

export function useCategoryList() {
    const { isAdmin } = useAuth();

    return useQuery(CategoryListKey, dataGet<CategoryListResponse>('category/list'), {
        enabled: isAdmin,
    });
}

export function useCategoryDetails(categoryName: string, opened?: boolean) {
    const { isAdmin } = useAuth();

    return useQuery(
        [CategoryListKey, categoryName],
        () =>
            dataGet<CategoryDetailsResponse>(`category/${categoryName}/details`)().then((x) => {
                return { recipes: x.recipes.map(mapCategoryDetail) };
            }),
        {
            initialData: { recipes: [] },
            enabled: isAdmin && opened,
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
                queryClient.cancelQueries(CategoryListKey);

                const previousCategories = queryClient.getQueryData<CategoryListResponse>(CategoryListKey);

                if (previousCategories) {
                    queryClient.setQueryData<CategoryListResponse>(
                        CategoryListKey,
                        previousCategories.filter((x) => x.categoryName !== categoryName)
                    );
                }

                const previousDetails = queryClient.getQueryData<CategoryDetails>([CategoryListKey, categoryName]);

                if (previousDetails) {
                    queryClient.removeQueries([CategoryListKey, categoryName]);
                }

                return { previousCategories, previousDetails };
            },
            onError: (_err, { categoryName }, context) => {
                if (!context) {
                    return;
                }
                const { previousCategories, previousDetails } = context;
                if (previousCategories) {
                    queryClient.setQueryData<CategoryListResponse>(CategoryListKey, previousCategories);
                }

                if (previousDetails) {
                    queryClient.setQueryData<CategoryDetails>([CategoryListKey, categoryName], previousDetails);
                }
            },
            onSettled: (_data, _err, { categoryName }) => {
                queryClient.invalidateQueries(CategoryListKey);
                queryClient.removeQueries([CategoryListKey, categoryName]);
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
                const previousCategories = queryClient.getQueryData<CategoryListResponse>(CategoryListKey);

                if (previousCategories) {
                    queryClient.setQueryData<CategoryListResponse>(
                        CategoryListKey,
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
                    queryClient.setQueryData<CategoryListResponse>(CategoryListKey, previousCategories);
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(CategoryListKey);
            },
        }
    );
}
