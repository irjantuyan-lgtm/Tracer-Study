import { Page, Role } from "../types";
import { roles } from "../data";
import { Icon, StatCard } from "../components/common";

export function DashboardView({
  navigate,
  role,
}: {
  navigate: (page: Page) => void;
  role: Role;
}) {
  const bars = [54, 68, 61, 73, 87, 72, 78, 91, 83, 88, 79, 72];

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
          <strong>2025 — 2026</strong>
        </div>
      </div>
      <section className="stats-grid">
        <StatCard
          icon="users"
          color="orange"
          label="Total Alumni"
          value="2.543"
          detail="Data alumni terdaftar"
        />
        <StatCard
          icon="clipboard"
          color="blue"
          label="Sudah Mengisi"
          value="1.827"
          detail="72% dari total alumni"
        />
        <StatCard
          icon="check"
          color="green"
          label="Belum Mengisi"
          value="716"
          detail="28% perlu diingatkan"
        />
        <StatCard
          icon="graduation"
          color="purple"
          label="Periode Aktif"
          value="2025–26"
          detail="Tracer Study berjalan"
        />
      </section>
      <section className="dashboard-grid">
        <article className="panel participation-panel">
          <div className="panel-head">
            <div>
              <h2>Tingkat Partisipasi Alumni</h2>
              <p>Jumlah respon sepanjang 2025</p>
            </div>
            <button className="text-action" onClick={() => navigate("report")}>
              Lihat laporan <Icon name="arrow" size={15} />
            </button>
          </div>
          <div className="bar-chart">
            {bars.map((height, index) => (
              <div className="bar-item" key={index}>
                <div className="bar-track grouped">
                  <span
                    className="filled"
                    title={`Sudah mengisi ${height}%`}
                    style={{ height: `${height}%` }}
                  />
                  <span
                    className="unfilled"
                    title={`Belum mengisi ${100 - height}%`}
                    style={{ height: `${100 - height}%` }}
                  />
                </div>
                <small>
                  {
                    [
                      "Sudah Mengisi",
                      "Belum Mengisi",
                    ][index]
                  }
                </small>

              </div>
            ))}
          </div>
          <div className="chart-summary">
            <span>
              <strong>+12,8%</strong> dibanding periode sebelumnya
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
              <p>Progres periode 2025–2026</p>
            </div>
            <button className="more-button">•••</button>
          </div>
          <div className="donut-wrap">
            <div className="donut participation-donut">
              <div>
                <strong>72%</strong>
                <small>Terisi</small>
              </div>
            </div>
            <div className="legend-list">
              <span>
                <i className="orange-dot" />
                Sudah mengisi <b>1.827</b>
              </span>
              <span>
                <i className="blue-dot" />
                Belum mengisi <b>716</b>
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
