<?php

use App\Http\Controllers\Admin\AntrianOfflineController;
use App\Http\Controllers\Admin\DokterController;
use App\Http\Controllers\Admin\JenisAntrianController;
use App\Http\Controllers\Admin\LoketController;
use App\Http\Controllers\Admin\PoliController;
use App\Http\Controllers\Admin\ProfileKlinikController;
use App\Http\Controllers\Api\AntrianOfflineApi;
use App\Http\Controllers\Api\AntrianONlineController;
use App\Http\Controllers\Api\DokterController as ApiDokterController;
use App\Http\Controllers\Api\PasienController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Dokter\AntrianKlinikController;
use App\Http\Controllers\Dokter\JadwalController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\Pasien\AntrianKlinikController as PasienAntrianKlinikController;
use App\Http\Controllers\Pasien\KeluargaPasien;
use App\Http\Controllers\PasienController as ControllersPasienController;
use App\Http\Controllers\RekamMedisController;
use App\Http\Controllers\ReportAntrianPoliController;
use App\Models\ProfileKlinik;
use Illuminate\Support\Facades\Route;

// Landing Page
Route::get('/', [LandingPageController::class, 'index'])->name('landing');

// Auth Routes
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::get('/display-antrian-offline', [AntrianOfflineController::class, 'display'])->name('display.antrian-ofline');
// Protected Routes
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::middleware(['auth'])->group(function () {
    Route::get('laporan-antrian', [ReportAntrianPoliController::class, 'index'])->name('laporan-antrian');
    Route::get('export-laporan-antrian', [ReportAntrianPoliController::class, 'exportPdf'])->name('export-laporan-antrian');

    Route::get('rekap-antrian-poli', [ReportAntrianPoliController::class, 'rekap_poli'])->name('rekap-poli');
    Route::get('export-rekap-antrian-poli', [ReportAntrianPoliController::class, 'rekap_poli_export'])->name('rekap-poli-export');
    Route::get('rekap-antrian-dokter', [ReportAntrianPoliController::class, 'rekap_dokter'])->name('laporan.rekap.dokter.index');
    Route::get('rekap-antrian-dokter/pdf', [ReportAntrianPoliController::class, 'rekap_dokter_export'])->name('laporan.rekap.dokter.pdf');

    Route::get('/display-antrian-offline', [AntrianOfflineController::class, 'display'])->name('display.antrian-ofline');
    Route::get('/display-antrian-klinik', [AntrianONlineController::class, 'display'])->name('display.antrian-klinik');
    // Dashboard Umum

    // PETUGAS
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::middleware(['role:petugas'])->prefix('petugas')->name('petugas.')->group(function () {
        Route::resource('/dokter', DokterController::class)->parameters(['dokter' => 'dokter']);
        Route::resource('/pasien', ControllersPasienController::class);
        Route::get('profile-klinik', [ProfileKlinikController::class, 'index'])->name('profile-klinik.index');
        Route::post('profile-klinik', [ProfileKlinikController::class, 'update'])->name('profile-klinik.update');

        Route::resource('/poli', PoliController::class)->parameters(['poli' => 'poli']);
        Route::get('/loket-jenis-antrian', [JenisAntrianController::class, 'index'])->name('loket-jenis-antrian.index');
        Route::post('/store-jenis-antrian', [JenisAntrianController::class, 'store_jenis'])->name('loket-jenis-antrian.store_jenis');
        Route::post('/update-jenis-antrian', [JenisAntrianController::class, 'update_jenis'])->name('loket-jenis-antrian.update_jenis');
        Route::delete('/destroy-jenis-antrian', [JenisAntrianController::class, 'destroy_jenis'])->name('loket-jenis-antrian.destroy_jenis');
        Route::post('/store-loket', [JenisAntrianController::class, 'store_loket'])->name('loket-jenis-antrian.store_loket');
        Route::post('/update-loket', [JenisAntrianController::class, 'update_loket'])->name('loket-jenis-antrian.update_loket');
        Route::delete('/destroy-loket', [JenisAntrianController::class, 'destroy_loket'])->name('loket-jenis-antrian.destroy_loket');
        Route::post('/update-status-jenis-antrian', [JenisAntrianController::class, 'update_status_jenis'])->name('loket-jenis-antrian.update_status_jenis');
        Route::post('/update-status-loket', [JenisAntrianController::class, 'update_status_loket'])->name('loket-jenis-antrian.update_status_loket');

        Route::get('loket-panggil-antrian', [AntrianOfflineController::class, 'loket_antrian'])->name('loket_antrian-offline.index');
        Route::post('/antrian-offline/ambil', [AntrianOfflineController::class, 'ambilOffline'])->name('antrian.offline.ambil');
        Route::post('/antrian-offline/proses/{id}', [AntrianOfflineController::class, 'prosesOffline'])->name('antrian.offline.proses');
        Route::get('cetak-struk/{kode_antrian}', [AntrianOfflineController::class, 'cetak_struk'])->name('antrian.offline.cetak_struk');
        Route::post('/antrian-offline/panggil/{id}', [AntrianOfflineController::class, 'panggilOffline'])->name('antrian.offline.panggil');
        Route::get('/display-take-antrian-offline', [AntrianOfflineController::class, 'displayOffline'])->name('display.take-antrian');
    });

    // DOKTER
    Route::middleware(['role:dokter'])->prefix('dokter')->name('dokter.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'dokter'])->name('dashboard');
        Route::resource('/jadwal-saya', JadwalController::class);
        Route::get('/loket-panggil-antrian', [AntrianKlinikController::class, 'index'])->name('antrian.index');
        Route::post('/antrian/panggil/{id}', [AntrianKlinikController::class, 'panggil'])->name('antrian.panggil');
        Route::get('/proses-antrian/{antrianId}', [AntrianKlinikController::class, 'proses'])->name('proses-antrian-klinik.index');
        Route::post('/store-proses-antrian/', [AntrianKlinikController::class, 'store_proses'])->name('proses-antrian-klinik.store');
    });

    // PASIEN
    Route::middleware(['role:pasien'])->prefix('pasien')->name('pasien.')->group(function () {
        Route::get('/pasien/dashboard', [DashboardController::class, 'pasien'])->name('dashboard');
        Route::resource('pasien/daftar-keluarga', KeluargaPasien::class);
        Route::get('/history-antrian-saya', [PasienAntrianKlinikController::class, 'index'])->name('history-antrian-saya');
        Route::get('/take-antrian-klinik', [PasienAntrianKlinikController::class, 'take_antrian'])->name('take-antrian.online');
        Route::delete('/destroy-antrian-klinik/{id}', [PasienAntrianKlinikController::class, 'destroy'])->name('destroy-antrian.online');
        Route::post('/antrian-online/ambil', [PasienAntrianKlinikController::class, 'ambilOnline'])->name('antrian.online.ambil');
        Route::get('/antrian/progress/{id}', [PasienAntrianKlinikController::class, 'progress'])->name('antrian.progress');
        Route::get('/rekam-medis', [RekamMedisController::class, 'index'])->name('rekam-medis.index');
    });
});

// API Routes (Public)
Route::get('get-antrian-offline', [AntrianOfflineApi::class, 'get_data'])->name('get-data-antrian-offline');
Route::get('panggil-antrian-offline', [AntrianOfflineApi::class, 'next_antrian'])->name('next-antrian-offline');
Route::get('panggil-kembali-antrian-offline', [AntrianOfflineApi::class, 'penggil_kembali'])->name('panggil-kembali-antrian-offline');
Route::get('get-data-dokter-bertugas', [ApiDokterController::class, 'get_data_bertugas'])->name('api.get-data-dokter-bertugas');
Route::get('show-data-pasien', [PasienController::class, 'show_data'])->name('api.show-data-pasien');
Route::get('panggil-antrian-online', [AntrianONlineController::class, 'next_antrian'])->name('next-antrian-online');
Route::get('panggil-kembali-antrian-online', [AntrianONlineController::class, 'penggil_kembali'])->name('panggil-kembali-antrian-online');
