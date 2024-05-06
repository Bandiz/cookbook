import { Category, CategoryRecipes } from '../../types';

export type CategoryNameListResponse = Array<string>;

export type CategoryListResponse = Array<Category>;

export type CategoryRecipesResponse = CategoryRecipes;

export interface DeleteCategoryVariables {
    categoryName: string;
}

export interface DeleteCategoryContext extends CategoryListContext {
    previousDetails?: CategoryRecipes;
}

export interface UpdateCategoryVariables {
    categoryName: string;
    visible?: boolean;
    mainImage?: string;
}

export type UpdateCategoryContext = CategoryListContext;

export interface AddCategoryImagesVariables {
    categoryName: string;
    imageIds: Array<string>;
}

export type AddCategoryImagesContext = CategoryListContext;

export interface CreateCategoryVariables {
    categoryName: string;
    visible: boolean;
}

export type CreateCategoryContext = CategoryListContext;

interface CategoryListContext {
    previousCategories?: CategoryListResponse;
}
