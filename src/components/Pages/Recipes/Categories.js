import React from "react";
// import { useGlobalContext } from "../../../context";

const Categories = ({ filterItems, items, categories }) => {
  // const { filterItems } = useGlobalContext();

  return (
    <div className="section">
      {categories.map((category, index) => {
        return (
          <button
            className="btn"
            key={index}
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        );
      })}

      <h4>{items.map((item) => {
          return (
          <div>{item.category}{item.id}</div>
          )
          })}</h4>
    </div>
  );
};

export default Categories;
