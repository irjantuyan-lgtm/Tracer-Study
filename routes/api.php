<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Import Auth Controller
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\PasswordResetController;

// Import Controllers dari folder Admin
use App\Http\Controllers\Api\Admin\ProgramStudiController;
use App\Http\Controllers\Api\Admin\DosenController;
use App\Http\Controllers\Api\Admin\AlumniManagementController; 
use App\Http\Controllers\Api\Admin\KuesionerController;
use App\Http\Controllers\Api\Admin\PeriodeTracerController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\ExportReportController;
use App\Http\Controllers\Api\Admin\PermohonanRevisiController; 
use App\Http\Controllers\Api\Admin\UserController;
use App\Http\Controllers\Api\Admin\AuditLogController; // <-- Tambahan Controller Audit Log

// Import Controllers dari folder Alumni
use App\Http\Controllers\Api\Alumni\ProfileController;
use App\Http\Controllers\Api\Alumni\KuesionerSubmissionController;
use App\Http\Controllers\Api\Alumni\PengajuanRevisiController;
use App\Http\Controllers\Api\Alumni\RiwayatPekerjaanController;

/*
|--------------------------------------------------------------------------
| 1. PUBLIC ROUTES (Tanpa Login)
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| 2. PROTECTED ROUTES (Wajib Login menggunakan Token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    
    // ==========================================
    // A. UMUM (Semua Role Bisa Akses)
    // ==========================================
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/ubah-password', [PasswordResetController::class, 'ubahPassword']);
    Route::get('/user', function (Request $request) {
        return $request->user()->load(['role', 'programStudi', 'dosen', 'alumni']);
    });


    // ==========================================
    // B. KHUSUS SUPERADMIN (Hak Akses Tertinggi)
    // ==========================================
    Route::middleware('role:Superadmin')->group(function () {
        Route::apiResource('users', UserController::class);
        Route::get('/audit-logs', [AuditLogController::class, 'index']);
    });


    // ==========================================
    // C. AREA ADMIN (Superadmin, Admin Fakultas, Admin Prodi)
    // ==========================================
    Route::middleware('role:Superadmin,Admin Fakultas,Admin Prodi')->group(function () {
        
        // --- Dashboard & Laporan ---
        Route::get('/dashboard/statistik', [DashboardController::class, 'index']);
        Route::get('/laporan/cetak-progres', [ExportReportController::class, 'cetakPdfProgres']);
        
        // --- Master Data ---
        Route::apiResource('program-studi', ProgramStudiController::class);
        Route::apiResource('dosen', DosenController::class);
        
        // --- Manajemen Alumni ---
        Route::post('/alumni/import-excel', [AlumniManagementController::class, 'importExcel']);
        Route::get('/alumni/cetak-akun', [AlumniManagementController::class, 'cetakAkunPdf']); // <-- Rute baru cetak PDF akun
        Route::apiResource('alumni', AlumniManagementController::class);
        // Catatan: Route tambah riwayat pekerjaan via admin sudah dihapus karena menyebabkan error sesuai hasil audit

        // --- Kuesioner & Manajemen Periode ---
        Route::post('/kuesioner/{instrumen_id}/import-soal', [KuesionerController::class, 'importSoalExcel']);
        Route::apiResource('periode', PeriodeTracerController::class);
        Route::post('/periode/{periode_id}/ubah-status', [PeriodeTracerController::class, 'ubahStatus']);

        // --- Permohonan Revisi Kuesioner ---
        Route::get('/permohonan-revisi', [PermohonanRevisiController::class, 'index']);
        Route::post('/permohonan-revisi/{id}/tinjau', [PermohonanRevisiController::class, 'tinjau']);
    });


    // ==========================================
    // D. KHUSUS ALUMNI 
    // ==========================================
    Route::middleware('role:Alumni')->group(function () {
        
        // Profil
        Route::get('/alumni/profil-saya', [ProfileController::class, 'show']);
        Route::post('/alumni/profil-saya/update', [ProfileController::class, 'update']);
        
        // Riwayat Pekerjaan
        Route::get('/alumni/pekerjaan', [RiwayatPekerjaanController::class, 'index']);
        Route::post('/alumni/pekerjaan', [RiwayatPekerjaanController::class, 'store']);
        Route::delete('/alumni/pekerjaan/{id}', [RiwayatPekerjaanController::class, 'destroy']);

        // Pengisian Kuesioner Tracer Study
        Route::get('/alumni/kuesioner/soal', [KuesionerSubmissionController::class, 'getSoal']);
        Route::post('/alumni/kuesioner/submit', [KuesionerSubmissionController::class, 'submitJawaban']);

        // Pengajuan Revisi Kuesioner
        Route::post('/alumni/kuesioner/ajukan-revisi', [PengajuanRevisiController::class, 'ajukanRevisi']);
    });
});