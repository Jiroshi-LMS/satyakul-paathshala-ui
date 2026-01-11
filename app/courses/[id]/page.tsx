'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getCourseById, getCourseLessons, enrollInCourse } from '@/lib/api/courses';
import type { Course, Lesson } from '@/types/course';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function CourseDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const courseId = params?.id as string;

    const [course, setCourse] = useState<Course | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        if (!courseId) return;
        try {
            setLoading(true);
            // Fetch course and lessons in parallel
            const [courseData, lessonsData] = await Promise.all([
                getCourseById(courseId),
                getCourseLessons(courseId)
            ]);

            setCourse(courseData);
            setLessons(lessonsData);
        } catch (err) {
            toast.error('Failed to load course details. Please try again.');
            setError('Failed to load course details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [courseId]);

    const handleEnrollment = async () => {
        if (!user) {
            toast.info('Please sign in to enroll in this course');
            router.push('/login');
            return;
        }

        try {
            setEnrolling(true);
            const success = await enrollInCourse(courseId);
            if (success) {
                toast.success('Successfully enrolled in the course!');
                // Refresh course data to update isEnrolled status
                fetchData();
            } else {
                toast.error('Failed to enroll. Please try again.');
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Enrollment failed. Please try again.');
        } finally {
            setEnrolling(false);
        }
    };

    const handleLessonLink = (lessonId: string) => {
        if (!user) {
            toast.info('Please sign in to view this lesson');
            router.push('/login');
            return;
        }

        if (!course?.isEnrolled) {
            toast.error('You must be enrolled in this course to view the lessons.');
            return;
        }

        router.push(`/courses/${courseId}/lessons/${lessonId}`);
    };

    const getCourseGradient = (id: string | number) => {
        const gradients = [
            'from-purple-500 to-pink-500',
            'from-blue-500 to-cyan-500',
            'from-orange-500 to-red-500',
            'from-green-500 to-emerald-500',
        ];
        // Simple hash to pick a gradient
        const index = typeof id === 'string' ? id.charCodeAt(0) : id;
        return gradients[index % gradients.length];
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto w-full space-y-8 animate-pulse">
                    <div className="h-64 bg-[var(--muted)] rounded-3xl" />
                    <div className="space-y-4">
                        <div className="h-8 bg-[var(--muted)] rounded w-3/4" />
                        <div className="h-4 bg-[var(--muted)] rounded w-1/2" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center pt-24">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">{error || 'Course not found'}</h2>
                    <Link href="/courses" className="text-primary hover:underline">
                        Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Top Navigation */}
            <Navbar />

            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="mb-12">
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8 border border-[var(--border)]">
                            {course.thumbnail ? (
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${getCourseGradient(course.id)}`} />
                            )}

                            {/* Overlay Badge */}
                            {course.isEnrolled && (
                                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                                    Enrolled
                                </div>
                            )}
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            {course.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-[var(--muted-foreground)] mb-6">
                            {course.duration && (
                                <div className="flex items-center gap-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{course.duration}</span>
                                </div>
                            )}
                            <span className="text-[var(--border)]">|</span>
                            <span>Created {new Date(course.createdAt || '').toLocaleDateString()}</span>
                        </div>

                        <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-8">
                            {course.description}
                        </p>

                        <div className="flex items-center justify-between p-6 bg-[var(--muted)]/30 rounded-2xl border border-[var(--border)]">
                            <div>
                                <p className="text-sm text-[var(--muted-foreground)] mb-1">Price</p>
                                {course.isEnrolled ? (
                                    <span className="text-2xl font-bold text-green-500">Purchased</span>
                                ) : (
                                    <span className="text-3xl font-bold gradient-text">${course.price}</span>
                                )}
                            </div>

                            {!course.isEnrolled && (
                                <button
                                    onClick={handleEnrollment}
                                    disabled={enrolling}
                                    className="gradient-bg text-white font-bold px-8 py-3 rounded-full hover:opacity-90 smooth-transition shadow-lg transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Syllabus Section */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                            <h2 className="text-2xl font-bold text-foreground">Course Syllabus</h2>
                            <span className="text-[var(--muted-foreground)]">{lessons.length} Lessons</span>
                        </div>

                        <div className="space-y-4">
                            {lessons.length > 0 ? lessons.map((lesson, index) => (
                                <div
                                    key={lesson.id}
                                    onClick={() => handleLessonLink(lesson.id)}
                                    className="group flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-background border border-[var(--border)] rounded-xl hover:border-[var(--primary)] hover:shadow-md smooth-transition cursor-pointer"
                                >
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] smooth-transition shrink-0 font-bold">
                                        {index + 1}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-foreground group-hover:text-[var(--primary)] smooth-transition truncate">
                                            {lesson.title}
                                        </h3>
                                        {lesson.description && (
                                            <p className="text-sm text-[var(--muted-foreground)] truncate mt-1">
                                                {lesson.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] whitespace-nowrap">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {lesson.duration}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-12 text-[var(--muted-foreground)] bg-[var(--muted)]/20 rounded-2xl border border-dashed border-[var(--border)]">
                                    No lessons content available yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
