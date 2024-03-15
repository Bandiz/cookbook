import { useRecipes } from '../../api/recipes';
import RecipeList from '../../components/RecipeList';

export default function Recipes() {
    const { data } = useRecipes();

    if (!data) {
        return null;
    }

    return <RecipeList recipes={data} />;
}
