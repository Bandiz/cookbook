import React, { useState } from "react";
import Loading from "../../Shared/Loading/Loading";
import { useGlobalContext } from "../../../context";
import recipesData from "./RecipesData";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const { recipes, loading, filterItems } = useGlobalContext();
  const [categories, setCategories] = useState([]);

  // if (loading) {
  //   return <Loading />;
  // }
  // if (recipes.length < 1) {
  //   return (
  //     <h2 className="section-title">no recipes matched your search criteria</h2>
  //   );
  // }



  return (
    <section className="section">
      <h2 className="section-title">recipes</h2>
      <div className="recipes-center">
        {recipesData.map((recipe) => {
          const { title, id, image, category, totalTime } = recipe;
          return (
            <article key={id} className="recipe-item">
              <img src={image} alt={title} className="photo" />
              <div className="item-info">
                <header>
                  <h4>{title}</h4>
                </header>
                <div className="item-text">
                  <h4>{category}</h4>
                  <p>Total time: {totalTime}</p>
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
};

export default RecipeList;
