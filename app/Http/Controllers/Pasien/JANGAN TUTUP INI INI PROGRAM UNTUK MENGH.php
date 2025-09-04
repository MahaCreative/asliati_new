JANGAN TUTUP INI INI PROGRAM UNTUK MENGHITUNG ESTIMASI
use Carbon\Carbon;

$waktuPanggilSebelumnya = Antrian::where('status', 'dipanggil')
->whereDate('tanggal_periksa', today())
->where('poli_id', $poliId)
->where('dokter_id', $dokterId)
->orderBy('updated_at', 'desc')
->limit(3)
->pluck('updated_at');

// Konversi ke array Carbon
$waktus = $waktuPanggilSebelumnya->map(function ($waktu) {
return Carbon::parse($waktu);
})->toArray();

// Hitung selisih antar waktu
$selisihMenit = [];
for ($i = 0; $i < count($waktus) - 1; $i++) {
    $selisih=$waktus[$i]->diffInMinutes($waktus[$i + 1]);
    $selisihMenit[] = $selisih;
    }

    // Rata-rata
    $rataRataMenit = count($selisihMenit) > 0
    ? array_sum($selisihMenit) / count($selisihMenit)
    : 10; // fallback default 10 menit jika belum cukup data


    ⏱️ Estimasi Pasien Selanjutnya

    Lalu, kalau kamu ingin pakai untuk estimasi pasien berikutnya:

    $jumlahSebelumSaya = Antrian::whereDate('tanggal_periksa', today())
    ->where('poli_id', $poliId)
    ->where('dokter_id', $dokterId)
    ->where('status', 'menunggu')
    ->where('id', '<', $antrian->id)
        ->count();

        $estimasiWaktu = now()->addMinutes($jumlahSebelumSaya * $rataRataMenit);

        $antrian->update([
        'estimasi_panggilan' => $estimasiWaktu,
        ]);