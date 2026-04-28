import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

type WindowProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

type SessionStep = {
  number: string;
  title: string;
  detail: string;
  state: "complete" | "active" | "pending";
};

function ScalesMini() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="11" y="4" width="2" height="16" fill="currentColor" />
      <rect x="3" y="7" width="18" height="1.5" fill="currentColor" />
      <path d="M 3 8 L 0 14 L 7 14 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M 21 8 L 18 14 L 25 14 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="7" y="20" width="10" height="1.5" fill="currentColor" />
    </svg>
  );
}

export function Window({ title, children, className = "" }: WindowProps) {
  return (
    <section className={`window ${className}`.trim()}>
      <div className="title-bar">
        <div className="close-box" />
        <span className="title-text">{title}</span>
        <div className="title-bar-fill" />
        <div className="close-box close-box-filled" />
      </div>
      <div className="window-body">{children}</div>
    </section>
  );
}

export function Marquee({ items, darker = false }: { items: string[]; darker?: boolean }) {
  return (
    <div className={`marquee ${darker ? "marquee-darker" : ""}`.trim()}>
      <div className="marquee-track">
        {items.concat(items).map((item, index) => (
          <span key={`${item}-${index}`}>
            <span dangerouslySetInnerHTML={{ __html: item }} />
            <span className="marquee-sep">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label">{children}</div>;
}

const PRIMARY_NAV: ReadonlyArray<readonly [string, string, boolean]> = [
  ["/", "Home", true],
  ["/community", "Community", false],
  ["/session", "Session", false],
  ["/audit", "Audit", false],
  ["/dashboard", "Dashboard", false],
  ["/registry", "Registry", false],
];

const SECONDARY_NAV: ReadonlyArray<readonly [string, string, string]> = [
  ["/compliance", "Compliance", "NIST AI RMF · CROSSWALK"],
  ["/docs", "Docs", "API · ENDPOINTS · PACKETS"],
  ["/research", "Research", "HMDA · COMPAS · METHODOLOGY"],
  ["/demo/text", "Text Demo", "DETERMINISTIC ANALYSIS · SANDBOX"],
];

export function AppNav() {
  const [now, setNow] = useState(new Date());
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".menu-more")) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoreOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const detroitTime = useMemo(
    () =>
      now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "America/Detroit",
      }),
    [now],
  );

  return (
    <header className="menu-bar">
      <div className="brand-mark">
        <ScalesMini />
        <span className="glitch" data-text="LIBRA">LIBRA</span>
      </div>

      {/* Desktop primary nav */}
      <nav className="menu-links">
        {PRIMARY_NAV.map(([to, label, end]) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => (isActive ? "active" : undefined)}
            onClick={() => setMobileOpen(false)}
          >
            {label}
          </NavLink>
        ))}
        <div className={`menu-more ${moreOpen ? "open" : ""}`}>
          <button
            type="button"
            className="menu-more-trigger"
            onClick={(e) => {
              e.stopPropagation();
              setMoreOpen((v) => !v);
            }}
            aria-haspopup="true"
            aria-expanded={moreOpen}
          >
            <span>More</span>
            <span className="menu-more-caret">▼</span>
          </button>
          {moreOpen && (
            <div className="menu-more-panel" role="menu">
              <div className="menu-more-head">
                <span>Reference</span>
              </div>
              {SECONDARY_NAV.map(([to, label, sub]) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `menu-more-item ${isActive ? "active" : ""}`.trim()
                  }
                  onClick={() => setMoreOpen(false)}
                >
                  <span className="menu-more-item-label">{label}</span>
                  <span className="menu-more-item-sub">{sub}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="menu-spacer" />
      <div className="menu-clock">
        <span className="clock-dot" />
        <span>DETROIT · 42.33°N</span>
        <span>{detroitTime}</span>
      </div>

      {/* Mobile hamburger trigger */}
      <button
        type="button"
        className={`menu-hamburger ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle navigation"
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? (
          <span className="menu-hamburger-x">×</span>
        ) : (
          <span className="menu-hamburger-bars">
            <span /><span /><span />
          </span>
        )}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="menu-drawer">
          <div className="menu-drawer-head">Primary</div>
          {PRIMARY_NAV.map(([to, label, end]) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `menu-drawer-item ${isActive ? "active" : ""}`.trim()
              }
              onClick={() => setMobileOpen(false)}
            >
              <span>{label}</span>
              <span className="menu-drawer-arrow">→</span>
            </NavLink>
          ))}
          <div className="menu-drawer-head subtle">Reference</div>
          {SECONDARY_NAV.map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `menu-drawer-item ref ${isActive ? "active" : ""}`.trim()
              }
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <div className="menu-drawer-foot">
            <span className="clock-dot" />
            DETROIT · 42.33°N · {detroitTime}
          </div>
        </div>
      )}
    </header>
  );
}

export function SessionStepFlow({ steps }: { steps: SessionStep[] }) {
  const completeCount = steps.filter((s) => s.state === "complete").length;
  const hasActive = steps.some((s) => s.state === "active");
  const total = steps.length;
  const segments = total - 1;
  let filledSegments = Math.max(0, completeCount - 1);
  if (hasActive && completeCount >= 1) filledSegments += 0.5;
  else if (hasActive) filledSegments = 0.5;
  const fillPct = segments > 0 ? (filledSegments / segments) * 100 : 0;

  return (
    <div className="session-flow">
      <div className="session-flow-track-wrap">
        <div className="session-flow-track" />
        <div
          className="session-flow-fill"
          style={{ width: `calc((100% - 44px) * ${fillPct / 100})` }}
        />
        <div className="session-flow-grid">
          {steps.map((s) => (
            <div className={`session-flow-step state-${s.state}`} key={s.number}>
              <div className="session-flow-badge">
                {s.state === "complete" ? "✓" : s.number}
                {s.state === "active" && <span className="session-flow-ring" />}
              </div>
              <div className="session-flow-state">
                {s.state === "complete" ? "● COMPLETE"
                  : s.state === "active" ? "◆ ACTIVE"
                    : "○ PENDING"}
              </div>
              <h4>{s.title}</h4>
              <p>{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="footer-line">
        <span>Built in Detroit</span>
        <span className="footer-sep">·</span>
        <span>Libra v1</span>
        <span className="footer-sep">·</span>
        <span>Community-governed AI fairness</span>
        <span className="footer-sep">·</span>
        <span>Receipts are Ed25519-signed and hash-chained</span>
      </div>
    </footer>
  );
}

export function JsonBlock({ value }: { value: unknown }) {
  return <pre className="code-block">{JSON.stringify(value, null, 2)}</pre>;
}
