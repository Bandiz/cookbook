import { useQuery } from 'react-query';
import { useAuth } from '../../contexts/AuthContext';
import { CategoryKey } from '../apiQueryKeys';
import httpClient from '../httpClient';
import { CategoryResponse } from './types';
import { mapCategory } from './utils';

export default function useCategory(categoryName: string) {
    const { isAdmin } = useAuth();

    return useQuery(
        [CategoryKey, categoryName],
        () => httpClient.get<CategoryResponse>(`category/${categoryName}`).then((x) => mapCategory(x.data)),
        {
            enabled: isAdmin && Boolean(categoryName),
        }
    );
}
