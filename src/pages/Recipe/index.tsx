import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useRecipes } from '../../contexts/RecipesContext';
import { Recipe } from '../../types';
import { RECIPES } from '../../constants/routes';
import {
    Grid,
    Typography,
    List,
    ListItem,
    Button,
    CardMedia,
    Card,
    CardHeader,
    CardContent,
    Stack,
    Chip,
    Divider,
} from '@mui/material';
import { useStyles } from './Recipe';

const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe>();
    const { classes } = useStyles();

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

    console.log(recipe);

    return (
        <>
            <Button variant="contained" href={RECIPES}>
                back to recipes
            </Button>
            <Card raised sx={{ m: 3, p: 3 }}>
                <CardHeader title={title} align="center" titleTypographyProps={{ variant: 'h3' }} />
                <Stack direction="row" spacing={1} justifyContent="center">
                    {categories.map((category) => {
                        return <Chip label={category} size="small" component="a" href={''} clickable />;
                    })}
                </Stack>
                <CardMedia component="img" src={imageUrl} alt={title} className={classes.image} />
                <CardContent className={classes.content}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        divider={<Divider orientation="vertical" flexItem />}
                        justifyContent="center"
                        mb={2}
                    >
                        <Stack alignItems="center">
                            <Typography>Servings</Typography>
                            <Typography>{description}</Typography>
                        </Stack>
                        <Stack alignItems="center">
                            <Typography>Total Time</Typography>
                            <Typography>{totalTimeMinutes} min</Typography>
                        </Stack>
                        <Stack alignItems="center">
                            <Typography>Prep Time</Typography>
                            <Typography>{prepTimeMinutes} min</Typography>
                        </Stack>
                        <Stack alignItems="center">
                            <Typography>Cook Time</Typography>
                            <Typography>{cookTimeMinutes} min</Typography>
                        </Stack>
                    </Stack>
                    <Grid
                        container
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 1 }}
                        justifyContent="center"
                        pt={3}
                        pb={3}
                    >
                        <Grid item xs={5} md={4} lg={3}>
                            <Typography variant="h4" textAlign={{ xs: 'center', sm: 'left' }}>
                                Ingredients
                            </Typography>
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
                        <Grid item xs={7} md={6}>
                            <Typography variant="h4" textAlign={{ xs: 'center', sm: 'left' }}>
                                Instructions
                            </Typography>
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
                </CardContent>
            </Card>
        </>
    );
};
export default RecipePage;
