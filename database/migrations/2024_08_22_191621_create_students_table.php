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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            // BIODATA
            $table->string('no_test', 255)->nullable();
            $table->enum('jalur_penerimaan', ['SNMPTN', 'SBMPTN', 'Mandiri', 'INTERNASIONAL'])->nullable();
            $table->year('angkatan')->nullable();
            $table->string('prodi')->nullable();
            $table->string('tmp_lahir')->nullable();
            $table->date('tgl_lahir')->nullable();
            $table->string('kab_lahir')->nullable();
            $table->string('prov_lahir')->nullable();
            $table->enum('jk', ['Laki-laki', 'Perempuan'])->nullable();
            $table->text('alamat')->nullable();
            $table->string('nohp', 30)->nullable();
            $table->string('email')->nullable();
            $table->enum('agama', ['Islam', 'Protestan', 'Hindu', 'Budha', 'Katolik', 'Lainnya', 'Konghucu'])->nullable();
            $table->string('suku')->nullable();
            $table->string('kewarnegaraan')->nullable();
            $table->integer('jml_kakak')->nullable();
            $table->integer('jml_adik')->nullable();
            $table->string('status_huni_rumah')->nullable();
            // PRESTASI SMA
            $table->text('akademik')->nullable();
            $table->text('non_akademik')->nullable();
            // BAKAT & MINAT
            $table->text('olahraga')->nullable();
            $table->text('kesenian')->nullable();
            // AYAH
            $table->string('nama_ayah')->nullable();
            $table->enum('agama_ayah', ['Islam', 'Protestan', 'Hindu', 'Budha', 'Katolik', 'Lainnya', 'Konghucu'])->nullable();
            $table->enum('pendidikan_ayah', ['S3', 'S2', 'S1', 'SMA', 'SMP', 'SD', 'SMK'])->nullable();
            $table->string('penghasilan_ayah')->nullable();
            $table->string('pekerjaan_ayah')->nullable();
            $table->string('nohp_ayah')->nullable();
            // IBU
            $table->string('nama_ibu')->nullable();
            $table->enum('agama_ibu', ['Islam', 'Protestan', 'Hindu', 'Budha', 'Katolik', 'Lainnya', 'Konghucu'])->nullable();
            $table->enum('pendidikan_ibu', ['S3', 'S2', 'S1', 'SMA', 'SMP', 'SD'])->nullable();
            $table->string('penghasilan_ibu')->nullable();
            $table->string('pekerjaan_ibu')->nullable();
            $table->string('nohp_ibu')->nullable();
            // ORANG TUA
            $table->text('alamat_orangtua')->nullable();
            $table->string('daya_listrik')->nullable();
            // WALI
            $table->string('nama_wali')->nullable();
            $table->string('nipnrp')->nullable();
            $table->string('pangkat')->nullable();
            $table->string('instansi')->nullable();
            $table->enum('pendidikan_wali', ['S3', 'S2', 'S1', 'SMA', 'SMP', 'SD'])->nullable();
            $table->string('pekerjaan_wali')->nullable();
            $table->string('penghasilan_wali')->nullable();
            $table->text('alamat_wali')->nullable();
            $table->string('nohp_wali')->nullable();
            // SEKOLAH ASAL
            $table->string('nama_sekolah')->nullable();
            $table->string('kab_sekolah')->nullable();
            $table->string('prov_sekolah')->nullable();
            $table->integer('thn_masuk')->nullable();
            $table->integer('thn_lulus')->nullable();
            $table->integer('jml_mapel')->nullable();
            $table->integer('nilai')->nullable();
            $table->string('no_ijazah')->nullable();
            // PEMERIKSAAN KESEHATAN
            $table->integer('tinggi')->nullable();
            $table->integer('berat')->nullable();
            $table->string('tekanan_darah')->nullable();
            $table->enum('gol_darah', ['A', 'B', 'AB', 'O'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
