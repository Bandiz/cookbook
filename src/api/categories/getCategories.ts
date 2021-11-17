import { useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';

export function GetCategories() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();

    const getCategoriesRequest = async () => {
        setLoading(true);
        try {
            const response = await httpClient.get<string[]>(`/v1/Category`);
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
