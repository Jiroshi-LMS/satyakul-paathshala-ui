export interface Instructor {
    username: string;
    email: string;
    country_code: string;
    display_name: string;
    phone_number: string;
}

export interface InstructorProfileDetails {
    bio: string;
    location: string;
    profile_picture: string;
}

export interface InstructorProfileData {
    instructor: Instructor;
    profile: InstructorProfileDetails;
}

export interface ApiInstructorProfileResponse {
    status: boolean;
    results: boolean;
    message: string;
    data: InstructorProfileData | null;
    error_code: string | null;
}
