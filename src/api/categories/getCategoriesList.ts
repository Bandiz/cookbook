import { useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/RecipesContext';
import { Category } from '../../types';
import { mapCategory } from './mapCategory';

type GetCategoriesListResponse =
    | {
          type: 'response';
          payload: Category[];
      }
    | { type: 'error'; error: string };

export function GetCategoriesList() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();
    const { userData } = useGlobalContext();

    const getCategoriesRequest = async (): Promise<GetCategoriesListResponse> => {
        if (!userData || !userData.token) {
            return {
                type: 'error',
                error: 'Unauthorized',
            };
        }
        setLoading(true);
        try {
            const response = await httpClient.get<Category[]>(`/v1/Category/list`, {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            });
            return {
                type: 'response',
                payload: response.data.map(mapCategory),
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

    return { getCategoriesRequest, getCategoriesLoading: loading };
}
