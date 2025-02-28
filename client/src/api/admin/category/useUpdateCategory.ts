import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Category } from '../../../types';
import { CategoryKey, CategoryListKey } from '../../apiQueryKeys';
import httpClient from '../../httpClient';
import { CategoryResponse, UpdateCategoryContext, UpdateCategoryVariables } from './types';

export default function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation<Category, AxiosError, UpdateCategoryVariables, UpdateCategoryContext>(
        async ({ categoryName, visible, mainImage, isFeatured }) => {
            const response = await httpClient.put<CategoryResponse>(`category/${categoryName}`, {
                visible,
                mainImage,
                isFeatured,
            });
            return response.data;
        },
        {
            // TODO: Redo this
            // onMutate: ({ categoryName, visible, mainImage, isFeatured }) => {
            //     const previousCategory = queryClient.getQueryData<CategoryResponse>([CategoryKey, categoryName]);

            //     if (!previousCategory) {
            //         return;
            //     }

            //     const categoryCopy = { ...previousCategory };

            //     if (typeof visible !== 'undefined') {
            //         categoryCopy.visible = visible;
            //     }
            //     if (typeof mainImage !== 'undefined') {
            //         categoryCopy.mainImage = mainImage;
            //     }
            //     if (typeof isFeatured !== 'undefined') {
            //         categoryCopy.isFeatured = isFeatured;
            //     }

            //     queryClient.setQueryData<CategoryResponse>([CategoryKey, categoryName], categoryCopy);

            //     return { previousCategory };
            // },
            // onError: (_err, variables, context) => {
            //     if (!context) {
            //         return;
            //     }
            //     const { previousCategory } = context;
            //     const { categoryName } = variables;

            //     if (previousCategory) {
            //         queryClient.setQueryData<CategoryResponse>([CategoryKey, categoryName], previousCategory);
            //     }
            // },
            onSettled: (_data, _err, { categoryName }) => {
                // TODO: Invalidate public category list
                queryClient.invalidateQueries([CategoryKey, categoryName]);
                queryClient.invalidateQueries(CategoryListKey);
            },
        }
    );
}
