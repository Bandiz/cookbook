import React from "react";
import { useGlobalContext } from "../../../context";
import "./SearchForm.css";
// import recipesData from "../../Pages/Recipes/RecipesData";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = React.useRef("");

  const searchRecipe = () => {
    setSearchTerm(searchValue.current.value);
    console.log(searchValue.current.value);
    // recipesData.filter((item) => {
    //   const { title, category } = item;
    //   return <div>{title}</div>;
    // });
  };
  return (
    <section className="search">
      <form className="search-form">
        <div className="form-control">
          <input
            type="text"
            id="name"
            ref={searchValue}
            placeholder="Search"
            onChange={searchRecipe}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
