import { useEffect, useState } from "react";
import { JsonBlock, SectionLabel, Window } from "../components/Chrome";
import { api, BensonPacketResponse } from "../lib/api";

const endpoints = [
  "POST /api/v1/analyze/text",
  "POST /api/v1/analyze/dataset",
  "POST /api/v1/fairness/audit",
  "POST /api/v1/fairness/audit/csv",
  "POST /api/v1/fairness/audit/pdf",
  "POST /api/v1/fairness/audit/remediate",
  "POST /api/v1/fairness/audit/debias",
  "POST /api/v1/fairness/audit/compliance",
  "POST /api/v1/fairness/community/session/draft",
  "POST /api/v1/fairness/community/session/{draft_id}/facilitation-audit",
  "POST /api/v1/fairness/community/session/{draft_id}/observer-attestation",
  "POST /api/v1/fairness/community/session/finalize",
  "GET /api/v1/fairness/community/public-key",
  "POST /api/v1/fairness/community/verify",
  "GET /api/v1/fairness/community/active",
  "GET /api/v1/fairness/community/status",
  "POST /api/v1/registry/standards/publish",
  "GET /api/v1/registry/standards",
  "GET /api/v1/registry/standards/{slug}",
  "POST /api/v1/registry/standards/{slug}/vendor-check",
  "POST /api/v1/registry/vef/package-builder",
  "GET /api/v1/registry/vef/trusted-attestors",
  "GET /api/v1/registry/demo/benson-packet",
  "GET /api/v1/registry/demo/vef/{filename}",
  "POST /api/v1/registry/standards/{slug}/vendor-evidence",
  "GET /api/v1/registry/submissions/{id}",
  "GET /api/v1/registry/submissions/{id}/cure-brief",
  "POST /api/v1/keys/register",
  "POST /api/v1/keys",
  "GET /api/v1/keys",
  "DELETE /api/v1/keys/{key_id}",
  "GET /api/v1/billing/usage",
  "POST /api/v1/billing/create-checkout",
  "GET /api/v1/stats/public",
];

const grouped = {
  Analysis: endpoints.slice(0, 8),
  Community: endpoints.slice(8, 16),
  Registry: endpoints.slice(16, 27),
  Platform: endpoints.slice(27),
};

export function DocsPage() {
  const [packet, setPacket] = useState<BensonPacketResponse | null>(null);
  const [packetError, setPacketError] = useState("");

  useEffect(() => {
    api
      .getBensonPacket()
      .then((response) => {
        setPacket(response);
        setPacketError("");
      })
      .catch((error) => setPacketError((error as Error).message));
  }, []);

  return (
    <>
      <div className="desktop">
        <section className="page-head">
          <div className="eyebrow">Live API Surface</div>
          <h1>API routes and live governance endpoints.</h1>
          <p className="lede">
            The app is built around one rule: only finalized standards become governing artifacts.
            Everything here reflects that contract directly.
          </p>
        </section>

        <div className="docs-layout">
          <aside className="docs-sidebar">
            <Window title="Jump To">
              <ul className="stack-list">
                <li><a href="#analysis">Analysis</a></li>
                <li><a href="#community">Community Governance</a></li>
                <li><a href="#registry">Registry</a></li>
                <li><a href="#platform">Platform</a></li>
                <li><a href="#rules">Governance Rules</a></li>
                <li><a href="#pre-pilot">Pre-Pilot Kit</a></li>
                <li><a href="#onboarding">Onboarding</a></li>
              </ul>
            </Window>
          </aside>

          <div className="docs-content">
            {Object.entries(grouped).map(([group, items]) => (
              <section id={group.toLowerCase()} key={group}>
                <SectionLabel>{group}</SectionLabel>
                <Window title={`${group} Endpoints`}>
                  <ul className="stack-list">
                    {items.map((endpoint) => (
                      <li key={endpoint}>
                        <code>{endpoint}</code>
                      </li>
                    ))}
                  </ul>
                </Window>
              </section>
            ))}

            <section id="rules">
              <SectionLabel>Governance Rules</SectionLabel>
              <Window title="Current Truth Contract">
                <ul className="stack-list">
                  <li>No active standard means audits run under the default EEOC threshold.</li>
                  <li>Draft session output is visible in status, but still default-governed.</li>
                  <li>Only finalization plus provenance creates an active governed standard.</li>
                  <li>Non-demo standards require observer-approved process integrity before signature.</li>
                  <li>Publishing is manual and only operates on the current active finalized standard.</li>
                  <li>VEF v1 package-builder computes canonical hashes before evidence submission.</li>
                  <li>VEF verified verdicts require Ed25519 signatures from trusted role-matched attestor keys.</li>
                  <li>Live standards reject demo-only, expired, wrong-role, or policy-unlisted attestor keys for verified status.</li>
                  <li>Standards may require a minimum VEF evidence tier before metrics are evaluated.</li>
                  <li>VEF v1 evidence returns verified, self-attested, fail, or insufficient-evidence verdicts.</li>
                  <li>District 3 remains proposed until the real pilot session actually happens.</li>
                </ul>
              </Window>
            </section>

            <section id="pre-pilot">
              <SectionLabel>Pre-Pilot Proof Kit</SectionLabel>
              <Window title="Benson Planning Packet">
                {packet ? (
                  <>
                    <div className="notice-banner warning-banner" style={{ marginBottom: "16px" }}>
                      {packet.demo_notice}
                    </div>
                    <div className="dl-list" style={{ marginBottom: "18px" }}>
                      <div className="dl-row">
                        <span className="dl-label">Status</span>
                        <span className="dl-value">{packet.status.replace(/_/g, " ")}</span>
                      </div>
                      <div className="dl-row">
                        <span className="dl-label">Standard Slug</span>
                        <span className="dl-value">{packet.standard_slug}</span>
                      </div>
                    </div>
                    <table className="data-table" style={{ marginBottom: "18px" }}>
                      <thead>
                        <tr>
                          <th>Proof Check</th>
                          <th>Verdict</th>
                          <th>Verification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {packet.proof_checks.map((check) => (
                          <tr key={check.label}>
                            <td>
                              <strong>{check.label}</strong>
                              <div className="small-copy">{check.meaning}</div>
                            </td>
                            <td>
                              <span className={`verdict-pill ${check.verdict.startsWith("PASS") ? "pass" : "fail"}`}>
                                {check.verdict}
                              </span>
                            </td>
                            <td>{check.verification_status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="grid-two" style={{ marginBottom: "18px" }}>
                      <div>
                        <h3>What D3 Still Decides</h3>
                        <ul className="stack-list">
                          {packet.district_3_decisions.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3>What Vendors Submit</h3>
                        <ul className="stack-list">
                          {packet.vendor_requirements.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="small-copy">
                    {packetError ? `Packet could not be loaded: ${packetError}` : "Loading structured proof packet..."}
                  </p>
                )}
                <ul className="stack-list">
                  <li><a href="/api/v1/registry/demo/benson-packet">Open structured proof packet JSON</a></li>
                  <li><a href="/api/v1/registry/demo/vef/benson-packet.md">Download the Benson packet</a></li>
                  <li><a href="/api/v1/registry/demo/vef/manifest.json">Download demo VEF manifest</a></li>
                  <li><a href="/api/v1/registry/demo/vef/evidence.csv">Download demo VEF evidence CSV</a></li>
                  <li><a href="/api/v1/registry/demo/vef/attestations.json">Download demo VEF attestations</a></li>
                </ul>
                {packet ? <JsonBlock value={packet.privacy_boundary} /> : null}
              </Window>
            </section>

            <section id="onboarding">
              <SectionLabel>Onboarding</SectionLabel>
              <Window title="Auth and First Run">
                <ul className="stack-list">
                  <li>`POST /api/v1/keys/register` creates a user and returns the first API key.</li>
                  <li>Paste the key into the top bar before using session, audit, dashboard, publish, or vendor-check actions.</li>
                  <li>Public stats stay open while governed session state remains tenant-scoped.</li>
                </ul>
              </Window>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
