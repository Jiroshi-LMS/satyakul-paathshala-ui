'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { AlertTriangle, FileText, ArrowLeft } from 'lucide-react';

export default function TermsAndConditionsPage() {
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
                            <div className="w-14 h-14 rounded-2xl bg-[#D0A933]/10 flex items-center justify-center border border-[#D0A933]/20">
                                <FileText className="w-7 h-7 text-[#D0A933]" suppressHydrationWarning />
                            </div>
                            <div>
                                <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
                                    Terms & Conditions
                                </h1>
                                <p className="text-[#CFE6EA] text-sm mt-1">Last updated: {lastUpdated}</p>
                            </div>
                        </div>
                    </div>

                    {/* CRITICAL PAYMENT WARNING */}
                    <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-red-500/10 border-2 border-red-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                <AlertTriangle className="w-6 h-6 text-red-400" suppressHydrationWarning />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-red-400 mb-3 uppercase tracking-wide">
                                    ⚠️ Critical Payment Notice
                                </h2>
                                <p className="text-white leading-relaxed mb-4">
                                    <strong>Satyakul Paathshala does NOT accept any online payments through this platform at this time.</strong>
                                </p>
                                <p className="text-[#E6E6E6] leading-relaxed mb-4">
                                    All payments for courses, enrollments, and any other services are accepted <strong className="text-white">ONLY through offline mediums</strong> (cash, cheque, or direct bank transfer at our physical premises).
                                </p>
                                <p className="text-[#E6E6E6] leading-relaxed mb-4">
                                    <strong className="text-red-400">Do NOT make any online payment</strong> if anyone claims to represent Satyakul Paathshala and asks for payment through UPI, online wallets, or any digital platform — unless explicitly authorized and verified by the owner/principal in person.
                                </p>
                                <p className="text-red-300 font-semibold">
                                    If you make any unauthorized online payment, you do so entirely at your own risk, and Satyakul Paathshala will NOT be held responsible for any loss or fraud.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Terms Content */}
                    <div className="prose prose-invert max-w-none space-y-10">

                        {/* Section 1 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-[#E6E6E6] leading-relaxed mb-4">
                                By accessing and using the Satyakul Paathshala website and enrolling in our courses, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
                            </p>
                            <p className="text-[#E6E6E6] leading-relaxed">
                                These terms apply to all students, parents/guardians, and visitors of our platform and physical premises.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                2. Course Enrollment & Admission
                            </h2>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li>Enrollment in any course is subject to availability and eligibility criteria.</li>
                                <li>All admission decisions are at the sole discretion of Satyakul Paathshala.</li>
                                <li>Students must provide accurate and complete information during registration.</li>
                                <li>Parents/guardians must consent to enrollment for students under 18 years of age.</li>
                                <li>We reserve the right to cancel or modify course offerings without prior notice.</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                3. Fees & Payment Policy
                            </h2>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li><strong className="text-white">All payments are accepted OFFLINE ONLY</strong> — at our physical premises via cash, cheque, or direct bank transfer.</li>
                                <li>Course fees must be paid in full or as per agreed installment plans before the commencement of classes.</li>
                                <li>Fee receipts will be issued only upon payment confirmation.</li>
                                <li>Any fee revision will be communicated in advance and will apply to new enrollments only.</li>
                                <li>We do not accept payments through any third-party agents or unauthorized persons.</li>
                            </ul>
                        </section>

                        {/* Section 4 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                4. Refund & Cancellation Policy
                            </h2>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li>Refund requests must be submitted in writing within 7 days of enrollment.</li>
                                <li>A processing fee of up to 20% may be deducted from refunds.</li>
                                <li>No refunds will be provided after the course has commenced or after 7 days from enrollment, whichever is earlier.</li>
                                <li>Refunds, if approved, will be processed within 15-30 business days.</li>
                                <li>Course materials, once issued, are non-refundable.</li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                5. Student Conduct & Discipline
                            </h2>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li>Students are expected to maintain discipline, respect, and decorum at all times.</li>
                                <li>Any form of misconduct, harassment, or disruptive behavior will not be tolerated.</li>
                                <li>The institute reserves the right to suspend or expel students for violations without refund.</li>
                                <li>Students must attend classes regularly and maintain minimum attendance requirements.</li>
                                <li>Use of mobile phones during classes is strictly prohibited unless authorized.</li>
                            </ul>
                        </section>

                        {/* Section 6 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                6. Intellectual Property
                            </h2>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li>All course materials, content, and resources are the intellectual property of Satyakul Paathshala.</li>
                                <li>Copying, reproducing, distributing, or sharing course materials without authorization is strictly prohibited.</li>
                                <li>Recording of classes (audio/video) is not permitted without prior written consent.</li>
                                <li>Violation of intellectual property rights may result in legal action.</li>
                            </ul>
                        </section>

                        {/* Section 7 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                7. Limitation of Liability
                            </h2>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li>Satyakul Paathshala is not liable for any indirect, incidental, or consequential damages arising from the use of our services.</li>
                                <li>We do not guarantee specific academic results or outcomes.</li>
                                <li>The institute is not responsible for personal belongings or valuables.</li>
                                <li>We are not liable for any losses due to events beyond our reasonable control (force majeure).</li>
                            </ul>
                        </section>

                        {/* Section 8 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                8. Privacy & Data Protection
                            </h2>
                            <ul className="text-[#E6E6E6] space-y-3 list-disc list-inside">
                                <li>We collect and process personal information in accordance with our Privacy Policy.</li>
                                <li>Student data will be used solely for educational and administrative purposes.</li>
                                <li>We do not sell or share personal information with third parties for marketing purposes.</li>
                                <li>Students/parents may request access to or deletion of their data by contacting us.</li>
                            </ul>
                        </section>

                        {/* Section 9 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                9. Modifications to Terms
                            </h2>
                            <p className="text-[#E6E6E6] leading-relaxed">
                                Satyakul Paathshala reserves the right to modify, update, or change these Terms and Conditions at any time. Changes will be effective immediately upon posting on this website. Continued use of our services after any modifications constitutes acceptance of the updated terms.
                            </p>
                        </section>

                        {/* Section 10 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                10. Governing Law & Jurisdiction
                            </h2>
                            <p className="text-[#E6E6E6] leading-relaxed">
                                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in the location where Satyakul Paathshala is registered.
                            </p>
                        </section>

                        {/* Section 11 */}
                        <section className="bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/5">
                            <h2 className="text-2xl font-serif font-bold text-[#D0A933] mb-4">
                                11. Contact Information
                            </h2>
                            <p className="text-[#E6E6E6] leading-relaxed mb-4">
                                For any questions, concerns, or clarifications regarding these Terms and Conditions, please contact us:
                            </p>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <p className="text-white font-semibold">Satyakul Paathshala</p>
                                <p className="text-[#CFE6EA] text-sm">Email: contact@satyakulpathshala.com</p>
                                <p className="text-[#CFE6EA] text-sm">Visit us at our physical premises for any payment-related queries.</p>
                            </div>
                        </section>

                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 text-center">
                        <p className="text-[#CFE6EA] mb-6">
                            By using our services, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
                        </p>
                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center bg-[#D0A933] text-[#0B0B0B] font-bold px-8 py-3.5 rounded-xl hover:bg-[#b8952d] smooth-transition shadow-xl uppercase tracking-widest text-sm"
                        >
                            Explore Our Courses
                        </Link>
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
