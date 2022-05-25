import { useEffect } from 'react';

import RecipeList from '../../components/RecipeList';
import { useRecipes } from '../../contexts/RecipesContext';

import { GetRecipes } from '../../api/recipes/getRecipes';

export default function Recipes() {
    const { recipes } = useRecipes();
    const { getRecipesRequest } = GetRecipes();

    useEffect(() => {
        if (recipes.length === 0) {
            getRecipesRequest();
        }
    }, []);

    return (
        <>
            <RecipeList recipes={recipes} />
        </>
    );
}
