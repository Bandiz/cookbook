import React, { useState } from "react";
import SearchForm from "../../Shared/SearchForm/SearchForm";
import Categories from "./Categories";
import RecipeList from "./RecipeList";
import "./Recipes.css";
import recipesData from "./RecipesData";

const allCategories = [
  "all",
  ...new Set(recipesData.map((item) => item.category)),
];
console.log(allCategories);
function Recipes() {
  const [recipeItems, setRecipeItems] = useState(recipesData);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    const newItems = recipesData.filter((item) => item.category === category);
    setRecipeItems(newItems);
  };
  return (
    <div>
      <SearchForm />
      <Categories
        filterItems={filterItems}
        items={recipeItems}
        categories={categories}
      />
      <RecipeList />
    </div>
  );
}

export default Recipes;
