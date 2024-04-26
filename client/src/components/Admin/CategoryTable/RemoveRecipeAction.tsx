import { Button } from 'antd';
import { useRemoveFromCategoryMutation } from '../../../api/recipes';

interface RemoveRecipeActionProps {
    recipeId: string;
    categoryName: string;
}

export function RemoveRecipeAction({ recipeId, categoryName }: RemoveRecipeActionProps) {
    const { mutate } = useRemoveFromCategoryMutation();
    return (
        <Button
            type="primary"
            danger
            ghost
            onClick={() => {
                mutate({ recipeId, categoryName });
            }}
        >
            Remove
        </Button>
    );
}
