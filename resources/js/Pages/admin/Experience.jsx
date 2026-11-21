import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    BriefcaseBusiness,
    CheckCircle2,
    Pencil,
    Plus,
    Save,
    Search,
    Trash2,
    X,
} from "lucide-react";
import { Head, router, useForm, usePage } from "@inertiajs/react";

const emptyForm = {
    eyebrow: "",
    title: "",
    description: "",
    icon: "Code2",
    sort_order: 0,
};

const iconOptions = [
    "Code2",
    "Server",
    "BriefcaseBusiness",
    "Wrench",
    "Network",
    "Router",
    "Package",
];

function FieldError({ message }) {
    if (!message) return null;

    return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

export default function ExperienceAdminPage({ experiences = [] }) {
    const flash = usePage().props.flash ?? {};
    const form = useForm(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");

    const filteredExperiences = experiences.filter((experience) =>
        `${experience.eyebrow} ${experience.title}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const resetForm = () => {
        form.reset();
        form.setData(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: resetForm,
        };

        if (editingId) {
            form.put(route("admin.experiences.update", editingId), options);
        } else {
            form.post(route("admin.experiences.store"), options);
        }
    };

    const handleEdit = (experience) => {
        setEditingId(experience.id);
        form.setData({
            eyebrow: experience.eyebrow,
            title: experience.title,
            description: experience.description,
            icon: experience.icon,
            sort_order: experience.sort_order ?? 0,
        });
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus pengalaman ini?")) {
            router.delete(route("admin.experiences.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10";

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Pengalaman" />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {flash.status && (
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                        <CheckCircle2 size={18} />
                        {flash.status}
                    </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <BriefcaseBusiness size={16} />
                            <span>Portfolio Management</span>
                            <span>/</span>
                            <span>Experiences</span>
                        </div>
                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            Experience Management
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Susun riwayat kerja dan pengalaman independen pada portofolio.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm">
                        <BriefcaseBusiness size={17} className="text-emerald-600" />
                        <span className="font-medium text-slate-700">
                            {experiences.length} Pengalaman
                        </span>
                    </div>
                </div>

                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                        <div>
                            <h2 className="font-semibold text-slate-900">
                                {editingId ? "Edit Pengalaman" : "Tambah Pengalaman"}
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Masukkan informasi pengalaman yang ingin ditampilkan.
                            </p>
                        </div>

                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                                aria-label="Batal mengedit"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Label atas
                                </label>
                                <input
                                    type="text"
                                    value={form.data.eyebrow}
                                    onChange={(event) =>
                                        form.setData("eyebrow", event.target.value)
                                    }
                                    placeholder="Contoh: Independent"
                                    className={inputClass}
                                    required
                                />
                                <FieldError message={form.errors.eyebrow} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Judul
                                </label>
                                <input
                                    type="text"
                                    value={form.data.title}
                                    onChange={(event) =>
                                        form.setData("title", event.target.value)
                                    }
                                    placeholder="Contoh: Freelance IT Support"
                                    className={inputClass}
                                    required
                                />
                                <FieldError message={form.errors.title} />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Deskripsi
                            </label>
                            <textarea
                                rows={3}
                                value={form.data.description}
                                onChange={(event) =>
                                    form.setData("description", event.target.value)
                                }
                                className={inputClass}
                                required
                            />
                            <FieldError message={form.errors.description} />
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Ikon
                                </label>
                                <select
                                    value={form.data.icon}
                                    onChange={(event) =>
                                        form.setData("icon", event.target.value)
                                    }
                                    className={inputClass}
                                >
                                    {iconOptions.map((icon) => (
                                        <option key={icon} value={icon}>
                                            {icon}
                                        </option>
                                    ))}
                                </select>
                                <FieldError message={form.errors.icon} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Urutan tampil
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={form.data.sort_order}
                                    onChange={(event) =>
                                        form.setData("sort_order", event.target.value)
                                    }
                                    className={inputClass}
                                />
                                <FieldError message={form.errors.sort_order} />
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                                >
                                    Batal
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
                            >
                                {editingId ? <Save size={16} /> : <Plus size={16} />}
                                {editingId ? "Simpan Perubahan" : "Tambah Pengalaman"}
                            </button>
                        </div>
                    </form>
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Daftar Pengalaman
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Semua pengalaman yang tersimpan.
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-xs">
                            <Search
                                size={17}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Cari pengalaman..."
                                className={`${inputClass} pl-10`}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Pengalaman</th>
                                    <th className="px-6 py-4 font-semibold">Ikon</th>
                                    <th className="px-6 py-4 font-semibold">Urutan</th>
                                    <th className="px-6 py-4 text-right font-semibold">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredExperiences.length > 0 ? (
                                    filteredExperiences.map((experience) => (
                                        <tr key={experience.id} className="transition hover:bg-slate-50/70">
                                            <td className="px-6 py-4">
                                                <p className="text-xs font-semibold text-emerald-600">
                                                    {experience.eyebrow}
                                                </p>
                                                <p className="font-medium text-slate-800">
                                                    {experience.title}
                                                </p>
                                                <p className="mt-1 max-w-xl text-xs text-slate-400">
                                                    {experience.description}
                                                </p>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                                                {experience.icon}
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4 tabular-nums text-slate-500">
                                                {experience.sort_order ?? 0}
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(experience)}
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(experience.id)}
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center">
                                            <BriefcaseBusiness className="mx-auto mb-3 text-slate-300" size={30} />
                                            <p className="font-medium text-slate-600">
                                                Pengalaman tidak ditemukan
                                            </p>
                                            <p className="mt-1 text-xs text-slate-400">
                                                Coba gunakan kata kunci lain.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-slate-100 px-6 py-4">
                        <p className="text-xs text-slate-400">
                            Menampilkan {filteredExperiences.length} dari {experiences.length} pengalaman
                        </p>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
