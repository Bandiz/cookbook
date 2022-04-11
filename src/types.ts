import { Moment } from 'moment';

type Auditable = {
    updatedBy: string;
    updatedAt?: Moment;
    createdBy: string;
    createdAt: Moment;
};

export type Instructions = {
    id: number;
    description: string;
    position: number;
};

export type Ingredients = {
    id: number;
    amount: number;
    measurementType: string;
    name: string;
    position: number;
};

export type Recipe = {
    id: string;
    categories: string[];
    imageUrl: string;
    title: string;
    description: string;
    totalTimeMinutes: number;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    instructions: Instructions[];
    ingredients: Ingredients[];
} & Auditable;

export type User = {
    email: string;
    isAdmin: boolean;
    lastName: string;
    name: string;
};

export type UserSession = {
    token: string;
    user: User;
};

export type Category = {
    categoryName: string;
    visible: boolean;
    recipes?: CategoryRecipe[];
} & Auditable;

export type CategoryDetails = {
    recipes: CategoryRecipe[];
};

export type CategoryRecipe = {
    id: string;
    title: string;
} & Auditable;
