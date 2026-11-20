import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (event) => {
        event.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            eyebrow="Portal Pengelola"
            title="Selamat datang kembali"
            description="Masuk untuk mengelola identitas, keahlian, dan proyek portofolio Anda."
            footer={
                <>
                    Belum punya akun?{' '}
                    <Link
                        href={route('setup.account')}
                        className="font-semibold text-[#006948] hover:underline"
                    >
                        Mulai setup
                    </Link>
                </>
            }
        >
            <Head title="Masuk" />

            {status && (
                <div className="mb-6 rounded-lg border border-[#BBF7D0] bg-[#F0F9F4] px-4 py-3 text-sm font-medium text-[#00543A]">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold text-[#0F172A]">
                        Alamat email
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
                            autoComplete="username"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            placeholder="admin@example.com"
                            className="h-11 pl-10"
                            autoFocus
                            required
                        />
                    </div>
                    <InputError message={errors.email} />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-semibold text-[#0F172A]">
                        Kata sandi
                    </label>
                    <div className="relative">
                        <LockKeyhole
                            size={17}
                            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#94A3B8]"
                        />
                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            placeholder="Masukkan kata sandi"
                            className="h-11 pr-10 pl-10"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((visible) => !visible)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-[#94A3B8] transition hover:text-[#006948]"
                            aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                        >
                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                        </button>
                    </div>
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center justify-between gap-3">
                    <label className="flex items-center gap-2 text-sm text-[#475569]">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(event) => setData('remember', event.target.checked)}
                            className="size-4 rounded border-[#CBD5E1] accent-[#006948]"
                        />
                        Ingat saya
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-semibold text-[#006948] hover:underline"
                        >
                            Lupa kata sandi?
                        </Link>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="h-11 w-full rounded-lg bg-[#006948] text-sm font-semibold text-white transition hover:bg-[#00543A]"
                >
                    Masuk ke dashboard
                    <ArrowRight size={17} />
                </Button>
            </form>
        </AuthLayout>
    );
}
