export type Page =
  | "dashboard"
  | "alumni"
  | "questionnaires"
  | "report"
  | "lecturers"
  | "employees"
  | "programs"
  | "users"
  | "logs"
  | "settings";

export type Role = "super" | "faculty" | "program" | "alumni";

export type IconName =
  | "home"
  | "users"
  | "clipboard"
  | "chart"
  | "settings"
  | "bell"
  | "search"
  | "download"
  | "plus"
  | "edit"
  | "trash"
  | "arrow"
  | "check"
  | "briefcase"
  | "graduation"
  | "menu"
  | "close"
  | "chevron"
  | "history"
  | "building"
  | "upload"
  | "shield";

export interface RoleInfo {
  label: string;
  short: string;
  scope: string;
  greeting: string;
}

export interface NavItem {
  id: Page;
  label: string;
  icon: IconName;
}

export interface AlumniItem {
  name: string;
  nim: string;
  program: string;
  year: string;
  status: string;
  photo: string;
}

export interface QuestionnaireItem {
  period: string;
  name: string;
  status: string;
  date: string;
}

export interface ModalData {
  title: string;
  type: string;
}

// Tracer Study Alumni Data Types
export interface KuesionerItem {
  id: number;
  judul: string;
  kategori: 'Pekerjaan' | 'Kompetensi' | 'Kepuasan' | 'Identitas';
  deskripsi?: string;
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

export interface ActivityLog {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  type: 'kuesioner' | 'profile' | 'export' | 'auth';
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
