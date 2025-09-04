import { Head, Link, useForm } from '@inertiajs/react';
import { PlusIcon, Trash } from 'lucide-react';
import { useState } from 'react';
import AuthLayout from '../../../../Layouts/AuthLayout';

export default function Create({ poli, dokter = null }) {
    const { data, setData, post, processing, errors } = useForm({
        name: dokter?.user.name || '',
        email: dokter?.user.email || '',
        password: '',
        password_confirmation: '',
        poli_id: dokter?.poli_id || '',
        foto: null,
        deskripsi: dokter?.deskripsi || '',
        jadwal: dokter?.jadwal || [
            { hari: 'Senin', jam_mulai: '08:00', jam_selesai: '12:00' },
            { hari: 'Selasa', jam_mulai: '08:00', jam_selesai: '12:00' },
        ],
        _method: dokter ? 'put' : 'post',
    });

    const [preview, setPreview] = useState(dokter?.foto ? '/storage/' + dokter?.foto : null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('foto', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const addJadwal = () => {
        setData('jadwal', [...data.jadwal, { hari: 'Senin', jam_mulai: '08:00', jam_selesai: '12:00' }]);
    };

    const removeJadwal = (index) => {
        const newJadwal = data.jadwal.filter((_, i) => i !== index);
        setData('jadwal', newJadwal);
    };

    const handleJadwalChange = (index, field, value) => {
        const newJadwal = [...data.jadwal];
        newJadwal[index][field] = value;
        setData('jadwal', newJadwal);
    };

    const submit = (e) => {
        e.preventDefault();

        if (dokter) {
            // mode edit
            post(route('petugas.dokter.update', dokter.id), {
                forceFormData: true,
            });
        } else {
            // mode create
            post(route('petugas.dokter.store'));
        }
    };

    const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

    return (
        <AuthLayout title="Tambah Dokter">
            <Head title="Tambah Dokter" />

            <div className="mx-auto max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Tambah Dokter Baru</h1>
                    <p className="mt-2 text-gray-600">Lengkapi informasi dokter dan jadwal praktik</p>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    {/* Informasi Dokter */}
                    <div className="rounded-xl bg-white p-8 shadow-lg">
                        <h2 className="mb-6 flex items-center text-xl font-semibold text-gray-900">
                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                                <span className="font-bold text-blue-600">1</span>
                            </div>
                            Informasi Dokter
                        </h2>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {/* Kolom Kiri */}
                            <div className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Dr. John Doe"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="dr.john@klinik.com"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="••••••••"
                                        />
                                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Konfirmasi Password <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            placeholder="••••••••"
                                        />
                                        {errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{errors.password_confirmation}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Poli <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.poli_id}
                                        onChange={(e) => setData('poli_id', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Pilih Poli</option>
                                        {poli.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.nama}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.poli_id && <p className="mt-1 text-sm text-red-600">{errors.poli_id}</p>}
                                </div>
                            </div>

                            {/* Kolom Kanan - Foto */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">Foto Dokter</label>
                                <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                    <div className="space-y-1 text-center">
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="mx-auto h-48 w-48 rounded-full object-cover" />
                                        ) : (
                                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
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
                                {errors.foto && <p className="mt-1 text-sm text-red-600">{errors.foto}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Deskripsi</label>
                            <textarea
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                                rows={4}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                placeholder="Deskripsi singkat tentang dokter..."
                            />
                            {errors.deskripsi && <p className="mt-1 text-sm text-red-600">{errors.deskripsi}</p>}
                        </div>
                    </div>

                    {/* Jadwal Dokter */}
                    <div className="rounded-xl bg-white p-8 shadow-lg">
                        <h2 className="mb-6 flex items-center text-xl font-semibold text-gray-900">
                            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                <span className="font-bold text-green-600">2</span>
                            </div>
                            Jadwal Praktik
                        </h2>

                        <div className="space-y-4">
                            {data.jadwal.map((item, index) => (
                                <div key={index} className="flex items-center space-x-4 rounded-lg border border-gray-200 p-4">
                                    <div className="flex-1">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Hari</label>
                                        <select
                                            value={item.hari}
                                            onChange={(e) => handleJadwalChange(index, 'hari', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 focus:ring-2 focus:ring-blue-500"
                                        >
                                            {hariOptions.map((hari) => (
                                                <option key={hari} value={hari}>
                                                    {hari}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex-1">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Jam Mulai</label>
                                        <input
                                            type="time"
                                            value={item.jam_mulai}
                                            onChange={(e) => handleJadwalChange(index, 'jam_mulai', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <label className="mb-1 block text-sm font-medium text-gray-700">Jam Selesai</label>
                                        <input
                                            type="time"
                                            value={item.jam_selesai}
                                            onChange={(e) => handleJadwalChange(index, 'jam_selesai', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <button type="button" onClick={() => removeJadwal(index)} className="rounded-md p-2 text-red-600 hover:bg-red-50">
                                        <Trash className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addJadwal}
                                className="flex items-center space-x-2 rounded-md bg-blue-100 px-4 py-2 text-blue-700 transition-colors hover:bg-blue-200"
                            >
                                <PlusIcon className="h-4 w-4" />
                                <span>Tambah Jadwal</span>
                            </button>
                        </div>
                    </div>

                    {/* Tombol Submit */}
                    <div className="flex justify-end space-x-4">
                        <Link
                            href={route('petugas.dokter.index')}
                            className="rounded-lg bg-gray-200 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-300"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Dokter'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
