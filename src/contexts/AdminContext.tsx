import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

import { Category, Recipe } from '../types';
import { useAuth } from './AuthContext';

interface AdminObject {
    recipesLoaded: boolean;
    recipes: Recipe[];
    setRecipes: Dispatch<SetStateAction<Recipe[]>>;
    categoriesLoaded: boolean;
    categories: Category[];
    setCategories: Dispatch<SetStateAction<Category[]>>;
}

export const AdminContext = createContext<AdminObject>({} as AdminObject);

interface AdminProviderProps {
    children?: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loaded, setLoaded] = useState<{ categoriesLoaded: boolean; recipesLoaded: boolean }>({
        categoriesLoaded: false,
        recipesLoaded: false,
    });

    if (!user || !user.isAdmin) {
        return <>{children}</>;
    }

    function setRecipesWrapper(recipes: SetStateAction<Recipe[]>) {
        if (!loaded.recipesLoaded) {
            setLoaded((prev) => ({ ...prev, recipesLoaded: true }));
        }
        setRecipes(recipes);
    }

    function setCategoriesWrapper(categories: SetStateAction<Category[]>) {
        if (!loaded.categoriesLoaded) {
            setLoaded((prev) => ({ ...prev, categoriesLoaded: true }));
        }
        setCategories(categories);
    }

    return (
        <AdminContext.Provider
            value={{
                recipes,
                setRecipes: setRecipesWrapper,
                categories,
                setCategories: setCategoriesWrapper,
                ...loaded,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    return useContext(AdminContext);
}
