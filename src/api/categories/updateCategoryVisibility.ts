import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Category } from '../../types';
import { mapCategory } from './mapCategory';

type UpdateCategoryVisibilityResponse =
    | {
          type: 'response';
          payload: Category;
      }
    | { type: 'error'; error: string };

export function UpdateCategoryVisibility() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();

    const updateCategoryVisibilityRequest = async (
        categoryName: string,
        visible: boolean
    ): Promise<UpdateCategoryVisibilityResponse> => {
        setLoading(true);
        try {
            const response = await httpClient.put<Category>(
                `/v1/Category/${categoryName}/visible/${visible}`,
                undefined
            );
            return {
                type: 'response',
                payload: mapCategory(response.data),
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

    return { updateCategoryVisibilityRequest, updateCategoryVisibilityLoading: loading };
}