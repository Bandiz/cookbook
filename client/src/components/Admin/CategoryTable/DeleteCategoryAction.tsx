import { Button, Popconfirm } from 'antd';
import { useDeleteCategoryMutation } from '../../../api/categories';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface DeleteCategoryActionProps {
    categoryName: string;
}

export default function DeleteCategoryAction({ categoryName }: DeleteCategoryActionProps) {
    const { mutate } = useDeleteCategoryMutation();
    return (
        <Popconfirm
            title=""
            description="Are you sure to delete this category?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => {
                mutate({ categoryName });
            }}
        >
            <Button type="primary" danger ghost>
                Delete
            </Button>
        </Popconfirm>
    );
}
