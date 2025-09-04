<?php

namespace App\Http\Controllers\Api;

use App\Events\CallAgainAntrianOfflineEvent;
use App\Events\CallAntrianOfflineEvent;
use App\Http\Controllers\Controller;
use App\Models\Antrian;
use App\Models\JenisAntrian;
use App\Models\Loket;
use Illuminate\Http\Request;

class AntrianOfflineApi extends Controller
{
    public function get_data(Request $request)
    {

        $jenis_id = '';

        if ($request->jenis) {
            $checkJenis = JenisAntrian::where('nama', $request->jenis)->first();
            $jenis_id = $checkJenis->id;
        }
        $antrian = Antrian::with('poli')->where('tahap', '=', 'pendaftaran')->where('jenis_antrian_id', $jenis_id)
            ->whereDate('created_at', now())->get();

        return response()->json($antrian);
    }

    public function next_antrian(Request $request)
    {
        $jenis_id = '';

        if ($request->jenis) {
            $checkJenis = JenisAntrian::where('nama', $request->jenis)->first();
            $jenis_id = $checkJenis->id;
        }
        $antrian = Antrian::with('poli')->where('tahap', '=', 'pendaftaran')->where('jenis_antrian_id', $jenis_id)
            ->where('status', 'menunggu')
            ->whereDate('created_at', now())->first();

        if ($antrian) {

            $antrian->update([
                'status' => 'dipanggil',
                'loket_tujuan' => $request->nama_loket
            ]);

            broadcast(new CallAntrianOfflineEvent($antrian->refresh()));
            return response()->json($antrian);
        } else {
            return response()->json([]);
        }
    }
    public function penggil_kembali(Request $request)
    {

        $antrian = Antrian::with('poli')->where('id', $request->id)->first();
        // $antrian->update(['loket_tujuan', $request->nama_loket]);
        broadcast(new CallAgainAntrianOfflineEvent($antrian->refresh()));
        return response()->json($antrian);
    }

    public function display(Request $request)
    {
        $loket = Loket::all();
    }
}
