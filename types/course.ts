export interface Course {
    id: string | number;
    title: string;
    description: string;
    instructor?: {
        id: string | number;
        name: string;
        avatar?: string;
    };
    instructorName?: string;
    price: number;
    currency?: string;
    thumbnail?: string;
    category?: string;
    duration?: number | string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
    rating?: number;
    studentsCount?: number;
    lessons?: number;
    createdAt?: string;
    updatedAt?: string;
    tags?: string[];
    isPublished?: boolean;
    isFeatured?: boolean;
    isEnrolled?: boolean;
}

export interface Lesson {
    id: string;
    title: string;
    description: string;
    duration: string; // Formatted string
    createdAt: string;
}

export interface LessonDetail extends Lesson {
    videoUrl: string;
}

// API response structure from your headless backend
export interface ApiCourseItem {
    uuid: string;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    created_at: string;
    is_enrolled: boolean;
}

export interface ApiLessonItem {
    uuid: string;
    title: string;
    description: string;
    duration: string;
    created_at: string;
}

export interface ApiCoursesResponse {
    status: boolean;
    results: boolean;
    message: string;
    data: {
        next: string | null;
        previous: string | null;
        next_cursor: string | null;
        previous_cursor: string | null;
        results: ApiCourseItem[];
    };
    error_code: string | null;
}

export interface ApiCourseDetailResponse {
    status: boolean;
    results: boolean;
    message: string;
    data: ApiCourseItem;
    error_code: string | null;
}

export interface ApiLessonsResponse {
    status: boolean;
    results: boolean;
    message: string;
    data: {
        count: number;
        total_pages: number;
        current_page: number;
        next: string | null;
        previous: string | null;
        results: ApiLessonItem[];
    };
    error_code: string | null;
}

export interface ApiLessonDetailResponse {
    status: boolean;
    results: boolean;
    message: string;
    data: ApiLessonItem & { video_url: string };
    error_code: string | null;
}

export interface CoursesResponse {
    courses: Course[];
    nextCursor: string | null;
    previousCursor: string | null;
    hasMore: boolean;
}

export interface CourseFilters {
    category?: string;
    level?: string;
    priceMin?: number;
    priceMax?: number;
    search?: string;
    cursor?: string;
}

export interface LessonResource {
    uuid: string;
    title: string;
    fileSize: number;
    fileType: string;
    fileUrl: string;
    createdAt: string;
}

export interface RelatedLink {
    url: string;
    title: string;
}

export interface LessonResourcesData {
    resources: LessonResource[];
    notes: string;
    relatedLinks: RelatedLink[];
}

export interface ApiLessonResourceItem {
    uuid: string;
    title: string;
    file_size: number;
    file_type: string;
    file_url: string;
    created_at: string;
}

export interface ApiLessonResourcesResponse {
    status: boolean;
    results: boolean;
    message: string;
    data: {
        results: ApiLessonResourceItem[];
        notes: string;
        related_links: { url: string; title: string }[];
    } | null;
    error_code: string | null;
}

export interface ApiEnrolledCoursesResponse {
    status: boolean;
    results: boolean;
    message: string;
    data: {
        count: number;
        total_pages: number;
        current_page: number;
        next: string | null;
        previous: string | null;
        results: (ApiCourseItem & { enrolled_at: string })[];
    } | null;
    error_code: string | null;
}

export interface EnrolledCoursesResponse {
    courses: (Course & { enrolledAt: string })[];
    count: number;
    totalPages: number;
    currentPage: number;
}
