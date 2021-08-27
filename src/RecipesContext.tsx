import { useState, useContext, createContext, ReactNode } from "react";
import { Recipe } from "./types";
//import recipesData from "./components/Pages/Recipes/RecipesData";

const url = "https://localhost:44329/api/v1/Recipe/";

export const RecipesContext = createContext({} as RecipesContextObject);

interface RecipesContextObject {
  recipes: Recipe[];
  loading: boolean;
  fetchRecipes: () => Promise<void>;
  fetchRecipe: (id: number) => Promise<Recipe>;
}

export const RecipesProvider = ({ children }: { children?: ReactNode }) => {
  /* Shared-> LOADING */
  const [loading, setLoading] = useState(false);
  /* Shared-> SEARCHFORM */
  // const [searchTerm, setSearchTerm] = useState("a");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  /* Recipes-> ID */
  // const [recipeId, setRecipeId] = useState<Recipe>();
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

  const fetchRecipeId = async (id: number) => {
    const recipe = recipes.find((x) => x.id === id);

    if (recipe) {
      return recipe;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}${id}`);
      const recipe = await response.json();
      setLoading(false);
      setRecipes((prev) => [...prev, recipe]);
      return recipe;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchRecipeId();
  // }, []);

  return (
    <RecipesContext.Provider
      value={{
        loading,
        recipes,
        /* Recipes-> ID */
        /* Recipes-> CATEGORIES */
        // filterItems,
        // recipeItems,
        fetchRecipes,
        fetchRecipe: fetchRecipeId,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(RecipesContext);
};
