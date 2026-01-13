'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { login as apiLogin } from '@/lib/api/auth';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff, XCircle } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login: contextLogin } = useAuth();

    // Form state
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // UI state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!identifier || !password) {
            const msg = 'Please fill in all fields';
            setError(msg);
            toast.error(msg);
            return;
        }

        try {
            setLoading(true);
            const response = await apiLogin({ identifier, password });

            if (response.status && response.data?.access_token) {
                contextLogin(response.data.access_token);
                toast.success('Welcome back!');
                router.push('/');
            } else {
                const msg = response.message || 'Login failed';
                setError(msg);
                toast.error(msg);
            }
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Invalid email or password';
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
                            Welcome Back
                        </h2>
                        <p className="text-[#E6E6E6]/70 text-sm sm:text-base">
                            Sign in to continue your learning journey
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
                                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D0A933]/50 focus:border-[#D0A933] transition-all text-sm sm:text-base"
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="block text-sm font-bold text-white/80 uppercase tracking-wider">
                                        Password
                                    </label>
                                    <Link href="/forgot-password" className="text-xs text-[#D0A933] hover:text-[#D0A933]/80 hover:underline transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-white/40" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#D0A933]/50 focus:border-[#D0A933] transition-all text-sm sm:text-base"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white/60 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group relative overflow-hidden bg-gradient-to-r from-[#D0A933] to-[#b8952d] text-[#0B0B0B] font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-[#D0A933]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm sm:text-base uppercase tracking-widest"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <span className="relative flex items-center justify-center gap-2">
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                            <p className="text-sm text-white/60">
                                Don't have an account?{' '}
                                <Link href="/signup" className="text-[#D0A933] hover:text-white font-bold hover:underline transition-colors">
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
