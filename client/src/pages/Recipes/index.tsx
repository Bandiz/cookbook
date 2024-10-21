import { Alert, Card, Col, Layout, Row, Skeleton, Space, Spin, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useRecipes } from '../../api/recipe';
import { RECIPE, replaceRouteParams } from '../../constants/routes';
import { SiderMenu } from '../../components/Shared/Sider/SiderMenu';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Recipe } from '../../types';

export default function Recipes() {
    const { data: recipes, isLoading, isError } = useRecipes();
    const navigate = useNavigate();
    const [_, setSearchParams] = useSearchParams();

    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        if (recipes) {
            setFilteredRecipes([]);
        }
    }, [recipes]);

    const onClick = (e: MenuInfo) => {
        if (!recipes) {
            return <NoRecipesAlert />;
        }
        if (e.key.toLowerCase() === 'all') {
            setFilteredRecipes(recipes);
            setSearchParams({});
        } else {
            const recipesFilteredByCategory = recipes.filter(recipe => recipe.categories.includes(e.key));
            setFilteredRecipes(recipesFilteredByCategory);
            setSearchParams({ category: e.key.toLowerCase() });
        }
    };

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !filteredRecipes) {
        return <NoRecipesAlert />;
    }

    return (
        <Layout hasSider>
            <SiderMenu onClick={onClick} />
            <Layout.Content>
                <Row justify="center" gutter={[16, 16]} style={{ padding: '16px 0' }}>
                    {filteredRecipes.map((recipe) => {
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

function NoRecipesAlert() {
    return <Alert message="No recipes found" type="info" />;
} 