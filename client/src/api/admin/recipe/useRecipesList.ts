import { useQuery } from 'react-query';
import { RecipeListKey } from '../../apiQueryKeys';
import httpClient from '../../httpClient';
import { mapRecipe } from './utils';
import { useAuth } from '../../../contexts/AuthContext';
import { RecipeListResponse } from './types';

export function useRecipesList() {
    const { isAdmin } = useAuth();

    return useQuery(
        RecipeListKey,
        () => httpClient.get<RecipeListResponse>('recipe/list').then((x) => x.data.map(mapRecipe)),
        {
            enabled: isAdmin,
        }
    );
}
