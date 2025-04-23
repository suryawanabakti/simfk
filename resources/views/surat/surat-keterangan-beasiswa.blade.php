<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Surat Pernyataan Tidak Menerima Beasiswa</title>
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

        table th,
        td {
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
                    <p style="margin-bottom: -8px"><u> SURAT PERNYATAAN TIDAK MENERIMA BEASISWA </u></p>
                    <p>NO. <span id="no_surat"></span>/UN4.6.1/KM.00.00/{{ now('Asia/Makassar')->format('Y') }}</p>
                </div>
                <br>
                <div>
                    <p>
                        Saya yang bertanda tangan dibawah ini :
                    </p>
                    <table class="mb-3">
                        <tr>
                            <th width="20%">Nama <span class="float-right">:</span></th>
                            <td><?= $user['name'] ?></td>
                        </tr>
                        <tr>
                            <th>NIM <span class="float-right">:</span></th>
                            <td style="text-transform: uppercase;"><?= $user['username'] ?></td>
                        </tr>
                        <tr>
                            <th>Tempat/Tgl Lahir <span class="float-right">:</span></th>
                            <td style="text-transform: uppercase;"><?= $user['student']['tmp_lahir'] ?> /
                                <?= $user['student']['tgl_lahir'] ?></td>
                        </tr>
                        <tr>
                            <th>Fakultas <span class="float-right">:</span></th>
                            <td style="text-transform: uppercase;">Fakultas Kedokteran</td>
                        </tr>
                        <tr>
                            <th>Semester <span class="float-right">:</span></th>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <th>Tahun Akademik <span class="float-right">:</span></th>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <th>Alamat <span class="float-right">:<span></th>
                            <td><?= $user['student']['alamat'] ?></td>
                        </tr>
                    </table>
                    <p>
                    <ol>
                        <li>Menyatakan bahwa saya tidak sedang dalam mengajukan permohonan/menerima beasiswa baik dari
                            pemerintah maupun swasta</li>
                        <li>Menyatakan bahwa bilamana dikemudian hari saya terbukti menerima beasiswa lebih dari satu
                            (dobel)
                            maka saya bersedia dibatalkan beasiswa
                            yang sedang saya terima termasuk uang beasiswa yang saya terima.</li>
                    </ol>
                    </p>
                    <p>
                        Demikian pernyataan ini saya buat dengan sesungguhnya tanpa ada paksaan dari luar.
                    </p>

                    <br><br>
                    <table>
                        <tr>
                            <td nowrap width="1%" class="text-center">
                                <span>Makassar, {{ now('Asia/Makassar')->format('d F Y') }}</span><br>
                                <span>Diketahui </span><br>
                                <span>Wakil Dekan Bid. Akademik & Kemahasiswaan</span>

                                <br><br><br><br>
                                <span><b>dr. Agussalim Bukhari, M. Clin. Med. Ph.D.,Sp.GK(K)</b></span> <br>
                                <span>NIP. 197008211999031001</span>
                            </td>
                            <td></td>
                            <td nowrap width="1%" class="text-center">
                                <span></span><br>
                                <span>Yang membuat pernyataan</span><br>
                                <span></span>

                                <br><br><br><br>
                                <span><b><?= $user['name'] ?></b></span> <br>
                                <span></span>
                            </td>
                        </tr>
                    </table>
                </div>
            </section>
        </div>
    @endforeach
    @include('surat._script')
</body>

</html>
