import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import Loading from "../../components/Shared/Loading";
import Rate from "../../components/Rate";
import Comment from "../../components/Comment";
import Share from "../../components/Share";
import { Search } from "../../components/Shared";
import { useGlobalContext } from "../../RecipesContext";
import { Recipe } from "../../types";

import { GiKnifeFork } from "react-icons/gi";
import { BiTime } from "react-icons/bi";
import "./Recipe.scss";

const RecipePage = () => {
  const { id } = useParams<{ id: any }>();
  const [recipe, setRecipe] = useState<Recipe>();

  const { loading, fetchRecipe } = useGlobalContext();

  useEffect(() => {
    fetchRecipe(id).then(setRecipe);
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!recipe) {
    return <h2 className="section-title">no recipe to display</h2>;
  }
  const {
    imageUrl,
    title,
    categories,
    description,
    prepTimeMinutes,
    cookTimeMinutes,
    totalTimeMinutes,
    ingredients,
    instructions,
  } = recipe;

  return (
    <div className="recipe-block">
      <Search />
      <Link to="/recipes" className="btn btn-primary">
        back to recipes
      </Link>
      <section className="recipe-section">
        <h2 className="section-title">{title}</h2>
        <div className="recipe">
          <img src={imageUrl} alt={title} className="photo" />
          <div className="details-time-container">
            <GiKnifeFork className="icon knife" />
            <div className="details-container">
              <div>
                <span className="recipe-data">Category </span>
                {categories.map((category, index) => {
                  return <p key={index}>{category}</p>;
                })}
              </div>
              <div>
                <span className="recipe-data">Amount </span>
                {description}
              </div>
            </div>
            <BiTime className="icon time" />
            <div className="time-container">
              <div>
                <span className="recipe-data">Prep Time </span>
                {prepTimeMinutes} min
              </div>
              <div>
                <span className="recipe-data">Cook Time </span>
                {cookTimeMinutes} min
              </div>
              <div>
                <span className="recipe-data">Total Time </span>
                {totalTimeMinutes} min
              </div>
            </div>
          </div>
          <div className="recipe-info">
            <h4 className="recipe-subtitle">
              <span className="recipe-data">Ingredients</span>
            </h4>
            <ul>
              {ingredients.map((ingredient, index) => {
                const { measurementType, name, amount } = ingredient;
                return ingredient ? (
                  <li key={index} className="recipe-ingredient">
                    {amount} {measurementType} {name}
                  </li>
                ) : null;
              })}
            </ul>
            <h4 className="recipe-subtitle">
              <span className="recipe-data">instructions</span>
            </h4>
            <ol>
              {instructions.map((instruction, index) => {
                return instruction ? (
                  <li key={index} className="recipe-instruction">
                    {instruction.description}
                  </li>
                ) : null;
              })}
            </ol>
          </div>
        </div>
        <Rate />
        <Share />
        <Comment />
      </section>
    </div>
  );
};
export default RecipePage;
