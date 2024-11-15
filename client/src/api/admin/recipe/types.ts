import { CategoryRecipes, Recipe } from '../../../types';

interface InstructionResponse {
    description: string;
}

interface IngredientResponse {
    amount: number;
    measurementType: string;
    name: string;
}

export interface GetRecipeResponse {
    id: number;
    title: string;
    description: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    totalTimeMinutes: number;
    mainImage: string;
    categories: Array<string>;
    instructions: Array<InstructionResponse>;
    ingredients: Array<IngredientResponse>;
    isPublished: boolean;
    isFeatured: boolean;
    createdBy: string;
    createdAt: string;
    updatedBy?: string;
    updatedAt?: string;
}

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

export interface DeleteRecipeVariables {
    recipe: number;
}

export interface DeleteRecipeContext extends RecipeListContext {
    previousRecipe?: Recipe;
}
