import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EDIT_RECIPE, replaceRouteParams } from '../../../constants/routes';

interface EditRecipeActionProps {
    recipe: number;
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
