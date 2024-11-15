
export interface PublicCategory {
    categoryName: string;
    mainImage: string;
    isFeatured: boolean;
}

export type GetCategoryListResponse = {
    categories: Array<PublicCategory>;
};
