<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Surat Keterangan Aktif Kuliah</title>
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

        .footer {
            position: fixed;
            width: 100%;
            z-index: 10000;
            bottom: 80px;
            padding-right: 120px;
        }

        .content {
            padding: 0 1cm;
        }

        table {
            width: 100%;
        }

        table td {
            padding: 0 5px;
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
            @include('surat.header')

            <section class="content">
                <div class="title">
                    <p style="margin-bottom: -8px"><u>SURAT KETERANGAN AKTIF KULIAH</u></p>
                    <p>NO. <span id="no_surat"></span>/UN4.6.1/KM.00.00/{{ now('Asia/Makassar')->format('Y') }}</p>
                </div>
                <div>
                    <table>
                        <tr>
                            <td colspan="2" class="py-3">Yang bertanda tangan dibawah ini,</td>
                        </tr>
                        <tr>
                            <td nowrap width="30%">Nama <span class="float-right">:</span></td>
                            <td nowrap>dr. Agussalim Bukhari, M. Clin. Med. Ph.D.,Sp.GK(K)</td>
                        </tr>
                        <tr>
                            <td nowrap>NIP <span class="float-right">:</span></td>
                            <td nowrap>197008211999031001</td>
                        </tr>
                        <tr>
                            <td nowrap>Pangkat / Golongan <span class="float-right">:</span></td>
                            <td nowrap>Pembina / IVa</td>
                        </tr>
                        <tr>
                            <td nowrap>Jabatan <span class="float-right">:</span></td>
                            <td nowrap>Wakil Dekan Bid. Akademik & Kemahasiswaan</td>
                        </tr>
                        <tr>
                            <td nowrap>Instansi <span class="float-right">:</span></td>
                            <td nowrap>Fakultas Kedokteran Unhas</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="py-3">dengan ini menerangkat bahwa,</td>
                        </tr>
                        <tr>
                            <td nowrap>Nama <span class="float-right">:</span></td>
                            <td nowrap>{{ $user['name'] }}</td>
                        </tr>
                        <tr>
                            <td nowrap>Nomor Pokok <span class="float-right">:</span></td>
                            <td nowrap style="text-transform: uppercase;">{{ $user['username'] }}</td>
                        </tr>
                        <tr>
                            <td nowrap>Pada Fakultas / Universitas <span class="float-right">:</span></td>
                            <td nowrap>Kedokteran Universitas Hasanuddin</td>
                        </tr>
                        <tr>
                            <td nowrap>Program Studi<span class="float-right">:</span></td>
                            <td nowrap>{{ $user['student']['prodi'] ?? null }}</td>
                        </tr>
                        <tr>
                            <td nowrap>Semester/Tingkat <span class="float-right">:</span></td>
                            <td nowrap></td>
                        </tr>
                        <tr>
                            <td nowrap>Pada Tahun Ajaran <span class="float-right">:</span></td>
                            <td nowrap></td>
                        </tr>
                        <tr>
                            <td colspan="2" class="py-3">dan bahwa ayah / ibu / wali anak tersebut adalah</td>
                        </tr>
                        <tr>
                            <td nowrap>Nama <span class="float-right">:</span></td>
                            <td nowrap class="text-capitalize"></td>
                        </tr>
                        <tr>
                            <td nowrap>NIP / NRP <span class="float-right">:</span></td>
                            <td nowrap></td>
                        </tr>
                        <tr>
                            <td nowrap>Pangkat / Golongan <span class="float-right">:</span></td>
                            <td nowrap></td>
                        </tr>
                        <tr>
                            <td nowrap>Instansi <span class="float-right">:</span></td>
                            <td nowrap></td>
                        </tr>
                    </table>

                    <br>
                    <p>
                        Demikian surat keterangan masih kuliah ini kami berikan untuk digunakan sebagaimana mestinya.
                    </p>

                    <table>
                        <tr>
                            <td></td>
                            <td nowrap width="1%">
                                <span>Makassar, </span><br>
                                <span>a.n. Dekan</span><br>
                                <span>Wakil Dekan Bidang <br> Akademik & Kemahasiswaan</span>

                                <br><br><br><br>
                                <span><b>dr. Agussalim Bukhari, M. Clin. Med. Ph.D.,Sp.GK(K)</b></span> <br>
                                <span>NIP. 197008211999031001</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </section>

            <div class="footer">
                <img src="../assets/images/iso-kan.png" height="120" width="140" align="right">
            </div>
        </div>
    @endforeach


    @include('surat._script')
</body>

</html>
