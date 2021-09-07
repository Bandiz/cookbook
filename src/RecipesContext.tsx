import { useState, useContext, createContext, ReactNode } from "react";

import { Recipe, UserSession } from "./types";
import { useAuth } from "./AuthContext";

export const RecipesContext = createContext({} as RecipesContextObject);

interface RecipesContextObject {
    recipes: Recipe[];
    setRecipes: (recipes: Recipe[]) => void;
    loading: boolean;
    userData: UserSession | null;
    logout: () => void;
    fetchRecipe: (id: string) => Promise<Recipe>;
    fetchUserData: (tokenId: string) => Promise<void>;
    categories: string[];
    setCategories: (category: string[]) => void;
}

export const RecipesProvider = ({ children }: { children?: ReactNode }) => {
    const { httpClient } = useAuth();

    const [loading, setLoading] = useState(false);

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [userData, setUserData] = useState<UserSession | null>(null);

    const [categories, setCategories] = useState<string[]>([]);

    // const fetchRecipes = async () => {
    //     setLoading(true);
    //     try {
    //         const recipes = await getRecipesRequest();
    //         setRecipes(recipes);
    //         setLoading(false);
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false);
    //     }
    // };

    const fetchRecipeId = async (id: string) => {
        const recipe = recipes.find((x) => x.id === id);

        if (recipe) {
            return recipe;
        }

        setLoading(true);
        try {
            const response = await fetch(`https://localhost:44329/api/v1/Recipe/${id}`);
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
            const { data: userData } = await httpClient.get<UserSession>("/token", {
                params: {
                    t: tokenId,
                },
            });
            setUserData(userData);
            httpClient.defaults.headers.authorization = `bearer ${userData.token}`;
            setLoading(false);
        } catch (error) {
            console.log(error);
            httpClient.defaults.headers.authorization = "";
            setLoading(false);
        }
    };

    const logout = () => {
        setUserData(null);
        httpClient.defaults.headers.authorization = "";
    };

    console.log("context loaded");

    return (
        <RecipesContext.Provider
            value={{
                loading,
                recipes,
                setRecipes,
                // fetchRecipes,
                fetchRecipe: fetchRecipeId,
                userData,
                fetchUserData,
                categories,
                setCategories,
                logout,
            }}
        >
            {children}
        </RecipesContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(RecipesContext);
};
