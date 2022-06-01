import { useEffect } from 'react';
import { useRecipes } from '../../contexts/RecipesContext';
import Carousel from './Carousel';
import RecipesPreview from './RecipesPreview';

function Home() {
    const { recipes, fetchRecipes } = useRecipes();

    useEffect(() => {
        if (recipes.length === 0) {
            fetchRecipes();
        }
    }, []);

    return (
        <div style={{ padding: '10px 20px' }}>
            <Carousel />
            <RecipesPreview />
        </div>
    );
}

export default Home;
