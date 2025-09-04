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
        Schema::create('antrians', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pasien_id')->nullable();
            $table->enum('tahap', ['pendaftaran', 'klinik'])->default('pendaftaran');
            $table->enum('tipe', ['offline', 'online']);
            $table->string('kode_antrian');
            $table->string('loket_tujuan')->nullable();
            $table->foreignId('jenis_antrian_id')->nullable()->constrained('jenis_antrians')->cascadeOnDelete();
            $table->foreignId('poli_id')->nullable()->constrained('polis')->cascadeOnDelete();
            $table->foreignId('dokter_id')->nullable()->constrained('dokters')->cascadeOnDelete();
            $table->longText('keluhan')->nullable();
            $table->date('tanggal_periksa')->nullable();
            $table->enum('status', ['menunggu', 'dipanggil', 'selesai', 'batal'])->default('menunggu');
            $table->timestamp('estimasi_panggilan')->nullable(); // <--- tambahan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antrians');
    }
};
