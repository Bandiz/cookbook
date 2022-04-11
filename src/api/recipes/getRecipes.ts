import { useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { Recipe } from '../../types';
import { mapRecipe } from './mapRecipe';

type GetRecipesResponse =
    | {
          type: 'response';
          payload: Recipe[];
      }
    | { type: 'error'; error: string };

export function GetRecipes() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();

    const getRecipesRequest = async (): Promise<GetRecipesResponse> => {
        setLoading(true);
        try {
            const response = await httpClient.get<Recipe[]>(`/v1/Recipe`);

            return { type: 'response', payload: response.data.map(mapRecipe) };
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

    return { getRecipesRequest, getRecipesLoading: loading };
}
