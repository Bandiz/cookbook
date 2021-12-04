import { useEffect } from 'react';

import Search from '../../components/Shared/Search';
import RecipeList from '../../components/RecipeList';
import { useRecipes } from '../../contexts/RecipesContext';

import './Recipes.scss';
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
        <div className="recipes-page">
            <Search />
            <RecipeList recipes={recipes} />
        </div>
    );
}
