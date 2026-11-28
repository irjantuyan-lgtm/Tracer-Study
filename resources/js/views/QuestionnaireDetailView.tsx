import { useState } from "react";
import { Role } from "../types";
import { questions } from "../data";
import { PageIntro, Button, TableActions, Icon } from "../components/common";

export function QuestionnaireDetailView({
  back,
  openModal,
  notify,
  openImport,
  openEdit,
  role,
}: {
  back: () => void;
  openModal: () => void;
  notify: (s: string) => void;
  openImport: () => void;
  openEdit: (name: string) => void;
  role: Role;
}) {
  const [tab, setTab] = useState("questions");

  return (
    <>
      <div className="detail-back">
        <button onClick={back}>← Kembali ke daftar kuesioner</button>
      </div>
      <PageIntro
        eyebrow="KUESIONER AKTIF"
        title="Kuesioner Tracer Study 2025"
        description="Periode 2025–2026 · Diperbarui 12 Januari 2026"
        action={<b className="badge success large">Aktif</b>}
      />
      <div className="tabs">
        <button
          className={tab === "info" ? "active" : ""}
          onClick={() => setTab("info")}
        >
          Informasi
        </button>
        <button
          className={tab === "questions" ? "active" : ""}
          onClick={() => setTab("questions")}
        >
          Pertanyaan <span>5</span>
        </button>
        <button
          className={tab === "settings" ? "active" : ""}
          onClick={() => setTab("settings")}
        >
          Pengaturan
        </button>
      </div>
      {tab === "questions" ? (
        <section className="panel table-panel">
          <div className="panel-head detail-head">
            <div>
              <h2>Daftar Pertanyaan</h2>
              <p>Susun pertanyaan sesuai kebutuhan tracer study.</p>
            </div>
            {role === "faculty" ? (
              <b className="badge info large">Mode Lihat</b>
            ) : (
              <div className="action-row">
                <Button variant="secondary" icon="upload" onClick={openImport}>
                  Import Excel
                </Button>
                <Button icon="plus" onClick={openModal}>
                  Tambah Pertanyaan
                </Button>
              </div>
            )}
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Jenis</th>
                  <th>Pertanyaan</th>
                  <th>Wajib</th>
                  {role !== "faculty" && <th>Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {questions.map((q, i) => (
                  <tr key={q[1]}>
                    <td>0{i + 1}</td>
                    <td>
                      <b className="type-pill">{q[0]}</b>
                    </td>
                    <td className="question-cell">{q[1]}</td>
                    <td>
                      <span className={q[2] === "Ya" ? "required" : "optional"}>
                        {q[2]}
                      </span>
                    </td>
                    {role !== "faculty" && (
                      <td>
                        <TableActions
                          onEdit={() => openEdit(q[1])}
                          onDelete={() => notify("Pertanyaan dihapus")}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="panel empty-state">
          <span>
            <Icon name={tab === "info" ? "clipboard" : "settings"} />
          </span>
          <h2>
            {tab === "info" ? "Informasi Kuesioner" : "Pengaturan Kuesioner"}
          </h2>
          <p>
            Konten {tab === "info" ? "informasi" : "pengaturan"} siap
            dikembangkan pada tahap berikutnya.
          </p>
          <Button variant="secondary" onClick={() => setTab("questions")}>
            Kembali ke Pertanyaan
          </Button>
        </section>
      )}
    </>
  );
}
