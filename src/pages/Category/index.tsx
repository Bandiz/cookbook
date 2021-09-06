import { useEffect } from "react";
import { useParams } from "react-router-dom";

import RecipeList from "../../components/RecipeList";
import { Search } from "../../components/Shared";
import { useGlobalContext } from "../../RecipesContext";
import { Recipe } from "../../types";

import "./Category.scss";

export default function Category() {
    const { category } = useParams<{ category: string }>();
    const { recipes, fetchRecipes } = useGlobalContext();
    const { categories, fetchCategories } = useGlobalContext();

    useEffect(() => {
        if (recipes.length === 0) {
            fetchRecipes();
        }
        fetchCategories();
    }, []);

    console.log(categories);

    const recipesByCategory: Recipe[] = [];
    recipes.map((c) =>
        c.categories.forEach((x) => {
            if (x.toLowerCase() === category) {
                recipesByCategory.push(c);
            }
        })
    );

    return (
        <div className="category-page">
            <Search />
            <RecipeList category={category} recipes={recipesByCategory} />
        </div>
    );
}
