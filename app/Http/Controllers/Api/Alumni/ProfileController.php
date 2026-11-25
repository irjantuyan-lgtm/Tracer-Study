<?php

namespace App\Http\Controllers\Api\Alumni;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alumni;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    // Melihat Profil Sendiri
    public function show()
    {
        $user = Auth::user();
        // Tarik data alumni berdasarkan user_id yang sedang login, sekalian bawa data prodi dan riwayat pekerjaannya
        $alumni = Alumni::where('user_id', $user->id)->with(['programStudi', 'riwayatPekerjaan'])->first();

        if (!$alumni) {
            return response()->json(['status' => 'error', 'message' => 'Data profil alumni tidak ditemukan'], 404);
        }

        return response()->json(['status' => 'success', 'data' => $alumni], 200);
    }

    // Update Profil Sendiri (Termasuk Foto dan Sosmed)
    public function update(Request $request)
    {
        $user = Auth::user();
        $alumni = Alumni::where('user_id', $user->id)->first();

        if (!$alumni) {
            return response()->json(['status' => 'error', 'message' => 'Data profil alumni tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nama_lengkap' => 'nullable|string|max:150',
            'email_kontak' => 'nullable|email|max:100',
            'no_telepon' => 'nullable|string|max:20',
            'foto_profil' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'akun_ig' => 'nullable|string|max:100',
            'akun_tiktok' => 'nullable|string|max:100',
            'akun_linkedin' => 'nullable|string|max:150',
            'is_lanjut_studi' => 'nullable|boolean',
            'detail_lanjut_studi' => 'nullable|string'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $data = $request->except(['foto_profil']);

        // Logika Ganti Foto Profil
        if ($request->hasFile('foto_profil')) {
            // Hapus foto lama jika ada
            if ($alumni->foto_profil) {
                Storage::disk('public')->delete($alumni->foto_profil);
            }
            // Simpan foto baru
            $path = $request->file('foto_profil')->store('profil_alumni', 'public');
            $data['foto_profil'] = $path;
        }

        $alumni->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Profil berhasil diperbarui',
            'data' => $alumni
        ], 200);
    }
}