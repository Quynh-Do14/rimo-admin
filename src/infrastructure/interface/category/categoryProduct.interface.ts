export interface CategoryProductInterface {
    id?: number;
    name: string;
    description: string;
    image: string;
}

export interface CategoryProductParams {
    page?: number;
    limit?: number;
    search?: string;
}
export interface CategoryProductHref {
    href: string
    label: string
}
