<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 10px; color: #1f2937; }
        h1 { font-size: 17px; margin-bottom: 4px; }
        .meta { color: #4b5563; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #d1d5db; padding: 7px; text-align: left; }
        th { background: #f3f4f6; }
    </style>
</head>
<body>
    <h1>{{ $judul }}</h1>
    <div class="meta">Tanggal cetak: {{ $tanggal_cetak }}</div>

    <table>
        <thead>
            <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Program Studi</th>
                <th>Email / Username</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($alumnis as $alumni)
                <tr>
                    <td>{{ $alumni->nim }}</td>
                    <td>{{ $alumni->nama_lengkap }}</td>
                    <td>{{ $alumni->programStudi->nama_prodi ?? '-' }}</td>
                    <td>{{ $alumni->user->username ?? $alumni->email_kontak }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
