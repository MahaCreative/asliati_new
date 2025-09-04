<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Loket extends Model
{
    protected $fillable = [
        'nama',
        'status_aktif',
        'jenis_antrian_id',
    ];

    protected $casts = [
        'status_aktif' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function jenis(): BelongsTo
    {
        return $this->belongsTo(JenisAntrian::class, 'jenis_antrian_id');
    }

    public function antrians(): HasMany
    {
        return $this->hasMany(Antrian::class);
    }
}
