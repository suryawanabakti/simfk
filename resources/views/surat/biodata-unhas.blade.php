<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Biodata Mahasiswa </title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <style>
        body {
            font-family: "Times New Roman", Times, serif;
            color: black;
            font-size: 20px;
            margin: auto 1cm;
        }

        header {
            font-size: 20px;
        }

        header hr {
            border: 0;
            height: 2px;
            border-top: solid black 0.5px;
            border-bottom: solid black 3px;
        }

        .content table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid black;
            padding: 0 5px;
        }

        td {
            line-height: 25px;
        }
    </style>
</head>

<body>
    @foreach ($selectedUsers as $user)
        <p style="page-break-before: always">
        <div class="print">
            <header class="text-center">
                <img src="/assets/images/logo-mono.png" alt="Univ. Hasanuddin" class="float-left"
                    style="height: 100px; position: relative; top: 20px">
                <h4 class="mb-0">
                    KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET DAN TEKNOLOGI <br>
                    UNIVERSITAS HASANUDDIN <br>
                    <b>FAKULTAS KEDOKTERAN</b>
                </h4>
                <p style="margin-bottom: -8px">
                    Jl. Perintis Kemerdekaan Kampus Tamalanrea Km. 10 Makassar 90245
                </p>
                <p>
                    Telp. ( 0411 ) 586010, 585836, 586200 Psw. 2767 Fax. (0411) 586297 email:fkunhas@med.unhas.ac.id
                </p>
                <hr>
            </header>
            <div class="content">
                <p class="text-center">
                    <b>Data Mahasiswa Baru Tahun Akademik 2024/2025</b>
                </p>
                <table class="mb-2">
                    <tr class="bg-warning">
                        <th colspan="3">A. Data Pribadi</th>
                    </tr>
                    <tr>
                        <td width="40%">NIM</td>
                        <td style="text-transform: uppercase;">{{ $user['username'] ?? null }}</td>
                        <td width="1%" rowspan="8">
                            <img src="/storage/{{ $user['photo'] ?? null }}" height="190px">
                        </td>
                    </tr>
                    <tr>
                        <td nowrap>Nama Lengkap</td>
                        <td>{{ $user['name'] ?? null }}</td>
                    </tr>
                    <tr>
                        <td nowrap>No. Test/Peserta</td>
                        <td>{{ $user['student']['no_test'] ?? null }}</td>
                    </tr>
                    <tr>
                        <td nowrap>Jalur Penerimaan</td>
                        <td>{{ $user['student']['jalur_penerimaan'] ?? null }}</td>
                    </tr>
                    <tr>
                        <td nowrap>Program Studi</td>
                        <td>{{ $user['student']['prodi'] ?? null }}</td>
                    </tr>
                    <tr>
                        <td nowrap>Tempat, Tanggal Lahir</td>
                        <td>
                            {{ $user['student']['tmp_lahir'] ?? null }} -,
                            - {{ $user['student']['tgl_lahir'] ?? null }} </td>
                    </tr>
                    <tr>
                        <td nowrap>Kabupaten, Provinsi Tempat Lahir</td>
                        <td>{{ $user['student']['kab_lahir'] ?? null }}, {{ $user['student']['prov_lahir'] ?? null }}
                        </td>
                    </tr>
                    <tr>
                        <td nowrap>Jenis Kelamin</td>
                        <td>{{ $user['student']['jk'] ?? null }}</td>
                    </tr>
                    <tr>
                        <td nowrap>Alamat</td>
                        <td colspan="2">{{ $user['student']['alamat'] ?? null }}</td>
                    </tr>

                    <tr>
                        <td nowrap>No. Telp</td>
                        <td colspan="2">
                            <span class="d-inline-block mr-5">
                            </span>
                            <span class="d-inline-block mr-5">
                                No. HP : {{ $user['student']['nohp'] ?? null }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td nowrap>Kewarganegaraan</td>
                        <td colspan="2">{{ $user['student']['kewarnegaraan'] ?? null }}</td>
                    </tr>
                    <tr>
                        <td nowrap>Jumlah Saudara</td>
                        <td colspan="2">
                            <span class="d-inline-block mr-5">
                                Kakak : {{ $user['student']['jml_kakak'] ?? null }}</span>
                            <span class="d-inline-block mr-5">
                                Adik : {{ $user['student']['jml_adik'] ?? null }}</span>
                        </td>
                    </tr>

                    <tr class="bg-warning">
                        <th colspan="3">B. Data Orang Tua</th>
                    </tr>
                    <tr>
                        <td nowrap>Nama Ayah / Ibu</td>
                        <td colspan="2"> {{ $user['student']['nama_ayah'] ?? null }}
                            / {{ $user['student']['nama_ibu'] ?? null }} </td>
                    </tr>
                    <tr>
                        <td nowrap>No. Telp / Hp. Orang Tua</td>
                        <td colspan="2"></td>
                    </tr>
                    <tr>
                        <td nowrap>Pendidikan Orang Tua</td>
                        <td colspan="2">
                            <span class="d-inline-block mr-5">
                                Ayah : {{ $user['student']['pendidikan_ayah'] ?? null }}</span>
                            <span class="d-inline-block mr-5">
                                Ibu : {{ $user['student']['pendidikan_ibu'] ?? null }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td nowrap>Pekerjaan Orang Tua</td>
                        <td colspan="2">
                            <span class="d-inline-block mr-5">
                                Ayah : {{ $user['student']['pekerjaan_ayah'] ?? null }}</span>
                            <span class="d-inline-block mr-5">
                                Ibu : {{ $user['student']['pekerjaan_ibu'] ?? null }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td nowrap>Alamat Orang Tua</td>
                        <td colspan="2">{{ $user['student']['alamat_orangtua'] ?? null }}</td>
                    </tr>
                    <tr>
                        <td nowrap>Penghasilan Total Orang Tua per Bulan</td>
                        <td colspan="2">
                            Rp. {{ $user['student']['penghasilan_ayah'] ?? null }},-
                        </td>
                    </tr>

                    <tr class="bg-warning">
                        <th colspan="3">C. Data Pendidikan SLTA</th>
                    </tr>
                    <tr>
                        <td nowrap>Kabupaten, Provinsi SLTA</td>
                        <td colspan="2">{{ $user['student']['kab_sekolah'] ?? null }},
                            {{ $user['student']['prov_sekolah'] ?? null }}</td>
                    </tr>
                    <tr>
                        <td nowrap>Nama SLTA</td>
                        <td colspan="2">{{ $user['student']['nama_sekolah'] ?? null }}</td>
                    </tr>
                    <tr>
                        <td nowrap>Jurusan SLTA</td>
                        <td colspan="2"></td>
                    </tr>
                    <tr>
                        <td nowrap>Tahun Masuk SLTA</td>
                        <td colspan="2">
                            <span class="d-inline-block mr-5">
                                {{ $user['student']['thn_masuk'] ?? null }}
                            </span>
                            <span class="d-inline-block mr-5">
                                Tahun Lulus : {{ $user['student']['thn_lulus'] ?? null }}</span>
                        </td>
                    </tr>
                    <tr>
                        <td nowrap>Ujian Nasional</td>
                        <td colspan="2">
                            <span class="d-inline-block mr-5">
                                Jumlah Mata Pelajaran : {{ $user['student']['jml_mapel'] ?? null }}</span>
                            <span class="d-inline-block mr-5">
                                Total Nilai : {{ $user['student']['nilai'] ?? null }}</span>
                        </td>
                    </tr>

                    <tr class="bg-warning">
                        <th colspan="3">D. Hasil Pemeriksaan Kesehatan</th>
                    </tr>
                    <tr>
                        <td nowrap>Tinggi Badan / Berat Badan</td>
                        <td colspan="2">
                            {{ $user['student']['tinggi'] ?? null }}/{{ $user['student']['berat'] ?? null }}</td>
                    </tr>
                    <tr>
                        <td nowrap>Tekanan Darah</td>
                        <td colspan="2">{{ $user['student']['tekanan_darah'] ?? null }}</td>
                    </tr>
                    <tr>
                        <td nowrap>Golongan Darah</td>
                        <td colspan="2">{{ $user['student']['gol_darah'] ?? null }}</td>
                    </tr>

                    <tr>
                        <td colspan="3" class="text-center">
                            DENGAN INI SAYA MENYATAKAN BAHWA DATA YANG SAYA ISIKAN DALAM BORANG PENDAFTARAN
                            ELEKTRONIK INI ADALAH BENAR. SAYA BERSEDIA MENERIMA SANKSI PEMBATALAN SEBAGAI MAHASISWA
                            UNIVERSITAS HASANUDDIN APABILA MELANGGAR PERNYATAAN INI
                        </td>
                    </tr>

                    <tr>
                        <td colspan="3" class="text-center py-3">
                            Makassar, {{ now('Asia/Makassar')->format('d F Y') }} <br>
                            Mahasiswa
                            <br>
                            <br>
                            <br>
                            <br>
                            {{ $user['name'] ?? null }}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    @endforeach

    <script type="text/javascript">
        window.print();
    </script>
</body>

</html>
