import { useState } from "react";
import { AlumniIcon } from "../components/AlumniIcon";

export function AlumniQuestionnaireView() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState({
    activity: "",
    waitingTime: "",
    relevance: "",
    curriculumFeedback: "",
    satisfaction: "",
  });

  const steps = ["Data Pribadi", "Kuesioner", "Umpan Balik"];

  const setAnswer = (key: keyof typeof answers, value: string) => {
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  if (submitted) {
    return (
      <div className="page-content">
        <div className="success-state card">
          <div className="success-mark">
            <AlumniIcon name="check" size={42} />
          </div>
          <span className="eyebrow">BERHASIL TERKIRIM</span>
          <h1>Terima kasih atas kontribusimu!</h1>
          <p>
            Jawabanmu telah tersimpan dan membantu FAST membangun pendidikan
            yang lebih relevan.
          </p>
          <button
            className="primary-button"
            onClick={() => {
              setSubmitted(false);
              setStep(1);
            }}
          >
            Lihat jawaban
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="questionnaire-head">
        <div>
          <span className="eyebrow">TRACER STUDY 2024–2025</span>
          <h1>Kuesioner Alumni</h1>
          <p>Isi sesuai kondisi terkini. Jawabanmu tersimpan otomatis.</p>
        </div>
        <div className="save-badge">
          <AlumniIcon name="check" size={16} /> Tersimpan otomatis
        </div>
      </div>

      <div className="stepper card">
        {steps.map((label, index) => (
          <div
            key={label}
            className={`step ${step >= index + 1 ? "active" : ""}`}
          >
            <span>
              {step > index + 1 ? (
                <AlumniIcon name="check" size={15} />
              ) : (
                index + 1
              )}
            </span>
            <b>{label}</b>
          </div>
        ))}
      </div>

      <div className="question-card card">
        <div className="question-count">
          Bagian {step} dari 3 <span>{Math.round((step / 3) * 100)}% selesai</span>
        </div>

        {step === 1 ? (
          <div className="form-grid">
            <label className="full">
              Nama lengkap
              <input value="Dewa Gedhe Putra Aditya" readOnly />
            </label>
            <label>
              NIM
              <input value="42100001" readOnly />
            </label>
            <label>
              Tahun lulus
              <input value="2024" readOnly />
            </label>
            <label>
              Program studi
              <select defaultValue="Informatika">
                <option>Informatika</option>
                <option>Sistem Informasi</option>
                <option>Teknik Elektro</option>
              </select>
            </label>
            <label>
              Nomor WhatsApp
              <input defaultValue="0812 3456 7890" />
            </label>
            <div className="locked-note full">
              <AlumniIcon name="info" size={17} /> Data akademik dikunci. Hubungi
              admin jika ada ketidaksesuaian.
            </div>
          </div>
        ) : step === 2 ? (
          <div className="questions">
            <fieldset>
              <legend>Apa aktivitas utamamu saat ini?</legend>
              <div className="option-grid">
                {[
                  "Bekerja penuh waktu",
                  "Wiraswasta",
                  "Melanjutkan studi",
                  "Belum bekerja",
                ].map((option) => (
                  <label
                    key={option}
                    className={answers.activity === option ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name="activity"
                      value={option}
                      checked={answers.activity === option}
                      onChange={() => setAnswer("activity", option)}
                    />
                    {option}
                    <i>
                      <AlumniIcon name="check" size={13} />
                    </i>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>
                Berapa lama waktu yang dibutuhkan untuk mendapat pekerjaan
                pertama?
              </legend>
              <div className="option-grid">
                {[
                  "Sebelum lulus",
                  "Kurang dari 3 bulan",
                  "3–6 bulan",
                  "Lebih dari 6 bulan",
                ].map((option) => (
                  <label
                    key={option}
                    className={answers.waitingTime === option ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name="waitingTime"
                      value={option}
                      checked={answers.waitingTime === option}
                      onChange={() => setAnswer("waitingTime", option)}
                    />
                    {option}
                    <i>
                      <AlumniIcon name="check" size={13} />
                    </i>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Seberapa sesuai pekerjaanmu dengan bidang studi?</legend>
              <div className="option-grid">
                {[
                  "Sangat sesuai",
                  "Sesuai",
                  "Cukup sesuai",
                  "Tidak sesuai",
                ].map((option) => (
                  <label
                    key={option}
                    className={answers.relevance === option ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name="relevance"
                      value={option}
                      checked={answers.relevance === option}
                      onChange={() => setAnswer("relevance", option)}
                    />
                    {option}
                    <i>
                      <AlumniIcon name="check" size={13} />
                    </i>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        ) : (
          <div className="feedback-panel">
            <span className="card-icon orange">
              <AlumniIcon name="book" />
            </span>
            <h2>Umpan balik untuk kampus</h2>
            <p>Ceritakan pengalaman dan saranmu untuk FAST.</p>
            <label>
              Saran untuk pengembangan kurikulum
              <textarea
                placeholder="Tuliskan jawabanmu di sini..."
                value={answers.curriculumFeedback}
                onChange={(e) =>
                  setAnswer("curriculumFeedback", e.target.value)
                }
              />
            </label>
            <label>
              Tingkat kepuasan secara keseluruhan
              <select
                value={answers.satisfaction}
                onChange={(e) => setAnswer("satisfaction", e.target.value)}
              >
                <option value="" disabled>
                  Pilih penilaian
                </option>
                <option>Sangat puas</option>
                <option>Puas</option>
                <option>Cukup puas</option>
                <option>Kurang puas</option>
              </select>
            </label>
          </div>
        )}

        <div className="form-actions">
          <button
            className="secondary-button"
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
          >
            Kembali
          </button>
          <button
            className="primary-button"
            onClick={() =>
              step === 3 ? setSubmitted(true) : setStep(step + 1)
            }
          >
            {step === 3 ? "Kirim jawaban" : "Lanjutkan"}{" "}
            <AlumniIcon name="arrow" size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
