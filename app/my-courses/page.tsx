'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { getEnrolledCourses } from '@/lib/api/courses';
import type { Course } from '@/types/course';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface EnrolledCourse extends Course {
    enrolledAt: string;
}

export default function MyCoursesPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [courses, setCourses] = useState<EnrolledCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
            return;
        }

        const fetchCourses = async () => {
            try {
                setLoading(true);
                const data = await getEnrolledCourses();
                setCourses(data.courses);
            } catch {
                toast.error('Failed to load enrolled courses. Please try again.');
                setError('Failed to load your courses. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchCourses();
        }
    }, [user, authLoading, router]);

    const getCourseGradient = (id: string | number) => {
        const gradients = [
            'from-purple-500 to-pink-500',
            'from-blue-500 to-cyan-500',
            'from-orange-500 to-red-500',
            'from-green-500 to-emerald-500',
        ];
        const index = typeof id === 'string' ? id.charCodeAt(0) : id;
        return gradients[Number(index) % gradients.length];
    };

    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <Navbar />
                <div className="max-w-7xl mx-auto">
                    <div className="h-8 bg-[var(--muted)] rounded w-48 mb-8 animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-[var(--card)] rounded-3xl border border-[var(--border)] overflow-hidden animate-pulse">
                                <div className="h-48 bg-[var(--muted)]" />
                                <div className="p-6 space-y-4">
                                    <div className="h-6 bg-[var(--muted)] rounded w-3/4" />
                                    <div className="h-4 bg-[var(--muted)] rounded w-full" />
                                    <div className="h-10 bg-[var(--muted)] rounded w-full pt-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <header className="mb-12">
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">My Courses</h1>
                        <p className="text-[var(--muted-foreground)] text-lg">
                            {courses.length > 0
                                ? `You are currently enrolled in ${courses.length} course${courses.length === 1 ? '' : 's'}.`
                                : "You haven't enrolled in any courses yet."}
                        </p>
                    </header>

                    {courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.map((course) => (
                                <Link
                                    key={course.id}
                                    href={`/courses/${course.id}`}
                                    className="group flex flex-col bg-[var(--card)] rounded-3xl border border-[var(--border)] overflow-hidden hover:border-[var(--primary)] hover:shadow-2xl smooth-transition"
                                >
                                    {/* Thumbnail */}
                                    <div className="relative h-48 overflow-hidden">
                                        {course.thumbnail ? (
                                            <img
                                                src={course.thumbnail}
                                                alt={course.title}
                                                className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                                            />
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${getCourseGradient(course.id)} group-hover:scale-110 smooth-transition`} />
                                        )}
                                        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[var(--border)] text-xs font-bold text-[var(--primary)] uppercase">
                                            Enrolled
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-1 p-6">
                                        <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-[var(--primary)] smooth-transition line-clamp-2 min-h-[3.5rem]">
                                            {course.title}
                                        </h2>

                                        <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)] mb-6">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {course.duration}
                                            </div>
                                            <span className="opacity-30">•</span>
                                            <span>Enrolled {new Date(course.enrolledAt).toLocaleDateString()}</span>
                                        </div>

                                        <div className="mt-auto">
                                            <div className="w-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-bold text-center py-3 rounded-2xl group-hover:bg-[var(--primary)] group-hover:text-white smooth-transition">
                                                Continue Learning
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-[var(--muted)]/20 rounded-3xl border border-dashed border-[var(--border)]">
                            <div className="bg-[var(--primary)]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-4">Start your learning journey</h2>
                            <p className="text-[var(--muted-foreground)] mb-8 max-w-md mx-auto">
                                Explore our collection of courses and find the perfect one to advance your skills.
                            </p>
                            <Link
                                href="/courses"
                                className="inline-flex items-center gap-2 gradient-bg text-white font-bold px-8 py-3 rounded-full hover:opacity-90 smooth-transition shadow-lg"
                            >
                                Browse Courses
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
