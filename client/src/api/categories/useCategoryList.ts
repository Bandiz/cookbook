import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { CategoryListKey } from '../apiQueryKeys';
import { dataGet } from '../httpClient';
import { CategoryListResponse } from './types';
import { mapCategory } from './utils';

export default function useCategoryList() {
    const { isAdmin } = useAuth();

    return useQuery(
        CategoryListKey,
        () => dataGet<CategoryListResponse>('category/list')().then((x) => x.map(mapCategory)),
        {
            enabled: isAdmin,
        }
    );
}
