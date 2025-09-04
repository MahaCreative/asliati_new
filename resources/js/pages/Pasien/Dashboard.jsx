import AuthLayout from '../../../Layouts/AuthLayout';

export default function Dashboard({ data }) {
    return (
        <AuthLayout title={'Dashboard-Pasien'}>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">📋 Dashboard Antrian</h1>
                    <p className="mt-2 text-gray-600">Lihat status antrian Anda dan keluarga yang sedang berjalan hari ini.</p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-md transition-all duration-300 hover:shadow-lg"
                            >
                                {/* Header */}
                                <div className="mb-4 flex items-center justify-between">
                                    {/* Tampilkan nama pasien kalau itu anggota keluarga */}

                                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">👨‍👩‍👧 {item.nama}</div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            item.status === 'menunggu'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : item.status === 'dipanggil'
                                                  ? 'bg-blue-100 text-blue-800'
                                                  : item.status === 'selesai'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-200 text-gray-600'
                                        }`}
                                    >
                                        {item.status.toUpperCase()}
                                    </span>
                                </div>

                                {/* Detail Info */}
                                <div className="space-y-3 text-sm text-gray-700">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-gray-500">🎟️ Kode Antrian</span>
                                        <span className="font-bold text-gray-800">{item.kode_antrian}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-gray-500">📣 Dipanggil Sekarang</span>
                                        <span className="font-bold text-red-600">{item.dipanggil_sekarang}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 text-gray-500">⏳ Sisa Antrian Anda</span>
                                        <span className="font-bold text-green-600">{item.sisa_antrian}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500">Belum ada antrian aktif hari ini.</div>
                    )}
                </div>
            </div>
        </AuthLayout>
    );
}
