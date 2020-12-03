import React from "react";
import RecentPost from "../../Shared/RecentPosts/RecentPost";
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
        <RecentPost />
      </section>
    </div>
  );
}

export default Recipes;
