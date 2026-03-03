export interface ContentPageInterface {
    id?: number;
    type: string;
    content: string;
}

export interface ContentPageParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: string
}
