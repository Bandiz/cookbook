import moment from 'moment';
import { Moment } from 'moment';
import { useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/RecipesContext';

type Response = {
    categories: string[];
    updatedBy: string;
    updatedAt: Moment;
};

type RemoveFromCategoryResponse =
    | {
          type: 'response';
          payload: Response;
      }
    | {
          type: 'error';
          error: string;
      };

export function RemoveFromCategory() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();
    const { userData } = useGlobalContext();

    const removeFromCategoryRequest = async (
        recipeId: string,
        categoryName: string
    ): Promise<RemoveFromCategoryResponse> => {
        if (!userData || !userData.token) {
            return {
                type: 'error',
                error: 'Unauthorized',
            };
        }
        setLoading(true);
        try {
            const { data } = await httpClient.delete<Response>(`/v1/recipe/${recipeId}/category/${categoryName}`, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });
            return {
                type: 'response',
                payload: { ...data, updatedAt: moment(data.updatedAt) },
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

    return { removeFromCategoryRequest, removeFromCategoryLoading: loading };
}
