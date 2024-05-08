import { Checkbox, Divider, Image, Layout, Space, Spin, Typography } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCategory, useUpdateCategoryMutation } from '../../api/categories';
import { ADMIN } from '../../constants/routes';
import { useAuth } from '../../contexts/AuthContext';

export default function EditCategory() {
    const { category: categoryName } = useParams<{ category: string }>();
    const { isAdmin, isLoading: authLoading } = useAuth();
    const navigate = useNavigate();
    const { data: category, isLoading } = useCategory(categoryName ?? '');
    const { mutate: updateCategory } = useUpdateCategoryMutation();

    useEffect(() => {
        if (!isAdmin && !authLoading) {
            navigate('/');
        }
    }, [isAdmin, authLoading]);

    if (!category || isLoading || authLoading) {
        return <Spin size="large" />;
    }

    return (
        <>
            <Layout.Header>
                <Typography.Title level={1} style={{ color: 'white' }}>
                    {categoryName}
                </Typography.Title>
            </Layout.Header>
            <Layout.Content>
                <Space direction="vertical">
                    <Divider>
                        <Typography.Title level={2}>Visibility</Typography.Title>
                    </Divider>
                    <Checkbox
                        checked={category.visible}
                        onChange={(event) => {
                            updateCategory({ categoryName: category.categoryName, visible: event.target.checked });
                        }}
                    >
                        Is visible
                    </Checkbox>
                    <Divider>
                        <Typography.Title level={2}>Images</Typography.Title>
                    </Divider>
                    <Image.PreviewGroup>
                        {category.images.map((image) => (
                            <Image key={image} width={200} src={`/image/${image}`} />
                        ))}
                    </Image.PreviewGroup>
                </Space>
            </Layout.Content>
            <Link className="ant-typography css-dev-only-do-not-override-mzwlov" to={ADMIN}>
                Go back
            </Link>
        </>
    );
}
