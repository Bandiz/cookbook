import Carousel from './Carousel';
import RecipesPreview from './RecipesPreview';

function Home() {
    return (
        <div style={{ padding: '10px 20px' }}>
            <Carousel />
            <RecipesPreview />
        </div>
    );
}

export default Home;
