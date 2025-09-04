<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfileKlinik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileKlinikController extends Controller
{
    public function index(Request $request)
    {
        $profile = ProfileKlinik::first();
        return inertia('Petugas/Profile/Index', compact('profile'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'nama_klinik' => 'required|string|max:255',
            'alamat' => 'required|string|max:500',
            'deskripsi' => 'nullable|string|max:1000',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
        ]);

        $profile = ProfileKlinik::first();

        if (!$profile) {
            $profile = new ProfileKlinik();
        }

        $profile->nama_klinik = $request->nama_klinik;
        $profile->alamat = $request->alamat;
        $profile->deskripsi = $request->deskripsi;

        if ($request->hasFile('logo')) {
            // Hapus logo lama jika ada
            if ($profile->logo) {
                Storage::delete('public/' . $profile->logo);
            }

            $path = $request->file('logo')->store('profile-klinik', 'public');
            $profile->logo = $path;
        }

        $profile->save();

        return redirect()->back()->with('success', 'Profile klinik berhasil diperbarui');
    }
}
