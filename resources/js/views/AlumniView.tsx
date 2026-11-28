import { useState, useMemo } from "react";
import { Role } from "../types";
import { alumni } from "../data";
import { PageIntro, Button, Toolbar, TableActions } from "../components/common";

export function AlumniView({
  notify,
  openModal,
  openImport,
  openEdit,
  role,
}: {
  notify: (s: string) => void;
  openModal: () => void;
  openImport: () => void;
  openEdit: (name: string) => void;
  role: Role;
}) {
  const canEdit = role !== "faculty";
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("Semua Prodi");
  const rows = useMemo(
    () =>
      alumni.filter(
        (a) =>
          `${a.name} ${a.nim}`.toLowerCase().includes(search.toLowerCase()) &&
          (program === "Semua Prodi" || a.program === program),
      ),
    [search, program],
  );

  return (
    <>
      <PageIntro
        eyebrow="DATABASE ALUMNI"
        title="Data Alumni"
        description={
          canEdit
            ? "Kelola profil, foto, status, dan riwayat alumni."
            : "Lihat profil, foto, status, dan riwayat alumni fakultas."
        }
        action={
          canEdit ? (
            <div className="action-row">
              <Button variant="secondary" icon="upload" onClick={openImport}>
                Import Excel
              </Button>
              <Button icon="plus" onClick={openModal}>
                Tambah Alumni
              </Button>
            </div>
          ) : (
            <b className="badge info large">Mode Lihat</b>
          )
        }
      />
      <section className="panel table-panel">
        <Toolbar search={search} setSearch={setSearch}>
          <select value={program} onChange={(e) => setProgram(e.target.value)}>
            <option>Semua Prodi</option>
            <option>Informatika</option>
            <option>Sistem Informasi</option>
            <option>Teknologi Informasi</option>
          </select>
          <select>
            <option>Semua Tahun</option>
            <option>2022</option>
            <option>2021</option>
            <option>2020</option>
          </select>
          <Button
            variant="secondary"
            icon="download"
            onClick={() => notify("Data alumni berhasil diekspor")}
          >
            Ekspor
          </Button>
        </Toolbar>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Alumni</th>
                <th>NIM</th>
                <th>Program Studi</th>
                <th>Tahun Lulus</th>
                <th>Status</th>
                {canEdit && <th>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((a, i) => (
                <tr key={a.nim}>
                  <td>{String(i + 1).padStart(2, "0")}</td>
                  <td>
                    <div className="name-cell">
                      {a.photo ? (
                        <img src={a.photo} alt={`Foto ${a.name}`} />
                      ) : (
                        <span>
                          {a.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                      )}
                      <strong>{a.name}</strong>
                    </div>
                  </td>
                  <td>{a.nim}</td>
                  <td>{a.program}</td>
                  <td>{a.year}</td>
                  <td>
                    <b
                      className={`badge ${
                        a.status === "Aktif" ? "success" : "danger"
                      }`}
                    >
                      {a.status}
                    </b>
                  </td>
                  {canEdit && (
                    <td>
                      <TableActions
                        onEdit={() => openEdit(a.name)}
                        onDelete={() => notify(`${a.name} dihapus dari daftar`)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <p>
            Menampilkan <strong>{rows.length}</strong> dari 2.543 data
          </p>
          <div>
            <button disabled>‹</button>
            <button className="current">1</button>
            <button>2</button>
            <button>3</button>
            <span>…</span>
            <button>128</button>
            <button>›</button>
          </div>
        </div>
      </section>
    </>
  );
}
