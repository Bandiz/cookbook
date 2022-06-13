import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { useCategoryList } from '../api/categories';
import { mapCategory } from '../api/categories/mapCategory';

import { Category, Recipe } from '../types';
import { useAuth } from './AuthContext';

interface AdminObject {
    recipesLoaded: boolean;
    recipes: Recipe[];
    setRecipes: Dispatch<SetStateAction<Recipe[]>>;
    categories: Category[];
}

export const AdminContext = createContext<AdminObject>({} as AdminObject);

interface AdminProviderProps {
    children?: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
    const { isAdmin } = useAuth();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loaded, setLoaded] = useState<{ recipesLoaded: boolean }>({
        recipesLoaded: false,
    });

    const categoryList = useCategoryList();

    useEffect(() => {
        if (categoryList.status !== 'success') {
            return;
        }

        setCategories(categoryList.data.map(mapCategory));
    }, [categoryList.status]);

    if (!isAdmin) {
        return <>{children}</>;
    }

    function setRecipesWrapper(recipes: SetStateAction<Recipe[]>) {
        if (!loaded.recipesLoaded) {
            setLoaded((prev) => ({ ...prev, recipesLoaded: true }));
        }
        setRecipes(recipes);
    }

    return (
        <AdminContext.Provider
            value={{
                recipes,
                setRecipes: setRecipesWrapper,
                categories,
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
