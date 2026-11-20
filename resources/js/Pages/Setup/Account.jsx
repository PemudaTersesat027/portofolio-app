import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { useState } from 'react';

export default function Account() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (event) => {
        event.preventDefault();

        post(route('setup.account'));
    };

    return (
        <AuthLayout
            eyebrow="Langkah 1"
            title="Buat akun admin"
            description="Akun ini digunakan untuk mengelola portofolio Anda. Cukup dibuat satu kali."
            step={1}
            footer={
                <>
                    Sudah punya akun?{' '}
                    <Link
                        href={route('login')}
                        className="font-semibold text-[#006948] hover:underline"
                    >
                        Masuk di sini
                    </Link>
                </>
            }
        >
            <Head title="Setup — Buat Akun Admin" />

            <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-semibold text-[#0F172A]">
                        Nama lengkap
                    </label>
                    <div className="relative">
                        <UserRound
                            size={17}
                            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#94A3B8]"
                        />
                        <Input
                            id="name"
                            name="name"
                            autoComplete="name"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            placeholder="Erick Al Aziz"
                            className="h-11 pl-10"
                            required
                        />
                    </div>
                    <InputError message={errors.name} />
                </div>

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
                            required
                        />
                    </div>
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
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
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(event) => setData('password', event.target.value)}
                                placeholder="Minimal 8 karakter"
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

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="password_confirmation"
                            className="text-sm font-semibold text-[#0F172A]"
                        >
                            Ulangi kata sandi
                        </label>
                        <div className="relative">
                            <LockKeyhole
                                size={17}
                                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#94A3B8]"
                            />
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(event) =>
                                    setData('password_confirmation', event.target.value)
                                }
                                placeholder="Ulangi kata sandi"
                                className="h-11 pl-10"
                                required
                            />
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="mt-1 h-11 w-full rounded-lg bg-[#006948] text-sm font-semibold text-white transition hover:bg-[#00543A]"
                >
                    Lanjut ke identitas
                    <ArrowRight size={17} />
                </Button>
            </form>
        </AuthLayout>
    );
}
