export interface SignupRequest {
    identifier: string; // email
    password: string;
}

export interface SignupResponse {
    status: boolean;
    results: boolean;
    message: string;
    data: {
        access_token: string;
        refresh_token?: string;
    } | null;
    error_code: string | null;
}

export interface LoginRequest {
    identifier: string; // email
    password: string;
}

export interface LoginResponse {
    status: boolean;
    results: boolean;
    message: string;
    data: {
        access_token: string;
        refresh_token?: string;
    } | null;
    error_code: string | null;
}

export interface StudentProfile {
    uuid: string;
    identifier: string; // This is the user's email
    first_name?: string;
    last_name?: string;
    avatar?: string;
    // Add other profile fields as needed
}

export interface ProfileResponse {
    status: boolean;
    results: boolean;
    message: string;
    data: StudentProfile | null;
    error_code: string | null;
}

export interface UpdateAccountRequest {
    identifier?: string;
    password?: string;
    current_password?: string;
}

export interface UpdateAccountResponse {
    status: boolean;
    results: boolean;
    message: string;
    data: {
        access_token: string;
        refresh_token?: string;
    } | null;
    error_code: string | null;
}

