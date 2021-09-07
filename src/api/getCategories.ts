import { useState } from "react";

import { useAuth } from "../AuthContext";
import { useGlobalContext } from "../RecipesContext";

export function getCategories() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();
    const { setCategories } = useGlobalContext();

    const getCategoriesRequest = async () => {
        setLoading(true);
        try {
            const response = await httpClient.get<string[]>(`/v1/Category`);
            setCategories(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { getCategoriesRequest, getCategoriesLoading: loading };
}

export function postCategory() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();
    const { categories, setCategories } = useGlobalContext();

    const postCategoryRequest = async (categoryName: string) => {
        setLoading(true);
        try {
            const response = await httpClient.post<string>(`/v1/Category`, { categoryName });
            const resData = response.data;
            setCategories([...categories, resData]);
            return resData;
        } catch (error) {
            console.log(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { postCategoryRequest, postCategoryLoading: loading };
}

export function deleteCategory() {
    const [loading, setLoading] = useState(false);
    const { httpClient } = useAuth();
    const { categories, setCategories } = useGlobalContext();

    const deleteCategoryRequest = async (categoryName: string) => {
        setLoading(true);
        try {
            const response = await httpClient.delete<string>(`/v1/Category/${categoryName}`);
            const resData = response.data;
            setCategories(categories.filter((c) => c !== resData));
            return resData;
        } catch (error) {
            console.log(error);
            return [];
        } finally {
            setLoading(false);
        }
    };

    return { deleteCategoryRequest, deleteCategoryLoading: loading };
}
