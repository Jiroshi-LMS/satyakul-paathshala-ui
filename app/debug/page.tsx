'use client';

import { useEffect, useState } from 'react';

export default function EnvDebugPage() {
    const [envInfo, setEnvInfo] = useState<any>(null);

    useEffect(() => {
        // This runs on client side and shows what env vars are accessible
        setEnvInfo({
            serverBasePath: process.env.NEXT_PUBLIC_SERVER_BASE_PATH || 'NOT SET',
            apiKey: process.env.NEXT_PUBLIC_X_API_PK ? '***' + process.env.NEXT_PUBLIC_X_API_PK.slice(-4) : 'NOT SET',
            nodeEnv: process.env.NODE_ENV,
        });
    }, []);

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Environment Debug</h1>

                <div className="bg-[var(--muted)] p-6 rounded-lg space-y-4">
                    <div>
                        <strong>NEXT_PUBLIC_SERVER_BASE_PATH:</strong>
                        <div className="font-mono bg-background p-2 rounded mt-1">
                            {envInfo?.serverBasePath || 'Loading...'}
                        </div>
                    </div>

                    <div>
                        <strong>NEXT_PUBLIC_X_API_PK:</strong>
                        <div className="font-mono bg-background p-2 rounded mt-1">
                            {envInfo?.apiKey || 'Loading...'}
                        </div>
                    </div>

                    <div>
                        <strong>NODE_ENV:</strong>
                        <div className="font-mono bg-background p-2 rounded mt-1">
                            {envInfo?.nodeEnv || 'Loading...'}
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <strong className="text-yellow-800 dark:text-yellow-200">⚠️ Important:</strong>
                    <ul className="mt-2 space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                        <li>• Environment variables must be prefixed with <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">NEXT_PUBLIC_</code> to be accessible in client components</li>
                        <li>• Check your <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">.env.local</code> file</li>
                        <li>• Restart dev server after changing env vars</li>
                    </ul>
                </div>

                <div className="mt-6">
                    <a href="/courses" className="text-[var(--primary)] hover:underline">
                        ← Back to Courses
                    </a>
                </div>
            </div>
        </div>
    );
}
