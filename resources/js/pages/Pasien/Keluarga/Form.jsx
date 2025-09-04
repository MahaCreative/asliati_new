import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthLayout from '../../../../Layouts/AuthLayout';

export default function Form({ pasien }) {
    const { data, setData, post, reset, errors, progress } = useForm({
        id: pasien?.id ?? '',
        nik: pasien?.nik ?? '',
        bpjs: pasien?.bpjs ?? '',
        nama_lengkap: pasien?.nama_lengkap ?? '',
        telephone: pasien?.telephone ?? '',
        tempat_lahir: pasien?.tempat_lahir ?? '',
        jenis_kelamin: pasien?.jenis_kelamin ?? '',
        tanggal_lahir: pasien?.tanggal_lahir ?? '',
        avatar: '',
        status_keluarga: pasien?.status_keluarga ?? '',
        _method: pasien ? 'PUT' : 'POST',
    });
    const [preview, setPreview] = useState(pasien?.avatar ? '/storage/' + pasien?.avatar : null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData({ ...data, avatar: file });
            setPreview(URL.createObjectURL(file));
        }
    };
    const submit = (e) => {
        e.preventDefault();
        if (pasien) {
            post(route('pasien.daftar-keluarga.update', pasien?.id), {
                onSuccess: () => {},
            });
        } else {
            post(route('pasien.daftar-keluarga.store'), {
                onSuccess: () => {
                    reset();
                },
            });
        }
    };
    return (
        <AuthLayout title={'Form Data Pasien'}>
            <div className="mx-auto max-w-4xl">
                <div className="mb-3">
                    <h1 className="text-3xl font-bold text-gray-900">Form Keluarga</h1>
                    <p className="mt-2 text-gray-600">
                        {pasien ? 'Perbarui data keluarga sesuai kebutuhan.' : 'Lengkapi informasi keluarga untuk menambahkan data baru.'}
                    </p>
                </div>

                <form onSubmit={submit} className="w-full space-y-1">
                    <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="grid w-full grid-cols-2 gap-3 space-y-1 rounded-xl bg-white p-2 shadow-lg">
                            {/* NIK */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    NIK <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nik}
                                    onChange={(e) => setData('nik', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                    placeholder="3271xxxxxxxxxxxx"
                                />
                                {errors?.nik && <p className="mt-1 text-sm text-red-600">{errors?.nik}</p>}
                            </div>
                            {/* BPJS */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">No. BPJS</label>
                                <input
                                    type="text"
                                    value={data.bpjs}
                                    onChange={(e) => setData('bpjs', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                    placeholder="0001234567890"
                                />
                                {errors?.bpjs && <p className="mt-1 text-sm text-red-600">{errors?.bpjs}</p>}
                            </div>
                            {/* Nama Lengkap */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.nama_lengkap}
                                    onChange={(e) => setData('nama_lengkap', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors?.nama_lengkap && <p className="mt-1 text-sm text-red-600">{errors?.nama_lengkap}</p>}
                            </div>
                            {/* Telephone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">No. Telepon</label>
                                <input
                                    type="text"
                                    value={data.telephone}
                                    onChange={(e) => setData('telephone', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors?.telephone && <p className="mt-1 text-sm text-red-600">{errors?.telephone}</p>}
                            </div>
                            {/* Tempat Lahir */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
                                <input
                                    type="text"
                                    value={data.tempat_lahir}
                                    onChange={(e) => setData('tempat_lahir', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors?.tempat_lahir && <p className="mt-1 text-sm text-red-600">{errors?.tempat_lahir}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                                <input
                                    type="date"
                                    value={data.tanggal_lahir}
                                    onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors?.tanggal_lahir && <p className="mt-1 text-sm text-red-600">{errors?.tanggal_lahir}</p>}
                            </div>
                            {/* Jenis Kelamin */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                                <select
                                    value={data.jenis_kelamin}
                                    onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="laki-laki">Laki-laki</option>
                                    <option value="perempuan">Perempuan</option>
                                </select>
                                {errors?.jenis_kelamin && <p className="mt-1 text-sm text-red-600">{errors?.jenis_kelamin}</p>}
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Status Keluarga</label>
                                <select
                                    value={data.status_keluarga}
                                    onChange={(e) => setData('status_keluarga', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Pilih Status Keluarga</option>
                                    <option value="istri">Istri</option>
                                    <option value="suami">Suami</option>
                                    <option value="anak">Anak</option>
                                    <option value="keluarga">Keluarga</option>
                                </select>
                                {errors?.status_keluarga && <p className="mt-1 text-sm text-red-600">{errors?.status_keluarga}</p>}
                            </div>
                            {/* Tanggal Lahir */}

                            {/* Avatar */}
                        </div>
                        <div className="w-full">
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

                    {/* Tombol Aksi */}
                    <div className="flex justify-end space-x-4">
                        {/* <Link href={route('pasien.index')} className="rounded-lg bg-gray-200 px-6 py-3 text-gray-700 transition hover:bg-gray-300">
                        Batal
                    </Link> */}
                        {data.jenis_pasien != 'lama' && (
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
                            >
                                {'Simpan Pasien'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
