import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { CategoryListKey } from '../apiQueryKeys';
import { dataGet } from '../httpClient';
import { CategoryRecipesResponse } from './types';
import { mapCategoryRecipe } from './utils';

export default function useCategoryRecipes(categoryName: string) {
    const { isAdmin } = useAuth();

    return useQuery(
        [CategoryListKey, categoryName],
        () =>
            dataGet<CategoryRecipesResponse>(`category/${categoryName}/recipes`)().then((x) => {
                return { recipes: x.recipes.map(mapCategoryRecipe) };
            }),
        {
            enabled: isAdmin && Boolean(categoryName),
        }
    );
}
