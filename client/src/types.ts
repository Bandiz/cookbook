import { Dayjs } from 'dayjs';

type Auditable = {
    updatedBy?: string;
    updatedAt?: Dayjs;
    createdBy: string;
    createdAt: Dayjs;
};

export type Instructions = {
    description: string;
};

export type Ingredients = {
    amount: number;
    measurementType: string;
    name: string;
};

export type Recipe = {
    id: string;
    categories: string[];
    mainImage: string;
    title: string;
    description: string;
    isPublished: boolean;
    totalTimeMinutes: number;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    instructions: Instructions[];
    ingredients: Ingredients[];
} & Auditable;

export type Category = {
    categoryName: string;
    visible: boolean;
    images: string[];
    mainImage: string | null;
} & Auditable;

export type CategoryRecipes = {
    recipes: CategoryRecipe[];
};

export type CategoryRecipe = {
    id: string;
    title: string;
    categoryName: string;
} & Auditable;
