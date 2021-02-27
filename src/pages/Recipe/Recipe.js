import React, { useState, useEffect } from "react";
import Loading from "../../components/Shared/Loading/Loading";
import { useParams, Link } from "react-router-dom";

import { GiKnifeFork } from "react-icons/gi";
import { BiTime } from "react-icons/bi";
import "./Recipe.css";
import RateShare from "./Rate&Share";
import Comment from "./Comment";

const url = "https://localhost:44329/api/Recipe/";

const Recipe = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getRecipe() {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        console.log(data);
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getRecipe();
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (!recipe) {
    return <h2 className="section-title">no recipe to display</h2>;
  }
  const {
    image,
    title,
    categories,
    //amount,
    prepTimeMinutes,
    cookTimeMinutes,
    totalTimeMinutes,
    ingredients,
    instructions,
  } = recipe;

  return (
    <section className="section recipe-section">
      <Link to="/recipes" className="btn btn-primary">
        back to recipes
      </Link>
      <div className="recipe-block">
        <h2 className="section-title">{title}</h2>
        <div className="recipe">
          <img src={`/assets/images/item-${id}.jpeg`} alt={title} className="photo" />
          <div className="details-time-container">
            <GiKnifeFork className="icon knife" />
            <div className="details-container">
              <p>
                <span className="recipe-data">Category </span>
                {categories.map((category, index) => {
                  return <div key={index}>{category}</div>;
                })}
              </p>
              <p>
                <span className="recipe-data">Amount </span>
                "AMOUNT"
              </p>
            </div>
            <BiTime className="icon time" />
            <div className="time-container">
              <p>
                <span className="recipe-data">Prep Time </span>
                {prepTimeMinutes}
              </p>
              <p>
                <span className="recipe-data">Cook Time </span>
                {cookTimeMinutes}
              </p>
              <p>
                <span className="recipe-data">Total Time </span>
                {totalTimeMinutes}
              </p>
            </div>
          </div>
          <div className="recipe-info">
            <h4 className="recipe-subtitle">
              <span className="recipe-data">Ingredients</span>
            </h4>
            <ul>
              {ingredients.map((ingredient) => {
                const { id, amount, measurementType, name } = ingredient;
                return ingredient ? (
                  <li key={id} className="recipe-ingredient">
                    {amount} {measurementType} {name}
                  </li>
                ) : null;
              })}
            </ul>
            <h4 className="recipe-subtitle">
              <span className="recipe-data">instructions</span>
            </h4>
            <ol>
              {instructions.map((instruction) => {
                const { id, description } = instruction;
                return instruction ? (
                  <li key={id} className="recipe-instruction">
                    {description}
                  </li>
                ) : null;
              })}
            </ol>
          </div>
        </div>
      </div>
      <RateShare />
      <Comment />
    </section>
  );
};
export default Recipe;
