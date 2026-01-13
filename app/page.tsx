'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { getCourses } from '@/lib/api/courses';
import type { Course } from '@/types/course';
import { GraduationCap, Layout, School, School2, Facebook, Youtube, Instagram } from 'lucide-react';

export default function Home() {
  const [latestCourse, setLatestCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestCourse = async () => {
      try {
        const response = await getCourses();
        if (response.courses.length > 0) {
          setLatestCourse(response.courses[0]);
        }
      } catch (err) {
        // Silent fail
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
        <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[80vh] sm:min-h-[90vh] flex items-center">
          {/* Abstract Background Elements */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(7,125,147,0.1),transparent_50%)]"></div>

          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="text-center md:text-left animate-fade-in-up">
                <Link
                  href={'https://www.youtube.com/@satyakulpaathshala'}
                  target="_blank"
                  className="inline-flex items-center px-4 py-2 rounded-full bg-[#077D93]/10 text-[white] text-sm font-semibold mb-8 border border-[#077D93]/20 hover:bg-[#077D93]/20 transition-colors"
                >
                  <span className="w-2 h-2 bg-[#D0A933] rounded-full mr-2 animate-pulse"></span>
                  Also Available on Youtube
                </Link>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1] text-white">
                  Shaping Minds <br />
                  with Discipline
                </h1>

                <h2 className="text-lg sm:text-xl lg:text-3xl font-serif font-medium mb-8 sm:mb-10 italic">
                  <span className="text-[#D0A933]">Rooted</span> in Values, <br />
                  <span className="text-[#D0A933]">Driven</span> by Excellence
                </h2>

                <p className="text-base sm:text-lg text-[#E6E6E6] mb-8 sm:mb-12 max-w-xl leading-relaxed mx-auto md:mx-0">
                  Guided learning under experienced mentors. Structured paths, rigorous practice, and timeless principles for modern success.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 justify-center md:justify-start">
                  <Link
                    href="/courses"
                    className="bg-[#D0A933] text-[#0B0B0B] font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl hover:bg-[#b8952d] smooth-transition shadow-2xl shadow-[#D0A933]/10 text-center text-xs sm:text-sm uppercase tracking-widest"
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

              <div className="relative hidden md:block">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
                    alt="Satyakul Paathshala"
                    className="w-full h-[350px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10">
                    <div className="text-sm font-bold uppercase tracking-widest text-[#D0A933] mb-2">Live Heritage</div>
                    <h3 className="text-xl lg:text-3xl font-serif font-bold text-white">Ancient Wisdom Meet Modern Excellence</h3>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Education with Mentorship */}
              <div className="group p-6 md:p-0 rounded-2xl md:rounded-none bg-white/5 md:bg-transparent border border-white/10 md:border-0 hover:border-[#D0A933]/30 md:hover:border-0 transition-all">
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-5 mb-4 md:mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D0A933]/20 to-[#D0A933]/5 flex items-center justify-center text-3xl group-hover:scale-110 smooth-transition border border-[#D0A933]/20 shadow-lg shadow-[#D0A933]/5">
                    <School className="text-[#D0A933]" suppressHydrationWarning />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white">Education with Mentorship</h3>
                </div>
                <p className="text-[#E6E6E6] text-base md:text-lg leading-relaxed text-center md:text-left md:pl-4 md:border-l border-white/10">
                  Learn directly from seasoned mentors who guide your spiritual and intellectual growth.
                </p>
              </div>

              {/* Structured Curriculum */}
              <div className="group p-6 md:p-0 rounded-2xl md:rounded-none bg-white/5 md:bg-transparent border border-white/10 md:border-0 hover:border-[#D0A933]/30 md:hover:border-0 transition-all">
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-5 mb-4 md:mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#077D93]/20 to-[#077D93]/5 flex items-center justify-center text-3xl group-hover:scale-110 smooth-transition border border-[#077D93]/20 shadow-lg shadow-[#077D93]/5">
                    <Layout className="text-[#D0A933]" suppressHydrationWarning />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white">Structured Curriculum</h3>
                </div>
                <p className="text-[#E6E6E6] text-base md:text-lg leading-relaxed text-center md:text-left md:pl-4 md:border-l border-white/10">
                  Follow a clear, systematic path of learning designed for comprehensive mastery.
                </p>
              </div>

              {/* Proven Outcomes */}
              <div className="group p-6 md:p-0 rounded-2xl md:rounded-none bg-white/5 md:bg-transparent border border-white/10 md:border-0 hover:border-[#D0A933]/30 md:hover:border-0 transition-all">
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-5 mb-4 md:mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D0A933]/20 to-[#D0A933]/5 flex items-center justify-center text-3xl group-hover:scale-110 smooth-transition border border-[#D0A933]/20 shadow-lg shadow-[#D0A933]/5">
                    <GraduationCap className="text-[#D0A933]" suppressHydrationWarning />
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white">Proven Outcomes</h3>
                </div>
                <p className="text-[#E6E6E6] text-base md:text-lg leading-relaxed text-center md:text-left md:pl-4 md:border-l border-white/10">
                  Achieve tangible, career-enhancing results through disciplined practice and assessment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comprehensive About Section */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          {/* Background embellishments */}
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#077D93]/10 rounded-full blur-[100px] -translate-y-1/2"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">

              {/* Image Side */}
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
                  <div className="absolute inset-0 bg-[#04414d]/20 mix-blend-multiply"></div>
                  <img
                    src="https://images.unsplash.com/photo-1510531704581-5b2870972060?q=80&w=2073&auto=format&fit=crop"
                    alt="Students learning"
                    className="w-full h-[350px] sm:h-[450px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Floating Card */}
                  <div className="absolute -bottom-6 -right-6 bg-[#04414d] border border-white/10 p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
                    <p className="text-[#D0A933] font-serif italic text-lg mb-2">"Education is the manifestation of perfection already in man."</p>
                    <p className="text-white/60 text-xs uppercase tracking-widest">— Swami Vivekananda</p>
                  </div>
                </div>

                {/* Decorative Gold Frame */}
                <div className="absolute top-6 -left-6 w-full h-full border-2 border-[#D0A933]/30 rounded-[2rem] -z-10 hidden sm:block"></div>
              </div>

              {/* Text Side */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D0A933]/10 border border-[#D0A933]/20 text-[#D0A933] text-xs font-bold uppercase tracking-widest mb-6 mx-auto lg:mx-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D0A933]"></span>
                  About Our Institution
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight">
                  A Sanctuary of <br />
                  <span className="text-teal-500">Wisdom</span> & <span className="text-[#D0A933]">Character</span>
                </h2>

                <p className="text-[#E6E6E6] text-justify sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  Satyakul Paathshala was founded with a singular mission: to bridge the gap between ancient Gurukul values and the demands of the modern world. We believe that true education goes beyond textbooks—it creates character, instills discipline, and fosters a lifelong thirst for knowledge.
                </p>

                <p className="text-[#E6E6E6]/80 text-justify sm:text-lg leading-relaxed mb-6 sm:mb-8">
                  Here, every student is a "Shishya," guided by dedicated mentors on a path of self-discovery and intellectual rigour. Our campus is a living ecosystem of learning, designed to inspire focus and creativity.
                </p>

                {/* Stats or Features Mini-grid */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 border-t border-white/10 pt-6 sm:pt-8 text-center lg:text-left">
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">5+</h4>
                    <p className="text-[#CFE6EA] text-sm">Expert Mentors</p>
                  </div>
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">100%</h4>
                    <p className="text-[#CFE6EA] text-sm">Holistic Growth</p>
                  </div>
                </div>

                <div className="mt-10 flex justify-center lg:justify-start">
                  <Link href="/about" className="text-[#D0A933] font-bold hover:text-white smooth-transition flex items-center gap-2 group tracking-widest uppercase text-sm">
                    Discover Our Story <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Course Section */}
        {!loading && latestCourse && (
          <section className="py-16 sm:py-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_100%,rgba(208,169,51,0.05),transparent_40%)]"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-6 sm:gap-8">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[#D0A933] mb-4">Current Lessons</h2>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">Newest Course Launch</h3>
                </div>
                <Link href="/courses" className="text-[#D0A933] font-bold hover:underline flex items-center gap-2 group text-sm sm:text-lg uppercase tracking-widest">
                  Explore All Courses <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              <div className="bg-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row hover:border-[#D0A933]/30 smooth-transition">
                <div className="lg:w-1/2 relative h-[250px] sm:h-[350px] lg:h-auto overflow-hidden">
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
                <div className="lg:w-1/2 p-6 sm:p-8 lg:p-16 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <span className="text-xs font-bold uppercase text-[#D0A933] bg-[#D0A933]/10 px-4 py-1.5 rounded-full border border-[#D0A933]/20">
                      Latest
                    </span>
                    <span className="text-sm text-[#CFE6EA] flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {latestCourse.duration}
                    </span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-4 sm:mb-6 text-white hover:text-[#D0A933] transition-colors cursor-pointer leading-tight">
                    {latestCourse.title}
                  </h4>
                  <p className="text-base sm:text-lg text-[#E6E6E6] mb-6 sm:mb-8 line-clamp-3 leading-relaxed">
                    {latestCourse.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 sm:justify-between">
                    <Link
                      href={`/courses/${latestCourse.id}`}
                      className="bg-[#D0A933] text-[#0B0B0B] font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-xl hover:bg-[#b8952d] smooth-transition shadow-xl text-center uppercase tracking-widest text-xs sm:text-sm w-full sm:w-auto"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16 sm:py-24 px-4 bg-[#077D93]/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D0A933]/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#077D93]/5 rounded-full blur-[100px]"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold mb-6 sm:mb-8 leading-tight text-white">
              Begin Your Path to <br />
              <span className="text-[#D0A933]">Self-Mastery</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#E6E6E6] mb-8 sm:mb-12 max-w-2xl mx-auto">
              Join a community dedicated to excellence, values, and the pursuit of knowledge.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/courses" className="bg-[#D0A933] text-[#0B0B0B] font-bold px-8 sm:px-12 py-4 sm:py-5 rounded-xl hover:bg-[#b8952d] smooth-transition text-base sm:text-xl shadow-2xl shadow-[#D0A933]/10 uppercase tracking-widest">
                Join the Paathshala
              </Link>
              <Link href="/about" className="border border-white/20 text-white font-bold px-8 sm:px-12 py-4 sm:py-5 rounded-xl hover:bg-white/5 smooth-transition text-base sm:text-xl uppercase tracking-widest">
                Talk to a Mentor
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-16 mb-12 sm:mb-16">
            <div className="col-span-2 sm:col-span-1 lg:col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/logo.png"
                  alt="Satyakul Paathshala Logo"
                  className="w-8 h-8 object-contain"
                />
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  <span className="text-[#D0A933]">Satyakul</span> Paathshala
                </h3>
              </div>
              <p className="text-[#E6E6E6] leading-relaxed">
                Nurturing wisdom and discipline through traditional values and modern excellence.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-[#D0A933] mb-6 uppercase tracking-[0.2em] text-[10px]">Explore</h4>
              <ul className="space-y-4 font-medium text-[#CFE6EA]">
                <li><Link href="/courses" className="hover:text-white transition-colors">All Courses</Link></li>
                <li><Link href="/our-story" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#D0A933] mb-6 uppercase tracking-[0.2em] text-[10px]">Legal</h4>
              <ul className="space-y-4 font-medium text-[#CFE6EA]">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#D0A933] mb-6 uppercase tracking-[0.2em] text-[10px]">Connect</h4>
              <div className="flex gap-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#D0A933]/50 hover:bg-white/10 cursor-pointer transition-all">
                  <Facebook className="w-5 h-5 text-[#CFE6EA]" suppressHydrationWarning />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#D0A933]/50 hover:bg-white/10 cursor-pointer transition-all">
                  <Youtube className="w-5 h-5 text-[#CFE6EA]" suppressHydrationWarning />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-[#D0A933]/50 hover:bg-white/10 cursor-pointer transition-all">
                  <Instagram className="w-5 h-5 text-[#CFE6EA]" suppressHydrationWarning />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
            <p>© 2026 Satyakul Paathshala. All rights reserved.</p>
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
