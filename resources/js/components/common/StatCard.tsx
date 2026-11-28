import { IconName } from "../../types";
import { Icon } from "./Icon";

export function StatCard({
  icon,
  color,
  label,
  value,
  detail,
}: {
  icon: IconName;
  color: string;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="stat-card">
      <span className={`stat-icon ${color}`}>
        <Icon name={icon} />
      </span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
    </article>
  );
}
