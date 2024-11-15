import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useRemoveFromCategory } from '../../../api/admin/recipe/useRemoveFromCategory';

interface RemoveRecipeActionProps {
    recipeId: string;
    categoryName: string;
}

export function RemoveRecipeAction({ recipeId, categoryName }: RemoveRecipeActionProps) {
    const { mutate } = useRemoveFromCategory();
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
