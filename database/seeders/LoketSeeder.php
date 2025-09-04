<?php

namespace Database\Seeders;

use App\Models\JenisAntrian;
use App\Models\Loket;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LoketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jenisAntrians = JenisAntrian::all();

        for ($i = 1; $i <= 10; $i++) {
            Loket::create([
                'nama' => 'Loket ' . $i,
                'status_aktif' => true,
                'jenis_antrian_id' => $jenisAntrians->random()->id, // random jenis antrian
            ]);
        }
    }
}
