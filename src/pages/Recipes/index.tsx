import { useEffect } from "react";

import Search from "../../components/Shared/Search";
import RecipeList from "../../components/RecipeList";
import { useGlobalContext } from "../../RecipesContext";

import "./Recipes.scss";
import { getRecipes } from "../../api/getRecipes";

export default function Recipes() {
    const { recipes } = useGlobalContext();
    const { getRecipesRequest } = getRecipes();

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
