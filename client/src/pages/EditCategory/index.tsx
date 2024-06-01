import {
    Breadcrumb,
    Button,
    Card,
    Checkbox,
    Col,
    Divider,
    Empty,
    Image,
    Layout,
    Row,
    Space,
    Spin,
    Typography,
} from 'antd';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCategory, useUpdateCategoryMutation } from '../../api/categories';
import ExpandedRecipeTable from '../../components/Admin/CategoryTable/ExpandedRecipeTable';
import { ADMIN } from '../../constants/routes';

export default function EditCategory() {
    const { category: categoryName } = useParams<{ category: string }>();
    const [currentImage, setCurrentImage] = useState(0);
    const { data: category, isLoading } = useCategory(categoryName ?? '');
    const { mutate: updateCategory } = useUpdateCategoryMutation();

    const imagesPreview = useMemo(() => {
        if (!category) {
            return {};
        }
        return {
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
            onChange(current: number) {
                setCurrentImage(current);
            },
            onVisibleChange(_value: boolean, _prevValue: boolean, current: number) {
                setCurrentImage(current);
            },
        };
    }, [category, currentImage]);

    if (!category || isLoading) {
        return <Spin size="large" />;
    }

    return (
        <Layout>
            <Layout.Content style={{ padding: '0 20px' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[
                        {
                            title: (
                                <Link className="ant-typography css-dev-only-do-not-override-mzwlov" to={ADMIN}>
                                    Admin
                                </Link>
                            ),
                        },
                        {
                            title: (
                                <Link
                                    className="ant-typography css-dev-only-do-not-override-mzwlov"
                                    to={ADMIN + '?activeTab=2'}
                                >
                                    Categories
                                </Link>
                            ),
                        },
                        {
                            title: `Edit ${categoryName}`,
                        },
                    ]}
                />
                <Card>
                    <Row>
                        <Col span={24}>
                            <Divider>
                                <Typography.Title level={3}>Main image & visibility</Typography.Title>
                            </Divider>
                            <Row gutter={[20, 20]}>
                                <Col
                                    md={12}
                                    sm={24}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'right',
                                    }}
                                >
                                    {!category.mainImage && <Empty description="No main image" />}
                                    {category.mainImage && (
                                        <Image
                                            preview={false}
                                            src={`/api/image/${category.mainImage}`}
                                            style={{
                                                maxWidth: 400,
                                                ...(!category.visible && { filter: 'grayscale(100%)' }),
                                            }}
                                        />
                                    )}
                                </Col>
                                <Col md={12} sm={24}>
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
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Divider>
                                <Typography.Title level={3}>Images</Typography.Title>
                            </Divider>
                            <Image.PreviewGroup preview={imagesPreview}>
                                <Space>
                                    {category.images.map((image) => (
                                        <Image key={image} style={{ maxWidth: 200 }} src={`/api/image/${image}`} />
                                    ))}
                                </Space>
                            </Image.PreviewGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Divider>
                                <Typography.Title level={3}>Recipes</Typography.Title>
                            </Divider>
                            <ExpandedRecipeTable category={category} />
                        </Col>
                    </Row>
                </Card>
            </Layout.Content>
        </Layout>
    );
}
