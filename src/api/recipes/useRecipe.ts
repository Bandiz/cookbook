import { useQuery } from 'react-query';
import { Recipe } from '../../types';
import { RecipeKey } from '../apiQueryKeys';
import { dataGet } from '../httpClient';
import { mapRecipe } from './utils';

export function useRecipe(id: string) {
    return useQuery([RecipeKey, id], () => dataGet<Recipe>(`recipe/${id}`)().then(mapRecipe));
}
