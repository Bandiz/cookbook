import { useQuery } from 'react-query';
import { CategoryKey } from '../apiQueryKeys';
import { dataGet } from '../httpClient';
import { CategoryNameListResponse } from './types';

export default function useCategoryNameList() {
    return useQuery(CategoryKey, dataGet<CategoryNameListResponse>('category'));
}
