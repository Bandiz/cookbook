import React, { useState, useContext } from "react";
import links from "./components/Shared/Header/HeaderNav/NavData";
import recipesData from "./components/Pages/Recipes/RecipesData";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  /* Header-> NAVBAR */
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [location, setLocation] = useState({});
  const [page, setPage] = useState({ text: "", sublinks: [] });
  /* Header-> LOADING */
  const [loading, setLoading] = useState(false);
  /* Header-> SEARCHFORM */
  const [searchTerm, setSearchTerm] = useState("a");
  const [recipes, setRecipes] = useState([]);
  /* Recipes-> CATEGORIES */
  const [recipeItems, setRecipeItems] = useState(recipesData);

  /* Header-> NAVBAR */
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const openSubmenu = (text, coordinates) => {
    const page = links.find((link) => link.text === text);
    setPage(page);
    setLocation(coordinates);
    setIsSubmenuOpen(true);
  };
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };
  /* Recipes-> CATEGORIES */
  const filterItems = (category) => {
    const newItems = recipesData.filter((item) => item.category === category);
    setRecipeItems(newItems);
  };

  return (
    <AppContext.Provider
      value={{
        /* Header-> NAVBAR */
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        location,
        page,
        /* Header-> LOADING */
        loading,
        /* Header-> SEARCHFORM */
        recipes,
        setSearchTerm,
        /* Recipes-> CATEGORIES */
        filterItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
