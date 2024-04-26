import { Alert, Checkbox, Space, Spin, Table, TableColumnsType } from 'antd';
import { useCategoryList } from '../../../api/categories';
import { Category } from '../../../types';
import RecipeTable from './RecipeTable';
import { displayDate } from './utils';
import { DeleteCategoryAction } from './DeleteCategoryAction';

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
    { title: 'Created at', dataIndex: 'createdAt', render: displayDate },
    { title: 'Updated by', dataIndex: 'updatedBy' },
    { title: 'Updated at', dataIndex: 'UpdatedAt', render: displayDate },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (_, record) => <DeleteCategoryAction categoryName={record.categoryName} />,
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
