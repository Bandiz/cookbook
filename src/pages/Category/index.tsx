import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useRecipes } from '../../api/recipes';
import RecipeList from '../../components/RecipeList';

export default function Category() {
    const { category } = useParams();
    const { data, isLoading } = useRecipes();

    if (isLoading || !data || !category) {
        return null;
    }

    return (
        <>
            <Typography variant="h4" m={3} className="section-title">
                {category}
            </Typography>
            <RecipeList recipes={data.filter((x) => x.categories.includes(category))} />
        </>
    );
}
