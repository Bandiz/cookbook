import { CategoryDetails } from '../../types';

export interface RemoveFromCategoryVariables {
    recipeId: string;
    categoryName: string;
}

export interface RemoveFromCategoryContext {
    previousDetails?: CategoryDetails;
}
