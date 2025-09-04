<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Antrian>
 */
class AntrianFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jenis = $this->faker->randomElement(['offline', 'online']);
        $tahap = $jenis === 'offline' ? 'pendaftaran' : 'klinik';

        return [
            'pasien_id' => User::factory()->state(['role' => 'pasien']),
            'tahap' => $tahap,
            'tipe' => $jenis,
            'nomor' => strtoupper($this->faker->lexify('??')) . '-' . $this->faker->numberBetween(1, 999),
            'jenis_antrian_id' => JenisAntrian::factory(),
            'poli_id' => $jenis === 'online' ? Poli::factory() : null,
            'tanggal_periksa' => $jenis === 'online' ? $this->faker->dateTimeBetween('now', '+7 days') : null,
            'status' => 'menunggu',
            'estimasi_panggilan' => $this->faker->dateTimeBetween('now', '+2 hours'),
        ];
    }
}
