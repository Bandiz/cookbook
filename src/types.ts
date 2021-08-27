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
  id: number;
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
