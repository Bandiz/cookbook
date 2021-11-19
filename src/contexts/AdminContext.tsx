import { createContext, ReactNode, useContext, useState } from 'react';

import { Category } from '../types';
import { useGlobalContext } from './RecipesContext';

interface AdminObject {
    categories: Category[];
    setCategories: (categories: Category[]) => void;
}

export const AdminContext = createContext<AdminObject>({} as AdminObject);

interface AdminProviderProps {
    children?: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
    const { userData } = useGlobalContext();
    const [categories, setCategories] = useState<Category[]>([]);

    if (!userData || !userData.user.isAdmin) {
        return <>{children}</>;
    }

    return <AdminContext.Provider value={{ categories, setCategories }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
    return useContext(AdminContext);
}
