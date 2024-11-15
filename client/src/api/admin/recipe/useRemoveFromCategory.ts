import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { CategoryRecipes } from '../../../types';
import { CategoryListKey } from '../../apiQueryKeys';
import httpClient from '../../httpClient';
import { RemoveFromCategoryContext, RemoveFromCategoryVariables } from './types';

export function useRemoveFromCategory() {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, RemoveFromCategoryVariables, RemoveFromCategoryContext>(
        async ({ recipeId, categoryName }) => {
            await httpClient.delete(`/recipe/${recipeId}/category/${categoryName}`);
        },
        {
            onMutate: ({ recipeId, categoryName }) => {
                queryClient.cancelQueries(CategoryListKey);

                const previousDetails = queryClient.getQueryData<CategoryRecipes>([CategoryListKey, categoryName]);

                if (previousDetails) {
                    queryClient.setQueryData<CategoryRecipes>([CategoryListKey, categoryName], {
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
                queryClient.setQueryData<CategoryRecipes>(
                    [CategoryListKey, variables.categoryName],
                    context.previousDetails
                );
            },
            // onSettled:  todo: invalidate recipes
        }
    );
}
