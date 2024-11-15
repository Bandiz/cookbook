import {
    Breadcrumb,
    Card,
    Checkbox,
    Col,
    Divider,
    Empty,
    Image,
    Layout,
    Row,
    Spin,
    Typography
} from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useCategory, useUpdateCategoryMutation } from '../../api/category';
import ExpandedRecipeTable from '../../components/Admin/CategoryTable/ExpandedRecipeTable';
import { ADMIN } from '../../constants/routes';
import UploadImages from './UploadImages';

export default function EditCategory() {
    const { category: categoryName } = useParams<{ category: string }>();
    const { data: category, isLoading } = useCategory(categoryName ?? '');
    const { mutate: updateCategory } = useUpdateCategoryMutation();

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
                                <Link
                                    className="ant-typography"
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
                                <Col md={12} sm={24}>
                                    <Checkbox
                                        checked={category.isFeatured}
                                        onChange={(event) => {
                                            updateCategory({
                                                categoryName: category.categoryName,
                                                isFeatured: event.target.checked,
                                            });
                                        }}
                                    >
                                        Is featured
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
