import { FormEvent, ReactNode, useEffect, useState } from "react";
import { AlumniApiItem, Role } from "../../types";
import { Icon } from "./Icon";
import { Button } from "./Button";

interface ProdiOption {
  id: number;
  nama_prodi: string;
}

export interface ModalProps {
  title: string;
  type?: string;
  alumni?: AlumniApiItem;
  onSuccess?: () => void;
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
  alumni,
  onSuccess,
  close,
  notify,
  role = "super",
  isOpen,
  onClose,
  children,
  footer,
}: ModalProps) {
  const handleClose = onClose || close || (() => {});
  const [prodiList, setProdiList] = useState<ProdiOption[]>([]);
  const [namaLengkap, setNamaLengkap] = useState(alumni?.nama_lengkap || "");
  const [nim, setNim] = useState(alumni?.nim || "");
  const [email, setEmail] = useState(alumni?.email_kontak || "");
  const [tahunLulus, setTahunLulus] = useState(
    alumni?.tahun_lulus ? String(alumni.tahun_lulus) : String(new Date().getFullYear()),
  );
  const [prodiId, setProdiId] = useState(
    alumni?.prodi_id ? String(alumni.prodi_id) : "",
  );
  const [fotoProfil, setFotoProfil] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (type !== "alumni") return;
    setNamaLengkap(alumni?.nama_lengkap || "");
    setNim(alumni?.nim || "");
    setEmail(alumni?.email_kontak || "");
    setTahunLulus(
      alumni?.tahun_lulus ? String(alumni.tahun_lulus) : String(new Date().getFullYear()),
    );
    setProdiId(alumni?.prodi_id ? String(alumni.prodi_id) : "");
    setFotoProfil(null);
    setFormError("");

    const token = localStorage.getItem("token");
    fetch("/api/program-studi", {
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success" && Array.isArray(json.data)) {
          setProdiList(json.data);
          if (!alumni?.prodi_id && json.data.length > 0) {
            setProdiId(String(json.data[0].id));
          }
        }
      })
      .catch(() => {});
  }, [type, alumni]);

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
  const submit = async (e: FormEvent) => {
    e.preventDefault();

    if (type !== "alumni") {
      handleClose();
      if (notify) notify(`${title} berhasil disimpan`);
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("nama_lengkap", namaLengkap);
      formData.append("nim", nim);
      formData.append("email", email);
      formData.append("tahun_lulus", tahunLulus);
      formData.append("prodi_id", prodiId);
      if (fotoProfil) {
        formData.append("foto_profil", fotoProfil);
      }
      if (isEdit && alumni) {
        formData.append("_method", "PUT");
      }

      const url = isEdit && alumni ? `/api/alumni/${alumni.id}` : "/api/alumni";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        const firstError = json.errors
          ? Object.values(json.errors as Record<string, string[]>).flat()[0]
          : null;
        setFormError(firstError || json.message || "Gagal menyimpan data alumni");
        return;
      }

      onSuccess?.();
      notify?.(json.message || `${title} berhasil disimpan`);
      handleClose();
    } catch {
      setFormError("Gagal terhubung ke server");
    } finally {
      setSubmitting(false);
    }
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
            {formError && (
              <p style={{ color: "#dc2626", fontSize: "0.9rem", marginBottom: "8px" }}>
                {formError}
              </p>
            )}
            <label>
              Nama lengkap
              <input
                required
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                placeholder="Contoh: Andi Pratama"
                autoFocus
              />
            </label>
            <div className="field-row">
              <label>
                NIM
                <input
                  required
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  placeholder="Nomor induk"
                />
              </label>
              <label>
                Tahun lulus
                <input
                  required
                  type="number"
                  value={tahunLulus}
                  onChange={(e) => setTahunLulus(e.target.value)}
                  placeholder="2024"
                />
              </label>
            </div>
            <label>
              Email (untuk akun login alumni)
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alumni@uhn.ac.id"
              />
            </label>
            <label>
              Program studi
              <select
                required
                value={prodiId}
                onChange={(e) => setProdiId(e.target.value)}
              >
                {prodiList.length === 0 ? (
                  <option value="">Memuat program studi...</option>
                ) : (
                  prodiList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama_prodi}
                    </option>
                  ))
                )}
              </select>
            </label>
            <label>
              Foto alumni
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={(e) => setFotoProfil(e.target.files?.[0] || null)}
              />
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
            {submitting
              ? "Menyimpan..."
              : type === "import"
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
