import { useEffect, useMemo, useState } from "react";
import {
  ActiveStandardResponse,
  api,
  CommunityDraftResponse,
  CommunityFinalizeResponse,
  CommunitySessionRequest,
  FacilitationAuditRequest,
  GovernanceStatusResponse,
  ObserverAttestationRequest,
  ProcessIntegrityResponse,
} from "../lib/api";
import { JsonBlock, SectionLabel, SessionStepFlow, Window } from "../components/Chrome";

type SessionForm = {
  council_label: string;
  priority_groups: string;
  fairness_target: string;
  fairness_threshold: string;
  minimum_evidence_tier: string;
  domain: string;
  jurisdiction: string;
  is_demo: boolean;
  input_protocol: string;
  input_location: string;
  participant_count: string;
  facilitator: string;
  notes: string;
  consensus_summary: string;
  majority_race: string;
  majority_race_pct: string;
  median_age: string;
};

type SessionFieldKey = Exclude<keyof SessionForm, "is_demo">;

const demoPreset: SessionForm = {
  council_label: "Demo Baseline District 3 Emily Voice Agent",
  priority_groups: "AAVE",
  fairness_target: "General American English",
  fairness_threshold: "0.90",
  minimum_evidence_tier: "validation_test",
  domain: "voice_agent",
  jurisdiction: "Detroit District 3",
  is_demo: true,
  input_protocol: "community_session",
  input_location: "Detroit, MI",
  participant_count: "12",
  facilitator: "Matt Jackson",
  notes: "Demo sample only. The District 3 Emily session has not yet been held.",
  consensus_summary:
    "Sample participants want Emily to recognize and route Black Detroit residents, including Black American English speakers, as reliably as everyone else.",
  majority_race: "Black",
  majority_race_pct: "75",
  median_age: "42",
};

const fieldOrder: SessionFieldKey[] = [
  "council_label",
  "priority_groups",
  "fairness_target",
  "fairness_threshold",
  "minimum_evidence_tier",
  "domain",
  "jurisdiction",
  "input_protocol",
  "input_location",
  "participant_count",
  "facilitator",
  "notes",
  "consensus_summary",
  "majority_race",
  "majority_race_pct",
  "median_age",
];

const stepCards = [
  { number: "01", title: "Prepare", detail: "Load the sample session or enter the room output manually.", state: "complete" as const },
  { number: "02", title: "Draft", detail: "Save the proposal without claiming it as a governed standard.", state: "complete" as const },
  { number: "03", title: "Finalize", detail: "Create a demo receipt now, or a real receipt only after observer approval.", state: "active" as const },
  { number: "04", title: "Publish", detail: "Push the active standard into the public registry and use it for vendor checks.", state: "pending" as const },
];

const demoAttestorPolicy = {
  allow_demo_attestors: true,
  trusted_key_ids: {
    vendor_log: ["378c5aaf6f88d90d"],
    labeler_sample: ["dece178da2a40ee7"],
    municipal_sample: ["053bac2201292b3e"],
  },
};

const sampleFacilitationAudit: FacilitationAuditRequest = {
  script_version: "detroit-emily-session-v1",
  vote_snapshots: {
    initial_median_threshold: 0.95,
    final_consensus_threshold: 0.9,
    initial_vote_count: 12,
    final_vote_count: 12,
  },
  transcript_commitment_hash: "sha256:sample-transcript-commitment",
  audio_commitment_hash: null,
  facilitation_audit_log_hash: "sha256:sample-facilitation-audit-log",
  framing_sensitivity_score: 0.05,
  flags: [],
};

const sampleObserverAttestation: ObserverAttestationRequest = {
  action: "approve",
  observer_name: "Independent Observer",
  observer_role: "community_process_observer",
  notes: "Reviewed sample audit log and found no process-integrity blocker.",
  reviewed_flags: true,
};

function buildPayload(form: SessionForm): CommunitySessionRequest {
  return {
    council_label: form.council_label,
    priority_groups: form.priority_groups
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    fairness_target: form.fairness_target,
    fairness_threshold: Number(form.fairness_threshold),
    evidence_requirements: form.minimum_evidence_tier
      ? { minimum_evidence_tier: form.minimum_evidence_tier }
      : {},
    attestor_policy: form.is_demo ? demoAttestorPolicy : {},
    domain: form.domain,
    jurisdiction: form.jurisdiction,
    is_demo: form.is_demo,
    input_protocol: form.input_protocol,
    input_location: form.input_location,
    participant_count: Number(form.participant_count),
    facilitator: form.facilitator,
    notes: form.notes,
    consensus_summary: form.consensus_summary,
    demographic_summary: {
      majority_race: form.majority_race,
      majority_race_pct: Number(form.majority_race_pct),
      median_age: Number(form.median_age),
      additional: {},
    },
  };
}

export function SessionPage() {
  const [form, setForm] = useState<SessionForm>(demoPreset);
  const [status, setStatus] = useState<GovernanceStatusResponse | null>(null);
  const [active, setActive] = useState<ActiveStandardResponse | null>(null);
  const [result, setResult] = useState<CommunityDraftResponse | CommunityFinalizeResponse | null>(null);
  const [processResult, setProcessResult] = useState<ProcessIntegrityResponse | null>(null);
  const [error, setError] = useState("");
  const [runtimeWarning, setRuntimeWarning] = useState("");

  const payload = useMemo(() => buildPayload(form), [form]);

  const refresh = async () => {
    try {
      const [statusResp, activeResp] = await Promise.all([
        api.getGovernanceStatus(),
        api.getActiveStandard(),
      ]);
      setStatus(statusResp);
      setActive(activeResp);
      setRuntimeWarning("");
    } catch (err) {
      setRuntimeWarning(
        `Live governance state could not be refreshed: ${(err as Error).message}. Actions may still work once API connectivity is restored.`,
      );
    }
  };

  useEffect(() => {
    refresh().catch(() => undefined);
  }, []);

  const updateForm = (key: keyof SessionForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitDraft = async () => {
    setError("");
    try {
      const response = await api.saveDraft(payload);
      setResult(response);
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const finalize = async () => {
    setError("");
    try {
      const response = await api.finalizeSession(payload);
      setResult(response);
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const draftValidation =
    result && "draft" in result ? result.draft.validation : null;
  const draftPreview = result && "draft" in result ? result.draft.config_preview : null;
  const finalizeReceipt = result && "receipt" in result ? result.receipt : null;
  const activeIsDemo = Boolean(active?.config?.is_demo);
  const activeDraftId = result && "draft_id" in result ? result.draft_id : status?.draft_id;

  const submitFacilitationAudit = async () => {
    if (!activeDraftId) {
      setError("Save a draft first, then attach process-integrity evidence.");
      return;
    }
    setError("");
    try {
      const response = await api.recordFacilitationAudit(activeDraftId, sampleFacilitationAudit);
      setProcessResult(response);
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const approveObserverReview = async () => {
    if (!activeDraftId) {
      setError("Save a draft first, then record observer attestation.");
      return;
    }
    setError("");
    try {
      const response = await api.recordObserverAttestation(activeDraftId, sampleObserverAttestation);
      setProcessResult(response);
      await refresh();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <div className="desktop">
        <section className="page-head">
          <div className="eyebrow">Facilitator Flow</div>
          <h1>Draft, finalize, and sign a community fairness standard.</h1>
          <p className="lede">
            This route keeps the founder-critical workflow honest: draft first, finalize manually,
            and expose the resulting standard as demo/sample until the real resident session occurs.
          </p>
        </section>

        {runtimeWarning ? <div className="notice-banner warning-banner">{runtimeWarning}</div> : null}

        <SessionStepFlow steps={stepCards} />

        <div className="session-layout">
          <aside className="session-rail" aria-hidden="true" style={{ display: "none" }} />

          <div className="session-main">
            <Window title="Session Workspace">
              <div className="notice-banner warning-banner">
                Demo / Sample — District 3 session not yet held
              </div>
              <p className="small-copy" style={{ marginTop: "12px" }}>
                The demo standard requires at least validation-test evidence. The bundled Emily VEF
                package is marked output_logs_only, so it demonstrates the new insufficient-evidence gate.
              </p>
              <div className="btn-row">
                <button className="btn" onClick={() => setForm(demoPreset)}>
                  Load Demo District 3 Emily Baseline
                </button>
              </div>
              <div className="form-grid" style={{ marginTop: 18 }}>
                {fieldOrder.map((key) => (
                  <label
                    key={key}
                    className={key === "consensus_summary" || key === "notes" ? "field full" : "field"}
                  >
                    <span>{key.replace(/_/g, " ")}</span>
                    {key === "consensus_summary" || key === "notes" ? (
                      <textarea
                        value={form[key]}
                        onChange={(event) => updateForm(key, event.target.value)}
                      />
                    ) : (
                      <input
                        value={form[key]}
                        onChange={(event) => updateForm(key, event.target.value)}
                      />
                    )}
                  </label>
                ))}
              </div>
              <div className="btn-row">
                <button className="btn" onClick={submitDraft}>
                  Save Draft
                </button>
                <button className="btn btn-primary" onClick={finalize}>
                  {form.is_demo ? "Finalize Demo Standard" : "Finalize Approved Standard"}
                </button>
              </div>
              {error ? <p className="error-text">{error}</p> : null}
            </Window>
          </div>
        </div>

        <SectionLabel>Current State</SectionLabel>
        <div className="grid-two">
          <Window title="Governance Summary">
            {status ? (
              <div className="dl-list">
                <div className="dl-row">
                  <span className="dl-label">State</span>
                  <span className="dl-value">{status.state}</span>
                </div>
                <div className="dl-row">
                  <span className="dl-label">Default Governed</span>
                  <span className="dl-value">{String(status.is_default_governed)}</span>
                </div>
                <div className="dl-row">
                  <span className="dl-label">Pending Draft</span>
                  <span className="dl-value">{String(status.has_pending_draft)}</span>
                </div>
                <div className="dl-row">
                  <span className="dl-label">Jurisdiction</span>
                  <span className="dl-value">{String(status.jurisdiction ?? "—")}</span>
                </div>
                <div className="dl-row">
                  <span className="dl-label">Warning</span>
                  <span className="dl-value">{String(status.warning ?? "None")}</span>
                </div>
              </div>
            ) : (
              <p className="small-copy">Governance state is unavailable until the API responds.</p>
            )}
          </Window>
          <Window title={activeIsDemo ? "Active Demo Standard" : "Active Standard"}>
            {active?.config ? (
              <>
                <div className="dl-list">
                  <div className="dl-row">
                    <span className="dl-label">Jurisdiction</span>
                    <span className="dl-value">{String(active.config.jurisdiction ?? "—")}</span>
                  </div>
                  <div className="dl-row">
                    <span className="dl-label">Domain</span>
                    <span className="dl-value">{String(active.config.domain ?? "—").replace(/_/g, " ")}</span>
                  </div>
                  <div className="dl-row">
                    <span className="dl-label">Threshold</span>
                    <span className="dl-value">{`>= ${active.config.fairness_threshold}`}</span>
                  </div>
                  <div className="dl-row">
                    <span className="dl-label">Reference Group</span>
                    <span className="dl-value">{String(active.config.fairness_target ?? "—")}</span>
                  </div>
                  <div className="dl-row">
                    <span className="dl-label">Minimum Evidence</span>
                    <span className="dl-value">
                      {String(
                        (active.config.evidence_requirements as Record<string, unknown> | undefined)
                          ?.minimum_evidence_tier ?? "None",
                      ).replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="dl-row">
                    <span className="dl-label">Attestors</span>
                    <span className="dl-value">
                      {Object.keys((active.config.attestor_policy as Record<string, unknown> | undefined) ?? {}).length
                        ? "role-based key policy"
                        : "registry defaults"}
                    </span>
                  </div>
                  <div className="dl-row">
                    <span className="dl-label">Receipt Backed</span>
                    <span className="dl-value">{String(Boolean(active.receipt?.ledger_hash))}</span>
                  </div>
                </div>
                {activeIsDemo ? (
                  <p className="small-copy" style={{ marginTop: "12px" }}>
                    This is a sample governed standard. The real District 3 Emily standard begins
                    after the live resident session.
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <p className="small-copy">No finalized standard is active yet.</p>
                <p className="small-copy">Save a draft, then finalize it to generate the signed receipt.</p>
              </>
            )}
          </Window>
        </div>

        <SectionLabel>Process Integrity</SectionLabel>
        <div className="grid-two">
          <Window title="Review Gate">
            <div className="dl-list">
              <div className="dl-row">
                <span className="dl-label">Draft ID</span>
                <span className="dl-value">{activeDraftId ?? "Save a draft first"}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Process State</span>
                <span className="dl-value">{status?.process_integrity_state ?? "—"}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Finalization</span>
                <span className="dl-value">
                  {form.is_demo
                    ? "Demo path allowed"
                    : status?.process_integrity_state === "approved_for_signature"
                      ? "Approved for signature"
                      : "Observer approval required"}
                </span>
              </div>
            </div>
            <div className="btn-row">
              <button className="btn" onClick={submitFacilitationAudit}>
                Attach Sample Audit
              </button>
              <button className="btn btn-primary" onClick={approveObserverReview}>
                Approve as Observer
              </button>
            </div>
          </Window>
          <Window title="Latest Process Action">
            <JsonBlock value={processResult} />
          </Window>
        </div>

        <SectionLabel>Inspect JSON</SectionLabel>
        <div className="grid-two">
          <Window title="Governance Status JSON">
            <JsonBlock value={status} />
          </Window>
          <Window title="Active Standard JSON">
            <JsonBlock value={active} />
          </Window>
        </div>

        {draftValidation ? (
          <div className="grid-two">
            <Window title="Draft Validation">
              <p>
                Community-valid: <b>{draftValidation.is_community_valid ? "yes" : "no"}</b>
              </p>
              <p>
                Valid schema: <b>{draftValidation.is_valid ? "yes" : "no"}</b>
              </p>
              <JsonBlock value={draftValidation.issues} />
            </Window>
            <Window title="Draft Preview">
              <JsonBlock value={draftPreview} />
            </Window>
          </div>
        ) : null}

        {finalizeReceipt ? (
          <Window title="Signed Receipt">
            <div className="dl-list" style={{ marginBottom: "18px" }}>
              <div className="dl-row">
                <span className="dl-label">Ledger Hash</span>
                <span className="dl-value">{finalizeReceipt.ledger_hash.slice(0, 16)}...</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Key ID</span>
                <span className="dl-value">{finalizeReceipt.signature_key_id ?? "—"}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Signed At</span>
                <span className="dl-value">{finalizeReceipt.signed_at ?? "—"}</span>
              </div>
            </div>
            <JsonBlock value={finalizeReceipt} />
          </Window>
        ) : null}

        <Window title="Latest Action">
          <JsonBlock value={result} />
        </Window>
      </div>
    </>
  );
}
