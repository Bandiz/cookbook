import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { CategoryKey, CategoryListKey } from '../apiQueryKeys';
import httpClient from '../httpClient';
import {
    CategoryListResponse,
    CategoryRecipesResponse,
    CategoryResponse,
    DeleteCategoryContext,
    DeleteCategoryVariables,
} from './types';

export default function useDeleteCategoryMutation() {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, DeleteCategoryVariables, DeleteCategoryContext>(
        async ({ categoryName }) => {
            await httpClient.delete(`category/${categoryName}`);
        },
        {
            onMutate: ({ categoryName }) => {
                const previousCategories = queryClient.getQueryData<CategoryListResponse>(CategoryListKey);

                if (previousCategories) {
                    queryClient.setQueryData<CategoryListResponse>(
                        CategoryListKey,
                        previousCategories.filter((x) => x.categoryName !== categoryName)
                    );
                }

                const previousCategoryRecipes = queryClient.getQueryData<CategoryRecipesResponse>([
                    CategoryKey,
                    categoryName,
                    'recipes',
                ]);

                if (previousCategoryRecipes) {
                    queryClient.removeQueries([CategoryKey, categoryName, 'recipes']);
                }

                const previousCategory = queryClient.getQueryData<CategoryResponse>([CategoryKey, categoryName]);

                if (previousCategory) {
                    queryClient.removeQueries([CategoryKey, categoryName]);
                }

                return { previousCategories, previousCategoryRecipes, previousCategory };
            },
            onError: (_err, { categoryName }, context) => {
                if (!context) {
                    return;
                }
                const { previousCategories, previousCategoryRecipes, previousCategory } = context;
                if (previousCategories) {
                    queryClient.setQueryData<CategoryListResponse>(CategoryListKey, previousCategories);
                }

                if (previousCategoryRecipes) {
                    queryClient.setQueryData<CategoryRecipesResponse>(
                        [CategoryKey, categoryName, 'recipes'],
                        previousCategoryRecipes
                    );
                }

                if (previousCategory) {
                    queryClient.setQueryData<CategoryResponse>([CategoryKey, categoryName], previousCategory);
                }
            },
            onSettled: (_data, _err, { categoryName }) => {
                queryClient.invalidateQueries(CategoryListKey);
                queryClient.removeQueries([CategoryKey, categoryName, 'recipes']);
                queryClient.removeQueries([CategoryKey, categoryName]);
            },
        }
    );
}
