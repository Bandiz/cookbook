import { useQuery } from 'react-query';
import { Recipe } from '../../types';
import { RecipeKey } from '../apiQueryKeys';
import { dataGet } from '../httpClient';
import { mapRecipe } from './utils';

export function useRecipes() {
    return useQuery(RecipeKey, () => dataGet<Recipe[]>(`recipe`)().then((x) => x.map(mapRecipe)));
}
