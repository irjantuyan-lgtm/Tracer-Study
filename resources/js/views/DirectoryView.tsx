import { useState } from "react";
import { Role } from "../types";
import { directoryData } from "../data";
import { PageIntro, Button, Toolbar, TableActions } from "../components/common";

export function DirectoryView({
  type,
  role,
  notify,
  openModal,
  openEdit,
}: {
  type: "lecturers" | "employees" | "programs";
  role: Role;
  notify: (s: string) => void;
  openModal: () => void;
  openEdit: (name: string) => void;
}) {
  const [search, setSearch] = useState("");
  const meta = {
    lecturers: {
      eyebrow: "SUMBER DAYA AKADEMIK",
      title: "Data Dosen",
      description: "Daftar dosen dan homebase program studi.",
      id: "NIDN",
      unit: "Program Studi",
    },
    employees: {
      eyebrow: "SUMBER DAYA FAKULTAS",
      title: "Data Pegawai",
      description: "Daftar pegawai dan unit kerja fakultas.",
      id: "NIP Pegawai",
      unit: "Unit Kerja",
    },
    programs: {
      eyebrow: "STRUKTUR AKADEMIK",
      title: "Data Program Studi",
      description: "Daftar program studi, ketua, dan status akreditasi.",
      id: "Kode Prodi",
      unit: "Ketua Program Studi",
    },
  }[type];
  const readOnly = role === "faculty";
  const rows = directoryData[type].filter((row) =>
    row.join(" ").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <PageIntro
        eyebrow={meta.eyebrow}
        title={meta.title}
        description={
          readOnly
            ? `${meta.description} Anda memiliki akses lihat saja.`
            : meta.description
        }
        action={
          readOnly ? (
            <b className="badge info large">Mode Lihat</b>
          ) : (
            <Button icon="plus" onClick={openModal}>
              Tambah Data
            </Button>
          )
        }
      />
      <section className="panel table-panel">
        <Toolbar search={search} setSearch={setSearch}>
          <Button
            variant="secondary"
            icon="download"
            onClick={() => notify(`${meta.title} berhasil diekspor`)}
          >
            Ekspor
          </Button>
        </Toolbar>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>{type === "programs" ? "Nama Program Studi" : "Nama"}</th>
                <th>{meta.id}</th>
                <th>{meta.unit}</th>
                <th>{type === "programs" ? "Akreditasi" : "Status"}</th>
                {!readOnly && <th>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row[1]}>
                  <td>0{index + 1}</td>
                  <td>
                    <strong>{row[0]}</strong>
                  </td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>
                    <b
                      className={`badge ${
                        row[3] === "Aktif" || row[3] === "Unggul"
                          ? "success"
                          : "info"
                      }`}
                    >
                      {row[3]}
                    </b>
                  </td>
                  {!readOnly && (
                    <td>
                      <TableActions
                        onEdit={() => openEdit(row[0])}
                        onDelete={() => notify(`${row[0]} berhasil dihapus`)}
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
            Menampilkan <strong>{rows.length}</strong> data
          </p>
          <div>
            <button disabled>‹</button>
            <button className="current">1</button>
            <button disabled>›</button>
          </div>
        </div>
      </section>
    </>
  );
}
