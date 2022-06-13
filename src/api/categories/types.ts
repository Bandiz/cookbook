import { Category, CategoryDetails } from '../../types';

export type CategoryNameListResponse = Array<string>;

export type CategoryListResponse = Array<Category>;

export type CategoryDetailsResponse = CategoryDetails;

export interface DeleteCategoryVariables {
    categoryName: string;
}

export interface DeleteCategoryContext {
    previousCategories?: CategoryListResponse;
    previousDetails?: CategoryDetails;
}

export interface UpdateCategoryVisibilityVariables {
    categoryName: string;
    isVisible: boolean;
}

export interface UpdateCategoryVisibilityContext {
    previousCategories?: CategoryListResponse;
}
