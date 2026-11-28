import { AlumniPage } from "../types";
import { AlumniIcon } from "../components/AlumniIcon";

export function AlumniDashboardView({
  navigate,
}: {
  navigate: (page: AlumniPage) => void;
}) {
  return (
    <div className="page-content">
      <section className="welcome">
        <div>
          <span className="eyebrow">SELAMAT DATANG KEMBALI</span>
          <h1>
            Halo, Dewa! <span>Senang melihatmu.</span>
          </h1>
          <p>
            Kontribusimu membantu kampus memahami perjalanan alumni dan
            menyiapkan generasi berikutnya.
          </p>
        </div>
      </section>

      <section className="period-feature card">
        <div className="period-feature-main">
          <div className="period-top">
            <div className="card-icon orange">
              <AlumniIcon name="calendar" />
            </div>
            <span className="status-pill active">Periode aktif</span>
          </div>
          <span className="eyebrow">TRACER STUDY 2024–2025</span>
          <h2>Ceritakan perjalananmu setelah lulus.</h2>
          <p>
            Bagikan perkembangan terbaru untuk membantu kampus menyusun
            kurikulum dan layanan alumni yang lebih relevan.
          </p>
        </div>
        <div className="period-feature-side">
          <div className="period-metrics">
            <div>
              <span>Tahun periode</span>
              <strong>2024–2025</strong>
            </div>
            <div>
              <span>Batas pengisian</span>
              <strong>31 Des 2025</strong>
            </div>
          </div>
          <button
            className="primary-button"
            onClick={() => navigate("questionnaire")}
          >
            Mulai Kuesioner <AlumniIcon name="arrow" size={18} />
          </button>
        </div>
      </section>

      <section className="section-block">
        <div className="section-title">
          <div>
            <span className="eyebrow">RINGKASAN AKUN</span>
            <h2>Yang perlu kamu selesaikan</h2>
          </div>
          <span className="updated">Diperbarui hari ini, 09.42</span>
        </div>
        <div className="status-grid">
          <article
            className="status-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("profile")}
          >
            <div className="card-icon green">
              <AlumniIcon name="user" />
            </div>
            <div>
              <span>Kelengkapan profil</span>
              <strong className="text-green">100% lengkap</strong>
              <p>Terakhir diperbarui 10 Okt</p>
            </div>
            <AlumniIcon name="check" size={18} />
          </article>
          <article
            className="status-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("questionnaire")}
          >
            <div className="card-icon red">
              <AlumniIcon name="clipboard" />
            </div>
            <div>
              <span>Status kuesioner</span>
              <strong className="text-red">Belum diisi</strong>
              <p>Data periode 2024–2025</p>
            </div>
            <AlumniIcon name="chevron" size={18} />
          </article>
          <article
            className="status-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("history")}
          >
            <div className="card-icon blue">
              <AlumniIcon name="calendar" />
            </div>
            <div>
              <span>Status periode</span>
              <strong className="text-blue">Sedang aktif</strong>
              <p>Periode 2024–2025 · berakhir 31 Des</p>
            </div>
            <AlumniIcon name="check" size={18} />
          </article>
        </div>
      </section>

      <section className="info-banner">
        <div className="card-icon orange">
          <AlumniIcon name="book" />
        </div>
        <div>
          <strong>Mengapa data alumni penting?</strong>
          <p>
            Jawabanmu menjadi dasar pengembangan kurikulum dan layanan karier
            agar tetap relevan dengan dunia kerja.
          </p>
        </div>
        <button
          type="button"
          onClick={() =>
            alert(
              "Data tracer study dianalisis secara agregat untuk keperluan akreditasi kampus dan peningkatan mutu lulusan. Kerahasiaan data individual dijamin sepenuhnya."
            )
          }
        >
          Pelajari selengkapnya <AlumniIcon name="arrow" size={16} />
        </button>
      </section>
    </div>
  );
}
