<?php

namespace Database\Factories;

use App\Models\Dokter;
use App\Models\Poli;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RekamMedis>
 */
class RekamMedisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
             'pasien_id' => User::factory()->state(['role' => 'pasien']),
            'dokter_id' => Dokter::factory(),
            'poli_id' => Poli::factory(),
            'tanggal_kunjungan' => now(),
            'keluhan' => $this->faker->sentence(),
            'diagnosa' => $this->faker->sentence(),
            'resep' => $this->faker->sentence(),
            'catatan' => $this->faker->optional()->paragraph(),
        ];
    }
}
