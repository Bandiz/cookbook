import { Category } from '../../types';
import dayjs from 'dayjs';

export function mapCategory(category: Category): Category {
    return {
        ...category,
        createdAt: dayjs(category.createdAt),
        updatedAt: category.updatedAt ? dayjs(category.updatedAt) : category.updatedAt,
    };
}
