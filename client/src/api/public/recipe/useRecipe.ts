import { useQuery } from 'react-query';
import { RecipeKey } from '../../apiQueryKeys';
import httpClient from '../../httpClient';
import { GetPublicRecipeResponse } from './types';

export function useRecipe(id: string) {
    return useQuery([RecipeKey, id], () => httpClient.get<GetPublicRecipeResponse>(`recipe/${id}`));
}
