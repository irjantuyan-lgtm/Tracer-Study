import { Role, RoleInfo, NavItem, AlumniItem, QuestionnaireItem } from "../types";

export const campusPhoto =
  "https://images.unsplash.com/photo-1599537504477-ec5a7bb32321?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1400";

export const roles: Record<Role, RoleInfo> = {
  super: {
    label: "Super Admin",
    short: "SA",
    scope: "Universitas HKBP Nommensen",
    greeting: "Super Admin",
  },
  faculty: {
    label: "Admin Fakultas",
    short: "AF",
    scope: "Fakultas Sains & Teknologi",
    greeting: "Admin Fakultas",
  },
  program: {
    label: "Admin Prodi",
    short: "AP",
    scope: "Program Studi Informatika",
    greeting: "Admin Prodi",
  },
};

export const nav: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "home" },
  { id: "alumni", label: "Data Alumni", icon: "users" },
  { id: "questionnaires", label: "Kuesioner", icon: "clipboard" },
  { id: "report", label: "Laporan", icon: "chart" },
  { id: "lecturers", label: "Data Dosen", icon: "graduation" },
  { id: "employees", label: "Data Pegawai", icon: "briefcase" },
  { id: "programs", label: "Data Prodi", icon: "building" },
  { id: "users", label: "Manajemen User", icon: "shield" },
  { id: "logs", label: "Log Aktivitas", icon: "history" },
  { id: "settings", label: "Pengaturan", icon: "settings" },
];

export const alumni: AlumniItem[] = [
  {
    name: "Dimas Cakra Putra",
    nim: "421190001",
    program: "Informatika",
    year: "2021",
    status: "Aktif",
    photo:
      "https://images.unsplash.com/photo-1756973229525-53fbc1303a61?crop=faces&fit=crop&w=80&h=80&q=80",
  },
  {
    name: "Nadia Sari",
    nim: "421190018",
    program: "Informatika",
    year: "2021",
    status: "Aktif",
    photo:
      "https://images.unsplash.com/photo-1756973229712-af48b150e911?crop=faces&fit=crop&w=80&h=80&q=80",
  },
  {
    name: "Rahmat Ardi",
    nim: "420180044",
    program: "Sistem Informasi",
    year: "2020",
    status: "Aktif",
    photo: "",
  },
  {
    name: "Kasih Widi",
    nim: "419170008",
    program: "Informatika",
    year: "2019",
    status: "Tidak Aktif",
    photo: "",
  },
  {
    name: "Putri Anggi",
    nim: "418160092",
    program: "Teknologi Informasi",
    year: "2018",
    status: "Aktif",
    photo: "",
  },
  {
    name: "Fajar Pratama",
    nim: "422200031",
    program: "Sistem Informasi",
    year: "2022",
    status: "Aktif",
    photo: "",
  },
];

export const questionnaires: QuestionnaireItem[] = [
  {
    period: "2025–2026",
    name: "Kuesioner Tracer Study 2025",
    status: "Aktif",
    date: "12 Jan 2026",
  },
  {
    period: "2023–2024",
    name: "Kuesioner Tracer Study 2023",
    status: "Aktif",
    date: "10 Jan 2024",
  },
  {
    period: "2022–2023",
    name: "Kuesioner Tracer Study 2022",
    status: "Aktif",
    date: "08 Jan 2023",
  },
  {
    period: "2021–2022",
    name: "Kuesioner Tracer Study 2021",
    status: "Selesai",
    date: "06 Jan 2022",
  },
];

export const questions: [string, string, string][] = [
  ["Pilihan Ganda", "Apa status pekerjaan Anda saat ini?", "Ya"],
  ["Pilihan Ganda", "Apakah pekerjaan Anda sesuai dengan bidang studi?", "Ya"],
  [
    "Isian Singkat",
    "Berapa lama Anda menunggu untuk mendapatkan pekerjaan?",
    "Ya",
  ],
  ["Pilihan Ganda", "Berapa pendapatan rata-rata per bulan?", "Ya"],
  [
    "Pilihan Ganda",
    "Apakah Anda melanjutkan studi ke jenjang lebih tinggi?",
    "Tidak",
  ],
];

export const directoryData: Record<"lecturers" | "employees" | "programs", string[][]> = {
  lecturers: [
    [
      "Dr. Oris Krianto Sulaiman, S.T., M.Kom.",
      "0123078601",
      "Informatika",
      "Aktif",
    ],
    [
      "Erwin Panggabean, S.Kom., M.Kom.",
      "0115088502",
      "Sistem Informasi",
      "Aktif",
    ],
    [
      "Rosinta Romauli, S.T., M.T.",
      "0109048903",
      "Teknologi Informasi",
      "Aktif",
    ],
    ["Dr. Mula Sigiro, S.Si., M.Si.", "0111127904", "Informatika", "Aktif"],
  ],
  employees: [
    ["Ruth Simanjuntak, S.E.", "PGW-0018", "Administrasi Akademik", "Aktif"],
    ["Binsar Hutapea", "PGW-0021", "Laboratorium", "Aktif"],
    ["Tiodor Sitorus, S.E.", "PGW-0034", "Keuangan", "Aktif"],
    ["Maruli Silalahi", "PGW-0040", "Layanan Mahasiswa", "Aktif"],
  ],
  programs: [
    ["Informatika", "S1-IF", "Dr. Oris Krianto Sulaiman", "Unggul"],
    ["Sistem Informasi", "S1-SI", "Erwin Panggabean, M.Kom.", "Baik Sekali"],
    ["Teknologi Informasi", "S1-TI", "Rosinta Romauli, M.T.", "Baik Sekali"],
    ["Teknik Elektro", "S1-TE", "Dr. Mula Sigiro", "Baik"],
  ],
};

export const userRows: string[][] = [
  ["Maria Sihombing", "maria@uhn.ac.id", "Admin Fakultas", "FAST", "Aktif"],
  ["Artha Simbolon", "artha@uhn.ac.id", "Admin Prodi", "Informatika", "Aktif"],
  ["Roy Manurung", "roy@uhn.ac.id", "Admin Dosen", "Sistem Informasi", "Aktif"],
  ["Nadia Sari", "421190018", "Mahasiswa", "Informatika", "Aktif"],
];

export const auditLogs: string[][] = [
  [
    "18 Feb 2025, 09:42",
    "Super Admin",
    "Mengimpor 18 data alumni",
    "Data Alumni",
    "Berhasil",
  ],
  [
    "18 Feb 2025, 09:31",
    "Nadia Sari",
    "Menyelesaikan kuesioner 2025",
    "Kuesioner",
    "Berhasil",
  ],
  [
    "18 Feb 2025, 08:56",
    "Admin Prodi",
    "Memperbarui data dosen",
    "Data Dosen",
    "Berhasil",
  ],
  [
    "17 Feb 2025, 16:20",
    "Admin Fakultas",
    "Mencetak laporan progres",
    "Laporan",
    "Berhasil",
  ],
  [
    "17 Feb 2025, 14:02",
    "Super Admin",
    "Membuat akun Admin Prodi",
    "Manajemen User",
    "Berhasil",
  ],
  [
    "17 Feb 2025, 10:15",
    "Admin Prodi",
    "Mengubah status periode",
    "Kuesioner",
    "Berhasil",
  ],
];
