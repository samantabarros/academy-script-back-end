export interface UsuarioPayload {
    sub: string;
    email: string;
    senha: string;
    iat?: number;
    exp?: number;
}