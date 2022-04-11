import { Recipe } from '../../types';
import dayjs from 'dayjs';

export function mapRecipe(recipe: Recipe): Recipe {
    return {
        ...recipe,
        createdAt: dayjs(recipe.createdAt),
        updatedAt: recipe.updatedAt ? dayjs(recipe.updatedAt) : recipe.updatedAt,
    };
}
