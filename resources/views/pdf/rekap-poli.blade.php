<!DOCTYPE html>
<html>

<head>
    <title>Rekap Antrian Per Poli</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        }

        th,
        td {
            border: 1px solid #000;
            padding: 6px;
            text-align: center;
        }

        th {
            background: #f0f0f0;
        }
    </style>
</head>

<body>
    <h3>Rekap Antrian Per Poli - Tahun {{ $tahun }} ({{ $tahap ?? 'Semua Tahap' }})</h3>
    <table>
        <thead>
            <tr>
                <th>Bulan</th>
                @foreach($polis as $poli)
                <th>{{ $poli->nama }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach($rekap as $row)
            <tr>
                <td>{{ $row['bulan'] }}</td>
                @foreach($polis as $poli)
                <td>{{ $row['data'][$poli->nama] ?? 0 }}</td>
                @endforeach
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>