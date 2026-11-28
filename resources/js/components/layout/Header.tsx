import React from "react";
import { Role } from "../../types";
import { roles } from "../../data";
import { Icon } from "../common";

export interface HeaderProps {
  title: string;
  menu?: () => void;
  role?: Role;
  subtitle?: string;
  breadcrumbs?: { label: string; onClick?: () => void }[];
  actions?: React.ReactNode;
  onSwitchToAlumni?: () => void;
}

export function Header({
  title,
  menu,
  role,
  subtitle,
  breadcrumbs,
  actions,
  onSwitchToAlumni,
}: HeaderProps) {
  // Jika dipanggil dari DetailView / HomeView (dengan breadcrumbs / subtitle / actions)
  if (breadcrumbs || subtitle || actions) {
    return (
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="mb-1 flex items-center gap-1.5 text-xs text-gray-400">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span>/</span>}
                  {crumb.onClick ? (
                    <button
                      onClick={crumb.onClick}
                      className="hover:text-blue-600 transition-colors text-gray-500"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-gray-800 font-medium">
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2.5">{actions}</div>}
      </div>
    );
  }

  // Jika dipanggil sebagai Topbar layout utama (dengan role & menu)
  const currentRole = role || "super";

  return (
    <header className="topbar">
      <div className="header-title">
        {menu && (
          <button className="menu-button" onClick={menu}>
            <Icon name="menu" />
          </button>
        )}
        <div>
          <p>{roles[currentRole].label}</p>
          <strong>{title}</strong>
        </div>
      </div>
      <div className="profile-area">
        {onSwitchToAlumni && (
          <button
            type="button"
            className="btn btn-secondary"
            style={{ fontSize: "10px", padding: "6px 12px", minHeight: "32px" }}
            onClick={onSwitchToAlumni}
            title="Buka tampilan Portal Alumni"
          >
            Portal Alumni
          </button>
        )}
        <button className="notification">
          <Icon name="bell" />
          <span />
        </button>
        <div className="profile">
          <div className="avatar">{roles[currentRole].short}</div>
          <div>
            <strong>{roles[currentRole].label}</strong>
            <small>{roles[currentRole].scope}</small>
          </div>
          <Icon name="chevron" size={15} />
        </div>
      </div>
    </header>
  );
}
