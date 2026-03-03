export interface ConfigPageInterface {
    id?: string;
    title: string;
    description: string;
    box_content: string;
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
    index: number;
}

export interface ConfigPageParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
}
export interface ConfigPageHref {
    href: string
    label: string
}

export interface UpdateIndexConfigPageInterface {
    id: string, index: number
}
export interface UpdateIndexConfigPageRequestInterface {
    items: UpdateIndexConfigPageInterface[]
}
