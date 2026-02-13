import { ProductInterface } from "../product/product.interface";

export interface SloganInterface {
    id?: string;
    name: string;
    description: string;
    image: string;
    active?: boolean;
    index?: number;
    type?: "SLOGAN_SECTION" | "TITLE_VIDEO_SECTION" | "TITLE_SLOGAN_SECTION" | "TITLE_BLOG_SECTION" | "POLICY";
}

export interface UpdateIndexSloganInterface {
    id: string, index: number
}
export interface UpdateIndexSloganRequestInterface {
    items: UpdateIndexSloganInterface[]
}


export interface SloganParams {
    page?: number;
    limit?: number;
    search?: string;
    active?: string;
    type?: "SLOGAN_SECTION" | "TITLE_VIDEO_SECTION" | "TITLE_SLOGAN_SECTION" | "TITLE_BLOG_SECTION" | "POLICY";
}
export interface SloganHref {
    href: string
    label: string
}
