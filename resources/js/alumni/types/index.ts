import { ReactNode } from "react";

export type AlumniPage =
  | "dashboard"
  | "profile"
  | "questionnaire"
  | "history"
  | "settings";

export type AlumniIconName =
  | "home"
  | "user"
  | "clipboard"
  | "clock"
  | "settings"
  | "logout"
  | "bell"
  | "check"
  | "arrow"
  | "briefcase"
  | "calendar"
  | "book"
  | "mail"
  | "phone"
  | "map"
  | "menu"
  | "close"
  | "edit"
  | "info"
  | "chevron";

export interface AlumniNavItem {
  id: AlumniPage;
  label: string;
  icon: AlumniIconName;
}

export interface RiwayatPekerjaanItem {
  id: number;
  nama_instansi_perusahaan: string;
  status_pekerjaan: "Penuh Waktu" | "Wiraswasta" | "BUMN" | "ASN" | "Freelance";
  jabatan: string;
  periode: string;
  is_utama: boolean;
}

export interface AlumniData {
  nama_lengkap: string;
  nim: string;
  program_studi: string;
  tahun_masuk: string;
  tahun_lulus: string;
  email_kontak: string;
  no_telepon: string;
  domisili: string;
  status_alumni: string;
  akun_linkedin: string;
  akun_ig: string;
  akun_tiktok: string;
  akun_twitter: string;
  is_lanjut_studi: boolean;
  institusi_lanjut: string;
  prodi_lanjut: string;
  pekerjaan: RiwayatPekerjaanItem[];
}

export interface KuesionerAnswers {
  aktivitas_saat_ini: string;
  waktu_tunggu: string;
  kesesuaian_bidang: string;
  tingkat_pendapatan: string;
  saran_kurikulum: string;
  kepuasan_layanan: string;
}

export interface PeriodeTracerItem {
  id: number;
  nama_periode: string;
  tahun_periode: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  status_periode: "Aktif" | "Ditutup";
  status_pengisian: "Belum diisi" | "Terkirim" | "Menunggu Revisi";
  waktu_kirim?: string;
  alasan_revisi?: string;
}
