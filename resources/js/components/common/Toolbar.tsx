import { ReactNode } from "react";
import { Icon } from "./Icon";

export function Toolbar({
  search,
  setSearch,
  children,
}: {
  search: string;
  setSearch: (v: string) => void;
  children?: ReactNode;
}) {
  return (
    <div className="toolbar">
      <div className="search-field">
        <Icon name="search" size={17} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama atau NIM..."
        />
      </div>
      {children}
    </div>
  );
}
