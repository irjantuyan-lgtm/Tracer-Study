import { useState } from "react";
import { Page, Role, ModalData } from "./types";
import { nav } from "./data";
import { Icon, Modal } from "./components/common";
import { Sidebar, Header } from "./components/layout";
import { AlumniApp } from "./alumni";
import {
  LoginView,
  DashboardView,
  AlumniView,
  QuestionnairesView,
  QuestionnaireDetailView,
  ReportView,
  DirectoryView,
  UserManagementView,
  ActivityLogsView,
  SettingsView,
} from "./views";

export default function App() {
  const isAlumniUrl =
    typeof window !== "undefined" &&
    (window.location.pathname.startsWith("/alumni") ||
      new URLSearchParams(window.location.search).get("portal") === "alumni");

  const [portal, setPortal] = useState<"admin" | "alumni">(() =>
    isAlumniUrl ? "alumni" : "admin"
  );
  const [loggedIn, setLoggedIn] = useState(isAlumniUrl);
  const [role, setRole] = useState<Role>(isAlumniUrl ? "alumni" : "super");
  const [page, setPage] = useState<Page>("dashboard");
  const [detail, setDetail] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modal, setModal] = useState<null | ModalData>(null);
  const [alumniRefreshKey, setAlumniRefreshKey] = useState(0);
  const [toast, setToast] = useState("");

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const changePage = (next: Page) => {
    setPage(next);
    setDetail(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Jika sedang membuka portal alumni
  if (portal === "alumni") {
    return (
      <AlumniApp
        initialLoggedIn={loggedIn && role === "alumni"}
        onLogout={() => {
          setLoggedIn(false);
          setPortal("admin");
          setRole("super");
        }}
      />
    );
  }

  if (!loggedIn) {
    return (
      <LoginView
        onLogin={(selectedRole) => {
          if (selectedRole === "alumni") {
            setRole("alumni");
            setPortal("alumni");
            setLoggedIn(true);
          } else {
            setRole(selectedRole);
            setPortal("admin");
            setLoggedIn(true);
          }
        }}
      />
    );
  }

  const title = detail
    ? "Detail Kuesioner"
    : nav.find((n) => n.id === page)?.label || "Dashboard";

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        onChange={changePage}
        mobileOpen={mobileOpen}
        close={() => setMobileOpen(false)}
        role={role}
        logout={() => {
          localStorage.removeItem("token");
          setLoggedIn(false);
          setPage("dashboard");
          setDetail(false);
          setModal(null);
          setMobileOpen(false);
        }}
      />
      <div className="app-main">
        <Header
          title={title}
          menu={() => setMobileOpen(true)}
          role={role}
        />
        <main className="content">
          {page === "dashboard" && (
            <DashboardView navigate={changePage} role={role} />
          )}

          {page === "alumni" && (
            <AlumniView
              notify={notify}
              role={role}
              refreshKey={alumniRefreshKey}
              openModal={() =>
                setModal({
                  title: "Tambah Alumni",
                  type: "alumni",
                  onSuccess: () => setAlumniRefreshKey((k) => k + 1),
                })
              }
              openImport={() =>
                setModal({ title: "Import Data Alumni", type: "import" })
              }
              openEdit={(item) =>
                setModal({
                  title: `Edit Alumni — ${item.nama_lengkap}`,
                  type: "alumni",
                  alumni: item,
                  onSuccess: () => setAlumniRefreshKey((k) => k + 1),
                })
              }
            />
          )}

          {page === "questionnaires" && !detail && (
            <QuestionnairesView
              openDetail={() => setDetail(true)}
              openModal={() =>
                setModal({ title: "Buat Kuesioner", type: "questionnaire" })
              }
              openImport={() =>
                setModal({ title: "Import Kuesioner Excel", type: "import" })
              }
              openEdit={(name) =>
                setModal({
                  title: `Edit ${name}`,
                  type: "questionnaire",
                })
              }
              notify={notify}
              role={role}
            />
          )}

          {page === "questionnaires" && detail && (
            <QuestionnaireDetailView
              back={() => setDetail(false)}
              openModal={() =>
                setModal({ title: "Tambah Pertanyaan", type: "question" })
              }
              notify={notify}
              openImport={() =>
                setModal({ title: "Import Pertanyaan Excel", type: "import" })
              }
              openEdit={(name) =>
                setModal({
                  title: `Edit Pertanyaan — ${name}`,
                  type: "question",
                })
              }
              role={role}
            />
          )}

          {page === "report" && <ReportView notify={notify} role={role} />}

          {(page === "lecturers" ||
            page === "employees" ||
            page === "programs") && (
            <DirectoryView
              type={page}
              role={role}
              notify={notify}
              openModal={() =>
                setModal({
                  title:
                    page === "lecturers"
                      ? "Tambah Dosen"
                      : page === "employees"
                        ? "Tambah Pegawai"
                        : "Tambah Program Studi",
                  type: "directory",
                })
              }
              openEdit={(name) =>
                setModal({
                  title: `Edit Data — ${name}`,
                  type: "directory",
                })
              }
            />
          )}

          {page === "users" && role !== "program" && (
            <UserManagementView
              role={role}
              notify={notify}
              openModal={() =>
                setModal({ title: "Buat Akun Baru", type: "user" })
              }
              openEdit={(name) =>
                setModal({ title: `Edit Akun — ${name}`, type: "user" })
              }
            />
          )}

          {page === "logs" && <ActivityLogsView notify={notify} />}

          {page === "settings" && <SettingsView />}
        </main>
      </div>

      {modal && (
        <Modal
          {...modal}
          close={() => setModal(null)}
          notify={notify}
          role={role}
        />
      )}

      <div className={`toast ${toast ? "show" : ""}`}>
        <span>
          <Icon name="check" size={16} />
        </span>
        {toast}
      </div>
    </div>
  );
}
