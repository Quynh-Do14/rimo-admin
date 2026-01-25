export interface ProductInterface {
    id?: number;
    name: string;
    description: string;
    price: number;
    price_sale: number;
    year?: number | null;
    warranty?: string | null;
    image: string;
    category_id?: number;
    created_at?: string;
    brand_id?: number | null;
    short_description: string;
    category_name?: string;
    brand_name?: string | null;
    images: string[];
    productFigure: ProductFigure[]
    sameCategoryProducts: ProductInterface[]
}

export interface ProductFigure {
    key: string;
    value: string
}
export interface ProductParams {
    page?: number;
    limit?: number;
    search?: string;
    category_id?: string;
}

export interface ProductHref {
    href: string
    label: string
}
