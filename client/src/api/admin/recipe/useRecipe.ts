import { useQuery } from 'react-query';
import { RecipeKey } from '../../apiQueryKeys';
import httpClient from '../../httpClient';
import { GetRecipeResponse } from './types';
import { useAuth } from '../../../contexts/AuthContext';

export function useRecipe(id: string) {
    const { isAdmin } = useAuth();
    return useQuery([RecipeKey, 'admin', id], () => httpClient.get<GetRecipeResponse>(`recipe/admin/${id}`), {
        enabled: isAdmin,
    });
}
