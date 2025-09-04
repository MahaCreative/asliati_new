<?php

namespace Database\Seeders;

use App\Models\JenisAntrian;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JenisAntrianSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['nama' => 'Pasien Baru', 'prefix' => 'A', 'status_aktif' => true],
            ['nama' => 'Pasien Lama', 'prefix' => 'B', 'status_aktif' => true],
            ['nama' => 'BPJS', 'prefix' => 'BP', 'status_aktif' => true],
        ];

        JenisAntrian::insert($data);
    }
}
