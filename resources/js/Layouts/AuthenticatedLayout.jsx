import { Link, usePage } from '@inertiajs/react';
import {
    BriefcaseBusiness,
    ChevronDown,
    ExternalLink,
    FolderKanban,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings2,
    UserRound,
    Wrench,
    X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function getInitials(name) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase();
}

function SidebarContent({ user, onNavigate }) {
    const navigation = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            href: route('dashboard'),
            active: route().current('dashboard'),
        },
        {
            label: 'Identitas',
            icon: UserRound,
            href: route('admin.identity.edit'),
            active: route().current('admin.identity.edit'),
        },
        {
            label: 'Keahlian',
            icon: Wrench,
            href: route('admin.skills.index'),
            active: route().current('admin.skills.index'),
        },
        {
            label: 'Proyek',
            icon: FolderKanban,
            href: route('admin.projects.index'),
            active: route().current('admin.projects.index'),
        },
        {
            label: 'Pengalaman',
            icon: BriefcaseBusiness,
            href: route('admin.experiences.index'),
            active: route().current('admin.experiences.index'),
        },
    ];

    return (
        <div className="flex h-full flex-col bg-white">
            <div className="flex h-16 items-center border-b border-[#E2E8F0] px-5">
                <Link
                    href={route('welcome')}
                    onClick={onNavigate}
                    className="flex items-center gap-3"
                >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-[#006948] font-display text-sm text-white">
                        EA
                    </span>
                    <span className="flex flex-col">
                        <span className="font-display text-sm leading-tight text-[#0F172A]">
                            Erick Al Aziz
                        </span>
                        <span className="text-[11px] text-[#94A3B8]">Portfolio Admin</span>
                    </span>
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-6" aria-label="Sidebar navigation">
                <p className="px-3 pb-3 text-[11px] font-semibold tracking-wider text-[#94A3B8] uppercase">
                    Menu utama
                </p>

                <div className="flex flex-col gap-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;

                        if (item.soon) {
                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    disabled
                                    className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#94A3B8]"
                                >
                                    <Icon size={18} />
                                    <span className="flex-1 text-left">{item.label}</span>
                                    <span className="rounded-full bg-[#F1F5F9] px-2 py-0.5 text-[10px] font-semibold text-[#64748B]">
                                        Segera
                                    </span>
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={onNavigate}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                                    item.active
                                        ? 'bg-[#E8F5EE] text-[#006948]'
                                        : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                                }`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                <p className="px-3 pt-7 pb-3 text-[11px] font-semibold tracking-wider text-[#94A3B8] uppercase">
                    Akun
                </p>

                <Link
                    href={route('profile.edit')}
                    onClick={onNavigate}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        route().current('profile.*')
                            ? 'bg-[#E8F5EE] text-[#006948]'
                            : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
                    }`}
                >
                    <Settings2 size={18} />
                    Pengaturan akun
                </Link>

                <Link
                    href={route('welcome')}
                    onClick={onNavigate}
                    className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#475569] transition hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                >
                    <ExternalLink size={18} />
                    Lihat portofolio
                </Link>
            </nav>

            <div className="border-t border-[#E2E8F0] p-4">
                <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#006948] text-xs font-semibold text-white">
                        {getInitials(user.name)}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#0F172A]">
                            {user.name}
                        </p>
                        <p className="truncate text-xs text-[#94A3B8]">{user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target)
            ) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-[#E2E8F0] lg:block">
                <SidebarContent user={user} />
            </aside>

            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        type="button"
                        aria-label="Tutup navigasi"
                        className="absolute inset-0 bg-[#0F172A]/50"
                        onClick={() => setSidebarOpen(false)}
                    />

                    <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-xl">
                        <SidebarContent
                            user={user}
                            onNavigate={() => setSidebarOpen(false)}
                        />
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(false)}
                            className="absolute top-4 right-3 rounded-lg p-2 text-[#475569] hover:bg-[#F1F5F9]"
                            aria-label="Tutup navigasi"
                        >
                            <X size={20} />
                        </button>
                    </aside>
                </div>
            )}

            <div className="lg:pl-64">
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E2E8F0] bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-lg p-2 text-[#475569] hover:bg-[#F1F5F9] lg:hidden"
                            aria-label="Buka navigasi"
                        >
                            <Menu size={20} />
                        </button>
                        <span className="text-sm font-semibold text-[#0F172A]">
                            Portfolio Studio
                        </span>
                    </div>

                    <div className="relative" ref={userMenuRef}>
                        <button
                            type="button"
                            onClick={() => setUserMenuOpen((open) => !open)}
                            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-[#F1F5F9]"
                        >
                            <span className="flex size-8 items-center justify-center rounded-full bg-[#006948] text-xs font-semibold text-white">
                                {getInitials(user.name)}
                            </span>
                            <span className="hidden text-sm font-medium sm:block">
                                {user.name}
                            </span>
                            <ChevronDown size={15} className="text-[#94A3B8]" />
                        </button>

                        {userMenuOpen && (
                            <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white p-1.5 shadow-lg">
                                <Link
                                    href={route('profile.edit')}
                                    onClick={() => setUserMenuOpen(false)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                                >
                                    <Settings2 size={16} />
                                    Pengaturan akun
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    onClick={() => setUserMenuOpen(false)}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
                                >
                                    <LogOut size={16} />
                                    Keluar
                                </Link>
                            </div>
                        )}
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {header && <div className="mb-6">{header}</div>}
                    {children}
                </main>
            </div>
        </div>
    );
}
