<?php

namespace App\Http\Controllers\Pasien;

use App\Events\PasienEvent;
use App\Http\Controllers\Controller;
use App\Models\Pasien;
use App\Models\RekamMedis;
use Illuminate\Http\Request;

class KeluargaPasien extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $pasien = Pasien::where('user_id', $user->id)->get();
        return inertia('Pasien/Keluarga/Index', compact('pasien'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Pasien/Keluarga/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'nik' => 'required|numeric|max_digits:16,unique:pasiens,nik',
            'bpjs' => 'nullable|numeric|max_digits:16,unique:pasiens,bpjs',
            'nama_lengkap' => 'required',
            'telephone' => 'nullable|numeric|max_digits:12|unique:pasiens,telephone',
            'tempat_lahir' => 'required',
            'status_keluarga' => 'required',
            'jenis_kelamin' => 'required',
            'tanggal_lahir' => 'required|date',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png',
        ]);
        $avatar = 'image/default_preview.png';
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar')->store('avatar');
        }
        $pasien = Pasien::create([
            'user_id' => $request->user()->id,
            'nik' => $request->nik,
            'bpjs' => $request->bpjs,
            'nama_lengkap' => $request->nama_lengkap,
            'telephone' => $request->telephone,
            'tempat_lahir' => $request->tempat_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tanggal_lahir' => $request->tanggal_lahir,
            'status_keluarga' => $request->status_keluarga,
            'avatar' => $avatar,
        ]);
        broadcast(new PasienEvent($pasien));
    }

    public function edit(string $id)
    {
        $pasien = Pasien::find($id);
        return inertia('Pasien/Keluarga/Form', compact('pasien'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nik' => 'required|numeric|max_digits:16,unique:pasiens,nik,' . $id,
            'bpjs' => 'nullable|numeric|max_digits:16,unique:pasiens,bpjs,' . $id,
            'nama_lengkap' => 'required',
            'telephone' => 'nullable|numeric|max_digits:12|unique:pasiens,telephone,' . $id,
            'tempat_lahir' => 'required',
            'jenis_kelamin' => 'required',
            'status_keluarga' => 'required',
            'tanggal_lahir' => 'required|date',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png',
        ]);
        $pasien = Pasien::find($id);
        $avatar = $pasien->avatar;
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar')->store('avatar');
        }
        $pasien->update([
            'nik' => $request->nik,
            'bpjs' => $request->bpjs,
            'nama_lengkap' => $request->nama_lengkap,
            'telephone' => $request->telephone,
            'tempat_lahir' => $request->tempat_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tanggal_lahir' => $request->tanggal_lahir,
            'status_keluarga' => $request->status_keluarga,
            'avatar' => $avatar,
        ]);
        broadcast(new PasienEvent($pasien));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $pasien = Pasien::find($id);
        $rekamMedis = RekamMedis::where('pasien_id', $pasien->id)->latest()->get();
        return inertia('Pasien/Keluarga/Show', compact('pasien', 'rekamMedis'));
    }

    /**
     * Show the form for editing the specified resource.
     */

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $keluarga = Pasien::find($id)->delete();
        broadcast(new PasienEvent());
    }
}
