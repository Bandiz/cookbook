import { Alert, Card, Col, Layout, MenuProps, Row, Skeleton, Space, Spin, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useRecipes } from '../../api/recipes';
import { RECIPE, replaceRouteParams } from '../../constants/routes';
import { SiderMenu } from '../../components/Shared/Sider/SiderMenu';
import { useNavigate } from 'react-router-dom';

export default function Recipes() {
    const { data: recipes, isLoading, isError } = useRecipes();
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        if (e.key.toLowerCase() === 'all') {
            console.log('show featured recipes');
        } else {
            // navigate(e.key.toLowerCase());
            console.log('show featured recipes according to category');
        }
    };

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !recipes) {
        return <Alert message="Failed to load recipes" type="error" />;
    }

    return (
        <Layout hasSider>
            <SiderMenu onClick={onClick} />
            <Layout.Content>
                <Row justify="center" gutter={[16, 16]} style={{ padding: '16px 0' }}>
                    {recipes.map((recipe) => {
                        return (
                            <Col key={recipe.id}>
                                <Card
                                    key={recipe.id}
                                    onClick={() => {
                                        navigate(replaceRouteParams(RECIPE, { id: recipe.id }));
                                    }}
                                    hoverable
                                    style={{ width: 240, maxHeight: 370, height: '100%' }}
                                    cover={
                                        recipe.mainImage ? (
                                            <img
                                                alt={recipe.title}
                                                src={`/api/image/${recipe.mainImage}`}
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
            </Layout.Content>
        </Layout>
    );
}
