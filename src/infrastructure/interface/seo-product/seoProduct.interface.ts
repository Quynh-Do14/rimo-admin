import { BlogInterface } from "../blog/blog.interface";

export interface SEOProductInterface {
    id?: number;
    title: string;
    slug: string;
    category_id: number;
    content: string;

}

export interface SEOProductParams {
    page?: number;
    limit?: number;
    search?: string;
}