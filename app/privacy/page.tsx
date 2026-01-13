'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Shield, ArrowLeft, Lock, Eye, UserCheck, Server, Bell, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
    const lastUpdated = 'January 13, 2026';

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[#CFE6EA] hover:text-[#D0A933] smooth-transition text-sm mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-[#077D93]/20 flex items-center justify-center border border-[#077D93]/30">
                                <Shield className="w-7 h-7 text-[#077D93]" suppressHydrationWarning />
                            </div>
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
                                    Privacy Policy
                                </h1>
                                <p className="text-[#CFE6EA] text-sm mt-1">Last updated: {lastUpdated}</p>
                            </div>
                        </div>

                        <p className="text-[#E6E6E6] text-lg leading-relaxed">
                            At Satyakul Paathshala, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
                        </p>
                    </div>

                    {/* Key Commitment Box */}
                    <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-[#077D93]/10 border-2 border-[#077D93]/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#077D93]/10 rounded-full blur-3xl"></div>
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-[#077D93]/20 flex items-center justify-center flex-shrink-0">
                                <Lock className="w-6 h-6 text-[#077D93]" suppressHydrationWarning />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[#077D93] mb-3 uppercase tracking-wide">
                                    🔒 Our Privacy Commitment
                                </h2>
                                <p className="text-white leading-relaxed mb-4">
                                    <strong>We do NOT share, sell, or disclose student information to any third party.</strong>
                                </p>
                                <p className="text-[#E6E6E6] leading-relaxed">
                                    All personal data, academic records, and contact information of students and parents remain strictly confidential and secure within Satyakul Paathshala. Your trust is our priority, and we take every measure to protect the information you share with us.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Policy Content */}
                    <div className="space-y-10">

                        {/* Section 1 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="w-5 h-5 text-[#D0A933]" suppressHydrationWarning />
                                <h2 className="text-2xl font-serif font-bold text-[#D0A933]">
                                    1. Information We Collect
                                </h2>
                            </div>
                            <p className="text-[#E6E6E6] leading-relaxed mb-4">
                                We collect information that you provide directly to us when you:
                            </p>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li><strong className="text-white">Register or enroll</strong> — Name, date of birth, contact details, address, and parent/guardian information</li>
                                <li><strong className="text-white">Create an account</strong> — Email address, phone number, and login credentials</li>
                                <li><strong className="text-white">Attend courses</strong> — Academic records, attendance, and performance data</li>
                                <li><strong className="text-white">Contact us</strong> — Any information you provide in enquiries or feedback</li>
                                <li><strong className="text-white">Visit our website</strong> — Browser type, IP address, and usage patterns (anonymized)</li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                                <UserCheck className="w-5 h-5 text-[#D0A933]" suppressHydrationWarning />
                                <h2 className="text-2xl font-serif font-bold text-[#D0A933]">
                                    2. How We Use Your Information
                                </h2>
                            </div>
                            <p className="text-[#E6E6E6] leading-relaxed mb-4">
                                We use the information we collect solely for legitimate educational and administrative purposes:
                            </p>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li>Processing admissions and managing enrollments</li>
                                <li>Providing educational services and tracking academic progress</li>
                                <li>Communicating important updates, schedules, and announcements</li>
                                <li>Sending fee reminders and administrative notices</li>
                                <li>Improving our courses and services based on feedback</li>
                                <li>Complying with legal and regulatory requirements</li>
                            </ul>
                        </section>

                        {/* Section 3 - NO THIRD PARTY SHARING */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5 ring-2 ring-[#077D93]/30">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-5 h-5 text-[#D0A933]" suppressHydrationWarning />
                                <h2 className="text-2xl font-serif font-bold text-[#D0A933]">
                                    3. Information Sharing & Disclosure
                                </h2>
                            </div>
                            <div className="bg-[#077D93]/10 rounded-xl p-4 border border-[#077D93]/20 mb-4">
                                <p className="text-white font-semibold text-lg">
                                    ✅ We do NOT share student information with any third party.
                                </p>
                            </div>
                            <p className="text-[#E6E6E6] leading-relaxed mb-4">
                                Your personal and academic information is treated with the utmost confidentiality. We will <strong className="text-white">never</strong>:
                            </p>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li>Sell or rent your personal information to anyone</li>
                                <li>Share your data with third-party marketers or advertisers</li>
                                <li>Disclose student records to external organizations without consent</li>
                                <li>Use your information for purposes other than education and administration</li>
                            </ul>
                            <p className="text-[#E6E6E6] leading-relaxed mt-4">
                                <strong className="text-white">Exceptions:</strong> We may disclose information only if required by law, court order, or to protect the safety of students and staff.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                                <Server className="w-5 h-5 text-[#D0A933]" suppressHydrationWarning />
                                <h2 className="text-2xl font-serif font-bold text-[#D0A933]">
                                    4. Data Security
                                </h2>
                            </div>
                            <p className="text-[#E6E6E6] leading-relaxed mb-4">
                                We implement robust security measures to protect your information:
                            </p>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li><strong className="text-white">Secure storage</strong> — All data is stored on protected servers with restricted access</li>
                                <li><strong className="text-white">Encryption</strong> — Sensitive information is encrypted during transmission</li>
                                <li><strong className="text-white">Access control</strong> — Only authorized personnel can access student records</li>
                                <li><strong className="text-white">Regular audits</strong> — We periodically review our security practices</li>
                                <li><strong className="text-white">Physical security</strong> — Paper records are stored in locked, secure locations</li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                                <Bell className="w-5 h-5 text-[#D0A933]" suppressHydrationWarning />
                                <h2 className="text-2xl font-serif font-bold text-[#D0A933]">
                                    5. Your Rights
                                </h2>
                            </div>
                            <p className="text-[#E6E6E6] leading-relaxed mb-4">
                                As a student or parent/guardian, you have the following rights regarding your personal data:
                            </p>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li><strong className="text-white">Access</strong> — Request a copy of your personal information we hold</li>
                                <li><strong className="text-white">Correction</strong> — Request correction of inaccurate or incomplete data</li>
                                <li><strong className="text-white">Deletion</strong> — Request deletion of your data (subject to legal requirements)</li>
                                <li><strong className="text-white">Opt-out</strong> — Unsubscribe from non-essential communications</li>
                                <li><strong className="text-white">Portability</strong> — Request your data in a portable format</li>
                            </ul>
                            <p className="text-[#E6E6E6] leading-relaxed mt-4">
                                To exercise any of these rights, please contact us at our office or via email.
                            </p>
                        </section>

                        {/* Section 6 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                6. Cookies & Website Analytics
                            </h2>
                            <p className="text-[#E6E6E6] leading-relaxed mb-4">
                                Our website may use cookies and similar technologies to enhance your browsing experience. These are used to:
                            </p>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li>Remember your preferences and login status</li>
                                <li>Analyze website traffic and usage patterns (anonymized)</li>
                                <li>Improve website functionality and performance</li>
                            </ul>
                            <p className="text-[#E6E6E6] leading-relaxed mt-4">
                                You can control cookie settings through your browser. Disabling cookies may affect some website features.
                            </p>
                        </section>

                        {/* Section 7 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                7. Children's Privacy
                            </h2>
                            <p className="text-[#E6E6E6] leading-relaxed">
                                We are committed to protecting the privacy of children. For students under 18 years of age, we require parental or guardian consent for data collection. Parents/guardians have the right to review, modify, or request deletion of their child's personal information.
                            </p>
                        </section>

                        {/* Section 8 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                8. Data Retention
                            </h2>
                            <p className="text-[#E6E6E6] leading-relaxed">
                                We retain personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Academic records may be retained for a longer period as required by educational regulations. Upon request, we will delete or anonymize your data unless retention is required by law.
                            </p>
                        </section>

                        {/* Section 9 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                9. Changes to This Policy
                            </h2>
                            <p className="text-[#E6E6E6] leading-relaxed">
                                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page with a revised "Last updated" date. We encourage you to review this policy periodically.
                            </p>
                        </section>

                        {/* Section 10 - Contact */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-5 h-5 text-[#D0A933]" suppressHydrationWarning />
                                <h2 className="text-2xl font-serif font-bold text-[#D0A933]">
                                    10. Contact Us
                                </h2>
                            </div>
                            <p className="text-[#E6E6E6] leading-relaxed mb-4">
                                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:
                            </p>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <p className="text-white font-semibold">Satyakul Paathshala</p>
                                <p className="text-[#CFE6EA] text-sm">Email: privacy@satyakulpathshala.com</p>
                                <p className="text-[#CFE6EA] text-sm">You may also visit us at our physical premises during office hours.</p>
                            </div>
                        </section>

                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 pt-8 border-t border-white/10 text-center">
                        <p className="text-[#CFE6EA] mb-6">
                            Your privacy matters to us. Thank you for trusting Satyakul Paathshala.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/terms"
                                className="inline-flex items-center justify-center border border-white/20 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/5 smooth-transition uppercase tracking-widest text-sm"
                            >
                                View Terms & Conditions
                            </Link>
                            <Link
                                href="/courses"
                                className="inline-flex items-center justify-center bg-[#D0A933] text-[#0B0B0B] font-bold px-6 py-3 rounded-xl hover:bg-[#b8952d] smooth-transition shadow-xl uppercase tracking-widest text-sm"
                            >
                                Explore Courses
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] border-t border-white/5">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-muted-foreground text-sm">
                        © 2026 Satyakul Paathshala. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
