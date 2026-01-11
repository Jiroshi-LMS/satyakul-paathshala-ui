'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { getCourseLessons, getLessonById, getLessonResources, formatFileSize } from '@/lib/api/courses';
import type { Lesson, LessonDetail, LessonResourcesData } from '@/types/course';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const courseId = params?.id as string;
    const lessonId = params?.lessonId as string;

    const [lesson, setLesson] = useState<LessonDetail | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [resources, setResources] = useState<LessonResourcesData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            toast.error('Please login to view this lesson');
            router.push('/login');
            return;
        }

        if (!courseId || !lessonId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch current lesson, course syllabus, and resources in parallel
                const [lessonData, lessonsList, resourcesData] = await Promise.all([
                    getLessonById(courseId, lessonId),
                    getCourseLessons(courseId),
                    getLessonResources(courseId, lessonId)
                ]);

                setLesson(lessonData);
                setLessons(lessonsList);
                setResources(resourcesData);
            } catch (err: any) {
                toast.error('Failed to load lesson. Please try again.');
                setError(err.message || 'Failed to load lesson. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId, lessonId, user, authLoading, router]);

    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-background pt-16">
                <Navbar />
                <div className="flex animate-pulse px-4 sm:px-6 lg:px-8 py-8 gap-8">
                    <div className="hidden lg:block w-80 h-[calc(100-8rem)] bg-[var(--muted)]/50 rounded-2xl" />
                    <div className="flex-1 space-y-8">
                        <div className="aspect-video bg-[var(--muted)] rounded-3xl" />
                        <div className="h-8 bg-[var(--muted)] rounded w-1/3" />
                        <div className="h-4 bg-[var(--muted)] rounded w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background pt-16">
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-4 text-center">
                    <div className="bg-red-500/10 p-6 rounded-full mb-6">
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{error}</h2>
                    <Link href={`/courses/${courseId}`} className="text-primary hover:underline font-medium">
                        Return to Course
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-16 flex flex-col lg:flex-row h-screen overflow-hidden">
                {/* Fixed Sidebar - Left */}
                <aside className="w-full lg:w-80 bg-[var(--card)] border-r border-[var(--border)] overflow-y-auto hidden lg:flex flex-col shrink-0">
                    <div className="p-6 border-b border-[var(--border)] bg-background/50 backdrop-blur-sm sticky top-0 z-10">
                        <Link href={`/courses/${courseId}`} className="text-sm font-medium text-[var(--muted-foreground)] hover:text-foreground inline-flex items-center gap-2 mb-2 smooth-transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Course
                        </Link>
                        <h2 className="font-bold text-lg">Course Syllabus</h2>
                        <p className="text-xs text-[var(--muted-foreground)]">{lessons.length} Lessons</p>
                    </div>

                    <div className="flex-1">
                        {lessons.map((item, index) => (
                            <Link
                                key={item.id}
                                href={`/courses/${courseId}/lessons/${item.id}`}
                                className={`flex items-start gap-3 p-4 border-b border-[var(--border)] hover:bg-[var(--primary)]/5 smooth-transition group ${item.id === lessonId ? 'bg-[var(--primary)]/10 border-l-4 border-l-[var(--primary)]' : ''}`}
                            >
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-sm font-bold ${item.id === lessonId ? 'bg-[var(--primary)] text-white' : 'bg-[var(--muted)] text-[var(--muted-foreground)] group-hover:bg-[var(--primary)]/20'}`}>
                                    {index + 1}
                                </div>
                                <div className="min-w-0">
                                    <h3 className={`text-sm font-medium leading-tight truncate ${item.id === lessonId ? 'text-[var(--primary)]' : 'text-foreground'}`}>
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-[var(--muted-foreground)] mt-1">{item.duration}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </aside>

                {/* Main Content - Right */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto">
                        {/* Video Player */}
                        <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl mb-8 border border-[var(--border)]">
                            {lesson?.videoUrl ? (
                                <video
                                    src={lesson.videoUrl}
                                    controls
                                    controlsList="nodownload"
                                    className="w-full h-full"
                                    autoPlay={false}
                                    poster="/placeholder-video.jpg"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-[var(--muted-foreground)] p-12 text-center">
                                    <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-xl font-medium">Video content not available for this lesson.</p>
                                </div>
                            )}
                        </div>

                        {/* Mobile Back Button */}
                        <div className="lg:hidden mb-6">
                            <Link href={`/courses/${courseId}`} className="text-sm font-medium text-[var(--muted-foreground)] hover:text-foreground inline-flex items-center gap-2 smooth-transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Course Details
                            </Link>
                        </div>

                        {/* Lesson Details */}
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                                    {lesson?.title}
                                </h1>
                                <div className="flex items-center gap-2 text-[var(--muted-foreground)] bg-[var(--muted)]/30 px-4 py-2 rounded-full border border-[var(--border)] w-fit whitespace-nowrap">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm font-medium">{lesson?.duration}</span>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
                                    {lesson?.description || 'No description available for this lesson.'}
                                </p>
                            </div>

                            {/* Lesson Resources, Notes, and Related Links */}
                            <div className="mt-12 space-y-12 border-t border-[var(--border)] pt-12">
                                {/* Notes Section */}
                                {resources?.notes && (
                                    <section>
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Lesson Notes
                                        </h3>
                                        <div className="bg-[var(--muted)]/20 p-6 rounded-2xl border border-[var(--border)]">
                                            <p className="text-[var(--muted-foreground)] leading-relaxed whitespace-pre-wrap">
                                                {resources.notes}
                                            </p>
                                        </div>
                                    </section>
                                )}

                                {/* Resources Grid */}
                                {resources?.resources && resources.resources.length > 0 && (
                                    <section>
                                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Downloadable Resources
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {resources.resources.map((resource) => (
                                                <a
                                                    key={resource.uuid}
                                                    href={resource.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-4 p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)] hover:shadow-lg smooth-transition group"
                                                >
                                                    <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] group-hover:text-white smooth-transition">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="font-medium text-foreground truncate group-hover:text-[var(--primary)] transition-colors">
                                                            {resource.title}
                                                        </h4>
                                                        <div className="flex items-center gap-2 mt-1 text-xs text-[var(--muted-foreground)]">
                                                            <span>{formatFileSize(resource.fileSize)}</span>
                                                            <span className="opacity-30">•</span>
                                                            <span className="uppercase">{resource.fileType.split('/').pop()}</span>
                                                        </div>
                                                    </div>
                                                    <svg className="w-5 h-5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] smooth-transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                    </svg>
                                                </a>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Related Links Section */}
                                {resources?.relatedLinks && resources.relatedLinks.length > 0 && (
                                    <section>
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                            Related External Links
                                        </h3>
                                        <div className="space-y-3">
                                            {resources.relatedLinks.map((link, idx) => (
                                                <a
                                                    key={idx}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-4 bg-background border border-[var(--border)] rounded-xl hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 smooth-transition group"
                                                >
                                                    <span className="font-medium text-[var(--muted-foreground)] group-hover:text-foreground">
                                                        {link.title}
                                                    </span>
                                                    <svg className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>

                            <div className="pt-8 mt-12 border-t border-[var(--border)] lg:hidden">
                                <h2 className="text-xl font-bold mb-6">Other Lessons</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {lessons.filter(l => l.id !== lessonId).slice(0, 4).map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/courses/${courseId}/lessons/${item.id}`}
                                            className="flex items-center gap-4 p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)] smooth-transition"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-[var(--muted)] flex items-center justify-center font-bold text-[var(--muted-foreground)] shrink-0">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                </svg>
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-medium text-foreground truncate">{item.title}</h4>
                                                <p className="text-xs text-[var(--muted-foreground)]">{item.duration}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Link href={`/courses/${courseId}`} className="block w-full text-center py-4 bg-[var(--muted)] rounded-2xl font-bold text-foreground">
                                        View Full Syllabus
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
