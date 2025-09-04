import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Login({ status }) {
    const { profile } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Login - Sistem Pendaftaran Klinik" />

            <div className="flex min-h-screen min-w-full items-center justify-center bg-white text-gray-600">
                <div className="w-full max-w-md p-4">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-400 p-6 text-center">
                            <div className="mx-auto mb-4 flex items-center justify-center rounded-full">
                                <img
                                    src={'/storage/' + profile.logo}
                                    alt={profile.nama_klinik}
                                    className="h-24 w-24 rounded-full object-cover object-center"
                                />
                            </div>
                            <h1 className="mb-2 text-2xl font-bold text-white">Sistem Pendaftaran Klinik</h1>
                            <p className="text-sm text-white">Silakan login untuk melanjutkan</p>
                        </div>

                        <div className="p-8">
                            {status && <div className="mb-4 rounded-lg border border-green-400 bg-green-100 p-3 text-green-700">{status}</div>}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                        <i className="fas fa-envelope mr-2 text-gray-400"></i>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="contoh@email.com"
                                        required
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                                        <i className="fas fa-lock mr-2 text-gray-400"></i>
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                            errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="••••••••"
                                        required
                                    />
                                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <i className="fas fa-spinner fa-spin mr-2"></i>
                                            Memproses...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <i className="fas fa-sign-in-alt mr-2"></i>
                                            Login
                                        </span>
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Belum punya akun?{' '}
                                    <Link href={route('register')} className="cursor-pointer text-blue-600 hover:text-blue-500">
                                        Daftar Sekarang
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">&copy; 2024 Sistem Pendaftaran Klinik. All rights reserved.</p>
                    </div>
                </div>
            </div>

            {/* Font Awesome CDN */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        </>
    );
}
