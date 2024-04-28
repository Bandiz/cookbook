import { Alert, Checkbox, Spin, Table, TableProps } from 'antd';
import { Recipe } from '../../../types';
import { displayDate } from '../utils';
import { useRecipes } from '../../../api/recipes';

const columns: TableProps<Recipe>['columns'] = [
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Is Published',
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
        key: 'x',
        // render: (_, record) => <RemoveRecipeAction recipeId={record.id} categoryName={record.categoryName} />,
    },
];

export default function RecipesTable() {
    const { data: recipes, isLoading, isError } = useRecipes();

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !recipes) {
        return <Alert message="Failed to load recipes" type="error" />;
    }

    return <Table columns={columns} rowKey="id" dataSource={recipes} />;
}
