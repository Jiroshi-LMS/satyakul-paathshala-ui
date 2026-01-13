'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { GraduationCap, Award, BookOpen, Users, Quote, Star, ArrowRight } from 'lucide-react';

// ============================================================================
// FACULTY DATA - Add, remove, or modify faculty members here
// ============================================================================
const facultyMembers = [
    {
        id: 1,
        name: 'Dr. Ramesh Sharma',
        title: 'Principal & Sanskrit Scholar',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        specialization: 'Vedic Literature & Philosophy',
        experience: '25+ Years',
        description: 'A renowned scholar with expertise in ancient Vedic texts and their modern applications.',
    },
    {
        id: 2,
        name: 'Prof. Anita Desai',
        title: 'Head of Academics',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
        specialization: 'Mathematics & Logic',
        experience: '18 Years',
        description: 'Passionate about making complex mathematical concepts accessible through traditional teaching methods.',
    },
    {
        id: 3,
        name: 'Shri Vikram Joshi',
        title: 'Senior Mentor',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        specialization: 'Dharmic Studies & Ethics',
        experience: '20 Years',
        description: 'Guides students in understanding life principles through ancient wisdom and modern context.',
    },
    {
        id: 4,
        name: 'Dr. Meera Kulkarni',
        title: 'Science Faculty',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
        specialization: 'Ayurveda & Natural Sciences',
        experience: '15 Years',
        description: 'Integrates traditional Ayurvedic knowledge with contemporary scientific understanding.',
    },
];

// ============================================================================
// STUDENT SUCCESS STORIES - Add, remove, or modify stories here
// ============================================================================
const successStories = [
    {
        id: 1,
        name: 'Arjun Mehta',
        batch: 'Class of 2023',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
        achievement: 'IIT Delhi - Computer Science',
        story: 'The discipline and focus I learned at Satyakul Paathshala helped me crack one of the toughest exams in India. The mentors here don\'t just teach subjects—they build character.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Priya Venkatesh',
        batch: 'Class of 2022',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
        achievement: 'AIIMS New Delhi - Medicine',
        story: 'Satyakul\'s holistic approach to education gave me the mental clarity and resilience needed for medical studies. Forever grateful to my mentors.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Rohan Singh',
        batch: 'Class of 2021',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        achievement: 'Civil Services - IAS Officer',
        story: 'The values of integrity and service instilled here shaped my goal to serve the nation. Satyakul taught me that true success is measured by the impact we create.',
        rating: 5,
    },
    {
        id: 4,
        name: 'Kavya Nair',
        batch: 'Class of 2023',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        achievement: 'National Science Olympiad Gold',
        story: 'My teachers encouraged curiosity and deep understanding over rote learning. This approach helped me excel at the national level and develop a genuine love for science.',
        rating: 5,
    },
    {
        id: 5,
        name: 'Aditya Rao',
        batch: 'Class of 2020',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
        achievement: 'Stanford University - MBA',
        story: 'The foundation of ethics and leadership I gained here set me apart in global business schools. Satyakul prepared me not just for exams, but for life.',
        rating: 5,
    },
    {
        id: 6,
        name: 'Neha Gupta',
        batch: 'Class of 2022',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
        achievement: 'National Law University - Top Rank',
        story: 'The critical thinking and debate skills honed at Satyakul gave me a significant edge in law. I learned to argue with logic and compassion.',
        rating: 5,
    },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function OurStoryPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(7,125,147,0.15),transparent_50%)]"></div>
                    <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#D0A933]/5 rounded-full blur-[100px] -z-10"></div>

                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#077D93]/10 text-white text-sm font-semibold mb-8 border border-[#077D93]/20">
                            <span className="w-2 h-2 bg-[#D0A933] rounded-full mr-2"></span>
                            Our Journey
                        </div>

                        <h1 className="text-5xl sm:text-7xl font-serif font-bold tracking-tight mb-6 leading-[1.05] text-white">
                            The Story of <br />
                            <span className="text-[#D0A933]">Satyakul Paathshala</span>
                        </h1>

                        <p className="text-xl text-[#E6E6E6] mb-12 max-w-3xl mx-auto leading-relaxed">
                            A legacy of wisdom, discipline, and excellence. Meet the mentors who guide our students and discover the inspiring journeys of our alumni.
                        </p>

                        <div className="flex flex-wrap justify-center gap-8 text-center">
                            <div className="px-8">
                                <h3 className="text-4xl font-serif font-bold text-[#D0A933] mb-2">50+</h3>
                                <p className="text-[#CFE6EA] text-sm uppercase tracking-widest">Expert Mentors</p>
                            </div>
                            <div className="px-8 border-l border-white/10">
                                <h3 className="text-4xl font-serif font-bold text-[#D0A933] mb-2">1000+</h3>
                                <p className="text-[#CFE6EA] text-sm uppercase tracking-widest">Alumni Network</p>
                            </div>
                            <div className="px-8 border-l border-white/10">
                                <h3 className="text-4xl font-serif font-bold text-[#D0A933] mb-2">25+</h3>
                                <p className="text-[#CFE6EA] text-sm uppercase tracking-widest">Years of Legacy</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Faculty Section */}
                <section className="py-24 relative overflow-hidden border-t border-white/5">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#077D93]/10 rounded-full blur-[100px] -z-10"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D0A933]/10 border border-[#D0A933]/20 text-[#D0A933] text-xs font-bold uppercase tracking-widest mb-6">
                                <Users className="w-4 h-4" suppressHydrationWarning />
                                Our Mentors
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
                                Meet the <span className="text-[#D0A933]">Faculty</span>
                            </h2>
                            <p className="text-[#E6E6E6] text-lg max-w-2xl mx-auto">
                                Dedicated educators who combine traditional wisdom with modern pedagogy to shape the leaders of tomorrow.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {facultyMembers.map((faculty) => (
                                <div
                                    key={faculty.id}
                                    className="group bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-[#D0A933]/30 smooth-transition"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={faculty.image}
                                            alt={faculty.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#D0A933]/20 text-[#D0A933] rounded-full border border-[#D0A933]/30">
                                                {faculty.experience}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-serif font-bold text-white mb-1 group-hover:text-[#D0A933] transition-colors">
                                            {faculty.name}
                                        </h3>
                                        <p className="text-[#D0A933] text-sm font-medium mb-3">{faculty.title}</p>
                                        <div className="flex items-center gap-2 text-[#CFE6EA] text-xs mb-3">
                                            <BookOpen className="w-3 h-3" suppressHydrationWarning />
                                            {faculty.specialization}
                                        </div>
                                        <p className="text-[#E6E6E6]/70 text-sm leading-relaxed line-clamp-3">
                                            {faculty.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Success Stories Section */}
                <section className="py-24 relative overflow-hidden bg-[#077D93]/5">
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D0A933]/5 rounded-full blur-[100px] -z-10"></div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#077D93]/20 border border-[#077D93]/30 text-[#CFE6EA] text-xs font-bold uppercase tracking-widest mb-6">
                                <Award className="w-4 h-4" suppressHydrationWarning />
                                Success Stories
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
                                Student <span className="text-[#D0A933]">Achievements</span>
                            </h2>
                            <p className="text-[#E6E6E6] text-lg max-w-2xl mx-auto">
                                Stories of determination, discipline, and success from our alumni who carry the Satyakul legacy forward.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {successStories.map((story) => (
                                <div
                                    key={story.id}
                                    className="group bg-white/5 rounded-2xl p-8 border border-white/5 hover:border-[#D0A933]/30 smooth-transition relative overflow-hidden"
                                >
                                    {/* Quote Icon */}
                                    <Quote className="absolute top-6 right-6 w-12 h-12 text-[#D0A933]/10 group-hover:text-[#D0A933]/20 transition-colors" suppressHydrationWarning />

                                    {/* Student Info */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <img
                                            src={story.image}
                                            alt={story.name}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-[#D0A933]/30"
                                        />
                                        <div>
                                            <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#D0A933] transition-colors">
                                                {story.name}
                                            </h3>
                                            <p className="text-[#CFE6EA] text-sm">{story.batch}</p>
                                        </div>
                                    </div>

                                    {/* Achievement Badge */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#D0A933]/10 border border-[#D0A933]/20 mb-4">
                                        <GraduationCap className="w-4 h-4 text-[#D0A933]" suppressHydrationWarning />
                                        <span className="text-[#D0A933] text-sm font-semibold">{story.achievement}</span>
                                    </div>

                                    {/* Story */}
                                    <p className="text-[#E6E6E6]/80 leading-relaxed mb-6 italic">
                                        "{story.story}"
                                    </p>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1">
                                        {[...Array(story.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-[#D0A933] text-[#D0A933]" suppressHydrationWarning />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-24 px-4 relative overflow-hidden border-t border-white/5">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#D0A933]/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#077D93]/5 rounded-full blur-[100px]"></div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-4xl sm:text-6xl font-serif font-bold mb-8 leading-tight text-white">
                            Write Your Own <br />
                            <span className="text-[#D0A933]">Success Story</span>
                        </h2>
                        <p className="text-xl text-[#E6E6E6] mb-12 max-w-2xl mx-auto">
                            Join the legacy of excellence. Begin your journey with Satyakul Paathshala today.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link
                                href="/courses"
                                className="inline-flex items-center justify-center gap-2 bg-[#D0A933] text-[#0B0B0B] font-bold px-10 py-4 rounded-xl hover:bg-[#b8952d] smooth-transition shadow-xl uppercase tracking-widest text-sm group"
                            >
                                Explore Courses
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/"
                                className="border border-white/20 text-white font-bold px-10 py-4 rounded-xl hover:bg-white/5 smooth-transition uppercase tracking-widest text-sm"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] border-t border-white/5">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-muted-foreground text-sm">
                        © 2026 Satyakul Paathshala. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
