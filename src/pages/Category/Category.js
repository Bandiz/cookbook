import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import recipesData from "../Recipes/RecipesData";

function Category() {
  const { filterItems, recipeItems } = useGlobalContext();
  const { category } = useParams();
  const [data, setData] = useState(recipesData);

  return (
    <section className="section">
      <h2 className="section-title">{category} recipes</h2>
      <div className="recipes-center">
        {data.map((item) => {
          const { title, id, image, totalTime } = item;
          if (
            item.category.localeCompare(category, undefined, {
              sensitivity: "accent",
            }) === 0
          ) {
            return (
              <article className="recipe-item" key={id}>
                <header>
                  <h4>{title}</h4>
                </header>
                <img src={image} alt={title} className="photo" />
                <div className="item-info">
                  <div className="item-text">
                    <h4>{item.category}</h4>
                    <p>Total time: {totalTime}</p>
                  </div>
                  <Link to={`/recipe/${id}`} className="btn btn-primary">
                    read more
                  </Link>
                </div>
              </article>
            );
          }
        })}
      </div>
    </section>
  );
}

export default Category;
