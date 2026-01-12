'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { LogOut, User, Menu, X } from 'lucide-react';

export default function Navbar() {
    const { user, logout, loading } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Courses', href: '/courses' },
        { name: 'About', href: '/about' },
    ];

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 bg-transparent border-b border-white/5 backdrop-blur-sm smooth-transition"
            suppressHydrationWarning
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight smooth-transition">
                            <span className="text-[#D0A933]">Satyakul</span>
                            <span className="text-white ml-2">Pathshala</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[13px] font-medium text-white/90 hover:text-[#D0A933] smooth-transition uppercase tracking-[0.2em]"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {mounted && (
                            <a
                                href="https://github.com/Jiroshi-LMS/demo-usage"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/70 hover:text-white smooth-transition"
                                aria-label="GitHub Repository"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                        )}

                        <div className="h-4 w-[1px] bg-white/10 mx-2" />

                        {loading ? (
                            <div className="w-20 h-8 bg-white/5 animate-pulse rounded-lg" />
                        ) : user ? (
                            <div className="flex items-center space-x-6">
                                <Link
                                    href="/profile"
                                    className="flex items-center space-x-3 text-[13px] font-medium text-white/90 hover:text-[#D0A933] smooth-transition uppercase tracking-[0.2em]"
                                >
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                        <span className="text-[10px] text-[#D0A933]">
                                            {user.first_name?.[0] || user.identifier?.[0]?.toUpperCase()}
                                        </span>
                                    </div>
                                    <span>Account</span>
                                </Link>
                                {mounted && (
                                    <button
                                        onClick={handleLogout}
                                        className="text-white/60 hover:text-white smooth-transition"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-8">
                                <Link
                                    href="/login"
                                    className="text-[13px] font-medium text-white/90 hover:text-[#D0A933] smooth-transition uppercase tracking-[0.2em]"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-[#D0A933] text-[#0B0B0B] text-[13px] font-bold px-8 py-3 rounded-md hover:bg-[#b8952d] smooth-transition shadow-lg shadow-[#D0A933]/10 uppercase tracking-widest"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle Button */}
                    <div className="flex md:hidden items-center space-x-4">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 rounded-lg text-white/90 hover:bg-white/5 smooth-transition focus:outline-none"
                            aria-label="Toggle mobile menu"
                        >
                            {mounted && (
                                isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-white/10 bg-[#077D93]/90 backdrop-blur-md ${isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pt-4 pb-8 space-y-6">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-4 py-3 text-lg font-serif font-bold text-white hover:text-[#D0A933] smooth-transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="h-[1px] bg-white/5 mx-4" />

                    <div className="flex flex-col space-y-4 px-4">
                        {user ? (
                            <>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#D0A933]/10 text-[#D0A933] flex items-center justify-center font-bold">
                                        {user.first_name?.[0] || user.identifier?.[0]?.toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold">{user.first_name || 'My Account'}</span>
                                        <span className="text-xs text-white/50">{user.identifier}</span>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="px-5 py-4 text-sm font-bold text-red-400 bg-red-400/5 border border-red-400/10 rounded-xl text-center"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-5 py-4 text-sm font-bold text-white bg-white/5 border border-white/5 rounded-xl text-center"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="bg-[#D0A933] text-[#0B0B0B] px-5 py-4 text-sm font-bold rounded-xl text-center shadow-lg"
                                >
                                    Begin Journey
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
