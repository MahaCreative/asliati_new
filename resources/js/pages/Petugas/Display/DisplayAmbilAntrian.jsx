import { router } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import { Building, Clock, Expand, Minimize, Printer, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DisplayAmbilAntrian({ jenis_antrian, poli }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [selectedJenis, setSelectedJenis] = useState(null);
    const [selectedPoli, setSelectedPoli] = useState(null);
    const [calledAntrian] = useState([]);
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

    const CetakHandler = () => {
        router.post(route('petugas.antrian.offline.ambil', { jenis: selectedJenis, poli: selectedPoli }));
    };
    useEchoPublic('UpdateStatusJenis', '.update_status_jenis', (data) => {
        router.reload();
    });
    useEchoPublic('UpdateStatusLoket', '.update_status_loket', (data) => {
        router.reload();
    });
    return (
        <div className="relative h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header Controls */}
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

                {/* Instructions Card */}
                <div className="mx-auto mb-4 max-w-2xl rounded-2xl bg-white p-3 shadow-lg">
                    <div className="mb-4 flex items-center">
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Petunjuk Penggunaan</h2>
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <div className="flex items-start">
                            <span className="mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                                1
                            </span>
                            <p>Pilih jenis antrian yang sesuai dengan kebutuhan Anda</p>
                        </div>
                        <div className="flex items-start">
                            <span className="mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                                2
                            </span>
                            <p>Pilih poli tujuan untuk pemeriksaan</p>
                        </div>
                        <div className="flex items-start">
                            <span className="mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                                3
                            </span>
                            <p>Tekan tombol "Ambil Antrian" untuk mencetak struk</p>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Jenis Antrian Section */}
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                                <Users className="h-5 w-5 text-purple-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Jenis Antrian</h2>
                        </div>
                        <div className="max-h-96 space-y-3 overflow-y-auto">
                            {jenis_antrian.map((item, index) => (
                                <>
                                    <button
                                        key={index}
                                        disabled={!item.status_aktif}
                                        onClick={() => setSelectedJenis(item.id)}
                                        className={`w-full rounded-xl border-2 p-4 transition-all duration-200 ${
                                            selectedJenis === item.id
                                                ? 'border-purple-500 bg-purple-50 shadow-md'
                                                : item.status_aktif
                                                  ? 'border-gray-200 hover:border-purple-300 hover:bg-gray-50 hover:shadow-md'
                                                  : 'cursor-not-allowed border-gray-100 bg-gray-50 opacity-60'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="text-left">
                                                <h3 className="text-lg font-semibold text-gray-900">{item.nama}</h3>
                                                <p className="mt-1 text-sm text-gray-600">Khusus antrian {item.nama.toLowerCase()}</p>
                                            </div>
                                            <div className={`h-3 w-3 rounded-full ${item.status_aktif ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        </div>
                                    </button>
                                </>
                            ))}
                        </div>
                    </div>

                    {/* Poli Section */}
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                        <div className="mb-6 flex items-center">
                            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <Building className="h-5 w-5 text-green-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">Pilih Poli</h2>
                        </div>
                        <div className="grid max-h-96 grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2">
                            {poli.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedPoli(item.id)}
                                    className={`rounded-xl border-2 p-4 transition-all duration-200 ${
                                        selectedPoli === item.id
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
                </div>

                {/* Action Button */}
                <div className="absolute right-5 bottom-5 mt-8 text-center">
                    <button
                        onClick={CetakHandler}
                        disabled={!selectedJenis || !selectedPoli}
                        className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
                    >
                        <Printer className="h-5 w-5" />
                        <span>Ambil Antrian</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
