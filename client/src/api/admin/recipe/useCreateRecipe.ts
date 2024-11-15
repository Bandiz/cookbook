import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { Recipe } from '../../../types';
import httpClient from '../../httpClient';
import { mapRecipe } from './utils';
import { CreateRecipeContext, CreateRecipeVariables, RecipeListResponse } from './types';
import { RecipeListKey } from '../../apiQueryKeys';

export default function useCreateCategory() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation<Recipe, AxiosError, CreateRecipeVariables, CreateRecipeContext>(
        async (variables) => {
            const { data } = await httpClient.post<Recipe>('recipe', variables);
            return mapRecipe(data);
        },
        {
            onMutate: (recipe) => {
                queryClient.cancelQueries(RecipeListKey);

                const previousRecipes = queryClient.getQueryData<RecipeListResponse>(RecipeListKey);

                if (previousRecipes) {
                    const newRecipe = {
                        ...recipe,
                        id: Math.round(Math.random() * 1000000).toString(),
                        createdAt: dayjs(),
                        createdBy: user?.email ?? '',
                    } as Recipe;
                    queryClient.setQueryData<RecipeListResponse>(RecipeListKey, [...previousRecipes, newRecipe]);
                }

                return { previousRecipes };
            },
            onError: (_err, _variables, context) => {
                if (!context) {
                    return;
                }
                const { previousRecipes } = context;
                if (previousRecipes) {
                    queryClient.setQueryData<RecipeListResponse>(RecipeListKey, previousRecipes);
                }
            },
            onSettled: () => {
                queryClient.invalidateQueries(RecipeListKey);
            },
        }
    );
}
