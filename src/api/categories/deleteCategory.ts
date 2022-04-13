import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

type DeleteCategoryResponse =
    | {
          type: 'response';
      }
    | {
          type: 'error';
          error: string;
      };

export function DeleteCategory() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();

    const deleteCategoryRequest = async (categoryName: string): Promise<DeleteCategoryResponse> => {
        setLoading(true);
        try {
            await httpClient.delete(`/v1/Category/${categoryName}`);
            return {
                type: 'response',
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

    return { deleteCategoryRequest, deleteCategoryLoading: loading };
}
