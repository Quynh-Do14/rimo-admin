export interface VideoInterface {
    id?: number;
    name: string;
    description?: string;
    link_url: string;
    active: boolean;
}

export interface VideoParams {
    page?: number;
    limit?: number;
    search?: string;
}
