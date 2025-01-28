import React from 'react';
import { Carousel, Spin } from 'antd';
import { useRecipes } from '../../../api/public/recipe/useRecipes';
import { getFilteredRecipes } from '../../../common/helpers';

const contentStyle: React.CSSProperties = {
    height: '50vh',
    width: '100vw',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
    objectFit: 'cover',
    margin: '0 auto',
};

export default function CarouselComponent() {
    const { data: recipes, isLoading, isError } = useRecipes();
    

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !recipes) {
        return null;
    }

    return (
        <Carousel arrows autoplay>
            {getFilteredRecipes(recipes).map((recipe) => {
                if (!recipe.mainImage) {
                    return null;
                }
                return (
                    <div key={recipe.id}>
                        <img src={`/api/image/${recipe.mainImage}`} alt={recipe.title} style={contentStyle} />
                        <h3 style={{ lineHeight: '80px', color: '#364d79', textAlign: 'center' }}>{recipe.title}</h3>
                    </div>
                );
            })}
        </Carousel>
    );
}
