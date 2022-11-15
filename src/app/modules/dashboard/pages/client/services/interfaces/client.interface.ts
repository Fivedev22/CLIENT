export interface IClient {
    id_client?: number,
    name: string,
    last_name: string,
    email: string,
    phone_number: string,
    document: string,
    is_foreign: boolean,
    is_active?: boolean,
    gender_type: number,
    document_type: number,
    province?: number
}
