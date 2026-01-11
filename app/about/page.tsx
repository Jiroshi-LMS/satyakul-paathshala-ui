'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { getInstructorProfile } from '@/lib/api/instructor';
import type { InstructorProfileData } from '@/types/instructor';
import Link from 'next/link';
import { toast } from 'sonner';

export default function AboutPage() {
    const [profile, setProfile] = useState<InstructorProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await getInstructorProfile();
                setProfile(data);
            } catch (err) {
                toast.error('Failed to load instructor profile. Please try again later.');
                setError('Failed to load instructor profile. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-4 flex items-center justify-center">
                <Navbar />
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-4">
                <Navbar />
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-4">{error || 'Instructor profile not found.'}</h2>
                    <Link href="/" className="text-primary hover:underline font-medium">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    const { instructor, profile: details } = profile;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-20">
                {/* Hero Section */}
                <section className="relative h-[400px] w-full mb-20">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 via-indigo-900 to-black overflow-hidden">
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                            <div className="absolute top-0 right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                            <div className="absolute bottom-10 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
                        </div>
                    </div>

                    <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
                        <div className="mb-6 relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <img
                                src={details.profile_picture || '/placeholder-pfp.jpg'}
                                alt={instructor.display_name}
                                className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white/10 shadow-2xl"
                            />
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-2 tracking-tight">
                            {instructor.display_name}
                        </h1>
                        <p className="text-xl text-indigo-200 font-medium">Instructor</p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Bio & Content */}
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                                    About Me
                                    <span className="block h-1 w-12 bg-primary rounded-full"></span>
                                </h2>
                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <p className="text-lg text-[var(--muted-foreground)] leading-relaxed whitespace-pre-wrap">
                                        {details.bio}
                                    </p>
                                </div>
                            </section>

                            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-8 bg-[var(--card)] rounded-3xl border border-[var(--border)] shadow-sm hover:shadow-xl smooth-transition">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">Location</h3>
                                    <p className="text-[var(--muted-foreground)]">{details.location}</p>
                                </div>

                                <div className="p-8 bg-[var(--card)] rounded-3xl border border-[var(--border)] shadow-sm hover:shadow-xl smooth-transition">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-4">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-xl mb-2">Email</h3>
                                    <p className="text-[var(--muted-foreground)]">{instructor.email}</p>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar Info */}
                        <div className="space-y-8">
                            <div className="p-8 bg-[var(--card)] rounded-3xl border border-[var(--border)] sticky top-24 shadow-sm">
                                <h3 className="text-xl font-bold mb-6">Contact Info</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 py-3 border-b border-[var(--border)] last:border-0">
                                        <div className="w-10 h-10 bg-muted/50 rounded-xl flex items-center justify-center text-muted-foreground">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Phone</p>
                                            <p className="text-sm font-medium truncate">{instructor.country_code} {instructor.phone_number}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 py-3 border-b border-[var(--border)] last:border-0">
                                        <div className="w-10 h-10 bg-muted/50 rounded-xl flex items-center justify-center text-muted-foreground">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Username</p>
                                            <p className="text-sm font-medium truncate">@{instructor.username}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <a
                                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${instructor.email}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block w-full text-center gradient-bg text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transform hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        Get in Touch
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
