import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { Recipe } from '../../types';
import { RecipeKey } from '../apiQueryKeys';
import httpClient from '../httpClient';
import { mapRecipe } from './utils';

export function useUpdateRecipeMutation() {
    const queryClient = useQueryClient();

    return useMutation<Recipe, AxiosError, Partial<Recipe>, { previousRecipe?: Recipe }>(
        async (recipe) => {
            const { data } = await httpClient.patch<Recipe>(`recipe/${recipe.id}`, recipe);
            return mapRecipe(data);
        },
        {
            onMutate: (recipe) => {
                queryClient.cancelQueries([RecipeKey, recipe.id]);

                const previousRecipe = queryClient.getQueryData<Recipe>([RecipeKey, recipe.id]);

                if (previousRecipe) {
                    const updatedRecipe = { ...previousRecipe, ...recipe };
                    queryClient.setQueryData<Recipe>([RecipeKey, recipe.id], updatedRecipe);
                }

                return { previousRecipe };
            },
            onError: (_err, _variables, context) => {
                if (!context) {
                    return;
                }
                const { previousRecipe } = context;
                if (previousRecipe) {
                    queryClient.setQueryData<Recipe>([RecipeKey, previousRecipe.id], previousRecipe);
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(RecipeKey);
            },
        }
    );
}
