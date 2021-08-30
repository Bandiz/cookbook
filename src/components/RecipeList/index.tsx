// import { useEffect } from "react";
import { Link } from "react-router-dom";

import Loading from "../Shared/Loading";
// import { useGlobalContext } from "../../RecipesContext";
import { Recipe } from "../../types";

import "./RecipeList.scss";

export default function RecipeList({
  recipes,
  loading,
  category,
}: {
  recipes: Recipe[];
  loading: boolean;
  category?: string;
}) {
  if (loading) {
    return <Loading />;
  }
  if (recipes.length < 1) {
    return <h2 className="section-title">No recipes to display</h2>;
  }
  return (
    <section className="recipes-section">
      <h2 className="section-title">{category ? category : "All Recipes"}</h2>
      <div className="recipes">
        {recipes.map((recipe: Recipe, index) => {
          const { title, id, imageUrl, categories, totalTimeMinutes } = recipe;
          return (
            <article key={index} className="recipe-item">
              <h4 className="item-title">{title}</h4>
              <img src={imageUrl} alt={title} className="item-photo" />
              <div className="item-info">
                <div className="item-container">
                  <h4 className="category">
                    {categories.map((category, index) => {
                      return (
                        <Link
                          key={index}
                          to={`/category/${category}`}
                          className="category-link"
                        >
                          {category}
                        </Link>
                      );
                    })}
                  </h4>
                  <p className="text">Total time: {totalTimeMinutes} min</p>
                </div>
                <Link to={`/recipe/${id}`} className="btn btn-primary">
                  read more
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
