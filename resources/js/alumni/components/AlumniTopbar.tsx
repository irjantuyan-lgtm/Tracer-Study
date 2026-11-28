import { useState } from "react";
import { AlumniIcon } from "./AlumniIcon";

export function AlumniTopbar({
  title,
  onMenu,
}: {
  title: string;
  onMenu: () => void;
}) {
  const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <header className="topbar">
      <div className="topbar-title">
        <button
          className="icon-button mobile-menu"
          onClick={onMenu}
          aria-label="Buka menu"
        >
          <AlumniIcon name="menu" />
        </button>
        <div>
          <span>Portal Alumni</span>
          <strong>{title}</strong>
        </div>
      </div>
      <div className="topbar-actions">
        <div className="notification-wrap">
          <button
            className="icon-button notification"
            onClick={() => setNotificationOpen(!notificationOpen)}
            aria-label="Notifikasi"
          >
            <AlumniIcon name="bell" />
            <i />
          </button>
          {notificationOpen && (
            <div className="notification-popover">
              <strong>Notifikasi</strong>
              <div>
                <span className="mini-icon">
                  <AlumniIcon name="clipboard" size={17} />
                </span>
                <p>
                  <b>Kuesioner tersedia</b>
                  <small>Lengkapi sebelum 31 Des 2025</small>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="profile-chip">
          <div className="avatar">DA</div>
          <div>
            <strong>Dewa Aditya</strong>
            <span>
              <i className="account-dot" /> Aktif · Alumni 2024
            </span>
          </div>
          <AlumniIcon name="chevron" size={15} />
        </div>
      </div>
    </header>
  );
}
