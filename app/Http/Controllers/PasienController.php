<?php

namespace App\Http\Controllers;

use App\Events\PasienEvent;
use App\Models\Pasien;
use Illuminate\Http\Request;

class PasienController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pasien = Pasien::latest()->get();
        return inertia('Petugas/Pasien/Index', compact('pasien'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Petugas/Pasien/Form');
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
            'jenis_kelamin' => 'required',
            'tanggal_lahir' => 'required|date',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png',
        ]);
        $avatar = 'image/default_preview.png';
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar')->store('avatar');
        }
        $pasien = Pasien::create([
            'nik' => $request->nik,
            'bpjs' => $request->bpjs,
            'nama_lengkap' => $request->nama_lengkap,
            'telephone' => $request->telephone,
            'tempat_lahir' => $request->tempat_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tanggal_lahir' => $request->tanggal_lahir,
            'avatar' => $avatar,
        ]);
        broadcast(new PasienEvent($pasien));
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
        $pasien = Pasien::find($id);
        return inertia('Petugas/Pasien/Form', compact('pasien'));
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
            'avatar' => $avatar,
        ]);
        broadcast(new PasienEvent($pasien));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pasien = Pasien::find($id)->delete();
        broadcast(new PasienEvent());
    }
}
