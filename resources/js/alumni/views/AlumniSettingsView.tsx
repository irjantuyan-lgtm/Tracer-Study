import { useState } from "react";
import { AlumniIcon } from "../components/AlumniIcon";

export function AlumniSettingsView() {
  const [email, setEmail] = useState(true);
  const [reminder, setReminder] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  return (
    <div className="page-content narrow">
      <div className="page-heading">
        <div>
          <span className="eyebrow">PREFERENSI</span>
          <h1>Pengaturan</h1>
          <p>Atur notifikasi dan keamanan akunmu.</p>
        </div>
      </div>

      {toast && (
        <div className="toast">
          <AlumniIcon name="check" size={17} /> {toast}
        </div>
      )}

      <section className="settings-card card">
        <h2>Notifikasi</h2>
        <p>Pilih informasi yang ingin kamu terima.</p>
        <div className="setting-row">
          <span>
            <b>Notifikasi email</b>
            <small>Informasi periode dan pembaruan tracer study.</small>
          </span>
          <button
            type="button"
            className={`toggle ${email ? "on" : ""}`}
            onClick={() => {
              setEmail(!email);
              showToast(
                !email
                  ? "Notifikasi email diaktifkan"
                  : "Notifikasi email dinonaktifkan"
              );
            }}
            aria-label="Notifikasi email"
          >
            <i />
          </button>
        </div>
        <div className="setting-row">
          <span>
            <b>Pengingat kuesioner</b>
            <small>Pengingat berkala sebelum batas pengisian.</small>
          </span>
          <button
            type="button"
            className={`toggle ${reminder ? "on" : ""}`}
            onClick={() => {
              setReminder(!reminder);
              showToast(
                !reminder
                  ? "Pengingat kuesioner diaktifkan"
                  : "Pengingat kuesioner dinonaktifkan"
              );
            }}
            aria-label="Pengingat kuesioner"
          >
            <i />
          </button>
        </div>
      </section>

      <section className="settings-card card">
        <h2>Keamanan akun</h2>
        <p>Jaga akunmu tetap aman.</p>
        <div className="setting-row">
          <span>
            <b>Kata sandi</b>
            <small>Terakhir diubah 3 bulan lalu.</small>
          </span>
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              showToast("Tautan reset kata sandi telah dikirim ke emailmu.");
            }}
          >
            Ubah kata sandi
          </button>
        </div>
      </section>
    </div>
  );
}
