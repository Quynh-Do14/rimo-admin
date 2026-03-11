export interface BlogInterface {
    id?: number;
    title: string;
    description: string;
    image: string;
    short_description: string;
    blog_category_id: number;
    user_id?: number;
    category_name?: string;
    user_name?: string;
    created_at?: string;
    active: boolean;
    is_draft?: boolean;
    related_blogs?: BlogInterface[]
    slug: string
    keyword: BlogKeyword[]
}

export interface BlogRequestInterface {
    id?: number;
    title: string;
    description: string;
    image: string;
    short_description: string;
    blog_category_id: number;
    user_id?: number;
    category_name?: string;
    user_name?: string;
    created_at?: string;
    active: boolean;
    is_draft?: boolean;
    related_blogs?: BlogInterface[]
    slug: string
    keyword: string
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

export interface BlogKeyword {
    blog_id: string
    keyword: string
}

