import { useQuery } from 'react-query';
import { useAuth } from '../../../contexts/AuthContext';
import { CategoryListKey as CategoryKey } from '../../apiQueryKeys';
import httpClient from '../../httpClient';
import { CategoryRecipesResponse } from './types';
import { mapCategoryRecipe } from './utils';

export default function useCategoryRecipes(categoryName: string) {
    const { isAdmin } = useAuth();

    return useQuery(
        [CategoryKey, categoryName, 'recipes'],
        () =>
            httpClient.get<CategoryRecipesResponse>(`category/${categoryName}/recipes`).then((x) => {
                return { recipes: x.data.recipes.map(mapCategoryRecipe) };
            }),
        {
            enabled: isAdmin && Boolean(categoryName),
        }
    );
}
