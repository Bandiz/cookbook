import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/RecipesContext';

type CreateCategoryResponse =
    | {
          type: 'response';
          success: boolean;
      }
    | { type: 'error'; error: string };

export function CreateCategory() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();
    const { categories, setCategories, userData } = useGlobalContext();

    const createCategoryRequest = async (categoryName: string): Promise<CreateCategoryResponse> => {
        if (!userData || !userData.token) {
            return {
                type: 'error',
                error: 'Unauthorized',
            };
        }

        if (categories.includes(categoryName)) {
            return {
                type: 'response',
                success: false,
            };
        }
        setLoading(true);
        try {
            const response = await httpClient.post<string>(
                `/v1/Category`,
                { categoryName },
                {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                }
            );
            const resData = response.data;
            setCategories([...categories, resData]);
            return {
                type: 'response',
                success: true,
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
