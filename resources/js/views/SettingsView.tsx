import React, { useState } from 'react';
import { User, PeriodeTracer } from '../types';
import { Header } from '../components/layout';
import { Card, Button, Input, Modal, Badge } from '../components/common';

export interface SettingsViewProps {
    user: User;
    periodeTracer: PeriodeTracer[];
    onBackToHome: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
    user,
    periodeTracer,
    onBackToHome,
}) => {
    const [nama, setNama] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [nim, setNim] = useState(user.nim || '');
    const [prodi, setProdi] = useState(user.prodi || '');

    // State Ubah Password
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Modal state
    const [isRevisiModalOpen, setIsRevisiModalOpen] = useState(false);
    const [alasanRevisi, setAlasanRevisi] = useState('');
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    const handleAjukanRevisi = () => {
        setIsRevisiModalOpen(false);
        setAlasanRevisi('');
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 3000);
    };

    return (
        <div className="space-y-6">
            <Header
                title="Pengaturan & Profil Akun"
                subtitle="Kelola informasi pribadi, keamanan akun, dan pengajuan revisi data tracer study"
                breadcrumbs={[
                    { label: 'Beranda', onClick: onBackToHome },
                    { label: 'Pengaturan' },
                ]}
                actions={
                    <Button variant="outline" size="sm" onClick={onBackToHome}>
                        Kembali ke Beranda
                    </Button>
                }
            />

            {showSuccessToast && (
                <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-200 text-sm">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Perubahan berhasil disimpan!</span>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Form Informasi Profil */}
                <div className="lg:col-span-2 space-y-6">
                    <Card
                        title="Informasi Data Diri Alumni"
                        subtitle="Data ini disinkronkan dengan pangkalan data akademik universitas"
                    >
                        <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Input
                                    label="Nama Lengkap"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    placeholder="Nama Lengkap"
                                />
                                <Input
                                    label="Nomor Induk Mahasiswa (NIM)"
                                    value={nim}
                                    onChange={(e) => setNim(e.target.value)}
                                    placeholder="NIM"
                                    disabled
                                    helperText="NIM terkunci sesuai data kelulusan"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Input
                                    label="Alamat Email Utama"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                />
                                <Input
                                    label="Program Studi"
                                    value={prodi}
                                    onChange={(e) => setProdi(e.target.value)}
                                    placeholder="Program Studi"
                                    disabled
                                    helperText="Sesuai ijazah akademik"
                                />
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsRevisiModalOpen(true)}
                                >
                                    Ada data yang keliru? Ajukan Revisi
                                </Button>

                                <Button type="submit" variant="primary" size="sm">
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Ubah Password Keamanan */}
                    <Card
                        title="Keamanan & Kata Sandi"
                        subtitle="Pastikan akun Anda menggunakan kata sandi yang kuat"
                    >
                        <div className="space-y-4 pt-2">
                            <Input
                                label="Kata Sandi Saat Ini"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Input
                                    label="Kata Sandi Baru"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Minimal 8 karakter"
                                />
                                <Input
                                    label="Konfirmasi Kata Sandi Baru"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Ulangi kata sandi"
                                />
                            </div>
                            <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-gray-700">
                                <Button variant="secondary" size="sm">
                                    Perbarui Kata Sandi
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Kolom Kanan: Status Periode & Preferensi */}
                <div className="space-y-6">
                    <Card title="Status Periode Tracer">
                        <div className="space-y-3">
                            {periodeTracer.map((periode) => (
                                <div
                                    key={periode.id}
                                    className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-xs space-y-1.5"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {periode.tahun}
                                        </span>
                                        <Badge variant={periode.isActive ? 'success' : 'neutral'} size="sm">
                                            {periode.isActive ? 'Sedang Aktif' : 'Tutup'}
                                        </Badge>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400">{periode.namaPeriode}</p>
                                    <p className="text-[11px] text-gray-400">
                                        Lulusan: {periode.targetTahunLulus.join(', ')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card title="Preferensi Kontak">
                        <div className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
                            <label className="flex items-start gap-2.5 cursor-pointer">
                                <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-600" />
                                <span>Terima pemberitahuan lowongan kerja mitra kampus via email</span>
                            </label>
                            <label className="flex items-start gap-2.5 cursor-pointer">
                                <input type="checkbox" defaultChecked className="mt-0.5 rounded text-blue-600" />
                                <span>Kirim pengingat jika ada evaluasi tracer study lanjutan</span>
                            </label>
                            <label className="flex items-start gap-2.5 cursor-pointer">
                                <input type="checkbox" className="mt-0.5 rounded text-blue-600" />
                                <span>Izinkan nama perusahaan saya ditampilkan pada statistik karir publik prodi</span>
                            </label>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Modal Ajukan Permohonan Revisi Data */}
            <Modal
                isOpen={isRevisiModalOpen}
                onClose={() => setIsRevisiModalOpen(false)}
                title="Pengajuan Permohonan Revisi Data"
                footer={
                    <>
                        <Button variant="secondary" size="sm" onClick={() => setIsRevisiModalOpen(false)}>
                            Batal
                        </Button>
                        <Button variant="primary" size="sm" onClick={handleAjukanRevisi}>
                            Kirim Permohonan
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-xs text-gray-500">
                        Sampaikan detail data yang perlu diperbaiki (contoh: kesalahan penulisan NIM, tahun lulus,
                        atau pembaruan status ijazah). Admin Tracer Study akan memvalidasi data Anda.
                    </p>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                            Alasan / Keterangan Revisi
                        </label>
                        <textarea
                            rows={4}
                            value={alasanRevisi}
                            onChange={(e) => setAlasanRevisi(e.target.value)}
                            placeholder="Jelaskan alasan permohonan revisi data secara rinci..."
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};
