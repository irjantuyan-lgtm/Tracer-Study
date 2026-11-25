<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alumni;
use App\Models\PeriodeTracer;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Hitung Total Seluruh Alumni
        $totalAlumni = Alumni::count();

        // 2. Cek Periode Tracer yang sedang Aktif
        $periodeAktif = PeriodeTracer::where('status', 'Aktif')->first();

        $sudahMengisi = 0;
        $belumMengisi = $totalAlumni;

        if ($periodeAktif) {
            // Menghitung alumni yang sudah submit kuesioner di periode aktif
            // Asumsi: Tabel 'respons' menyimpan 'alumni_id' dan 'periode_id'
            $sudahMengisi = DB::table('respons')
                ->where('periode_id', $periodeAktif->id)
                ->distinct('alumni_id')
                ->where('status_pengisian', 'Terkirim')
                ->count('alumni_id');
                
            $belumMengisi = $totalAlumni - $sudahMengisi;
        }

        return response()->json([
            'status' => 'success',
            'data' => [
                'periode_aktif' => $periodeAktif ? $periodeAktif->nama_periode : 'Tidak ada periode aktif',
                'statistik_partisipasi' => [
                    'total_alumni' => $totalAlumni,
                    'sudah_mengisi' => $sudahMengisi,
                    'belum_mengisi' => $belumMengisi,
                    // Persentase untuk kebutuhan grafik pie/bar di frontend
                    'persentase_selesai' => $totalAlumni > 0 ? round(($sudahMengisi / $totalAlumni) * 100, 1) : 0
                ]
            ]
        ], 200);
    }
}