import { BlogInterface } from "../blog/blog.interface";

export interface CategoryBlogInterface {
    id?: number;
    name: string;
    image: string;
    blog: BlogInterface[]
}

export interface CategoryBlogParams {
    page?: number;
    limit?: number;
    search?: string;
}