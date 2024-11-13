import { Card, Col, Row, Skeleton, Space, Tag, Typography } from 'antd';
import { Recipe } from '../../../types';
import Meta from 'antd/es/card/Meta';
import { RECIPE, replaceRouteParams } from '../../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { NoRecipesAlert } from '..';

export default function FeaturedCategoriesWithRecipes({ recipes }: { recipes: Recipe[] }) {
    const navigate = useNavigate();
    console.log(recipes);

    if (!recipes) {
        return <NoRecipesAlert />;
    }

    return (
        <>
            {['Breakfast', 'Lunch', 'Dinner'].map((category) => (
                <Row align="top" style={{ flexDirection: 'column', padding: '20px 0' }}>
                    <Col>
                        <Typography.Title level={2}>{category}</Typography.Title>
                    </Col>
                    <Col>
                        <Space size={10}>
                            {recipes
                                .filter((recipe) => recipe.categories.includes(category))
                                .map((recipe) => (
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
                                ))}
                        </Space>
                    </Col>
                </Row>
            ))}
        </>
    );
}
