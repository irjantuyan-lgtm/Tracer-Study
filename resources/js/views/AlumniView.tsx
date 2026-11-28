import { useEffect, useMemo, useState } from "react";
import { AlumniApiItem, Role } from "../types";
import { PageIntro, Button, Toolbar, TableActions } from "../components/common";

export function AlumniView({
  notify,
  openModal,
  openImport,
  openEdit,
  role,
  refreshKey = 0,
}: {
  notify: (s: string) => void;
  openModal: () => void;
  openImport: () => void;
  openEdit: (item: AlumniApiItem) => void;
  role: Role;
  refreshKey?: number;
}) {
  const canEdit = role !== "faculty";
  const [alumniList, setAlumniList] = useState<AlumniApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [program, setProgram] = useState("Semua Prodi");
  const [year, setYear] = useState("Semua Tahun");

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");
    setLoading(true);
    setError("");

    fetch("/api/alumni", {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.message || "Gagal memuat data alumni");
        }
        return json;
      })
      .then((json) => {
        if (json.status === "success" && Array.isArray(json.data)) {
          setAlumniList(json.data);
        }
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Gagal terhubung ke server");
          notify(err.message || "Gagal memuat data alumni");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [refreshKey]);

  const handleDelete = async (item: AlumniApiItem) => {
    if (!window.confirm(`Hapus data alumni "${item.nama_lengkap}"?`)) {
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/alumni/${item.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const json = await res.json();
      if (!res.ok) {
        notify(json.message || "Gagal menghapus data alumni");
        return;
      }
      setAlumniList((prev) => prev.filter((a) => a.id !== item.id));
      notify(json.message || `${item.nama_lengkap} berhasil dihapus`);
    } catch {
      notify("Gagal terhubung ke server");
    }
  };

  const programOptions = useMemo(() => {
    const unique = new Set(
      alumniList
        .map((a) => a.program_studi?.nama_prodi)
        .filter((p): p is string => Boolean(p)),
    );
    return ["Semua Prodi", ...Array.from(unique)];
  }, [alumniList]);

  const yearOptions = useMemo(() => {
    const unique = new Set(
      alumniList.map((a) => String(a.tahun_lulus)).filter(Boolean),
    );
    return ["Semua Tahun", ...Array.from(unique).sort((a, b) => Number(b) - Number(a))];
  }, [alumniList]);

  const rows = useMemo(
    () =>
      alumniList.filter((a) => {
        const prodi = a.program_studi?.nama_prodi || "";
        const matchSearch = `${a.nama_lengkap} ${a.nim}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchProdi = program === "Semua Prodi" || prodi === program;
        const matchYear =
          year === "Semua Tahun" || String(a.tahun_lulus) === year;
        return matchSearch && matchProdi && matchYear;
      }),
    [alumniList, search, program, year],
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
            {programOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {yearOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
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
              {loading ? (
                <tr>
                  <td colSpan={canEdit ? 7 : 6} style={{ textAlign: "center" }}>
                    Memuat data alumni...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={canEdit ? 7 : 6}
                    style={{ textAlign: "center", color: "#dc2626" }}
                  >
                    {error}
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={canEdit ? 7 : 6} style={{ textAlign: "center" }}>
                    Belum ada data alumni.
                  </td>
                </tr>
              ) : (
                rows.map((a, i) => {
                  const status = a.status_alumni || "Aktif";
                  const photoUrl = a.foto_profil
                    ? `/storage/${a.foto_profil}`
                    : "";

                  return (
                    <tr key={a.id}>
                      <td>{String(i + 1).padStart(2, "0")}</td>
                      <td>
                        <div className="name-cell">
                          {photoUrl ? (
                            <img
                              src={photoUrl}
                              alt={`Foto ${a.nama_lengkap}`}
                            />
                          ) : (
                            <span>
                              {a.nama_lengkap
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                            </span>
                          )}
                          <strong>{a.nama_lengkap}</strong>
                        </div>
                      </td>
                      <td>{a.nim}</td>
                      <td>{a.program_studi?.nama_prodi || "-"}</td>
                      <td>{a.tahun_lulus}</td>
                      <td>
                        <b
                          className={`badge ${
                            status === "Aktif" ? "success" : "danger"
                          }`}
                        >
                          {status}
                        </b>
                      </td>
                      {canEdit && (
                        <td>
                          <TableActions
                            onEdit={() => openEdit(a)}
                            onDelete={() => handleDelete(a)}
                          />
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <p>
            Menampilkan <strong>{rows.length}</strong> dari {alumniList.length}{" "}
            data
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
