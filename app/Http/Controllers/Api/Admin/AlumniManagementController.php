<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel; 
use App\Imports\AlumniImport;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;

class AlumniManagementController extends Controller
{
  public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prodi_id' => 'required|exists:program_studi,id',
            'nim' => 'required|unique:alumni,nim',
            'nama_lengkap' => 'required|string|max:150',
            'tahun_lulus' => 'required|integer',
            'email' => 'required|email|unique:users,username',
            'foto_profil' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $authUser = Auth::user();
        if ($authUser && $authUser->role && $authUser->role->nama_role === 'Admin Prodi' && (int) $request->prodi_id !== (int) $authUser->prodi_id) {
            return response()->json(['message' => 'Anda hanya boleh menambah alumni pada program studi Anda sendiri'], 403);
        }

        // Memulai Transaksi Database
        DB::beginTransaction();

        try {
            $roleAlumni = Role::where('nama_role', 'Alumni')->firstOrFail();

            $user = User::create([
                'username' => $request->email,
                'password' => Hash::make($request->nim),
                'role_id' => $roleAlumni->id,
                'is_active' => true,
            ]);

            $data = $request->all();
            $data['user_id'] = $user->id;
            $data['email_kontak'] = $request->email;

            if ($request->hasFile('foto_profil')) {
                $path = $request->file('foto_profil')->store('profil_alumni', 'public');
                $data['foto_profil'] = $path;
            }

            $alumni = Alumni::create($data);

            // Jika semua berhasil, simpan permanen (Commit)
            DB::commit();

            if (class_exists('App\Models\AuditLog')) {
                \App\Models\AuditLog::catat('Menambah alumni', 'alumni', $alumni->id);
            }

            return response()->json([
                'status' => 'success', 
                'message' => 'Alumni berhasil ditambahkan dan Akun Login otomatis dibuat!', 
                'data' => $alumni
            ], 201);

        } catch (Exception $e) {
            // Jika ada yang gagal, batalkan semua (Rollback) agar tidak ada data parsial
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Terjadi kesalahan sistem saat menyimpan data',
                'error_detail' => $e->getMessage()
            ], 500);
        }
    }
   public function update(Request $request, $id)
    {
        // 1. Cari data alumni terlebih dahulu
        $alumni = Alumni::find($id);
        if (!$alumni) return response()->json(['message' => 'Data tidak ditemukan'], 404);

        $user = Auth::user();
        if ($user && $user->role && $user->role->nama_role === 'Admin Prodi' && $alumni->prodi_id != $user->prodi_id) {
            return response()->json(['message' => 'Anda tidak berhak mengubah alumni dari program studi lain'], 403);
        }

        // 2. Validasi input (perhatikan tambahan id agar tidak bentrok dengan data sendiri)
        $validator = Validator::make($request->all(), [
            'prodi_id' => 'exists:program_studi,id',
            'nim' => 'unique:alumni,nim,' . $alumni->id, // Boleh pakai NIM lama milik dia sendiri
            'nama_lengkap' => 'string|max:150',
            'tahun_lulus' => 'integer',
            'email' => 'email|unique:users,username,' . $alumni->user_id, // Cek keunikan email di tabel users
            'foto_profil' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $data = $request->all();

        // 3. Sinkronisasi Email: Jika Admin mengubah email, update juga username di tabel User
        if ($request->has('email')) {
            $user = User::find($alumni->user_id);
            if ($user) {
                $user->update(['username' => $request->email]);
            }
            // Sinkronkan ke kolom tabel alumni
            $data['email_kontak'] = $request->email;
        }

        // 4. Update foto jika ada upload baru
        if ($request->hasFile('foto_profil')) {
            $path = $request->file('foto_profil')->store('profil_alumni', 'public');
            $data['foto_profil'] = $path;
        }

        $alumni->update($data);

        \App\Models\AuditLog::catat('Mengubah data alumni', 'alumni', $alumni->id);
        
        return response()->json([
            'status' => 'success', 
            'message' => 'Data Alumni dan Akun Login berhasil diupdate', 
            'data' => $alumni
        ], 200);
    }

   public function destroy($id)
    {
        $alumni = Alumni::find($id);
        if (!$alumni) return response()->json(['message' => 'Data tidak ditemukan'], 404);

        $user = Auth::user();
        if ($user && $user->role && $user->role->nama_role === 'Admin Prodi' && $alumni->prodi_id != $user->prodi_id) {
            return response()->json(['message' => 'Anda tidak berhak menghapus alumni dari program studi lain'], 403);
        }

        // Simpan ID user sebelum alumni dihapus
        $userId = $alumni->user_id;

        // 1. Hapus biodata alumni
        $alumni->delete();

        // 2. Hapus juga akun login-nya agar tidak meninggalkan sampah di database
        if ($userId) {
            $user = User::find($userId);
            if ($user) {
                $user->delete();
            }
        }

        \App\Models\AuditLog::catat('Menghapus alumni', 'alumni', (int) $id);

        return response()->json([
            'status' => 'success', 
            'message' => 'Data Alumni beserta Akun Login berhasil dihapus secara permanen'
        ], 200);
    }

    // Fungsi untuk mencetak PDF Daftar Akun Alumni
    public function cetakAkunPdf()
    {
        // Ambil semua data alumni beserta data user-nya
        $alumnis = Alumni::with('user', 'programStudi')->get();

        $data = [
            'judul' => 'Daftar Akun Login Tracer Study Alumni',
            'tanggal_cetak' => now()->format('d F Y'),
            'alumnis' => $alumnis
        ];

        // Memanggil template tampilan PDF (file blade-nya akan kita buat nanti)
        $pdf = Pdf::loadView('laporan.akun_alumni_pdf', $data);

        return $pdf->download('Daftar_Akun_Alumni.pdf');
    }

    public function importExcel(Request $request)
    {
        // Validasi file yang diupload harus berupa excel/csv
        $validator = Validator::make($request->all(), [
            'file_excel' => 'required|mimes:xlsx,xls,csv|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $import = new AlumniImport;
            Excel::import($import, $request->file('file_excel'));

            return response()->json([
                'status' => 'success',
                'message' => 'Proses import alumni selesai.',
                'imported' => $import->getImportedCount(),
                'skipped' => $import->getSkippedCount()
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengimpor data. Pastikan format kolom Excel sesuai template.',
                'error_detail' => $e->getMessage()
            ], 500);
        }
    }

    // METHOD BARU: Untuk melihat detail satu orang alumni
    public function show($id)
    {
        $user = Auth::user();
        $query = Alumni::with(['programStudi', 'user']);

        if ($user && $user->role && $user->role->nama_role === 'Admin Prodi') {
            $query->where('prodi_id', $user->prodi_id);
        }

        $alumni = $query->find($id);
        
        if (!$alumni) {
            return response()->json(['message' => 'Data Alumni tidak ditemukan'], 404);
        }

        return response()->json([
            'status' => 'success', 
            'data' => $alumni
        ], 200);
    }

}