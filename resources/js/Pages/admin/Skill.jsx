import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    CheckCircle2,
    Code2,
    Layers,
    Pencil,
    Plus,
    Save,
    Search,
    Trash2,
    X,
} from "lucide-react";
import { Head, router, useForm, usePage } from "@inertiajs/react";

const emptyForm = {
    name: "",
    category: "",
    level: "Intermediate",
    sort_order: 0,
};

const levelStyles = {
    Beginner: "bg-slate-100 text-slate-600",
    Intermediate: "bg-blue-50 text-blue-700",
    Advanced: "bg-emerald-50 text-emerald-700",
    Expert: "bg-purple-50 text-purple-700",
};

function FieldError({ message }) {
    if (!message) return null;

    return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

export default function SkillAdminPage({ skills = [] }) {
    const flash = usePage().props.flash ?? {};
    const form = useForm(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");

    const filteredSkills = skills.filter((skill) =>
        `${skill.name} ${skill.category}`
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
            form.put(route("admin.skills.update", editingId), options);
        } else {
            form.post(route("admin.skills.store"), options);
        }
    };

    const handleEdit = (skill) => {
        setEditingId(skill.id);
        form.setData({
            name: skill.name,
            category: skill.category,
            level: skill.level,
            sort_order: skill.sort_order ?? 0,
        });
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus skill ini?")) {
            router.delete(route("admin.skills.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10";

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Keahlian" />

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
                            <Layers size={16} />
                            <span>Portfolio Management</span>
                            <span>/</span>
                            <span>Skills</span>
                        </div>

                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            Skill Management
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Kelola keahlian dan kompetensi yang ditampilkan pada portofolio.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm">
                        <Code2 size={17} className="text-emerald-600" />
                        <span className="font-medium text-slate-700">
                            {skills.length} Skills
                        </span>
                    </div>
                </div>

                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                        <div>
                            <h2 className="font-semibold text-slate-900">
                                {editingId ? "Edit Skill" : "Tambah Skill"}
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Masukkan informasi keahlian kamu.
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
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Nama Skill
                                </label>
                                <input
                                    type="text"
                                    value={form.data.name}
                                    onChange={(event) =>
                                        form.setData("name", event.target.value)
                                    }
                                    placeholder="Contoh: React.js"
                                    className={inputClass}
                                    required
                                />
                                <FieldError message={form.errors.name} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Kategori
                                </label>
                                <input
                                    type="text"
                                    value={form.data.category}
                                    onChange={(event) =>
                                        form.setData("category", event.target.value)
                                    }
                                    placeholder="Contoh: Frontend Development"
                                    className={inputClass}
                                    required
                                />
                                <FieldError message={form.errors.category} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Tingkat Penguasaan
                                </label>
                                <select
                                    value={form.data.level}
                                    onChange={(event) =>
                                        form.setData("level", event.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                                <FieldError message={form.errors.level} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Urutan
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
                                {editingId ? "Simpan Perubahan" : "Tambah Skill"}
                            </button>
                        </div>
                    </form>
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Daftar Skill
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Semua keahlian yang tersimpan.
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
                                placeholder="Cari skill..."
                                className={`${inputClass} pl-10`}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Skill</th>
                                    <th className="px-6 py-4 font-semibold">Kategori</th>
                                    <th className="px-6 py-4 font-semibold">Level</th>
                                    <th className="px-6 py-4 font-semibold">Urutan</th>
                                    <th className="px-6 py-4 text-right font-semibold">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredSkills.length > 0 ? (
                                    filteredSkills.map((skill) => (
                                        <tr key={skill.id} className="transition hover:bg-slate-50/70">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                                        <Code2 size={18} />
                                                    </div>
                                                    <span className="font-medium text-slate-800">
                                                        {skill.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                                                {skill.category}
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${levelStyles[skill.level] ?? levelStyles.Beginner}`}>
                                                    {skill.level}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4 tabular-nums text-slate-500">
                                                {skill.sort_order ?? 0}
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(skill)}
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(skill.id)}
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
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <Code2 className="mx-auto mb-3 text-slate-300" size={30} />
                                            <p className="font-medium text-slate-600">
                                                Skill tidak ditemukan
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
                            Menampilkan {filteredSkills.length} dari {skills.length} skill
                        </p>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
