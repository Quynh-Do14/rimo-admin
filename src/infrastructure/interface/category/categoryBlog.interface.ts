export interface CategoryBlogInterface {
    id?: number;
    name: string;
    image: string;
}

export interface CategoryBlogParams {
    page?: number;
    limit?: number;
    search?: string;
}