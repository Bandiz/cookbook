import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { Category } from '../../../types';
import { CategoryListKey } from '../../apiQueryKeys';
import httpClient from '../../httpClient';
import { CategoryListResponse, CreateCategoryContext, CreateCategoryVariables } from './types';
import { mapCategory } from './utils';

export default function useCreateCategory() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation<Category, AxiosError, CreateCategoryVariables, CreateCategoryContext>(
        async ({ categoryName, visible, isFeatured }) => {
            const { data } = await httpClient.post('category', { categoryName, visible, isFeatured });
            return mapCategory(data);
        },
        {
            onMutate: ({ categoryName, visible, isFeatured }) => {
                queryClient.cancelQueries(CategoryListKey);

                const previousCategories = queryClient.getQueryData<CategoryListResponse>(CategoryListKey);

                if (previousCategories) {
                    const newCategory: Category = {
                        categoryName,
                        visible,
                        mainImage: null,
                        images: [],
                        createdAt: dayjs(),
                        createdBy: user?.email ?? '',
                        isFeatured,
                    };
                    previousCategories.push(newCategory);
                    queryClient.setQueryData<CategoryListResponse>(CategoryListKey, previousCategories);
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
