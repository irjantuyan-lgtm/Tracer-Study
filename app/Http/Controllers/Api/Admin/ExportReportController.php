<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PeriodeTracer;
use App\Models\Alumni;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Auth;

class ExportReportController extends Controller
{
    public function cetakPdfProgres()
    {
        $user = Auth::user();
        $isAdminProdi = $user && $user->role && $user->role->nama_role === 'Admin Prodi';

        $periodeQuery = PeriodeTracer::where('status', 'Aktif');
        $alumniQuery = Alumni::query();

        if ($isAdminProdi) {
            $periodeQuery->where('prodi_id', $user->prodi_id);
            $alumniQuery->where('prodi_id', $user->prodi_id);
        }

        $periodeAktif = $periodeQuery->first();
        if (!$periodeAktif) {
            return response()->json(['message' => 'Tidak ada periode aktif saat ini'], 404);
        }

        // 2. Hitung statistik (Pastikan filter hanya yang statusnya "Terkirim")
        $totalAlumni = $alumniQuery->count();
        $alumniSudahIsi = $alumniQuery->whereHas('respons', function ($query) use ($periodeAktif) {
            $query->where('periode_id', $periodeAktif->id)
                  ->where('status_pengisian', 'Terkirim'); // Sinkron dengan Dashboard
        })->count();

        $alumniBelumIsi = $totalAlumni - $alumniSudahIsi;
        $persentase = $totalAlumni > 0 ? round(($alumniSudahIsi / $totalAlumni) * 100, 2) : 0;

        // 3. Siapkan data untuk dikirim ke template PDF
        $data = [
            'judul' => 'Laporan Progres Tracer Study',
            'periode' => $periodeAktif->nama_periode,
            'tanggal_cetak' => now()->format('d F Y'),
            'total_alumni' => $totalAlumni,
            'sudah_isi' => $alumniSudahIsi,
            'belum_isi' => $alumniBelumIsi,
            'persentase' => $persentase,
        ];

        // 4. Panggil view PDF
        $pdf = Pdf::loadView('laporan.progres_pdf', $data);

        return $pdf->download('Laporan_Progres_Tracer_Study.pdf');
    }
}