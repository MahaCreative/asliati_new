import { Link, useForm } from '@inertiajs/react';
import AuthLayout from '../../../../Layouts/AuthLayout';

export default function Form({ poli }) {
    const isEdit = !!poli;

    const { data, setData, post, put, processing, errors } = useForm({
        nama_poli: poli?.nama || '',
        prefix: poli?.prefix || '',
        keterangan: poli?.keterangan || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('petugas.poli.update', poli.id));
        } else {
            post(route('petugas.poli.store'));
        }
    };

    return (
        <AuthLayout title={isEdit ? 'Edit Poli' : 'Tambah Poli'}>
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{isEdit ? 'Edit Poli' : 'Tambah Poli Baru'}</h1>
                    <p className="mt-2 text-gray-600">{isEdit ? 'Perbarui informasi poli' : 'Tambahkan data poli baru ke sistem'}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-lg border bg-white shadow-sm">
                        <div className="border-b px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-900">Informasi Poli</h2>
                        </div>
                        <div className="space-y-6 p-6">
                            {/* Nama Poli */}
                            <div>
                                <label htmlFor="nama_poli" className="block text-sm font-medium text-gray-700">
                                    Nama Poli <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nama_poli"
                                    value={data.nama_poli}
                                    onChange={(e) => setData('nama_poli', e.target.value)}
                                    className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                                        errors.nama_poli ? 'border-red-300' : 'border-gray-300'
                                    } text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                                    placeholder="Contoh: Poli Umum, Poli Gigi"
                                />
                                {errors.nama_poli && <p className="mt-1 text-sm text-red-600">{errors.nama_poli}</p>}
                            </div>

                            {/* Prefix */}
                            <div>
                                <label htmlFor="prefix" className="block text-sm font-medium text-gray-700">
                                    Prefix <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="prefix"
                                    value={data.prefix}
                                    onChange={(e) => setData('prefix', e.target.value.toUpperCase())}
                                    maxLength="1"
                                    className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                                        errors.prefix ? 'border-red-300' : 'border-gray-300'
                                    } text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                                    placeholder="Contoh: UM, GG, KB"
                                />
                                <p className="mt-1 text-xs text-gray-500">Maksimal 1 karakter huruf kapital (Digunakan untuk kode Antrian Klinik)</p>
                                {errors.prefix && <p className="mt-1 text-sm text-red-600">{errors.prefix}</p>}
                            </div>

                            {/* Keterangan */}
                            <div>
                                <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700">
                                    Keterangan
                                </label>
                                <textarea
                                    id="keterangan"
                                    value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                    rows={3}
                                    className={`mt-1 block w-full rounded-md border px-3 py-2 ${
                                        errors.keterangan ? 'border-red-300' : 'border-gray-300'
                                    } text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                                    placeholder="Deskripsi singkat tentang poli ini"
                                />
                                {errors.keterangan && <p className="mt-1 text-sm text-red-600">{errors.keterangan}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-3">
                        <Link
                            href={route('petugas.poli.index')}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'Menyimpan...' : isEdit ? 'Update' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
