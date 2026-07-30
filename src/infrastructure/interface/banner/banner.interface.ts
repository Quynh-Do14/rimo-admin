export interface BannerInterface {
    id?: number;
    name: string;
    type: "HOMEPAGE" | "INTRODUCE" | "AGENCY" | "CONTACT" | "POLICY";
    image: string;
    active: boolean
    url: string
}

export interface BannerParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    active?: string
}