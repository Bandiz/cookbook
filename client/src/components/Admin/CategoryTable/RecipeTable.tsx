import type { TableProps } from 'antd';
import { Alert, Col, Row, Space, Spin, Table } from 'antd';
import { useCategoryDetails } from '../../../api/categories';
import { Category, CategoryRecipe } from '../../../types';

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
    },
    {
        title: 'Updated by',
        dataIndex: 'updatedBy',
    },
    {
        title: 'Updated at',
        dataIndex: 'updatedAt',
    },
    {
        title: 'Action',
        key: 'x',
        render: (_, record) => (
            <Space size="middle">
                <a>Delete</a>
            </Space>
        ),
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

    return <Table columns={columns} rowKey="id" dataSource={details.recipes} />;
}
