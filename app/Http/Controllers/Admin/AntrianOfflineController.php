<?php

namespace App\Http\Controllers\Admin;

use App\Events\AntrianKlinikEvent;
use App\Events\AntrianOfflineEvent;
use App\Events\CallAntrianOfflineEvent;
use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\JenisAntrian;
use App\Models\Loket;
use App\Models\Pasien;
use App\Models\Poli;
use App\Models\ProfileKlinik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AntrianOfflineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function display(Request $request)
    {
        $profile = ProfileKlinik::first();
        $loket = Loket::with('jenis')->orderBy('nama', 'asc')->get();
        $jenis_antrian = JenisAntrian::all();
        $poli = Poli::all();

        // Step 1: Ambil semua antrian yang sudah dipanggil hari ini
        $antrian = Antrian::with('poli')->where('status', 'dipanggil')
            ->where('tahap', 'pendaftaran')
            ->whereDate('created_at', '=', now())
            ->whereIn('jenis_antrian_id', $jenis_antrian->pluck('id'))
            ->whereIn('loket_tujuan', $loket->pluck('nama'))
            ->orderBy('updated_at', 'desc') // penting: agar yang terbaru duluan
            ->get();

        // Step 2: Kelompokkan berdasarkan loket_tujuan dan ambil 1 paling baru
        $antrianTerbaru = $antrian->unique('loket_tujuan')->values();

        // return response()->json($filteredAntrian);
        return inertia('Petugas/Display/DisplayAntrian', compact('profile', 'loket', 'antrianTerbaru'));
    }

    public function loket_antrian()
    {
        $jenis_antrian = JenisAntrian::latest()->get();
        $loket = Loket::with('jenis')->get();
        return inertia('Petugas/Display/LoketPanggilAntrian', compact('jenis_antrian', 'loket'));
    }
    public function displayOffline()
    {
        $jenis_antrian = JenisAntrian::latest()->get();
        $poli = Poli::all();
        return inertia('Petugas/Display/DisplayAmbilAntrian', compact('jenis_antrian', 'poli'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function ambilOffline(Request $request)
    {

        $jenis = JenisAntrian::find($request->jenis);
        $poli = Poli::find($request->poli);
        $prefix = $jenis->prefix;

        $antrian = Antrian::where('jenis_antrian_id', $jenis->id)
            ->where('tipe', 'offline')
            ->whereDate('created_at', now())
            ->count();

        $nomor = str_pad($antrian + 1, 3, '0', STR_PAD_LEFT); // Ubah 1 jadi 001, 2 jadi 002, dst
        $kode = $prefix . '-' . $nomor;
        $antrian = Antrian::create([
            'tahap' => 'pendaftaran',
            'tipe' => 'offline',
            'kode_antrian' => $kode,
            'poli_id' => $poli->id,
            'jenis_antrian_id' => $jenis->id,
        ]);

        $antrian->load('poli');
        broadcast(new AntrianOfflineEvent($antrian->refresh()))->toOthers();
        // return redirect()->route('petugas.antrian.offline.cetak_struk', $antrian->kode_antrian);
    }

    public function prosesOffline(Request $request, $id)
    {
        $pasien = Pasien::where('nik', $request->nik)->first();
        $antrian = Antrian::find($id);
        // dd($request->all());

        $poli = Poli::where('id', $antrian->poli_id)->first();
        $prefix = $poli->prefix;
        $cek_count_antrian = Antrian::where('poli_id', $antrian->poli_id)->where('dokter_id', $request->dokter_id)->whereDate('created_at', now())->count();
        $nomor = str_pad($cek_count_antrian + 1, 3, '0', STR_PAD_LEFT); // Ubah 1 jadi 001, 2 jadi 002, dst
        $kode = $prefix . '-' . $nomor;
        $antrian->update([
            'pasien_id' => $pasien->id,
            'tahap' => 'klinik',
            'kode_antrian' => $kode,
            'loket_tujuan' => '', //memang logikanya di set kosong yah, jangan dihapus
            'poli_id' => $poli->id,
            'dokter_id' => $request->dokter_id,
            'keluhan' => $request->keluhan,
            'tanggal_periksa' => now(),
            'status' => 'menunggu',
        ]);
        broadcast(new AntrianKlinikEvent($antrian->refresh()));

        // $antrianTerbaru = Antrian::with('poli')->where('tahap', '=', 'pendaftaran')->where('jenis_antrian_id', $antrian->jenis_antrian_id)
        //     ->where('status', 'menunggu')
        //     ->whereDate('created_at', now())->first();


        // if ($antrianTerbaru) {

        //     $antrianTerbaru->update([
        //         'status' => 'dipanggil',
        //         'loket_tujuan' => $request->nama_loket
        //     ]);
        //     $antrianTerbaru->load('poli');
        //     broadcast(new CallAntrianOfflineEvent($antrianTerbaru->refresh()));
        // }
    }

    public function cetak_struk($kode_antrian)
    {
        $antrian = Antrian::where('kode_antrian', $kode_antrian)->whereDate('created_at', now())->first();
        $profile = ProfileKlinik::first();
        return inertia('Petugas/Display/CetakStruk', compact('antrian', 'profile'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
