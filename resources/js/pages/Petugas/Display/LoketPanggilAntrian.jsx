import { Link } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { Check, CircleCheckBig, CircleX, ClockAlert, Volume2 } from 'lucide-react';
import 'moment/locale/id'; // ⬅️ Import bahasa Indonesia
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import AuthLayout from '../../../../Layouts/AuthLayout';
import ProsesAntrian from './Proses/ProsesAntrian';
moment.locale('id');
export default function LoketPanggilAntrian({ jenis_antrian, loket }) {
    const [selectLoket, setSelectLoket] = useState({ id: '', nama_loket: '', jenis: '', jenis_id: '', status: '' });
    const [calledAntrian, setCalled] = useState(null);
    const [antrian, setAntrian] = useState([]);
    const [dokter, setDokter] = useState([]);
    const [modalProses, setModalProses] = useState(false);
    const fetchDokter = async () => {
        try {
            const response = await axios.get(route('api.get-data-dokter-bertugas'), {
                params: {
                    poli_id: calledAntrian?.poli_id,
                },
            });
            setDokter(response.data);
        } catch (err) {
            alert(err);
        }
    };
    const fetchDataAntrian = async () => {
        try {
            const response = await axios.get(route('get-data-antrian-offline'), {
                params: {
                    jenis: selectLoket.jenis,
                },
            });
            setAntrian(response.data);
        } catch (err) {
            alert(err);
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
    const callNextAntrian = async () => {
        localStorage.removeItem('calledAntrian');
        try {
            const response = await axios(route('next-antrian-offline'), {
                params: {
                    jenis: selectLoket.jenis,
                    nama_loket: selectLoket.nama_loket,
                },
            });
            console.log(response.data);

            if (response.data) {
                if (response.data) {
                    setCalled(response.data);
                    localStorage.setItem('calledAntrian', JSON.stringify(response.data)); // simpan ke localStorage
                }
            } else {
                alert('Tidak ada antrian lagi');
            }
        } catch (err) {
            console.log(err);
        }
    };
    const panggilLagi = async (id) => {
        localStorage.removeItem('calledAntrian');
        try {
            const response = await axios.get(route('panggil-kembali-antrian-offline'), {
                params: {
                    id: id,
                    nama_loket: selectLoket.nama_loket,
                },
            });
            if (response.data) {
                if (response.data) {
                    setCalled(response.data);
                    localStorage.setItem('calledAntrian', JSON.stringify(response.data)); // simpan ke localStorage
                }
            } else {
                alert('Tidak ada antrian lagi');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const layani = (value) => {
        setModalProses(true);
    };
    useEffect(() => {
        fetchDataAntrian();
        localStorage.setItem('selectLoket', JSON.stringify(selectLoket));
        // simpan ke localStorage
    }, [selectLoket]);
    useEffect(() => {
        if (calledAntrian) {
            fetchDokter();
        }
    }, [calledAntrian]);
    useEffect(() => {
        const savedCalled = localStorage.getItem('calledAntrian');
        const savedLoket = localStorage.getItem('selectLoket');
        if (savedCalled) {
            setCalled(JSON.parse(savedCalled)); // ambil dari localStorage
        }
        if (savedLoket) {
            setSelectLoket(JSON.parse(savedLoket));
        }
    }, []);
    useEchoPublic('antrian_offline', '.antrian_offline', (data) => {
        if (!selectLoket.jenis) return; // Loket belum dipilih

        // Cek apakah data yang masuk sesuai dengan jenis antrian dari loket yang dipilih
        if (data.data.jenis_antrian_id !== selectLoket.jenis_id) return;

        console.log('Antrian relevan masuk:', data.data);

        setAntrian((prev) => [...prev, data.data]);
    });
    // useEchoPublic('call_antrian_offline', '.call_antrian_offline', (data) => {
    //     setCalled(data.data);
    //     fetchDataAntrian();
    //     router.reload();
    // });
    // useEchoPublic('UpdateStatusJenis', '.update_status_jenis', (data) => {
    //     router.reload();
    // });
    // useEchoPublic('UpdateStatusLoket', '.update_status_loket', (data) => {
    //     router.reload();
    // });
    return (
        <AuthLayout title={'Loket Panggil Antrian'}>
            <ProsesAntrian
                kode_antrian={calledAntrian?.kode_antrian}
                id={calledAntrian?.id}
                dokter={dokter}
                isOpen={modalProses}
                close={() => {
                    setModalProses(false);
                }}
            />
            <div>
                <h1 className="text-lg leading-5 font-bold text-black">Loket Panggil Antrian</h1>
                <p className="text-sm leading-5 font-light tracking-tight text-black">
                    Silahkan memilih loket terlebih dahulu untuk melakukan panggilan antrian
                </p>
                <Divider />
            </div>
            <div className="my-3 rounded-md bg-white px-4 py-3 text-gray-800 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center rounded-md bg-gradient-to-tl from-blue-800 via-blue-700 to-blue-600 p-4 text-2xl text-white">
                        <Volume2 />
                    </div>
                    <div>
                        <h1 className="text-base font-bold">Loket Panggilan Antrian</h1>
                        <p className="text-xs font-light">Sistem informasi pendaftaran Pasien</p>
                    </div>
                </div>
                <div className="my-2 grid grid-cols-3 gap-3 md:grid-cols-4">
                    {loket.map((item, key) => (
                        <button
                            onClick={() =>
                                setSelectLoket({
                                    ...selectLoket,
                                    id: item.id,
                                    nama_loket: item.nama,
                                    jenis: item.jenis.nama,
                                    status: item.status_aktif,
                                    jenis_id: item.jenis.id,
                                })
                            }
                            key={key}
                            className={`hover:cursor-pointer ${selectLoket.id == item.id ? 'bg-gradient-to-tl from-blue-800 via-blue-700 to-blue-600 text-white' : 'bg-white text-black'} flex flex-col items-center justify-center rounded-md border-gray-200/40 p-4 shadow hover:bg-gradient-to-tl hover:from-blue-800 hover:via-blue-700 hover:to-blue-600 hover:text-white`}
                        >
                            <p className="text-xl font-extrabold">{item.nama}</p>
                            <p className="text-xs font-light tracking-tight">Loket untuk {item.jenis.nama}</p>
                            <div className="my-2 flex items-center gap-3">
                                <div className={`h-2 w-2 rounded-full ${item.status_aktif ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <p className="text-xs font-light tracking-tight">{item.status_aktif ? 'Aktif' : 'Non'}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="min-h-[250px] w-full rounded-md bg-white px-4 py-3 text-black shadow">
                    {calledAntrian ? (
                        <div className="w-full rounded-md bg-white px-6 py-6 shadow-md">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <p className="text-base font-bold text-gray-800">Nomor Antrian Saat Ini</p>
                                <div className="flex items-center gap-1 text-sm text-yellow-600">
                                    <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                                    {calledAntrian.status}
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
                                <p className="mt-2 text-base font-semibold text-gray-800">{calledAntrian.poli?.nama || 'Layanan Tidak Diketahui'}</p>
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

                                <button
                                    onClick={() => layani(calledAntrian)}
                                    className="flex items-center justify-center gap-2 rounded-md bg-green-600 py-2 text-white shadow hover:bg-green-700"
                                >
                                    <Check /> Layani
                                </button>
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
                <div className="min-h-[250px] w-1/3 rounded-md bg-white px-4 py-3 shadow">
                    <p className="font-bold text-black">Status Loket</p>
                    <div className="my-3 flex h-full w-full flex-col items-center justify-center">
                        <div
                            className={`flex items-center justify-center ${selectLoket.status ? 'bg-green-500' : 'bg-red-500'} h-16 w-16 rounded-md text-8xl text-white shadow`}
                        >
                            {selectLoket.status ? <CircleCheckBig size={40} /> : <CircleX size={40} />}
                        </div>
                        <p className="mt-3 mb-2 font-light text-gray-400 capitalize">{selectLoket.nama_loket + ' - ' + selectLoket.jenis}</p>
                        <p className={`${selectLoket.status ? 'text-green-500' : 'text-red-500'} text-2xl font-extrabold tracking-tighter`}>
                            {selectLoket.status ? 'Sedang Buka' : 'Sedang Tutup'}
                        </p>
                        {selectLoket.id !== '' && (
                            <Link
                                method="post"
                                data={{ id: selectLoket.id, status: !selectLoket.status }}
                                href={route('petugas.loket-jenis-antrian.update_status_loket')}
                                className={`${!selectLoket.status ? 'bg-green-500' : 'bg-red-500'} mt-1 rounded-md px-4 py-1.5 font-bold text-white hover:cursor-pointer`}
                                as={'button'}
                            >
                                {!selectLoket.status ? 'Buka Loket' : 'Tutup Loket'}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {/* TABLE */}
            <div className="w-full rounded-md bg-white px-4 py-3 shadow">
                <div className="flex items-center justify-between">
                    <p className="font-bold text-black">Daftar Antrian</p>
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
                                    <p className="font-bold tracking-tight text-slate-800 capitalize">{item.poli.nama}</p>
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
