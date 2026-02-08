export interface AuthInterface {
    id?: number;
    name: string;
    email: string;
    role_name: "ADMIN" | "SELLER" | "WRITTER";
    role_id: number;
}

export interface AuthParams {
    page: number;
    limit: number;
    search: string;
    province: string;
    district: string;
    category_id: string;
}

interface AuthCategory {
    id?: number;
    category_id: string,
    agency_id: string,
    category_name: string,
}