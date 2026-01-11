'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from "next/navigation";

import Navbar from '@/components/Navbar';
import { updateAccount, checkIdentifierAvailability } from '@/lib/api/auth';
import { toast } from 'sonner';

export default function ProfilePage() {
    const { user, loading: authLoading, login } = useAuth();
    const router = useRouter();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [updating, setUpdating] = useState(false);
    const [isCheckingIdentifier, setIsCheckingIdentifier] = useState(false);
    const [isIdentifierTaken, setIsIdentifierTaken] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        } else if (user) {
            setIdentifier(user.identifier);
        }
    }, [user, authLoading, router]);

    // Debounced identifier check
    useEffect(() => {
        if (!identifier || identifier.length < 5 || !identifier.includes('@') || (user && identifier === user.identifier)) {
            setIsIdentifierTaken(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setIsCheckingIdentifier(true);
                const taken = await checkIdentifierAvailability(identifier);
                setIsIdentifierTaken(taken);
                if (taken) {
                    toast.warning('This email is already in use by another account');
                }
            } catch {
                toast.error('Identifier lookup failed');
            } finally {
                setIsCheckingIdentifier(false);
            }
        }, 800);

        return () => clearTimeout(timer);
    }, [identifier, user]);


    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!identifier.trim()) {
            toast.error('Email cannot be empty');
            return;
        }

        try {
            setUpdating(true);
            const data: { identifier: string; password?: string; current_password?: string } = { identifier: identifier.trim() };

            if (password) {
                data.password = password;
            }
            if (currentPassword) {
                data.current_password = currentPassword;
            }

            const response = await updateAccount(data);

            if (response.status) {
                toast.success('Profile updated successfully!');
                // Update the token in context (which also refreshes the profile)
                setPassword(''); // Clear password field
                setCurrentPassword(''); // Clear current password field
            } else {
                toast.error(response.message || 'Failed to update profile');
            }
        } catch (error: any) {
            toast.error('Profile update failed.');
            const message = error.response?.data?.message || 'An error occurred during update';
            toast.error(message);
        } finally {
            setUpdating(false);
        }
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-20 px-4 flex items-center justify-center">
                <Navbar />
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    <header className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-foreground mb-4">Account Settings</h1>
                        <p className="text-[var(--muted-foreground)] text-lg">
                            Manage your personal information and security settings.
                        </p>
                    </header>

                    <div className="bg-[var(--card)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-2xl backdrop-blur-sm bg-opacity-50">
                        <div className="p-8 sm:p-12">
                            <form onSubmit={handleUpdate} className="space-y-8">
                                {/* Profile Header */}
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                                        {user.first_name?.[0] || user.identifier[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-foreground">
                                            {user.first_name ? `${user.first_name} ${user.last_name || ''}` : 'Your Profile'}
                                        </h2>
                                        <p className="text-[var(--muted-foreground)]">{user.identifier}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-8">
                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-foreground ml-1">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="email"
                                                type="email"
                                                value={identifier}
                                                onChange={(e) => setIdentifier(e.target.value)}
                                                className={`w-full bg-background border ${isIdentifierTaken ? 'border-red-500' : 'border-[var(--border)]'} rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] smooth-transition text-foreground pr-12`}
                                                placeholder="you@example.com"
                                                required
                                            />
                                            {isCheckingIdentifier && (
                                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                                    <svg className="animate-spin h-5 w-5 text-[var(--muted-foreground)]" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        {isIdentifierTaken && (
                                            <p className="mt-1 text-xs text-red-500 ml-1">This email is already taken by another account.</p>
                                        )}
                                        <p className="text-xs text-[var(--muted-foreground)] ml-1">
                                            This is your primary identifier for logging in.
                                        </p>
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="password" title="Leave blank to keep current password" className="text-sm font-semibold text-foreground ml-1">
                                            New Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-background border border-[var(--border)] rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] smooth-transition text-foreground"
                                            placeholder="••••••••"
                                        />
                                        <p className="text-xs text-[var(--muted-foreground)] ml-1">
                                            Leave this blank if you don't want to change your password.
                                        </p>
                                    </div>

                                    {/* Current Password Field (Mandatory for security) */}
                                    <div className="space-y-2">
                                        <label htmlFor="current-password" className="text-sm font-semibold text-foreground ml-1">
                                            Current Password
                                        </label>
                                        <input
                                            id="current-password"
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="w-full bg-background border border-[var(--border)] rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 focus:border-[var(--primary)] smooth-transition text-foreground"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <p className="text-xs text-[var(--muted-foreground)] ml-1">
                                            Enter your current password to save changes.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={updating || isIdentifierTaken || isCheckingIdentifier}
                                        className="w-full gradient-bg text-white font-bold py-4 rounded-2xl hover:opacity-90 smooth-transition shadow-lg transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {updating ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                                Updating...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="px-8 py-6 bg-[var(--muted)]/20 border-t border-[var(--border)] flex items-center justify-center gap-2 text-sm text-[var(--muted-foreground)]">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Your data is securely stored and protected.
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => router.back()}
                            className="text-[var(--muted-foreground)] hover:text-foreground inline-flex items-center gap-2 smooth-transition font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Go Back
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
