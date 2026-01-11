'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getProfile, logout as apiLogout } from '@/lib/api/auth';
import { StudentProfile } from '@/types/auth';

interface AuthContextType {
    user: StudentProfile | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<StudentProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();



    const checkAuth = async () => {
        await Promise.resolve();
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const response = await getProfile();
                if (response.status && response.data) {
                    setUser(response.data);
                } else {
                    // Profile fetch failed but token exists. 
                    // It might be expired, but interceptor handles that.
                    // If interceptor fails, it clears token.
                    toast.error(`Failed to load profile: ${response.message}`);
                }
            }
            catch {
                toast.error('Auth check failed. Please try again later.');
                setUser(null);
            }
        } else {
            setUser(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            void checkAuth();
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const login = (token: string) => {
        localStorage.setItem('access_token', token);
        checkAuth();
    };

    const logout = async () => {
        try {
            await apiLogout();
        } finally {
            localStorage.removeItem('access_token');
            setUser(null);
            toast.success('Logged out successfully');
            router.push('/login');
        }
    };

    const refreshProfile = async () => {
        await checkAuth();
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
