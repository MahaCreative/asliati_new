import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Calendar, IdCard, MapPinHouseIcon, Phone, User } from 'lucide-react';
import { useState } from 'react';

export default function Register({ status }) {
    const { profile } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
        nik: '',
        bpjs: '',
        nama_lengkap: '',
        telephone: '',
        tempat_lahir: '',
        jenis_kelamin: '',
        tanggal_lahir: '',
        avatar: '',
    });
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Login - Sistem Pendaftaran Klinik" />

            <div className="flex min-h-screen min-w-full items-center justify-center bg-white text-gray-600">
                <div className="w-full max-w-3xl p-4">
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

                            <form onSubmit={handleSubmit} className="space-y-1">
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    <div>
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
                                        <div>
                                            <label htmlFor="password_confirmation" className="mb-2 block text-sm font-medium text-gray-700">
                                                <i className="fas fa-lock mr-2 text-gray-400"></i>
                                                Konfirmasi Password
                                            </label>
                                            <input
                                                type="password"
                                                id="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="••••••••"
                                                required
                                            />
                                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Foto Profile</label>
                                            <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                                <div className="space-y-1 text-center">
                                                    {preview ? (
                                                        <img src={preview} alt="Preview" className="mx-auto h-48 w-48 rounded-full object-cover" />
                                                    ) : (
                                                        <svg
                                                            className="mx-auto h-12 w-12 text-gray-400"
                                                            stroke="currentColor"
                                                            fill="none"
                                                            viewBox="0 0 48 48"
                                                        >
                                                            <path
                                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    )}
                                                    <div className="flex text-sm text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none hover:text-blue-500"
                                                        >
                                                            <span>Upload foto</span>
                                                            <input
                                                                id="file-upload"
                                                                name="file-upload"
                                                                type="file"
                                                                className="sr-only"
                                                                onChange={handleFileChange}
                                                                accept="image/*"
                                                            />
                                                        </label>
                                                        <p className="pl-1">atau drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            </div>
                                            {errors.avatar && <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="gap grid:cols-1 gap-3 md:grid-cols-1">
                                            <div>
                                                <label
                                                    htmlFor="nama_lengkap"
                                                    className="mb-2 flex items-center gap-3 text-sm font-medium text-gray-700"
                                                >
                                                    <User />
                                                    Nama Lengkap
                                                </label>
                                                <input
                                                    type="text"
                                                    id="nama_lengkap"
                                                    value={data.nama_lengkap}
                                                    onChange={(e) => setData('nama_lengkap', e.target.value)}
                                                    className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                                        errors.nama_lengkap ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="John Doe"
                                                    required
                                                />
                                                {errors.nama_lengkap && <p className="mt-1 text-sm text-red-600">{errors.nama_lengkap}</p>}
                                            </div>
                                        </div>
                                        <div className="gap grid grid-cols-1 gap-3 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="nik" className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                                    <IdCard />
                                                    NIK KTP
                                                </label>
                                                <input
                                                    type="number"
                                                    maxLength={16}
                                                    id="nik"
                                                    value={data.nik}
                                                    onChange={(e) => setData('nik', e.target.value)}
                                                    className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                                        errors.nik ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="73060xxxxxxxxxx5"
                                                    required
                                                />
                                                {errors.nik && <p className="mt-1 text-sm text-red-600">{errors.nik}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="bpjs" className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                                    <IdCard />
                                                    BPJS
                                                </label>
                                                <input
                                                    type="number"
                                                    maxLength={16}
                                                    id="bpjs"
                                                    value={data.bpjs}
                                                    onChange={(e) => setData('bpjs', e.target.value)}
                                                    className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                                        errors.bpjs ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="John Doe"
                                                />
                                                {errors.bpjs && <p className="mt-1 text-sm text-red-600">{errors.bpjs}</p>}
                                            </div>
                                        </div>
                                        <div className="gap grid:cols-1 gap-3 md:grid-cols-1">
                                            <div>
                                                <label
                                                    htmlFor="nama_lengkap"
                                                    className="mb-2 flex items-center gap-3 text-sm font-medium text-gray-700"
                                                >
                                                    <Phone />
                                                    Telephone (WA)
                                                </label>
                                                <input
                                                    type="number"
                                                    id="telephone"
                                                    value={data.telephone}
                                                    onChange={(e) => setData('telephone', e.target.value)}
                                                    className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                                        errors.telephone ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="0853xxxxxxxx"
                                                    required
                                                />
                                                {errors.telephone && <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>}
                                            </div>
                                        </div>
                                        <div className="gap grid grid-cols-1 gap-3 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="nik" className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                                    <MapPinHouseIcon />
                                                    Tempat Lahir
                                                </label>
                                                <input
                                                    type="text"
                                                    id="tempat_lahir"
                                                    value={data.tempat_lahir}
                                                    onChange={(e) => setData('tempat_lahir', e.target.value)}
                                                    className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                                        errors.tempat_lahir ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="Tempat Lahir: Contoh Makassar"
                                                    required
                                                />
                                                {errors.tempat_lahir && <p className="mt-1 text-sm text-red-600">{errors.tempat_lahir}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="bpjs" className="mb-2 flex items-center text-sm font-medium text-gray-700">
                                                    <Calendar />
                                                    Tanggal Lahir
                                                </label>
                                                <input
                                                    type="date"
                                                    maxLength={16}
                                                    id="tanggal_lahir"
                                                    value={data.tanggal_lahir}
                                                    onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                                    className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                                        errors.tanggal_lahir ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    required
                                                />
                                                {errors.tanggal_lahir && <p className="mt-1 text-sm text-red-600">{errors.tanggal_lahir}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                                            <select
                                                value={data.jenis_kelamin}
                                                onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Pilih Jenis Kelamin</option>
                                                <option value="laki-laki">Laki-laki</option>
                                                <option value="perempuan">Perempuan</option>
                                            </select>
                                            {errors?.jenis_kelamin && <p className="mt-1 text-sm text-red-600">{errors?.jenis_kelamin}</p>}
                                        </div>
                                    </div>
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
                                            Register Now
                                        </span>
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Sudah punya akun?{' '}
                                    <Link href={route('login')} className="cursor-pointer text-blue-600 hover:text-blue-500">
                                        Login Disini
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
