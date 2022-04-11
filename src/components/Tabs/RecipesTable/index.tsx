import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

import AddItem from '../ListLayout/AddItem';
import ListItems from '../ListLayout';
import { CREATE_RECIPE } from '../../../constants/routes';
import { useAdmin } from '../../../contexts/AdminContext';
import { GetRecipes } from '../../../api/recipes/getRecipes';

export default function RecipesTable() {
    const { recipes, setRecipes, recipesLoaded } = useAdmin();
    const { getRecipesRequest, getRecipesLoading } = GetRecipes();

    useEffect(() => {
        if (recipesLoaded) {
            return;
        }
        (async () => {
            const response = await getRecipesRequest();
            if (response.type !== 'response') {
                return;
            }
            setRecipes(response.payload);
        })();
    }, [recipesLoaded]);

    return (
        <Grid item xs={12}>
            <Typography variant="h6" className="title">
                List of Recipes
            </Typography>
            <div style={{ backgroundColor: 'var(--darkGrey)' }}>
                <List>
                    <AddItem url={CREATE_RECIPE} />
                    {recipes.map((recipe, index) => {
                        return (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <img src={recipe.imageUrl} alt="" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText secondary={recipe.totalTimeMinutes + ' min'}>
                                    <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                                </ListItemText>

                                <ListItems />
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        </Grid>
    );
}
