<?php

namespace App\Http\Controllers\Dokter;

use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\RekamMedis;
use Illuminate\Http\Request;

class AntrianKlinikController extends Controller
{
    public function index(Request $request)
    {
        $dokter = Dokter::where('user_id', $request->user()->id)->first();
        $antrian = Antrian::with('poli', 'pasien')->where('tahap', 'klinik')

            // ->whereDate('tanggal_periksa', '=', now())
            ->where('dokter_id', $dokter->id)
            ->get();
        return inertia('Dokter/AntrianKlinik/Index', compact('antrian', 'dokter'));
    }

    public function proses(Request $request, $antrianId)
    {
        $antrian = Antrian::find($antrianId);
        $pasien = Pasien::with('rekamMedis')->where('id', $antrian->pasien_id)->first();
        return inertia('Dokter/AntrianKlinik/Proses', compact('antrian', 'pasien'));
    }

    public function store_proses(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'keluhan' => 'required|string',
            'diagnosa' => 'nullable|string',
            'resep' => 'nullable|string',
            'catatan' => 'nullable|string',
            'tekanan_darah' => 'nullable|string',
            'denyut_nadi' => 'nullable|integer',
            'suhu_tubuh' => 'nullable|numeric',
            'tinggi_badan' => 'nullable|numeric',
            'berat_badan' => 'nullable|numeric',
            'pernapasan' => 'nullable|string',
            'riwayat_penyakit' => 'nullable|string',
            'hasil_lab' => 'nullable|json',
            'tindakan_medis' => 'nullable|string',
            'instruksi_pasien' => 'nullable|string',

            'pasien_id' => 'required|exists:pasiens,id',
            'dokter_id' => 'required|exists:dokters,id',
            'poli_id' => 'required|exists:polis,id',
            'tanggal_kunjungan' => 'required|date',
        ]);

        // Create a new RekamMedis entry
        $rekamMedis = RekamMedis::create($validatedData);

        // Update the status of the corresponding Antrian to 'selesai'
        $antrian = Antrian::find($request->antrian_id);
        if ($antrian) {
            $antrian->update(['status' => 'selesai']);
        }

        // Return a success response
        return response()->json(['message' => 'Rekam medis berhasil disimpan!', 'rekamMedis' => $rekamMedis], 201);
    }
}
