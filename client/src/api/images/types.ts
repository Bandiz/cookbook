type ImageCategory = {
    categoryName: string;
    imageIds: string[];
};

export type ImagesByCategoryResponse = {
    uncategorizedImages: string[];
    categories: ImageCategory[];
};
