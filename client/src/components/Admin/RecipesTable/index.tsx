import { Alert, Checkbox, FloatButton, Space, Spin, Table, TableColumnsType } from 'antd';
import { Recipe } from '../../../types';
import { displayDate } from '../utils';
import { useRecipes } from '../../../api/recipes';
import { DeleteRecipeAction, EditRecipeAction } from './ActionButtons';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { CREATE_RECIPE } from '../../../constants/routes';

const columns: TableColumnsType<Recipe> = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Is published',
        dataIndex: 'isPublished',
        render: (value: boolean) => {
            return <Checkbox checked={value} disabled />;
        },
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
    const { data: recipes, isLoading, isError } = useRecipes();
    const navigate = useNavigate();

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !recipes) {
        return <Alert message="Failed to load recipes" type="error" />;
    }

    return (
        <>
            <Table columns={columns} rowKey="id" dataSource={recipes} />;
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
