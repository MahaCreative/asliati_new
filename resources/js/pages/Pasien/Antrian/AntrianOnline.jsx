import { Link, router, useForm } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import { debounce, pickBy } from 'lodash';
import { Building, Clock, Expand, FormInput, List, Minimize, MoveLeft, Printer, Stethoscope } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export default function AntrianOnline({ poli, dokter, antrian, keluarga }) {
    const { data, setData, post, errors, reset, processing } = useForm({
        tanggal_kunjungan: new Date(),
        keluarga_id: '',
        keluhan: '',
        jam_kunjungan: '',
        poli_id: '',
        dokter_id: '',
    });
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showInstruksi, setShowInstruksu] = useState(false);
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error('Error toggling fullscreen:', error);
        }
    };
    const reload = useCallback(
        debounce((query) => {
            router.get(route('pasien.take-antrian.online'), pickBy({ ...query }), {
                preserveScroll: true,
                preserveState: true,
            });
        }),
    );

    const ambilAntrian = () => {
        post(route('pasien.antrian.online.ambil'));
    };

    useEchoPublic('poli_channel', 'PoliEvent', (data) => {
        router.reload();
    });
    useEchoPublic('dokter_channel', 'DokterEvent', (data) => {
        router.reload();
    });
    useEchoPublic('pasien_channel', 'PasienEvent', (data) => {
        router.reload();
    });
    useEffect(() => {
        if (dokter.length == 0) {
            setData('dokter_id', '');
        }
    }, [dokter]);

    useEffect(() => reload(data), [data]);
    return (
        <div className="relative max-h-screen min-h-screen w-full overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header Controls */}
            <div className="fixed top-4 left-4 z-50">
                <Link
                    as={'button'}
                    href={route('pasien.dashboard')}
                    className={`h-[20px] w-[20px] cursor-pointer rounded-lg border border-gray-200/50 p-2.5 shadow-lg transition-all duration-200 ease-in-out`}
                >
                    <MoveLeft color="blue" /> Dashboard
                </Link>
            </div>
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={toggleFullscreen}
                    className={`rounded-lg p-2.5 shadow-lg transition-all duration-200 ease-in-out ${
                        isFullscreen
                            ? 'bg-white text-blue-600 hover:bg-blue-50'
                            : 'bg-white/90 text-gray-600 backdrop-blur-sm hover:bg-white hover:text-blue-600'
                    } border border-gray-200/50`}
                >
                    {isFullscreen ? <Minimize className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
                </button>
            </div>
            {/* Main Container */}
            <div className="container mx-auto flex h-full flex-col px-4 py-2">
                {/* Header Section */}
                <div className="mb-3 text-center">
                    <h1 className="mb-2 text-4xl font-bold text-gray-900">Sistem Antrian Klinik</h1>
                    <p className="text-lg text-gray-600">Silakan pilih jenis antrian dan poli tujuan Anda</p>
                </div>
                <div className="flex w-full flex-col items-start justify-between gap-4">
                    {/* Instructions Card */}
                    <div className={`mx-auto mb-2 w-full rounded-2xl bg-white p-3 shadow-lg`}>
                        <div className="flex justify-between">
                            <div className="mb-4 flex items-center">
                                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900">Petunjuk Pengambilan Antrian</h2>
                            </div>
                            <button
                                onClick={() => setShowInstruksu(!showInstruksi)}
                                className="scale-95 rounded-md p-2 text-black hover:cursor-pointer hover:bg-blue-500 hover:text-white"
                            >
                                {showInstruksi ? <Minimize size={20} /> : <Expand size={20} />}
                            </button>
                        </div>

                        <div className={`${showInstruksi ? 'block' : 'hidden'} space-y-2 text-gray-700`}>
                            <div className="flex items-start">
                                <span className="mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                                    1
                                </span>
                                <p>Silahkan Isikan Waktu Kunjungan, Dan Keluarga Yang Ingin Di Periksa</p>
                            </div>
                            <div className="flex items-start">
                                <span className="mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                                    2
                                </span>
                                <p>Selanjutnya Pilih Poli Tujuan Anda</p>
                            </div>
                            <div className="flex items-start">
                                <span className="mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                                    3
                                </span>
                                <p>Pilih Dokter Yang Bertugas </p>
                            </div>
                            <div className="flex items-start">
                                <span className="mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                                    4
                                </span>
                                <p>Tekan Tombol Ambil Antrian </p>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto mb-2 w-full rounded-2xl bg-white p-3 shadow-lg">
                        <div className="mb-2 flex items-center">
                            <div className="mr-3 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100">
                                <FormInput className="h-5 w-5 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Jadwal Pemeriksaan</h2>
                        </div>

                        <div className="flex items-center gap-3 space-y-1 text-gray-700">
                            <div className="w-full">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Tanggal Kunjungan<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal_kunjungan}
                                    onChange={(e) => setData('tanggal_kunjungan', e.target.value)}
                                    min={new Date().toISOString().split('T')[0]} // format: YYYY-MM-DD
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="Pilih tanggal"
                                />
                                {errors.tanggal_kunjungan && <p className="mt-1 text-sm text-red-600">{errors.tanggal_kunjungan}</p>}
                            </div>
                            <div className="w-full">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Waktu Kunjungan<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="time"
                                    value={data.jam_kunjungan}
                                    onChange={(e) => setData('jam_kunjungan', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="Dr. John Doe"
                                />
                                {errors.jam_kunjungan && <p className="mt-1 text-sm text-red-600">{errors.jam_kunjungan}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pilih Keluarga</label>
                            <select
                                value={data.keluarga_id}
                                onChange={(e) => setData('keluarga_id', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Anggota Keluarga</option>
                                {keluarga.map((item, key) => (
                                    <option className="capitalize" key={key} value={item.id}>
                                        {item.nama_lengkap + ' | ' + item.status_keluarga}
                                    </option>
                                ))}
                            </select>
                            {errors?.keluarga_id && <p className="mt-1 text-sm text-red-600">{errors?.keluarga_id}</p>}
                        </div>
                        <div className="w-full">
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Keluhan<span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={data.keluhan}
                                onChange={(e) => setData('keluhan', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-500 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                placeholder="keluhan anda"
                            />
                            {errors.keluhan && <p className="mt-1 text-sm text-red-600">{errors.keluhan}</p>}
                        </div>
                    </div>
                </div>
                {/* Content Grid */}
                <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Poli Section */}
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <Building className="h-5 w-5 text-green-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Pilih Poli</h2>
                        </div>
                        <div className="grid max-h-32 grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2">
                            {poli.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setData('poli_id', item.id)}
                                    className={`rounded-xl border-2 p-4 transition-all duration-200 ${
                                        data.poli_id === item.id
                                            ? 'border-green-500 bg-green-50 shadow-md'
                                            : 'border-gray-200 hover:border-green-300 hover:bg-gray-50 hover:shadow-md'
                                    }`}
                                >
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold text-gray-900">{item.nama}</h3>
                                        <p className="mt-1 text-sm text-gray-600">Pemeriksaan di poli {item.nama.toLowerCase()}</p>
                                    </div>
                                    <div className={`mt-2 h-3 w-3 rounded-full ${item.status_aktif ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <Stethoscope className="h-5 w-5 text-green-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Pilih Dokter</h2>
                        </div>
                        <div className="grid max-h-32 grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2">
                            <div className="grid grid-cols-1 gap-2 capitalize">
                                {dokter.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setData('dokter_id', item.id)}
                                        className={`rounded-xl border-2 p-4 transition-all duration-200 ${
                                            data.dokter_id === item.id
                                                ? 'border-green-500 bg-green-50 shadow-md'
                                                : 'border-gray-200 hover:border-green-300 hover:bg-gray-50 hover:shadow-md'
                                        }`}
                                    >
                                        <div className="text-left">
                                            <h3 className="text-lg font-semibold text-gray-900 capitalize">Dokter {item.user.name}</h3>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {antrian ? (
                                <div className="min-h[80px] flex flex-col items-center justify-center rounded-md border border-gray-300/40 bg-gray-100 text-center shadow">
                                    <p className="text-xs text-gray-500">Antrian Terakhir</p>
                                    <p className="text-5xl font-bold text-blue-600">{antrian.kode_antrian}</p>
                                    <p className="text-base font-bold tracking-tighter text-gray-400 capitalize">
                                        {'Dokter Tujuan ' + antrian.dokter?.user?.name}
                                    </p>

                                    <button className="mt-2 rounded bg-blue-500 px-4 py-1 text-sm text-white">{antrian?.status}</button>
                                </div>
                            ) : (
                                <div className="min-h[80px] flex flex-col items-center justify-center rounded-md border border-gray-300/40 bg-gray-100 text-center shadow">
                                    <div className="flex flex-col items-center justify-center">
                                        <List size={43} color="black" />
                                        <p className="text-sm font-bold tracking-tight text-gray-700">Belum ada antrian yang dibuat</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed right-5 bottom-5 mt-8 text-center">
                <button
                    onClick={ambilAntrian}
                    disabled={!data.dokter_id || !data.poli_id || !data.tanggal_kunjungan || !data.keluarga_id || !data.jam_kunjungan}
                    className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
                >
                    <Printer className="h-5 w-5" />
                    <span>Ambil Antrian</span>
                </button>
            </div>
        </div>
    );
}
