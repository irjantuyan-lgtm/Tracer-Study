import { useMemo, useState } from "react";
import { AlumniPage } from "./types";
import { AlumniSidebar, navItems } from "./components/AlumniSidebar";
import { AlumniTopbar } from "./components/AlumniTopbar";
import { AlumniDashboardView } from "./views/AlumniDashboardView";
import { AlumniProfileView } from "./views/AlumniProfileView";
import { AlumniQuestionnaireView } from "./views/AlumniQuestionnaireView";
import { AlumniHistoryView } from "./views/AlumniHistoryView";
import { AlumniSettingsView } from "./views/AlumniSettingsView";
import { AlumniLoginView } from "./views/AlumniLoginView";
import "./alumni.css";

export interface AlumniAppProps {
  initialLoggedIn?: boolean;
  onLogout?: () => void;
  onSwitchPortal?: () => void;
}

export function AlumniApp({
  initialLoggedIn = true,
  onLogout,
  onSwitchPortal,
}: AlumniAppProps) {
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);
  const [page, setPage] = useState<AlumniPage>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const title = useMemo(
    () => navItems.find((item) => item.id === page)?.label ?? "Dashboard",
    [page]
  );

  const handleLogout = () => {
    setLoggedIn(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="alumni-portal">
      {!loggedIn ? (
        <AlumniLoginView
          onLogin={() => {
            setLoggedIn(true);
            setPage("dashboard");
          }}
          onSwitchToAdmin={onSwitchPortal}
        />
      ) : (
        <div className="app-shell">
          <AlumniSidebar
            page={page}
            setPage={setPage}
            open={menuOpen}
            setOpen={setMenuOpen}
            onLogout={handleLogout}
          />
          <main className="main-area">
            <AlumniTopbar
              title={title}
              onMenu={() => setMenuOpen(true)}
            />
            {page === "dashboard" && <AlumniDashboardView navigate={setPage} />}
            {page === "profile" && <AlumniProfileView />}
            {page === "questionnaire" && <AlumniQuestionnaireView />}
            {page === "history" && <AlumniHistoryView navigate={setPage} />}
            {page === "settings" && <AlumniSettingsView />}
          </main>
        </div>
      )}
    </div>
  );
}

export default AlumniApp;
