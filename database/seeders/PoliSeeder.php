<?php

namespace Database\Seeders;

use App\Models\Poli;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PoliSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $polis = [
            ['nama' => 'Poli Umum', 'keterangan' => fake()->paragraph(4)],
            ['nama' => 'Poli Gigi', 'keterangan' => fake()->paragraph(4)],
            ['nama' => 'Poli Anak', 'keterangan' => fake()->paragraph(4)],
            ['nama' => 'Poli THT', 'keterangan' => fake()->paragraph(4)],
            ['nama' => 'Poli Mata', 'keterangan' => fake()->paragraph(4)],
        ];

        foreach ($polis as $poli) {
            Poli::create([
                'nama' => $poli['nama'],
                'prefix' => strtoupper(substr(str_replace('Poli ', '', $poli['nama']), 0, 1)),
                'keterangan' => $poli['keterangan'],
            ]);
        }
    }
}
