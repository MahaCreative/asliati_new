<?php

namespace App\Http\Controllers\Api;

use App\Events\CallAgainAntrianOnline;
use App\Events\CallAntrianOnlineEvent;
use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\Dokter;
use App\Models\Poli;
use Illuminate\Http\Request;

class AntrianONlineController extends Controller
{
    public function next_antrian(Request $request)
    {
        $query = Antrian::query()->with('pasien');
        $dokter = Dokter::with('poli')->find($request->dokter_id);
        $query->where('tahap', 'klinik')
            ->where('dokter_id', $request->dokter_id)
            // ->whereDate('tanggal_periksa', '>=', now())
            ->where('status', '=', 'menunggu')
        ;
        $antrian = $query->orderBy('tanggal_periksa', 'asc')->first();
        if ($antrian) {
            $antrian->update([
                'loket_tujuan' => $dokter->poli->nama,
                'status' => 'dipanggil',
            ]);
            broadcast(new CallAntrianOnlineEvent($antrian->refresh()));
            return response()->json($antrian);
        }
        return response()->json(null);
    }

    public function penggil_kembali(Request $request)
    {
        $antrian = Antrian::with('pasien')->find($request->id);
        broadcast(new CallAgainAntrianOnline($antrian));
        return response()->json($antrian);
    }

    public function display()
    {
        // Ambil semua poli
        $polis = Poli::orderBy('nama', 'asc')->get();


        foreach ($polis as $item) {
            $item['antrian_dipanggil'] = Antrian::with(['pasien', 'dokter', 'dokter.user'])->where('tahap', 'klinik')
                ->where('poli_id', $item->id)
                ->where('status', 'dipanggil')
                ->whereDate('tanggal_periksa', '=', today())
                ->latest()
                ->first();
            $item['antrian_berikutnya'] = Antrian::with(['pasien', 'dokter', 'dokter.user'])->where('tahap', 'klinik')
                ->where('poli_id', $item->id)
                ->where('status', 'menunggu')
                ->whereDate('tanggal_periksa', '=', today())
                ->first();
        }


        // dd($polis);

        return inertia('Dokter/AntrianKlinik/Display', [
            'polis' => $polis,

        ]);
    }
}
