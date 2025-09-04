<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Antrian extends Model
{
    protected $fillable = [
        'pasien_id',
        'tahap',
        'tipe',
        'kode_antrian',
        'jenis_antrian_id',
        'poli_id',
        'dokter_id',
        'tanggal_periksa',
        'status',
        'loket_tujuan',
        'estimasi_panggilan',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'waktu_panggil' => 'datetime',
        'waktu_selesai' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function jenisAntrian(): BelongsTo
    {
        return $this->belongsTo(JenisAntrian::class);
    }

    public function loket(): BelongsTo
    {
        return $this->belongsTo(Loket::class);
    }

    public function dokter(): BelongsTo
    {
        return $this->belongsTo(Dokter::class);
    }

    public function pasien(): BelongsTo
    {
        return $this->belongsTo(Pasien::class, 'pasien_id');
    }

    public function poli()
    {
        return $this->belongsTo(Poli::class);
    }

    public function antrians_dipanggil()
    {
        return $this->hasMany(Antrian::class, 'poli_id');
    }

    public function antrians_berikutnya()
    {
        return $this->hasMany(Antrian::class, 'poli_id');
    }
}
