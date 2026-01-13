import apiClient from './axios';
import { toast } from 'sonner';
import type { Course, ApiCoursesResponse, ApiCourseItem, CoursesResponse, ApiCourseDetailResponse, ApiLessonsResponse, Lesson, LessonsResponse, ApiLessonItem, LessonDetail, ApiLessonDetailResponse, LessonResourcesData, ApiLessonResourcesResponse, EnrolledCoursesResponse, ApiEnrolledCoursesResponse } from '@/types/course';

/**
 * Helper to format file size bytes to string
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Helper to format duration seconds to string
 */
export const formatDuration = (duration: string | number): string => {
    const durationSeconds = typeof duration === 'string' ? parseFloat(duration) : duration;
    if (isNaN(durationSeconds)) return '0 seconds';

    if (durationSeconds >= 3600) {
        return `${(durationSeconds / 3600).toFixed(3)} hours`;
    } else if (durationSeconds >= 60) {
        return `${Math.round(durationSeconds / 60)} minutes`;
    } else {
        return `${Math.round(durationSeconds)} seconds`;
    }
};

/**
 * Map API course item to our Course interface
 */
const mapApiCourse = (apiCourse: ApiCourseItem): Course => {
    return {
        id: apiCourse.uuid,
        title: apiCourse.title,
        description: apiCourse.description,
        thumbnail: apiCourse.thumbnail,
        duration: formatDuration(apiCourse.duration),
        createdAt: apiCourse.created_at,
        isEnrolled: apiCourse.is_enrolled,
        // price: 0, // Removed as per type definition
    };
};

/**
 * Map API lesson item to our Lesson interface
 */
const mapApiLesson = (apiLesson: ApiLessonItem): Lesson => {
    return {
        id: apiLesson.uuid,
        title: apiLesson.title,
        description: apiLesson.description,
        duration: formatDuration(apiLesson.duration),
        createdAt: apiLesson.created_at,
    };
};

/**
 * Fetch courses from the API with optional cursor for pagination
 * @param cursor - Optional cursor for pagination
 */
export const getCourses = async (cursor?: string, search?: string): Promise<CoursesResponse> => {
    try {
        const params: Record<string, string> = {};
        if (cursor) params.cursor = cursor;
        if (search) params.search = search;
        params.selections = "uuid,title,description,thumbnail,duration,created_at,is_enrolled"
        const response = await apiClient.get<ApiCoursesResponse>('/courses/', { params });

        // Check if response is successful
        if (!response.data.status) {
            toast.error('Failed to fetch courses: API returned error status');
            throw new Error(response.data.message || 'Failed to fetch courses');
        }

        // Extract courses from nested structure
        const apiCourses = response.data.data?.results || [];

        if (!Array.isArray(apiCourses)) {
            toast.error('Unexpected response format from server');
            return {
                courses: [],
                nextCursor: null,
                previousCursor: null,
                hasMore: false,
            };
        }

        // Map API courses to our Course interface
        const courses = apiCourses.map(mapApiCourse);

        return {
            courses,
            nextCursor: response.data.data?.next_cursor || null,
            previousCursor: response.data.data?.previous_cursor || null,
            hasMore: !!response.data.data?.next_cursor,
        };
    } catch (error) {
        toast.error('Failed to fetch courses. Please try again.');
        throw error;
    }
};

/**
 * Fetch a single course by ID
 */
export const getCourseById = async (id: string | number): Promise<Course> => {
    try {
        const response = await apiClient.get<ApiCourseDetailResponse>(`/courses/${id}/`);
        if (!response.data.status || !response.data.data) {
            throw new Error(response.data.message || 'Failed to fetch course details');
        }
        return mapApiCourse(response.data.data);
    } catch (error) {
        toast.error(`Failed to fetch course details for ID: ${id}`);
        throw error;
    }
};

/**
 * Fetch lessons for a specific course
 */
export const getCourseLessons = async (courseId: string | number, page: number = 1): Promise<LessonsResponse> => {
    try {
        const response = await apiClient.get<ApiLessonsResponse>(`/courses/${courseId}/lessons/`, {
            params: { pagination: 'page', page, selections: 'uuid,title,description,duration,created_at' }
        });

        if (!response.data.status) {
            toast.error('Failed to fetch lessons: API returned error status');
            return {
                lessons: [],
                count: 0,
                totalPages: 0,
                currentPage: 1,
                next: null,
                previous: null
            };
        }

        const data = response.data.data;
        const apiLessons = data?.results || [];
        const pagination = data?.pagination;

        return {
            lessons: apiLessons.map(mapApiLesson),
            count: pagination?.count || 0,
            totalPages: pagination?.total_pages || 0,
            currentPage: pagination?.current_page || 1,
            next: pagination?.next || null,
            previous: pagination?.previous || null
        };

    } catch {
        toast.error('Failed to fetch lessons. Please try again.');
        return {
            lessons: [],
            count: 0,
            totalPages: 0,
            currentPage: 1,
            next: null,
            previous: null
        };
    }
};

/**
 * Enroll a student in a course
 */
export const enrollInCourse = async (courseId: string): Promise<boolean> => {
    try {
        const response = await apiClient.post('/courses/enroll/', {
            course_uuid: courseId
        });
        return !!response.data.status;
    } catch (error) {
        toast.error('Enrollment failed. Please try again.');
        throw error;
    }
};

/**
 * Fetch a single lesson details (including video URL)
 */
export const getLessonById = async (courseId: string, lessonId: string): Promise<LessonDetail> => {
    try {
        const response = await apiClient.get<ApiLessonDetailResponse>(`/courses/${courseId}/lessons/${lessonId}/`);
        if (!response.data.status || !response.data.data) {
            throw new Error(response.data.message || 'Failed to fetch lesson details');
        }

        const data = response.data.data;
        return {
            id: data.uuid,
            title: data.title,
            description: data.description,
            duration: formatDuration(data.duration),
            createdAt: data.created_at,
            videoUrl: data.video_url,
        };
    } catch (error) {
        toast.error('Failed to fetch lesson details.');
        throw error;
    }
};

/**
 * Fetch lesson resources, notes, and related links
 */
export const getLessonResources = async (courseId: string, lessonId: string): Promise<LessonResourcesData> => {
    try {
        const response = await apiClient.get<ApiLessonResourcesResponse>(`/courses/${courseId}/lessons/${lessonId}/resources/`);

        if (!response.data.status || !response.data.data) {
            return {
                resources: [],
                notes: '',
                relatedLinks: []
            };
        }

        const data = response.data.data;
        return {
            resources: (data.results || []).map(item => ({
                uuid: item.uuid,
                title: item.title,
                fileSize: item.file_size,
                fileType: item.file_type,
                fileUrl: item.file_url,
                createdAt: item.created_at
            })),
            notes: data.notes || '',
            relatedLinks: data.related_links || []
        };
    } catch {
        toast.error('Failed to fetch lesson resources.');
        return {
            resources: [],
            notes: '',
            relatedLinks: []
        };
    }
};

/**
 * Fetch courses enrolled by the user
 */
export const getEnrolledCourses = async (page: number = 1): Promise<EnrolledCoursesResponse> => {
    try {
        const response = await apiClient.get<ApiEnrolledCoursesResponse>('/courses/enrolled/', {
            params: { pagination: 'page', page }
        });

        if (!response.data.status || !response.data.data) {
            return { courses: [], count: 0, totalPages: 0, currentPage: 0 };
        }

        const data = response.data.data;
        const courses = (data.results || []).map(item => ({
            ...mapApiCourse(item),
            enrolledAt: item.enrolled_at
        }));

        return {
            courses,
            count: data.count,
            totalPages: data.total_pages,
            currentPage: data.current_page
        };
    } catch (error) {
        toast.error('Failed to fetch enrolled courses.');
        throw error;
    }
};




