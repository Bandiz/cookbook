import moment from 'moment';

import { Category } from '../../types';

export function mapCategory(category: Category): Category {
    return { ...category, createdAt: moment(category.createdAt), updatedAt: moment(category.updatedAt) };
}
