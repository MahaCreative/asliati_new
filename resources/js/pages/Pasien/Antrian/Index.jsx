import { Link, router } from '@inertiajs/react';
import AuthLayout from '../../../../Layouts/AuthLayout';

export default function Index({ antrian }) {
    const bgStatus = (status) => {
        let bg_color = '';
        let text_color = '';
        switch (status) {
            case 'dipanggil':
                bg_color = 'bg-blue-200';
                text_color = 'text-blue-700';
                break;
            case 'menunggu':
                bg_color = 'bg-orange-200';
                text_color = 'text-orange-700';
                break;
            case 'batal':
                bg_color = 'bg-red-200';
                text_color = 'text-red-700';
                break;
            case 'selesai':
                bg_color = 'bg-green-200';
                text_color = 'text-green-700';
                break;
            case true:
                bg_color = 'bg-green-200';
                text_color = 'text-green-700';
                break;
            case false:
                bg_color = 'bg-red-200';
                text_color = 'text-red-700';
                break;
        }
        return bg_color + ' ' + text_color;
    };

    const handleDelete = (id) => {
        router.delete(route('pasien.destroy-antrian.online', id));
    };
    return (
        <AuthLayout>
            <div className="mb-3 flex flex-row items-start justify-between gap-1 sm:items-start">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Daftar Antrian Saya</h1>
                    <p className="mt-2 text-gray-600">Berikut data history antrian yang telah anda buat</p>
                </div>
                <Link
                    href={route('pasien.take-antrian.online')}
                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                >
                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Ambil Antrian
                </Link>
            </div>
            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">#</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Kode Antrian</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Nama Pasien</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Tanggal Booking</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Poli Tujuan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Dokter Tujuan</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Estimasi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {antrian.length === 0 ? (
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
                                            <p className="mt-2 text-sm">{searchTerm ? 'Tidak ada hasil pencarian' : 'Belum ada data poli'}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                antrian.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-light whitespace-nowrap text-gray-500 capitalize">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm font-light whitespace-nowrap text-gray-500 capitalize">
                                            {item.kode_antrian}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-light whitespace-nowrap text-gray-500 capitalize">
                                            {item.pasien.nama_lengkap}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-light whitespace-nowrap text-gray-500 capitalize">
                                            {item.tanggal_periksa}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-light whitespace-nowrap text-gray-500 capitalize">
                                            {item.dokter.poli.nama}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-light whitespace-nowrap text-gray-500 capitalize">
                                            {item.dokter.user.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-light whitespace-nowrap text-gray-500 capitalize">
                                            {item.estimasi ?? '#N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-light whitespace-nowrap text-gray-500 capitalize">
                                            <span className={`text-xs ${bgStatus(item.status)} rounded-md px-2 py-1`}>{item.status}</span>
                                        </td>

                                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center space-x-3">
                                                {item.status === 'menunggu' && (
                                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                                                        Batalkan
                                                    </button>
                                                )}
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
