import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';
import {
    ArrowRight,
    ImagePlus,
    Loader2,
    Mail,
    MapPin,
    Sparkles,
    UserRound,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Identity({ profile }) {
    const [previews, setPreviews] = useState({
        avatar: null,
        hero_image: null,
    });

    const { data, setData, post, processing, progress, errors } = useForm({
        name: profile.name,
        role: profile.role,
        location: profile.location,
        email: profile.email,
        description: profile.description,
        github_url: profile.github_url,
        linkedin_url: profile.linkedin_url,
        about: profile.about,
        avatar: '',
        hero_image: '',
    });

    const previewsRef = useRef(previews);
    previewsRef.current = previews;

    useEffect(() => {
        return () => {
            Object.values(previewsRef.current).forEach((url) => {
                if (url) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, []);

    const handleFileChange = (field, file) => {
        setData(field, file);

        if (!file) {
            setPreviews((current) => ({ ...current, [field]: null }));

            return;
        }

        const previewUrl = URL.createObjectURL(file);

        setPreviews((current) => {
            if (current[field]) {
                URL.revokeObjectURL(current[field]);
            }

            return { ...current, [field]: previewUrl };
        });
    };

    const submit = (event) => {
        event.preventDefault();

        post(route('setup.identity'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthLayout
            eyebrow="Langkah 2"
            title="Lengkapi identitas"
            description="Data dan foto di bawah ini akan tampil langsung di halaman portofolio Anda."
            step={2}
            footer="Foto profil dan foto utama wajib diunggah sebelum setup selesai."
        >
            <Head title="Setup — Identitas Portofolio" />

            {processing && progress && (
                <div className="mb-6 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#006948]">
                        <Loader2 size={14} className="animate-spin" />
                        Mengunggah {progress.percentage}%
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                        <div
                            className="h-full rounded-full bg-[#006948] transition-all"
                            style={{ width: `${progress.percentage}%` }}
                        />
                    </div>
                </div>
            )}

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-semibold text-[#0F172A]">
                            Nama tampilan
                        </label>
                        <div className="relative">
                            <UserRound
                                size={17}
                                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#94A3B8]"
                            />
                            <Input
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                                className="h-11 pl-10"
                                required
                            />
                        </div>
                        <InputError message={errors.name} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-semibold text-[#0F172A]">
                            Email kontak
                        </label>
                        <div className="relative">
                            <Mail
                                size={17}
                                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#94A3B8]"
                            />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                                className="h-11 pl-10"
                                required
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="role" className="text-sm font-semibold text-[#0F172A]">
                            Peran / headline
                        </label>
                        <Input
                            id="role"
                            name="role"
                            value={data.role}
                            onChange={(event) => setData('role', event.target.value)}
                            placeholder="Developer & IT Enthusiast"
                            required
                        />
                        <InputError message={errors.role} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="location" className="text-sm font-semibold text-[#0F172A]">
                            Lokasi
                        </label>
                        <div className="relative">
                            <MapPin
                                size={17}
                                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#94A3B8]"
                            />
                            <Input
                                id="location"
                                name="location"
                                value={data.location}
                                onChange={(event) => setData('location', event.target.value)}
                                placeholder="Indonesia"
                                className="pl-10"
                                required
                            />
                        </div>
                        <InputError message={errors.location} />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-sm font-semibold text-[#0F172A]">
                        Deskripsi singkat
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={data.description}
                        onChange={(event) => setData('description', event.target.value)}
                        placeholder="Kalimat singkat yang tampil di hero section."
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-[#94A3B8] focus:border-[#006948] focus:ring-3 focus:ring-[#006948]/15"
                        required
                    />
                    <InputError message={errors.description} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="github_url" className="text-sm font-semibold text-[#0F172A]">
                            URL GitHub
                        </label>
                        <Input
                            id="github_url"
                            name="github_url"
                            type="url"
                            value={data.github_url}
                            onChange={(event) => setData('github_url', event.target.value)}
                            placeholder="https://github.com/username"
                        />
                        <InputError message={errors.github_url} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="linkedin_url" className="text-sm font-semibold text-[#0F172A]">
                            URL LinkedIn
                        </label>
                        <Input
                            id="linkedin_url"
                            name="linkedin_url"
                            type="url"
                            value={data.linkedin_url}
                            onChange={(event) => setData('linkedin_url', event.target.value)}
                            placeholder="https://linkedin.com/in/username"
                        />
                        <InputError message={errors.linkedin_url} />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="about" className="text-sm font-semibold text-[#0F172A]">
                        Tentang saya
                    </label>
                    <textarea
                        id="about"
                        name="about"
                        rows={4}
                        value={data.about}
                        onChange={(event) => setData('about', event.target.value)}
                        placeholder="Ceritakan singkat latar belakang dan fokus Anda."
                        className="w-full rounded-lg border border-input bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-[#94A3B8] focus:border-[#006948] focus:ring-3 focus:ring-[#006948]/15"
                        required
                    />
                    <InputError message={errors.about} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-[#0F172A]">
                            Foto profil <span className="text-[#DC2626]">*</span>
                        </span>
                        <div className="flex items-center gap-3 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-3">
                            <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E2E8F0]">
                                {previews.avatar || profile.avatar ? (
                                    <img
                                        src={previews.avatar || profile.avatar}
                                        alt="Pratinjau foto profil"
                                        className="size-full object-cover"
                                    />
                                ) : (
                                    <UserRound size={22} className="text-[#94A3B8]" />
                                )}
                            </div>
                            <Input
                                id="avatar"
                                name="avatar"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={(event) =>
                                    handleFileChange('avatar', event.target.files?.[0] ?? null)
                                }
                                className="h-auto border-0 p-0 file:mr-3 file:rounded-lg file:border-0 file:bg-[#E8F5EE] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#006948] hover:file:bg-[#D8F3E6]"
                                required
                            />
                        </div>
                        <InputError message={errors.avatar} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-[#0F172A]">
                            Foto utama <span className="text-[#DC2626]">*</span>
                        </span>
                        <div className="flex items-center gap-3 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-3">
                            <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#E2E8F0]">
                                {previews.hero_image || profile.heroImage ? (
                                    <img
                                        src={previews.hero_image || profile.heroImage}
                                        alt="Pratinjau foto utama"
                                        className="size-full object-cover"
                                    />
                                ) : (
                                    <ImagePlus size={22} className="text-[#94A3B8]" />
                                )}
                            </div>
                            <Input
                                id="hero_image"
                                name="hero_image"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={(event) =>
                                    handleFileChange('hero_image', event.target.files?.[0] ?? null)
                                }
                                className="h-auto border-0 p-0 file:mr-3 file:rounded-lg file:border-0 file:bg-[#E8F5EE] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#006948] hover:file:bg-[#D8F3E6]"
                                required
                            />
                        </div>
                        <InputError message={errors.hero_image} />
                    </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-[#F0F9F4] p-4 text-sm text-[#00543A]">
                    <Sparkles size={18} className="mt-0.5 shrink-0" />
                    <p>
                        Setelah disimpan, Anda akan dibawa ke dashboard. Keahlian dan proyek
                        bisa ditambahkan kemudian.
                    </p>
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="h-11 w-full rounded-lg bg-[#006948] text-sm font-semibold text-white transition hover:bg-[#00543A]"
                >
                    {processing ? 'Menyimpan...' : 'Selesaikan setup'}
                    {!processing && <ArrowRight size={17} />}
                </Button>
            </form>
        </AuthLayout>
    );
}
