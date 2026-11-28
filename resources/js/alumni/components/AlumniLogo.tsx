export function AlumniLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`logo ${compact ? "logo--compact" : ""}`}>
      <div className="logo-mark">
        <span>F</span>
      </div>
      {!compact && (
        <div>
          <strong>FAST</strong>
          <small>Tracer Study</small>
        </div>
      )}
    </div>
  );
}
