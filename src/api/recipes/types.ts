import { CategoryDetails, Recipe } from '../../types';

export interface RemoveFromCategoryVariables {
    recipeId: string;
    categoryName: string;
}

export interface RemoveFromCategoryContext {
    previousDetails?: CategoryDetails;
}

export type UpdateRecipeVariables = Partial<Recipe>;

export interface UpdateRecipeContext {
    previousRecipe?: Recipe;
}
