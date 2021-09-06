import { useEffect } from "react";

import { Grid, ListItemAvatar, ListItemText, List, ListItem, Avatar, Typography } from "@material-ui/core";

import { useGlobalContext } from "../../../RecipesContext";
import AddItem from "../ListLayout/AddItem";
import ListItems from "../ListLayout";
import { Link } from "react-router-dom";
import { CREATE_RECIPE } from "../../../constants/routes";

export default function RecipesTable() {
    const { recipes, fetchRecipes } = useGlobalContext();

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <Grid item xs={12}>
            <Typography variant="h6" className="title">
                List of Recipes
            </Typography>
            <div style={{ backgroundColor: "var(--darkGrey)" }}>
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
                                <ListItemText secondary={recipe.totalTimeMinutes + " min"}>
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
