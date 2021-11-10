import { useState, useContext, createContext, ReactNode } from 'react';
import { Recipe, UserSession } from './types';

export const RecipesContext = createContext({} as RecipesContextObject);

interface RecipesContextObject {
    recipes: Recipe[];
    loading: boolean;
    userData?: UserSession | null;
    fetchRecipes: () => Promise<void>;
    fetchRecipe: (id: string) => Promise<Recipe>;
    addRecipe: (id: string) => Promise<Recipe>;
    updateRecipe: (recipe: Recipe) => void;
    setSession: (session: UserSession) => void;
    clearSession: () => void;
}

export const RecipesProvider = ({ children }: { children?: ReactNode }) => {
    const [loading, setLoading] = useState(false);

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [userData, setUserData] = useState<UserSession | null>();

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

    const updateRecipe = (recipe: Recipe) => {
        setRecipes((prev) =>
            prev.map((x) => {
                if (x.id === recipe.id) {
                    return recipe;
                }
                return x;
            })
        );
    };

    const clearSession = () => {
        setUserData(null);
    };

    return (
        <RecipesContext.Provider
            value={{
                loading,
                recipes,
                fetchRecipes,
                fetchRecipe: fetchRecipeId,
                userData,
                addRecipe,
                updateRecipe,
                setSession: setUserData,
                clearSession,
            }}
        >
            {children}
        </RecipesContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(RecipesContext);
};
