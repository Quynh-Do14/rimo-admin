export interface BannerInterface {
    id?: number;
    name: string;
    type: string;
    image: string;
}

export interface BannerParams {
    page?: number;
    limit?: number;
    search?: string;
}