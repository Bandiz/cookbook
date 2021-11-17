import axios from 'axios';
import { useState } from 'react';
import { useGlobalContext } from '../../contexts/RecipesContext';
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
    const { userData, updateRecipe } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const request = async (recipe: Partial<Recipe>): Promise<UpdateRecipeResponse> => {
        if (!userData || !userData.token) {
            return {
                type: 'error',
                error: 'Unauthorized',
            };
        }

        setLoading(true);
        try {
            const response = await axios.put<Recipe>(`${process.env.REACT_APP_API_URL}v1/Recipe/${recipe.id}`, recipe, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });
            updateRecipe(response.data);
            return {
                type: 'response',
                payload: response.data,
            };
        } catch (e) {
            return {
                type: 'error',
                error: 'problem with unknowns',
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
