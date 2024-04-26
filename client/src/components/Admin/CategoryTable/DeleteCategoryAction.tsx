import { Button } from 'antd';
import { useDeleteCategoryMutation } from '../../../api/categories';

interface DeleteCategoryActionProps {
    categoryName: string;
}

export function DeleteCategoryAction({ categoryName }: DeleteCategoryActionProps) {
    const { mutate } = useDeleteCategoryMutation();
    return (
        <Button
            type="primary"
            danger
            ghost
            onClick={() => {
                mutate({ categoryName });
            }}
        >
            Delete
        </Button>
    );
}
