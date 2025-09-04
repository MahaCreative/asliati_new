<?php

namespace App\Http\Controllers\Admin;

use App\Events\StatusJenisEvent;
use App\Events\StatusLoketEvent;
use App\Http\Controllers\Controller;
use App\Models\JenisAntrian;
use App\Models\Loket;
use Illuminate\Http\Request;

class JenisAntrianController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $loket = Loket::with('jenis')->latest()->get();
        $jenis_antrian = JenisAntrian::latest()->get();

        return inertia('Petugas/LoketJenisAntrian/Index', compact('loket', 'jenis_antrian'));
    }

    public function store_jenis(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|min:6|max:25|unique:jenis_antrians,nama',
            'prefix' => 'required|alpha|max:1|unique:jenis_antrians,prefix'
        ]);
        $jenisAntrian = JenisAntrian::create(['nama' => $request->nama, 'prefix' => $request->prefix]);
        broadcast(new StatusJenisEvent($jenisAntrian));
    }

    public function update_jenis(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'nama' => 'required|string|min:6|max:25|unique:jenis_antrians,nama,' . $request->id,
            'prefix' => 'required|alpha|max:1|unique:jenis_antrians,prefix,' . $request->id,
        ]);
        $jenis_antrian = JenisAntrian::find($request->id);
        $jenis_antrian->update([
            'nama' => $request->nama,
            'prefix' => $request->prefix
        ]);
        broadcast(new StatusJenisEvent($jenis_antrian));
    }

    public function destroy_jenis(Request $request)
    {
        $jenis = JenisAntrian::find($request->id)->delete();
        broadcast(new StatusJenisEvent());
    }

    public function store_loket(Request $request)
    {


        $request->validate([
            'nama' => 'required|string|min:1|max:10|unique:lokets,nama',
            'jenis_antrian_id' => 'required'
        ]);
        $loket = Loket::create([
            'nama' => $request->nama,
            'jenis_antrian_id' => $request->jenis_antrian_id
        ]);
        broadcast(new StatusLoketEvent($loket));
    }

    public function update_loket(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'nama' => 'required|string|min:1|max:10|unique:lokets,nama,' . $request->id,
            'jenis_antrian_id' => 'required'
        ]);
        $loket = Loket::find($request->id);
        $loket->update([
            'nama' => $request->nama,
            'jenis_antrian_id' => $request->jenis_antrian_id
        ]);
        broadcast(new StatusLoketEvent($loket));
    }
    public function destroy_loket(Request $request)
    {
        Loket::find($request->id)->delete();
        broadcast(new StatusLoketEvent());
    }

    public function update_status_jenis(Request $request)
    {
        $jenisAntrian = JenisAntrian::findOrFail($request->id);
        $jenisAntrian->status_aktif = $request->status;
        $jenisAntrian->save();
        broadcast(new StatusJenisEvent($jenisAntrian));
        return redirect()->back()->with('success', 'Status jenis antrian berhasil diperbarui.');
    }

    public function update_status_loket(Request $request)
    {
        $loket = Loket::findOrFail($request->id);
        $loket->status_aktif = $request->status;
        $loket->save();

        broadcast(new StatusLoketEvent($loket));
    }
}
