import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { RecipeKey, RecipeListKey } from '../../apiQueryKeys';
import httpClient from '../../httpClient';
import { DeleteRecipeContext, DeleteRecipeVariables, RecipeListResponse } from './types';
import { Recipe } from '../../../types';

export default function useDeleteRecipe() {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError, DeleteRecipeVariables, DeleteRecipeContext>(
        async ({ recipe }) => {
            await httpClient.delete(`recipe/${recipe}`);
        },
        {
            onMutate: ({ recipe }) => {
                const previousRecipe = queryClient.getQueryData<Recipe>([RecipeKey, recipe]);

                if (previousRecipe) {
                    queryClient.removeQueries([RecipeKey, recipe]);
                }

                const previousRecipes = queryClient.getQueryData<RecipeListResponse>(RecipeListKey);

                if (previousRecipes) {
                    queryClient.setQueryData<RecipeListResponse>(
                        RecipeListKey,
                        previousRecipes.filter((x) => x.id !== recipe)
                    );
                }

                return { previousRecipe, previousRecipes };
            },
            onError: (_err, { recipe }, context) => {
                if (!context) {
                    return;
                }
                const { previousRecipe, previousRecipes } = context;

                if (previousRecipe) {
                    queryClient.setQueryData<Recipe>([RecipeKey, recipe], previousRecipe);
                }

                if (previousRecipes) {
                    queryClient.setQueryData<RecipeListResponse>(RecipeListKey, previousRecipes);
                }
            },
            onSettled: (_data, _err, { recipe }) => {
                queryClient.invalidateQueries(RecipeListKey);
                queryClient.invalidateQueries(RecipeKey);
                queryClient.removeQueries([RecipeKey, recipe]);
            },
        }
    );
}
