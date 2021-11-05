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
};

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
