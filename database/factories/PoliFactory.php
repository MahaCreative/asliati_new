<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Poli>
 */
class PoliFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nama = $this->faker->randomElement(['Umum', 'Gigi', 'Anak', 'THT', 'Mata']);
    return [
        'nama' => 'Poli ' . $nama,
        'prefix' => strtoupper(substr($nama, 0, 1)),
        'keterangan' => $this->faker->sentence(10),
    ];
    }
}
