'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { getCourses } from '@/lib/api/courses';
import type { Course } from '@/types/course';
import { toast } from 'sonner';

export default function CoursesPage() {
    const { loading: authLoading } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        if (authLoading) return; // Wait for auth check to complete

        const timer = setTimeout(() => {
            fetchCourses(undefined, searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, authLoading]);

    const fetchCourses = async (cursor?: string, search: string = searchQuery) => {
        try {
            const isLoadingMore = !!cursor;
            if (isLoadingMore) {
                setLoadingMore(true);
            } else {
                setLoading(true);
            }
            setError(null);

            const response = await getCourses(cursor, search);

            if (isLoadingMore) {
                // Append to existing courses
                setCourses(prev => [...prev, ...response.courses]);
            } else {
                // Replace courses
                setCourses(response.courses);
            }

            setNextCursor(response.nextCursor);
            setHasMore(response.hasMore);
        } catch (err) {
            setError('Failed to load courses. Please try again later.');
            toast.error('Failed to load courses. Please try again later.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const loadMoreCourses = () => {
        if (nextCursor && !loadingMore) {
            fetchCourses(nextCursor);
        }
    };

    // Filter courses based on search and category
    const filteredCourses = courses.filter((course) => {
        const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
        return matchesCategory;
    });

    // Get unique categories from courses
    const categories: string[] = ['all', ...Array.from(new Set(courses.map(c => c.category).filter((cat): cat is string => Boolean(cat))))];

    const getCategoryGradient = (index: number) => {
        const gradients = [
            'from-blue-500 to-cyan-500',
            'from-purple-500 to-pink-500',
            'from-orange-500 to-red-500',
            'from-green-500 to-emerald-500',
            'from-indigo-500 to-purple-500',
            'from-pink-500 to-rose-500',
        ];
        return gradients[index % gradients.length];
    };

    // Helper to get course image or fallback gradient
    const getCourseImage = (course: Course, index: number) => {
        if (course.thumbnail) return course.thumbnail;

        const gradients = [
            'from-purple-500 to-pink-500',
            'from-blue-500 to-cyan-500',
            'from-orange-500 to-red-500',
            'from-green-500 to-emerald-500',
            'from-indigo-500 to-purple-500',
            'from-pink-500 to-rose-500',
        ];
        return gradients[index % gradients.length];
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                            All Courses
                        </h1>
                        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                            Explore our complete collection of courses and start learning today
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-12 space-y-4">
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-6 py-4 rounded-full border-2 border-[var(--border)] bg-background text-foreground placeholder-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none smooth-transition"
                                />
                                <svg
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    suppressHydrationWarning
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-2 rounded-full font-medium text-sm smooth-transition ${selectedCategory === category
                                        ? 'gradient-bg text-white shadow-md'
                                        : 'bg-[var(--muted)] text-foreground hover:bg-[var(--border)]'
                                        }`}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-[var(--muted)] rounded-2xl overflow-hidden animate-pulse">
                                    <div className="h-48 bg-[var(--border)]" />
                                    <div className="p-6 space-y-3">
                                        <div className="h-4 bg-[var(--border)] rounded w-3/4" />
                                        <div className="h-4 bg-[var(--border)] rounded w-1/2" />
                                        <div className="h-20 bg-[var(--border)] rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
                                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">{error}</h3>
                            <button
                                onClick={() => fetchCourses()}
                                className="mt-4 gradient-bg text-white font-medium px-6 py-3 rounded-full hover:opacity-90 smooth-transition"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Courses Grid */}
                    {!loading && !error && filteredCourses.length > 0 && (
                        <>
                            <div className="mb-6 text-sm text-[var(--muted-foreground)]">
                                Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredCourses.map((course, index) => (
                                    <div
                                        key={course.id}
                                        className="bg-background rounded-2xl overflow-hidden card-hover shadow-md border border-[var(--border)]"
                                    >
                                        {/* Course Image */}
                                        <Link href={`/courses/${course.id}`} className="block h-48 relative group">
                                            {course.thumbnail ? (
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover smooth-transition group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className={`w-full h-full bg-gradient-to-br ${getCourseImage(course, index)} smooth-transition group-hover:scale-105`} />
                                            )}
                                        </Link>

                                        {/* Course Content */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-3">
                                                {course.category && (
                                                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                                                        {course.category}
                                                    </span>
                                                )}
                                                {course.duration && (
                                                    <span className="text-xs text-[var(--muted-foreground)]">
                                                        {course.duration} {typeof course.duration === 'number' ? 'hours' : ''}
                                                    </span>
                                                )}
                                                {course.level && (
                                                    <span className="text-xs text-[var(--muted-foreground)]">
                                                        • {course.level}
                                                    </span>
                                                )}
                                            </div>

                                            <Link href={`/courses/${course.id}`} className="block">
                                                <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2 h-[56px] hover:text-[var(--primary)] smooth-transition">
                                                    {course.title}
                                                </h3>
                                            </Link>

                                            <p className="text-sm text-[var(--muted-foreground)] mb-4 line-clamp-3 h-[60px]">
                                                {course.description}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                                                <Link
                                                    href={`/courses/${course.id}`}
                                                    className="gradient-bg text-white text-sm font-bold px-6 py-2 rounded-full hover:opacity-90 smooth-transition shadow-sm inline-block"
                                                >
                                                    Checkout
                                                </Link>

                                                {course.isEnrolled ? (
                                                    <span className="bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-sm">
                                                        Enrolled
                                                    </span>
                                                ) : (
                                                    <div className="text-2xl font-bold gradient-text">
                                                        ${course.price}
                                                    </div>
                                                )}
                                            </div>

                                            {course.rating && (
                                                <div className="flex items-center gap-2 mt-3 text-sm text-[var(--muted-foreground)]">
                                                    <span className="text-yellow-500">★</span>
                                                    <span className="font-medium text-foreground">{course.rating.toFixed(1)}</span>
                                                    {course.studentsCount && (
                                                        <span>• {course.studentsCount.toLocaleString()} students</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* No Results */}
                    {!loading && !error && filteredCourses.length === 0 && courses.length > 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
                            <p className="text-[var(--muted-foreground)] mb-6">
                                Try adjusting your search or filters
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory('all');
                                }}
                                className="gradient-bg text-white font-medium px-6 py-3 rounded-full hover:opacity-90 smooth-transition"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && courses.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold text-foreground mb-2">No courses available</h3>
                            <p className="text-[var(--muted-foreground)]">
                                Check back soon for new courses!
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
