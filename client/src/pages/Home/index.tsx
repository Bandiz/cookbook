import { Carousel, Spin } from 'antd';
import { useRecipes } from '../../api/public/recipe/useRecipes';

function Home() {
    const { data: recipes, isLoading, isError } = useRecipes();
    const contentStyle: React.CSSProperties = {
        height: '400px',
        width: '700px',
        color: '#fff',
        textAlign: 'center',
        background: '#364d79',
        objectFit: 'cover',
        margin: '0 auto',
    };

    if (isLoading) {
        return <Spin spinning size="large" />;
    }

    if (isError || !recipes) {
        return null;
    }

    return (
        <Carousel arrows autoplay>
            {recipes.map((recipe) => {
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

export default Home;
