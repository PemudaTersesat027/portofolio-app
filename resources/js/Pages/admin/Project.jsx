import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    CheckCircle2,
    FolderKanban,
    Pencil,
    Plus,
    Save,
    Search,
    Trash2,
    X,
} from "lucide-react";
import { Head, router, useForm, usePage } from "@inertiajs/react";

const emptyForm = {
    title: "",
    category: "",
    description: "",
    image: null,
    external_image_url: "",
    version: "",
    development_status: "development",
    source_type: "closed-source",
    sales_status: "not-for-sale",
    tags: "",
    price: "",
    preorder_price: "",
    preorder_deadline: "",
    preorder_limit: "",
    preorder_sold: 0,
    purchase_url: "",
    live_url: "",
    trial_url: "",
    github_url: "",
    sort_order: 0,
};

function FieldError({ message }) {
    if (!message) return null;

    return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

function toNullableNumber(value) {
    return value === "" || value === null ? null : Number(value);
}

export default function ProjectAdminPage({ projects = [] }) {
    const flash = usePage().props.flash ?? {};
    const form = useForm(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");

    form.transform((data) => ({
        ...data,
        tags: data.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        price: toNullableNumber(data.price),
        preorder_price: toNullableNumber(data.preorder_price),
        preorder_limit: toNullableNumber(data.preorder_limit),
        preorder_sold: toNullableNumber(data.preorder_sold) ?? 0,
        sort_order: toNullableNumber(data.sort_order) ?? 0,
    }));

    const filteredProjects = projects.filter((project) =>
        `${project.title} ${project.category} ${(project.tags ?? []).join(" ")}`
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
            forceFormData: true,
            preserveScroll: true,
            onSuccess: resetForm,
        };

        if (editingId) {
            form.put(route("admin.projects.update", editingId), options);
        } else {
            form.post(route("admin.projects.store"), options);
        }
    };

    const handleEdit = (project) => {
        setEditingId(project.id);
        form.setData({
            ...emptyForm,
            title: project.title,
            category: project.category,
            description: project.description,
            external_image_url: project.external_image_url ?? "",
            version: project.version ?? "",
            development_status: project.development_status,
            source_type: project.source_type,
            sales_status: project.sales_status,
            tags: (project.tags ?? []).join(", "),
            price: project.price ?? "",
            preorder_price: project.preorder_price ?? "",
            preorder_deadline: project.preorder_deadline
                ? String(project.preorder_deadline).slice(0, 10)
                : "",
            preorder_limit: project.preorder_limit ?? "",
            preorder_sold: project.preorder_sold ?? 0,
            purchase_url: project.purchase_url ?? "",
            live_url: project.live_url ?? "",
            trial_url: project.trial_url ?? "",
            github_url: project.github_url ?? "",
            sort_order: project.sort_order ?? 0,
        });
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus proyek ini?")) {
            router.delete(route("admin.projects.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10";

    return (
        <AuthenticatedLayout>
            <Head title="Kelola Proyek" />

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
                            <FolderKanban size={16} />
                            <span>Portfolio Management</span>
                            <span>/</span>
                            <span>Projects</span>
                        </div>
                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            Project Management
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Kelola proyek dan produk digital yang ditampilkan pada portofolio.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm">
                        <FolderKanban size={17} className="text-emerald-600" />
                        <span className="font-medium text-slate-700">
                            {projects.length} Proyek
                        </span>
                    </div>
                </div>

                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                        <div>
                            <h2 className="font-semibold text-slate-900">
                                {editingId ? "Edit Proyek" : "Tambah Proyek"}
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Isi detail proyek, harga, dan tautan yang tersedia.
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

                    <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Judul proyek
                                </label>
                                <input
                                    type="text"
                                    value={form.data.title}
                                    onChange={(event) =>
                                        form.setData("title", event.target.value)
                                    }
                                    className={inputClass}
                                    required
                                />
                                <FieldError message={form.errors.title} />
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
                                    className={inputClass}
                                    required
                                />
                                <FieldError message={form.errors.category} />
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

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Versi
                                </label>
                                <input
                                    type="text"
                                    value={form.data.version}
                                    onChange={(event) =>
                                        form.setData("version", event.target.value)
                                    }
                                    placeholder="1.0.0"
                                    className={inputClass}
                                />
                                <FieldError message={form.errors.version} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Status pengembangan
                                </label>
                                <select
                                    value={form.data.development_status}
                                    onChange={(event) =>
                                        form.setData("development_status", event.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option value="development">Development</option>
                                    <option value="released">Released</option>
                                </select>
                                <FieldError message={form.errors.development_status} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Jenis sumber
                                </label>
                                <select
                                    value={form.data.source_type}
                                    onChange={(event) =>
                                        form.setData("source_type", event.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option value="open-source">Open Source</option>
                                    <option value="closed-source">Closed Source</option>
                                </select>
                                <FieldError message={form.errors.source_type} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Status penjualan
                                </label>
                                <select
                                    value={form.data.sales_status}
                                    onChange={(event) =>
                                        form.setData("sales_status", event.target.value)
                                    }
                                    className={inputClass}
                                >
                                    <option value="not-for-sale">Not for Sale</option>
                                    <option value="pre-order">Pre-Order</option>
                                    <option value="available">Available</option>
                                    <option value="discontinued">Discontinued</option>
                                </select>
                                <FieldError message={form.errors.sales_status} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Tag (pisahkan dengan koma)
                                </label>
                                <input
                                    type="text"
                                    value={form.data.tags}
                                    onChange={(event) =>
                                        form.setData("tags", event.target.value)
                                    }
                                    placeholder="Laravel, React, MySQL"
                                    className={inputClass}
                                />
                                <FieldError message={form.errors.tags} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Harga
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={form.data.price}
                                    onChange={(event) =>
                                        form.setData("price", event.target.value)
                                    }
                                    className={inputClass}
                                />
                                <FieldError message={form.errors.price} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Harga pre-order
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={form.data.preorder_price}
                                    onChange={(event) =>
                                        form.setData("preorder_price", event.target.value)
                                    }
                                    className={inputClass}
                                />
                                <FieldError message={form.errors.preorder_price} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Batas pre-order
                                </label>
                                <input
                                    type="date"
                                    value={form.data.preorder_deadline}
                                    onChange={(event) =>
                                        form.setData("preorder_deadline", event.target.value)
                                    }
                                    className={inputClass}
                                />
                                <FieldError message={form.errors.preorder_deadline} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Kuota pre-order
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={form.data.preorder_limit}
                                    onChange={(event) =>
                                        form.setData("preorder_limit", event.target.value)
                                    }
                                    className={inputClass}
                                />
                                <FieldError message={form.errors.preorder_limit} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Pre-order terjual
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={form.data.preorder_sold}
                                    onChange={(event) =>
                                        form.setData("preorder_sold", event.target.value)
                                    }
                                    className={inputClass}
                                />
                                <FieldError message={form.errors.preorder_sold} />
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

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Upload gambar
                                </label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(event) =>
                                        form.setData(
                                            "image",
                                            event.target.files?.[0] ?? null,
                                        )
                                    }
                                    className={inputClass}
                                />
                                <FieldError message={form.errors.image} />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Atau URL gambar eksternal
                                </label>
                                <input
                                    type="url"
                                    value={form.data.external_image_url}
                                    onChange={(event) =>
                                        form.setData("external_image_url", event.target.value)
                                    }
                                    placeholder="https://..."
                                    className={inputClass}
                                />
                                <FieldError message={form.errors.external_image_url} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {[
                                ["live_url", "URL Live Demo"],
                                ["trial_url", "URL Trial"],
                                ["purchase_url", "URL Pembelian"],
                                ["github_url", "URL GitHub"],
                            ].map(([field, label]) => (
                                <div key={field}>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        {label}
                                    </label>
                                    <input
                                        type="url"
                                        value={form.data[field]}
                                        onChange={(event) =>
                                            form.setData(field, event.target.value)
                                        }
                                        placeholder="https://..."
                                        className={inputClass}
                                    />
                                    <FieldError message={form.errors[field]} />
                                </div>
                            ))}
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
                                {editingId ? "Simpan Perubahan" : "Tambah Proyek"}
                            </button>
                        </div>
                    </form>
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                        <div>
                            <h2 className="font-semibold text-slate-900">
                                Daftar Proyek
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                Semua proyek yang tersimpan.
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
                                placeholder="Cari proyek..."
                                className={`${inputClass} pl-10`}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Proyek</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Tag</th>
                                    <th className="px-6 py-4 font-semibold">Urutan</th>
                                    <th className="px-6 py-4 text-right font-semibold">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredProjects.length > 0 ? (
                                    filteredProjects.map((project) => (
                                        <tr key={project.id} className="transition hover:bg-slate-50/70">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-emerald-50 text-emerald-600">
                                                        {project.image_url ? (
                                                            <img
                                                                src={project.image_url}
                                                                alt=""
                                                                className="size-full object-cover"
                                                            />
                                                        ) : (
                                                            <FolderKanban size={18} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-800">
                                                            {project.title}
                                                        </p>
                                                        <p className="text-xs text-slate-400">
                                                            {project.category}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                                    {project.development_status}
                                                </span>
                                                <span className="mt-1 block text-xs text-slate-400">
                                                    {project.sales_status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {(project.tags ?? []).slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4 tabular-nums text-slate-500">
                                                {project.sort_order ?? 0}
                                            </td>

                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(project)}
                                                        className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                                                        title="Edit"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(project.id)}
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
                                            <FolderKanban className="mx-auto mb-3 text-slate-300" size={30} />
                                            <p className="font-medium text-slate-600">
                                                Proyek tidak ditemukan
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
                            Menampilkan {filteredProjects.length} dari {projects.length} proyek
                        </p>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
