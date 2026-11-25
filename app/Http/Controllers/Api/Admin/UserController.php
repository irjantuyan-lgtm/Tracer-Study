<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\AuditLog;

class UserController extends Controller
{
    public function index()
    {
        // Menampilkan semua user beserta nama role-nya
        $users = User::with('role')->get();
        return response()->json(['status' => 'success', 'data' => $users], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users,username',
            'password' => 'required|min:6',
            'role_id' => 'required|exists:roles,id',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $data = $request->all();
        $data['password'] = Hash::make($request->password); // Enkripsi password

        $user = User::create($data);
        AuditLog::catat('Menambah user', 'users', $user->id);
        return response()->json(['status' => 'success', 'message' => 'User berhasil dibuat', 'data' => $user], 201);
    }

    public function show($id)
    {
        $user = User::with('role')->find($id);
        if (!$user) return response()->json(['message' => 'User tidak ditemukan'], 404);
        return response()->json(['status' => 'success', 'data' => $user], 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'User tidak ditemukan'], 404);

        $validator = Validator::make($request->all(), [
            'username' => 'unique:users,username,' . $id,
            'password' => 'nullable|min:6',
            'role_id' => 'exists:roles,id',
            'is_active' => 'boolean'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $data = $request->all();
        // Jika password diisi, berarti mau ganti password. Jika kosong, abaikan.
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        } else {
            unset($data['password']);
        }

        $user->update($data);
        AuditLog::catat('Mengubah user', 'users', $user->id);
        return response()->json(['status' => 'success', 'message' => 'Data User berhasil diupdate', 'data' => $user], 200);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) return response()->json(['message' => 'User tidak ditemukan'], 404);

        // Mencegah admin menghapus dirinya sendiri
        if (Auth::id() == $id) {
            return response()->json(['status' => 'error', 'message' => 'Anda tidak bisa menghapus akun Anda sendiri!'], 403);
        }

        $user->delete();
        AuditLog::catat('Menghapus user', 'users', (int) $id);
        return response()->json(['status' => 'success', 'message' => 'User berhasil dihapus'], 200);
    }
}