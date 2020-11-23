import React from "react";
import SearchForm from "../../Shared/SearchForm/SearchForm";
import RecipeList from "./RecipeList";
import "./Recipes.css";



function Recipes() {

  return (
    <div>
      <SearchForm />
      <RecipeList />
    </div>
  );
}

export default Recipes;
