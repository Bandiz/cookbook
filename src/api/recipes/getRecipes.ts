import { useState } from 'react';

import { useAuth } from '../../contexts/AuthContext';
import { useRecipes } from '../../contexts/RecipesContext';
import { Recipe } from '../../types';

export function GetRecipes() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();
    const { setRecipes } = useRecipes();

    const getRecipesRequest = async () => {
        setLoading(true);
        try {
            const response = await httpClient.get<Recipe[]>(`/v1/Recipe`);
            setRecipes(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { getRecipesRequest, getRecipesLoading: loading };
}
