import { Cake, IdCard, Phone, VenusAndMars } from 'lucide-react';
import AuthLayout from '../../../../Layouts/AuthLayout';

export default function Show({ pasien, rekamMedis }) {
    return (
        <AuthLayout title={`Detail Pasien - ${pasien.nama_lengkap}`}>
            <div className="mx-auto max-w-5xl px-6 py-10">
                {/* Header Pasien */}
                <div className="mb-12 flex flex-col items-center rounded-xl bg-white p-8 shadow-md ring-1 ring-gray-100 md:flex-row">
                    <img
                        src={pasien.avatar ? `/storage/${pasien.avatar}` : '/image/default_preview.png'}
                        alt={pasien.nama_lengkap}
                        className="mb-6 h-28 w-28 rounded-full border object-cover md:mr-10 md:mb-0"
                    />
                    <div className="w-full flex-1">
                        <h1 className="mb-1 text-3xl font-bold text-gray-900">{pasien.nama_lengkap}</h1>
                        <p className="mb-4 text-sm font-medium text-blue-500">{pasien.status_keluarga.toUpperCase()}</p>

                        <div className="grid grid-cols-1 gap-x-10 gap-y-4 text-sm text-gray-700 sm:grid-cols-2">
                            <InfoRow icon={<IdCard size={18} className="text-blue-500" />} label="NIK" value={pasien.nik} />
                            <InfoRow icon={<Phone size={18} className="text-green-500" />} label="Telepon" value={pasien.telephone || '-'} />
                            <InfoRow icon={<VenusAndMars size={18} className="text-pink-500" />} label="Jenis Kelamin" value={pasien.jenis_kelamin} />
                            <InfoRow
                                icon={<Cake size={18} className="text-yellow-500" />}
                                label="Tanggal Lahir"
                                value={new Date(pasien.tanggal_lahir).toLocaleDateString()}
                            />
                            <SimpleRow label="Tempat Lahir" value={pasien.tempat_lahir} />
                            <SimpleRow label="BPJS" value={pasien.bpjs || '-'} />
                        </div>
                    </div>
                </div>

                {/* Rekam Medis */}
                <section>
                    <h2 className="mb-6 border-b border-gray-200 pb-2 text-xl font-semibold text-gray-800">Riwayat Rekam Medis</h2>

                    {rekamMedis.length === 0 ? (
                        <p className="rounded-md bg-white py-10 text-center text-gray-500 italic shadow-sm">
                            Belum ada rekam medis untuk pasien ini.
                        </p>
                    ) : (
                        <div className="space-y-8">
                            {rekamMedis.map((rm) => (
                                <article key={rm.id} className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg">
                                    <header className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Kunjungan: {new Date(rm.tanggal_kunjungan).toLocaleDateString()}
                                        </h3>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                rm.status === 'final' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                        >
                                            {rm.status.toUpperCase()}
                                        </span>
                                    </header>

                                    <div className="grid grid-cols-1 gap-6 text-sm text-gray-700 md:grid-cols-2">
                                        <Detail label="Keluhan" value={rm.keluhan} />
                                        <Detail label="Diagnosa" value={rm.diagnosa} />
                                        <Detail label="Resep" value={rm.resep} />
                                        <Detail label="Catatan" value={rm.catatan || '-'} />
                                        <Detail label="Tekanan Darah" value={rm.tekanan_darah || '-'} />
                                        <Detail label="Suhu Tubuh (°C)" value={rm.suhu_tubuh ?? '-'} />
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </AuthLayout>
    );
}

function InfoRow({ icon, label, value }) {
    return (
        <div className="flex items-start space-x-3">
            {icon}
            <div>
                <div className="text-xs font-semibold text-gray-400 uppercase">{label}</div>
                <div className="mt-0.5">{value}</div>
            </div>
        </div>
    );
}

function SimpleRow({ label, value }) {
    return (
        <div>
            <div className="text-xs font-semibold text-gray-400 uppercase">{label}</div>
            <div className="mt-0.5">{value}</div>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div>
            <strong className="mb-1 block text-gray-800">{label}</strong>
            <p className="whitespace-pre-line">{value}</p>
        </div>
    );
}
