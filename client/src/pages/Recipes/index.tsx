import { Alert, Card, Col, Layout, Row, Skeleton, Space, Spin, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useRecipes } from '../../api/recipes';

export default function Recipes() {
    const { data: recipes, isLoading, isError } = useRecipes();

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !recipes) {
        return <Alert message="Failed to load recipes" type="error" />;
    }

    return (
        <Layout>
            <Row justify="center" gutter={[16, 16]} style={{ padding: '16px 0' }}>
                {recipes.map((recipe) => {
                    return (
                        <Col key={recipe.id}>
                            <Card
                                key={recipe.id}
                                hoverable
                                style={{ width: 240, minHeight: 370, height: '100%' }}
                                cover={
                                    recipe.mainImage ? (
                                        <img
                                            alt={recipe.title}
                                            src={`/image/${recipe.mainImage}`}
                                            style={{ width: '100%', objectFit: 'cover', minHeight: 240 }}
                                        />
                                    ) : (
                                        <Skeleton.Image style={{ width: 240, height: 240 }} />
                                    )
                                }
                            >
                                <Space direction="vertical" wrap>
                                    <Meta title={recipe.title} />
                                    <div>Total time: {recipe.totalTimeMinutes} min</div>
                                    <div>
                                        {recipe.categories.map((category) => {
                                            return (
                                                <Tag key={category} color="lime">
                                                    {category}
                                                </Tag>
                                            );
                                        })}
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Layout>
    );
}
