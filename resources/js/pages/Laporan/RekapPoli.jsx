import { router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';
import AuthLayout from '../../../Layouts/AuthLayout';

export default function RekapPoli({ rekap, polis, filters }) {
    const [tahun, setTahun] = useState(filters.tahun || new Date().getFullYear());
    const [tahap, setTahap] = useState(filters.tahap || '');

    // fungsi debounce untuk filter
    const updateFilter = useCallback(
        debounce((tahapVal, tahunVal) => {
            router.get(route('rekap-poli'), { tahap: tahapVal, tahun: tahunVal }, { preserveState: true, replace: true });
        }, 600),
        [],
    );

    const handleChangeTahun = (e) => {
        const val = e.target.value;
        setTahun(val);
        updateFilter(tahap, val);
    };

    const handleChangeTahap = (e) => {
        const val = e.target.value;
        setTahap(val);
        updateFilter(val, tahun);
    };

    const handleExport = () => {
        window.open(route('rekap-poli-export', { tahap, tahun }), '_blank');
    };

    return (
        <AuthLayout title={'Rekap Antrian Poli'} className="p-6">
            <h2 className="mb-4 text-xl font-bold">Laporan Rekap Antrian Per Poli</h2>

            {/* Filter */}
            <div className="mb-4 flex gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tahun</label>
                    <input
                        type="number"
                        value={tahun}
                        onChange={handleChangeTahun}
                        className="mt-1 block w-32 rounded-md border-gray-300 px-4 py-2 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tahap</label>
                    <select
                        value={tahap}
                        onChange={handleChangeTahap}
                        className="mt-1 block w-40 rounded-md border-gray-300 px-4 py-2 text-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="">Semua</option>
                        <option value="pendaftaran">Pendaftaran</option>
                        <option value="klinik">Klinik</option>
                    </select>
                </div>

                <button onClick={handleExport} className="self-end rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                    Export PDF
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Bulan</th>
                                {polis.map((poli) => (
                                    <th key={poli.id} className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        {poli.nama}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {rekap.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{row.bulan}</td>
                                    {polis.map((poli) => (
                                        <td key={poli.id} className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                            {row.data[poli.nama] ?? 0}
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
