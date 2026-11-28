import { Role } from "../types";
import { PageIntro, Button, StatCard } from "../components/common";

export function ReportView({ notify, role }: { notify: (s: string) => void; role: Role }) {
  return (
    <>
      <PageIntro
        eyebrow="ANALITIK TRACER STUDY"
        title="Laporan Progres Kuesioner"
        description="Progres alumni yang sudah dan belum mengisi untuk evaluasi dan akreditasi."
        action={
          role === "faculty" ? (
            <b className="badge info large">Mode Lihat</b>
          ) : (
            <div className="action-row">
              <Button
                variant="secondary"
                icon="download"
                onClick={() => notify("Laporan Excel sedang disiapkan")}
              >
                Excel
              </Button>
              <Button
                icon="download"
                onClick={() =>
                  notify("PDF progres kuesioner beserta grafik berhasil dibuat")
                }
              >
                Cetak PDF
              </Button>
            </div>
          )
        }
      />
      <section className="filter-strip">
        <label>
          Periode
          <select>
            <option>2025–2026</option>
            <option>2024–2025</option>
          </select>
        </label>
        <label>
          Program Studi
          <select>
            <option>Semua Program Studi</option>
            <option>Informatika</option>
          </select>
        </label>
        <Button onClick={() => notify("Filter laporan diterapkan")}>
          Terapkan Filter
        </Button>
        <span>Terakhir diperbarui: 18 Feb 2025, 09:42</span>
      </section>
      <section className="stats-grid report-stats">
        <StatCard
          icon="users"
          color="orange"
          label="Total Alumni"
          value="2.543"
          detail="100% data terverifikasi"
        />
        <StatCard
          icon="check"
          color="green"
          label="Sudah Mengisi"
          value="1.827"
          detail="Tingkat respons 72%"
        />
        <StatCard
          icon="clipboard"
          color="blue"
          label="Belum Mengisi"
          value="716"
          detail="28% perlu ditindaklanjuti"
        />
        <StatCard
          icon="graduation"
          color="purple"
          label="Tingkat Partisipasi"
          value="72%"
          detail="Naik 12,8% dari periode lalu"
        />
      </section>
      <section className="report-grid">
        <article className="panel report-chart">
          <div className="panel-head">
            <div>
              <h2>Progres per Program Studi</h2>
              <p>Persentase alumni yang sudah mengisi kuesioner</p>
            </div>
            <b className="badge info">1.827 respons</b>
          </div>
          <div className="big-bars">
            {[
              ["Informatika", 82],
              ["Sistem Informasi", 74],
              ["Teknologi Informasi", 61],
              ["Teknik Elektro", 68],
            ].map(([label, n]) => (
              <div key={label}>
                <span>{n}%</span>
                <div>
                  <i style={{ height: `${Number(n) * 2.8}px` }} />
                </div>
                <small>{label}</small>
              </div>
            ))}
          </div>
        </article>
        <article className="panel donut-report">
          <div className="panel-head">
            <div>
              <h2>Tingkat Partisipasi</h2>
              <p>Sudah dan belum mengisi</p>
            </div>
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
                <i className="green-dot" />
                Sudah mengisi <b>1.827</b>
              </span>
              <span>
                <i className="orange-dot" />
                Belum mengisi <b>716</b>
              </span>
            </div>
          </div>
        </article>
        <article className="panel education-panel">
          <div className="panel-head">
            <div>
              <h2>Status Pengisian</h2>
              <p>Distribusi progres kuesioner</p>
            </div>
          </div>
          <div className="education-visual">
            <div className="pie progress-pie" />
            <div className="legend-list">
              <span>
                <i className="orange-dot" />
                Lengkap <b>64%</b>
              </span>
              <span>
                <i className="blue-dot" />
                Draf <b>8%</b>
              </span>
              <span>
                <i className="gray-dot" />
                Belum mulai <b>28%</b>
              </span>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
