'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { signup, checkIdentifierAvailability } from '@/lib/api/auth';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Mail, Lock, ArrowRight, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function SignupPage() {
    const router = useRouter();
    const { login: contextLogin } = useAuth();

    // Form state
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // UI state
    const [loading, setLoading] = useState(false);
    const [isCheckingIdentifier, setIsCheckingIdentifier] = useState(false);
    const [isIdentifierTaken, setIsIdentifierTaken] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Debounced identifier check
    useEffect(() => {
        if (!identifier || identifier.length < 5 || !identifier.includes('@')) {
            setIsIdentifierTaken(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setIsCheckingIdentifier(true);
                const taken = await checkIdentifierAvailability(identifier);
                setIsIdentifierTaken(taken);
                if (taken) {
                    toast.warning('This email is already registered');
                }
            } catch {
                toast.error('Identifier lookup failed. Please try again.');
            } finally {
                setIsCheckingIdentifier(false);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [identifier]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!identifier || !password || !confirmPassword) {
            const msg = 'Please fill in all fields';
            setError(msg);
            toast.error(msg);
            return;
        }

        if (password !== confirmPassword) {
            const msg = 'Passwords do not match';
            setError(msg);
            toast.error(msg);
            return;
        }

        if (password.length < 6) {
            const msg = 'Password must be at least 6 characters';
            setError(msg);
            toast.error(msg);
            return;
        }

        try {
            setLoading(true);
            const response = await signup({ identifier, password });

            if (response.status && response.data?.access_token) {
                contextLogin(response.data.access_token);
                toast.success('Account created successfully!');
                router.push('/');
            } else {
                const msg = response.message || 'Signup failed';
                setError(msg);
                toast.error(msg);
            }
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-white">
            <Navbar />

            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D0A933]/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#077D93]/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
            </div>

            <main className="flex items-center justify-center min-h-[calc(100vh-5rem)] pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    {/* Logo & Header */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                            <img
                                src="/logo.png"
                                alt="Satyakul Paathshala Logo"
                                className="w-12 h-12 sm:w-14 sm:h-14 object-contain group-hover:scale-105 transition-transform"
                            />
                            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                                <span className="text-[#D0A933]">Satyakul</span>
                                <span className="text-white ml-1">Paathshala</span>
                            </h1>
                        </Link>
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
                            Begin Your Journey
                        </h2>
                        <p className="text-[#E6E6E6]/70 text-sm sm:text-base">
                            Create your account to access our courses
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-400">{error}</p>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-white/80 uppercase tracking-wider mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-white/40" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        className={`w-full pl-12 pr-10 py-3.5 bg-white/5 border ${isIdentifierTaken ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D0A933]/50 focus:border-[#D0A933] transition-all text-sm sm:text-base`}
                                        placeholder="your.email@example.com"
                                    />
                                    {isCheckingIdentifier && (
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <Loader2 className="w-5 h-5 text-[#D0A933] animate-spin" />
                                        </div>
                                    )}
                                    {!isCheckingIdentifier && identifier && !isIdentifierTaken && (
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        </div>
                                    )}
                                </div>
                                {isIdentifierTaken && (
                                    <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
                                        <XCircle className="w-3.5 h-3.5" />
                                        This email is already in use
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-bold text-white/80 uppercase tracking-wider mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-white/40" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D0A933]/50 focus:border-[#D0A933] transition-all text-sm sm:text-base"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {password && password.length < 6 && (
                                    <p className="mt-2 text-xs text-white/50">Password must be at least 6 characters</p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-bold text-white/80 uppercase tracking-wider mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-white/40" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D0A933]/50 focus:border-[#D0A933] transition-all text-sm sm:text-base"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {confirmPassword && password !== confirmPassword && (
                                    <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
                                        <XCircle className="w-3.5 h-3.5" />
                                        Passwords do not match
                                    </p>
                                )}
                                {confirmPassword && password === confirmPassword && password.length >= 6 && (
                                    <p className="mt-2 text-xs text-green-400 flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Passwords match
                                    </p>
                                )}
                            </div>

                            {/* Terms & Privacy */}
                            <div className="pt-2">
                                <p className="text-xs text-white/50 text-center leading-relaxed">
                                    By signing up, you agree to our{' '}
                                    <Link href="/terms" className="text-[#D0A933] hover:text-[#D0A933]/80 hover:underline font-medium transition-colors">
                                        Terms and Conditions
                                    </Link>
                                    {' '}and{' '}
                                    <Link href="/privacy" className="text-[#D0A933] hover:text-[#D0A933]/80 hover:underline font-medium transition-colors">
                                        Privacy Policy
                                    </Link>
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading || isIdentifierTaken || isCheckingIdentifier || password !== confirmPassword || password.length < 6}
                                className="w-full group relative overflow-hidden bg-gradient-to-r from-[#D0A933] to-[#b8952d] text-[#0B0B0B] font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-[#D0A933]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base uppercase tracking-widest"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <span className="relative flex items-center justify-center gap-2">
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        <>
                                            Sign Up
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                            <p className="text-sm text-white/60">
                                Already have an account?{' '}
                                <Link href="/login" className="text-[#D0A933] hover:text-white font-bold hover:underline transition-colors">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
