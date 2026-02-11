export interface ContactInterface {
    id?: string;
    name: string;
    email: string;
    phone_number: string;
    message: string;
    status: boolean;
    created_at: string;
    updated_at: string;
}

export interface ContactStatusInterface {
    id?: string;
    status: boolean;
}

export interface ContactParams {
    page?: number;
    limit?: number;
    search?: string;
}