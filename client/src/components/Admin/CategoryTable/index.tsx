import { PlusOutlined } from '@ant-design/icons';
import { Alert, Checkbox, FloatButton, Space, Spin, Table, TableColumnsType } from 'antd';
import { useNavigate } from 'react-router-dom';
import useCategoryList from '../../../api/admin/category/useCategoryList';
import { CREATE_CATEGORY } from '../../../constants/routes';
import { Category } from '../../../types';
import { displayDate } from '../utils';
import DeleteCategoryAction from './DeleteCategoryAction';
import EditCategoryAction from './EditCategoryAction';
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
        title: 'Is featured',
        dataIndex: 'isFeatured',
        render: (value: boolean) => {
            return <Checkbox checked={value} disabled />;
        },
    },
    {
        title: 'Images',
        dataIndex: 'images',
        render: (value: string[]) => value?.length ?? '-',
    },
    { title: 'Created by', dataIndex: 'createdBy', responsive: ['md'] },
    { title: 'Created at', dataIndex: 'createdAt', render: displayDate, responsive: ['md'] },
    { title: 'Updated by', dataIndex: 'updatedBy', responsive: ['md'] },
    { title: 'Updated at', dataIndex: 'updatedAt', render: displayDate, responsive: ['md'] },
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

export default function CategoryTable() {
    const { data: categories, isLoading, isError } = useCategoryList();
    const navigate = useNavigate();

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !categories) {
        return <Alert message="Failed to load categories" type="error" />;
    }

    return (
        <>
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
            <FloatButton
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    navigate(CREATE_CATEGORY);
                }}
            />
        </>
    );
}
