import moment from 'moment';

import { Recipe } from '../../types';

export function mapRecipe(recipe: Recipe): Recipe {
    return { ...recipe, createdAt: moment(recipe.createdAt), updatedAt: moment(recipe.updatedAt) };
}
