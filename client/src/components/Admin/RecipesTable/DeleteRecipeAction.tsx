import { Button, Popconfirm } from 'antd';
import useDeleteRecipeMutation from '../../../api/recipe/useDeleteRecipeMutation';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface DeleteRecipeActionProps {
    recipe: string;
}

export function DeleteRecipeAction({ recipe }: DeleteRecipeActionProps) {
    const { mutate } = useDeleteRecipeMutation();

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
