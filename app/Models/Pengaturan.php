<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pengaturan extends Model
{
    protected $fillable = [
        'nama_klinik',
        'alamat',
        'telepon',
        'email',
        'logo',
        'favicon',
        'jam_buka',
        'jam_tutup',
        'timezone',
        'format_tanggal',
        'maksimal_antrian',
        'durasi_periksa',
        'notifikasi_wa',
        'notifikasi_email',
        'api_key_wa',
        'api_key_email',
    ];

    protected $casts = [
        'jam_buka' => 'datetime:H:i',
        'jam_tutup' => 'datetime:H:i',
        'maksimal_antrian' => 'integer',
        'durasi_periksa' => 'integer',
        'notifikasi_wa' => 'boolean',
        'notifikasi_email' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
