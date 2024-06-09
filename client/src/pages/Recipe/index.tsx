import { Link, useParams } from 'react-router-dom';
import { useRecipe } from '../../api/recipes';
import { RECIPES } from '../../constants/routes';
import { Breadcrumb, Card, Layout, Image, Row, Col, Typography, Space, Tag } from 'antd';

const RecipePage = () => {
    const { id } = useParams();

    const { data: recipe } = useRecipe(id!);

    if (!recipe) {
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
    } = recipe;

    return (
        <Layout>
            <Layout.Content style={{ padding: '0 20px' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[
                        {
                            title: (
                                <Link className="ant-typography css-dev-only-do-not-override-mzwlov" to={RECIPES}>
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
                        <Row justify="space-evenly" gutter={[16, 16]}>
                            <Space align="start">
                                <Col>
                                    <Image
                                        preview={false}
                                        src={`/api/image/${mainImage}/preview`}
                                        // style={{ maxWidth: 200 }}
                                    />
                                </Col>
                                <Col>
                                    <Row>
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
                            </Space>
                        </Row>

                        <Row gutter={[24, 24]} justify="space-around">
                            <Col flex={2}>
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

                            <Col flex={3}>
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
