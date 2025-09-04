<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RekamMedis extends Model
{
    protected $guarded = [];
    /**
     * Get the patient associated with this medical record
     */
    public function pasien(): BelongsTo
    {
        return $this->belongsTo(Pasien::class);
    }

    /**
     * Get the doctor associated with this medical record
     */
    public function dokter(): BelongsTo
    {
        return $this->belongsTo(Dokter::class);
    }

    /**
     * Get the poli associated with this medical record
     */
    public function poli(): BelongsTo
    {
        return $this->belongsTo(Poli::class);
    }
}
