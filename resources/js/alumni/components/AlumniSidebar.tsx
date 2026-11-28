import { AlumniPage, AlumniNavItem } from "../types";
import { AlumniIcon } from "./AlumniIcon";
import { AlumniLogo } from "./AlumniLogo";

export const navItems: AlumniNavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "home" },
  { id: "profile", label: "Profil Saya", icon: "user" },
  { id: "questionnaire", label: "Kuesioner", icon: "clipboard" },
  { id: "history", label: "Riwayat", icon: "clock" },
  { id: "settings", label: "Pengaturan", icon: "settings" },
];

export function AlumniSidebar({
  page,
  setPage,
  open,
  setOpen,
  onLogout,
}: {
  page: AlumniPage;
  setPage: (page: AlumniPage) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  onLogout: () => void;
}) {
  return (
    <>
      {open && (
        <div
          className="sidebar-scrim"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside className={`sidebar ${open ? "is-open" : ""}`}>
        <div className="sidebar-top">
          <AlumniLogo />
          <button
            className="icon-button sidebar-close"
            onClick={() => setOpen(false)}
            aria-label="Tutup menu"
          >
            <AlumniIcon name="close" />
          </button>
        </div>
        <div className="nav-label">MENU UTAMA</div>
        <nav>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${page === item.id ? "active" : ""}`}
              onClick={() => {
                setPage(item.id);
                setOpen(false);
              }}
            >
              <AlumniIcon name={item.icon} size={19} />
              <span>{item.label}</span>
              {item.id === "questionnaire" && <i />}
            </button>
          ))}
        </nav>
        <div className="sidebar-help">
          <div className="help-icon">
            <AlumniIcon name="info" size={18} />
          </div>
          <strong>Butuh bantuan?</strong>
          <span>Tim kami siap membantu proses pengisianmu.</span>
          <button
            type="button"
            onClick={() => alert("Pusat Bantuan FAST:\nEmail: helpdesk@tracer.uhn.ac.id\nWhatsApp: +62 812-3456-7890")}
          >
            Hubungi Admin
          </button>
        </div>
        <button className="logout-button" onClick={onLogout}>
          <AlumniIcon name="logout" size={19} />
          Logout
        </button>
      </aside>
    </>
  );
}
