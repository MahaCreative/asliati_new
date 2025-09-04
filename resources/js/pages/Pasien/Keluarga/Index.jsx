import { Link, router } from '@inertiajs/react';
import { Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import AuthLayout from '../../../../Layouts/AuthLayout';

export default function Index({ pasien }) {
    const [searchTerm, setSearchTem] = useState([]);
    function hitungUmurLengkap(tanggalLahir) {
        const lahir = new Date(tanggalLahir);
        const sekarang = new Date();

        let tahun = sekarang.getFullYear() - lahir.getFullYear();
        let bulan = sekarang.getMonth() - lahir.getMonth();

        if (bulan < 0) {
            tahun -= 1;
            bulan += 12;
        }

        return { tahun, bulan };
    }
    const handleDelete = (id) => {
        router.delete(route('pasien.daftar-keluarga.destroy', id));
    };
    return (
        <AuthLayout title={'Daftar Keluarga'}>
            <div className="mb-3 flex flex-row items-start justify-between gap-1 sm:items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Daftar Keluarga</h1>
                    <p className="mt-2 text-gray-600">Silahkan mengelola data keluarga anda</p>
                </div>
                <Link
                    href={route('pasien.daftar-keluarga.create')}
                    className="text-s inline-flex items-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700"
                >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Keluarga
                </Link>
            </div>
            {/* Table */}
            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Foto</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">NIK/BPJS</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Nama Pasien</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                    Tempat, Tanggal Lahir
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Umur</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Jenis Kelamin</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status Keluarga</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {pasien.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center">
                                        <div className="text-gray-500">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                />
                                            </svg>
                                            <p className="text-s mt-2">{searchTerm ? 'Tidak ada hasil pencarian' : 'Belum ada data poli'}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                pasien.map((item, index) => {
                                    const umur = hitungUmurLengkap(item.tanggal_lahir);

                                    return (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="text-s px-6 py-4 font-medium whitespace-nowrap text-gray-900">{index + 1}</td>
                                            <td className="text-s px-6 py-4 whitespace-nowrap text-gray-900">
                                                <img
                                                    src={'/storage/' + item.avatar}
                                                    alt={item.nama_lengkap}
                                                    className="h-12 w-12 rounded-full object-cover object-center"
                                                />
                                            </td>
                                            <td className="text-s px-6 py-4 whitespace-nowrap text-gray-900">
                                                <div className="font-medium">{item.nama_lengkap}</div>
                                            </td>

                                            <td className="text-s px-6 py-4">
                                                <p className="my-1 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                    NIK:{item.nik}
                                                </p>
                                                <p className="my-1 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                    BPJS:{item.bpjs ?? 'N/A'}
                                                </p>
                                            </td>
                                            <td className="text-s px-6 py-4 whitespace-nowrap text-gray-600 capitalize">
                                                {`${item.tempat_lahir}, ${item.tanggal_lahir}`}
                                            </td>
                                            <td className="text-s px-6 py-4 whitespace-nowrap text-gray-600 capitalize">
                                                {umur.tahun} Tahun {umur.bulan} Bulan
                                            </td>
                                            <td className="text-s line-clamp-2 px-6 py-4 text-gray-900 capitalize">
                                                <div className="font-medium capitalize">{item.jenis_kelamin}</div>
                                            </td>
                                            <td className="text-s px-6 py-4 whitespace-nowrap text-gray-600 capitalize">{item.telephone}</td>
                                            <td className="text-s px-6 py-4 whitespace-nowrap text-gray-600 capitalize">{item.status_keluarga}</td>
                                            <td className="text-s px-6 py-4 whitespace-nowrap flex gap-3 items-center">
                                                        <Link
                                                            href={route('pasien.daftar-keluarga.show', item.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            <Eye />
                                                        </Link>
                                                {item.status_keluarga !== 'pribadi' && (
                                                    <div className="flex items-center space-x-3">
                                                <Link
                                                            href={route('pasien.daftar-keluarga.edit', item.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            <Edit />
                                                        </Link>
                                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                                                            <svg
                                                                className="h-4 w-4 hover:cursor-pointer"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthLayout>
    );
}
