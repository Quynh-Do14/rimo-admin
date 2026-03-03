export interface BannerInterface {
    id?: number;
    name: string;
    type: "HOMEPAGE" | "INTRODUCE" | "AGENCY" | "CONTACT" | "POLICY";
    image: string;
    active: boolean
}

export interface BannerParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    active?: string
}