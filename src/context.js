import React, { useState, useContext, useEffect } from "react";
//import recipesData from "./components/Pages/Recipes/RecipesData";

const url = "https://localhost:44329/api/Recipe/";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  /* Header-> NAVBAR */
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [page, setPage] = useState({ text: "", sublinks: [] });
  /* Shared-> LOADING */
  const [loading, setLoading] = useState(true);
  /* Shared-> SEARCHFORM */
  const [searchTerm, setSearchTerm] = useState("a");
  const [recipes, setRecipes] = useState([]);
  /* Recipes-> ID */
  // const [recipeId, setRecipeId] = useState([]);
  /* Recipes-> CATEGORIES */
  //const [recipeItems, setRecipeItems] = useState(recipesData);

  /* Header-> NAVBAR */
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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
      console.log(recipes);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

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
    <AppContext.Provider
      value={{
        /* Header-> NAVBAR */
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,

        location,
        page,
        /* Shared-> LOADING */
        loading,
        /* Shared-> SEARCHFORM */
        recipes,
        setSearchTerm,
        /* Recipes-> ID */
        // recipeId,
        /* Recipes-> CATEGORIES */
        // filterItems,
        // recipeItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
