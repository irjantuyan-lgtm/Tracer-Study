import { useEffect, useState } from "react";
import { Page, Role } from "../types";
import { roles } from "../data";
import { Icon, StatCard } from "../components/common";

interface DashboardStats {
  periode_aktif: string;
  total_alumni: number;
  sudah_mengisi: number;
  belum_mengisi: number;
  persentase_selesai: number;
}

export function DashboardView({
  navigate,
  role,
}: {
  navigate: (page: Page) => void;
  role: Role;
}) {
  const [stats, setStats] = useState<DashboardStats>({
    periode_aktif: "-",
    total_alumni: 0,
    sudah_mengisi: 0,
    belum_mengisi: 0,
    persentase_selesai: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");

    fetch("/api/dashboard/statistik", {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.message || "Gagal memuat statistik dashboard");
        }
        return json;
      })
      .then((json) => {
        if (json.status === "success" && json.data) {
          setStats({
            periode_aktif: json.data.periode_aktif,
            ...json.data.statistik_partisipasi,
          });
        }
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") {
          setError(err.message || "Gagal terhubung ke server");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  const belumPersen =
    stats.total_alumni > 0
      ? Math.round((100 - stats.persentase_selesai) * 10) / 10
      : 0;
  const bars = [
    { label: "Sudah Mengisi", filled: stats.persentase_selesai, unfilled: 0 },
    { label: "Belum Mengisi", filled: 0, unfilled: belumPersen },
  ];

  return (
    <>
      <div className="hero-heading">
        <div>
          <p className="eyebrow">RINGKASAN HARI INI</p>
          <h1>Halo, {roles[role].greeting}</h1>
          <p>Berikut perkembangan tracer study yang perlu Anda ketahui.</p>
        </div>
        <div className="date-pill">
          <span>Periode aktif</span>
          <strong>{loading ? "..." : stats.periode_aktif}</strong>
        </div>
      </div>
      {error && (
        <p style={{ color: "#dc2626", marginBottom: "1rem", fontSize: "0.95rem" }}>
          {error}
        </p>
      )}
      <section className="stats-grid">
        <StatCard
          icon="users"
          color="orange"
          label="Total Alumni"
          value={loading ? "..." : stats.total_alumni.toLocaleString("id-ID")}
          detail="Data alumni terdaftar"
        />
        <StatCard
          icon="clipboard"
          color="blue"
          label="Sudah Mengisi"
          value={loading ? "..." : stats.sudah_mengisi.toLocaleString("id-ID")}
          detail={`${stats.persentase_selesai}% dari total alumni`}
        />
        <StatCard
          icon="check"
          color="green"
          label="Belum Mengisi"
          value={loading ? "..." : stats.belum_mengisi.toLocaleString("id-ID")}
          detail={`${belumPersen}% perlu diingatkan`}
        />
        <StatCard
          icon="graduation"
          color="purple"
          label="Periode Aktif"
          value={loading ? "..." : stats.periode_aktif}
          detail="Tracer Study berjalan"
        />
      </section>
      <section className="dashboard-grid">
        <article className="panel participation-panel">
          <div className="panel-head">
            <div>
              <h2>Tingkat Partisipasi Alumni</h2>
              <p>Ringkasan progres periode {stats.periode_aktif}</p>
            </div>
            <button className="text-action" onClick={() => navigate("report")}>
              Lihat laporan <Icon name="arrow" size={15} />
            </button>
          </div>
          <div className="bar-chart">
            {bars.map((bar) => (
              <div className="bar-item" key={bar.label}>
                <div className="bar-track grouped">
                  <span
                    className="filled"
                    title={`Sudah mengisi ${bar.filled}%`}
                    style={{ height: `${bar.filled}%` }}
                  />
                  <span
                    className="unfilled"
                    title={`Belum mengisi ${bar.unfilled}%`}
                    style={{ height: `${bar.unfilled}%` }}
                  />
                </div>
                <small>{bar.label}</small>
              </div>
            ))}
          </div>
          <div className="chart-summary">
            <span>
              <strong>{stats.persentase_selesai}%</strong> tingkat partisipasi saat ini
            </span>
            <span className="chart-legends">
              <span className="legend">
                <i /> Sudah mengisi
              </span>
              <span className="legend unfilled-legend">
                <i /> Belum mengisi
              </span>
            </span>
          </div>
        </article>
        <article className="panel employment-panel">
          <div className="panel-head">
            <div>
              <h2>Partisipasi Kuesioner</h2>
              <p>Progres periode {stats.periode_aktif}</p>
            </div>
            <button className="more-button">•••</button>
          </div>
          <div className="donut-wrap">
            <div className="donut participation-donut">
              <div>
                <strong>{stats.persentase_selesai}%</strong>
                <small>Terisi</small>
              </div>
            </div>
            <div className="legend-list">
              <span>
                <i className="orange-dot" />
                Sudah mengisi <b>{stats.sudah_mengisi.toLocaleString("id-ID")}</b>
              </span>
              <span>
                <i className="blue-dot" />
                Belum mengisi <b>{stats.belum_mengisi.toLocaleString("id-ID")}</b>
              </span>
            </div>
          </div>
        </article>
      </section>
      <section className="panel activity-panel">
        <div className="panel-head">
          <div>
            <h2>Aktivitas terbaru</h2>
            <p>Pembaruan data dalam 24 jam terakhir</p>
          </div>
          <button className="text-action" onClick={() => navigate("logs")}>
            Lihat semua <Icon name="arrow" size={15} />
          </button>
        </div>
        <div className="activity-list">
          <div>
            <span className="activity-icon green">
              <Icon name="check" />
            </span>
            <p>
              <strong>Nadia Sari</strong> menyelesaikan kuesioner tracer study.
              <small>12 menit yang lalu</small>
            </p>
            <b className="badge success">Selesai</b>
          </div>
          <div>
            <span className="activity-icon blue">
              <Icon name="users" />
            </span>
            <p>
              <strong>18 data alumni baru</strong> berhasil diimpor ke sistem.
              <small>1 jam yang lalu</small>
            </p>
            <b className="badge info">Data baru</b>
          </div>
          <div>
            <span className="activity-icon orange">
              <Icon name="clipboard" />
            </span>
            <p>
              <strong>Kuesioner 2025</strong> diperbarui oleh Super Admin.
              <small>3 jam yang lalu</small>
            </p>
            <b className="badge warning">Diperbarui</b>
          </div>
        </div>
      </section>
    </>
  );
}
