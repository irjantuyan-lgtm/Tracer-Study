<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alumni;
use App\Models\PeriodeTracer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $isAdminProdi = $user && $user->role && $user->role->nama_role === 'Admin Prodi';

        $alumniQuery = Alumni::query();
        $periodeQuery = PeriodeTracer::where('status', 'Aktif');

        if ($isAdminProdi) {
            $alumniQuery->where('prodi_id', $user->prodi_id);
            $periodeQuery->where('prodi_id', $user->prodi_id);
        }

        $totalAlumni = $alumniQuery->count();
        $periodeAktif = $periodeQuery->first();

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