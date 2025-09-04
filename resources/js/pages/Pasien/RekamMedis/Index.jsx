import { useState } from 'react';
import AuthLayout from '../../../../Layouts/AuthLayout';

export default function Index({ rekamMedis, keluarga }) {
    const [selected, setSelected] = useState(null);
    const [filterId, setFilterId] = useState('all');

    const filteredRekamMedis = filterId === 'all' ? rekamMedis : rekamMedis.filter((rm) => rm.pasien_id === parseInt(filterId));

    return (
        <AuthLayout title="Rekam Medis">
            <div className="mx-auto max-w-6xl px-6 py-10">
                <h1 className="mb-6 text-3xl font-bold text-gray-900">Riwayat Rekam Medis</h1>

                {/* Filter Dropdown */}
                <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Filter berdasarkan pasien:</label>
                        <select
                            value={filterId}
                            onChange={(e) => {
                                setFilterId(e.target.value);
                                setSelected(null);
                            }}
                            className="mt-1 rounded-md border-gray-300 py-3 text-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 sm:text-sm"
                        >
                            <option value="all">Semua Pasien</option>
                            {keluarga.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nama_lengkap}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selected && (
                        <button onClick={() => setSelected(null)} className="text-sm text-red-500 hover:underline">
                            Tutup Detail
                        </button>
                    )}
                </div>

                {/* Card Detail */}
                {selected && (
                    <div className="mb-10 rounded-xl bg-white p-6 shadow-lg transition">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {selected.pasien.nama_lengkap} - {new Date(selected.tanggal_kunjungan).toLocaleDateString()}
                            </h2>
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                    selected.status === 'final' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                }`}
                            >
                                {selected.status.toUpperCase()}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-5 text-sm text-gray-700 sm:grid-cols-2">
                            <Field label="Poli" value={selected.poli.nama} />
                            <Field label="Dokter" value={selected.dokter.nama} />
                            <Field label="Keluhan" value={selected.keluhan} />
                            <Field label="Diagnosa" value={selected.diagnosa} />
                            <Field label="Resep" value={selected.resep} />
                            <Field label="Catatan" value={selected.catatan || '-'} />
                            <Field label="Tekanan Darah" value={selected.tekanan_darah || '-'} />
                            <Field label="Suhu Tubuh (°C)" value={selected.suhu_tubuh ?? '-'} />
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto rounded-xl bg-white shadow-md">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <Th>Pasien</Th>
                                <Th>Tanggal</Th>
                                <Th>Poli</Th>
                                <Th>Dokter</Th>
                                <Th>Status</Th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredRekamMedis.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-6 text-center text-gray-500 italic">
                                        Tidak ada rekam medis ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                filteredRekamMedis.map((rm) => (
                                    <tr key={rm.id} className="cursor-pointer transition hover:bg-gray-50" onClick={() => setSelected(rm)}>
                                        <Td>{rm.pasien.nama_lengkap}</Td>
                                        <Td>{new Date(rm.tanggal_kunjungan).toLocaleDateString()}</Td>
                                        <Td>{rm.poli.nama}</Td>
                                        <Td>{rm.dokter.nama}</Td>
                                        <Td>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                    rm.status === 'final' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                            >
                                                {rm.status.toUpperCase()}
                                            </span>
                                        </Td>
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

function Th({ children }) {
    return <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">{children}</th>;
}

function Td({ children }) {
    return <td className="px-4 py-3 text-gray-700">{children}</td>;
}

function Field({ label, value }) {
    return (
        <div>
            <div className="mb-1 text-xs font-semibold text-gray-400 uppercase">{label}</div>
            <div className="whitespace-pre-line">{value}</div>
        </div>
    );
}
