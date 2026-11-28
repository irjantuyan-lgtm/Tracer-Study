import { Page, Role } from "../../types";
import { nav } from "../../data";
import { Icon, Brand } from "../common";

export function visibleNav(role: Role) {
  if (role === "super") return nav;
  if (role === "faculty")
    return nav.filter((item) =>
      [
        "dashboard",
        "alumni",
        "questionnaires",
        "report",
        "lecturers",
        "programs",
        "users",
        "logs",
        "settings",
      ].includes(item.id),
    );
  return nav.filter((item) =>
    [
      "dashboard",
      "alumni",
      "questionnaires",
      "report",
      "lecturers",
      "employees",
      "programs",
      "logs",
      "settings",
    ].includes(item.id),
  );
}

export function Sidebar({
  page,
  onChange,
  mobileOpen,
  close,
  role,
  logout,
}: {
  page: Page;
  onChange: (p: Page) => void;
  mobileOpen: boolean;
  close: () => void;
  role: Role;
  logout: () => void;
}) {
  const items = visibleNav(role);
  return (
    <>
      <div
        className={`sidebar-backdrop ${mobileOpen ? "show" : ""}`}
        onClick={close}
      />
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <Brand />
          <button className="close-menu" onClick={close}>
            <Icon name="close" />
          </button>
        </div>
        <p className="nav-label">MENU UTAMA</p>
        <nav>
          {items
            .filter((item) => item.id !== "settings")
            .map((item) => (
              <button
                key={item.id}
                className={page === item.id ? "active" : ""}
                onClick={() => {
                  onChange(item.id);
                  close();
                }}
              >
                <Icon name={item.icon} />
                {item.label}
              </button>
            ))}
        </nav>
        <div className="sidebar-bottom">
          <p className="nav-label">LAINNYA</p>
          <button
            className={page === "settings" ? "active" : ""}
            onClick={() => {
              onChange("settings");
              close();
            }}
          >
            <Icon name="settings" />
            Pengaturan
          </button>
          <button className="sidebar-logout" onClick={logout}>
            <Icon name="arrow" />
            Logout
          </button>
          <div className="support-card">
            <span>
              <Icon name="bell" size={17} />
            </span>
            <strong>Butuh bantuan?</strong>
            <small>Hubungi tim sistem informasi</small>
          </div>
          <p className="version">FAST Admin v2.4.0</p>
        </div>
      </aside>
    </>
  );
}
