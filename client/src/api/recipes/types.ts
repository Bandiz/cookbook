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

export type RecipeListResponse = Array<Recipe>;

export type CreateRecipeVariables = Omit<Partial<Recipe>, 'id' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy'>;

export type CreateRecipeContext = RecipeListContext;

interface RecipeListContext {
    previousRecipes?: RecipeListResponse;
}
