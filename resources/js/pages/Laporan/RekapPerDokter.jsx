import { usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import AuthLayout from '../../../Layouts/AuthLayout';

export default function RekapPerDokter() {
    const { dokters = [], rekap = [], tahun: defaultTahun = new Date().getFullYear(), tahap: defaultTahap = 'klinik' } = usePage().props;

    const [tahun, setTahun] = useState(defaultTahun);
    const [tahap, setTahap] = useState(defaultTahap);

    // Debounce filter
    const handleFilterChange = useCallback(
        debounce((newTahun, newTahap) => {
            window.location.href = route('laporan.rekap.perdokter.index', { tahun: newTahun, tahap: newTahap });
        }, 500),
        [],
    );

    const onChangeTahun = (e) => {
        setTahun(e.target.value);
        handleFilterChange(e.target.value, tahap);
    };

    const onChangeTahap = (e) => {
        setTahap(e.target.value);
        handleFilterChange(tahun, e.target.value);
    };

    return (
        <AuthLayout title={'Rekap Antrian Dokter'}>
            {' '}
            <div className="p-6 text-gray-500">
                <h1 className="mb-4 text-2xl font-bold">Rekap Antrian Per Dokter</h1>

                {/* Filters */}
                <div className="mb-6 flex space-x-4">
                    <select value={tahap} onChange={onChangeTahap} className="rounded border px-3 py-2">
                        <option value="pendaftaran">Pendaftaran</option>
                        <option value="klinik">Klinik</option>
                    </select>

                    <input type="number" value={tahun} onChange={onChangeTahun} placeholder="Tahun" className="rounded border px-3 py-2" />

                    <a
                        href={route('laporan.rekap.dokter.pdf', { tahun, tahap })}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Export PDF
                    </a>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg border shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bulan</th>
                                {dokters.map((dok) => (
                                    <th key={dok.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        {dok.user?.name || '-'}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {rekap.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.bulan}</td>
                                    {dokters.map((dok) => (
                                        <td key={dok.id} className="px-6 py-4 text-sm text-gray-900">
                                            {row[dok.id] ?? 0}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthLayout>
    );
}
