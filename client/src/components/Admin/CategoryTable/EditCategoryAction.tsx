import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EDIT_CATEGORY, replaceRouteParams } from '../../../constants/routes';

interface EditCategoryActionProps {
    categoryName: string;
}

export default function EditCategoryAction({ categoryName }: EditCategoryActionProps) {
    const navigate = useNavigate();
    return (
        <Button
            type="primary"
            ghost
            onClick={() => {
                navigate(replaceRouteParams(EDIT_CATEGORY, { category: categoryName }));
            }}
        >
            Edit
        </Button>
    );
}
