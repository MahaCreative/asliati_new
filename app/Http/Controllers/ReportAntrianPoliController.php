<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\Dokter;
use App\Models\Poli;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\LaravelPdf\Facades\Pdf;

class ReportAntrianPoliController extends Controller
{
    public function index(Request $request)
    {
        $query = Antrian::with(['pasien', 'poli', 'dokter', 'dokter.user']);

        // filter tahap
        if ($request->filled('tahap')) {
            $query->where('tahap', $request->tahap);
        }

        // filter poli
        if ($request->filled('poli_id')) {
            $query->where('poli_id', $request->poli_id);
        }

        // filter dokter
        if ($request->filled('dokter_id')) {
            $query->where('dokter_id', $request->dokter_id);
        }

        // filter rentang tanggal updated_at
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('updated_at', [
                $request->start_date . " 00:00:00",
                $request->end_date . " 23:59:59",
            ]);
        }

        $antrians = $query->orderBy('updated_at', 'desc')->paginate(20);

        return inertia('Laporan/Index', [
            'antrians' => $antrians,
            'filters' => $request->only(['tahap', 'poli_id', 'dokter_id', 'start_date', 'end_date']),
            'polis' => Poli::all(),
            'dokters' => Dokter::all(),
        ]);
    }

    public function exportPdf(Request $request)
    {
        $query = Antrian::with(['pasien', 'poli', 'dokter']);

        if ($request->filled('tahap')) {
            $query->where('tahap', $request->tahap);
        }
        if ($request->filled('poli_id')) {
            $query->where('poli_id', $request->poli_id);
        }
        if ($request->filled('dokter_id')) {
            $query->where('dokter_id', $request->dokter_id);
        }
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('updated_at', [
                $request->start_date . " 00:00:00",
                $request->end_date . " 23:59:59",
            ]);
        }

        $antrians = $query->orderBy('updated_at', 'desc')->get();

        return Pdf::view('pdf.laporan-antrian', [
            'antrians' => $antrians
        ])->download('laporan-antrian.pdf');
    }
    public function rekap_poli(Request $request)
    {
        $tahun = $request->get('tahun', now()->year);
        $tahap = $request->get('tahap', null);

        $polis = Poli::all();
        $bulanList = collect(range(1, 12))->map(function ($m) {
            return Carbon::create()->month($m)->locale('id')->translatedFormat('F');
        });

        // ambil data antrian
        $query = Antrian::query()
            ->whereYear('updated_at', $tahun);

        if ($tahap) {
            $query->where('tahap', $tahap);
        }

        $rekap = $bulanList->map(function ($bulan, $index) use ($polis, $query, $tahun) {
            $dataPoli = [];
            foreach ($polis as $poli) {
                $dataPoli[$poli->nama] = (clone $query)
                    ->whereMonth('updated_at', $index + 1)
                    ->where('poli_id', $poli->id)
                    ->count();
            }
            return [
                'bulan' => $bulan,
                'data' => $dataPoli,
            ];
        });

        return inertia('Laporan/RekapPoli', [
            'rekap' => $rekap,
            'polis' => $polis,
            'filters' => [
                'tahun' => $tahun,
                'tahap' => $tahap,
            ]
        ]);
    }

    public function rekap_poli_export(Request $request)
    {
        $tahun = $request->get('tahun', now()->year);
        $tahap = $request->get('tahap', null);

        $polis = Poli::all();
        $bulanList = collect(range(1, 12))->map(function ($m) {
            return Carbon::create()->month($m)->locale('id')->translatedFormat('F');
        });

        $query = Antrian::query()->whereYear('updated_at', $tahun);

        if ($tahap) {
            $query->where('tahap', $tahap);
        }

        $rekap = $bulanList->map(function ($bulan, $index) use ($polis, $query, $tahun) {
            $dataPoli = [];
            foreach ($polis as $poli) {
                $dataPoli[$poli->nama] = (clone $query)
                    ->whereMonth('updated_at', $index + 1)
                    ->where('poli_id', $poli->id)
                    ->count();
            }
            return [
                'bulan' => $bulan,
                'data' => $dataPoli,
            ];
        });

        $pdf = Pdf::view('pdf.rekap-poli', [
            'rekap' => $rekap,
            'polis' => $polis,
            'tahun' => $tahun,
            'tahap' => $tahap,
        ])->download("rekap-antrian-poli-tahun-$tahun.pdf");
        return $pdf;
    }



    public function rekap_dokter(Request $request)
    {
        $tahun = $request->get('tahun', now()->year);
        $tahap = $request->get('tahap', 'klinik'); // default 'klinik'

        // Ambil semua dokter dan urutkan berdasarkan user.name
        $dokters = Dokter::with('user')->get()->sortBy(function ($dok) {
            return $dok->user->name ?? '';
        })->values();

        // Siapkan header bulan
        $bulanList = collect(range(1, 12))->map(function ($b) {
            return Carbon::create()->month($b)->format('F'); // Januari, Februari, dst
        });

        // Hitung total antrian per dokter per bulan
        $rekap = [];
        foreach ($bulanList as $index => $bulanName) {
            $bulan = $index + 1;
            $row = ['bulan' => $bulanName];
            foreach ($dokters as $dok) {
                $count = Antrian::whereYear('updated_at', $tahun)
                    ->whereMonth('updated_at', $bulan)
                    ->where('tahap', $tahap)
                    ->where('dokter_id', $dok->id)
                    ->count();
                $row[$dok->id] = $count;
            }
            $rekap[] = $row;
        }

        return inertia('Laporan/RekapPerDokter', [
            'dokters' => $dokters,
            'rekap' => $rekap,
            'tahun' => $tahun,
            'tahap' => $tahap,
        ]);
    }

    public function rekap_dokter_export(Request $request)
    {
        $tahun = $request->get('tahun', now()->year);
        $tahap = $request->get('tahap', 'klinik');

        $dokters = Dokter::with('user')->get()->sortBy(function ($dok) {
            return $dok->user->name ?? '';
        })->values();

        $bulanList = collect(range(1, 12))->map(function ($b) {
            return Carbon::create()->month($b)->format('F');
        });

        $rekap = [];
        foreach ($bulanList as $index => $bulanName) {
            $bulan = $index + 1;
            $row = ['bulan' => $bulanName];
            foreach ($dokters as $dok) {
                $count = Antrian::whereYear('updated_at', $tahun)
                    ->whereMonth('updated_at', $bulan)
                    ->where('tahap', $tahap)
                    ->where('dokter_id', $dok->id)
                    ->count();
                $row[$dok->id] = $count;
            }
            $rekap[] = $row;
        }

        $pdf = Pdf::view('pdf.rekap_per_dokter_pdf', [
            'dokters' => $dokters,
            'rekap' => $rekap,
            'tahun' => $tahun,
            'tahap' => $tahap,
        ]);

        return $pdf->download("rekap_per_dokter_{$tahun}.pdf");
    }
}
