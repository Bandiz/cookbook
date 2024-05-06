import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Category } from '../../types';
import { CategoryListKey } from '../apiQueryKeys';
import httpClient from '../httpClient';
import { CategoryListResponse, UpdateCategoryContext, UpdateCategoryVariables } from './types';

export default function useUpdateCategoryMutation() {
    const queryClient = useQueryClient();

    return useMutation<Category, AxiosError, UpdateCategoryVariables, UpdateCategoryContext>(
        async ({ categoryName, visible, mainImage }) => {
            const response = await httpClient.put(`category/${categoryName}`, { visible, mainImage });
            return response.data;
        },
        {
            onMutate: ({ categoryName, visible, mainImage }) => {
                const previousCategories = queryClient.getQueryData<CategoryListResponse>(CategoryListKey);

                if (previousCategories) {
                    queryClient.setQueryData<CategoryListResponse>(
                        CategoryListKey,
                        previousCategories.map((x) => {
                            if (x.categoryName !== categoryName) {
                                return x;
                            }
                            if (typeof visible !== 'undefined') {
                                x.visible = visible;
                            }
                            if (typeof mainImage !== 'undefined') {
                                x.mainImage = mainImage;
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
