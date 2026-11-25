<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class PasswordResetController extends Controller
{
    // Fungsi untuk user mengganti passwordnya sendiri saat sedang login
    public function ubahPassword(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'password_lama' => 'required|string',
            'password_baru' => 'required|string|min:6|confirmed', // 'confirmed' berarti wajib ada input 'password_baru_confirmation' di frontend
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

       /** @var \App\Models\User $user */
        $user = Auth::user();

        // Cek apakah password lama yang dimasukkan benar
        if (!Hash::check($request->password_lama, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Password lama yang Anda masukkan salah!'
            ], 400);
        }

        // Jika benar, update dengan password baru
        $user->update([
            'password' => Hash::make($request->password_baru)
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Password berhasil diperbarui! Silakan gunakan password baru pada login berikutnya.'
        ], 200);
    }
}