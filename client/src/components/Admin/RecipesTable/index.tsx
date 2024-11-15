import { PlusOutlined } from '@ant-design/icons';
import { Alert, Checkbox, FloatButton, Space, Spin, Table, TableColumnsType, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecipesList } from '../../../api/recipe/useRecipesList';
import { CREATE_RECIPE } from '../../../constants/routes';
import { Recipe } from '../../../types';
import { displayDate } from '../utils';
import { DeleteRecipeAction } from './DeleteRecipeAction';
import { EditRecipeAction } from './EditRecipeAction';

const columns: TableColumnsType<Recipe> = [
    { title: 'Id', dataIndex: 'id' },
    {
        title: 'Title',
        dataIndex: 'title',
        render: (value: string, record) => <a href={`/recipe/${record.id}`}>{value}</a>,
    },
    {
        title: 'Is published',
        dataIndex: 'isPublished',
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
        title: 'Categories',
        dataIndex: 'categories',
        render: (_, record) => {
            return record.categories.map((category) => {
                return (
                    <Tag key={category} color="lime">
                        {category}
                    </Tag>
                );
            });
        },
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
                <EditRecipeAction recipe={record.id} />
                <DeleteRecipeAction recipe={record.id} />
            </Space>
        ),
    },
];

export default function RecipesTable() {
    const { data: recipes, isLoading, isError } = useRecipesList();
    const navigate = useNavigate();

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !recipes) {
        return <Alert message="Failed to load recipes" type="error" />;
    }

    return (
        <>
            <Table columns={columns} rowKey="id" dataSource={recipes} />
            <FloatButton
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    navigate(CREATE_RECIPE);
                }}
            />
        </>
    );
}
