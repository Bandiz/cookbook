import { Image, Layout, Space, Spin, Typography } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCategoryDetails } from '../../api/categories';
import { ADMIN } from '../../constants/routes';
import { useAuth } from '../../contexts/AuthContext';

export default function EditCategory() {
    const { category: categoryName } = useParams<{ category: string }>();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const { data: category, isLoading } = useCategoryDetails(categoryName!, Boolean(categoryName));

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
        }
    }, [isAdmin]);

    if (!category || isLoading) {
        return <Spin size="large" />;
    }

    return (
        <>
            <Layout.Header>
                <Typography.Title level={1}>{categoryName}</Typography.Title>
            </Layout.Header>
            <Layout.Content>
                <Space direction="vertical">
                    <Typography.Title level={2}>Images</Typography.Title>
                    <Image.PreviewGroup
                        preview={{
                            onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                        }}
                    >
                        {category.images.map((image) => (
                            <Image key={image} width={200} src={`/image/${image}`} />
                        ))}
                    </Image.PreviewGroup>
                </Space>
            </Layout.Content>
            <Link to={ADMIN}>Go back</Link>
            <Layout.Footer></Layout.Footer>
        </>
    );
}
