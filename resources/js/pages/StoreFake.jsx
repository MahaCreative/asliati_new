import { useEffect, useState } from 'react';
const SOURCE_URL = 'https://monponik.mudicom.org/index.php';
const STORE_URL = 'https://monponik.mudicom.org/store.php';

export default function StoreFake() {
    const [ph, setPh] = useState(null);
    const [tds, setTds] = useState(null);
    const [suhuAir, setSuhuAir] = useState(null);
    const [kelembapan, setKelembapan] = useState(null);
    const [suhuRuangan, setSuhuRuangan] = useState(null);
    const [testing, setTesting] = useState(false);

    useEffect(() => {
        if (testing) {
            const interval = setInterval(() => {
                console.log('running');
                console.log({ ph, tds, suhuAir, kelembapan, suhuRuangan });

                if (ph != null && tds != null) {
                    const payload = {
                        ph: parseFloat(ph.toFixed(2)),
                        tds: Math.round(tds),
                        suhu_ruangan: suhuRuangan,
                        kelembapan: kelembapan,
                        suhu_air: suhuAir,
                        status_relay: suhuRuangan > 30 || kelembapan < 80 ? 'on' : 'off',
                    };
                    console.log('Payload kirim:', payload);

                    fetch(STORE_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                    }).catch((err) => console.warn('Gagal POST:', err));
                }
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [testing]); // cuma jalan kalau testing berubah

    return (
        <div className="mx-auto max-w-lg p-6 text-black">
            <h2 className="mb-6 text-center text-2xl font-bold text-white">⚡ Simulasi Sensor</h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="space-y-4 rounded-2xl bg-white p-5 shadow-md"
            >
                <div>
                    <label className="mb-1 block text-sm font-medium">🎯 Target pH</label>
                    <input
                        onChange={(e) => setPh(e.target.value)}
                        type="number"
                        step="0.01"
                        name="ph"
                        defaultValue={ph ?? ''}
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">🎯 Target TDS</label>
                    <input
                        onChange={(e) => setTds(e.target.value)}
                        step="any"
                        type="number"
                        name="tds"
                        defaultValue={tds ?? ''}
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">🎯 Target Suhu Ruangan</label>
                    <input
                        onChange={(e) => setSuhuRuangan(e.target.value)}
                        step="any"
                        type="number"
                        name="suhu"
                        defaultValue={suhuRuangan ?? ''}
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">🎯 Target Kelembapan</label>
                    <input
                        step="any"
                        type="number"
                        name="kelembapan"
                        onChange={(e) => setKelembapan(e.target.value)}
                        defaultValue={kelembapan ?? ''}
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">🎯 Target Suhu Air</label>
                    <input
                        onChange={(e) => setSuhuAir(e.target.value)}
                        step="any"
                        type="number"
                        name="suhu_air"
                        defaultValue={suhuAir ?? ''}
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button type="submit" className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700">
                        Set Target
                    </button>
                    <button
                        onClick={() => setTesting(!testing)}
                        type="button"
                        className={`${testing == true ? 'bg-blue-600' : 'bg-red-600'} w-full rounded-lg py-2 font-semibold text-white hover:bg-blue-700`}
                    >
                        Set Testing {testing == true ? 'ON' : 'OFF'} {String(testing)}
                    </button>
                </div>
            </form>
        </div>
    );
}
