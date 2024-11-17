import { Recipe } from '../types';

export const getFilteredRecipes = (recipes: Recipe[], category?: string) => {
    if (category && category === 'All') {
        return recipes;
    }

    const NUMBER_OF_RECIPES = 5;

    const filteredRecipes: Recipe[] = category
        ? recipes.filter((recipe) => recipe.categories.includes(category))
        : recipes;

    const featuredRecipes = filteredRecipes.filter((recipe) => recipe.isFeatured);

    return featuredRecipes.length > 0 ? featuredRecipes : filteredRecipes.slice(0, NUMBER_OF_RECIPES);
};
