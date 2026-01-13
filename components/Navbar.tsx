'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { LogOut, User, Menu, X, BookOpen, Settings, ChevronDown } from 'lucide-react';

export default function Navbar() {
    const { user, logout, loading } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Courses', href: '/courses' },
        { name: 'Our Story', href: '/our-story' },
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
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group gap-2 sm:gap-4 flex-shrink-0">
                        <img
                            src="/logo.png"
                            alt="Satyakul Paathshala Logo"
                            className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-105 smooth-transition"
                        />
                        <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold tracking-tight smooth-transition whitespace-nowrap">
                            <span className="text-[#D0A933]">Satyakul</span>
                            <span className="text-white ml-1 sm:ml-2">Paathshala</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[11px] xl:text-[13px] font-medium text-white/90 hover:text-[#D0A933] smooth-transition uppercase tracking-[0.15em] xl:tracking-[0.2em]"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="h-4 w-[1px] bg-white/10 mx-2" />

                        {loading ? (
                            <div className="w-20 h-8 bg-white/5 animate-pulse rounded-lg" />
                        ) : user ? (
                            <div className="flex items-center space-x-6 relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 xl:space-x-3 text-[11px] xl:text-[13px] font-medium text-white/90 hover:text-[#D0A933] smooth-transition uppercase tracking-[0.15em] xl:tracking-[0.2em] focus:outline-none"
                                >
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                        <span className="text-[10px] text-[#D0A933]">
                                            {user.first_name?.[0] || user.identifier?.[0]?.toUpperCase()}
                                        </span>
                                    </div>
                                    <span className="hidden xl:inline">{user.first_name || 'Account'}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isDropdownOpen && (
                                    <>
                                        {/* Backdrop to close dropdown */}
                                        <div
                                            className="fixed inset-0 z-40 cursor-default"
                                            onClick={() => setIsDropdownOpen(false)}
                                        />

                                        {/* Dropdown Menu */}
                                        <div className="absolute top-12 right-0 w-56 bg-[#04414d] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in-up origin-top-right">
                                            <div className="p-4 border-b border-white/10 bg-white/5">
                                                <p className="text-white font-bold text-sm truncate">{user.first_name || 'User'}</p>
                                                <p className="text-white/50 text-xs truncate">{user.identifier}</p>
                                            </div>

                                            <div className="py-2">
                                                <Link
                                                    href="/my-courses"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-[#D0A933] transition-colors"
                                                >
                                                    <BookOpen className="w-4 h-4" />
                                                    <span>My Courses</span>
                                                </Link>

                                                <Link
                                                    href="/profile"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-white/90 hover:bg-white/5 hover:text-[#D0A933] transition-colors"
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    <span>Account Settings</span>
                                                </Link>

                                                <div className="h-[1px] bg-white/5 mx-4 my-1" />

                                                {mounted && (
                                                    <button
                                                        onClick={() => {
                                                            setIsDropdownOpen(false);
                                                            handleLogout();
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-400/10 transition-colors text-left"
                                                    >
                                                        <LogOut className="w-4 h-4" />
                                                        <span>Sign Out</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4 xl:space-x-8">
                                <Link
                                    href="/login"
                                    className="text-[11px] xl:text-[13px] font-medium text-white/90 hover:text-[#D0A933] smooth-transition uppercase tracking-[0.15em] xl:tracking-[0.2em]"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-[#D0A933] text-[#0B0B0B] text-[11px] xl:text-[13px] font-bold px-4 xl:px-8 py-2.5 xl:py-3 rounded-md hover:bg-[#b8952d] smooth-transition shadow-lg shadow-[#D0A933]/10 uppercase tracking-wider xl:tracking-widest"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle Button */}
                    <div className="flex lg:hidden items-center">
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

            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-white/10 bg-[#077D93]/95 backdrop-blur-md ${isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="px-4 pt-4 pb-8 space-y-6">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-4 py-2 text-base font-sans font-semibold text-white hover:text-[#D0A933] smooth-transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="h-[1px] bg-white/5 mx-4" />

                    <div className="flex flex-col space-y-4 px-4">
                        {user ? (
                            <>
                                <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-[#D0A933]/10 text-[#D0A933] flex items-center justify-center font-bold text-sm">
                                            {user.first_name?.[0] || user.identifier?.[0]?.toUpperCase()}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold text-sm">{user.first_name || 'My Account'}</span>
                                            <span className="text-[10px] text-white/50 truncate max-w-[150px]">{user.identifier}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <Link
                                            href="/my-courses"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-[#D0A933] rounded-md transition-colors"
                                        >
                                            <BookOpen className="w-3.5 h-3.5" />
                                            <span>My Courses</span>
                                        </Link>

                                        <Link
                                            href="/profile"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-[#D0A933] rounded-md transition-colors"
                                        >
                                            <Settings className="w-3.5 h-3.5" />
                                            <span>Account Settings</span>
                                        </Link>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-400 bg-red-400/5 border border-red-400/10 rounded-lg hover:bg-red-400/10 transition-colors"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    <span>Sign Out</span>
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
