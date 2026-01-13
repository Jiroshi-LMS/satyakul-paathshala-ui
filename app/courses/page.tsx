'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { getCourses } from '@/lib/api/courses';
import type { Course } from '@/types/course';
import { toast } from 'sonner';
import { Search, BookOpen, Clock, Star, ArrowRight } from 'lucide-react';

export default function CoursesPage() {
    const { loading: authLoading } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [nextCursor, setNextCursor] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading) return;

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
                setCourses(prev => [...prev, ...response.courses]);
            } else {
                setCourses(response.courses);
            }

            setNextCursor(response.nextCursor);
        } catch (err) {
            setError('Failed to load courses. Please try again later.');
            toast.error('Failed to load courses. Please try again later.');
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    // const categories: string[] = ['all', ...Array.from(new Set(courses.map(c => c.category).filter((cat): cat is string => Boolean(cat))))];

    const filteredCourses = courses.filter((course) => {
        return selectedCategory === 'all';
    });

    return (
        <div className="min-h-screen bg-transparent">
            <Navbar />

            <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#077D93]/10 text-white text-sm font-semibold mb-6 border border-[#077D93]/20">
                        <span className="w-2 h-2 bg-[#D0A933] rounded-full mr-2 animate-pulse"></span>
                        <span className="uppercase tracking-widest text-xs">Curriculum</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                        Explore Our <span className="text-[#D0A933]">Wisdom</span>
                    </h1>

                    <p className="text-lg text-[#E6E6E6] max-w-2xl mx-auto leading-relaxed">
                        Embark on a journey of structured learning, guided by ancient principles and modern pedagogy.
                    </p>
                </div>

                {/* Filters Section */}
                <div className="mb-12 space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-4xl mx-auto">
                        {/* Search */}
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-[#D0A933] transition-colors" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#D0A933]/50 text-white placeholder:text-white/30 transition-all font-sans"
                            />
                        </div>

                        {/* Categories */}
                        {/* <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar max-w-full">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${selectedCategory === category
                                        ? 'bg-[#D0A933] text-[#0B0B0B] border-[#D0A933]'
                                        : 'bg-white/5 text-white/70 border-white/5 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div> */}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white/5 rounded-2xl p-6 h-[400px] animate-pulse border border-white/10"></div>
                        ))}
                    </div>
                )}

                {/* Courses Grid */}
                {!loading && !error && filteredCourses.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course) => (
                            <Link
                                key={course.id}
                                href={`/courses/${course.id}`}
                                className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#D0A933]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#D0A933]/5"
                            >
                                {/* Thumbnail */}
                                <div className="relative h-48 overflow-hidden bg-[#077D93]/10">
                                    {course.thumbnail ? (
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#077D93]/30 to-[#0B0B0B] flex items-center justify-center">
                                            <span className="font-serif font-bold text-3xl text-white/20">Satyakul</span>
                                        </div>
                                    )}

                                    {course.isEnrolled && (
                                        <div className="absolute top-3 right-3 bg-[#077D93] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                            Enrolled
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow p-6">
                                    <div className="mb-4">
                                        {/* <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D0A933]">
                                                {course.category || 'General'}
                                            </span>
                                            {course.rating && (
                                                <span className="flex items-center gap-1 text-xs font-bold text-white/80">
                                                    <Star className="w-3 h-3 text-[#D0A933] fill-[#D0A933]" />
                                                    {course.rating.toFixed(1)}
                                                </span>
                                            )}
                                        </div> */}
                                        <h3 className="text-xl font-serif font-bold text-white mb-2 leading-tight group-hover:text-[#D0A933] transition-colors line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-[#E6E6E6]/70 line-clamp-2">
                                            {course.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs font-bold text-white/50 uppercase tracking-wider">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{course.duration ? `${course.duration}` : ''}</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {/* {!course.isEnrolled && (
                                                <span className="text-lg font-serif font-bold text-white">
                                                    ${course.price}
                                                </span>
                                            )} */}
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D0A933] group-hover:text-[#0B0B0B] transition-colors">
                                                <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredCourses.length === 0 && (
                    <div className="text-center py-24 border border-white/5 rounded-2xl bg-white/5">
                        <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <h3 className="text-xl font-serif font-bold text-white mb-2">No Courses Found</h3>
                        <p className="text-white/50 mb-6">Try adjusting your filters.</p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                            }}
                            className="text-[#D0A933] font-bold uppercase tracking-widest text-sm hover:text-white transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
