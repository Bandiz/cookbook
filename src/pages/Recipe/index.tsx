import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useRecipes } from '../../contexts/RecipesContext';
import { Recipe } from '../../types';
import { RECIPES } from '../../constants/routes';
import { Grid, Paper, Typography, Box, List, ListItem, Button } from '@mui/material';

const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe>();

    const { fetchRecipe } = useRecipes();

    useEffect(() => {
        if (!id) {
            return;
        }
        fetchRecipe(id).then(setRecipe);
    }, [id]);

    if (!recipe) {
        return <Typography variant="h2">no recipe to display</Typography>;
    }
    const {
        imageUrl,
        title,
        categories,
        description,
        prepTimeMinutes,
        cookTimeMinutes,
        totalTimeMinutes,
        ingredients,
        instructions,
    } = recipe;

    return (
        <>
            <Button variant="contained" href={RECIPES}>
                back to recipes
            </Button>
            <Paper variant="elevation" elevation={4} sx={{ m: 3, p: 3 }}>
                <Typography variant="h2" align="center">
                    {title}
                </Typography>
                <img src={imageUrl} alt={title} className="photo" />

                <Grid container spacing={3}>
                    <Grid container columns={15} direction="row">
                        <Grid item xs={3}>
                            <Typography paragraph>Category</Typography>
                            {categories.map((category, index) => {
                                return <p key={index}>{category}</p>;
                            })}
                        </Grid>
                        <Grid item xs={3}>
                            <Typography paragraph>Amount</Typography>
                            {description}
                        </Grid>
                        <Grid item xs={3}>
                            <Typography paragraph>Prep Time</Typography>
                            {prepTimeMinutes} min
                        </Grid>
                        <Grid item xs={3}>
                            <Typography paragraph>Cook Time</Typography>
                            {cookTimeMinutes} min
                        </Grid>
                        <Grid item xs={3}>
                            <Typography paragraph>Total Time</Typography>
                            {totalTimeMinutes} min
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h4">Ingredients</Typography>
                        <List>
                            {ingredients.map((ingredient, index) => {
                                const { measurementType, name, amount } = ingredient;
                                return ingredient ? (
                                    <ListItem key={index}>
                                        {amount} {measurementType} {name}
                                    </ListItem>
                                ) : null;
                            })}
                        </List>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h4">Instructions</Typography>
                        <List sx={{ listStyleType: 'decimal' }}>
                            {instructions.map((instruction, index) => {
                                return instruction ? (
                                    <ListItem sx={{ display: 'list-item' }} key={index}>
                                        {instruction.description}
                                    </ListItem>
                                ) : null;
                            })}
                        </List>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};
export default RecipePage;
