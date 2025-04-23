<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Biodata Mahasiswa</title>
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

        @page {
            size: A4;
            margin: 11mm 17mm 17mm 17mm;

            @top-center {
                content: element(header)
            }
        }

        @media print {
            header {
                display: block;
                text-align: center;
                position: running(header);
            }

            /* header {
                position: fixed;
                top: 0;
                width: 100%;
            }

            .content {
                page-break-inside: avoid;
                margin-top: 190px;
            } */

            html,
            body {
                width: 210mm;
                height: 297mm;
            }
        }

        .content {
            padding: 0 1cm;
        }

        table {
            width: 100%;
        }

        table td {
            padding: 5px 5px;
        }

        .title {
            text-align: center;
        }
    </style>
</head>

<body>
    @foreach ($selectedUsers as $user)
        <p style="page-break-before: always">
        <div class="print">
            <header class="">
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
            <section class="content">
                <div class="title">
                    <u>DATA MAHASISWA BARU TAHUN 2024/2025</u>
                </div>
                <div>
                    <table>
                        <tr>
                            <td width="1%">1. </td>
                            <td nowrap width="30%">Nama Lengkap <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['name'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">2. </td>
                            <td nowrap>No. Induk Mahasiswa <span class="float-right">:</span></td>
                            <td nowrap style="text-transform: uppercase;">{{ $user['username'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">3. </td>
                            <td nowrap>Jalur Masuk <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['jalur_penerimaan'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">4. </td>
                            <td nowrap>Tempat, Tanggal Lahir <span class="float-right">:</span></td>
                            <td nowrap>
                                {{ $user['student']['tmp_lahir'] ?? null }},
                                - {{ $user['student']['tgl_lahir'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">5. </td>
                            <td nowrap>Jenis Kelamin <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['jk'] ?? ' ' }}</td>
                        </tr>
                        <tr>
                            <td width="1%">6. </td>
                            <td nowrap>Jumlah Saudara <span class="float-right">:</span></td>
                            <td nowrap>
                                {{ !empty($user['student']['jml_kakak']) ? $user['student']['jml_kakak'] + $user['student']['jml_adik'] . ' Orang' : '' }}
                            </td>
                        </tr>
                        <tr>
                            <td width="1%">7. </td>
                            <td nowrap>Status rumah yang dihuni <span class="float-right">:</span></td>
                            <td nowrap>Rumah {{ $user['student']['status_huni_rumah'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Alamat <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['alamat'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">8. </td>
                            <td nowrap>No HP <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['nohp'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">9. </td>
                            <td nowrap>Asal Sekolah (SMA)<span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['nama_sekolah'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Lulus Tahun <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['thn_lulus'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>No. Ijazah <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['no_ijazah'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">10. </td>
                            <td nowrap>Agama <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['agama'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">11. </td>
                            <td nowrap>Suku <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['suku'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">12. </td>
                            <td nowrap>Email <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['email'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">13. </td>
                            <td nowrap>Program Pilihan <span class="float-right">:</span></td>
                            <td nowrap></td>
                        </tr>
                        <tr>
                            <td width="1%">14. </td>
                            <td nowrap>Prestasi (SMA)</td>
                            <td nowrap></td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>- Akademik <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['akademik'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>- Non Akademik <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['non_akademik'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">15. </td>
                            <td nowrap>Bakat dan Minat</td>
                            <td nowrap></td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>a. Olah Raga <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['olahraga'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>b. Kesenian <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['kesenian'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">16. </td>
                            <td nowrap>Nama Ayah <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['nama_ayah'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Agama <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['agama_ayah'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Pekerjaan <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['pekerjaan_ayah'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Pendidikan Terakhir <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['pendidikan_ayah'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Penghasilan Perbulan <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['penghasilan_ayah'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>No. HP <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['nohp_ayah'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">17. </td>
                            <td nowrap>Nama Ibu <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['nama_ibu'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Agama <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['agama_ibu'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Pekerjaan <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['pekerjaan_ibu'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Pendidikan Terakhir <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['pendidikan_ibu'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Penghasilan Perbulan <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['penghasilan_ibu'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>No. HP <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['nohp_ibu'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">18.</td>
                            <td nowrap>Alamat Orang Tua <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['alamat_orangtua'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">19.</td>
                            <td nowrap>Daya Listrik Rumah Orang Tua <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['daya_listrik'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%">20.</td>
                            <td nowrap>Nama Wali <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['nama_wali'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Pekerjaan <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['perkejaan_wali'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Penghasilan Perbulan <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['penghasilan_wali'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Pendidikan Terakhir <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['pendidikan_wali'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>Alamat <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['alamat_wali'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td width="1%"></td>
                            <td nowrap>No. HP <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['nohp_wali'] ?? null }}</td>
                        </tr>
                    </table>

                    <br>

                    <table width="100%">
                        <tr>
                            <td nowrap>
                                <span>Mengetahui :<br>
                                    <span>a.n. Dekan</span><br>
                                    <span>Wakil Dekan Bid. Akademik & Kemahasiswaan</span>

                                    <br><br><br><br>
                                    <span><b>dr. Agussalim Bukhari, M. Clin. Med. Ph.D.,Sp.GK(K)</b></span> <br>
                                    <span>NIP: 197008211999031001</span>
                            </td>
                            <td nowrap width="1%">
                                <span>Makassar, 03 September 2024</span><br>
                                <br>
                                <span>Mahasiswa ybs,</span>

                                <br><br><br><br>
                                <span><b>{{ $user['name'] ?? null }}</b></span> <br>
                                <span>NIM: {{ $user['username'] ?? null }}</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </section>
        </div>
    @endforeach





    <script type="text/javascript">
        window.print();
        setInterval(() => {
            window.close()
        }, 3000);
    </script>
</body>

</html>
