import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

import { Category } from '../types';
import { useGlobalContext } from './RecipesContext';

interface AdminObject {
    categoriesLoaded: boolean;
    categories: Category[];
    setCategories: Dispatch<SetStateAction<Category[]>>;
}

export const AdminContext = createContext<AdminObject>({} as AdminObject);

interface AdminProviderProps {
    children?: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
    const { userData } = useGlobalContext();
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);

    if (!userData || !userData.user.isAdmin) {
        return <>{children}</>;
    }

    function setCategoriesWrapper(categories: SetStateAction<Category[]>) {
        if (!categoriesLoaded) {
            setCategoriesLoaded(true);
        }
        setCategories(categories);
    }

    return (
        <AdminContext.Provider value={{ categories, setCategories: setCategoriesWrapper, categoriesLoaded }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    return useContext(AdminContext);
}
