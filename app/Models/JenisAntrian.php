<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JenisAntrian extends Model
{
    protected $fillable = [
        'nama',
        'prefix',
        'status_aktif',
    ];

    protected $casts = [

        'status_aktif' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function antrians(): HasMany
    {
        return $this->hasMany(Antrian::class);
    }

    public function lokets(): HasMany
    {
        return $this->hasMany(Loket::class);
    }
}
