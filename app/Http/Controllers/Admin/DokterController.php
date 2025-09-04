<?php

namespace App\Http\Controllers\Admin;

use App\Events\DokterEvent;
use App\Http\Controllers\Controller;
use App\Models\Dokter;
use App\Models\Poli;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class DokterController extends Controller
{
    public function index()
    {
        $dokter = Dokter::with(['user', 'poli', 'jadwal'])->latest()->get();
        $poli = Poli::all();

        return inertia('Petugas/Dokter/Index', [
            'dokter' => $dokter,
            'poli' => $poli
        ]);
    }

    public function create()
    {
        $poli = Poli::all();

        return inertia('Petugas/Dokter/Create', [
            'poli' => $poli
        ]);
        broadcast(new DokterEvent());
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'poli_id' => 'required|exists:polis,id',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'deskripsi' => 'nullable|string',
            'jadwal' => 'required|array|min:1',
            'jadwal.*.hari' => 'required|string|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'jadwal.*.jam_mulai' => 'required|date_format:H:i',
            'jadwal.*.jam_selesai' => 'required|date_format:H:i|after:jadwal.*.jam_mulai',
        ]);

        DB::beginTransaction();

        try {
            // Create user


            // Handle foto upload
            $fotoPath = null;
            if ($request->hasFile('foto')) {
                $fotoPath = $request->file('foto')->store('dokter', 'public');
            }
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'dokter',
                'avatar' => $fotoPath,
            ]);
            // Create dokter
            $dokter = Dokter::create([
                'user_id' => $user->id,
                'poli_id' => $request->poli_id,
                'foto' => $fotoPath,
                'deskripsi' => $request->deskripsi,
            ]);

            // Create jadwal dokter
            foreach ($request->jadwal as $jadwal) {
                $dokter->jadwal()->create([
                    'hari' => $jadwal['hari'],
                    'jam_mulai' => $jadwal['jam_mulai'],
                    'jam_selesai' => $jadwal['jam_selesai'],
                ]);
            }


            DB::commit();
            broadcast(new DokterEvent());
            return redirect()->route('petugas.dokter.index')->with('success', 'Dokter berhasil ditambahkan');
        } catch (\Exception $e) {
            DB::rollback();

            if ($fotoPath && Storage::disk('public')->exists($fotoPath)) {
                Storage::disk('public')->delete($fotoPath);
            }

            throw $e;
        }
    }

    public function edit(Dokter $dokter)
    {

        $poli = Poli::all();
        $dokter->load('jadwal', 'user');
        return inertia('Petugas/Dokter/Create', [
            'dokter' => $dokter->load(['user', 'jadwal']),
            'poli' => $poli
        ]);
        broadcast(new DokterEvent());
    }

    public function update(Request $request, Dokter $dokter)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $dokter->user_id,
            'password' => 'nullable|string|min:8|confirmed',
            'poli_id' => 'required|exists:polis,id',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'deskripsi' => 'nullable|string',
            'jadwal' => 'required|array|min:1',
            'jadwal.*.hari' => 'required|string|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',

        ]);

        DB::beginTransaction();

        try {
            $user = $dokter->user; // relasi Dokter -> User

            // 🔹 Handle foto upload
            $fotoPath = $dokter->foto;
            if ($request->hasFile('foto')) {
                // hapus foto lama
                if ($fotoPath && Storage::disk('public')->exists($fotoPath)) {
                    Storage::disk('public')->delete($fotoPath);
                }
                $fotoPath = $request->file('foto')->store('dokter', 'public');
            }

            // 🔹 Update user
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'avatar' => $fotoPath,
            ]);

            if ($request->filled('password')) {
                $user->update([
                    'password' => Hash::make($request->password),
                ]);
            }

            // 🔹 Update dokter
            $dokter->update([
                'poli_id' => $request->poli_id,
                'foto' => $fotoPath,
                'deskripsi' => $request->deskripsi,
            ]);

            // 🔹 Sinkronisasi jadwal
            $dokter->jadwal()->delete(); // cara paling aman: hapus semua dulu
            foreach ($request->jadwal as $jadwal) {
                $dokter->jadwal()->create([
                    'hari' => $jadwal['hari'],
                    'jam_mulai' => $jadwal['jam_mulai'],
                    'jam_selesai' => $jadwal['jam_selesai'],
                ]);
            }

            DB::commit();

            broadcast(new DokterEvent());
            return redirect()->route('petugas.dokter.index')->with('success', 'Dokter berhasil diperbarui');
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            if ($request->hasFile('foto') && $fotoPath && Storage::disk('public')->exists($fotoPath)) {
                Storage::disk('public')->delete($fotoPath);
            }

            throw $e;
        }
    }


    public function destroy(Dokter $dokter)
    {
        DB::beginTransaction();

        try {
            // Delete foto
            if ($dokter->foto && Storage::disk('public')->exists($dokter->foto)) {
                Storage::disk('public')->delete($dokter->foto);
            }

            // Delete user (will cascade to dokter and jadwal)
            $dokter->user->delete();

            DB::commit();
            broadcast(new DokterEvent());
            return redirect()->route('petugas.dokter.index')->with('success', 'Dokter berhasil dihapus');
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        }
    }
}
