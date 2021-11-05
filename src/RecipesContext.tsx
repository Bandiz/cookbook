import { useState, useContext, createContext, ReactNode } from 'react';
import { Recipe, UserSession } from './types';

export const RecipesContext = createContext({} as RecipesContextObject);

interface RecipesContextObject {
    recipes: Recipe[];
    loading: boolean;
    userData: UserSession | undefined;
    fetchRecipes: () => Promise<void>;
    fetchRecipe: (id: string) => Promise<Recipe>;
    fetchUserData: (tokenId: string) => Promise<void>;
    addRecipe: (id: string) => Promise<Recipe>;
}

export const RecipesProvider = ({ children }: { children?: ReactNode }) => {
    const [loading, setLoading] = useState(false);

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [userData, setUserData] = useState<UserSession>();

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}v1/Recipe`);
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}v1/Recipe/${id}`);
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}token?t=${tokenId}`);
            const userData = (await response.json()) as UserSession;
            setUserData(userData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const addRecipe = async (id: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}v1/Recipe/${id}`, { method: 'PUT' });
            const newRecipe = await response.json();
            setLoading(false);
            setRecipes((prev) => [...prev, newRecipe]);
            return newRecipe;
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
                addRecipe,
            }}
        >
            {children}
        </RecipesContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(RecipesContext);
};
