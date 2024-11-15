interface PublicInstruction {
    description: string;
}

interface PublicIngredient {
    amount: number;
    measurementType: string;
    name: string;
}

export interface GetPublicRecipeResponse {
    id: number;
    title: string;
    description: string;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    totalTimeMinutes: number;
    mainImage: string;
    categories: Array<string>;
    instructions: Array<PublicInstruction>;
    ingredients: Array<PublicIngredient>;
    isFeatured: boolean;
}
