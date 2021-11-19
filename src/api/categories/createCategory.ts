import moment from 'moment';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/RecipesContext';
import { Category } from '../../types';

type CreateCategoryResponse =
    | {
          type: 'response';
          payload: Category;
      }
    | { type: 'error'; error: string };

export function CreateCategory() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();
    const { userData } = useGlobalContext();

    const createCategoryRequest = async (categoryName: string): Promise<CreateCategoryResponse> => {
        if (!userData || !userData.token) {
            return {
                type: 'error',
                error: 'Unauthorized',
            };
        }

        setLoading(true);
        try {
            const response = await httpClient.post<Category>(
                `/v1/Category`,
                { categoryName },
                {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                }
            );
            return {
                type: 'response',
                payload: { ...response.data, createdAt: moment(response.data.createdAt) },
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

    return { createCategoryRequest, createCategoryLoading: loading };
}
