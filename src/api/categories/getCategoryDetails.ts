import { useState } from 'react';
import dayjs from 'dayjs';

import { useAuth } from '../../contexts/AuthContext';
import { CategoryDetails } from '../../types';
import { mapCategoryDetail } from './mapCategory';

type GetCategoryDetailsResponse =
    | {
          type: 'response';
          payload: CategoryDetails;
      }
    | { type: 'error'; error: string };

export function GetCategoryDetails() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();

    const getCategoryDetailsRequest = async (categoryName: string): Promise<GetCategoryDetailsResponse> => {
        setLoading(true);
        try {
            const response = await httpClient.get<CategoryDetails>(`/v1/Category/${categoryName}/details`);
            return {
                type: 'response',
                payload: {
                    recipes: response.data.recipes.map(mapCategoryDetail),
                },
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

    return { getCategoryDetailsRequest, getCategoryDetailsLoading: loading };
}
