import { ProductInterface } from "../product/product.interface";

export interface CategoryProductInterface {
    id?: number;
    name: string;
    description: string;
    image: string;
    index: number;
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

export interface UpdateIndexCategoryInterface {
    id: string, index: number
}
export interface UpdateIndexCategoryRequestInterface {
    items: UpdateIndexCategoryInterface[]
}
