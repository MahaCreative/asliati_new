<?php

namespace App\Http\Controllers\Dokter;

use App\Http\Controllers\Controller;
use App\Models\Dokter;
use App\Models\JadwalDokter;
use Illuminate\Http\Request;

class JadwalController extends Controller
{
    public function index(Request $request)
    {
        $dokter = Dokter::where('user_id', $request->user()->id)->first();
        $jadwal = JadwalDokter::where('dokter_id', $dokter->id)->latest()->get();
        return inertia('Dokter/JadwalSaya/Index', compact('jadwal'));
    }

    public function create(Request $request)
    {
        return inertia('Dokter/JadwalSaya/Create');
    }

    public function store(Request $request)
    {
        $request->validate([

            'jadwal' => 'required|array|min:1',
            'jadwal.*.hari' => 'required|string|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'jadwal.*.jam_mulai' => 'required|date_format:H:i',
            'jadwal.*.jam_selesai' => 'required|date_format:H:i|after:jadwal.*.jam_mulai',
        ]);
        // dd($request->all());
        $dokter = Dokter::where('user_id', $request->user()->id)->first();

        foreach ($request->jadwal as $jadwal) {
            JadwalDokter::create([
                'dokter_id' => $dokter->id,
                'hari' => $jadwal['hari'],
                'jam_mulai' => $jadwal['jam_mulai'],
                'jam_selesai' => $jadwal['jam_selesai'],
            ]);
        }
        return redirect()->route('dokter.jadwal-saya.index');
    }

    public function destroy($id)
    {
        $jadwal = JadwalDokter::find($id);
        $jadwal->delete();
    }
}
