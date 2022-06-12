import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { CategoryDetails } from '../../types';
import { categoryListKey } from '../categories';
import httpClient from '../httpClient';
import { RemoveFromCategoryContext, RemoveFromCategoryVariables } from './types';

export function useRemoveFromCategoryMutation() {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, RemoveFromCategoryVariables, RemoveFromCategoryContext>(
        async ({ recipeId, categoryName }) => {
            await httpClient.delete(`/v1/recipe/${recipeId}/category/${categoryName}`);
        },
        {
            onMutate: ({ recipeId, categoryName }) => {
                queryClient.cancelQueries(categoryListKey);

                const previousDetails = queryClient.getQueryData<CategoryDetails>([categoryListKey, categoryName]);

                if (previousDetails) {
                    queryClient.setQueryData<CategoryDetails>([categoryListKey, categoryName], {
                        ...previousDetails,
                        recipes: previousDetails.recipes.filter((x) => x.id === recipeId),
                    });
                }

                return { previousDetails };
            },
            onError: (_err, variables, context) => {
                if (!context?.previousDetails) {
                    return;
                }
                queryClient.setQueryData<CategoryDetails>(
                    [categoryListKey, variables.categoryName],
                    context.previousDetails
                );
            },
            // onSettled:  todo: invalidate recipes
        }
    );
}
