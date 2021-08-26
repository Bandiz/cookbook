import React, { useState, useContext, createContext, ReactNode } from "react";
import { Recipe } from "./types";
//import recipesData from "./components/Pages/Recipes/RecipesData";

const url = "https://localhost:44329/api/v1/Recipe/";
export const RecipesContext = createContext({} as RecipesContextObject);

interface RecipesContextObject {
  recipes: Recipe[];
  loading: boolean;
  fetchRecipes: () => Promise<void>;
}

export const RecipesProvider = ({ children }: { children?: ReactNode }) => {
  /* Shared-> LOADING */
  const [loading, setLoading] = useState(false);
  /* Shared-> SEARCHFORM */
  // const [searchTerm, setSearchTerm] = useState("a");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  /* Recipes-> ID */
  // const [recipeId, setRecipeId] = useState([]);
  /* Recipes-> CATEGORIES */
  //const [recipeItems, setRecipeItems] = useState(recipesData);

  // /* Recipes-> CATEGORIES */
  // const filterItems = (category) => {
  //   const newItems = recipesData.filter((item) => item.category === category);
  //   setRecipeItems(newItems);
  // };

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const recipes = await response.json();
      setRecipes(recipes);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchRecipes();
  // }, []);

  // const fetchRecipeId = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(`${url}${id}`);
  //     const recipeId = await response.json();
  //     console.log(recipeId);
  //     setRecipeId(recipeId);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchRecipeId();
  // }, []);

  return (
    <RecipesContext.Provider
      value={{
        loading,
        recipes,
        /* Recipes-> ID */
        // recipeId,
        /* Recipes-> CATEGORIES */
        // filterItems,
        // recipeItems,
        fetchRecipes,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(RecipesContext);
};
