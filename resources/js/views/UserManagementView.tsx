import { useState } from "react";
import { Role } from "../types";
import { userRows } from "../data";
import { PageIntro, Button, Toolbar, TableActions, Icon } from "../components/common";

export function UserManagementView({
  role,
  openModal,
  openEdit,
  notify,
}: {
  role: Role;
  openModal: () => void;
  openEdit: (name: string) => void;
  notify: (s: string) => void;
}) {
  const [search, setSearch] = useState("");
  const availableRoles =
    role === "super"
      ? "Admin Fakultas, Admin Prodi, Admin Dosen, dan Mahasiswa"
      : role === "faculty"
        ? "Admin Prodi"
        : "Mahasiswa";

  const allowed = userRows.filter((row) => {
    const roleAllowed =
      role === "super" ||
      (role === "faculty" && row[2] === "Admin Prodi") ||
      (role === "program" && row[2] === "Mahasiswa");
    return (
      roleAllowed && row.join(" ").toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <PageIntro
        eyebrow="KONTROL AKSES"
        title="Manajemen User"
        description={`Anda dapat membuat dan mengelola akun ${availableRoles}.`}
        action={
          <Button icon="plus" onClick={openModal}>
            Buat Akun
          </Button>
        }
      />
      <div className="hierarchy-banner">
        <span>
          <Icon name="shield" size={23} />
        </span>
        <div>
          <strong>Hierarki akses terkontrol</strong>
          <p>
            Setiap admin hanya dapat membuat akun untuk tingkat di bawah
            kewenangannya.
          </p>
        </div>
      </div>
      <section className="panel table-panel">
        <Toolbar search={search} setSearch={setSearch} />
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Username / Email</th>
                <th>Role</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {allowed.map((row) => (
                <tr key={row[1]}>
                  <td>
                    <strong>{row[0]}</strong>
                  </td>
                  <td>{row[1]}</td>
                  <td>
                    <b className="badge info">{row[2]}</b>
                  </td>
                  <td>{row[3]}</td>
                  <td>
                    <b className="badge success">{row[4]}</b>
                  </td>
                  <td>
                    <TableActions
                      onEdit={() => openEdit(row[0])}
                      onDelete={() => notify(`Akun ${row[0]} dinonaktifkan`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
