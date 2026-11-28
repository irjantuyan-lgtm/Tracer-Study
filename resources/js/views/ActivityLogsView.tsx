import { useState } from "react";
import { auditLogs } from "../data";
import { PageIntro, Button, Toolbar } from "../components/common";

export function ActivityLogsView({ notify }: { notify: (s: string) => void }) {
  const [search, setSearch] = useState("");
  const rows = auditLogs.filter((row) =>
    row.join(" ").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <PageIntro
        eyebrow="AUDIT SISTEM"
        title="Log Aktivitas"
        description="Pantau seluruh perubahan dan aktivitas pengguna di dalam sistem."
        action={
          <Button
            variant="secondary"
            icon="download"
            onClick={() => notify("Log aktivitas berhasil diekspor")}
          >
            Ekspor Log
          </Button>
        }
      />
      <section className="panel table-panel">
        <Toolbar search={search} setSearch={setSearch}>
          <select>
            <option>Semua Aktivitas</option>
            <option>Data Alumni</option>
            <option>Kuesioner</option>
            <option>Manajemen User</option>
          </select>
        </Toolbar>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Pengguna</th>
                <th>Aktivitas</th>
                <th>Modul</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row[0]}-${row[2]}`}>
                  <td>{row[0]}</td>
                  <td>
                    <strong>{row[1]}</strong>
                  </td>
                  <td>{row[2]}</td>
                  <td>
                    <b className="badge info">{row[3]}</b>
                  </td>
                  <td>
                    <b className="badge success">{row[4]}</b>
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
