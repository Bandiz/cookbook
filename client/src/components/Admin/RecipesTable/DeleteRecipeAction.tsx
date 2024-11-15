import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import useDeleteRecipe from '../../../api/admin/recipe/useDeleteRecipe';

interface DeleteRecipeActionProps {
    recipe: number;
}

export function DeleteRecipeAction({ recipe }: DeleteRecipeActionProps) {
    const { mutate } = useDeleteRecipe();

    return (
        <Popconfirm
            title=""
            description="Are you sure to delete this recipe?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => {
                mutate({ recipe });
            }}
        >
            <Button type="primary" danger ghost>
                Delete
            </Button>
        </Popconfirm>
    );
}
