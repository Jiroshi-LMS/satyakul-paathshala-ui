'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getCourseById, getCourseLessons, enrollInCourse } from '@/lib/api/courses';
import type { Course, Lesson } from '@/types/course';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Clock, Calendar, CheckCircle2, Lock, PlayCircle, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CourseDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const courseId = params?.id as string;

    const [course, setCourse] = useState<Course | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [totalLessons, setTotalLessons] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [lessonsLoading, setLessonsLoading] = useState(false);
    const [enrolling, setEnrolling] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (page: number = 1) => {
        if (!courseId) return;
        try {
            if (page === 1) setLoading(true);
            else setLessonsLoading(true);

            // Fetch course details only on initial load
            let courseData = course;
            if (!courseData) {
                courseData = await getCourseById(courseId);
                setCourse(courseData);
            }

            const lessonsData = await getCourseLessons(courseId, page);

            setLessons(lessonsData.lessons);
            setTotalLessons(lessonsData.count);
            setTotalPages(lessonsData.totalPages);
            setCurrentPage(lessonsData.currentPage);
        } catch (err) {
            toast.error('Failed to load course details.');
            setError('Failed to load course details.');
        } finally {
            setLoading(false);
            setLessonsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchData(newPage);
        }
    };

    const handleEnrollment = async () => {
        if (!user) {
            toast.info('Please sign in to enroll');
            router.push('/login');
            return;
        }

        try {
            setEnrolling(true);
            const success = await enrollInCourse(courseId);
            if (success) {
                toast.success('Enrollment successful!');
                fetchData();
            } else {
                toast.error('Enrollment failed.');
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Enrollment failed.');
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
            toast.error('Enroll in the course to unlock this lesson.');
            return;
        }

        router.push(`/courses/${courseId}/lessons/${lessonId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-transparent pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <Navbar />
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start animate-pulse">
                    <div className="space-y-6">
                        <div className="h-8 bg-white/5 rounded w-32" />
                        <div className="h-16 bg-white/5 rounded w-3/4" />
                        <div className="h-32 bg-white/5 rounded" />
                        <div className="h-14 bg-white/5 rounded-full w-48" />
                    </div>
                    <div className="aspect-[4/3] bg-white/5 rounded-3xl" />
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center pt-24 text-center px-4">
                <Navbar />
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 max-w-md w-full">
                    <h2 className="text-2xl font-serif font-bold text-white mb-2">Course Unavailable</h2>
                    <p className="text-white/50 mb-6 underline">The wisdom you seek cannot be found.</p>
                    <Link href="/courses" className="text-[#D0A933] font-bold uppercase tracking-widest hover:text-white transition-colors">
                        Return to Library
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent text-white selection:bg-[#D0A933]/30">
            <Navbar />

            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D0A933]/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#077D93]/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Link href="/courses" className="inline-flex items-center gap-2 text-white/50 hover:text-[#D0A933] transition-colors mb-8 group uppercase tracking-widest text-xs font-bold">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Courses
                </Link>

                <div className="flex flex-col gap-16 lg:gap-24">
                    {/* Top Section: Course Info & Thumbnail */}
                    <div className="flex flex-col lg:flex-row gap-12 items-start justify-between animate-fade-in-up">
                        {/* Course Details */}
                        <div className="flex-1 lg:max-w-2xl">
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                                {course.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm font-bold uppercase tracking-wider text-white/60">
                                {course.duration && (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-[#D0A933]" />
                                        <span>{course.duration} Hours</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#D0A933]" />
                                    <span>{new Date(course.createdAt || '').toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                                </div>
                            </div>

                            <div className="prose prose-invert prose-lg max-w-none text-[#E6E6E6]/80 leading-relaxed mb-10">
                                <p>{course.description}</p>
                            </div>

                            {!course.isEnrolled && (
                                <button
                                    onClick={handleEnrollment}
                                    disabled={enrolling}
                                    className="group relative w-full sm:w-auto overflow-hidden rounded-xl bg-[#D0A933] px-8 py-4 text-center disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[#D0A933]/10"
                                >
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                    <span className="relative text-[#0B0B0B] font-bold uppercase tracking-widest text-lg flex items-center justify-center gap-3">
                                        {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                        {!enrolling && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                    </span>
                                </button>
                            )}

                            {course.isEnrolled && (
                                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 font-bold uppercase tracking-widest text-sm w-fit">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Enrolled
                                </div>
                            )}
                        </div>

                        {/* Thumbnail */}
                        <div className="w-full lg:w-[450px] shrink-0">
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                                {course.thumbnail ? (
                                    <div className="absolute inset-0">
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-[#077D93]/30 to-[#0B0B0B] flex items-center justify-center">
                                        <span className="font-serif font-bold text-4xl text-white/20 italic">Satyakul</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Syllabus */}
                    <div className="max-w-4xl mx-auto w-full animate-fade-in-up [animation-delay:200ms]">
                        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-[#D0A933] rounded-full" />
                                    Course Syllabus
                                </h3>
                                {/* Floating "Course Content" Header */}
                                <div className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-xs font-bold text-[#D0A933] uppercase tracking-widest">
                                    {totalLessons} {totalLessons === 1 ? 'Lesson' : 'Lessons'}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {lessons.length > 0 ? lessons.map((lesson, index) => (
                                    <div
                                        key={lesson.id}
                                        onClick={() => handleLessonLink(lesson.id)}
                                        className={`group flex items-center gap-6 p-5 rounded-2xl border border-transparent transition-all duration-300 ${course.isEnrolled
                                            ? 'hover:bg-white/5 hover:border-white/10 cursor-pointer'
                                            : 'opacity-70 cursor-not-allowed'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border shrink-0 transition-colors ${course.isEnrolled
                                            ? 'bg-[#D0A933]/10 text-[#D0A933] border-[#D0A933]/20 group-hover:bg-[#D0A933] group-hover:text-black'
                                            : 'bg-white/5 text-white/30 border-white/5'
                                            }`}>
                                            {index + 1}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h4 className={`font-serif font-bold text-lg sm:text-xl truncate transition-colors mb-1 ${course.isEnrolled ? 'text-white group-hover:text-[#D0A933]' : 'text-white/50'
                                                }`}>
                                                {lesson.title}
                                            </h4>
                                            <p className="text-sm text-white/40 truncate flex items-center gap-3 font-sans">
                                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {lesson.duration}</span>
                                                {lesson.description && <span className="hidden sm:inline opacity-50">| {lesson.description}</span>}
                                            </p>
                                        </div>

                                        <div className="text-white/30">
                                            {course.isEnrolled ? (
                                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#D0A933] group-hover:text-black hover:border-transparent transition-all">
                                                    <PlayCircle className="w-5 h-5" />
                                                </div>
                                            ) : (
                                                <Lock className="w-5 h-5" />
                                            )}
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-12 text-white/40 text-sm italic border border-dashed border-white/10 rounded-2xl">
                                        Wisdom content is being prepared.
                                    </div>
                                )}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1 || lessonsLoading}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </button>

                                    <div className="text-xs font-bold text-[#D0A933] uppercase tracking-widest bg-black/40 px-4 py-2 rounded-lg border border-white/5">
                                        Page {currentPage} of {totalPages}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages || lessonsLoading}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
