'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-lg border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <h1 className="text-3xl font-serif font-bold text-[#D0A933] tracking-tight">Satyakul Pathshala</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        <Link href="/" className="text-sm font-medium text-foreground hover:text-[#D0A933] smooth-transition uppercase tracking-widest">
                            Home
                        </Link>
                        <Link href="/courses" className="text-sm font-medium text-foreground hover:text-[#D0A933] smooth-transition uppercase tracking-widest">
                            Courses
                        </Link>
                        <Link href="/about" className="text-sm font-medium text-foreground hover:text-[#D0A933] smooth-transition uppercase tracking-widest">
                            About
                        </Link>
                        <a
                            href="https://github.com/Jiroshi-LMS/demo-usage"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-[#077D93] smooth-transition"
                            aria-label="GitHub Repository"
                        >
                            <svg suppressHydrationWarning className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>

                    {/* Desktop Auth & Mobile Toggle */}
                    <div className="flex items-center space-x-6">
                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex items-center space-x-6">
                            {user ? (
                                <div className="relative group">
                                    <button
                                        className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-[#D0A933] smooth-transition focus:outline-none"
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    >
                                        {user.avatar ? (
                                            <img src={user.avatar} alt="Avatar" className="w-9 h-9 rounded-full border border-border" />
                                        ) : (
                                            <div className="w-9 h-9 rounded-full bg-[#D0A933]/10 text-[#D0A933] flex items-center justify-center font-bold border border-[#D0A933]/20">
                                                {user.first_name?.[0] || user.identifier[0].toUpperCase()}
                                            </div>
                                        )}
                                        <span className="hidden sm:block font-medium">
                                            {user.first_name ? user.first_name : 'Account'}
                                        </span>
                                    </button>

                                    {/* Dropdown */}
                                    <div className="absolute right-0 mt-3 w-56 bg-card rounded-xl shadow-2xl py-2 border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                                        <div className="px-5 py-3 border-b border-border">
                                            <p className="text-[10px] uppercase tracking-widest text-[#077D93] font-bold mb-1">Authenticated</p>
                                            <p className="text-sm font-medium truncate italic">{user.identifier}</p>
                                        </div>
                                        <Link href="/profile" className="block px-5 py-2.5 text-sm text-foreground hover:bg-[#D0A933]/5 hover:text-[#D0A933] smooth-transition">
                                            Account Settings
                                        </Link>
                                        <Link href="/my-courses" className="block px-5 py-2.5 text-sm text-foreground hover:bg-[#D0A933]/5 hover:text-[#D0A933] smooth-transition">
                                            My Learning Path
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-5 py-2.5 text-sm text-red-500 hover:bg-red-500/5 smooth-transition"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="hidden sm:block text-sm font-bold text-foreground hover:text-[#D0A933] smooth-transition uppercase tracking-widest">
                                        Log In
                                    </Link>
                                    <Link href="/signup" className="bg-[#D0A933] text-black text-sm font-bold px-8 py-3 rounded-lg hover:opacity-90 smooth-transition shadow-lg shadow-[#D0A933]/10">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Toggle Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden p-2 rounded-lg text-foreground hover:bg-white/5 smooth-transition focus:outline-none"
                            aria-label="Toggle mobile menu"
                        >
                            <svg suppressHydrationWarning className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-border bg-background ${isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pt-4 pb-8 space-y-5">
                    {/* Main Links */}
                    <div className="flex flex-col space-y-3">
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-4 text-lg font-serif font-bold text-foreground hover:bg-[#D0A933]/5 rounded-xl smooth-transition border border-transparent hover:border-[#D0A933]/20"
                        >
                            Home
                        </Link>
                        <Link
                            href="/courses"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-4 text-lg font-serif font-bold text-foreground hover:bg-[#D0A933]/5 rounded-xl smooth-transition border border-transparent hover:border-[#D0A933]/20"
                        >
                            Courses
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-4 text-lg font-serif font-bold text-foreground hover:bg-[#D0A933]/5 rounded-xl smooth-transition border border-transparent hover:border-[#D0A933]/20"
                        >
                            About
                        </Link>
                    </div>

                    <hr className="border-border mx-4" />

                    {/* Auth links */}
                    <div className="flex flex-col space-y-4 px-4">
                        {user ? (
                            <>
                                <div className="flex items-center space-x-4 pb-2">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt="Avatar" className="w-12 h-12 rounded-full border border-border" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-[#D0A933]/10 text-[#D0A933] flex items-center justify-center font-bold">
                                            {user.first_name?.[0] || user.identifier[0].toUpperCase()}
                                        </div>
                                    )}
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-foreground">
                                            {user.first_name ? `${user.first_name} ${user.last_name || ''}` : 'My Account'}
                                        </span>
                                        <span className="text-xs text-muted-foreground italic truncate max-w-[200px]">
                                            {user.identifier}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-5 py-4 text-sm font-bold text-foreground bg-card border border-border rounded-xl text-center hover:border-[#D0A933]/50 smooth-transition"
                                >
                                    Account Settings
                                </Link>
                                <Link
                                    href="/my-courses"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-5 py-4 text-sm font-bold text-foreground bg-card border border-border rounded-xl text-center hover:border-[#D0A933]/50 smooth-transition"
                                >
                                    My Learning Path
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        logout();
                                    }}
                                    className="px-5 py-4 text-sm font-bold text-red-500 bg-red-500/5 border border-red-500/10 rounded-xl text-center"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="px-5 py-4 text-sm font-bold text-foreground bg-card border border-border rounded-xl text-center hover:border-[#D0A933]/50 smooth-transition"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="bg-[#D0A933] text-black px-5 py-4 text-sm font-bold rounded-xl text-center shadow-lg active:scale-[0.98] transition-all"
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
