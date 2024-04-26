import type { TableProps } from 'antd';
import { Alert, Space, Spin, Table, Typography } from 'antd';
import { useCategoryDetails } from '../../../api/categories';
import { Category, CategoryRecipe } from '../../../types';
import { displayDate } from './utils';
import { RemoveRecipeAction } from './RemoveRecipeAction';

const columns: TableProps<CategoryRecipe>['columns'] = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Created by',
        dataIndex: 'createdBy',
    },
    {
        title: 'Created at',
        dataIndex: 'createdAt',
        render: displayDate,
    },
    {
        title: 'Updated by',
        dataIndex: 'updatedBy',
    },
    {
        title: 'Updated at',
        dataIndex: 'updatedAt',
        render: displayDate,
    },
    {
        title: 'Action',
        key: 'x',
        render: (_, record) => <RemoveRecipeAction recipeId={record.id} categoryName={record.categoryName} />,
    },
];

interface RecipeTableProps {
    category: Category;
}

export default function RecipeTable({ category }: RecipeTableProps) {
    const { data: details, isLoading, isError } = useCategoryDetails(category.categoryName);

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !details) {
        return <Alert message="Failed to load recipes" type="error" />;
    }

    return (
        <Space size="middle" direction="vertical">
            <Typography.Title level={5}> Recipes for the category</Typography.Title>
            <Table size="small" columns={columns} rowKey="id" dataSource={details.recipes} />
        </Space>
    );
}
