<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; color: #1f2937; }
        h1 { font-size: 18px; margin-bottom: 4px; }
        .meta { color: #4b5563; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #d1d5db; padding: 10px; text-align: left; }
        th { background: #f3f4f6; }
        .percent { font-size: 16px; font-weight: bold; }
    </style>
</head>
<body>
    <h1>{{ $judul }}</h1>
    <div class="meta">
        Periode: {{ $periode }}<br>
        Tanggal cetak: {{ $tanggal_cetak }}
    </div>

    <table>
        <thead>
            <tr>
                <th>Keterangan</th>
                <th>Jumlah</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Total Alumni</td>
                <td>{{ $total_alumni }}</td>
            </tr>
            <tr>
                <td>Sudah Mengisi</td>
                <td>{{ $sudah_isi }}</td>
            </tr>
            <tr>
                <td>Belum Mengisi</td>
                <td>{{ $belum_isi }}</td>
            </tr>
        </tbody>
    </table>

    <p class="percent">Tingkat partisipasi: {{ $persentase }}%</p>
</body>
</html>
