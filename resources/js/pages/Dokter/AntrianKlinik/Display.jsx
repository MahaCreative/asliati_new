import { Head, Link, usePage } from '@inertiajs/react';
import { Expand, LayoutDashboard, List, Minimize } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Display() {
    const { polis = [] } = usePage().props;
    const [isFullscreen, setIsFullscreen] = useState(false);
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Head title="Display Antrian Klinik" />

            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
                <div className="mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            as={'button'}
                            href={route('dashboard')}
                            className={`rounded-lg border border-gray-200/50 bg-white p-2.5 text-gray-400 shadow-lg transition-all duration-200 ease-in-out hover:cursor-pointer hover:text-blue-500`}
                        >
                            <LayoutDashboard />
                        </Link>
                        <h1 className="text-xl font-bold text-slate-800 md:text-2xl">Display Antrian Klinik</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-500">
                            {new Date().toLocaleDateString('id-ID', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
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
                </div>
            </header>

            {/* Content */}
            <div className="mx-auto grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-2 md:px-8 lg:px-12">
                {/* Kolom Kiri */}
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
                    <h2 className="mb-4 text-lg font-semibold text-slate-700">🔔 Antrian yang Sedang Dipanggil</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {polis.map((item) => (
                            <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4 shadow-sm">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="text-xl font-semibold text-slate-800 capitalize">{item.nama}</h3>
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Dipanggil</span>
                                </div>

                                {item.antrian_dipanggil ? (
                                    <div className="rounded-lg bg-blue-600 p-6 text-center shadow-md">
                                        <div className="text-5xl font-extrabold text-white drop-shadow">{item.antrian_dipanggil?.kode_antrian}</div>
                                        <div className="mt-2 text-lg font-semibold text-white capitalize">
                                            {item.antrian_dipanggil?.pasien?.nama_lengkap}
                                        </div>
                                        <div className="mt-1 text-sm font-medium text-blue-100 capitalize">
                                            Dokter: {item.antrian_dipanggil?.dokter?.user.name}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-white py-8 text-slate-400">
                                        <List size={40} className="mb-2" />
                                        <p className="text-sm italic">Belum ada antrian dipanggil</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Kolom Kanan */}
                <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
                    <h2 className="mb-4 text-lg font-semibold text-slate-700">⏭️ Antrian Berikutnya</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {polis.map((item) => (
                            <div key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="mb-2 text-lg font-medium text-slate-800 capitalize">{item.nama}</h3>
                                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">Menunggu</span>
                                </div>

                                {item.antrian_berikutnya ? (
                                    <div className="rounded-lg bg-amber-500 p-5 text-center shadow-md">
                                        <div className="text-4xl font-bold text-white drop-shadow">{item.antrian_berikutnya.kode_antrian}</div>
                                        <div className="mt-2 text-base font-semibold text-white capitalize">
                                            {item.antrian_berikutnya?.pasien?.nama_lengkap}
                                        </div>
                                        <div className="mt-1 text-sm font-medium text-amber-100 capitalize">
                                            Dokter: {item.antrian_berikutnya?.dokter?.user.name}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-slate-300 bg-white py-6 text-slate-400">
                                        <List size={32} className="mb-2" />
                                        <p className="text-sm italic">Belum ada antrian berikutnya</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
