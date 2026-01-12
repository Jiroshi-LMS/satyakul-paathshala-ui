'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getCourses } from '@/lib/api/courses';
import type { Course } from '@/types/course';

export default function Home() {
  const [latestCourse, setLatestCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestCourse = async () => {
      try {
        setLoading(true);
        const response = await getCourses();
        if (response.courses.length > 0) {
          setLatestCourse(response.courses[0]);
        }
      } catch (err) {
        console.error('Failed to fetch latest course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCourse();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* Modern Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
          {/* Abstract Background Elements */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(7,125,147,0.1),transparent_50%)]"></div>

          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left animate-fade-in-up">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#077D93]/10 text-[white] text-sm font-semibold mb-8 border border-[#077D93]/20">
                  <span className="w-2 h-2 bg-[#D0A933] rounded-full mr-2 animate-pulse"></span>
                  Admissions Open - 2026
                </div>

                <h1 className="text-5xl sm:text-7xl font-serif font-bold tracking-tight mb-6 leading-[1.05] text-white">
                  Shaping Minds <br />
                  with Discipline
                </h1>

                <h2 className="text-xl sm:text-3xl font-serif font-medium mb-10 italic">
                  <span className="text-[#D0A933]">Rooted</span> in Values, <br />
                  <span className="text-[#D0A933]">Driven</span> by Excellence
                </h2>

                <p className="text-lg text-[#E6E6E6] mb-12 max-w-xl leading-relaxed">
                  Guided learning under experienced mentors. Structured paths, rigorous practice, and timeless principles for modern success.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mb-4">
                  <Link
                    href="/courses"
                    className="bg-[#D0A933] text-[#0B0B0B] font-bold px-8 py-3.5 rounded-xl hover:bg-[#b8952d] smooth-transition shadow-2xl shadow-[#D0A933]/10 text-center text-sm uppercase tracking-widest"
                  >
                    Start Your Journey
                  </Link>
                  {/* <Link
                    href="/courses"
                    className="flex items-center justify-center gap-2 text-white font-bold px-8 py-3.5 hover:text-[#D0A933] smooth-transition text-sm group uppercase tracking-widest"
                  >
                    View Courses <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link> */}
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
                    alt="Satyakul Pathshala"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="text-sm font-bold uppercase tracking-widest text-[#D0A933] mb-2">Live Heritage</div>
                    <h3 className="text-3xl font-serif font-bold text-white">Ancient Wisdom Meet Modern Excellence</h3>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D0A933]/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#077D93]/10 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Icons Section */}
        <section className="py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Guru-Shishya Mentorship */}
              <div className="group">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 smooth-transition border border-white/10 shadow-inner">
                    <span className="text-[#CFE6EA]">☸</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white border-b border-[#D0A933]/30 pb-2">Guru–Shishya Mentorship</h3>
                </div>
                <p className="text-[#E6E6E6] text-lg leading-relaxed pl-4 border-l border-white/10">
                  Learn directly from seasoned mentors who guide your spiritual and intellectual growth.
                </p>
              </div>

              {/* Structured Curriculum */}
              <div className="group">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 smooth-transition border border-white/10 shadow-inner">
                    <span className="text-[#CFE6EA]">♒</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white border-b border-[#D0A933]/30 pb-2">Structured Curriculum</h3>
                </div>
                <p className="text-[#E6E6E6] text-lg leading-relaxed pl-4 border-l border-white/10">
                  Follow a clear, systematic path of learning designed for comprehensive mastery.
                </p>
              </div>

              {/* Proven Outcomes */}
              <div className="group">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 smooth-transition border border-white/10 shadow-inner">
                    <span className="text-[#CFE6EA]">🎯</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white border-b border-[#D0A933]/30 pb-2">Proven Outcomes</h3>
                </div>
                <p className="text-[#E6E6E6] text-lg leading-relaxed pl-4 border-l border-white/10">
                  Achieve tangible, career-enhancing results through disciplined practice and assessment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Course Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_100%,rgba(208,169,51,0.05),transparent_40%)]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#D0A933] mb-4">Current Teachings</h2>
                <h3 className="text-4xl sm:text-5xl font-serif font-bold text-white">Newest Course Launch</h3>
              </div>
              <Link href="/courses" className="text-[#D0A933] font-bold hover:underline flex items-center gap-2 group text-lg uppercase tracking-widest">
                Explore All Offerings <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {loading ? (
              <div className="w-full h-[400px] bg-card/30 rounded-3xl animate-pulse flex items-center justify-center border border-border">
                <span className="text-muted-foreground font-medium">Preparing curriculum...</span>
              </div>
            ) : latestCourse ? (
              <div className="bg-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row hover:border-[#D0A933]/30 smooth-transition">
                <div className="lg:w-1/2 relative h-[350px] lg:h-auto overflow-hidden">
                  {latestCourse.thumbnail ? (
                    <img src={latestCourse.thumbnail} alt={latestCourse.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#077D93] to-[#044d5a] flex items-center justify-center">
                      <span className="text-white font-serif font-bold text-4xl italic">Satyakul</span>
                    </div>
                  )}
                  <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold text-[#D0A933] shadow-lg uppercase tracking-tight border border-[#D0A933]/30">
                    Live Session
                  </div>
                </div>
                <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs font-bold uppercase text-[#D0A933] bg-[#D0A933]/10 px-4 py-1.5 rounded-full border border-[#D0A933]/20">
                      High Demand
                    </span>
                    <span className="text-sm text-[#CFE6EA] flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {latestCourse.duration}
                    </span>
                  </div>
                  <h4 className="text-4xl font-serif font-bold mb-6 text-white hover:text-[#D0A933] transition-colors cursor-pointer leading-tight">
                    {latestCourse.title}
                  </h4>
                  <p className="text-lg text-[#E6E6E6] mb-8 line-clamp-3 leading-relaxed">
                    {latestCourse.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-8 justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center font-serif font-bold text-[#D0A933] text-xl border border-white/10">
                        {latestCourse.title[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-[#CFE6EA]">Adhyapak</p>
                        <p className="font-bold text-white">Pathshala Faculty</p>
                      </div>
                    </div>
                    <Link
                      href={`/courses/${latestCourse.id}`}
                      className="bg-[#D0A933] text-[#0B0B0B] font-bold px-10 py-4 rounded-xl hover:bg-[#b8952d] smooth-transition shadow-xl text-center uppercase tracking-widest text-sm"
                    >
                      Enroll in Course
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-card/30 rounded-3xl border border-dashed border-border group hover:border-[#D0A933]/50 smooth-transition">
                <p className="text-muted-foreground text-lg italic">Wait with patience. New wisdom is being prepared.</p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-4 bg-[#077D93]/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D0A933]/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#077D93]/5 rounded-full blur-[100px]"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl sm:text-7xl font-serif font-bold mb-8 leading-tight text-white">
              Begin Your Path to <br />
              <span className="text-[#D0A933]">Self-Mastery</span>
            </h2>
            <p className="text-xl text-[#E6E6E6] mb-12 max-w-2xl mx-auto">
              Join a community dedicated to excellence, values, and the pursuit of knowledge.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/courses" className="bg-[#D0A933] text-[#0B0B0B] font-bold px-12 py-5 rounded-xl hover:bg-[#b8952d] smooth-transition text-xl shadow-2xl shadow-[#D0A933]/10 uppercase tracking-widest">
                Join the Pathshala
              </Link>
              <Link href="/about" className="border border-white/20 text-white font-bold px-12 py-5 rounded-xl hover:bg-white/5 smooth-transition text-xl uppercase tracking-widest">
                Talk to a Mentor
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/logo.png"
                  alt="Satyakul Pathshala Logo"
                  className="w-8 h-8 object-contain"
                />
                <h3 className="text-2xl font-serif font-bold text-white">
                  <span className="text-[#D0A933]">Satyakul</span> Pathshala
                </h3>
              </div>
              <p className="text-[#E6E6E6] leading-relaxed">
                Nurturing wisdom and discipline through traditional values and modern excellence.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#D0A933] mb-6 uppercase tracking-[0.2em] text-[10px]">Nirdeshika</h4>
              <ul className="space-y-4 font-medium text-[#CFE6EA]">
                <li><Link href="/courses" className="hover:text-white transition-colors">Course Catalog</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors">Success Stories</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#D0A933] mb-6 uppercase tracking-[0.2em] text-[10px]">Sanstha</h4>
              <ul className="space-y-4 font-medium text-[#CFE6EA]">
                <li><Link href="/about" className="hover:text-white transition-colors">Our Vision</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#D0A933] mb-6 uppercase tracking-[0.2em] text-[10px]">Anusaran</h4>
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#D0A933]/50 cursor-pointer transition-all">
                    <div className="w-5 h-5 bg-white/20" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
            <p>© 2026 Satyakul Pathshala. All rights reserved.</p>
            <div className="flex items-center gap-8">
              <a
                href="https://jiroshi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-card border border-border hover:border-[#D0A933]/50 hover:shadow-lg transition-all group"
              >
                <img src="/icon.png" alt="Jiroshi Icon" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
                <span className="text-sm font-semibold text-foreground">
                  Powered by <span className="text-[#D0A933]">Jiroshi</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
