import { useState, useContext, createContext, ReactNode } from "react";
import { Recipe, UserSession } from "./types";

const url = "https://localhost:44329/api/";

export const RecipesContext = createContext({} as RecipesContextObject);

interface RecipesContextObject {
  recipes: Recipe[];
  loading: boolean;
  userData: UserSession | undefined;
  fetchRecipes: () => Promise<void>;
  fetchRecipe: (id: number) => Promise<Recipe>;
  fetchUserData: (tokenId: string) => Promise<void>;
}

export const RecipesProvider = ({ children }: { children?: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [userData, setUserData] = useState<UserSession>();

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}v1/Recipe`);
      const recipes = await response.json();
      setRecipes(recipes);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchRecipeId = async (id: number) => {
    const recipe = recipes.find((x) => x.id === id);

    if (recipe) {
      return recipe;
    }

    setLoading(true);
    try {
      const response = await fetch(`${url}v1/Recipe/${id}`);
      const recipe = await response.json();
      setLoading(false);
      setRecipes((prev) => [...prev, recipe]);
      return recipe;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchUserData = async (tokenId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}token?t=${tokenId}`);
      const userData = (await response.json()) as UserSession;
      setUserData(userData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <RecipesContext.Provider
      value={{
        loading,
        recipes,
        fetchRecipes,
        fetchRecipe: fetchRecipeId,
        userData,
        fetchUserData,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(RecipesContext);
};