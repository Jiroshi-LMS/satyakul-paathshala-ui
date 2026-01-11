'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { signup, checkIdentifierAvailability } from '@/lib/api/auth';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

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
                // Success - Redirect to home
                router.push('/');
            } else {
                const msg = response.message || 'Signup failed';
                setError(msg);
                toast.error(msg);
            }
        } catch (err: any) {
            // Try to extract error message from API error response if available
            const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/">
                    <h2 className="text-center text-3xl font-extrabold gradient-text">
                        LearnHub
                    </h2>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-bold text-foreground">
                    Create your account
                </h2>
                <p className="mt-2 text-center text-sm text-[var(--muted-foreground)]">
                    Or{' '}
                    <Link href="/login" className="font-medium text-[var(--primary)] hover:text-[var(--primary)]/80 smooth-transition">
                        sign in to your existing account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[var(--card)] py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-[var(--border)]">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-md p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className={`appearance-none block w-full px-3 py-2 border ${isIdentifierTaken ? 'border-red-500' : 'border-[var(--border)]'} rounded-md shadow-sm placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm bg-background pr-10`}
                                />
                                {isCheckingIdentifier && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="animate-spin h-4 w-4 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                )}
                            </div>
                            {isIdentifierTaken && (
                                <p className="mt-1 text-xs text-red-500">This email is already in use.</p>
                            )}
                        </div>


                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-[var(--border)] rounded-md shadow-sm placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm bg-background"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-[var(--border)] rounded-md shadow-sm placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm bg-background"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || isIdentifierTaken || isCheckingIdentifier}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white gradient-bg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed smooth-transition"
                            >
                                {loading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : null}
                                {loading ? 'Creating account...' : 'Sign up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
