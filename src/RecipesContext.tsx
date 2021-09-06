import { useState, useContext, createContext, ReactNode } from "react";
import { _categories, _recipeById, _recipes, _token } from "./contextApi/apiUrl";
import { Category, Recipe, UserSession } from "./types";

export const RecipesContext = createContext({} as RecipesContextObject);

interface RecipesContextObject {
    recipes: Recipe[];
    loading: boolean;
    userData: UserSession | null;
    logout: () => void;
    fetchRecipes: () => Promise<void>;
    fetchRecipe: (id: string) => Promise<Recipe>;
    fetchUserData: (tokenId: string) => Promise<void>;
    categories: Category[];
    fetchCategories: () => Promise<void>;
}

export const RecipesProvider = ({ children }: { children?: ReactNode }) => {
    const [loading, setLoading] = useState(false);

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [userData, setUserData] = useState<UserSession | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const response = await fetch(_recipes);
            const recipes = await response.json();
            setRecipes(recipes);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const fetchRecipeId = async (id: string) => {
        const recipe = recipes.find((x) => x.id === id);

        if (recipe) {
            return recipe;
        }

        setLoading(true);
        try {
            const response = await fetch(`${_recipeById}${id}`);
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
            const response = await fetch(`${_token}${tokenId}`);
            const userData = (await response.json()) as UserSession;
            setUserData(userData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch(_categories);
            const categories = await response.json();
            setCategories(categories);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const logout = () => {
        setUserData(null);
    };

    console.log("context loaded");

    return (
        <RecipesContext.Provider
            value={{
                loading,
                recipes,
                fetchRecipes,
                fetchRecipe: fetchRecipeId,
                userData,
                fetchUserData,
                categories,
                fetchCategories,
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
