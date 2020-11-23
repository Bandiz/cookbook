import React, { useState, useEffect } from "react";
import Loading from "../../Shared/Loading/Loading";
import recipesData from "../Recipes/RecipesData";
import { useParams, Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import { BiTime } from "react-icons/bi";
import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(recipesData);

  //   if (loading) {
  //     return <Loading />;
  //   }
  //   if (!recipe) {
  //     return <h2 className="section-title">no recipe to display</h2>;
  //   }
  return (
    <section className="section recipe-section">
      <Link to="/recipes" className="btn btn-primary">
        back to recipes
      </Link>
      {data.map((item) => {
        if (item.id === id) {
          const {
            id,
            image,
            title,
            category,
            amount,
            prepTime,
            cookTime,
            totalTime,
            ingredient1,
            ingredient2,
            ingredient3,
            ingredient4,
            ingredient5,
            ingredient6,
            ingredient7,
            ingredient8,
            ingredient9,
            ingredient10,
            directions1,
            directions2,
            directions3,
            directions4,
            directions5,
            directions6,
            directions7,
            directions8,
            directions9,
            directions10,
          } = item;
          const ingredients = [
            ingredient1,
            ingredient2,
            ingredient3,
            ingredient4,
            ingredient5,
            ingredient6,
            ingredient7,
            ingredient8,
            ingredient9,
            ingredient10,
          ];
          const directions = [
            directions1,
            directions2,
            directions3,
            directions4,
            directions5,
            directions6,
            directions7,
            directions8,
            directions9,
            directions10,
          ];
          return (
            <div key={id}>
              <h2 className="section-title">{title}</h2>
              <div className="recipe">
                <img src={image} alt={title} className="photo" />
                <div className="details-time-container">
                  <GiKnifeFork className="icon knife" />
                  <div className="details-container">
                    <p>
                      <span className="recipe-data">Category </span>
                      {category}
                    </p>
                    <p>
                      <span className="recipe-data">Amount </span>
                      {amount}
                    </p>
                  </div>
                  <BiTime className="icon time" />
                  <div className="time-container">
                    <p>
                      <span className="recipe-data">Prep Time </span>
                      {prepTime}
                    </p>
                    <p>
                      <span className="recipe-data">Cook Time </span>
                      {cookTime}
                    </p>
                    <p>
                      <span className="recipe-data">Total Time </span>
                      {totalTime}
                    </p>
                  </div>
                </div>
                <div className="recipe-info">
                  <h4 className="recipe-subtitle">
                    <span className="recipe-data">Ingredients</span>
                  </h4>
                  <ul>
                    {ingredients.map((ingredient, index) => {
                      return ingredient ? (
                        <li className="recipe-ingredient" key={index}>
                          {ingredient}
                        </li>
                      ) : null;
                    })}
                  </ul>
                  <h4 className="recipe-subtitle">
                    <span className="recipe-data">Directions</span>
                  </h4>
                  <ol>
                    {directions.map((direction, index) => {
                      return direction ? (
                        <li className="recipe-direction" key={index}>
                          {direction}
                        </li>
                      ) : null;
                    })}
                  </ol>
                </div>
              </div>
            </div>
          );
        }
      })}
    </section>
  );
};

export default Recipe;