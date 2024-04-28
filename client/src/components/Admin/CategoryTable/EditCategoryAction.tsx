import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface EditCategoryActionProps {
    categoryName: string;
}

export function EditCategoryAction({ categoryName }: EditCategoryActionProps) {
    const navigate = useNavigate();
    return (
        <Button
            type="primary"
            ghost
            onClick={() => {
                navigate('/edit/category/' + categoryName);
            }}
        >
            Edit
        </Button>
    );
}
