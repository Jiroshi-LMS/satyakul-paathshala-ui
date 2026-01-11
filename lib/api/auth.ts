import apiClient, { isDev } from './axios';
import { toast } from 'sonner';
import type { SignupRequest, SignupResponse, LoginRequest, LoginResponse, ProfileResponse, UpdateAccountRequest, UpdateAccountResponse } from '@/types/auth';


/**
 * Fetch current student profile
 */
export const getProfile = async (): Promise<ProfileResponse> => {
    try {
        const response = await apiClient.get<ProfileResponse>('/students/profile/');
        return response.data;
    } catch (error) {
        toast.error('Failed to fetch profile. Please try again.');
        throw error;
    }
};

/**
 * Register a new student
 */
export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
    try {
        const config = isDev ? { headers: { 'X-Client-Type': 'dev' } } : {};
        const response = await apiClient.post<SignupResponse>('/students/signup/', data, config);

        if (isDev && response.data.data?.refresh_token) {
            localStorage.setItem('refresh_token', response.data.data.refresh_token);
        }

        return response.data;
    } catch (error) {
        toast.error('Signup failed. Please check your information.');
        throw error;
    }
};

/**
 * Login a student
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        const config = isDev ? { headers: { 'X-Client-Type': 'dev' } } : {};
        const response = await apiClient.post<LoginResponse>('/students/login/', data, config);

        if (isDev && response.data.data?.refresh_token) {
            localStorage.setItem('refresh_token', response.data.data.refresh_token);
        }

        return response.data;
    } catch (error) {
        toast.error('Login failed. Please check your credentials.');
        throw error;
    }
};
/**
 * Update student account settings (identifier/email and password)
 */
export const updateAccount = async (data: UpdateAccountRequest): Promise<UpdateAccountResponse> => {
    try {
        const response = await apiClient.put<UpdateAccountResponse>('/students/account/update/', data);
        return response.data;
    } catch (error) {
        toast.error('Account update failed.');
        throw error;
    }
};

/**
 * Check if a student identifier (email) is already taken
 * Returns true if the identifier is already in use, false otherwise
 */
export const checkIdentifierAvailability = async (identifier: string): Promise<boolean> => {
    try {
        const response = await apiClient.post('/students/lookup/', { "identifier": identifier });
        return !!response?.data?.data?.student_exists;
    } catch {
        toast.error('Identifier lookup failed.');
        return false;
    }
};

/**
 * Logout the authenticated student
 */
export const logout = async (): Promise<void> => {
    try {
        const config = isDev ? { headers: { 'X-Client-Type': 'dev' } } : {};
        const data = isDev ? { refresh_token: localStorage.getItem('refresh_token') } : {};
        await apiClient.post('/students/logout/', data, config);

        if (isDev) {
            localStorage.removeItem('refresh_token');
        }
    } catch (error) {
        // We still want to clear local state even if server logout fails
        console.error('Logout API failed:', error);
    }
};
