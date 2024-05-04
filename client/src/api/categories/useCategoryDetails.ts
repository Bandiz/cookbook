import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { CategoryListKey } from '../apiQueryKeys';
import { dataGet } from '../httpClient';
import { mapCategory, mapCategoryDetail } from './utils';
import { CategoryDetailsResponse } from './types';

export default function useCategoryDetails(categoryName: string, enabled: boolean = true) {
    const { isAdmin } = useAuth();

    return useQuery(
        [CategoryListKey, categoryName],
        () =>
            dataGet<CategoryDetailsResponse>(`category/${categoryName}/details`)().then((x) => {
                return { ...mapCategory(x), recipes: x.recipes.map(mapCategoryDetail) };
            }),
        {
            enabled: isAdmin && enabled,
        }
    );
}
