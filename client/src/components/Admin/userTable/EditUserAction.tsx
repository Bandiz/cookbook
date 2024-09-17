import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EDIT_USER, replaceRouteParams } from '../../../constants/routes';

interface EditUserActionProps {
    id: string;
}

export default function EditUserAction({ id }: EditUserActionProps) {
    const navigate = useNavigate();
    return (
        <Button
            type="primary"
            ghost
            onClick={() => {
                navigate(replaceRouteParams(EDIT_USER, { id }));
            }}
        >
            Edit
        </Button>
    );
}
