import { Category, CategoryRecipe } from '../../types';
import dayjs from 'dayjs';

export function mapCategory(category: Category): Category {
    return {
        ...category,
        createdAt: dayjs(category.createdAt),
        updatedAt: category.updatedAt ? dayjs(category.updatedAt) : category.updatedAt,
    };
}

export function mapCategoryRecipe(value: CategoryRecipe): CategoryRecipe {
    return {
        ...value,
        createdAt: dayjs(value.createdAt),
        updatedAt: value.updatedAt ? dayjs(value.updatedAt) : value.updatedAt,
    };
}
