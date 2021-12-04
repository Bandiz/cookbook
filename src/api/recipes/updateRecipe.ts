import { useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useRecipes } from '../../contexts/RecipesContext';
import { Recipe } from '../../types';

type UpdateRecipeResponse =
    | {
          type: 'response';
          payload: Recipe;
      }
    | {
          type: 'error';
          error: string;
      };

export function UpdateRecipe() {
    const { updateRecipe } = useRecipes();
    const { httpClient } = useAuth();
    const [loading, setLoading] = useState(false);
    const request = async (recipe: Partial<Recipe>): Promise<UpdateRecipeResponse> => {
        setLoading(true);
        try {
            const response = await httpClient.put<Recipe>(`v1/Recipe/${recipe.id}`, recipe);
            updateRecipe(response.data);
            return {
                type: 'response',
                payload: response.data,
            };
        } catch (e) {
            if (e instanceof Error) {
                return {
                    type: 'error',
                    error: e.message,
                };
            }
            //TODO: return error types
            return {
                type: 'error',
                error: 'Problem in the backend',
            };
        } finally {
            setLoading(false);
        }
    };
    return {
        updateRecipeRequest: request,
        updateRecipeLoading: loading,
    };
}
