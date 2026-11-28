import { useState } from "react";
import { AlumniIcon } from "../components/AlumniIcon";

export function AlumniProfileView() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [accountStatus, setAccountStatus] = useState<"active" | "inactive">("active");

  const [formData, setFormData] = useState({
    nama: "Dewa Gedhe Putra Aditya",
    email: "dewa.aditya@email.com",
    telepon: "0812 3456 7890",
    domisili: "Denpasar, Bali",
    nim: "42100001",
    prodi: "Informatika",
    tahunMasuk: "2020",
    tahunLulus: "2024",
    job1Instansi: "PT Nusantara Digital",
    job1Status: "Swasta",
    job1Jabatan: "Frontend Developer",
    job1Mulai: "2024-08",
    job2Instansi: "Studio Kreasi Bali",
    job2Status: "Wiraswasta",
    job2Jabatan: "Web Designer",
    job2Periode: "Jan 2024 – Jul 2024",
    linkedin: "linkedin.com/in/dewaaditya",
    instagram: "@dewaaditya",
    tiktok: "@dewa.belajar",
    twitter: "@dewaaditya_",
    lanjutStudi: "Tidak",
    institusiLanjut: "",
    prodiLanjut: "",
  });

  const handleToggleEdit = () => {
    if (editing) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    }
    setEditing(!editing);
  };

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">AKUN ALUMNI</span>
          <h1>Profil Saya</h1>
          <p>Pastikan informasi kontakmu selalu terkini.</p>
        </div>
        <button
          type="button"
          className={editing ? "primary-button" : "secondary-button"}
          onClick={handleToggleEdit}
        >
          <AlumniIcon name={editing ? "check" : "edit"} size={17} />{" "}
          {editing ? "Simpan perubahan" : "Edit profil"}
        </button>
      </div>

      {saved && (
        <div className="toast">
          <AlumniIcon name="check" size={17} /> Perubahan berhasil disimpan
        </div>
      )}

      <div className="profile-layout">
        <aside className="profile-summary card">
          <div className="avatar avatar-xl">DA</div>
          <h2>{formData.nama}</h2>
          <p>Alumni · {formData.prodi} {formData.tahunLulus}</p>
          <span className="verified">
            <AlumniIcon name="check" size={13} /> Terverifikasi
          </span>
          <div className="account-status">
            <span>Status akun</span>
            <div>
              <button
                type="button"
                className={accountStatus === "active" ? "selected" : ""}
                onClick={() => setAccountStatus("active")}
              >
                <i /> Aktif
              </button>
              <button
                type="button"
                className={accountStatus === "inactive" ? "selected" : ""}
                onClick={() => setAccountStatus("inactive")}
              >
                <i /> Nonaktif
              </button>
            </div>
          </div>
          <div className="profile-complete">
            <div>
              <span>Kelengkapan profil</span>
              <b>100%</b>
            </div>
            <i>
              <span />
            </i>
          </div>
        </aside>

        <section className="profile-form card">
          <div className="form-section-title">
            <span className="card-icon orange">
              <AlumniIcon name="user" />
            </span>
            <div>
              <h2>Informasi pribadi & akademik</h2>
              <p>Data diri, kontak, dan riwayat pendidikan utama</p>
            </div>
          </div>
          <div className="form-grid">
            <label className="full">
              Nama lengkap
              <input
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                disabled={!editing}
              />
            </label>
            <label>
              Email
              <input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!editing}
              />
            </label>
            <label>
              Nomor WhatsApp
              <input
                value={formData.telepon}
                onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                disabled={!editing}
              />
            </label>
            <label>
              Domisili
              <input
                value={formData.domisili}
                onChange={(e) => setFormData({ ...formData, domisili: e.target.value })}
                disabled={!editing}
              />
            </label>
            <label>
              NIM
              <input value={formData.nim} disabled />
            </label>
            <label>
              Program studi
              <input value={formData.prodi} disabled />
            </label>
            <label>
              Tahun masuk
              <input value={formData.tahunMasuk} disabled />
            </label>
            <label>
              Tahun lulus
              <input value={formData.tahunLulus} disabled />
            </label>
          </div>

          <div className="form-section-title academic">
            <span className="card-icon blue">
              <AlumniIcon name="briefcase" />
            </span>
            <div>
              <h2>Data pekerjaan</h2>
              <p>Riwayat pekerjaan terbaru alumni</p>
            </div>
          </div>
          <div className="employment-list">
            <div className="employment-card">
              <div className="employment-head">
                <span>Pekerjaan utama</span>
                <b>Saat ini</b>
              </div>
              <div className="form-grid">
                <label>
                  Nama instansi
                  <input
                    value={formData.job1Instansi}
                    onChange={(e) =>
                      setFormData({ ...formData, job1Instansi: e.target.value })
                    }
                    disabled={!editing}
                  />
                </label>
                <label>
                  Status pekerjaan
                  <select
                    value={formData.job1Status}
                    onChange={(e) =>
                      setFormData({ ...formData, job1Status: e.target.value })
                    }
                    disabled={!editing}
                  >
                    <option>Swasta</option>
                    <option>Wiraswasta</option>
                    <option>ASN</option>
                    <option>BUMN</option>
                  </select>
                </label>
                <label>
                  Jabatan
                  <input
                    value={formData.job1Jabatan}
                    onChange={(e) =>
                      setFormData({ ...formData, job1Jabatan: e.target.value })
                    }
                    disabled={!editing}
                  />
                </label>
                <label>
                  Mulai bekerja
                  <input
                    type="month"
                    value={formData.job1Mulai}
                    onChange={(e) =>
                      setFormData({ ...formData, job1Mulai: e.target.value })
                    }
                    disabled={!editing}
                  />
                </label>
              </div>
            </div>
            <div className="employment-card">
              <div className="employment-head">
                <span>Pekerjaan kedua</span>
                <b>Riwayat</b>
              </div>
              <div className="form-grid">
                <label>
                  Nama instansi
                  <input
                    value={formData.job2Instansi}
                    onChange={(e) =>
                      setFormData({ ...formData, job2Instansi: e.target.value })
                    }
                    disabled={!editing}
                  />
                </label>
                <label>
                  Status pekerjaan
                  <select
                    value={formData.job2Status}
                    onChange={(e) =>
                      setFormData({ ...formData, job2Status: e.target.value })
                    }
                    disabled={!editing}
                  >
                    <option>Swasta</option>
                    <option>Wiraswasta</option>
                    <option>ASN</option>
                    <option>BUMN</option>
                  </select>
                </label>
                <label>
                  Jabatan
                  <input
                    value={formData.job2Jabatan}
                    onChange={(e) =>
                      setFormData({ ...formData, job2Jabatan: e.target.value })
                    }
                    disabled={!editing}
                  />
                </label>
                <label>
                  Periode bekerja
                  <input
                    value={formData.job2Periode}
                    onChange={(e) =>
                      setFormData({ ...formData, job2Periode: e.target.value })
                    }
                    disabled={!editing}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-section-title academic">
            <span className="card-icon green">
              <AlumniIcon name="info" />
            </span>
            <div>
              <h2>Informasi lainnya</h2>
              <p>Sosial media dan pendidikan lanjutan</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              LinkedIn
              <input
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                disabled={!editing}
              />
            </label>
            <label>
              Instagram
              <input
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                disabled={!editing}
              />
            </label>
            <label>
              TikTok
              <input
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                disabled={!editing}
              />
            </label>
            <label>
              X / Twitter
              <input
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                disabled={!editing}
              />
            </label>
            <label className="full">
              Lanjut studi <span className="optional-label">Opsional</span>
              <select
                value={formData.lanjutStudi}
                onChange={(e) =>
                  setFormData({ ...formData, lanjutStudi: e.target.value })
                }
                disabled={!editing}
              >
                <option>Tidak</option>
                <option>Ya, sedang menempuh</option>
                <option>Ya, sudah selesai</option>
              </select>
            </label>
            <label>
              Institusi pendidikan <span className="optional-label">Opsional</span>
              <input
                placeholder="Nama perguruan tinggi"
                value={formData.institusiLanjut}
                onChange={(e) =>
                  setFormData({ ...formData, institusiLanjut: e.target.value })
                }
                disabled={!editing}
              />
            </label>
            <label>
              Program studi lanjutan <span className="optional-label">Opsional</span>
              <input
                placeholder="Nama program studi"
                value={formData.prodiLanjut}
                onChange={(e) =>
                  setFormData({ ...formData, prodiLanjut: e.target.value })
                }
                disabled={!editing}
              />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
}
