<?php

namespace Database\Seeders;

use App\Models\ProfileKlinik;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfileKlinikSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProfileKlinik::insert([
            'nama_klinik' => 'Klinik Hayyat Medical Center',
            'alamat' => 'Jl. diponegoro',
            'logo' => 'image/default_preview.png',
            'deskripsi' => fake()->paragraph(),
        ]);
    }
}
