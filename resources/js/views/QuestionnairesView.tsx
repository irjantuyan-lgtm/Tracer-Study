import { useState } from "react";
import { Role } from "../types";
import { questionnaires } from "../data";
import { PageIntro, Button, Toolbar, TableActions } from "../components/common";

export function QuestionnairesView({
  openDetail,
  openModal,
  openImport,
  openEdit,
  notify,
  role,
}: {
  openDetail: () => void;
  openModal: () => void;
  openImport: () => void;
  openEdit: (name: string) => void;
  notify: (s: string) => void;
  role: Role;
}) {
  const [search, setSearch] = useState("");
  const rows = questionnaires.filter((q) =>
    q.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <PageIntro
        eyebrow="INSTRUMEN SURVEI"
        title="Daftar Kuesioner"
        description={
          role === "faculty"
            ? "Lihat periode dan pertanyaan tracer study."
            : "Kelola periode dan pertanyaan tracer study."
        }
        action={
          role === "faculty" ? (
            <b className="badge info large">Mode Lihat</b>
          ) : (
            <div className="action-row">
              <Button variant="secondary" icon="upload" onClick={openImport}>
                Import Excel
              </Button>
              <Button icon="plus" onClick={openModal}>
                Buat Kuesioner
              </Button>
            </div>
          )
        }
      />
      <section className="panel table-panel">
        <Toolbar search={search} setSearch={setSearch}>
          <select>
            <option>Semua Status</option>
            <option>Aktif</option>
            <option>Nonaktif</option>
          </select>
        </Toolbar>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Periode</th>
                <th>Nama Kuesioner</th>
                <th>Status</th>
                <th>Tanggal Dibuat</th>
                {role !== "faculty" && <th>Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {rows.map((q, i) => (
                <tr key={q.period}>
                  <td>0{i + 1}</td>
                  <td>
                    <strong>{q.period}</strong>
                  </td>
                  <td>
                    <button className="questionnaire-link" onClick={openDetail}>
                      {q.name}
                      <small>12 pertanyaan · 1.827 respons</small>
                    </button>
                  </td>
                  <td>
                    <b
                      className={`badge ${
                        q.status === "Aktif"
                          ? "success"
                          : q.status === "Selesai"
                            ? "info"
                            : "danger"
                      }`}
                    >
                      {q.status}
                    </b>
                  </td>
                  <td>{q.date}</td>
                  {role !== "faculty" && (
                    <td>
                      <div className="table-actions status-actions">
                        <select
                          aria-label={`Status ${q.name}`}
                          defaultValue={q.status}
                          onChange={(event) =>
                            notify(
                              `Periode ${q.period} diubah menjadi ${event.target.value}`,
                            )
                          }
                        >
                          <option>Aktif</option>
                          <option>Nonaktif</option>
                          <option>Selesai</option>
                        </select>
                        <TableActions
                          onEdit={() => openEdit(q.name)}
                          onDelete={() => notify(`${q.name} dihapus`)}
                        />
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <p>
            Menampilkan <strong>4</strong> dari 4 data
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
