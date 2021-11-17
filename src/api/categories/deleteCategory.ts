import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobalContext } from '../../contexts/RecipesContext';

export function DeleteCategory() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();
    const { categories, setCategories } = useGlobalContext();

    const deleteCategoryRequest = async (categoryName: string) => {
        setLoading(true);
        try {
            const response = await httpClient.delete<string>(`/v1/Category/${categoryName}`);
            const resData = response.data;
            setCategories(categories.filter((c) => c !== resData));
            return resData;
        } catch (error) {
            console.log(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { deleteCategoryRequest, deleteCategoryLoading: loading };
}
