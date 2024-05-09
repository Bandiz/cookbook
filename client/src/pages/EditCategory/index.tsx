import { Button, Checkbox, Divider, Image, Layout, Space, Spin, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCategory, useUpdateCategoryMutation } from '../../api/categories';
import ExpandedRecipeTable from '../../components/Admin/CategoryTable/ExpandedRecipeTable';
import { ADMIN } from '../../constants/routes';
import { useAuth } from '../../contexts/AuthContext';

export default function EditCategory() {
    const { category: categoryName } = useParams<{ category: string }>();
    const { isAdmin, isLoading: authLoading } = useAuth();
    const [currentImage, setCurrentImage] = useState(0);
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
            <Layout.Content style={{ padding: '0 20px', display: 'grid', placeContent: 'center' }}>
                <Space direction="vertical">
                    <Divider>
                        <Typography.Title level={2}>Options</Typography.Title>
                    </Divider>
                    <Space direction="horizontal" size="large">
                        {category.mainImage && (
                            <Image
                                preview={false}
                                width={400}
                                src={`/image/${category.mainImage}`}
                                style={{ ...(!category.visible && { filter: 'grayscale(100%)' }) }}
                            />
                        )}
                        <Space>
                            <Checkbox
                                checked={category.visible}
                                onChange={(event) => {
                                    updateCategory({
                                        categoryName: category.categoryName,
                                        visible: event.target.checked,
                                    });
                                }}
                            >
                                Is visible
                            </Checkbox>
                        </Space>
                    </Space>

                    <Divider>
                        <Typography.Title level={2}>Images</Typography.Title>
                    </Divider>
                    <Image.PreviewGroup
                        preview={{
                            movable: false,
                            toolbarRender() {
                                const isMainImage = category.images[currentImage] === category.mainImage;
                                return (
                                    <Button
                                        type="primary"
                                        disabled={isMainImage}
                                        onClick={() => {
                                            updateCategory({
                                                categoryName: category.categoryName,
                                                mainImage: category.images[currentImage],
                                            });
                                        }}
                                    >
                                        {isMainImage ? 'Current main image' : 'Select as main image'}
                                    </Button>
                                );
                            },
                            onChange(current) {
                                setCurrentImage(current);
                            },
                            onVisibleChange(_value, _prevValue, current) {
                                setCurrentImage(current);
                            },
                        }}
                    >
                        <Space>
                            {category.images.map((image) => (
                                <Image key={image} width={200} src={`/image/${image}`} preview={{}} />
                            ))}
                        </Space>
                    </Image.PreviewGroup>

                    <Divider>
                        <Typography.Title level={2}>Recipes</Typography.Title>
                    </Divider>
                    <ExpandedRecipeTable category={category} />
                </Space>
            </Layout.Content>
            <Link className="ant-typography css-dev-only-do-not-override-mzwlov" to={ADMIN}>
                Go back
            </Link>
        </>
    );
}
