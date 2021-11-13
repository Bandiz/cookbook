import { useState } from 'react';

import { useAuth } from '../../AuthContext';
import { useGlobalContext } from '../../RecipesContext';

export function GetCategories() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();
    const { setCategories } = useGlobalContext();

    const getCategoriesRequest = async () => {
        setLoading(true);
        try {
            const response = await httpClient.get<string[]>(`/v1/Category`);
            setCategories(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { getCategoriesRequest, getCategoriesLoading: loading };
}
