import React from "react";
import Loading from "../../Shared/Loading/Loading";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../context";

const RecipeList = () => {
  const { recipes, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (recipes.length < 1) {
    return (
      <h2 className="section-title">no recipes matched your search criteria</h2>
    );
  }
  return (
    <section>
      <h2 className="section-title">recipes</h2>
      <div className="recipes-center">
        {recipes.map((recipe) => {
          const { title, id, image, categories, totalTimeMinutes } = recipe;
          return (
            <article key={id} className="recipe-item">
              <header>
                <h4>{title}</h4>
              </header>
              <img
                src={`/assets/images/item-${id}.jpeg`}
                alt={title}
                className="photo"
              />
              <div className="item-info">
                <div className="item-text">
                  {categories.map((category, index) => {
                    return (
                      <Link key={index} to={`/category/${category}`}>
                        <h4>{category}</h4>
                      </Link>
                    );
                  })}
                  <p>Total time: {totalTimeMinutes}</p>
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
