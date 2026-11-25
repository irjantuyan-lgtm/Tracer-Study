<?php

namespace App\Http\Controllers\Api\Auth; 

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    // Fungsi untuk Login (Bisa pakai Username atau NIM)
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'login_id' => 'required|string', // Bisa berisi username atau NIM
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $loginId = $request->login_id;

        // 1. Cari user berdasarkan username di tabel users
        $user = User::where('username', $loginId)->with('role')->first();

        // 2. Jika tidak ketemu di users, cari berdasarkan NIM di tabel alumni
        if (!$user) {
            $user = User::whereHas('alumni', function($query) use ($loginId) {
                $query->where('nim', $loginId);
            })->with('role')->first();
        }

        // Jika tetap tidak ketemu, atau password salah
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Username/NIM atau Password salah!'
            ], 401);
        }

        if (!$user->is_active) {
            return response()->json(['status' => 'error', 'message' => 'Akun dinonaktifkan.'], 403);
        }

        // Buat Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil!',
            'data' => [
                'user' => $user, 
                'access_token' => $token,
                'token_type' => 'Bearer'
            ]
        ], 200);
    }

    // Fungsi untuk Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logout berhasil!'
        ], 200);
    }
}