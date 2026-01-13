'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { getInstructorProfile } from '@/lib/api/instructor';
import type { InstructorProfileData } from '@/types/instructor';
import Link from 'next/link';
import { toast } from 'sonner';
import { BookOpen, Target, Heart, Sparkles, MapPin, Mail, Phone, User, ArrowRight, GraduationCap, Award, Clock } from 'lucide-react';

// Institution values data
const coreValues = [
    {
        icon: BookOpen,
        title: 'Traditional Wisdom',
        description: 'We blend ancient Indian educational philosophies with modern teaching methodologies to create a unique learning experience.',
    },
    {
        icon: Target,
        title: 'Excellence',
        description: 'We strive for academic excellence while nurturing the holistic development of every student who joins our community.',
    },
    {
        icon: Heart,
        title: 'Integrity',
        description: 'Truth and honesty form the foundation of our institution. We believe in building character alongside knowledge.',
    },
    {
        icon: Sparkles,
        title: 'Innovation',
        description: 'We embrace modern technology and innovative teaching methods to make learning engaging and effective.',
    },
];

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
                toast.error('Failed to load instructor profile.');
                setError('Failed to load instructor profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen bg-transparent text-white">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D0A933]/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#077D93]/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
                    </div>

                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#077D93]/15 border border-[#077D93]/30 text-sm font-semibold mb-8">
                            <span className="w-2 h-2 bg-[#D0A933] rounded-full mr-2 animate-pulse"></span>
                            <span className="text-[#D0A933] uppercase tracking-widest text-xs">About Us</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-6 leading-[1.1]">
                            Nurturing Minds, <br />
                            <span className="text-[#D0A933]">Shaping Futures</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-[#E6E6E6]/80 max-w-3xl mx-auto leading-relaxed">
                            Satyakul Paathshala is a premier educational institution dedicated to providing quality education 
                            rooted in Indian values while embracing modern teaching methodologies. We believe in nurturing 
                            not just academic excellence, but also character, discipline, and a lifelong love for learning.
                        </p>
                    </div>
                </section>

                {/* Instructor Profile & Contact Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#077D93]/20 border border-[#077D93]/30 text-[#CFE6EA] text-xs font-bold uppercase tracking-widest mb-6">
                                <GraduationCap className="w-4 h-4" />
                                Contact & Information
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4">
                                Get in <span className="text-[#D0A933]">Touch</span>
                            </h2>
                            <p className="text-[#E6E6E6]/80 text-lg max-w-2xl mx-auto">
                                Connect with us or learn more about our team and institution.
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-12 h-12 border-2 border-[#D0A933] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : error || !profile ? (
                            <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
                                <p className="text-white/60 mb-4">Unable to load profile information</p>
                                <Link href="/" className="text-[#D0A933] hover:underline font-medium">
                                    Return to Home
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-10">
                                {/* Top Section: Profile Image & Bio Side by Side */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                                    {/* Profile Image */}
                                    <div className="lg:col-span-1">
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-gradient-to-br from-[#D0A933] to-[#077D93] rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                                            <div className="relative min-h-[400px] rounded-3xl overflow-hidden border-2 border-white/10 bg-white/5 flex items-center justify-center p-4">
                                                <img
                                                    src={profile.profile.profile_picture || '/placeholder-pfp.jpg'}
                                                    alt={profile.instructor.display_name}
                                                    className="w-full h-full max-h-[500px] object-contain rounded-2xl"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Name & Bio */}
                                    <div className="lg:col-span-2 space-y-6">
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D0A933]/10 border border-[#D0A933]/20 text-[#D0A933] text-xs font-bold uppercase tracking-widest mb-4">
                                                <Award className="w-3.5 h-3.5" />
                                                About
                                            </div>
                                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-2">
                                                {profile.instructor.display_name}
                                            </h3>
                                            <p className="text-[#CFE6EA] text-base sm:text-lg">@{profile.instructor.username}</p>
                                        </div>

                                        <div className="prose prose-lg prose-invert max-w-none">
                                            <p className="text-[#E6E6E6]/80 leading-relaxed whitespace-pre-wrap text-base sm:text-lg">
                                                {profile.profile.bio}
                                            </p>
                                        </div>

                                        {/* Highlights */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="group p-5 bg-white/5 rounded-xl border border-white/10 hover:border-[#D0A933]/30 hover:bg-white/10 transition-all duration-300">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 rounded-lg bg-[#D0A933]/10 border border-[#D0A933]/20 flex items-center justify-center group-hover:bg-[#D0A933] transition-colors">
                                                        <Clock className="w-5 h-5 text-[#D0A933] group-hover:text-[#0B0B0B] transition-colors" />
                                                    </div>
                                                    <span className="text-sm font-bold text-white uppercase tracking-wider">Experience</span>
                                                </div>
                                                <p className="text-[#E6E6E6]/70 text-sm leading-relaxed">Years of dedicated teaching and mentoring students across various disciplines.</p>
                                            </div>
                                            <div className="group p-5 bg-white/5 rounded-xl border border-white/10 hover:border-[#D0A933]/30 hover:bg-white/10 transition-all duration-300">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 rounded-lg bg-[#D0A933]/10 border border-[#D0A933]/20 flex items-center justify-center group-hover:bg-[#D0A933] transition-colors">
                                                        <GraduationCap className="w-5 h-5 text-[#D0A933] group-hover:text-[#0B0B0B] transition-colors" />
                                                    </div>
                                                    <span className="text-sm font-bold text-white uppercase tracking-wider">Expertise</span>
                                                </div>
                                                <p className="text-[#E6E6E6]/70 text-sm leading-relaxed">Specialized in creating comprehensive curricula that blend traditional and modern approaches.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Section: Contact Information in Horizontal Grid */}
                                <div className="pt-6 border-t border-white/10">
                                    <h4 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                                        <span className="w-1.5 h-6 bg-[#D0A933] rounded-full"></span>
                                        Contact Information
                                    </h4>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {/* Email Card */}
                                        <a
                                            href={`mailto:${profile.instructor.email}`}
                                            className="group p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-[#D0A933]/30 hover:bg-white/10 transition-all duration-300"
                                        >
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D0A933]/20 to-[#D0A933]/10 border border-[#D0A933]/20 flex items-center justify-center mb-4 group-hover:from-[#D0A933] group-hover:to-[#b8952d] group-hover:border-[#D0A933] transition-all">
                                                <Mail className="w-6 h-6 text-[#D0A933] group-hover:text-[#0B0B0B] transition-colors" />
                                            </div>
                                            <p className="text-xs text-white/50 uppercase tracking-wider mb-2">Email</p>
                                            <p className="text-sm font-medium text-white group-hover:text-[#D0A933] transition-colors break-all">{profile.instructor.email}</p>
                                        </a>

                                        {/* Phone Card */}
                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#077D93]/20 to-[#077D93]/10 border border-[#077D93]/20 flex items-center justify-center mb-4">
                                                <Phone className="w-6 h-6 text-[#CFE6EA]" />
                                            </div>
                                            <p className="text-xs text-white/50 uppercase tracking-wider mb-2">Phone</p>
                                            <p className="text-sm font-medium text-white">{profile.instructor.country_code} {profile.instructor.phone_number}</p>
                                        </div>

                                        {/* Location Card */}
                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D0A933]/20 to-[#D0A933]/10 border border-[#D0A933]/20 flex items-center justify-center mb-4">
                                                <MapPin className="w-6 h-6 text-[#D0A933]" />
                                            </div>
                                            <p className="text-xs text-white/50 uppercase tracking-wider mb-2">Location</p>
                                            <p className="text-sm font-medium text-white">{profile.profile.location}</p>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <div className="mt-8 flex justify-center">
                                        <a
                                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.instructor.email)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D0A933] to-[#b8952d] text-[#0B0B0B] font-bold px-10 py-4 rounded-xl hover:shadow-lg hover:shadow-[#D0A933]/20 transition-all duration-300 text-sm uppercase tracking-widest group"
                                        >
                                            Get in Touch
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Mission & Vision Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                            {/* Mission */}
                            <div className="relative p-8 sm:p-10 bg-white/5 rounded-3xl border border-white/10 overflow-hidden group hover:border-[#D0A933]/30 transition-all duration-500">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D0A933]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-[#D0A933]/10 border border-[#D0A933]/20 flex items-center justify-center mb-6">
                                        <Target className="w-7 h-7 text-[#D0A933]" />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">Our Mission</h3>
                                    <p className="text-[#E6E6E6]/80 leading-relaxed">
                                        To provide accessible, high-quality education that empowers students with knowledge, 
                                        skills, and values necessary to excel in their academic pursuits and life beyond. 
                                        We are committed to creating an inclusive learning environment where every student 
                                        can discover their potential and achieve their dreams.
                                    </p>
                                </div>
                            </div>

                            {/* Vision */}
                            <div className="relative p-8 sm:p-10 bg-white/5 rounded-3xl border border-white/10 overflow-hidden group hover:border-[#077D93]/30 transition-all duration-500">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#077D93]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-[#077D93]/20 border border-[#077D93]/30 flex items-center justify-center mb-6">
                                        <Sparkles className="w-7 h-7 text-[#CFE6EA]" />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">Our Vision</h3>
                                    <p className="text-[#E6E6E6]/80 leading-relaxed">
                                        To be a leading institution that transforms education by combining the wisdom of 
                                        traditional Indian values with contemporary teaching practices. We envision creating 
                                        future leaders who are not only academically proficient but also morally upright, 
                                        socially responsible, and globally competitive.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#077D93]/5">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D0A933]/10 border border-[#D0A933]/20 text-[#D0A933] text-xs font-bold uppercase tracking-widest mb-6">
                                <Heart className="w-4 h-4" />
                                Our Values
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4">
                                What We <span className="text-[#D0A933]">Stand For</span>
                            </h2>
                            <p className="text-[#E6E6E6]/80 text-lg max-w-2xl mx-auto">
                                Our core values guide everything we do, from how we teach to how we interact with our community.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {coreValues.map((value, index) => (
                                <div
                                    key={index}
                                    className="group p-6 sm:p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-[#D0A933]/30 hover:bg-white/10 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#D0A933]/10 border border-[#D0A933]/20 flex items-center justify-center mb-5 group-hover:bg-[#D0A933] group-hover:border-[#D0A933] transition-all duration-300">
                                        <value.icon className="w-6 h-6 text-[#D0A933] group-hover:text-[#0B0B0B] transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-[#D0A933] transition-colors">
                                        {value.title}
                                    </h3>
                                    <p className="text-[#E6E6E6]/70 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-[#077D93]/10 border-t border-white/5">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                            Ready to Begin Your <br />
                            <span className="text-[#D0A933]">Learning Journey?</span>
                        </h2>
                        <p className="text-lg text-[#E6E6E6]/80 mb-10 max-w-2xl mx-auto">
                            Join thousands of students who have transformed their academic careers with Satyakul Paathshala.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/courses"
                                className="inline-flex items-center justify-center gap-2 bg-[#D0A933] text-[#0B0B0B] font-bold px-8 py-4 rounded-xl hover:bg-[#b8952d] transition-colors shadow-xl shadow-[#D0A933]/20 uppercase tracking-widest text-sm group"
                            >
                                Explore Courses
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/our-story"
                                className="inline-flex items-center justify-center border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors uppercase tracking-widest text-sm"
                            >
                                Our Story
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-white/5">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-white/50 text-sm">
                        © {new Date().getFullYear()} Satyakul Paathshala. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
