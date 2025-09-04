<?php

namespace Database\Seeders;

use App\Models\Antrian;
use App\Models\JadwalDokter;
use App\Models\JenisAntrian;
use App\Models\Poli;
use App\Models\RekamMedis;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            JenisAntrianSeeder::class,
            LoketSeeder::class,
            PoliSeeder::class,
            ProfileKlinikSeeder::class,
        ]);

        User::factory()->create([
            'name' => 'Petugas Admin',
            'email' => 'petugas@example.com',
            'password' => bcrypt('password'),
            'role' => 'petugas',
        ]);

        // Buat Dokter
        $dokters = User::factory(5)->create([
            'role' => 'dokter',
        ]);

        // Buat Pasien
        $pasiens = User::factory(20)->create([
            'role' => 'pasien',
        ]);

        // Buat Jadwal Dokter


        // Buat Antrian Dummy
        $jenisAntrian = JenisAntrian::all();
        $polis = Poli::all();
    }
}
