import { Alert, Card, Col, Layout, Row, Skeleton, Space, Spin, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecipes } from '../../api/public/recipe/useRecipes';
import { getFilteredRecipes } from '../../common/helpers';
import { SiderMenu } from '../../components/Shared/Sider/SiderMenu';
import { RECIPE, replaceRouteParams } from '../../constants/routes';
import { Recipe } from '../../types';
import FeaturedCategoriesWithRecipes from './FeaturedCategoriesWithRecipes';

export default function Recipes() {
    const { data: recipes, isLoading, isError } = useRecipes();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [category, setCategory] = useState(searchParams.get('category') ?? 'All');
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        if (recipes) {
            setFilteredRecipes(getFilteredRecipes(recipes, category));
        }
    }, [recipes, category]);

    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('category', category);
        setSearchParams(newSearchParams);
    }, [category, setSearchParams]);

    const onClick = (e: MenuInfo) => {
        if (!recipes) {
            return <NoRecipesAlert />;
        }
        const newCategory = e.key === 'all' ? 'All' : e.key;
        setCategory(newCategory);
    };

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !filteredRecipes.length || !recipes) {
        return <NoRecipesAlert />;
    }

    return (
        <Layout hasSider>
            <SiderMenu onClick={onClick} />
            <Layout.Content style={{ padding: '0 40px' }}>
                {category !== 'All' ? (
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
                ) : (
                    <FeaturedCategoriesWithRecipes recipes={recipes} />
                )}
            </Layout.Content>
        </Layout>
    );
}

export function NoRecipesAlert() {
    return <Alert message="No recipes found" type="info" />;
}
