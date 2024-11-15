import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import useDeleteCategory from '../../../api/admin/category/useDeleteCategory';

interface DeleteCategoryActionProps {
    categoryName: string;
}

export default function DeleteCategoryAction({ categoryName }: DeleteCategoryActionProps) {
    const { mutate } = useDeleteCategory();
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
