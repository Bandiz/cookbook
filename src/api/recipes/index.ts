import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { CategoryDetails } from '../../types';
import { CategoryListKey } from '../apiQueryKeys';
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
                queryClient.cancelQueries(CategoryListKey);

                const previousDetails = queryClient.getQueryData<CategoryDetails>([CategoryListKey, categoryName]);

                if (previousDetails) {
                    queryClient.setQueryData<CategoryDetails>([CategoryListKey, categoryName], {
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
                    [CategoryListKey, variables.categoryName],
                    context.previousDetails
                );
            },
            // onSettled:  todo: invalidate recipes
        }
    );
}
