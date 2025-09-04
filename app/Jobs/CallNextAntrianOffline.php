<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;

class CallNextAntrianOffline implements ShouldQueue
{
    use Queueable;

    protected $jenis;

    public function __construct($jenis)
    {
        $this->jenis = $jenis;
    }

    public function handle(): void
    {
        try {
            Http::timeout(5)->get(route('next-antrian-offline', ['jenis' => $this->jenis]));
        } catch (\Exception $e) {
            \Log::error('Gagal memanggil next antrian: ' . $e->getMessage());
        }
    }
}
