import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Category } from '../../../types';
import { CategoryKey, CategoryListKey, UserListKey } from '../../apiQueryKeys';
import httpClient from '../../httpClient';
import { UpdateUserRequest, UpdateUserResponse, UpdateUserVariables, User } from './types';

export default function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation<User, AxiosError, UpdateUserVariables>(
        async ({ id, ...request }) => {
            const response = await httpClient.put<UpdateUserResponse>(`user/${id}`, request);
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
            onSettled: () => {
                queryClient.invalidateQueries(UserListKey);
            },
        }
    );
}
