<?php

namespace App\Http\Controllers;

use App\Events\PasienEvent;
use App\Models\Pasien;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return inertia('Auth/Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // Redirect berdasarkan role
            $user = Auth::user();

            switch ($user->role) {
                case 'petugas':
                    return redirect()->intended('/dashboard');
                case 'dokter':
                    return redirect()->intended('/dokter/dashboard');
                case 'pasien':
                    return redirect()->route('pasien.dashboard');
                default:
                    return redirect()->intended('/dashboard');
            }
        }

        return back()->withErrors([
            'email' => 'Email atau password salah.',
        ])->onlyInput('email');
    }

    public function showRegisterForm()
    {
        return inertia('Auth/Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            "email" => 'required|email|unique:users,email',
            "password" => 'required|confirmed|string|min:6|max:20',
            "nik" => 'required|numeric|max_digits:16|unique:pasiens,nik',
            "bpjs" => 'nullable|numeric|max_digits:16|unique:pasiens,bpjs',
            "nama_lengkap" => 'required|string|min:3|max:25',
            "telephone" => 'required|numeric|max_digits:12|unique:pasiens,telephone',
            "tempat_lahir" => 'required|string|min:3|max:25',
            "jenis_kelamin" => 'required',
            "tanggal_lahir" => 'required|date',
            "avatar" => 'nullable|image|mimes:jpg,jpeg,png',
        ]);
        $fotoPath = null;
        if ($request->hasFile('avatar')) {
            $fotoPath = $request->file('avatar')->store('avatar', 'public');
        }
        $user = User::create([
            'name' => $request->nama_lengkap,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'avatar' => $fotoPath,
            'role' => 'pasien',
        ]);
        $pasien = Pasien::create([
            'user_id' => $user->id,
            'nik' => $request->nik,
            'bpjs' => $request->bpjs,
            'nama_lengkap' => $request->nama_lengkap,
            'telephone' => $request->telephone,
            'tempat_lahir' => $request->tempat_lahir,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tanggal_lahir' => $request->tanggal_lahir,
            'avatar' => $fotoPath,
        ]);
        Auth::login($user);
        broadcast(new PasienEvent($pasien))->toOthers();
        return redirect()->route('pasien.dashboard');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
