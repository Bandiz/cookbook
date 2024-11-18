import { Category, CategoryRecipes } from '../../../types';

export type CategoryListResponse = Array<Category>;

export type CategoryResponse = Category;

export type CategoryRecipesResponse = CategoryRecipes;

export interface DeleteCategoryVariables {
    categoryName: string;
}

export interface DeleteCategoryContext extends CategoryListContext {
    previousCategoryRecipes?: CategoryRecipes;
    previousCategory?: Category;
}

export interface UpdateCategoryVariables {
    categoryName: string;
    visible?: boolean;
    mainImage: string | null;
    isFeatured?: boolean;
}

export interface UpdateCategoryContext {
    previousCategory: Category;
}

export interface AddCategoryImagesVariables {
    categoryName: string;
    imageIds: Array<string>;
}

export type AddCategoryImagesContext = CategoryListContext;

export interface CreateCategoryVariables {
    categoryName: string;
    visible: boolean;
    isFeatured: boolean;
}

export type CreateCategoryContext = CategoryListContext;

interface CategoryListContext {
    previousCategories?: CategoryListResponse;
}
