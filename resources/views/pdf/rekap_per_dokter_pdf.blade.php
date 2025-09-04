<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Rekap Per Dokter - {{ $tahun }}</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
        }

        th,
        td {
            border: 1px solid #333;
            padding: 6px;
            text-align: center;
        }

        th {
            background: #f3f4f6;
        }

        h3 {
            text-align: center;
        }

        .meta {
            margin-top: 6px;
            margin-bottom: 6px;
            text-align: center;
        }
    </style>
</head>

<body>
    <h3>Rekap Antrian per Dokter - Tahun {{ $tahun }}</h3>
    <div class="meta">Tahap: {{ $tahap ?? 'Semua' }}</div>

    <table>
        <thead>
            <tr>
                <th>Bulan</th>
                @foreach($dokters as $dok)
                <th>{{ $dok->user->name ?? '—' }}</th>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach($rekap as $row)
            <tr>
                <td>{{ $row['bulan'] }}</td>
                @foreach($dokters as $dok)
                <td>{{ $row[$dok->id] ?? 0 }}</td>
                @endforeach
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>