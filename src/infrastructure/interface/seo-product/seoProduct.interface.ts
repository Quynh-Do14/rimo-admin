export interface SEOProductInterface {
    id?: number;
    title: string;
    slug: string;
    category_id: number;
    content: string;
    description: string;
    keyword: any | SEOProductKeyword[];
}

export interface SEOProductParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface SEOProductKeyword {
    product_id: string
    keyword: string
}
