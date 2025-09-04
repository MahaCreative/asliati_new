import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Search } from 'lucide-react';

import { useForm } from '@inertiajs/react';
import axios from 'axios';
import FormPasien from './FormPasien';
export default function ProsesAntrian({ isOpen, close, dokter, kode_antrian = '', id }) {
    const { data, setData, post, reset, errors, progress } = useForm({
        dokter_id: '',
        jenis_pasien: '',
        keluhan: '',
        nik: '',
        bpjs: '',
        nama_lengkap: '',
        telephone: '',
        tempat_lahir: '',
        jenis_kelamin: '',
        tanggal_lahir: '',
    });

    const fetchPasien = async () => {
        try {
            const response = await axios.get(route('api.show-data-pasien'), {
                params: {
                    nik: data.nik,
                },
            });
            // setData(response.data);
            console.log(response.data);
            if (response.data) {
                setData({
                    ...data,
                    jenis_pasien: 'lama',
                    nik: response.data.nik,
                    bpjs: response.data.bpjs,
                    nama_lengkap: response.data.nama_lengkap,
                    telephone: response.data.telephone,
                    tempat_lahir: response.data.tempat_lahir,
                    jenis_kelamin: response.data.jenis_kelamin,
                    tanggal_lahir: response.data.tanggal_lahir,
                });
            } else {
                console.log('tidak ada');
                alert('pasien tidak ditemukan');
                setData({
                    ...data,
                    jenis_pasien: 'baru',
                    nik: '',
                    bpjs: '',
                    nama_lengkap: '',
                    telephone: '',
                    tempat_lahir: '',
                    jenis_kelamin: '',
                    tanggal_lahir: '',
                });
            }
        } catch (err) {}
    };

    const prosesAntrian = () => {
        post(route('petugas.antrian.offline.proses', id), {
            onSuccess: () => {
                reset();
            },
        });
    };
    console.log(id);

    return (
        <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-slate-900/50">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className={`w-full max-w-5xl rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0`}
                    >
                        <DialogTitle as="h3" className="text-base/7 font-medium text-black">
                            Proses Antrian {kode_antrian}
                        </DialogTitle>

                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="my-1">
                                <p className="mt-2 text-sm/6 text-black">
                                    Silahkan mencari Pasien Terdaftar dengan mengisi kolom Search dengan NIK KTP Pasien
                                </p>
                                <div className="my-2 flex items-center gap-3">
                                    <div>
                                        <label htmlFor="nama_poli" className="block text-sm font-medium text-gray-700">
                                            NIK Pasien <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="numeric"
                                            id="nik"
                                            maxLength={16}
                                            value={data.nik}
                                            onChange={(e) => setData({ ...data, nik: e.target.value })}
                                            className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
                                            placeholder="NIK Pasien"
                                        />
                                    </div>
                                    <button
                                        onClick={fetchPasien}
                                        className="flex h-12 w-12 flex-col items-center justify-center rounded-md bg-slate-600/50 hover:cursor-pointer"
                                    >
                                        <Search />
                                    </button>
                                </div>
                                <label htmlFor="dokter" className="block text-sm font-medium text-gray-700">
                                    Pilih Dokter <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="dokter"
                                    value={data.dokter_id}
                                    onChange={(e) => setData({ ...data, dokter_id: e.target.value })}
                                    className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${
                                        errors?.dokter_id ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Pilih Dokter</option>
                                    {dokter.map((item, key) => (
                                        <option key={key} value={item.id}>
                                            {item.user.name}
                                        </option>
                                    ))}
                                </select>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Keluhan Pasien</label>
                                    <textarea
                                        value={data.keluhan}
                                        onChange={(e) => setData('keluhan', e.target.value)}
                                        rows={4}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="isikan keluhan pasien"
                                    />
                                    {errors.keluhan && <p className="mt-1 text-sm text-red-600">{errors.keluhan}</p>}
                                </div>
                                <button
                                    onClick={prosesAntrian}
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Proses Antrian
                                </button>
                            </div>

                            <div>
                                <FormPasien setData={setData} data={data} />
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
