<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poli extends Model
{
    protected $fillable = [
        'prefix',
        'nama',
        'keterangan',
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($poli) {
            if (empty($poli->prefix) && !empty($poli->nama)) {
                $poli->prefix = strtoupper(substr($poli->nama, 0, 1));
            }
        });
    }

    public function dokter()
    {
        return $this->hasMany(Dokter::class);
    }

    public function antrians()
    {
        return $this->hasMany(Antrian::class);
    }
}
