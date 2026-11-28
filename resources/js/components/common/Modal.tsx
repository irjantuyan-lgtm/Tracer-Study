import { FormEvent, ReactNode } from "react";
import { Role } from "../../types";
import { Icon } from "./Icon";
import { Button } from "./Button";

export interface ModalProps {
  title: string;
  type?: string;
  close?: () => void;
  notify?: (s: string) => void;
  role?: Role;
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  title,
  type,
  close,
  notify,
  role = "super",
  isOpen,
  onClose,
  children,
  footer,
}: ModalProps) {
  const handleClose = onClose || close || (() => {});

  if (isOpen !== undefined && !isOpen) {
    return null;
  }

  // Jika modal berupa dialog konfirmasi / children custom
  if (children) {
    return (
      <div className="modal-backdrop" onMouseDown={handleClose}>
        <div
          className="modal"
          style={{ maxWidth: "560px", width: "100%" }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="modal-head">
            <div>
              <p className="eyebrow">KONFIRMASI</p>
              <h2>{title}</h2>
            </div>
            <button type="button" onClick={handleClose}>
              <Icon name="close" />
            </button>
          </div>
          <div style={{ padding: "16px 24px", color: "var(--ink-700)" }}>
            {children}
          </div>
          {footer && (
            <div className="modal-actions" style={{ marginTop: "8px" }}>
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Jika modal formulir dari Figma Make
  const isEdit = title.startsWith("Edit");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    handleClose();
    if (notify) notify(`${title} berhasil disimpan`);
  };

  return (
    <div className="modal-backdrop" onMouseDown={handleClose}>
      <form
        className="modal"
        onSubmit={submit}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <p className="eyebrow">
              {type === "import"
                ? "IMPORT DATA"
                : isEdit
                  ? "FORMULIR EDIT"
                  : "FORMULIR BARU"}
            </p>
            <h2>{title}</h2>
          </div>
          <button type="button" onClick={handleClose}>
            <Icon name="close" />
          </button>
        </div>
        {type === "import" ? (
          <div className="upload-box">
            <span>
              <Icon name="upload" size={24} />
            </span>
            <strong>Pilih file Excel</strong>
            <p>Format .xlsx atau .xls, maksimal 10 MB</p>
            <input type="file" accept=".xlsx,.xls" required />
            <button
              type="button"
              className="template-link"
              onClick={() => notify && notify("Template Excel berhasil diunduh")}
            >
              Unduh template Excel
            </button>
          </div>
        ) : type === "user" ? (
          <>
            <label>
              Nama lengkap
              <input required placeholder="Nama pengguna" autoFocus />
            </label>
            <label>
              Username (Email / NIM)
              <input required placeholder="nama@uhn.ac.id atau NIM" />
            </label>
            <div className="field-row">
              <label>
                Role akun
                <select>
                  {role === "super" && (
                    <>
                      <option>Admin Fakultas</option>
                      <option>Admin Prodi</option>
                      <option>Admin Dosen</option>
                      <option>Mahasiswa</option>
                    </>
                  )}
                  {role === "faculty" && <option>Admin Prodi</option>}
                  {role === "program" && <option>Mahasiswa</option>}
                </select>
              </label>
              <label>
                Status
                <select>
                  <option>Aktif</option>
                  <option>Nonaktif</option>
                </select>
              </label>
            </div>
            <label>
              Password sementara
              <input required type="password" defaultValue="Uhn@12345" />
            </label>
          </>
        ) : type === "directory" ? (
          <>
            <label>
              Nama lengkap / program studi
              <input required placeholder="Masukkan nama" autoFocus />
            </label>
            <div className="field-row">
              <label>
                Nomor identitas / kode
                <input required placeholder="NIDN, NIP, atau kode" />
              </label>
              <label>
                Status
                <select>
                  <option>Aktif</option>
                  <option>Nonaktif</option>
                </select>
              </label>
            </div>
            <label>
              Unit / keterangan
              <input required placeholder="Program studi atau unit kerja" />
            </label>
          </>
        ) : type === "alumni" ? (
          <>
            <label>
              Nama lengkap
              <input required placeholder="Contoh: Andi Pratama" autoFocus />
            </label>
            <div className="field-row">
              <label>
                NIM
                <input required placeholder="Nomor induk" />
              </label>
              <label>
                Tahun lulus
                <select>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                </select>
              </label>
            </div>
            <label>
              Program studi
              <select>
                <option>Informatika</option>
                <option>Sistem Informasi</option>
                <option>Teknologi Informasi</option>
              </select>
            </label>
            <label>
              Foto alumni
              <input type="file" accept="image/*" />
            </label>
          </>
        ) : type === "question" ? (
          <>
            <label>
              Jenis pertanyaan
              <select>
                <option>Pilihan Ganda</option>
                <option>Isian Singkat</option>
                <option>Skala</option>
              </select>
            </label>
            <label>
              Pertanyaan
              <textarea
                required
                placeholder="Tuliskan pertanyaan..."
                autoFocus
              />
            </label>
            <label className="check-label">
              <input type="checkbox" defaultChecked /> Wajib diisi oleh alumni
            </label>
          </>
        ) : (
          <>
            <label>
              Nama kuesioner
              <input
                required
                placeholder="Kuesioner Tracer Study 2025"
                autoFocus
              />
            </label>
            <div className="field-row">
              <label>
                Periode mulai
                <select>
                  <option>2025</option>
                  <option>2024</option>
                </select>
              </label>
              <label>
                Periode selesai
                <select>
                  <option>2026</option>
                  <option>2025</option>
                </select>
              </label>
            </div>
          </>
        )}
        <div className="modal-actions">
          <Button variant="ghost" onClick={handleClose}>
            Batal
          </Button>
          <Button type="submit">
            {type === "import"
              ? "Import Excel"
              : isEdit
                ? "Simpan Perubahan"
                : "Simpan Data"}
          </Button>
        </div>
      </form>
    </div>
  );
}
