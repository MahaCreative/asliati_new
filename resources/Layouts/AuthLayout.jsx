import { Head, router, usePage } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import { useEchoPublic } from '@laravel/echo-react';
import Divider from '@mui/material/Divider';
import {
    Clock,
    File,
    History,
    Hospital,
    HospitalIcon,
    LayoutDashboard,
    LogOut,
    Monitor,
    Printer,
    Stethoscope,
    TimerIcon,
    User,
    Volume2,
    Warehouse,
} from 'lucide-react';
import 'moment/locale/id'; // import locale Indonesia
import { useState } from 'react';
import Links from '../Components/Links';
import { Link } from '@inertiajs/react';
export default function AuthLayout({ children, title }) {
    const { auth, profile } = usePage().props;
    const [isOpen, setIsOpen] = useState(true);

    useEchoPublic('poli_channel', 'PoliEvent', (data) => {
        router.reload();
    });
    useEchoPublic('dokter_channel', 'DokterEvent', (data) => {
        router.reload();
    });
    useEchoPublic('pasien_channel', 'PasienEvent', (data) => {
        router.reload();
    });
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Head title={title} />
            {/* SIDEBAR */}
            <div
                className={`fixed top-0 left-0 z-40 h-full transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'w-60 translate-x-0' : 'w-60 -translate-x-full md:translate-x-0'} `}
            >
                <div className="relative flex items-center justify-between border-b border-gray-200 px-4 py-4">
                    <div className="flex items-center gap-2">
                        <img src={'/storage/' + profile.logo} alt={profile.nama_klinik} className="h-8 w-8 rounded-full object-cover object-center" />
                        <h1 className="text-xs font-bold tracking-tight text-blue-600 capitalize">{profile.nama_klinik}</h1>
                    </div>
                    <button className="text-gray-600 md:hidden" onClick={() => setIsOpen(false)}>
                        <CloseIcon color="inherit" fontSize="large" />
                    </button>
                </div>

                {/* MENU LIST */}
                {auth.user.role == 'petugas' && (
                    <nav className="space-y-2 px-4 py-4 text-gray-700">
                        <Links href={route('landing')} icon={<LayoutDashboard size="12" />} name={'Home'} />
                        <Links href={route('dashboard')} icon={<LayoutDashboard size="12" />} name={'Dashboard'} />
                        <Links href={route('petugas.loket_antrian-offline.index')} icon={<Volume2 size="12" />} name={'Loket Panggil Antrian'} />

                        <h1>Master Data</h1>
                        <Divider />
                        <div className="my-1"></div>
                        <Links
                            active={route().current('petugas.profile-klinik.index')}
                            href={route('petugas.profile-klinik.index')}
                            icon={<HospitalIcon size="12" />}
                            name={'Profile Klinik'}
                        />
                        <Links
                            active={route().current('petugas.poli.index') || route().current('petugas.poli.create')}
                            href={route('petugas.poli.index')}
                            icon={<Hospital size={14} />}
                            name={'Layanan Poli'}
                        />
                        <Links
                            active={route().current('petugas.dokter.index') || route().current('petugas.dokter.create')}
                            href={route('petugas.dokter.index')}
                            icon={<Stethoscope size={14} />}
                            name={'Dokter'}
                        />
                        <Links
                            active={route().current('petugas.loket-jenis-antrian.index') || route().current('petugas.loket-jenis-antrian.create')}
                            href={route('petugas.loket-jenis-antrian.index') || route().current('petugas.loket-jenis-antrian.create')}
                            icon={<Warehouse size={14} />}
                            name={'Loket dan Jenis Antrian'}
                        />
                        <Links
                            active={route().current('petugas.pasien.index') || route().current('petugas.pasien.create')}
                            href={route('petugas.pasien.index')}
                            icon={<User size={14} />}
                            name={'Pasien Terdaftar'}
                        />

                        <h1>Display Antrian</h1>
                        <Links href={route('petugas.display.take-antrian')} icon={<Monitor size={14} />} name={'Display Ambil Antrian'} />
                        <Links href={route('display.antrian-ofline')} icon={<Monitor size={14} />} name={'Display Antrian Loket'} />
                        <Links href={route('display.antrian-klinik')} icon={<Monitor size={14} />} name={'Display Antrian Klinik'} />
                        <Divider />
                        <h1>Laporan</h1>
                        <Links href={route('laporan-antrian')} icon={<Printer size={14} />} name={'Laporan Antrian'} />
                        <Links href={route('laporan-antrian')} icon={<Printer size={14} />} name={'laporan.rekap.dokter.index'} />
                        <Links href={route('rekap-poli')} icon={<Printer size={14} />} name={'Rekap Antrian Poli'} />
                    </nav>
                )}
                {auth.user.role == 'pasien' && (
                    <nav className="space-y-2 px-4 py-4 text-gray-700">
                        <Links href={route('landing')} icon={<LayoutDashboard size="12" />} name={'Home'} />
                        <Links
                            active={route().current('pasien.dashboard')}
                            href={route('pasien.dashboard')}
                            icon={<LayoutDashboard size="12" />}
                            name={'Dashboard'}
                        />
                        <Links method="post" href={route('logout')} icon={<LogOut size="12" />} name={'Logout'} />
                        <h1>Master Data</h1>
                        <Divider />
                        <div className="my-1"></div>
                        <Links
                            active={
                                route().current('pasien.daftar-keluarga.index') ||
                                route().current('pasien.daftar-keluarga.create') ||
                                route().current('pasien.daftar-keluarga.show')
                            }
                            href={route('pasien.daftar-keluarga.index') || route().current('pasien.daftar-keluarga.create')}
                            icon={<HospitalIcon size="12" />}
                            name={'Data Keluarga'}
                        />
                        <Links
                            active={route().current('pasien.take-antrian.online')}
                            href={route('pasien.take-antrian.online')}
                            icon={<TimerIcon size={14} />}
                            name={'Booking Antrian'}
                        />
                        <Links
                            active={route().current('pasien.history-antrian-saya')}
                            href={route('pasien.history-antrian-saya')}
                            icon={<History size={14} />}
                            name={'Antrian Saya'}
                        />
                        <Links
                            active={route().current('pasien.rekam-medis.index')}
                            href={route('pasien.rekam-medis.index')}
                            icon={<File size={14} />}
                            name={'Riwayat Rekam Medis Keluarga'}
                        />

                        <h1>Display Antrian</h1>

                        <Links href={route('display.antrian-ofline')} icon={<Monitor size={14} />} name={'Display Antrian Loket'} />
                        <Links href={route('display.antrian-klinik')} icon={<Monitor size={14} />} name={'Display Antrian Klinik'} />
                        <Divider />
                    </nav>
                )}

                {auth.user.role == 'dokter' && (
                    <nav className="space-y-2 px-4 py-4 text-gray-700">
                        <Links href={route('landing')} icon={<LayoutDashboard size="12" />} name={'Home'} />
                        <Links
                            active={route().current('dokter.dashboard')}
                            href={route('dokter.dashboard')}
                            icon={<LayoutDashboard size="12" />}
                            name={'Dashboard'}
                        />
                        <Links method="post" href={route('logout')} icon={<LogOut size="12" />} name={'Logout'} />
                        <Divider />
                        <Links href={route('dokter.antrian.index')} icon={<Volume2 size="12" />} name={'Loket Panggil Antrian'} />
                        <Links href={route('dokter.jadwal-saya.index')} icon={<Clock size="12" />} name={'Jadwal Saya'} />
                    </nav>
                )}
            </div>

            {/* MAIN CONTENT */}
            <div className={`flex flex-1 flex-col transition-all duration-300 ${isOpen ? 'md:ml-60' : 'md:ml-60'} max-w-full overflow-x-auto`}>
                {/* HEADER */}
                <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
                    <button className="text-3xl text-gray-600 md:hidden" onClick={() => setIsOpen(true)}>
                        <MenuIcon color="inherit" fontSize="inherit" />
                    </button>
                    <h2 className="text-lg font-bold text-gray-800">{title}</h2>
                    <div className="relative rounded-full flex items-center">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <img
                                    src={'/storage/' + auth.user?.avatar}
                                    alt={auth.user?.name}
                                    className="h-8 w-8 rounded-full object-cover object-center"
                                />
                                <h1 className="text-xs font-bold tracking-tight text-blue-600 capitalize">{auth.user.name}</h1>
                            </div>
                        </div>
                           <Link
                                        as="button"
                                        method="post"
                                        href={route('logout')}
                                        className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                                    >
                                        Logout
                                    </Link>
                                    </div>
                </header>

                {/* CONTENT */}
                <main className="space-y-4 p-4">{children}</main>
            </div>
        </div>
    );
}
