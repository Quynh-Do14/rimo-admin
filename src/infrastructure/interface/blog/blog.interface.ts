export interface BlogInterface {
    id?: number;
    title: string;
    description: string;
    image: string;
    short_description: string;
    blog_category_id: number;
    user_id: number;
    category_name: string;
    user_name: string;
    created_at: string;
    related_blogs: BlogInterface[]
}

export interface BlogParams {
    page?: number;
    limit?: number;
    search?: string;
    category_id?: string;
}

export interface BlogHref {
    href: string
    label: string
}
