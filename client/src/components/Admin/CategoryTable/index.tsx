import { Alert, Checkbox, Space, Spin, Table, TableColumnsType } from 'antd';
import { useCategoryList } from '../../../api/categories';
import { Category } from '../../../types';
import { displayDate } from '../utils';
import { DeleteCategoryAction } from './DeleteCategoryAction';
import { EditCategoryAction } from './EditCategoryAction';
import ExpandedRecipeTable from './ExpandedRecipeTable';

const columns: TableColumnsType<Category> = [
    { title: 'Category name', dataIndex: 'categoryName' },
    {
        title: 'Is visible',
        dataIndex: 'visible',
        render: (value: boolean) => {
            return <Checkbox checked={value} disabled />;
        },
    },
    {
        title: 'Images',
        dataIndex: 'images',
        render: (value: string[]) => value?.length ?? '-',
    },
    { title: 'Created by', dataIndex: 'createdBy' },
    { title: 'Created at', dataIndex: 'createdAt', render: displayDate },
    { title: 'Updated by', dataIndex: 'updatedBy' },
    { title: 'Updated at', dataIndex: 'UpdatedAt', render: displayDate },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (_, record) => (
            <Space size="small" direction="horizontal">
                <EditCategoryAction categoryName={record.categoryName} />
                <DeleteCategoryAction categoryName={record.categoryName} />
            </Space>
        ),
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
                        <ExpandedRecipeTable category={record} />
                    </Space>
                ),
            }}
            dataSource={categories}
        />
    );
}
