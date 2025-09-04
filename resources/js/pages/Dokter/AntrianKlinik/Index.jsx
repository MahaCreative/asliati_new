import { Link, router } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import axios from 'axios';
import { Check, ClockAlert, Volume2 } from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import AuthLayout from '../../../../Layouts/AuthLayout';

export default function Index({ antrian, dokter }) {
    const [calledAntrian, setCalled] = useState(null);
    const callNextAntrian = async () => {
        try {
            const response = await axios(route('next-antrian-online'), {
                params: {
                    dokter_id: dokter.id,
                },
            });

            if (response.data) {
                setCalled(response.data);
                localStorage.setItem('calledAntrian', JSON.stringify(response.data)); // simpan ke localStorage
                console.log(response.data);
            } else {
                alert('Tidak ada antrian lagi');
            }
        } catch (err) {
            console.log(err);
        }
    };
    const colorStatus = (status) => {
        let colorB = '';
        let colorT = ';';
        switch (status) {
            case 'menunggu':
                colorB = 'bg-orange-100';
                colorT = 'text-orange-600';
                break;
            case 'selesai':
                colorB = 'bg-green-100';
                colorT = 'text-green-600';
                break;
            case 'dipanggil':
                colorB = 'bg-blue-100';
                colorT = 'text-blue-600';
                break;
            case 'batal':
                colorB = 'bg-red-100';
                colorT = 'text-red-600';
                break;
        }
        return colorB + ' ' + colorT;
    };
    const panggilLagi = async (id) => {
        localStorage.removeItem('calledAntrian');
        try {
            const response = await axios.get(route('panggil-kembali-antrian-online'), {
                params: {
                    id: id,
                },
            });
            if (response.data) {
                setCalled(response.data);
                localStorage.setItem('calledAntrian', JSON.stringify(response.data)); // simpan ke localStorage
            } else {
                alert('Tidak ada antrian lagi');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEchoPublic('call_antrian_online', 'CallAntrianOnlineEvent', (data) => {
        router.reload();
    });
    useEchoPublic('antrian_klinik_events', 'AntrianKlinikEvent', (data) => {
        router.reload();
    });
    return (
        <AuthLayout title={'Antrian Klinik'}>
            {/* TABLE */}
            <div className="max-w-xl">
                <div className="min-h-[250px] w-full rounded-md bg-white px-4 py-3 text-black shadow">
                    {calledAntrian ? (
                        <div className="w-full rounded-md bg-white px-6 py-6 shadow-md">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <p className="text-base font-bold text-gray-800">Nomor Antrian Saat Ini</p>
                                <div className="flex items-center gap-1 text-sm text-yellow-600">
                                    <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                                    Menunggu Dipanggil
                                </div>
                            </div>

                            {/* Kode Antrian */}
                            <div className="mt-6 flex flex-col items-center justify-center">
                                <div className="relative rounded-md bg-blue-500 px-10 py-6 text-5xl font-extrabold text-white shadow-lg">
                                    {calledAntrian.kode_antrian}
                                    <span className="absolute -top-3 -right-3 rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-bold text-white shadow">
                                        O
                                    </span>
                                </div>
                                <p className="mt-2 text-base font-semibold text-gray-800">
                                    {calledAntrian.pasien?.nama_lengkap || 'Layanan Tidak Diketahui'}
                                </p>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <button
                                    onClick={() => panggilLagi(calledAntrian.id)}
                                    className="flex items-center justify-center gap-2 rounded-md bg-blue-600 py-2 text-white shadow hover:bg-blue-700"
                                >
                                    <span>
                                        <Volume2 />
                                    </span>{' '}
                                    Panggil Lagi
                                </button>

                                <Link
                                    href={route('dokter.proses-antrian-klinik.index', calledAntrian.id)}
                                    as={'button'}
                                    className="flex items-center justify-center gap-2 rounded-md bg-green-600 py-2 text-white shadow hover:bg-green-700"
                                >
                                    <Check /> Layani
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center py-6">
                            <div className="flex items-center justify-center rounded-full bg-gray-300 p-4 text-gray-700">
                                <ClockAlert size={50} />
                            </div>
                            <p className="my-2 text-lg font-bold">Belum Ada Antrian Yang Sedang Dipanggil</p>
                            <p className="text-sm font-light text-gray-400 italic">Tekan Tombol "Panggil Antrian" Untuk Memulai</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full rounded-md bg-white px-4 py-3 shadow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-md bg-gradient-to-br from-blue-700 to-blue-600 px-3 py-2">
                            <Volume2 />
                        </div>
                        <p className="font-bold text-black">Daftar Antrian</p>
                    </div>
                    <span className="rounded-md bg-blue-100 px-3 py-2 text-sm text-blue-800">0 Menunggu</span>
                </div>
                {antrian.length > 0 && (
                    <button
                        onClick={callNextAntrian}
                        className="my-3 flex w-full justify-center gap-3 rounded-md bg-gradient-to-tl from-blue-800 via-blue-700 to-blue-600 py-2 text-center text-white shadow transition-all duration-300 hover:scale-95 hover:cursor-pointer"
                    >
                        <span>
                            <Volume2 />
                        </span>
                        <span>Panggil Antrian Selanjutnya</span>
                    </button>
                )}
                {antrian.length > 0 ? (
                    antrian.map((item, index) => (
                        <div key={index} className="my-1.5 h-fit rounded-md border border-gray-300/50 bg-white px-3 py-3 shadow">
                            <div className="flex items-start gap-4">
                                <div className="inline items-center justify-center rounded-md bg-gradient-to-tl from-blue-800 via-blue-700 to-blue-600 p-4 text-sm font-extrabold tracking-tighter text-white">
                                    {item.kode_antrian}
                                </div>
                                <div>
                                    <p className="font-bold tracking-tight text-slate-800 capitalize">{item.pasien.nama_lengkap}</p>
                                    <p className="text-sm font-light text-black">{moment(item.created_at).format('dddd, D-M-Y')}</p>
                                    <span className={`${colorStatus(item.status)} my-2 rounded-md p-1 text-sm capitalize`}>{item.status}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        </AuthLayout>
    );
}
