export interface ContactInterface {
    id?: number;
    name: string;
    email: string;
    phone_number: string;
    message: string;
}

export interface ContactParams {
    page?: number;
    limit?: number;
    search?: string;
}