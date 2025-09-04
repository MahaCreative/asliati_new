<?php

namespace App\Http\Controllers\Pasien;

use App\Events\AntrianKlinikEvent;
use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\Poli;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AntrianKlinikController extends Controller
{

    public function index(Request $request)
    {
        $keluarga = Pasien::where('user_id', $request->user()->id)->get();
        $queryAntrian = Antrian::with('pasien', 'dokter', 'dokter.user', 'dokter.poli')->where('tahap', 'klinik')->whereIn('pasien_id', $keluarga->pluck('id'));


        $antrian = $queryAntrian->latest()->get();
        // dd($antrian);
        return inertia('Pasien/Antrian/Index', compact('antrian'));
    }

    public function take_antrian(Request $request)
    {
        $poli = Poli::latest()->get();
        $keluarga = Pasien::where('user_id', $request->user()->id)->get();

        // Siapkan query dokter
        $dokterQuery = Dokter::with('jadwal', 'user');

        if ($request->poli_id) {
            $dokterQuery->where('poli_id', $request->poli_id);
        }

        // if ($request->tanggal_kunjungan) {
        //     $hari = Carbon::parse($request->tanggal_kunjungan)->translatedFormat('l'); // contoh: 'Senin'


        //     // Filter dokter yang jadwalnya cocok dengan hari & jam kunjungan
        //     $dokterQuery->whereHas('jadwal', function ($q) use ($hari) {
        //         $q->where('hari', $hari);
        //     });
        // }

        $dokter = $dokterQuery->latest()->get();

        // Query antrian
        $antrian = null;
        if ($request->tanggal_kunjungan && $request->poli_id && $request->dokter_id) {
            $antrian = Antrian::with('dokter', 'dokter.user')->where('tahap', 'klinik')
                ->whereDate('tanggal_periksa', $request->tanggal_kunjungan)
                ->where('poli_id', $request->poli_id)
                ->where('dokter_id', $request->dokter_id)
                ->latest()->first();
            // dd($antrian);
        }



        return inertia('Pasien/Antrian/AntrianOnline', compact('poli', 'dokter', 'antrian', 'keluarga'));
    }

    public function ambilOnline(Request $request)
    {

        $poli = Poli::find($request->poli_id);
        $prefix = $poli->prefix;
        $countAntrian = Antrian::where('tanggal_periksa', $request->tanggal_kunjungan)->where('poli_id', $request->poli_id)
            ->where('dokter_id', $request->dokter_id)->count();

        $nomor = str_pad($countAntrian + 1, 3, '0', STR_PAD_LEFT);
        $kode = $prefix . '-' . $nomor;
        $antrian = Antrian::create([
            'pasien_id' => $request->keluarga_id,
            'jenis_antrian_id' => '1', // hapus nanti ini karena tidak dipake mi
            'tahap' => 'klinik',
            'tipe' => 'online',
            'kode_antrian' => $kode,
            'loket_tujuan' => '', //memang logikanya di set kosong yah, jangan dihapus
            'poli_id' => $poli->id,
            'dokter_id' => $request->dokter_id,
            'keluhan' => $request->keluhan,
            'tanggal_periksa' => $request->tanggal_kunjungan,
            'status' => 'menunggu',
        ]);

        broadcast(new AntrianKlinikEvent($antrian->refresh()));
    }

    public function destroy(String $id)
    {
        $antrian = Antrian::find($id);
        $antrian->delete();
        broadcast(new AntrianKlinikEvent($antrian->refresh()));
    }
}
