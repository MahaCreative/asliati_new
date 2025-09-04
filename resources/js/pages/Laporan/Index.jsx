import { Head, router, usePage } from '@inertiajs/react';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import AuthLayout from '../../../Layouts/AuthLayout';

export default function Index() {
    const { antrians, polis, dokters, filters } = usePage().props;

    const [filter, setFilter] = useState({
        tahap: filters.tahap || '',
        poli_id: filters.poli_id || '',
        dokter_id: filters.dokter_id || '',
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
    });

    const reload = useCallback(
        debounce((query) => {
            router.get(route('laporan-antrian'), query, {
                preserveState: true,
                replace: true,
            });
        }, 500),
        [],
    );

    const handleChange = (e) => {
        const newFilter = { ...filter, [e.target.name]: e.target.value };
        setFilter(newFilter);
        reload(newFilter);
    };

    const handleExport = () => {
        const query = new URLSearchParams(filter).toString();
        window.open(route('export-laporan-antrian') + '?' + query, '_blank');
    };

    return (
        <AuthLayout title={'Laporan Antrian'}>
            <div className="p-6 text-gray-500">
                <Head title="Laporan Antrian" />
                <h1 className="mb-4 text-xl font-semibold">Laporan Antrian</h1>

                {/* Filter */}
                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <select name="tahap" value={filter.tahap} onChange={handleChange} className="rounded border p-2">
                        <option value="">-- Pilih Tahap --</option>
                        <option value="pendaftaran">Pendaftaran</option>
                        <option value="klinik">Klinik</option>
                    </select>

                    <select name="poli_id" value={filter.poli_id} onChange={handleChange} className="rounded border p-2">
                        <option value="">-- Pilih Poli --</option>
                        {polis.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.nama}
                            </option>
                        ))}
                    </select>

                    <select name="dokter_id" value={filter.dokter_id} onChange={handleChange} className="rounded border p-2">
                        <option value="">-- Pilih Dokter --</option>
                        {dokters.map((d) => (
                            <option key={d.id} value={d.id}>
                                {d.user?.name}
                            </option>
                        ))}
                    </select>

                    <input type="date" name="start_date" value={filter.start_date} onChange={handleChange} className="rounded border p-2" />
                    <input type="date" name="end_date" value={filter.end_date} onChange={handleChange} className="rounded border p-2" />
                </div>

                {/* Button Export */}
                <button onClick={handleExport} className="mb-4 rounded bg-blue-600 px-4 py-2 text-white">
                    Export PDF
                </button>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">#</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Kode Antrian</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Pasien</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Tahap</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Poli</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Dokter</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {antrians.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                                            <div>
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                    />
                                                </svg>
                                                <p className="mt-2 text-sm">Belum ada data laporan</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    antrians.data.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{item.kode_antrian}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{item.pasien?.nama_lengkap ?? '-'}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 uppercase">
                                                    {item.tahap}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">{item.poli?.nama ?? '-'}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">{item.dokter?.user?.name ?? '-'}</td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase ${
                                                        item.status === 'selesai'
                                                            ? 'bg-blue-100 text-blue-800'
                                                            : item.status === 'dipanggil'
                                                              ? 'bg-yellow-100 text-yellow-800'
                                                              : item.status === 'batal'
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {new Date(item.created_at).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
