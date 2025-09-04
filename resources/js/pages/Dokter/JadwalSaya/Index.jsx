import { Link, router } from '@inertiajs/react';
import AuthLayout from '../../../../Layouts/AuthLayout';

export default function Index({ jadwal = [] }) {
    const handleDelete = (id) => {
        router.delete(route('dokter.jadwal-saya.destroy', id));
    };
    return (
        <AuthLayout title={'Jadwal saya'}>
            <div className="mb-3 flex flex-row items-start justify-between gap-1 sm:items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Jadwal Saya</h1>
                    <p className="mt-2 text-gray-600">Halo Dokter, silahkan kelola jadwal anda</p>
                </div>
                <Link
                    href={route('dokter.jadwal-saya.create')}
                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Jadwal
                </Link>
            </div>
            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Hari</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Jam Mulai</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Jam Tutup</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {jadwal.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center">
                                        <div className="text-gray-500">
                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                />
                                            </svg>
                                            <p className="mt-2 text-sm">{'Data tidak tersedia Silahkan mengelola jadwal anda'}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                jadwal.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 uppercase">{item.hari}</td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{item.jam_mulai}</td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{item.jam_selesai}</td>

                                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                {/* <Link
                                                    href={route('petugas.dokter.edit', item.id)}
                                                    className="text-indigo-600 hover:cursor-pointer hover:text-indigo-900"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                        />
                                                    </svg>
                                                </Link> */}
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-600 hover:cursor-pointer hover:text-red-900"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthLayout>
    );
}
