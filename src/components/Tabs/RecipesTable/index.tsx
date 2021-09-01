import { useEffect } from "react";

import {
  Grid,
  ListItemAvatar,
  ListItemText,
  List,
  ListItem,
  Avatar,
  Typography,
} from "@material-ui/core";

import { useGlobalContext } from "../../../RecipesContext";
import AddItem from "../ListLayout/AddItem";
import ListItems from "../ListLayout";
import { Link } from "react-router-dom";

export default function RecipesTable() {
  const { recipes, fetchRecipes } = useGlobalContext();

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h6" className="title">
        List of Recipes
      </Typography>
      <div style={{ backgroundColor: "var(--darkGrey)" }}>
        <List>
          <AddItem text="recipe" />
          {recipes.map((recipe, index) => {
            return (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>
                    <img src={recipe.imageUrl} alt="" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  children={
                    <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
                  }
                  secondary={recipe.totalTimeMinutes + " min"}
                />
                <ListItems />
              </ListItem>
            );
          })}
        </List>
      </div>
    </Grid>
  );
}
