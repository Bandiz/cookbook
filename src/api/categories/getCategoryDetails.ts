import moment from 'moment';
import { useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { CategoryDetails } from '../../types';

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
                    recipes: response.data.recipes.map((x) => ({
                        ...x,
                        createdAt: moment(x.createdAt),
                        updatedAt: x.updatedAt ? moment(x.updatedAt) : x.updatedAt,
                    })),
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
