import { CategoryRecipes, Recipe } from '../../types';

export interface RemoveFromCategoryVariables {
    recipeId: string;
    categoryName: string;
}

export interface RemoveFromCategoryContext {
    previousDetails?: CategoryRecipes;
}

export type UpdateRecipeVariables = Partial<Recipe>;

export interface UpdateRecipeContext {
    previousRecipe?: Recipe;
}
