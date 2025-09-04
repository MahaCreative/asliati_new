<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rekam_medis', function (Blueprint $table) {
            $table->id();

            $table->foreignId('pasien_id')->constrained('pasiens')->cascadeOnDelete();
            $table->foreignId('dokter_id')->constrained('dokters')->cascadeOnDelete();
            $table->foreignId('poli_id')->constrained('polis')->cascadeOnDelete();

            $table->date('tanggal_kunjungan');

            // Keluhan utama pasien
            $table->text('keluhan');

            // Diagnosa dokter
            $table->text('diagnosa');

            // Resep obat / terapi
            $table->text('resep');

            // Catatan tambahan dokter
            $table->text('catatan')->nullable();

            // Pemeriksaan fisik detil
            $table->string('tekanan_darah')->nullable();    // contoh: 120/80 mmHg
            $table->integer('denyut_nadi')->nullable();     // bpm
            $table->float('suhu_tubuh')->nullable();        // °C
            $table->float('tinggi_badan')->nullable();      // cm
            $table->float('berat_badan')->nullable();       // kg
            $table->string('pernapasan')->nullable();       // frekuensi pernapasan per menit

            // Riwayat penyakit sebelumnya
            $table->text('riwayat_penyakit')->nullable();



            // Tindakan medis yang dilakukan
            $table->text('tindakan_medis')->nullable();

            // Instruksi pasien / edukasi
            $table->text('instruksi_pasien')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekam_medis');
    }
};
