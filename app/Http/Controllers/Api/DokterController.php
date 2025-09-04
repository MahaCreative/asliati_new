<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dokter;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DokterController extends Controller
{
    public function get_data_bertugas(Request $request)
    {
        $now = Carbon::now();
        $hariIni = $now->translatedFormat('l'); // 'Senin', 'Selasa', dst
        $jamSekarang = $now->format('H:i:s');

        $query = Dokter::with('jadwal', 'poli', 'user')
            ->whereHas('jadwal', function ($q) use ($hariIni, $jamSekarang) {
                $q->where('hari', $hariIni);
                // ->where('jam_mulai', '<=', $jamSekarang)
                // ->where('jam_selesai', '>=', $jamSekarang);
            });

        if ($request->poli_id) {
            $query->where('poli_id', $request->poli_id);
        }

        $dokter = $query->latest()->get();

        return response()->json($dokter);
    }
}
