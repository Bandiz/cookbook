import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Category } from '../../types';
import { CategoryListKey } from '../apiQueryKeys';
import httpClient from '../httpClient';
import { CategoryListResponse, UpdateCategoryVisibilityContext, UpdateCategoryVisibilityVariables } from './types';

export default function useUpdateCategoryVisibilityMutation() {
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
