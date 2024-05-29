import { Alert, Card, Col, Layout, Row, Space, Spin, Tag } from 'antd';
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
            <Row justify="center" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {recipes.map((recipe) => {
                    return (
                        <Col key={recipe.id}>
                            <Card
                                key={recipe.id}
                                hoverable
                                style={{ width: 240, minHeight: 370, height: '100%' }}
                                cover={<img alt={recipe.title} src={`/image/${recipe.mainImage}`} />}
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
