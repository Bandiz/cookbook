import { Recipe } from "../types";

export const getFilteredRecipes = (recipes: Recipe[], category: string) => {
    if (category === 'All') {
        return recipes;
    }
    return recipes.filter((recipe) => recipe.categories.includes(category));
}