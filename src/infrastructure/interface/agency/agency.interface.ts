export interface AgencyInterface {
    id?: number;
    name: string;
    address: string;
    lat: string;
    long: string;
    phone_number: string;
    phone_number_2: string;
    phone_number_3: string;
    image: string;
    province: string;
    district: string;
    star_rate: number;
    active: boolean;
    agency_categories_type: AgencyCategory[]
}

export interface AgencyRequestInterface {
    id?: number;
    name: string;
    address: string;
    lat: string;
    long: string;
    phone_number: string;
    phone_number_2: string;
    phone_number_3: string;
    image: string;
    province: string;
    district: string;
    star_rate: number;
    active: boolean;
    agency_categories_type: string
}

export interface AgencyParams {
    page: number;
    limit: number;
    search: string;
    province: string;
    district: string;
    category_id?: string;
    active: string
}

interface AgencyCategory {
    id?: number;
    category_id: string,
    agency_id: string,
    category_name: string,
}