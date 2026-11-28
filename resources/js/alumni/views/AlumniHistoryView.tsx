import { AlumniPage } from "../types";
import { AlumniIcon } from "../components/AlumniIcon";

export function AlumniHistoryView({
  navigate,
}: {
  navigate: (page: AlumniPage) => void;
}) {
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">AKTIVITAS ALUMNI</span>
          <h1>Riwayat Kuesioner</h1>
          <p>Pantau status pengisian dari setiap periode.</p>
        </div>
      </div>
      <div className="history-list">
        <article className="history-card card">
          <span className="card-icon orange">
            <AlumniIcon name="clipboard" />
          </span>
          <div>
            <span className="status-pill pending">Belum diisi</span>
            <h2>Tracer Study 2024–2025</h2>
            <p>Periode pengisian 1 Jan – 31 Des 2025</p>
          </div>
          <button
            className="primary-button"
            onClick={() => navigate("questionnaire")}
          >
            Isi sekarang <AlumniIcon name="arrow" size={16} />
          </button>
        </article>
        <article className="history-card card muted">
          <span className="card-icon green">
            <AlumniIcon name="check" />
          </span>
          <div>
            <span className="status-pill completed">Selesai</span>
            <h2>Tracer Study 2023–2024</h2>
            <p>Dikirim pada 18 November 2024</p>
          </div>
          <button
            className="secondary-button"
            onClick={() =>
              alert(
                "Ringkasan Jawaban Periode 2023–2024:\n• Aktivitas: Bekerja penuh waktu (PT Nusantara Digital)\n• Waktu tunggu: 2 bulan\n• Kesesuaian studi: Sangat sesuai\nStatus: Terverifikasi oleh Admin Prodi"
              )
            }
          >
            Lihat ringkasan
          </button>
        </article>
      </div>
    </div>
  );
}
