import { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { Recipe } from '../../types';
import { GetCategories } from '../../api/categories/getCategories';

export const RecipesContext = createContext({} as RecipesContextObject);

interface RecipesContextObject {
    recipes: Recipe[];
    setRecipes: (recipes: Recipe[]) => void;
    loading: boolean;
    fetchRecipe: (id: string) => Promise<Recipe>;
    categories: string[];
    setCategories: (categories: string[]) => void;
    fetchRecipes: () => Promise<void>;
    updateRecipe: (recipe: Recipe) => void;
}

export const RecipesProvider = ({ children }: { children?: ReactNode }) => {
    const [loading, setLoading] = useState(false);

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [categories, setCategories] = useState<string[]>([]);

    const { getCategoriesRequest, getCategoriesLoading } = GetCategories();

    useEffect(() => {
        getCategoriesRequest().then(setCategories);
    }, []);

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

    return (
        <RecipesContext.Provider
            value={{
                loading: loading || getCategoriesLoading,
                recipes,
                setRecipes,
                // fetchRecipes,
                fetchRecipe: fetchRecipeId,
                categories,
                setCategories,
                fetchRecipes,
                updateRecipe,
            }}
        >
            {children}
        </RecipesContext.Provider>
    );
};

export const useRecipes = () => {
    return useContext(RecipesContext);
};
