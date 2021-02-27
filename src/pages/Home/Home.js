import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import recipesData from "../Recipes/RecipesData";
import "./Home.css";
// import Loading from "../../Shared/Loading/Loading";

function Home() {
  const { closeSubmenu } = useGlobalContext();
  const [index, setIndex] = useState(0);
  const { id, title, image, category } = recipesData[index];

  const checkNumber = (number) => {
    if (number > recipesData.length - 1) {
      return 0;
    }
    if (number < 0) {
      return recipesData.length - 1;
    }
    return number;
  };
  const nextRecipe = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prevRecipe = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };
  // TEMPORARY COMMENTED
  //
  // useEffect(() => {
  //   let slider = setInterval(() => {
  //     setIndex((index) => {
  //       let newIndex = index + 1;
  //       return checkNumber(newIndex);
  //     });
  //   }, 5000);
  //   return () => clearInterval(slider);
  // }, [index]);

  return (
    <main onMouseOver={closeSubmenu}>
      <section className="slider">
        <div className="img-container">
          <Link to={`/recipe/${id}`}>
            <img src={image} alt={title} className="recipe-img" />
          </Link>
          <div className="slider-center">
            <h4 className="title">{title}</h4>
            <Link to={`/category/${category}`}>
              <p className="category">{category}</p>
            </Link>
            <Link to={`/recipe/${id}`} className="btn btn-primary">
              read more
            </Link>
          </div>
          <div className="button-container">
            <button className="prev" onClick={prevRecipe}>
              <FiChevronLeft />
            </button>
            <button className="next" onClick={nextRecipe}>
              <FiChevronRight />
            </button>
          </div>
        </div>
      </section>
      {/* <Loading /> */}
    </main>
  );
}

export default Home;
