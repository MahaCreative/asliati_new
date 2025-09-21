import { useEffect, useState } from 'react';

const SOURCE_URL = 'https://monponik.mudicom.org/index.php';
const STORE_URL = 'https://monponik.mudicom.org/store.php';

export default function SensorSimulator() {
    const [ph, setPh] = useState(null);
    const [tds, setTds] = useState(null);
    const [suhuAir, setSuhuAir] = useState(null);
    const [kelembapan, setKelembapan] = useState(null);
    const [suhuRuangan, setSuhuRuangan] = useState(null);

    // Target
    const [targetPh, setTargetPh] = useState(null);
    const [targetTds, setTargetTds] = useState(null);
    const [targetSuhuAir, setTargetSuhuAir] = useState(null);
    const [targetKelembapan, setTargetKelembapan] = useState(null);
    const [targetSuhuRuangan, setTargetSuhuRuangan] = useState(null);

    // ambil data awal
    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const res = await fetch(SOURCE_URL);
                const data = await res.json();

                setPh(data.kualitas_air.ph);
                setTds(data.kualitas_air.tds);
                setSuhuAir(data.kualitas_air.suhu_air);
                setKelembapan(data.lingkungan_ruangan.kelembapan);
                setSuhuRuangan(data.lingkungan_ruangan.suhu);

                setTargetPh(data.kualitas_air.ph);
                setTargetTds(data.kualitas_air.tds);
                setTargetSuhuAir(data.kualitas_air.suhu_air);
                setTargetKelembapan(data.lingkungan_ruangan.kelembapan);
                setTargetSuhuRuangan(data.lingkungan_ruangan.suhu);
            } catch (err) {
                console.error('Gagal fetch data awal:', err);
            }
        };
        fetchInitial();
    }, []);

    // fungsi helper untuk bergerak pelan
    const smoothUpdate = (prev, target, stepFactor = 0.2, noise = 0.2) => {
        if (prev == null || target == null) return prev;
        if (Math.abs(prev - target) > 0.05) {
            return prev + (target - prev) * stepFactor;
        } else {
            const delta = Math.random() * noise * (Math.random() > 0.5 ? 1 : -1);
            return Math.max(0, prev + delta);
        }
    };

    // interval update simulasi tiap 5 detik
    useEffect(() => {
        const interval = setInterval(() => {
            setPh((prev) => smoothUpdate(prev, targetPh, 0.2, 0.5));
            setTds((prev) => smoothUpdate(prev, targetTds, 0.2, 30));
            setSuhuAir((prev) => smoothUpdate(prev, targetSuhuAir, 0.15, 0.3));
            setKelembapan((prev) => smoothUpdate(prev, targetKelembapan, 0.1, 1));
            setSuhuRuangan((prev) => smoothUpdate(prev, targetSuhuRuangan, 0.1, 0.5));
        }, 30000);

        return () => clearInterval(interval);
    }, [targetPh, targetTds, targetSuhuAir, targetKelembapan, targetSuhuRuangan]);

    // kirim ke backend
    useEffect(() => {
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
    }, [ph, tds, suhuAir, kelembapan, suhuRuangan]);

    return (
        <div className="mx-auto max-w-lg p-6 text-black">
            <h2 className="mb-6 text-center text-2xl font-bold text-white">⚡ Simulasi Sensor</h2>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setTargetPh(parseFloat(e.target.ph.value));
                    setTargetTds(parseInt(e.target.tds.value));
                    setTargetSuhuRuangan(parseFloat(e.target.suhu.value));
                    setTargetKelembapan(parseFloat(e.target.kelembapan.value));
                    setTargetSuhuAir(parseFloat(e.target.suhu_air.value));
                }}
                className="space-y-4 rounded-2xl bg-white p-5 shadow-md"
            >
                <div>
                    <label className="mb-1 block text-sm font-medium">🎯 Target pH</label>
                    <input type="number" step="0.01" name="ph" defaultValue={targetPh ?? ''} className="w-full rounded-md border px-3 py-2" />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">🎯 Target TDS</label>
                    <input step="any" type="number" name="tds" defaultValue={targetTds ?? ''} className="w-full rounded-md border px-3 py-2" />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">🎯 Target Suhu Ruangan</label>
                    <input
                        step="any"
                        type="number"
                        name="suhu"
                        defaultValue={targetSuhuRuangan ?? ''}
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">🎯 Target Kelembapan</label>
                    <input
                        step="any"
                        type="number"
                        name="kelembapan"
                        defaultValue={targetKelembapan ?? ''}
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">🎯 Target Suhu Air</label>
                    <input
                        step="any"
                        type="number"
                        name="suhu_air"
                        defaultValue={targetSuhuAir ?? ''}
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>

                <button type="submit" className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700">
                    Set Target
                </button>
            </form>

            {/* Data Sekarang */}
            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-green-50 p-4 text-center shadow">
                    <p className="text-sm text-gray-500">pH Sekarang</p>
                    <p className="text-xl font-bold text-green-700">{ph ? ph.toFixed(2) : 'Loading...'}</p>
                </div>
                <div className="rounded-xl bg-yellow-50 p-4 text-center shadow">
                    <p className="text-sm text-gray-500">TDS Sekarang</p>
                    <p className="text-xl font-bold text-yellow-700">{tds ? Math.round(tds) : 'Loading...'}</p>
                </div>
                <div className="rounded-xl bg-blue-50 p-4 text-center shadow">
                    <p className="text-sm text-gray-500">Suhu Air</p>
                    <p className="text-xl font-bold text-blue-700">{suhuAir ? suhuAir.toFixed(2) : 'Loading...'} °C</p>
                </div>
                <div className="rounded-xl bg-purple-50 p-4 text-center shadow">
                    <p className="text-sm text-gray-500">Kelembapan</p>
                    <p className="text-xl font-bold text-purple-700">{kelembapan ? kelembapan.toFixed(1) : 'Loading...'} %</p>
                </div>
                <div className="col-span-2 rounded-xl bg-red-50 p-4 text-center shadow">
                    <p className="text-sm text-gray-500">Suhu Ruangan</p>
                    <p className="text-xl font-bold text-red-700">{suhuRuangan ? suhuRuangan.toFixed(2) : 'Loading...'} °C</p>
                </div>
            </div>
        </div>
    );
}
