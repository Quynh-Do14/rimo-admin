export interface AgencyInterface {
    id?: number;
    name: string;
    address: string;
    lat: string;
    long: string;
    phone_number: string;
    image: string;
    province: string;
    district: string;
    star_rate: number;
    categories: AgencyCategory[]
}

export interface AgencyParams {
    page: number;
    limit: number;
    search: string;
    province: string;
    district: string;
    category_id: string;
}

interface AgencyCategory {
    id?: number;
    category_id: string,
    agency_id: string,
    category_name: string,
}