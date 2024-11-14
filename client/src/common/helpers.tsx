import { Recipe } from '../types';

export const getFilteredRecipes = (recipes: Recipe[], category: string) => {
    if (category === 'All') {
        return recipes;
    }

    const filteredRecipes = recipes.filter((recipe) => recipe.categories.includes(category));
    const featuredRecipes = filteredRecipes.filter((recipe) => recipe.isFeatured);

    return featuredRecipes.length > 0 ? featuredRecipes : filteredRecipes.slice(0, 10);
};
