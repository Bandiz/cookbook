import { useEffect } from "react";

import Search from "../../components/Shared/Search";
import RecipeList from "../../components/RecipeList";
import { useGlobalContext } from "../../RecipesContext";

import "./Recipes.scss";

export default function Recipes() {
    const { userData, recipes, fetchRecipes } = useGlobalContext();

    useEffect(() => {
        if (recipes.length === 0) {
            fetchRecipes();
        }
    }, []);

    return (
        <div className="recipes-page">
            <Search />
            <RecipeList user={userData?.user} recipes={recipes} />
        </div>
    );
}
