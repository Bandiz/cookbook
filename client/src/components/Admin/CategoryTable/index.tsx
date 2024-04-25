import { Alert, Checkbox, Skeleton, Space, Spin, Table, TableColumnsType } from 'antd';
import { useCategoryList } from '../../../api/categories';
import { Category } from '../../../types';
import RecipeTable from './RecipeTable';

const columns: TableColumnsType<Category> = [
    { title: 'Category name', dataIndex: 'categoryName' },
    {
        title: 'Is visible',
        dataIndex: 'visible',
        render: (value: boolean) => {
            return <Checkbox checked={value} disabled />;
        },
    },
    { title: 'Created by', dataIndex: 'createdBy' },
    { title: 'Created at', dataIndex: 'createdAt' },
    { title: 'Updated by', dataIndex: 'updatedBy' },
    { title: 'Updated at', dataIndex: 'UpdatedAt' },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
    },
];

export default function CategoriesTable() {
    const { data: categories, isLoading, isError } = useCategoryList();

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !categories) {
        return <Alert message="Failed to load recipes" type="error" />;
    }

    return (
        <Table
            columns={columns}
            rowKey="categoryName"
            expandable={{
                expandedRowRender: (record) => (
                    <Space size="middle">
                        <RecipeTable category={record} />
                    </Space>
                ),
            }}
            dataSource={categories}
        />
    );
}
