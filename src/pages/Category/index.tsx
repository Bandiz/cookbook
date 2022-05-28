import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import RecipeList from '../../components/RecipeList';
import { useRecipes } from '../../contexts/RecipesContext';
import { Recipe } from '../../types';

export default function Category() {
    const { category } = useParams();
    const { recipes, fetchRecipes } = useRecipes();

    useEffect(() => {
        if (recipes.length === 0) {
            fetchRecipes();
        }
    }, []);

    const recipesByCategory: Recipe[] = [];
    recipes.map((c) =>
        c.categories.forEach((x) => {
            if (x.toLowerCase() === category) {
                recipesByCategory.push(c);
            }
        })
    );

    return (
        <>
            <Typography variant="h4" m={3} className="section-title">
                {category}
            </Typography>
            <RecipeList recipes={recipesByCategory} />
        </>
    );
}
