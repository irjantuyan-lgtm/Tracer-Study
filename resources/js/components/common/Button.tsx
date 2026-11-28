import { ReactNode } from "react";
import { IconName } from "../../types";
import { Icon } from "./Icon";

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: IconName;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  const variantClass = variant === "outline" ? "btn-secondary btn-outline" : `btn-${variant}`;

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${className}`.trim()}
      onClick={onClick}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />}
      {children}
    </button>
  );
}
