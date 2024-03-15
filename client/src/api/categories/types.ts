import { Category, CategoryDetails } from '../../types';

export type CategoryNameListResponse = Array<string>;

export type CategoryListResponse = Array<Category>;

export type CategoryDetailsResponse = CategoryDetails;

export interface DeleteCategoryVariables {
    categoryName: string;
}

export interface DeleteCategoryContext extends CategoryListContext {
    previousDetails?: CategoryDetails;
}

export interface UpdateCategoryVisibilityVariables {
    categoryName: string;
    isVisible: boolean;
}

export type UpdateCategoryVisibilityContext = CategoryListContext;

export interface CreateCategoryVariables {
    categoryName: string;
    visible: boolean;
}

export type CreateCategoryContext = CategoryListContext;

interface CategoryListContext {
    previousCategories?: CategoryListResponse;
}
