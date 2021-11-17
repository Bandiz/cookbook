import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/RecipesContext';

export function CreateCategory() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();
    const { categories, setCategories } = useGlobalContext();

    const postCategoryRequest = async (categoryName: string) => {
        setLoading(true);
        try {
            const response = await httpClient.post<string>(`/v1/Category`, { categoryName });
            const resData = response.data;
            setCategories([...categories, resData]);
            return resData;
        } catch (error) {
            console.log(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { postCategoryRequest, postCategoryLoading: loading };
}