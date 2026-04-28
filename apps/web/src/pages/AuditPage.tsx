import { useEffect, useState } from "react";
import { JsonBlock, SectionLabel, Window } from "../components/Chrome";
import {
  api,
  buildVendorEvidencePackage,
  PublishedStandardSummary,
  uploadAction,
  uploadVendorEvidence,
  VendorCheckResponse,
  VendorEvidenceResponse,
  VefPackageBuilderResponse,
} from "../lib/api";
import { STATIC_PREVIEW, STATIC_PREVIEW_VENDOR_SAMPLE_PATH } from "../lib/runtime";

const sampleJson = {
  data: [
    { race: "White", outcome: 1 },
    { race: "White", outcome: 1 },
    { race: "Black", outcome: 1 },
    { race: "Black", outcome: 0 },
    { race: "Latinx", outcome: 0 },
    { race: "Latinx", outcome: 0 },
  ],
  race_col: "race",
  outcome_col: "outcome",
  favorable_value: "1",
};

const sampleManifest = {
  schema: "libra.vef.v1",
  standard_slug: "demo-detroit-district-3-emily-v0",
  vendor_name: "Demo Emily Voice Vendor",
  system_name: "Emily",
  system_version: "emily-2.1",
  reporting_period: "2026-Q2",
  protected_attribute: "speech_variety",
  priority_groups: ["AAVE"],
  reference_group: "General American English",
  outcome_columns: ["resolution_success"],
  sample_method: "demo_production_logs_with_human_review",
  raw_audio_retained: false,
  evidence_tier: "output_logs_only",
  evidence_csv_hash: "sha256:71f67ef914cbe3c5dc6c07e3b3479e0f89d7bf1c94a0fae0b9e286754c8dd7d1",
  evidence_package_hash: "sha256:905c397449b5a133b488c2cfc62e881c40158da2adbbd34bd61e9dec9af89bc3",
  demo_notice: "Demo baseline for Benson/District 3 planning only; no real resident session has occurred.",
};

const sampleAttestations = {
  attestations: [
    {
      type: "vendor_log",
      signed_hash: "sha256:71f67ef914cbe3c5dc6c07e3b3479e0f89d7bf1c94a0fae0b9e286754c8dd7d1",
      signature_key_id: "378c5aaf6f88d90d",
      signature_alg: "Ed25519",
      signature: "tEDWM+PT9WpfvB26QEi/jJXk0ReTZNpqS4rkqJM3qz+xbyKxK+t+IpUEB0yYGBMFs8a6TR/5T263LPlsyKVxAA==",
    },
    {
      type: "labeler_sample",
      signed_hash: "sha256:71f67ef914cbe3c5dc6c07e3b3479e0f89d7bf1c94a0fae0b9e286754c8dd7d1",
      signature_key_id: "dece178da2a40ee7",
      signature_alg: "Ed25519",
      signature: "a2Kv6+qA2NU2M34SWs+Dx1jrxVPqC+hY6PGbOeMOsGSrf/iCVeXymb+JoZFncGV+Am1fzuYT3LbbkufjFGckDg==",
    },
    {
      type: "municipal_sample",
      signed_hash: "sha256:71f67ef914cbe3c5dc6c07e3b3479e0f89d7bf1c94a0fae0b9e286754c8dd7d1",
      signature_key_id: "053bac2201292b3e",
      signature_alg: "Ed25519",
      signature: "+0c29UwAv3QKUKsxaFzLb5tFN5xU6IsL/wllRYT0+qtR6EKUXuUwFVaIw2Oq7oUp64wV2kn4zEPdOJi477ZhCQ==",
    },
  ],
};

export function AuditPage() {
  const [jsonBody, setJsonBody] = useState(JSON.stringify(sampleJson, null, 2));
  const [file, setFile] = useState<File | null>(null);
  const [vendorFile, setVendorFile] = useState<File | null>(null);
  const [fields, setFields] = useState({
    race_col: "race",
    outcome_col: "outcome",
    favorable_value: "1",
    feature_cols: "income,credit_score",
    regulation: "ll144",
  });
  const [vendorFields, setVendorFields] = useState({
    standard_slug: "",
    vendor_name: "Demo Emily Voice Vendor",
    reporting_period: "2026-Q2",
    race_col: "race",
    outcome_col: "outcome",
    favorable_value: "1",
  });
  const [publishedStandards, setPublishedStandards] = useState<PublishedStandardSummary[]>([]);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [vendorResult, setVendorResult] = useState<VendorCheckResponse | null>(null);
  const [vefFile, setVefFile] = useState<File | null>(null);
  const [vefManifest, setVefManifest] = useState(JSON.stringify(sampleManifest, null, 2));
  const [vefAttestations, setVefAttestations] = useState(JSON.stringify(sampleAttestations, null, 2));
  const [vefResult, setVefResult] = useState<VendorEvidenceResponse | null>(null);
  const [vefBuilderResult, setVefBuilderResult] = useState<VefPackageBuilderResponse | null>(null);
  const [error, setError] = useState("");
  const [runtimeWarning, setRuntimeWarning] = useState("");

  useEffect(() => {
    api
      .listPublishedStandards()
      .then((response) => {
        setPublishedStandards(response.items);
        setRuntimeWarning("");
      })
      .catch((err) =>
        setRuntimeWarning(
          `Published standards could not be loaded: ${(err as Error).message}. Vendor checks and appendix downloads may be unavailable until the API reconnects.`,
        ),
      );
  }, []);

  useEffect(() => {
    if (!vendorFields.standard_slug && publishedStandards[0]) {
      setVendorFields((current) => ({ ...current, standard_slug: publishedStandards[0].slug }));
    }
  }, [publishedStandards, vendorFields.standard_slug]);

  const runJsonAudit = async () => {
    setError("");
    try {
      const payload = JSON.parse(jsonBody);
      setResult(await api.auditJson(payload));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const runUpload = async (path: string) => {
    if (!file && !STATIC_PREVIEW) {
      setError("Select a CSV file first.");
      return;
    }
    setError("");
    try {
      const payload = await uploadAction(
        path,
        {
          race_col: fields.race_col,
          outcome_col: fields.outcome_col,
          favorable_value: fields.favorable_value,
          feature_cols: fields.feature_cols,
        },
        file,
      );
      setResult(payload);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const runVendorCheck = async () => {
    if (!vendorFile && !STATIC_PREVIEW) {
      setError("Select vendor evidence CSV first.");
      return;
    }
    if (!vendorFields.standard_slug) {
      setError("Publish a standard first, then choose it here.");
      return;
    }
    setError("");
    try {
      const payload = await uploadAction(
        `/api/v1/registry/standards/${vendorFields.standard_slug}/vendor-check`,
        {
          vendor_name: vendorFields.vendor_name,
          reporting_period: vendorFields.reporting_period,
          race_col: vendorFields.race_col,
          outcome_col: vendorFields.outcome_col,
          favorable_value: vendorFields.favorable_value,
        },
        vendorFile,
      );
      setVendorResult(payload as VendorCheckResponse);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const runVefEvidence = async () => {
    if (!vefFile && !STATIC_PREVIEW) {
      setError("Select a VEF evidence CSV first.");
      return;
    }
    if (!vendorFields.standard_slug) {
      setError("Publish a standard first, then choose it here.");
      return;
    }
    setError("");
    try {
      const response = await uploadVendorEvidence(
        vendorFields.standard_slug,
        vefManifest,
        vefFile,
        vefAttestations,
      );
      setVefResult(response);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const runVefBuilder = async () => {
    if (!vefFile && !STATIC_PREVIEW) {
      setError("Select a VEF evidence CSV first.");
      return;
    }
    setError("");
    try {
      const response = await buildVendorEvidencePackage(vefManifest, vefFile, vefAttestations);
      setVefBuilderResult(response);
      setVefManifest(JSON.stringify(response.manifest, null, 2));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const selectedStandard = publishedStandards.find((item) => item.slug === vendorFields.standard_slug);
  const auditConfig = (result?.community_config as Record<string, unknown> | undefined) ?? null;
  const auditSummary = (result?.summary as Record<string, unknown> | undefined) ?? null;

  return (
    <>
      <div className="desktop">
        <section className="page-head">
          <div className="eyebrow">Audit and Vendor Check</div>
          <h1>Run bias audits and check vendor evidence.</h1>
          <p className="lede">
            This route shows how evidence would be checked against a published community standard.
            In the static review build, vendor evidence checks are sample/demo artifacts unless a
            real standard and live submission process are connected.
          </p>
        </section>

        {runtimeWarning ? <div className="notice-banner warning-banner">{runtimeWarning}</div> : null}

        <SectionLabel>JSON Audit</SectionLabel>
        <Window title="Quick Audit">
          <textarea
            className="code-input"
            value={jsonBody}
            onChange={(event) => setJsonBody(event.target.value)}
          />
          <div className="btn-row">
            <button className="btn btn-primary" onClick={runJsonAudit}>
              Run JSON Audit
            </button>
          </div>
        </Window>

        <SectionLabel>CSV Workflow</SectionLabel>
        <Window title="Upload and Run">
          {STATIC_PREVIEW ? (
            <div className="notice-banner" style={{ marginBottom: "16px" }}>
              Static preview mode uses bundled sample data. File uploads are optional in this build.
            </div>
          ) : null}
          <div className="form-grid">
            <label className="field full">
              <span>CSV File</span>
              <input type="file" accept=".csv" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
            </label>
            {Object.entries(fields).map(([key, value]) => (
              <label key={key} className="field">
                <span>{key.replace(/_/g, " ")}</span>
                <input
                  value={value}
                  onChange={(event) => setFields({ ...fields, [key]: event.target.value })}
                />
              </label>
            ))}
          </div>
          <div className="btn-row">
            <button className="btn" onClick={() => runUpload("/api/v1/fairness/audit/csv")}>
              Audit CSV
            </button>
            <button className="btn" onClick={() => runUpload("/api/v1/fairness/audit/remediate")}>
              Remediate
            </button>
            <button className="btn" onClick={() => runUpload("/api/v1/fairness/audit/debias")}>
              Debias
            </button>
            <button
              className="btn"
              onClick={() =>
                runUpload(`/api/v1/fairness/audit/compliance/${fields.regulation}`)
              }
            >
              Regulation Report
            </button>
          </div>
          {error ? <p className="error-text">{error}</p> : null}
        </Window>

        <Window title="Audit Result">
          {result ? (
            <div className="dl-list" style={{ marginBottom: "18px" }}>
              <div className="dl-row">
                <span className="dl-label">Governance State</span>
                <span className="dl-value">{String(result.governance_state ?? "—")}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Tenant State</span>
                <span className="dl-value">{String(result.tenant_governance_state ?? "—")}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Reference Group</span>
                <span className="dl-value">{String(auditConfig?.fairness_target ?? "—")}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Threshold</span>
                <span className="dl-value">{String(auditConfig?.fairness_threshold ?? "—")}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Flagged Groups</span>
                <span className="dl-value">
                  {Array.isArray(auditSummary?.flagged_groups)
                    ? (auditSummary.flagged_groups as string[]).join(", ") || "None"
                    : "—"}
                </span>
              </div>
            </div>
          ) : (
            <p className="small-copy">Run an audit to see the summary before inspecting raw JSON.</p>
          )}
          <JsonBlock value={result} />
        </Window>

        <SectionLabel>Vendor Evidence Check</SectionLabel>
        <Window title="VEF v1 Evidence Package">
          {STATIC_PREVIEW ? (
            <div className="notice-banner" style={{ marginBottom: "16px" }}>
              Static preview returns an illustrative VEF result. Live mode validates hashes, rows,
              attestations, sample sizes, evidence tiers, and challenge-set coverage.
            </div>
          ) : null}
          <div className="form-grid">
            <label className="field full">
              <span>Published Standard</span>
              <select
                className="select-input"
                value={vendorFields.standard_slug}
                onChange={(event) =>
                  setVendorFields({ ...vendorFields, standard_slug: event.target.value })
                }
              >
                <option value="">Select a published standard</option>
                {publishedStandards.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.title} ({item.slug})
                  </option>
                ))}
              </select>
            </label>
            <label className="field full">
              <span>VEF Evidence CSV</span>
              <input
                type="file"
                accept=".csv"
                onChange={(event) => setVefFile(event.target.files?.[0] ?? null)}
              />
            </label>
            <label className="field full">
              <span>manifest.json</span>
              <textarea
                value={vefManifest}
                onChange={(event) => setVefManifest(event.target.value)}
              />
            </label>
            <label className="field full">
              <span>attestations.json</span>
              <textarea
                value={vefAttestations}
                onChange={(event) => setVefAttestations(event.target.value)}
              />
            </label>
          </div>
          <div className="btn-row">
            <button className="btn" onClick={runVefBuilder}>
              Build Hashes
            </button>
            <button className="btn btn-primary" onClick={runVefEvidence}>
              Submit VEF Package
            </button>
          </div>
          <div className="btn-row" style={{ marginTop: "12px" }}>
            <a className="btn" href="/api/v1/registry/demo/vef/manifest.json">
              Demo Manifest
            </a>
            <a className="btn" href="/api/v1/registry/demo/vef/evidence.csv">
              Demo Evidence
            </a>
            <a className="btn" href="/api/v1/registry/demo/vef/attestations.json">
              Demo Attestations
            </a>
            <a className="btn" href="/api/v1/registry/demo/vef/benson-packet.md">
              Benson Packet
            </a>
          </div>
          {vefResult ? (
            <div className="dl-list" style={{ marginTop: "18px" }}>
              <div className="dl-row">
                <span className="dl-label">Verdict</span>
                <span className="dl-value">{vefResult.verdict}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Verification</span>
                <span className="dl-value">{vefResult.verification_status}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Submission ID</span>
                <span className="dl-value">{String(vefResult.submission_id ?? "—")}</span>
              </div>
            </div>
          ) : null}
        </Window>

        <Window title="VEF Result and Cure Brief">
          {vefBuilderResult ? (
            <div className="notice-banner" style={{ marginBottom: "16px" }}>
              Package hashes built. The manifest textarea has been updated with the canonical
              evidence and package hashes.
            </div>
          ) : null}
          {vefBuilderResult ? <JsonBlock value={vefBuilderResult} /> : null}
          <JsonBlock value={vefResult} />
        </Window>

        <Window title="Published Standard Compliance">
          {selectedStandard?.is_demo ? (
            <div className="notice-banner warning-banner">
              Sample vendor evidence check
            </div>
          ) : null}
          <div className="btn-row">
            <a
              className="btn"
              href={STATIC_PREVIEW ? STATIC_PREVIEW_VENDOR_SAMPLE_PATH : "/api/v1/registry/demo/vendor-sample.csv"}
            >
              Download Sample Vendor CSV
            </a>
          </div>
          <div className="form-grid" style={{ marginTop: 18 }}>
            <label className="field full">
              <span>Published Standard</span>
              <select
                className="select-input"
                value={vendorFields.standard_slug}
                onChange={(event) =>
                  setVendorFields({ ...vendorFields, standard_slug: event.target.value })
                }
              >
                <option value="">Select a published standard</option>
                {publishedStandards.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.title} ({item.slug})
                  </option>
                ))}
              </select>
            </label>
            <label className="field full">
              <span>Vendor Evidence CSV</span>
              <input
                type="file"
                accept=".csv"
                onChange={(event) => setVendorFile(event.target.files?.[0] ?? null)}
              />
            </label>
            {Object.entries(vendorFields)
              .filter(([key]) => key !== "standard_slug")
              .map(([key, value]) => (
                <label key={key} className="field">
                  <span>{key.replace(/_/g, " ")}</span>
                  <input
                    value={value}
                    onChange={(event) =>
                      setVendorFields({ ...vendorFields, [key]: event.target.value })
                    }
                  />
                </label>
              ))}
          </div>
          <div className="btn-row">
            <button className="btn btn-primary" onClick={runVendorCheck}>
              Check Vendor Evidence
            </button>
          </div>
          {!publishedStandards.length && !runtimeWarning ? (
            <p className="small-copy" style={{ marginTop: "12px" }}>
              Publish a standard first to enable registry-bound vendor checks.
            </p>
          ) : null}
        </Window>

        <Window title="Vendor Check Result">
          {vendorResult?.published_standard?.is_demo ? (
            <div className="notice-banner warning-banner">
              Sample vendor evidence check — not a real District 3 vendor result
            </div>
          ) : null}
          {vendorResult ? (
            <div className="dl-list" style={{ marginBottom: "18px" }}>
              <div className="dl-row">
                <span className="dl-label">Standard Slug</span>
                <span className="dl-value">{vendorResult.standard_slug}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Verdict</span>
                <span className="dl-value">{vendorResult.verdict}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Flagged Groups</span>
                <span className="dl-value">{vendorResult.flagged_groups.join(", ") || "None"}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Submission ID</span>
                <span className="dl-value">{String(vendorResult.submission_id ?? "—")}</span>
              </div>
            </div>
          ) : (
            <p className="small-copy">Run a vendor check to get a verdict tied to a published standard.</p>
          )}
          <JsonBlock value={vendorResult} />
          {vendorResult ? (
            <div className="btn-row" style={{ marginTop: "12px" }}>
              {STATIC_PREVIEW ? (
                <span className="small-copy">
                  Appendix download is disabled in the static preview build.
                </span>
              ) : (
                <a
                  className="btn"
                  href={`/api/v1/registry/standards/${vendorResult.standard_slug}/appendix`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Contract Appendix for This Standard
                </a>
              )}
            </div>
          ) : null}
        </Window>
      </div>
    </>
  );
}
