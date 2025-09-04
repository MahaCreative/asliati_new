import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function FormPasien({ pasien = null, setData, data }) {
    const [errors, setErrors] = useState([]);

    const submit = (e) => {
        e.preventDefault();
        if (pasien) {
            router.post(route('petugas.pasien.update', pasien.id)); // ganti route sesuai kebutuhan
        } else {
            router.post(
                route('petugas.pasien.store'),
                { ...data },
                {
                    onError: (err) => {
                        setErrors(err);
                    },
                    onSuccess: () => {
                        setData({ ...data, jenis_pasien: 'lama' });
                    },
                },
            );
        }
    };

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-3">
                <h1 className="text-3xl font-bold text-gray-900">Data Pasien</h1>
                <p className="mt-2 text-gray-600">
                    {pasien ? 'Perbarui data pasien sesuai kebutuhan.' : 'Lengkapi informasi pasien untuk menambahkan data baru.'}
                </p>
            </div>

            <form onSubmit={submit} className="space-y-1">
                <div className="">
                    <div className="grid grid-cols-2 gap-3 space-y-1 rounded-xl bg-white p-2 shadow-lg">
                        {/* NIK */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                NIK <span className="text-red-500">*</span>
                            </label>
                            <input
                                disabled={data.jenis_pasien == 'lama' ? true : false}
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
                                disabled={data.jenis_pasien == 'lama' ? true : false}
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
                                disabled={data.jenis_pasien == 'lama' ? true : false}
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
                                disabled={data.jenis_pasien == 'lama' ? true : false}
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
                                disabled={data.jenis_pasien == 'lama' ? true : false}
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
                                disabled={data.jenis_pasien == 'lama' ? true : false}
                                type="date"
                                value={data.tanggal_lahir}
                                onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors?.tanggal_lahir && <p className="mt-1 text-sm text-red-600">{errors?.tanggal_lahir}</p>}
                        </div>
                        {/* Jenis Kelamin */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
                            <select
                                disabled={data.jenis_pasien == 'lama' ? true : false}
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
                        {/* Tanggal Lahir */}

                        {/* Avatar */}
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
    );
}
