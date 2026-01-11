import apiClient from './axios';
import { toast } from 'sonner';
import type { ApiInstructorProfileResponse, InstructorProfileData } from '@/types/instructor';

/**
 * Fetch the instructor profile
 */
export const getInstructorProfile = async (): Promise<InstructorProfileData> => {
    try {
        const response = await apiClient.get<ApiInstructorProfileResponse>('/instructor/profile/');

        if (!response.data.status || !response.data.data) {
            throw new Error(response.data.message || 'Failed to fetch instructor profile');
        }

        return response.data.data;
    } catch (error) {
        toast.error('Failed to fetch instructor profile.');
        throw error;
    }
};
