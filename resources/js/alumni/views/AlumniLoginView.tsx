import { FormEvent, useState } from "react";
import { AlumniIcon } from "../components/AlumniIcon";
import { AlumniLogo } from "../components/AlumniLogo";

export function AlumniLoginView({
  onLogin,
  onSwitchToAdmin,
}: {
  onLogin: () => void;
  onSwitchToAdmin?: () => void;
}) {
  const [identifier, setIdentifier] = useState("dewa.aditya@email.com");
  const [password, setPassword] = useState("password123");
  const [remember, setRemember] = useState(true);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <main className="login-page">
      <section className="login-brand">
        <AlumniLogo />
        <div className="login-message">
          <span className="eyebrow light">PORTAL ALUMNI FAST</span>
          <h1>
            Jejakmu hari ini,
            <br />
            masa depan kampus esok.
          </h1>
          <p>
            Bagikan perjalanan kariermu dan bantu kami membangun pendidikan yang
            lebih bermakna.
          </p>
        </div>
        <div className="brand-footer">
          Fakultas Sains dan Teknologi <span>·</span> Universitas HKBP Nommensen
        </div>
      </section>
      <section className="login-panel">
        <form className="login-form" onSubmit={submit}>
          <span className="eyebrow">SELAMAT DATANG</span>
          <h1>Masuk ke akun alumni</h1>
          <p>Lanjutkan kontribusimu bersama keluarga besar FAST.</p>
          <label>
            Email atau NIM
            <input
              type="text"
              placeholder="Masukkan email atau NIM"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </label>
          <label>
            Kata sandi
            <input
              type="password"
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />{" "}
              Ingat saya
            </label>
            <button
              type="button"
              onClick={() => alert("Silakan hubungi admin prodi untuk reset password.")}
            >
              Lupa kata sandi?
            </button>
          </div>
          <button className="primary-button login-button" type="submit">
            Masuk ke portal <AlumniIcon name="arrow" size={18} />
          </button>
          <small>
            Belum memiliki akun?{" "}
            <button
              type="button"
              onClick={() =>
                alert("Pendaftaran akun alumni dikelola oleh Fakultas dan Program Studi.")
              }
            >
              Hubungi admin program studi
            </button>
          </small>

          {onSwitchToAdmin && (
            <div
              style={{
                marginTop: "24px",
                paddingTop: "16px",
                borderTop: "1px solid var(--line)",
                textAlign: "center",
              }}
            >
              <button
                type="button"
                className="secondary-button"
                style={{ width: "100%", fontSize: "11px" }}
                onClick={onSwitchToAdmin}
              >
                Masuk sebagai Pengelola / Admin
              </button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
