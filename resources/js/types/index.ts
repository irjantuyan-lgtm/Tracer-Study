// Definisi tipe TypeScript untuk aplikasi Tracer Study

export type ViewType = 'home' | 'detail' | 'settings';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'alumni' | 'dosen' | 'kaprodi';
    avatarUrl?: string;
    nim?: string;
    prodi?: string;
    tahunLulus?: number;
}

export interface TracerStat {
    id: string;
    label: string;
    value: string | number;
    change?: string;
    isPositive?: boolean;
    description?: string;
}

export interface KuesionerItem {
    id: number;
    judul: string;
    kategori: 'Pekerjaan' | 'Kompetensi' | 'Kepuasan' | 'Identitas';
    deskripsi: string;
    status: 'Belum Diisi' | 'Dalam Proses' | 'Selesai';
    totalPertanyaan: number;
    terjawab: number;
    tenggatWaktu: string;
}

export interface RiwayatPekerjaan {
    id: number;
    namaPerusahaan: string;
    posisi: string;
    bidangIndustri: string;
    tahunMulai: number;
    tahunSelesai?: number | null;
    statusPekerjaan: 'Penuh Waktu' | 'Paruh Waktu' | 'Wirausaha' | 'Freelance';
    kesesuaianBidang: 'Sangat Sesuai' | 'Sesuai' | 'Kurang Sesuai' | 'Tidak Sesuai';
    pendapatan?: string;
}

export interface PeriodeTracer {
    id: number;
    tahun: number;
    namaPeriode: string;
    tanggalMulai: string;
    tanggalSelesai: string;
    targetTahunLulus: number[];
    isActive: boolean;
}

export interface ActivityLog {
    id: number;
    user: string;
    action: string;
    timestamp: string;
    type: 'kuesioner' | 'profile' | 'export' | 'auth';
}
