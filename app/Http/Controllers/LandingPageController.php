<?php

namespace App\Http\Controllers;

use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\Poli;
use App\Models\ProfileKlinik;
use App\Models\User;
use Illuminate\Http\Request;

class LandingPageController extends Controller
{
    public function index(Request $request)
    {
        $polis = Poli::latest()->get();
        $profile = ProfileKlinik::first();
        $dokter = Dokter::with('jadwal', 'user', 'poli')->latest()->get();
        $pasien = Pasien::count();
        $petugas = User::where('role', 'petugas')->count();
        return inertia('Pasien/LandingPage', compact('polis', 'profile', 'dokter', 'pasien', 'petugas'));
    }
}
