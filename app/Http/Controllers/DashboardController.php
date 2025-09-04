<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\Poli;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $now = now();
        $user = $request->user();
        if ($user->role == 'pasien') {
            return redirect()->route('pasien.dashboard');
        }
        // Count dasar
        $dokter_count = Dokter::count();
        $poli_count = Poli::count();
        $pasien_count = Pasien::count();
        $offline_count = Antrian::where('tahap', 'pendaftaran')
            ->whereDate('created_at', $now)
            ->count();
        $online_count = Antrian::where('tahap', 'klinik')
            ->whereDate('created_at', $now)
            ->count();
        $month = $now->month;
        $year = $now->year;

        // Hitung jumlah hari di bulan ini
        $daysInMonth = Carbon::create($year, $month, 1)->daysInMonth;

        // Buat array tanggal 1 sampai terakhir
        $allDates = collect(range(1, $daysInMonth))->map(function ($day) use ($year, $month) {
            return Carbon::create($year, $month, $day)->format('Y-m-d');
        });

        // Query antrian Klinik
        $daily_queue_stats_klinik_raw = Antrian::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as count')
        )
            ->where('tahap', 'klinik')
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('count', 'date')
            ->all(); // convert ke array supaya bisa diakses dengan key

        $daily_queue_stats_klinik = $allDates->map(function ($date) use ($daily_queue_stats_klinik_raw) {
            return [
                'date' => $date,
                'count' => $daily_queue_stats_klinik_raw[$date] ?? 0,
            ];
        });

        // Query antrian Loket
        $daily_queue_stats_loket_raw = Antrian::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('COUNT(*) as count')
        )
            ->where('tahap', 'pendaftaran')
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->pluck('count', 'date')
            ->all();

        $daily_queue_stats_loket = $allDates->map(function ($date) use ($daily_queue_stats_loket_raw) {
            return [
                'date' => $date,
                'count' => $daily_queue_stats_loket_raw[$date] ?? 0,
            ];
        });
        // Statistik bulanan (harian di bulan sekarang)
        $monthly_queue_stats = Antrian::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('COUNT(*) as count')
        )
            ->where('tahap', 'klinik')
            ->whereYear('created_at', now()->format('Y'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->pluck('count', 'month'); // key = bulan (angka), value = count
        // Buat array 12 bulan dengan nama bulan, isi 0 jika tidak ada data
        $monthly_counts = collect(range(1, 12))->mapWithKeys(function ($m) use ($monthly_queue_stats) {
            $monthName = Carbon::create()->month($m)->format('F'); // nama bulan
            return [$monthName => $monthly_queue_stats[$m] ?? 0];
        });

        // Statistik tahunan (per tahun)
        $yearly_queue_stats = Antrian::select(DB::raw('YEAR(created_at) as year'), DB::raw('COUNT(*) as count'))
            ->where('tahap', 'klinik')
            ->whereYear('created_at', $now->year)
            ->groupBy(DB::raw('YEAR(created_at)'))
            ->get();

        // Poli per hari
        // Statistik harian per poli (jumlah 0 jika tidak ada)
        $daily_poli_stats = Poli::leftJoin('antrians', function ($join) use ($now) {
            $join->on('polis.id', '=', 'antrians.poli_id')
                ->where('antrians.tahap', 'klinik')
                ->whereDate('antrians.created_at', $now);
        })
            ->select('polis.nama', DB::raw('COUNT(antrians.id) as count'))
            ->groupBy('polis.nama')
            ->get();

        // Statistik bulanan per poli (jumlah 0 jika tidak ada)
        $monthly_poli_stats = Poli::leftJoin('antrians', function ($join) use ($now) {
            $join->on('polis.id', '=', 'antrians.poli_id')
                ->where('antrians.tahap', 'klinik')
                ->whereMonth('antrians.created_at', $now->month)
                ->whereYear('antrians.created_at', $now->year);
        })
            ->select('polis.nama', DB::raw('COUNT(antrians.id) as count'))
            ->groupBy('polis.nama')
            ->get();

        return inertia('Petugas/Dashboard', compact(
            'dokter_count',
            'poli_count',
            'pasien_count',
            'offline_count',
            'online_count',
            'daily_queue_stats_klinik',
            'daily_queue_stats_loket',
            'monthly_queue_stats',
            'yearly_queue_stats',
            'daily_poli_stats',
            'monthly_poli_stats'
        ));
    }

    public function pasien(Request $request)
    {

        // Ambil semua pasien keluarga
        $keluarga = Pasien::where('user_id', $request->user()->id)->get();

        // Ambil semua antrian klinik hari ini untuk keluarga
        $antrians = Antrian::with(['pasien', 'dokter', 'dokter.user', 'dokter.poli'])
            ->where('tahap', 'klinik')
            ->whereDate('tanggal_periksa', Carbon::today())
            ->whereIn('pasien_id', $keluarga->pluck('id'))
            ->latest()
            ->get();

        // Loop per antrian keluarga
        $data = $antrians->map(function ($antrian) {
            $poliId = $antrian->poli_id;
            $dokterId = $antrian->dokter_id;

            // Ambil antrian yang sedang dipanggil di poli dan dokter ini
            $dipanggil = Antrian::where('status', 'dipanggil')
                ->whereDate('tanggal_periksa', today())
                ->where('tahap', 'klinik')
                ->where('poli_id', $poliId)
                ->where('dokter_id', $dokterId)
                ->orderBy('id', 'asc')
                ->first();

            // Hitung sisa antrian sebelum antrian ini
            $sisa = Antrian::whereDate('tanggal_periksa', today())
                ->where('poli_id', $poliId)
                ->where('dokter_id', $dokterId)
                ->where('status', 'menunggu')
                ->where('id', '<', $antrian->id)
                ->count();

            return [
                'nama' => $antrian->pasien->nama_lengkap,
                'kode_antrian' => $antrian->kode_antrian,
                'status' => $antrian->status,
                'dipanggil_sekarang' => $dipanggil ? $dipanggil->kode_antrian : '-',
                'sisa_antrian' => $sisa,

            ];
        });
        return inertia('Pasien/Dashboard', compact('data'));
    }

    public function dokter(Request $request)
    {
        return redirect()->route('dashboard');
    }
}
