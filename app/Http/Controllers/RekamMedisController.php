<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use App\Models\RekamMedis;
use App\Models\User;
use Illuminate\Http\Request;

class RekamMedisController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $keluarga = Pasien::where('user_id', $user->id)->get();
        $rekamMedis = RekamMedis::whereIn('pasien_id', $keluarga->pluck('id'))
            ->with(['pasien', 'dokter', 'poli'])
            ->orderBy('created_at', 'desc')
            ->get();
        return inertia('Pasien/RekamMedis/Index', [
            'rekamMedis' => $rekamMedis,
            'keluarga' => $keluarga,
        ]);
    }
}
