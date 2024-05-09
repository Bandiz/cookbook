import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EDIT_RECIPE, replaceRouteParams } from '../../../constants/routes';

interface DeleteRecipeActionProps {
    recipe: string;
}

export function DeleteRecipeAction({ recipe }: DeleteRecipeActionProps) {
    return (
        <Button
            type="primary"
            danger
            ghost
            onClick={() => {
                console.log(`Delete recipe: ${recipe}`);
            }}
        >
            Delete
        </Button>
    );
}

interface EditRecipeActionProps {
    recipe: string;
}

export function EditRecipeAction({ recipe }: EditRecipeActionProps) {
    const navigate = useNavigate();
    return (
        <Button
            type="primary"
            ghost
            onClick={() => {
                navigate(replaceRouteParams(EDIT_RECIPE, { recipe }));
            }}
        >
            Edit
        </Button>
    );
}
