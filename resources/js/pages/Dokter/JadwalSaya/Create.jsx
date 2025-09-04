import { Link, useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import AuthLayout from '../../../../Layouts/AuthLayout';

export default function Create() {
    const { data, setData, post, reset, errors, processing } = useForm({
        jadwal: [
            { hari: 'Senin', jam_mulai: '08:00', jam_selesai: '12:00' },
            { hari: 'Selasa', jam_mulai: '08:00', jam_selesai: '12:00' },
        ],
    });
    const addJadwal = () => {
        setData('jadwal', [...data.jadwal, { hari: 'Senin', jam_mulai: '08:00', jam_selesai: '12:00' }]);
    };

    const removeJadwal = (index) => {
        const newJadwal = data.jadwal.filter((_, i) => i !== index);
        setData('jadwal', newJadwal);
    };

    const handleJadwalChange = (index, field, value) => {
        const newJadwal = [...data.jadwal];
        newJadwal[index][field] = value;
        setData('jadwal', newJadwal);
    };
    const hariOptions = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    const submit = (e) => {
        e.preventDefault();
        post(route('dokter.jadwal-saya.store'));
    };
    return (
        <AuthLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Tambah Dokter Baru</h1>
                <p className="mt-2 text-gray-600">Lengkapi informasi dokter dan jadwal praktik</p>
            </div>

            <form onSubmit={submit} className="space-y-8">
                {/* Jadwal Dokter */}
                <div className="rounded-xl bg-white p-8 shadow-lg">
                    <h2 className="mb-6 flex items-center text-xl font-semibold text-gray-900">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                            <span className="font-bold text-green-600">2</span>
                        </div>
                        Jadwal Praktik
                    </h2>

                    <div className="space-y-4">
                        {data.jadwal.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4 rounded-lg border border-gray-200 p-4">
                                <div className="flex-1">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Hari</label>
                                    <select
                                        value={item.hari}
                                        onChange={(e) => handleJadwalChange(index, 'hari', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 focus:ring-2 focus:ring-blue-500"
                                    >
                                        {hariOptions.map((hari) => (
                                            <option key={hari} value={hari}>
                                                {hari}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex-1">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Jam Mulai</label>
                                    <input
                                        type="time"
                                        value={item.jam_mulai}
                                        onChange={(e) => handleJadwalChange(index, 'jam_mulai', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">Jam Selesai</label>
                                    <input
                                        type="time"
                                        value={item.jam_selesai}
                                        onChange={(e) => handleJadwalChange(index, 'jam_selesai', e.target.value)}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <button type="button" onClick={() => removeJadwal(index)} className="rounded-md p-2 text-red-600 hover:bg-red-50">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addJadwal}
                            className="flex items-center space-x-2 rounded-md bg-blue-100 px-4 py-2 text-blue-700 transition-colors hover:bg-blue-200"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Tambah Jadwal</span>
                        </button>
                    </div>
                </div>

                {/* Tombol Submit */}
                <div className="my-3 flex justify-end space-x-4">
                    <Link
                        href={route('dokter.jadwal-saya.index')}
                        className="rounded-lg bg-gray-200 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-300"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Jadwal'}
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
}
