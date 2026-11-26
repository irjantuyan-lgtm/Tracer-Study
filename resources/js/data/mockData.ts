import { User, TracerStat, KuesionerItem, RiwayatPekerjaan, PeriodeTracer, ActivityLog } from '../types';

export const mockCurrentUser: User = {
    id: 1,
    name: 'Desta Erlangga Ramadhani',
    email: 'desta@tracerstudy.ac.id',
    role: 'alumni',
    nim: '20220801045',
    prodi: 'Teknik Informatika',
    tahunLulus: 2024,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

export const mockTracerStats: TracerStat[] = [
    {
        id: 'total_alumni',
        label: 'Total Alumni Terdaftar',
        value: '1,420',
        change: '+12% thn ini',
        isPositive: true,
        description: 'Alumni dari seluruh program studi',
    },
    {
        id: 'response_rate',
        label: 'Tingkat Respon Tracer',
        value: '84.6%',
        change: '+6.2% target',
        isPositive: true,
        description: 'Telah mengisi kuesioner periode aktif',
    },
    {
        id: 'working_rate',
        label: 'Bekerja / Berwirausaha',
        value: '78.2%',
        change: 'Masa tunggu rata-rata 3.2 bln',
        isPositive: true,
        description: 'Mendapat pekerjaan < 6 bulan setelah lulus',
    },
    {
        id: 'relevance_rate',
        label: 'Kesesuaian Bidang Studi',
        value: '82.5%',
        change: 'Tinggi',
        isPositive: true,
        description: 'Pekerjaan relevan dengan kurikulum',
    },
];

export const mockKuesionerList: KuesionerItem[] = [
    {
        id: 1,
        judul: 'Modul A: Status Pekerjaan & Aktivitas Saat Ini',
        kategori: 'Pekerjaan',
        deskripsi: 'Pendataan apakah alumni sudah bekerja, melanjutkan studi, wirausaha, atau mencari kerja.',
        status: 'Selesai',
        totalPertanyaan: 12,
        terjawab: 12,
        tenggatWaktu: '31 Des 2026',
    },
    {
        id: 2,
        judul: 'Modul B: Keselarasan Kompetensi & Pembelajaran',
        kategori: 'Kompetensi',
        deskripsi: 'Evaluasi soft skill, hard skill, dan pengalaman kuliah yang relevan di dunia industri.',
        status: 'Dalam Proses',
        totalPertanyaan: 15,
        terjawab: 9,
        tenggatWaktu: '31 Des 2026',
    },
    {
        id: 3,
        judul: 'Modul C: Kepuasan Terhadap Layanan Kampus',
        kategori: 'Kepuasan',
        deskripsi: 'Penilaian alumni terhadap fasilitas, bimbingan karir, serta kualitas pengajaran.',
        status: 'Belum Diisi',
        totalPertanyaan: 10,
        terjawab: 0,
        tenggatWaktu: '31 Des 2026',
    },
];

export const mockRiwayatPekerjaan: RiwayatPekerjaan[] = [
    {
        id: 101,
        namaPerusahaan: 'PT Teknologi Inovasi Mandiri',
        posisi: 'Full Stack Software Engineer',
        bidangIndustri: 'Teknologi Informasi & Software House',
        tahunMulai: 2024,
        tahunSelesai: null,
        statusPekerjaan: 'Penuh Waktu',
        kesesuaianBidang: 'Sangat Sesuai',
        pendapatan: 'Rp 8.000.000 - Rp 12.000.000',
    },
    {
        id: 102,
        namaPerusahaan: 'Nusantara Creative Studio',
        posisi: 'Frontend Developer Intern',
        bidangIndustri: 'Creative & Digital Agency',
        tahunMulai: 2023,
        tahunSelesai: 2024,
        statusPekerjaan: 'Paruh Waktu',
        kesesuaianBidang: 'Sesuai',
        pendapatan: 'Rp 3.500.000 - Rp 5.000.000',
    },
];

export const mockPeriodeTracer: PeriodeTracer[] = [
    {
        id: 1,
        tahun: 2026,
        namaPeriode: 'Tracer Study Siklus 2026 (Lulusan 2024-2025)',
        tanggalMulai: '2026-01-15',
        tanggalSelesai: '2026-12-31',
        targetTahunLulus: [2024, 2025],
        isActive: true,
    },
    {
        id: 2,
        tahun: 2025,
        namaPeriode: 'Tracer Study Siklus 2025 (Lulusan 2023-2024)',
        tanggalMulai: '2025-01-15',
        tanggalSelesai: '2025-12-31',
        targetTahunLulus: [2023, 2024],
        isActive: false,
    },
];

export const mockActivityLogs: ActivityLog[] = [
    {
        id: 1,
        user: 'Desta Erlangga',
        action: 'Menyimpan draft jawaban Modul B Kompetensi',
        timestamp: '10 menit yang lalu',
        type: 'kuesioner',
    },
    {
        id: 2,
        user: 'Admin Tracer',
        action: 'Memperbarui periode kuesioner tahun 2026',
        timestamp: '2 jam yang lalu',
        type: 'export',
    },
    {
        id: 3,
        user: 'Desta Erlangga',
        action: 'Memperbarui profil & kontak alumni',
        timestamp: '1 hari yang lalu',
        type: 'profile',
    },
];
