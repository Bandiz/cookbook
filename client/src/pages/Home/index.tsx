import CarouselComponent from './Carousel';
import FeaturedCategoriesWithRecipes from '../Recipes/FeaturedCategoriesWithRecipes';
import { Layout } from 'antd';

function Home() {
    return (
        <Layout>
            <Layout.Content>
                <CarouselComponent />
                <FeaturedCategoriesWithRecipes />
            </Layout.Content>
        </Layout>
    );
}

export default Home;
