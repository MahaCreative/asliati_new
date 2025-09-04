import { router } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import { Expand, Hospital, Minimize } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DisplayAntrian({ loket, profile, antrianTerbaru }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [calledAntrian, setCalled] = useState(false);

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
    useEchoPublic('call_antrian_offline', '.call_antrian_offline', (data) => {
        console.log(data);

        router.reload();
    });
    useEchoPublic('call_again_antrian_offline', 'CallAgainAntrianOfflineEvent', (data) => {
        router.reload();
    });
    useEchoPublic('UpdateStatusJenis', '.update_status_jenis', (data) => {
        router.reload();
    });
    useEchoPublic('UpdateStatusLoket', '.update_status_loket', (data) => {
        router.reload();
    });
    const bgStatus = (status) => {
        let bg_color = '';
        let text_color = '';
        switch (status) {
            case 'dipanggil':
                bg_color = 'bg-blue-300';
                text_color = 'text-blue-700';
                break;
            case true:
                bg_color = 'bg-green-300';
                text_color = 'text-green-700';
                break;
            case false:
                bg_color = 'bg-red-300';
                text_color = 'text-red-700';
                break;
        }
        return bg_color + ' ' + text_color;
    };

    return (
        <div className="relative max-h-screen w-full overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100">
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
            <div className="container mx-auto flex flex-row items-center px-4 py-2">
                {/* Header Section */}
                <img src={'/storage/' + profile.logo} alt="" className="h-12 w-12 object-cover object-center md:h-20 md:w-20 lg:h-24 lg:w-24" />
                <div className="text-left">
                    <h1 className="mb-2 text-base leading-3 font-bold text-gray-900 md:text-xl lg:text-2xl">{profile.nama_klinik}</h1>
                    <p className="text-sm leading-3 font-light tracking-tighter text-gray-600 md:text-base lg:text-lg">
                        Sistem informasi pendaftaran pasien
                    </p>
                </div>
            </div>
            <div className="flex w-full flex-row gap-3 px-4 md:px-8 lg:px-16">
                {/* <div className="h-full w-[100px]"></div> */}
                <div className="grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
                    {loket.map((item, index) => (
                        <div key={index} className="w-full rounded-md bg-white shadow">
                            <div className="flex flex-row items-center justify-between px-4 py-3">
                                <div className="flex items-center gap-3">
                                    <Hospital color="black" />
                                    <p className="text-xs font-bold text-black md:text-sm lg:text-base">Loket {item.nama}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className={`${bgStatus(item.status_aktif)} h-3 w-3 rounded-full`}></div>
                                    <div className={`${bgStatus(item.status_aktif)} rounded-md px-3 py-2 text-xs font-bold`}>
                                        {item.status_aktif ? 'Buka' : 'Tutup'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex min-h-[200px] w-full items-center justify-center">
                                {antrianTerbaru
                                    .filter((antri) => antri.loket_tujuan === item.nama)
                                    .slice(0, 1) // Ambil hanya 1 antrian terbaru per loket
                                    .map((antri) => (
                                        <div key={antri.id} className="text-center">
                                            <p className="text-xs text-gray-500">Nomor Antrian</p>
                                            <p className="text-5xl font-bold text-blue-600">{antri.kode_antrian}</p>
                                            <p className="text-sm font-bold text-blue-600">{antri.poli.nama}</p>
                                            <button className="mt-2 rounded bg-blue-500 px-4 py-1 text-sm text-white">Dipanggil</button>
                                        </div>
                                    ))}
                            </div>

                            <div className="flex items-center justify-center bg-gray-200 py-2">
                                <p className="text-center font-bold tracking-tighter text-black capitalize">{item.jenis.nama}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
