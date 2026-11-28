import { PageIntro, Button, Icon } from "../components/common";

export function SettingsView() {
  return (
    <>
      <PageIntro
        eyebrow="KONFIGURASI SISTEM"
        title="Pengaturan"
        description="Kelola profil fakultas dan preferensi sistem."
      />
      <section className="settings-grid">
        <article className="panel settings-card">
          <span>
            <Icon name="users" />
          </span>
          <div>
            <h2>Profil Fakultas</h2>
            <p>Perbarui nama, identitas, dan kontak fakultas.</p>
          </div>
          <Button variant="secondary">Kelola</Button>
        </article>
        <article className="panel settings-card">
          <span>
            <Icon name="bell" />
          </span>
          <div>
            <h2>Notifikasi</h2>
            <p>Atur pengingat pengisian kuesioner alumni.</p>
          </div>
          <Button variant="secondary">Kelola</Button>
        </article>
        <article className="panel settings-card">
          <span>
            <Icon name="settings" />
          </span>
          <div>
            <h2>Integrasi Data</h2>
            <p>Hubungkan sistem akademik dan data alumni.</p>
          </div>
          <Button variant="secondary">Kelola</Button>
        </article>
      </section>
    </>
  );
}
