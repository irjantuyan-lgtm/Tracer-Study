import { AlumniData, PeriodeTracerItem } from "../types";

export const initialAlumniData: AlumniData = {
  nama_lengkap: "Nadia Sari",
  nim: "421190018",
  program_studi: "Informatika",
  tahun_masuk: "2019",
  tahun_lulus: "2023",
  email_kontak: "nadiasari@gmail.com",
  no_telepon: "0812-6321-7789",
  domisili: "Medan, Sumatera Utara",
  status_alumni: "Terverifikasi",
  akun_linkedin: "linkedin.com/in/nadiasari",
  akun_ig: "@nadiasari_",
  akun_tiktok: "@nadia.tech",
  akun_twitter: "@nadiasari",
  is_lanjut_studi: false,
  institusi_lanjut: "",
  prodi_lanjut: "",
  pekerjaan: [
    {
      id: 1,
      nama_instansi_perusahaan: "PT Bank Mestika Dharma Tbk",
      status_pekerjaan: "Penuh Waktu",
      jabatan: "Software Engineer",
      periode: "Agu 2023 – Sekarang",
      is_utama: true,
    },
    {
      id: 2,
      nama_instansi_perusahaan: "CV Solusi Digital Medan",
      status_pekerjaan: "Freelance",
      jabatan: "Web Developer",
      periode: "Feb 2023 – Jul 2023",
      is_utama: false,
    },
  ],
};

export const initialPeriodeList: PeriodeTracerItem[] = [
  {
    id: 1,
    nama_periode: "Tracer Study FAST 2024–2025",
    tahun_periode: "2024–2025",
    tanggal_mulai: "1 Januari 2025",
    tanggal_selesai: "31 Desember 2025",
    status_periode: "Aktif",
    status_pengisian: "Belum diisi",
  },
  {
    id: 2,
    nama_periode: "Tracer Study FAST 2023–2024",
    tahun_periode: "2023–2024",
    tanggal_mulai: "1 Januari 2024",
    tanggal_selesai: "31 Desember 2024",
    status_periode: "Ditutup",
    status_pengisian: "Terkirim",
    waktu_kirim: "18 November 2024, 14:20 WIB",
  },
];
