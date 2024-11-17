import { Breadcrumb, Card, Checkbox, Col, Divider, Empty, Image, Layout, Row, Space, Spin, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import useCategory from '../../api/admin/category/useCategory';
import useUpdateCategory from '../../api/admin/category/useUpdateCategory';
import ExpandedRecipeTable from '../../components/Admin/CategoryTable/ExpandedRecipeTable';
import { ADMIN } from '../../constants/routes';
import UploadImages from './UploadImages';

export default function EditCategory() {
    const { category: categoryName } = useParams<{ category: string }>();
    const { data: category, isLoading } = useCategory(categoryName ?? '');
    const { mutate: updateCategory } = useUpdateCategory();

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
                                <Link className="ant-typography" to={ADMIN}>
                                    Admin
                                </Link>
                            ),
                        },
                        {
                            title: (
                                <Link className="ant-typography" to={ADMIN + '?activeTab=2'}>
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
                            <Row>
                                <Col xs={{ flex: '100%' }} md={{ flex: '50%' }}>
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
                                <Col xs={{ flex: '100%' }} md={{ flex: '40%' }}>
                                    <Space direction="vertical" size={10}>
                                        <Checkbox
                                            checked={category.visible}
                                            onChange={(event) => {
                                                updateCategory({
                                                    categoryName: category.categoryName,
                                                    visible: event.target.checked,
                                                    mainImage: category.mainImage,
                                                });
                                            }}
                                        >
                                            Is visible
                                        </Checkbox>
                                        <Checkbox
                                            checked={category.isFeatured}
                                            onChange={(event) => {
                                                updateCategory({
                                                    categoryName: category.categoryName,
                                                    isFeatured: event.target.checked,
                                                    mainImage: category.mainImage,
                                                });
                                            }}
                                        >
                                            Is featured
                                        </Checkbox>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Divider>
                                <Typography.Title level={3}>Images</Typography.Title>
                            </Divider>
                            <UploadImages category={category} />
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
