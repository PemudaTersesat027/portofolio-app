import { useEffect, useRef, useState } from "react";
import InputError from "@/Components/InputError";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    CheckCircle2,
    ImagePlus,
    Loader2,
    Save,
    UserRound,
} from "lucide-react";

export default function Identity({ profile }) {
    const flash = usePage().props.flash ?? {};
    const [previews, setPreviews] = useState({
        avatar: null,
        hero_image: null,
    });

    const form = useForm({
        name: profile.name,
        role: profile.role,
        location: profile.location,
        email: profile.email,
        description: profile.description,
        github_url: profile.github_url ?? "",
        linkedin_url: profile.linkedin_url ?? "",
        about: profile.about,
        avatar: "",
        hero_image: "",
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
        form.setData(field, file);

        setPreviews((current) => {
            if (current[field]) {
                URL.revokeObjectURL(current[field]);
            }

            return { ...current, [field]: file ? URL.createObjectURL(file) : null };
        });
    };

    const submit = (event) => {
        event.preventDefault();

        form.put(route("admin.identity.update"), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                form.reset("avatar", "hero_image");
                setPreviews({ avatar: null, hero_image: null });
            },
        });
    };

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10";

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Identitas" />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {flash.status && (
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                        <CheckCircle2 size={18} />
                        {flash.status}
                    </div>
                )}

                <div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <UserRound size={16} />
                        <span>Portfolio Management</span>
                        <span>/</span>
                        <span>Identity</span>
                    </div>
                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                        Identitas Portofolio
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Perbarui data diri dan foto yang tampil di halaman portofolio.
                    </p>
                </div>

                {form.processing && form.progress && (
                    <div className="flex flex-col gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                            <Loader2 size={14} className="animate-spin" />
                            Mengunggah {form.progress.percentage}%
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-emerald-100">
                            <div
                                className="h-full rounded-full bg-emerald-600 transition-all"
                                style={{ width: `${form.progress.percentage}%` }}
                            />
                        </div>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="font-semibold text-slate-900">Data dasar</h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Informasi utama yang ditampilkan pada hero dan kontak.
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Nama tampilan
                                </label>
                                <input
                                    type="text"
                                    value={form.data.name}
                                    onChange={(event) =>
                                        form.setData("name", event.target.value)
                                    }
                                    className={inputClass}
                                    required
                                />
                                <InputError message={form.errors.name} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Email kontak
                                </label>
                                <input
                                    type="email"
                                    value={form.data.email}
                                    onChange={(event) =>
                                        form.setData("email", event.target.value)
                                    }
                                    className={inputClass}
                                    required
                                />
                                <InputError message={form.errors.email} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Peran / headline
                                </label>
                                <input
                                    type="text"
                                    value={form.data.role}
                                    onChange={(event) =>
                                        form.setData("role", event.target.value)
                                    }
                                    className={inputClass}
                                    required
                                />
                                <InputError message={form.errors.role} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Lokasi
                                </label>
                                <input
                                    type="text"
                                    value={form.data.location}
                                    onChange={(event) =>
                                        form.setData("location", event.target.value)
                                    }
                                    className={inputClass}
                                    required
                                />
                                <InputError message={form.errors.location} />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Deskripsi singkat
                            </label>
                            <textarea
                                rows={3}
                                maxLength={500}
                                value={form.data.description}
                                onChange={(event) =>
                                    form.setData("description", event.target.value)
                                }
                                className={inputClass}
                                required
                            />
                            <InputError message={form.errors.description} />
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    URL GitHub
                                </label>
                                <input
                                    type="url"
                                    value={form.data.github_url}
                                    onChange={(event) =>
                                        form.setData("github_url", event.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="https://github.com/username"
                                />
                                <InputError message={form.errors.github_url} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    URL LinkedIn
                                </label>
                                <input
                                    type="url"
                                    value={form.data.linkedin_url}
                                    onChange={(event) =>
                                        form.setData("linkedin_url", event.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="https://linkedin.com/in/username"
                                />
                                <InputError message={form.errors.linkedin_url} />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Tentang saya
                            </label>
                            <textarea
                                rows={6}
                                maxLength={1000}
                                value={form.data.about}
                                onChange={(event) =>
                                    form.setData("about", event.target.value)
                                }
                                className={inputClass}
                                required
                            />
                            <InputError message={form.errors.about} />
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="font-semibold text-slate-900">Foto</h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Kosongkan jika tidak ingin mengganti foto yang tersimpan.
                        </p>

                        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Foto profil
                                </label>
                                <div className="mb-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                    {previews.avatar || profile.avatar ? (
                                        <img
                                            src={previews.avatar || profile.avatar}
                                            alt="Pratinjau foto profil"
                                            className="size-full object-cover"
                                        />
                                    ) : (
                                        <ImagePlus size={26} className="text-slate-300" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(event) =>
                                        handleFileChange(
                                            "avatar",
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                    className={inputClass}
                                />
                                <InputError message={form.errors.avatar} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Foto utama (hero)
                                </label>
                                <div className="mb-3 h-24 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                    {previews.hero_image || profile.heroImage ? (
                                        <img
                                            src={previews.hero_image || profile.heroImage}
                                            alt="Pratinjau foto utama"
                                            className="size-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex size-full items-center justify-center">
                                            <ImagePlus size={26} className="text-slate-300" />
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(event) =>
                                        handleFileChange(
                                            "hero_image",
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                    className={inputClass}
                                />
                                <InputError message={form.errors.hero_image} />
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
                        >
                            <Save size={16} />
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
