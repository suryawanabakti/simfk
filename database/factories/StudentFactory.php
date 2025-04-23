<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = $this->faker->randomElement(['Laki-laki', 'Perempuan']);
        $religions = ['Islam', 'Protestan', 'Hindu', 'Budha', 'Katolik', 'Lainnya', 'Konghucu'];
        $admissionPaths = ['SNMPTN', 'SBMPTN', 'Mandiri', 'INTERNASIONAL'];
        $programs = ['Kedokteran', 'Farmasi', 'Keperawatan', 'Kesehatan Masyarakat', 'Gizi', 'Kedokteran Gigi'];
        $bloodTypes = ['A', 'B', 'AB', 'O'];
        $ethnicities = ['Bugis', 'Makassar', 'Toraja', 'Mandar', 'Jawa', 'Sunda', 'Batak', 'Minang'];
        $occupations = ['PNS', 'Wiraswasta', 'Karyawan Swasta', 'Dokter', 'Guru', 'Dosen', 'TNI/Polri', 'Petani', 'Nelayan', 'Pensiunan', 'Tidak Bekerja'];
        $educations = ['S3', 'S2', 'S1', 'SMA', 'SMP', 'SD'];
        $incomes = ['< Rp. 1.000.000', 'Rp. 1.000.000 - Rp. 3.000.000', 'Rp. 3.000.000 - Rp. 5.000.000', 'Rp. 5.000.000 - Rp. 10.000.000', '> Rp. 10.000.000'];
        $housingStatus = ['Rumah Sendiri', 'Rumah Sewa', 'Rumah Keluarga', 'Asrama'];
        $electricityPower = ['450 VA', '900 VA', '1300 VA', '2200 VA', '> 2200 VA'];

        $batch = $this->faker->numberBetween(2018, 2023);

        return [
            'user_id' => User::factory()->student(),
            'no_test' => $this->faker->unique()->numerify('##########'),
            'jalur_penerimaan' => $this->faker->randomElement($admissionPaths),
            'prodi' => $this->faker->randomElement($programs),
            'angkatan' => $batch,
            'email' => $this->faker->unique()->safeEmail(),
            'jk' => $gender,
            'tmp_lahir' => $this->faker->city(),
            'tgl_lahir' => $this->faker->date('Y-m-d', '-18 years'),
            'alamat' => $this->faker->address(),
            'nohp' => $this->faker->phoneNumber(),
            'agama' => $this->faker->randomElement($religions),
            'suku' => $this->faker->randomElement($ethnicities),
            'jml_kakak' => $this->faker->numberBetween(0, 5),
            'jml_adik' => $this->faker->numberBetween(0, 5),
            'status_huni_rumah' => $this->faker->randomElement($housingStatus),
            'nama_sekolah' => 'SMA Negeri ' . $this->faker->numberBetween(1, 20) . ' ' . $this->faker->city(),
            'thn_lulus' => (string)$batch,
            'no_ijazah' => $this->faker->unique()->numerify('DN-##/D-SMK/##/####'),
            'akademik' => $this->faker->optional(0.7)->sentence(),
            'non_akademik' => $this->faker->optional(0.6)->sentence(),
            'olahraga' => $this->faker->optional(0.5)->randomElement(['Sepak Bola', 'Basket', 'Voli', 'Renang', 'Badminton', 'Tenis', 'Futsal']),
            'kesenian' => $this->faker->optional(0.5)->randomElement(['Musik', 'Tari', 'Lukis', 'Teater', 'Fotografi']),
            'nama_ayah' => $this->faker->name('male'),
            'agama_ayah' => $this->faker->randomElement($religions),
            'pekerjaan_ayah' => $this->faker->randomElement($occupations),
            'pendidikan_ayah' => $this->faker->randomElement($educations),
            'penghasilan_ayah' => $this->faker->randomElement($incomes),
            'nohp_ayah' => $this->faker->phoneNumber(),
            'nama_ibu' => $this->faker->name('female'),
            'agama_ibu' => $this->faker->randomElement($religions),
            'pekerjaan_ibu' => $this->faker->randomElement($occupations),
            'pendidikan_ibu' => $this->faker->randomElement($educations),
            'penghasilan_ibu' => $this->faker->randomElement($incomes),
            'nohp_ibu' => $this->faker->phoneNumber(),
            'alamat_orangtua' => $this->faker->address(),
            'daya_listrik' => $this->faker->randomElement($electricityPower),
            'nama_wali' => $this->faker->optional(0.3)->name(),
            'pekerjaan_wali' => $this->faker->optional(0.3)->randomElement($occupations),
            'penghasilan_wali' => $this->faker->optional(0.3)->randomElement($incomes),
            'pendidikan_wali' => $this->faker->optional(0.3)->randomElement($educations),
            'alamat_wali' => $this->faker->optional(0.3)->address(),
            'nohp_wali' => $this->faker->optional(0.3)->phoneNumber(),
            'kab_lahir' => $this->faker->city(),
            'prov_lahir' => $this->faker->state(),
            'kab_sekolah' => $this->faker->city(),
            'prov_sekolah' => $this->faker->state(),
            'thn_masuk' => (string)$batch,
            'jml_mapel' => (string)$this->faker->numberBetween(10, 15),
            'nilai' => (string)$this->faker->randomFloat(2, 75, 95),
            'tinggi' => (string)$this->faker->numberBetween(150, 190),
            'berat' => (string)$this->faker->numberBetween(45, 90),
            'tekanan_darah' => $this->faker->numberBetween(110, 130) . '/' . $this->faker->numberBetween(70, 90),
            'gol_darah' => $this->faker->randomElement($bloodTypes),
        ];
    }
}
