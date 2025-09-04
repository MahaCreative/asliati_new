<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Laporan Antrian</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            border: 1px solid #000;
            padding: 6px;
            text-align: left;
        }

        th {
            background: #f2f2f2;
        }
    </style>
</head>

<body>
    <h2>Laporan Antrian</h2>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Kode Antrian</th>
                <th>Pasien</th>
                <th>Tahap</th>
                <th>Poli</th>
                <th>Dokter</th>
                <th>Status</th>
                <th>Tanggal Dibuat</th>
            </tr>
        </thead>
        <tbody>
            @foreach($antrians as $i => $a)
            <tr>
                <td>{{ $i+1 }}</td>
                <td>{{ $a->kode_antrian }}</td>
                <td>{{ $a->pasien->nama_lengkap ?? '-' }}</td>
                <td>{{ ucfirst($a->tahap) }}</td>
                <td>{{ $a->poli->nama ?? '-' }}</td>
                <td>{{ $a->dokter->user->name ?? '-' }}</td>
                <td>{{ ucfirst($a->status) }}</td>
                <td>{{ $a->created_at->format('d-m-Y H:i') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>