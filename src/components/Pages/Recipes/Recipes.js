import React from "react";
import SearchForm from "../../Shared/SearchForm/SearchForm";
import RecipeList from "./RecipeList";
import "./Recipes.css";

function Recipes() {
  return (
    <div className="recipes-page">
      <section className="recipes-section">
        <RecipeList />
      </section>
      <section className="widgets-section">
        <SearchForm />
      </section>
    </div>
  );
}

export default Recipes;
