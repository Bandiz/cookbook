import { Button, Popconfirm } from 'antd';
import { useRemoveFromCategoryMutation } from '../../../api/recipe';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface RemoveRecipeActionProps {
    recipeId: string;
    categoryName: string;
}

export function RemoveRecipeAction({ recipeId, categoryName }: RemoveRecipeActionProps) {
    const { mutate } = useRemoveFromCategoryMutation();
    return (
        <Popconfirm
            title=""
            description="Are you sure to remove this recipe?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => {
                mutate({ recipeId, categoryName });
            }}
        >
            <Button type="primary" danger ghost>
                Remove
            </Button>
        </Popconfirm>
    );
}
