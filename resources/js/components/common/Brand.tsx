export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <div className="uhn-mark" aria-hidden="true">
        <b>UHN</b>
        <span>1954</span>
      </div>
      <div className="brand-divider" />
      <div className="fast-lockup">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        {!compact && (
          <div>
            <strong>FAST</strong>
            <small>Tracer Study</small>
          </div>
        )}
      </div>
    </div>
  );
}
