import { Link } from '@inertiajs/react';
import {
    ArrowUpRight,
    CheckCircle2,
    Fingerprint,
    LayoutTemplate,
    ShieldCheck,
} from 'lucide-react';

export default function AuthLayout({
    children,
    title,
    description,
    eyebrow,
    step,
    footer,
}) {
    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
            <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
                <aside className="relative hidden overflow-hidden bg-[#006948] px-12 py-14 text-white lg:flex lg:flex-col lg:justify-between">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full border border-white/10"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-32 -left-20 size-96 rounded-full bg-white/5"
                    />

                    <Link href={route('welcome')} className="relative flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-white font-display text-sm text-[#006948]">
                            EA
                        </span>
                        <span className="flex flex-col">
                            <span className="font-display text-base">Erick Al Aziz</span>
                            <span className="text-xs text-white/60">Portfolio Studio</span>
                        </span>
                    </Link>

                    <div className="relative max-w-lg">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-white/80 uppercase">
                            <Fingerprint size={14} />
                            First-run setup
                        </span>

                        <h1 className="mt-6 font-display text-4xl leading-tight text-white sm:text-5xl">
                            Bangun cerita digital yang terasa seperti Anda.
                        </h1>

                        <p className="mt-5 text-base leading-7 text-white/70">
                            Dua langkah singkat untuk menyiapkan akun pengelola dan
                            identitas portofolio. Setelah itu, semua kontrol ada di dashboard.
                        </p>

                        <div className="mt-10 grid gap-3">
                            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
                                <ShieldCheck size={20} className="shrink-0 text-[#D8F3E6]" />
                                <div>
                                    <p className="text-sm font-semibold">Akun pengelola</p>
                                    <p className="text-xs text-white/60">
                                        Satu akun admin untuk mengelola seluruh portofolio.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 p-4">
                                <LayoutTemplate size={20} className="shrink-0 text-[#D8F3E6]" />
                                <div>
                                    <p className="text-sm font-semibold">Identitas &amp; foto</p>
                                    <p className="text-xs text-white/60">
                                        Foto profil dan foto utama wajib diunggah di sini.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {step && (
                            <div className="mt-8 flex items-center gap-2 text-sm text-white/70">
                                <CheckCircle2 size={16} className="text-[#D8F3E6]" />
                                Langkah {step} dari 2
                            </div>
                        )}
                    </div>

                    <p className="relative text-xs text-white/50">
                        © {new Date().getFullYear()} Erick Al Aziz. All rights reserved.
                    </p>
                </aside>

                <main className="flex items-center justify-center px-5 py-10 sm:px-10 lg:px-14">
                    <div className="w-full max-w-xl">
                        <div className="mb-8 flex items-center justify-between lg:hidden">
                            <Link href={route('welcome')} className="flex items-center gap-3">
                                <span className="flex size-10 items-center justify-center rounded-xl bg-[#006948] font-display text-sm text-white">
                                    EA
                                </span>
                                <span className="font-display text-base text-[#0F172A]">
                                    Erick Al Aziz
                                </span>
                            </Link>
                            {step && (
                                <span className="text-xs font-semibold text-[#006948]">
                                    Langkah {step} dari 2
                                </span>
                            )}
                        </div>

                        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-9">
                            {(eyebrow || title || description) && (
                                <div className="mb-8 flex flex-col gap-2">
                                    {eyebrow && (
                                        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#006948] uppercase">
                                            {eyebrow}
                                            <ArrowUpRight size={13} />
                                        </span>
                                    )}
                                    {title && (
                                        <h2 className="font-display text-2xl leading-tight text-[#0F172A] sm:text-3xl">
                                            {title}
                                        </h2>
                                    )}
                                    {description && (
                                        <p className="text-sm leading-6 text-[#64748B]">
                                            {description}
                                        </p>
                                    )}
                                </div>
                            )}

                            {children}
                        </div>

                        {footer && (
                            <div className="mt-6 text-center text-sm text-[#64748B]">
                                {footer}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
