import { router } from '@inertiajs/react';
import { Activity, Calendar, FileText, Heart, MessageSquare, Pill, Stethoscope, User } from 'lucide-react';
import { useState } from 'react';
import AuthLayout from '../../../../Layouts/AuthLayout';

export default function Proses({ antrian, pasien }) {
    const [rekamMedis, setRekamMedis] = useState({
        keluhan: antrian.keluhan,
        diagnosa: '',
        resep: '',
        catatan: '',
        tekanan_darah: '',
        denyut_nadi: '',
        suhu_tubuh: '',
        tinggi_badan: '',
        berat_badan: '',
        pernapasan: '',
        riwayat_penyakit: '',

        tindakan_medis: '',
        instruksi_pasien: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRekamMedis({ ...rekamMedis, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic for medical records
        router.post(route('dokter.proses-antrian-klinik.store'), {
            ...rekamMedis,
            antrian_id: antrian.id,
            pasien_id: pasien.id,
            dokter_id: antrian.dokter_id,
            poli_id: antrian.poli_id,
            tanggal_kunjungan: new Date().toISOString().split('T')[0], // Set current date
        });
    };

    return (
        <AuthLayout title={`Proses Antrian - ${antrian.kode_antrian}`}>
            <div className="mx-auto max-w-4xl space-y-6 p-4">
                {/* Patient Info Card */}
                <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="rounded-full bg-white/20 p-3">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">Antrian #{antrian.kode_antrian}</h2>
                                <p className="text-blue-100">{pasien.nama_lengkap}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm opacity-90">NIK: {pasien.nik}</p>
                            <p className="text-sm opacity-90">Telp: {pasien.telephone}</p>
                        </div>
                    </div>
                </div>

                {/* Medical Record Form */}
                <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                        <h3 className="flex items-center text-xl font-bold text-white">
                            <FileText className="mr-2 h-5 w-5" />
                            Rekam Medis Baru
                        </h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 p-6">
                        {/* Basic Medical Info */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block flex items-center text-sm font-medium text-gray-700">
                                    <MessageSquare className="mr-2 h-4 w-4 text-green-600" />
                                    Keluhan
                                </label>
                                <textarea
                                    name="keluhan"
                                    value={rekamMedis.keluhan}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-green-500"
                                    rows="3"
                                    placeholder="Keluhan utama pasien..."
                                />
                            </div>
                            <div>
                                <label className="mb-2 block flex items-center text-sm font-medium text-gray-700">
                                    <Stethoscope className="mr-2 h-4 w-4 text-green-600" />
                                    Diagnosa
                                </label>
                                <textarea
                                    name="diagnosa"
                                    value={rekamMedis.diagnosa}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-green-500"
                                    rows="3"
                                    placeholder="Diagnosa dokter..."
                                />
                            </div>
                        </div>

                        {/* Vital Signs */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h4 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                                <Activity className="mr-2 h-5 w-5 text-blue-600" />
                                Tanda Vital
                            </h4>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Tekanan Darah</label>
                                    <input
                                        type="text"
                                        name="tekanan_darah"
                                        value={rekamMedis.tekanan_darah}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                                        placeholder="120/80 mmHg"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Denyut Nadi</label>
                                    <input
                                        type="number"
                                        name="denyut_nadi"
                                        value={rekamMedis.denyut_nadi}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                                        placeholder="72 bpm"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Suhu Tubuh</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        name="suhu_tubuh"
                                        value={rekamMedis.suhu_tubuh}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                                        placeholder="36.5 °C"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Tinggi Badan</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        name="tinggi_badan"
                                        value={rekamMedis.tinggi_badan}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                                        placeholder="170 cm"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Berat Badan</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        name="berat_badan"
                                        value={rekamMedis.berat_badan}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                                        placeholder="65 kg"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Pernapasan</label>
                                    <input
                                        type="text"
                                        name="pernapasan"
                                        value={rekamMedis.pernapasan}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500"
                                        placeholder="16x/menit"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Additional Medical Info */}
                        <div className="">
                            <div>
                                <label className="mb-2 block flex items-center text-sm font-medium text-gray-700">
                                    <Heart className="mr-2 h-4 w-4 text-red-600" />
                                    Riwayat Penyakit
                                </label>
                                <textarea
                                    name="riwayat_penyakit"
                                    value={rekamMedis.riwayat_penyakit}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-500"
                                    rows="2"
                                    placeholder="Riwayat penyakit sebelumnya..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block flex items-center text-sm font-medium text-gray-700">
                                    <Pill className="mr-2 h-4 w-4 text-yellow-600" />
                                    Resep Obat
                                </label>
                                <textarea
                                    name="resep"
                                    value={rekamMedis.resep}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-500"
                                    rows="3"
                                    placeholder="Resep obat yang diberikan..."
                                />
                            </div>
                            <div>
                                <label className="mb-2 block flex items-center text-sm font-medium text-gray-700">
                                    <Stethoscope className="mr-2 h-4 w-4 text-green-600" />
                                    Tindakan Medis
                                </label>
                                <textarea
                                    name="tindakan_medis"
                                    value={rekamMedis.tindakan_medis}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-500"
                                    rows="2"
                                    placeholder="Tindakan medis yang dilakukan..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="mb-2 block flex items-center text-sm font-medium text-gray-700">
                                    <MessageSquare className="mr-2 h-4 w-4 text-blue-600" />
                                    Catatan & Instruksi
                                </label>
                                <textarea
                                    name="catatan"
                                    value={rekamMedis.catatan}
                                    onChange={handleChange}
                                    className="mb-3 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                                    rows="2"
                                    placeholder="Catatan tambahan..."
                                />
                                <textarea
                                    name="instruksi_pasien"
                                    value={rekamMedis.instruksi_pasien}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                                    rows="2"
                                    placeholder="Instruksi untuk pasien..."
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full transform rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:from-green-700 hover:to-green-800"
                        >
                            Simpan Rekam Medis
                        </button>
                    </form>
                </div>

                {/* Medical History Records */}
                <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                        <h3 className="flex items-center text-xl font-bold text-white">
                            <Calendar className="mr-2 h-5 w-5" />
                            Riwayat Rekam Medis
                        </h3>
                    </div>

                    <div className="space-y-4 p-6">
                        {pasien.rekamMedis && pasien.rekamMedis.length > 0 ? (
                            pasien.rekamMedis.map((rekam, index) => (
                                <div key={index} className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h4 className="flex items-center text-lg font-semibold text-gray-800">
                                            <Calendar className="mr-2 h-4 w-4 text-purple-600" />
                                            {rekam.tanggal_kunjungan}
                                        </h4>
                                        <span className="rounded-full bg-purple-100 px-2 py-1 text-sm text-purple-800">Kunjungan #{index + 1}</span>
                                    </div>

                                    <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <p className="text-sm">
                                                <span className="font-semibold text-gray-700">Keluhan:</span> {rekam.keluhan || '-'}
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-semibold text-gray-700">Diagnosa:</span> {rekam.diagnosa || '-'}
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-semibold text-gray-700">Resep:</span> {rekam.resep || '-'}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm">
                                                <span className="font-semibold text-gray-700">Tekanan Darah:</span> {rekam.tekanan_darah || '-'}
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-semibold text-gray-700">Denyut Nadi:</span> {rekam.denyut_nadi || '-'}
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-semibold text-gray-700">Suhu Tubuh:</span> {rekam.suhu_tubuh || '-'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 border-t pt-3">
                                        <p className="text-sm">
                                            <span className="font-semibold text-gray-700">Tinggi/Berat:</span> {rekam.tinggi_badan || '-'} cm /{' '}
                                            {rekam.berat_badan || '-'} kg
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-semibold text-gray-700">Pernapasan:</span> {rekam.pernapasan || '-'}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-semibold text-gray-700">Riwayat Penyakit:</span> {rekam.riwayat_penyakit || '-'}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-semibold text-gray-700">Tindakan Medis:</span> {rekam.tindakan_medis || '-'}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-semibold text-gray-700">Instruksi:</span> {rekam.instruksi_pasien || '-'}
                                        </p>
                                        <p className="text-sm">
                                            <span className="font-semibold text-gray-700">Catatan:</span> {rekam.catatan || '-'}
                                        </p>
                                        {rekam.hasil_lab && (
                                            <p className="text-sm">
                                                <span className="font-semibold text-gray-700">Hasil Lab:</span> {JSON.stringify(rekam.hasil_lab)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-8 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <FileText className="h-8 w-8 text-gray-400" />
                                </div>
                                <p className="text-lg text-gray-500">Tidak ada riwayat rekam medis</p>
                                <p className="text-sm text-gray-400">Data riwayat akan muncul di sini setelah disimpan</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
