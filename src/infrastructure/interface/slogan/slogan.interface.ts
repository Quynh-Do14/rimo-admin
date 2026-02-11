import { ProductInterface } from "../product/product.interface";

export interface SloganInterface {
    id?: number;
    name: string;
    description: string;
    image: string;
    active?: boolean;
    index?: number;
    type?: "HOMEPAGE" | "INTRODUCE" | "AGENCY" | "CONTACT" | "POLICY";
}

export interface SloganParams {
    page?: number;
    limit?: number;
    search?: string;
    active?: string;
    type?: "HOMEPAGE" | "INTRODUCE" | "AGENCY" | "CONTACT" | "POLICY";
}
export interface SloganHref {
    href: string
    label: string
}
