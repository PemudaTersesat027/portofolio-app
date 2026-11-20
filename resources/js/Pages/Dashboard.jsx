import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowUpRight,
    BriefcaseBusiness,
    Check,
    CheckCircle2,
    ExternalLink,
    FolderKanban,
    Mail,
    MapPin,
    Sparkles,
    UserRound,
    Wrench,
} from 'lucide-react';

const upcomingFeatures = [
    {
        title: 'Keahlian',
        description: 'Atur kategori skill dan daftar teknologi yang Anda kuasai.',
        icon: Wrench,
    },
    {
        title: 'Proyek',
        description: 'Tambahkan portofolio proyek beserta gambar, tag, dan tautan.',
        icon: FolderKanban,
    },
    {
        title: 'Pengalaman',
        description: 'Susun riwayat kerja dan pengalaman independen Anda.',
        icon: BriefcaseBusiness,
    },
];

export default function Dashboard({ profile }) {
    const flash = usePage().props.flash ?? {};

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold tracking-wider text-[#006948] uppercase">
                        Ringkasan
                    </span>
                    <h1 className="font-display text-2xl text-[#0F172A] sm:text-3xl">
                        Dashboard Portofolio
                    </h1>
                    <p className="text-sm text-[#64748B]">
                        Setup identitas selesai. Kelola konten portofolio Anda dari sini.
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6">
                {flash.status && (
                    <div className="flex items-center gap-3 rounded-xl border border-[#BBF7D0] bg-[#F0F9F4] px-4 py-3 text-sm font-medium text-[#00543A]">
                        <CheckCircle2 size={18} />
                        {flash.status}
                    </div>
                )}

                <section className="relative overflow-hidden rounded-2xl bg-[#006948] p-6 text-white sm:p-8">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full border border-white/10"
                    />
                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                                <Sparkles size={24} />
                            </span>
                            <div>
                                <h2 className="font-display text-xl sm:text-2xl">
                                    Portofolio Anda sudah aktif
                                </h2>
                                <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
                                    Identitas dan foto utama tersimpan. Tahap berikutnya
                                    menambahkan keahlian dan proyek melalui dashboard.
                                </p>
                            </div>
                        </div>

                        <Button
                            asChild
                            className="h-10 shrink-0 rounded-lg bg-white px-4 text-sm font-semibold text-[#006948] hover:bg-white/90"
                        >
                            <Link href={route('welcome')}>
                                Lihat portofolio
                                <ArrowUpRight size={16} />
                            </Link>
                        </Button>
                    </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-5">
                    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 lg:col-span-3">
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="font-display text-lg text-[#0F172A]">
                                Identitas portofolio
                            </h3>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F5EE] px-3 py-1 text-xs font-semibold text-[#006948]">
                                <CheckCircle2 size={14} />
                                Selesai
                            </span>
                        </div>

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F1F5F9]">
                                {profile.avatar ? (
                                    <img
                                        src={profile.avatar}
                                        alt={profile.name}
                                        className="size-full object-cover"
                                    />
                                ) : (
                                    <UserRound size={30} className="text-[#94A3B8]" />
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                <div>
                                    <p className="font-display text-xl text-[#0F172A]">
                                        {profile.name}
                                    </p>
                                    <p className="text-sm font-medium text-[#006948]">
                                        {profile.role}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#64748B]">
                                    <span className="inline-flex items-center gap-1.5">
                                        <MapPin size={15} />
                                        {profile.location}
                                    </span>
                                    <span className="inline-flex items-center gap-1.5">
                                        <Mail size={15} />
                                        {profile.email}
                                    </span>
                                </div>

                                {profile.setupCompletedAt && (
                                    <p className="text-xs text-[#94A3B8]">
                                        Diselesaikan pada{' '}
                                        {new Date(profile.setupCompletedAt).toLocaleDateString(
                                            'id-ID',
                                            {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            },
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 lg:col-span-2">
                        <h3 className="mb-5 font-display text-lg text-[#0F172A]">
                            Progres setup
                        </h3>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <span className="flex size-8 items-center justify-center rounded-full bg-[#006948] text-white">
                                    <Check size={16} />
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-[#0F172A]">
                                        Akun admin
                                    </p>
                                    <p className="text-xs text-[#94A3B8]">Sudah dibuat</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="flex size-8 items-center justify-center rounded-full bg-[#006948] text-white">
                                    <Check size={16} />
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-[#0F172A]">
                                        Identitas &amp; foto
                                    </p>
                                    <p className="text-xs text-[#94A3B8]">Sudah lengkap</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="flex size-8 items-center justify-center rounded-full bg-[#F1F5F9] text-xs font-semibold text-[#94A3B8]">
                                    3
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-[#94A3B8]">
                                        Keahlian &amp; proyek
                                    </p>
                                    <p className="text-xs text-[#94A3B8]">Tahap berikutnya</p>
                                </div>
                                <span className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-semibold text-[#64748B]">
                                    Segera
                                </span>
                            </div>
                        </div>
                    </section>
                </div>

                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-display text-lg text-[#0F172A]">
                            Menyusul di tahap berikutnya
                        </h3>
                        <Link
                            href={route('welcome')}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-[#006948] hover:underline"
                        >
                            Pratinjau portofolio
                            <ExternalLink size={14} />
                        </Link>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {upcomingFeatures.map((feature) => {
                            const Icon = feature.icon;

                            return (
                                <div
                                    key={feature.title}
                                    className="flex flex-col gap-3 rounded-2xl border border-dashed border-[#CBD5E1] bg-white p-5"
                                >
                                    <div className="flex items-center justify-between">
                                        <Icon size={22} className="text-[#94A3B8]" />
                                        <span className="rounded-full bg-[#F1F5F9] px-2.5 py-1 text-[10px] font-semibold text-[#64748B]">
                                            Segera
                                        </span>
                                    </div>
                                    <h4 className="font-display text-base text-[#0F172A]">
                                        {feature.title}
                                    </h4>
                                    <p className="text-sm leading-6 text-[#64748B]">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
