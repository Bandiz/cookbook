import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { CategoryDetails } from '../../types';
import { CategoryListKey } from '../apiQueryKeys';
import httpClient from '../httpClient';
import { CategoryListResponse, DeleteCategoryContext, DeleteCategoryVariables } from './types';

export default function useDeleteCategoryMutation() {
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
