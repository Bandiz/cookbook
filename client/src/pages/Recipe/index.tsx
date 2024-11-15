import { Breadcrumb, Card, Col, Image, Layout, Row, Space, Tag, Typography } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { useRecipe } from '../../api/public/recipe/useRecipe';
import { RECIPES } from '../../constants/routes';

const RecipePage = () => {
    const { id } = useParams();

    const { data } = useRecipe(id!);

    if (!data) {
        return null;
    }

    const {
        mainImage,
        title,
        categories,
        description,
        prepTimeMinutes,
        cookTimeMinutes,
        totalTimeMinutes,
        ingredients,
        instructions,
    } = data.data;

    return (
        <Layout>
            <Layout.Content style={{ padding: '0 60px' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[
                        {
                            title: (
                                <Link className="ant-typography" to={RECIPES}>
                                    Recipes
                                </Link>
                            ),
                        },
                        {
                            title: title,
                        },
                    ]}
                />
                <Card>
                    <Space direction="vertical" size="middle">
                        <Row justify="space-between" gutter={[24, 24]}>
                            <Col xs={{ flex: '100%', order: 2 }} md={{ flex: '50%', order: 1 }}>
                                <Image preview={false} src={`/api/image/${mainImage}/preview`} />
                            </Col>
                            <Col
                                xs={{ flex: '100%', order: 1 }}
                                md={{ flex: '40%', order: 2 }}
                                lg={{ flex: '40%' }}
                                xl={{ flex: '40%' }}
                            >
                                <Row justify="start">
                                    <Typography.Title>{title}</Typography.Title>
                                </Row>
                                <Space direction="vertical" size="middle">
                                    <Row>
                                        {categories.map((category, index) => {
                                            return (
                                                <Tag color="green" key={index}>
                                                    {category}
                                                </Tag>
                                            );
                                        })}
                                    </Row>
                                    <Row>
                                        <Typography.Text>{description}</Typography.Text>
                                    </Row>
                                    <Row>
                                        <Space direction="horizontal" size="large">
                                            <Col>
                                                <Row>
                                                    <Typography.Text strong>Total</Typography.Text>
                                                </Row>
                                                <Row>{totalTimeMinutes} mins</Row>
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <Typography.Text strong>Prep</Typography.Text>
                                                </Row>
                                                <Row>{prepTimeMinutes} mins</Row>
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <Typography.Text strong>Cook</Typography.Text>
                                                </Row>
                                                <Row>{cookTimeMinutes} mins</Row>
                                            </Col>
                                        </Space>
                                    </Row>
                                </Space>
                            </Col>
                        </Row>

                        <Row justify="space-around" gutter={[24, 24]}>
                            <Col xs={{ flex: '100%' }} lg={{ flex: '40%' }}>
                                <Row>
                                    <Typography.Title level={5}>Ingredients</Typography.Title>
                                </Row>

                                {ingredients.map((ingredient, index) => {
                                    return (
                                        <Row key={index}>
                                            <Space size="small">
                                                <Col>{ingredient.amount}</Col>
                                                <Col>{ingredient.measurementType}</Col>
                                                <Col>{ingredient.name}</Col>
                                            </Space>
                                        </Row>
                                    );
                                })}
                            </Col>

                            <Col xs={{ flex: '100%' }} lg={{ flex: '60%' }}>
                                <Row>
                                    <Typography.Title level={5}>Instructions</Typography.Title>
                                </Row>

                                {instructions.map((instruction, index) => {
                                    return (
                                        <Row key={index}>
                                            <Space size="small">
                                                <Col>{index + 1}.</Col>
                                                <Col>{instruction.description}</Col>
                                            </Space>
                                        </Row>
                                    );
                                })}
                            </Col>
                        </Row>
                    </Space>
                </Card>
            </Layout.Content>
        </Layout>
    );
};
export default RecipePage;
