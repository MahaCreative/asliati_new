<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pasien;
use Illuminate\Http\Request;

class PasienController extends Controller
{
    public function show_data(Request $request)
    {
        $pasien = null;
        $query = Pasien::query();
        if ($request->nik) {
            $query->where('nik', $request->nik);
        }
        if ($request->bpjs) {
            $query->where('bpjs', $request->bpjs);
        }
        $getpasien = $query->first();
        if ($getpasien) {
            $pasien = $getpasien;
        }
        return response()->json($pasien);
    }
}
