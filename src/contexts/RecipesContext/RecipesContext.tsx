import { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import { useCategoryNameList } from '../../api/categories';
import { Recipe } from '../../types';

export const RecipesContext = createContext({} as RecipesContextObject);

interface RecipesContextObject {
    recipes: Recipe[];
    setRecipes: (recipes: Recipe[]) => void;
    loading: boolean;
    categories: string[];
    fetchRecipe: (id: string) => Promise<Recipe>;
    fetchRecipes: () => Promise<void>;
    updateRecipe: (recipe: Recipe) => void;
}

export const RecipesProvider = ({ children }: { children?: ReactNode }) => {
    const [loading, setLoading] = useState(false);

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const categoryNames = useCategoryNameList();

    useEffect(() => {
        if (categoryNames.status !== 'success') {
            return;
        }

        setCategories(categoryNames.data);
    }, [categoryNames.status]);

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
                loading,
                recipes,
                categories,
                setRecipes,
                // fetchRecipes,
                fetchRecipe: fetchRecipeId,
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
