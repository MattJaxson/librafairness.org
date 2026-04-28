import { useEffect, useState } from "react";
import { JsonBlock, SectionLabel, Window } from "../components/Chrome";
import {
  ActiveStandardResponse,
  GovernanceStatusResponse,
  PublicStats,
  ReportSummary,
  SubmissionSummary,
  api,
} from "../lib/api";
import { STATIC_PREVIEW } from "../lib/runtime";

const emptyStats: PublicStats = {
  total_analyses: 0,
  total_users: 0,
  total_communities: 0,
  total_pageviews: 0,
};

function dl(label: string, value: string | number | null | undefined) {
  return (
    <div className="dl-row">
      <span className="dl-label">{label}</span>
      <span className="dl-value">{value ?? "—"}</span>
    </div>
  );
}

export function DashboardPage() {
  const [stats, setStats] = useState(emptyStats);
  const [status, setStatus] = useState<GovernanceStatusResponse | null>(null);
  const [active, setActive] = useState<ActiveStandardResponse | null>(null);
  const [usage, setUsage] = useState<Record<string, unknown> | null>(null);
  const [health, setHealth] = useState<Record<string, unknown> | null>(null);
  const [reports, setReports] = useState<ReportSummary[]>([]);
  const [submissions, setSubmissions] = useState<SubmissionSummary[]>([]);
  const [runtimeIssues, setRuntimeIssues] = useState<string[]>([]);

  const activeIsDemo = Boolean(active?.config?.is_demo);

  useEffect(() => {
    const recordIssue = (message: string) =>
      setRuntimeIssues((current) => (current.includes(message) ? current : [...current, message]));

    api.getPublicStats().then(setStats).catch(() => recordIssue("Public stats could not be loaded."));
    api.getHealth().then(setHealth).catch(() => recordIssue("API health check failed."));
    api.getGovernanceStatus().then(setStatus).catch(() => recordIssue("Governance status could not be loaded."));
    api.getActiveStandard().then(setActive).catch(() => recordIssue("Active standard could not be loaded."));
    api.getUsage().then(setUsage).catch(() => recordIssue("Usage data could not be loaded."));
    api.listReports().then((r) => setReports(r.items)).catch(() => recordIssue("Audit history could not be loaded."));
    api.listMySubmissions().then((r) => setSubmissions(r.items)).catch(() => recordIssue("Vendor submission history could not be loaded."));
  }, []);

  const config = active?.config;
  const receipt = active?.receipt ?? status?.receipt;
  const apiConnection = health?.status
    ? "connected"
    : runtimeIssues.includes("API health check failed.")
      ? "warning"
      : "checking";

  return (
    <>
      <div className="desktop">
        <section className="page-head">
          <div className="eyebrow">Demo System State</div>
          <h1>Governance state, vendor checks, and audit history.</h1>
          <p className="lede">
            This view is an inspection panel for the demo runtime: active standard state, stale or
            warning conditions, sample vendor evidence checks, and stored audit outputs. It is not a
            public adoption dashboard.
          </p>
        </section>

        {runtimeIssues.length ? (
          <div className="notice-banner warning-banner" style={{ marginBottom: "16px" }}>
            {runtimeIssues.join(" ")}
          </div>
        ) : null}

        <div className="stat-strip">
          <div className="stat">
            <div className="stat-num">{stats.total_analyses}</div>
            <div className="stat-lbl">Demo Analyses</div>
          </div>
          <div className="stat">
            <div className="stat-num">{stats.total_users}</div>
            <div className="stat-lbl">Demo Users</div>
          </div>
          <div className="stat">
            <div className="stat-num">{stats.total_communities}</div>
            <div className="stat-lbl">Demo Standards</div>
          </div>
          <div className="stat" style={{ fontSize: "14px" }}>
            <div className="stat-num" style={{ fontSize: "28px" }}>
              {health?.status ? String(health.status) : "offline"}
            </div>
            <div className="stat-lbl">API Status</div>
          </div>
        </div>

        <SectionLabel>Runtime State</SectionLabel>

        {(status?.is_stale || status?.warning) ? (
          <div className="notice-banner warning-banner" style={{ marginBottom: "12px" }}>
            {status?.warning ?? "Standard may be stale — consider re-governance."}
          </div>
        ) : null}

        <div className="grid-two dashboard-status-grid">
          <Window title={activeIsDemo ? "Active Demo Standard" : "Active Standard"}>
            {config ? (
              <div className="dl-list">
                {dl("Jurisdiction", config.jurisdiction as string)}
                {dl("Domain", (config.domain as string)?.replace(/_/g, " "))}
                {dl("Threshold", `≥ ${config.fairness_threshold}`)}
                {dl("Reference Group", config.fairness_target as string)}
                {dl("Priority Groups", (config.priority_groups as string[])?.join(", "))}
                {dl("Governed At", receipt?.governed_at ? receipt.governed_at.slice(0, 10) : null)}
                {activeIsDemo ? (
                  <div style={{ marginTop: "8px", fontSize: "11px", color: "var(--warning)" }}>
                    Sample standard — not a real District 3 community session result
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <p className="small-copy">No active standard is governing runtime decisions yet.</p>
                <p className="small-copy">Next step: finalize a session standard, then publish it.</p>
              </>
            )}
          </Window>

          <Window title="Governance Status">
            <div className="dl-list">
              {dl("API Connection", apiConnection)}
              {dl("State", status?.state)}
              {dl("Default Governed", status?.is_default_governed != null ? String(status.is_default_governed) : null)}
              {dl("Is Stale", status?.is_stale != null ? String(status.is_stale) : null)}
              {dl("Domain", status?.domain as string)}
              {dl("Jurisdiction", status?.jurisdiction as string)}
              {dl("Is Demo", status?.is_demo != null ? String(status.is_demo) : null)}
            </div>
          </Window>
        </div>

        <div className="grid-two" style={{ marginTop: "12px" }}>
          <Window title="Recent Vendor Checks">
            {submissions.length === 0 ? (
              <p className="small-copy">
                No vendor submissions yet.
              </p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Vendor</th>
                    <th>Standard</th>
                    <th>Period</th>
                    <th>Verdict</th>
                    <th>Verification</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s) => (
                    <tr key={s.id}>
                      <td>{s.vendor_name}</td>
                      <td style={{ fontFamily: "var(--mono)", fontSize: "11px" }}>{s.standard_slug}</td>
                      <td>{s.reporting_period}</td>
                      <td>
                        <span className={`verdict-pill ${s.verdict.startsWith("PASS") ? "pass" : "fail"}`}>
                          {s.verdict}
                        </span>
                      </td>
                      <td>{s.verification_status ?? "self_attested"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Window>

          <Window title="Audit History">
            {reports.length === 0 ? (
              <p className="small-copy">
                No audit reports yet.
              </p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.report_id}>
                      <td>
                        {STATIC_PREVIEW ? (
                          <span style={{ fontFamily: "var(--mono)", fontSize: "11px" }}>
                            {r.report_id.slice(0, 8)}…
                          </span>
                        ) : (
                          <a
                            href={`/api/v1/analyze/report/${r.report_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontFamily: "var(--mono)", fontSize: "11px" }}
                          >
                            {r.report_id.slice(0, 8)}…
                          </a>
                        )}
                      </td>
                      <td>{r.report_type}</td>
                      <td>{r.created_at.slice(0, 10)}</td>
                      <td style={{ fontSize: "12px" }}>{r.verdict ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Window>
        </div>

        <Window title="Usage">
          <JsonBlock value={usage} />
        </Window>
      </div>
    </>
  );
}
