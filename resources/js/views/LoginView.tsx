import { FormEvent, useState } from "react";
import { Role } from "../types";
import { roles, campusPhoto } from "../data";
import { Brand, Button, Icon } from "../components/common";

export function LoginView({ onLogin }: { onLogin: (role: Role) => void }) {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState<Role>("super");

  const [loginId, setLoginId] = useState("superadmin");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          login_id: loginId,
          password: password,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.message || "Username atau password salah");
        return;
      }

      localStorage.setItem("token", json.data.access_token);
      onLogin(role);
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-shell">
        {/* visual block */}
        <div className="login-visual">
          <img src={campusPhoto} alt="Gedung kampus di bawah langit biru" />
          <div className="visual-overlay" />
          <div className="visual-content">
            <Brand />
            <div className="visual-copy">
              <p className="visual-description">
                Data alumni yang akurat membantu kampus menciptakan masa depan
                pendidikan yang lebih baik.
              </p>
            </div>
            <p className="photo-credit">
              Foto kampus oleh Julianto Saputra / Unsplash
            </p>
          </div>
        </div>

        {/* form block */}
        <div className="login-form-wrap">
          <form className="login-form" onSubmit={submit}>
            {/* logo mobile */}
            <div className="mobile-brand">
              <Brand />
            </div>

            {/* welcome icon + judul */}
            <span className="welcome-icon">
              <Icon name="graduation" size={24} />
            </span>
            <h2>Sistem Informasi Alumni</h2>
            <p className="login-system-name">Selamat datang</p>
            <p className="muted">
              Masuk untuk mengelola data tracer study FAST.
            </p>

            {/* username */}
            <label>
              Username
              <input
                required
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="Masukkan email atau NIM"
              />
            </label>

            {/* password */}
            <label>
              Password
              <div className="password-field">
                <input
                  required
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                />
                <button type="button" onClick={() => setShow(!show)}>
                  {show ? "Sembunyikan" : "Lihat"}
                </button>
              </div>
            </label>

            {/* role picker */}
            <fieldset className="role-picker">
              <legend>Masuk sebagai</legend>
              <div>
                {(Object.keys(roles) as Role[]).map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={role === item ? "active" : ""}
                    onClick={() => setRole(item)}
                  >
                    <b>{roles[item].short}</b>
                    <span>{roles[item].label}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* forgot + remember */}
            <div className="form-options">
              <label className="check-label">
                <input type="checkbox" defaultChecked /> Ingat saya
              </label>
              <button type="button" className="link-button">
                Lupa kata sandi?
              </button>
            </div>

            {error && <p style={{ color: "#dc2626", fontSize: "0.9rem" }}>{error}</p>}

            {/* submit button */}
            <Button type="submit" className="full-button">
              {loading ? "Memproses..." :
                <>Masuk ke dashboard <Icon name="arrow" size={17} /></>}
            </Button>

            {/* status */}
            <p className="login-note">
              <span className="status-dot" /> Sistem beroperasi dengan normal
            </p>
          </form>
        </div>
      </section>
    </main>

  );
}