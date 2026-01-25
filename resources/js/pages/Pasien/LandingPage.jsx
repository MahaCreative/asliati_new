import { Link, usePage } from '@inertiajs/react';
import { useEchoPublic } from '@laravel/echo-react';
import { Balance, BuildCircle, Face, Favorite, Group, LocalHospital, MedicalInformation, VerifiedUser } from '@mui/icons-material';
import { CheckCircleIcon } from 'lucide-react';
import { useRef, useState } from 'react';

export default function LandingPage({ polis, dokter, profile, pasien, petugas }) {
    const { auth } = usePage().props;
    const [poliAktif, setPoliAktif] = useState(1);
    const [navOpen, setNavOpen] = useState(false);
    const [antrianDropdown, setAntrianDropdown] = useState(false);
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const poliRef = useRef(null);
    const dokterRef = useRef(null);
    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
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
    return (
        <div className="flex min-h-screen flex-col bg-gray-50 text-gray-800">
            {/* Hero Section */}
            {/* TOP BAR */}
            <div className="w-full bg-blue-600 px-4 py-2 text-sm text-white md:px-8 lg:px-16">📞 {profile.phone_number}</div>

            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-white shadow-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex flex-shrink-0 items-center gap-x-2">
                            <img src={'/storage/' + profile.logo} alt="Logo" className="h-10 w-10 rounded-md object-cover" />
                            <span className="text-sm font-extrabold tracking-tight text-blue-700 md:text-base">{profile.nama_klinik}</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden items-center space-x-6 md:flex">
                            <button onClick={() => scrollToSection(homeRef)} className="text-sm font-medium text-gray-700 hover:text-blue-600">
                                Home
                            </button>
                            <button onClick={() => scrollToSection(aboutRef)} className="text-sm font-medium text-gray-700 hover:text-blue-600">
                                About
                            </button>
                            <button onClick={() => scrollToSection(poliRef)} className="text-sm font-medium text-gray-700 hover:text-blue-600">
                                Layanan Klinik
                            </button>
                            <button onClick={() => scrollToSection(dokterRef)} className="text-sm font-medium text-gray-700 hover:text-blue-600">
                                Dokter
                            </button>
 <div className="relative">
                                        <button
                                            onClick={() => setAntrianDropdown(!antrianDropdown)}
                                            className="text-sm font-medium text-gray-700 hover:text-blue-600 flex items-center"
                                        >
                                            Antrian
                                            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {antrianDropdown && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                                                <Link
                                                    href={route('display.antrian-klinik')}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => setAntrianDropdown(false)}
                                                >
                                                    Antrian Klinik
                                                </Link>
                                                <Link
                                                    href={route('display.antrian-ofline')}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => setAntrianDropdown(false)}
                                                >
                                                    Antrian Loket
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                            {auth.user ? (
                                <>
                                    <Link href={route('dashboard')} className="text-sm font-medium text-gray-700 hover:text-blue-600">
                                        Dashboard
                                    </Link>
                                   
                                    <Link
                                        as="button"
                                        method="post"
                                        href={route('logout')}
                                        className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                                    >
                                        Logout
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Login / Register
                                </Link>
                            )}
                        </div>

                        {/* Hamburger for Mobile */}
                        <div className="md:hidden">
                            <button onClick={() => setNavOpen(!navOpen)} className="text-gray-700 hover:text-blue-600 focus:outline-none">
                                {navOpen ? (
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {navOpen && (
                    <div className="border-t border-gray-200 bg-white md:hidden">
                        <div className="space-y-2 px-4 pt-4 pb-6">
                            <button
                                onClick={() => {
                                    scrollToSection(homeRef);
                                    setNavOpen(false);
                                }}
                                className="block w-full py-2 text-left text-gray-700 hover:text-blue-600"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => {
                                    scrollToSection(aboutRef);
                                    setNavOpen(false);
                                }}
                                className="block w-full py-2 text-left text-gray-700 hover:text-blue-600"
                            >
                                About
                            </button>
                            <button
                                onClick={() => {
                                    scrollToSection(poliRef);
                                    setNavOpen(false);
                                }}
                                className="block w-full py-2 text-left text-gray-700 hover:text-blue-600"
                            >
                                Layanan Klinik
                            </button>
                            <button
                                onClick={() => {
                                    scrollToSection(dokterRef);
                                    setNavOpen(false);
                                }}
                                className="block w-full py-2 text-left text-gray-700 hover:text-blue-600"
                            >
                                Dokter
                            </button>
                            {auth.user && (
                                <>
                                    <Link
                                        href={route('dashboard')}
                                        className="block w-full py-2 text-left text-gray-700 hover:text-blue-600"
                                        onClick={() => setNavOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <div className="relative">
                                        <button
                                            onClick={() => setAntrianDropdown(!antrianDropdown)}
                                            className="flex w-full items-center justify-between py-2 text-left text-gray-700 hover:text-blue-600"
                                        >
                                            Antrian
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {antrianDropdown && (
                                            <div className="ml-4 mt-2 space-y-2">
                                                <Link
                                                    href={route('pasien.take-antrian.online')}
                                                    className="block py-2 text-gray-700 hover:text-blue-600"
                                                    onClick={() => {
                                                        setNavOpen(false);
                                                        setAntrianDropdown(false);
                                                    }}
                                                >
                                                    Antrian Klinik
                                                </Link>
                                                <Link
                                                    href={route('display.antrian-ofline')}
                                                    className="block py-2 text-gray-700 hover:text-blue-600"
                                                    onClick={() => {
                                                        setNavOpen(false);
                                                        setAntrianDropdown(false);
                                                    }}
                                                >
                                                    Antrian Loket
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    <Link
                                        as="button"
                                        method="post"
                                        href={route('logout')}
                                        className="block w-full py-2 text-left text-red-600 hover:text-red-700"
                                        onClick={() => setNavOpen(false)}
                                    >
                                        Logout
                                    </Link>
                                </>
                            )}
                            {!auth.user && (
                                <Link
                                    href={route('login')}
                                    className="block w-full py-2 text-left text-blue-600 hover:text-blue-700"
                                    onClick={() => setNavOpen(false)}
                                >
                                    Login / Register
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero */}
            <div
                ref={homeRef}
                className="relative flex h-[500px] w-full items-center justify-center bg-cover bg-center text-center"
                style={{ backgroundImage: "url('/storage/Image/hero-bg.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 max-w-4xl px-6">
                    <h1 className="text-4xl leading-tight font-extrabold text-white md:text-5xl lg:text-6xl">
                        Selamat Datang di <span className="text-blue-400">{profile.nama_klinik}</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-200">Layanan kesehatan terpercaya untuk Anda dan keluarga.</p>
                    <button className="mt-8 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-blue-700">
                        Pelajari Lebih Lanjut
                    </button>
                </div>
            </div>
            <div className="grid h-full w-full grid-cols-1 items-center justify-between gap-x-1 gap-y-3 md:grid-cols-2 md:flex-row lg:grid-cols-4">
                <div className="h-[300px] w-[100%] rounded-md bg-white/70 px-8 py-6 drop-shadow-md backdrop-blur-sm md:w-[95%]">
                    <p className="text-center text-5xl text-blue-500">
                        <VerifiedUser color="inherit" fontSize="inherit" />
                    </p>
                    <h1 className="py-6 text-center text-2xl font-bold tracking-tighter text-gray-800">Profesionalisme</h1>
                    <p className="line-clamp-4 text-center text-gray-700">
                        Kami menjunjung tinggi profesionalisme dalam setiap layanan yang diberikan, yang tercermin melalui tenaga medis kami yang
                        berpengalaman, bersertifikat, dan senantiasa menjaga standar etika serta mutu pelayanan kesehatan.
                    </p>
                </div>
                <div className="h-[300px] w-[100%] rounded-md bg-white/70 px-8 py-6 drop-shadow-md backdrop-blur-sm md:w-[95%]">
                    <p className="text-center text-5xl text-blue-500">
                        <Favorite color="inherit" fontSize="inherit" />
                    </p>
                    <h1 className="py-6 text-center text-2xl font-bold tracking-tighter text-gray-800">Empati</h1>
                    <p className="line-clamp-4 text-center text-gray-700">
                        Kami memahami bahwa setiap pasien memiliki kebutuhan yang unik, oleh karena itu pendekatan kami selalu ramah, penuh perhatian,
                        dan berlandaskan kepedulian yang tulus demi kenyamanan dan kesembuhan pasien.
                    </p>
                </div>
                <div className="h-[300px] w-[100%] rounded-md bg-white/70 px-8 py-6 drop-shadow-md backdrop-blur-sm md:w-[95%]">
                    <p className="text-center text-5xl text-blue-500">
                        <Balance color="inherit" fontSize="inherit" />
                    </p>
                    <h1 className="py-6 text-center text-2xl font-bold tracking-tighter text-gray-800">Integritas</h1>
                    <p className="line-clamp-4 text-center text-gray-700">
                        Kami berkomitmen untuk menjalankan seluruh aktivitas pelayanan dengan integritas tinggi, menjunjung nilai kejujuran,
                        transparansi, serta tanggung jawab dalam memberikan informasi dan tindakan medis.
                    </p>
                </div>
                <div className="h-[300px] w-[100%] rounded-md bg-white/70 px-8 py-6 drop-shadow-md backdrop-blur-sm md:w-[95%]">
                    <p className="text-center text-5xl text-blue-500">
                        <BuildCircle color="inherit" fontSize="inherit" />
                    </p>
                    <h1 className="py-6 text-center text-2xl font-bold tracking-tighter text-gray-800">Inovasi</h1>
                    <p className="line-clamp-4 text-center text-gray-700">
                        Kami terus berinovasi dalam meningkatkan kualitas layanan melalui pemanfaatan teknologi terkini yang mendukung efisiensi
                        kerja, akurasi diagnosa, serta kemudahan akses layanan kesehatan bagi masyarakat.
                    </p>
                </div>
            </div>
            {/* about us */}
            {/* ABOUT US */}
            <div ref={aboutRef} className="bg-white px-4 py-20 md:px-8 lg:px-24">
                <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
                    {/* Left Image */}
                    <div className="relative overflow-hidden rounded-xl shadow-xl">
                        <img src={'/storage/' + profile.logo} alt={profile.nama_klinik} className="h-full w-full object-cover" />
                        {/* Overlay Accent */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-transparent"></div>
                    </div>

                    {/* Right Content */}
                    <div>
                        <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-800">
                            Tentang <span className="text-blue-600">Kami</span>
                        </h2>
                        <p className="mb-6 leading-relaxed text-gray-600">{profile.keterangan}</p>

                        <h3 className="mt-8 mb-3 border-l-4 border-blue-500 pl-3 text-2xl font-bold text-gray-800">Visi</h3>
                        <p className="mb-6 leading-relaxed text-gray-600">
                            Menjadi pusat layanan kesehatan terpercaya dan unggulan di wilayah Kabupaten Mamuju Sulawesi Barat.
                        </p>

                        <h3 className="mt-8 mb-3 border-l-4 border-blue-500 pl-3 text-2xl font-bold text-gray-800">Misi</h3>
                        <ul className="mt-4 space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircleIcon color="blue" />
                                <p className="text-gray-600">Memberikan pelayanan kesehatan yang prima dan profesional</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircleIcon color="blue" />
                                <p className="text-gray-600">Meningkatkan kesadaran masyarakat akan pentingnya hidup sehat</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircleIcon color="blue" />
                                <p className="text-gray-600">Mengembangkan teknologi informasi dalam pelayanan medis</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* card informasi */}
            <div className="flex w-full items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-20 md:px-12">
                <div className="grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Card 1 */}
                    <div className="relative transform rounded-2xl bg-white p-8 text-center shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <div className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
                            <MedicalInformation className="text-white" fontSize="large" />
                        </div>
                        <div className="mt-8">
                            <p className="text-5xl font-extrabold text-gray-800">{dokter.length}</p>
                            <p className="mt-3 text-xl font-semibold tracking-tight text-blue-700">Dokter</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative transform rounded-2xl bg-white p-8 text-center shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <div className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
                            <LocalHospital className="text-white" fontSize="large" />
                        </div>
                        <div className="mt-8">
                            <p className="text-5xl font-extrabold text-gray-800">{polis.length}</p>
                            <p className="mt-3 text-xl font-semibold tracking-tight text-blue-700">Layanan Klinik</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative transform rounded-2xl bg-white p-8 text-center shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <div className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
                            <Group className="text-white" fontSize="large" />
                        </div>
                        <div className="mt-8">
                            <p className="text-5xl font-extrabold text-gray-800">{petugas}</p>
                            <p className="mt-3 text-xl font-semibold tracking-tight text-blue-700">Petugas Profesional</p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="relative transform rounded-2xl bg-white p-8 text-center shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
                        <div className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
                            <Face className="text-white" fontSize="large" />
                        </div>
                        <div className="mt-8">
                            <p className="text-5xl font-extrabold text-gray-800">{pasien}</p>
                            <p className="mt-3 text-xl font-semibold tracking-tight text-blue-700">Pasien Terdaftar</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* end card */}
            <div
                ref={poliRef}
                className="flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 px-4 py-20 md:px-8 lg:px-16"
            >
                <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-800">Layanan Klinik</h1>
                <div className="my-4 flex">
                    <div className="h-[4px] w-[80px] rounded-full bg-blue-600"></div>
                </div>
                <p className="max-w-3xl text-center text-gray-600">
                    Kami menyediakan berbagai layanan medis dengan fasilitas dan tenaga profesional yang siap membantu Anda mendapatkan perawatan
                    terbaik.
                </p>

                {/* Tabs */}
                <div className="mt-12 flex w-full flex-col gap-6 md:flex-row">
                    {/* Tab List */}
                    <div className="w-full space-y-3 md:w-1/3">
                        {polis.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setPoliAktif(item.id)}
                                className={`w-full rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                                    poliAktif === item.id
                                        ? 'border-blue-600 bg-blue-600 text-white shadow-lg'
                                        : 'border bg-white text-gray-700 hover:border-blue-400'
                                }`}
                            >
                                <p className="text-lg font-semibold capitalize">{item.nama}</p>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="w-full rounded-xl border bg-white p-6 shadow-lg md:w-2/3">
                        {polis.map((item) =>
                            poliAktif === item.id ? (
                                <div key={item.id}>
                                    <h2 className="mb-4 text-2xl font-bold text-blue-700">{'Poli ' + item.nama}</h2>
                                    <p className="leading-relaxed text-gray-600">{item.keterangan}</p>
                                </div>
                            ) : null,
                        )}
                    </div>
                </div>
            </div>

            <div ref={dokterRef} className="flex flex-col items-center justify-center bg-blue-50 px-4 py-20 md:px-8 lg:px-16">
                <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-800">Dokter Kami</h1>
                <div className="my-4 flex">
                    <div className="h-[4px] w-[80px] rounded-full bg-blue-600"></div>
                </div>
                <p className="mb-12 max-w-3xl text-center text-gray-600">
                    Tenaga medis kami adalah profesional yang berpengalaman dan bersertifikat, siap memberikan pelayanan terbaik untuk Anda.
                </p>

                <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {dokter.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-lg transition-all hover:shadow-xl"
                        >
                            <img
                                src={'/storage/' + item.foto}
                                alt={item.user.name}
                                className="mb-4 h-28 w-28 rounded-full border-4 border-blue-100 object-cover shadow-md"
                            />
                            <h3 className="text-xl font-bold text-gray-800">{item.user.name}</h3>
                            <p className="mt-1 font-medium text-blue-600">{item.poli?.nama}</p>
                            <p className="mt-3 line-clamp-5 text-left text-xs leading-relaxed text-gray-600">{item.deskripsi}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
