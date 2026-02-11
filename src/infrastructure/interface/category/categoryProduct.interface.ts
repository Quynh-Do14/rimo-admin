import { ProductInterface } from "../product/product.interface";

export interface CategoryProductInterface {
    id?: number;
    name: string;
    description: string;
    image: string;
    products: ProductInterface[]
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
