import { STATIC_PREVIEW } from "./runtime";

export type PublicStats = {
  total_analyses: number;
  total_users: number;
  total_communities: number;
  total_pageviews: number;
};

export type DemographicSummary = {
  majority_race: string;
  majority_race_pct: number;
  median_age: number;
  additional: Record<string, unknown>;
};

export type CommunitySessionRequest = {
  council_label: string;
  priority_groups: string[];
  fairness_target: string;
  fairness_threshold: number;
  evidence_requirements?: Record<string, unknown> | null;
  attestor_policy?: Record<string, unknown> | null;
  domain: string;
  jurisdiction: string;
  is_demo: boolean;
  input_protocol: string;
  input_location: string;
  participant_count: number;
  facilitator: string;
  notes: string;
  consensus_summary: string;
  demographic_summary: DemographicSummary;
  q2q?: Record<string, unknown> | null;
};

export type CommunityValidation = {
  is_valid: boolean;
  is_community_valid: boolean;
  issues: string[];
};

export type ProvenanceReceipt = {
  ledger_hash: string;
  prev_hash: string | null;
  council_label: string;
  participant_count: number;
  demographic_summary: DemographicSummary;
  consensus_summary: string;
  input_protocol: string;
  fairness_threshold: number;
  priority_groups: string[];
  fairness_target: string;
  signature_alg: string | null;
  signature_key_id: string | null;
  signature: string | null;
  signed_at: string | null;
  governed_at: string;
};

export type GovernanceConfig = {
  priority_groups: string[];
  fairness_target: string;
  fairness_threshold: number;
  domain?: string;
  jurisdiction?: string;
  is_demo?: boolean;
  provenance?: Record<string, unknown> | null;
  [key: string]: unknown;
};

export type CommunityDraftResponse = {
  status: "draft_saved";
  state: "draft";
  draft_id: string;
  draft: {
    session: CommunitySessionRequest;
    config_preview: GovernanceConfig;
    validation: CommunityValidation;
    process_integrity_state?: string;
  };
};

export type CommunityFinalizeResponse = {
  status: "finalized";
  state: "active_standard";
  config: GovernanceConfig;
  receipt: ProvenanceReceipt | null;
  ledger_entry_id: number;
  staleness: Record<string, unknown>;
};

export type ActiveStandardResponse = {
  state: "active_standard" | "no_standard";
  config: GovernanceConfig | null;
  receipt: ProvenanceReceipt | null;
  staleness: Record<string, unknown>;
  warning?: string;
};

export type GovernanceStatusResponse = {
  state: string;
  has_pending_draft: boolean;
  is_default_governed: boolean;
  is_stale: boolean;
  warning: string | null;
  is_demo?: boolean;
  domain?: string;
  jurisdiction?: string;
  receipt?: ProvenanceReceipt | null;
  draft?: Record<string, unknown>;
  draft_id?: string;
  process_integrity_state?: string;
  facilitation_audit?: Record<string, unknown> | null;
  observer_attestation?: Record<string, unknown> | null;
  [key: string]: unknown;
};

export type ReceiptVerifyResponse = {
  verified: boolean;
  hash_chain_valid: boolean;
  signature_valid: boolean;
  key_id: string | null;
};

export type PublicKeyResponse = {
  key_id: string;
  algorithm: string;
  public_key_pem: string;
};

export type PublishedStandardSummary = {
  slug: string;
  title: string;
  jurisdiction: string;
  domain: string;
  version: string;
  status: string;
  is_demo: boolean;
  signature_status: string;
  public_path: string;
  published_at: string;
  warning?: string | null;
};

export type PublishedStandardDetail = PublishedStandardSummary & {
  config: GovernanceConfig;
  receipt: ProvenanceReceipt | null;
};

export type VendorCheckResponse = {
  status: string;
  standard_slug: string;
  verdict: string;
  flagged_groups: string[];
  published_standard: {
    slug: string;
    title: string;
    status: string;
    is_demo: boolean;
    jurisdiction: string;
    domain: string;
    receipt: ProvenanceReceipt | null;
  };
  audit_report: Record<string, unknown>;
  warning?: string | null;
  submission_id?: number;
};

export type FacilitationAuditRequest = {
  script_version: string;
  vote_snapshots: Record<string, unknown>;
  transcript_commitment_hash?: string | null;
  audio_commitment_hash?: string | null;
  facilitation_audit_log_hash: string;
  framing_sensitivity_score: number;
  flags: Array<Record<string, unknown>>;
};

export type ObserverAttestationRequest = {
  action: "approve" | "return" | "block";
  observer_name: string;
  observer_role: string;
  notes: string;
  reviewed_flags: boolean;
};

export type ProcessIntegrityResponse = {
  status: string;
  draft_id: string;
  process_integrity_state: string;
  requires_observer_review?: boolean;
  approved_for_signature?: boolean;
  facilitation_audit?: Record<string, unknown>;
  observer_attestation?: Record<string, unknown>;
};

export type VendorEvidenceResponse = {
  status: string;
  standard_slug: string;
  verdict: string;
  verification_status: string;
  flagged_groups: string[];
  source_integrity: Record<string, unknown>;
  audit_report: Record<string, unknown>;
  cure_brief: Record<string, unknown> | null;
  warning?: string | null;
  submission_id?: number;
};

export type VefPackageBuilderResponse = {
  status: string;
  manifest: Record<string, unknown>;
  attestations: Array<Record<string, unknown>>;
  hashes: {
    manifest_hash: string;
    evidence_hash: string;
    package_hash: string;
  };
  attestation_signing_payload: string;
  note: string;
};

export type BensonProofCheck = {
  label: string;
  meaning: string;
  verdict: string;
  verification_status: string;
  flagged_groups: string[];
  failed_metrics: Array<Record<string, unknown>>;
  deficiencies: string[];
  source_integrity: Record<string, unknown>;
  cure_brief_type?: string | null;
};

export type BensonPacketResponse = {
  status: string;
  title: string;
  demo_notice: string;
  standard_slug: string;
  what_libra_does: string[];
  demo_vs_not_authorized: {
    demo: string[];
    not_yet_authorized: string[];
    required_before_live_use: string[];
  };
  district_3_decisions: string[];
  vendor_requirements: string[];
  city_receives: string[];
  proof_checks: BensonProofCheck[];
  artifacts: Record<string, string>;
  privacy_boundary: {
    public_registry_contains: string[];
    public_registry_excludes: string[];
  };
};

export type VendorSubmissionSummary = {
  id: number;
  vendor_name: string;
  reporting_period: string;
  verdict: string;
  verification_status?: string;
  flagged_groups: string[];
  created_at: string;
};

export type SubmissionSummary = {
  id: number;
  vendor_name: string;
  standard_slug: string;
  verdict: string;
  verification_status?: string;
  reporting_period: string;
  created_at: string;
};

export type SubmissionDetail = SubmissionSummary & {
  submission_kind: string;
  flagged_groups: string[];
  source_integrity: Record<string, unknown> | null;
  cure_brief: Record<string, unknown> | null;
  report: Record<string, unknown>;
};

export type ReportSummary = {
  report_id: string;
  report_type: string;
  created_at: string;
  verdict?: string;
};

export const API_KEY_STORAGE = "libra_api_key";

type HealthResponse = {
  status: string;
  version: string;
  service: string;
};

type PreviewState = {
  session: CommunitySessionRequest;
  config: GovernanceConfig;
  receipt: ProvenanceReceipt;
  published: PublishedStandardDetail;
  draft: CommunityDraftResponse | null;
  reports: ReportSummary[];
  submissions: SubmissionSummary[];
  vendorSubmissions: VendorSubmissionSummary[];
  usage: Record<string, unknown>;
};

const PREVIEW_SERVICE: HealthResponse = {
  status: "healthy",
  version: "2026.04-preview",
  service: "Libra Static Preview",
};

const PREVIEW_STATS: PublicStats = {
  total_analyses: 184,
  total_users: 27,
  total_communities: 1,
  total_pageviews: 1326,
};

const PREVIEW_PUBLIC_KEY: PublicKeyResponse = {
  key_id: "founder-demo-key-2026-04",
  algorithm: "Ed25519",
  public_key_pem: `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA7E0N0S6h0K9c4v5bQhQ2sF2cVYyG1GmJ3Y7X1kS2p3A=
-----END PUBLIC KEY-----`,
};

const PREVIEW_SLUG = "demo-detroit-district-3-emily-v0";
const PREVIEW_TIMESTAMP = "2026-04-19T15:30:00Z";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function pseudoHash(seed: string) {
  let acc = 2166136261;
  for (const char of seed) {
    acc ^= char.charCodeAt(0);
    acc = Math.imul(acc, 16777619);
  }
  const block = Math.abs(acc >>> 0).toString(16).padStart(8, "0");
  return `${block}${block}${block}${block}${block}${block}${block}${block}`.slice(0, 64);
}

function previewSession(): CommunitySessionRequest {
  return {
    council_label: "Demo Baseline District 3 Emily Voice Agent",
    priority_groups: ["AAVE"],
    fairness_target: "General American English",
    fairness_threshold: 0.9,
    evidence_requirements: {
      minimum_evidence_tier: "validation_test",
    },
    attestor_policy: {
      allow_demo_attestors: true,
      trusted_key_ids: {
        vendor_log: ["378c5aaf6f88d90d"],
        labeler_sample: ["dece178da2a40ee7"],
        municipal_sample: ["053bac2201292b3e"],
      },
    },
    domain: "voice_agent",
    jurisdiction: "Detroit District 3",
    is_demo: true,
    input_protocol: "community_session",
    input_location: "Detroit, MI",
    participant_count: 12,
    facilitator: "Matt Jackson",
    notes: "Demo sample only. The District 3 Emily session has not yet been held.",
    consensus_summary:
      "Sample participants want Emily to recognize and route Black Detroit residents, including Black American English speakers, as reliably as everyone else.",
    demographic_summary: {
      majority_race: "Black",
      majority_race_pct: 75,
      median_age: 42,
      additional: {
        ward: "District 3",
        use_case: "Emily voice agent",
      },
    },
  };
}

function buildConfig(session: CommunitySessionRequest): GovernanceConfig {
  return {
    priority_groups: clone(session.priority_groups),
    fairness_target: session.fairness_target,
    fairness_threshold: session.fairness_threshold,
    domain: session.domain,
    jurisdiction: session.jurisdiction,
    is_demo: session.is_demo,
    evidence_requirements: clone(session.evidence_requirements ?? {}),
    attestor_policy: clone(session.attestor_policy ?? {}),
    provenance: {
      council_label: session.council_label,
      input_protocol: session.input_protocol,
      facilitator: session.facilitator,
      participant_count: session.participant_count,
    },
  };
}

function buildReceipt(session: CommunitySessionRequest): ProvenanceReceipt {
  const seed = `${session.council_label}:${session.fairness_threshold}:${session.priority_groups.join(",")}`;
  return {
    ledger_hash: pseudoHash(seed),
    prev_hash: pseudoHash(`${session.jurisdiction}:prev`).slice(0, 64),
    council_label: session.council_label,
    participant_count: session.participant_count,
    demographic_summary: clone(session.demographic_summary),
    consensus_summary: session.consensus_summary,
    input_protocol: session.input_protocol,
    fairness_threshold: session.fairness_threshold,
    priority_groups: clone(session.priority_groups),
    fairness_target: session.fairness_target,
    signature_alg: "Ed25519",
    signature_key_id: PREVIEW_PUBLIC_KEY.key_id,
    signature: pseudoHash(`${seed}:signature`),
    signed_at: PREVIEW_TIMESTAMP,
    governed_at: PREVIEW_TIMESTAMP,
  };
}

function standardTitle(config: GovernanceConfig) {
  if (config.is_demo && config.jurisdiction === "Detroit District 3" && config.domain === "voice_agent") {
    return "Demo Detroit District 3 Emily Voice Agent Standard";
  }
  return `${config.is_demo ? "Demo " : ""}${config.jurisdiction ?? "Community"} ${String(config.domain ?? "fairness")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (value) => value.toUpperCase())} Standard`;
}

function buildPublishedStandard(config: GovernanceConfig, receipt: ProvenanceReceipt): PublishedStandardDetail {
  return {
    slug: PREVIEW_SLUG,
    title: standardTitle(config),
    jurisdiction: String(config.jurisdiction ?? "Detroit District 3"),
    domain: String(config.domain ?? "voice_agent"),
    version: "v0",
    status: "active",
    is_demo: Boolean(config.is_demo),
    signature_status: receipt.signature ? "signed" : "unsigned",
    public_path: `#/registry/${PREVIEW_SLUG}`,
    published_at: PREVIEW_TIMESTAMP,
    warning: "Demo / Sample — not a real District 3 session result.",
    config: clone(config),
    receipt: clone(receipt),
  };
}

function createPreviewState(): PreviewState {
  const session = previewSession();
  const config = buildConfig(session);
  const receipt = buildReceipt(session);
  return {
    session,
    config,
    receipt,
    published: buildPublishedStandard(config, receipt),
    draft: null,
    usage: {
      plan: "static_preview",
      requests_this_month: 184,
      registry_records: 1,
      last_activity_at: PREVIEW_TIMESTAMP,
      note: "Bundled sample data only. No live tenant data is included in this build.",
    },
    reports: [
      {
        report_id: "rpt_preview_json_001",
        report_type: "json_audit",
        created_at: PREVIEW_TIMESTAMP,
        verdict: "FAIL",
      },
      {
        report_id: "rpt_preview_ll144_002",
        report_type: "ll144",
        created_at: "2026-04-18T11:00:00Z",
        verdict: "PASS",
      },
    ],
    submissions: [
      {
        id: 1,
        vendor_name: "Demo Emily Voice Vendor",
        standard_slug: PREVIEW_SLUG,
        verdict: "FAIL",
        reporting_period: "2026-Q2",
        created_at: PREVIEW_TIMESTAMP,
      },
    ],
    vendorSubmissions: [
      {
        id: 1,
        vendor_name: "Demo Emily Voice Vendor",
        reporting_period: "2026-Q2",
        verdict: "FAIL",
        flagged_groups: ["Black or African American"],
        created_at: PREVIEW_TIMESTAMP,
      },
    ],
  };
}

let previewState = createPreviewState();

function currentStatus(): GovernanceStatusResponse {
  return {
    state: "active_standard",
    has_pending_draft: Boolean(previewState.draft),
    is_default_governed: false,
    is_stale: false,
    warning: "Demo / Sample — District 3 session not yet held.",
    is_demo: true,
    domain: String(previewState.config.domain ?? "voice_agent"),
    jurisdiction: String(previewState.config.jurisdiction ?? "Detroit District 3"),
    receipt: clone(previewState.receipt),
    draft: previewState.draft ? clone(previewState.draft.draft) : undefined,
  };
}

function currentActiveStandard(): ActiveStandardResponse {
  return {
    state: "active_standard",
    config: clone(previewState.config),
    receipt: clone(previewState.receipt),
    staleness: {
      is_stale: false,
      days_since_governance: 0,
      recommended_action: "No action required in preview mode.",
    },
    warning: "Demo / Sample — District 3 session not yet held.",
  };
}

function currentPublishedSummary(): PublishedStandardSummary {
  const { config, receipt, ...summary } = previewState.published;
  return clone(summary);
}

function currentPublishedReference() {
  return {
    slug: previewState.published.slug,
    title: previewState.published.title,
    status: previewState.published.status,
    is_demo: previewState.published.is_demo,
    jurisdiction: previewState.published.jurisdiction,
    domain: previewState.published.domain,
    receipt: clone(previewState.receipt),
  };
}

function parseJsonBody<T>(body: BodyInit | null | undefined): T {
  if (typeof body !== "string") {
    throw new Error("Static preview expected a JSON request body.");
  }
  return JSON.parse(body) as T;
}

function sampleAuditReport(kind: string) {
  return {
    status: "preview_complete",
    action: kind,
    governance_state: "active_standard",
    tenant_governance_state: "active_standard",
    community_config: clone(previewState.config),
    metrics: {
      reference_group: previewState.config.fairness_target,
      fairness_threshold: previewState.config.fairness_threshold,
      disparate_impact: {
        White: 1,
        "Black or African American": 0.8,
        Latinx: 0.75,
      },
    },
    verdict: "FAIL",
    note: "Static preview build uses bundled sample data. Uploaded files are not processed in this build.",
    provenance_receipt: clone(previewState.receipt),
  };
}

function sampleVendorCheck(vendorName: string, reportingPeriod: string): VendorCheckResponse {
  return {
    status: "checked",
    standard_slug: previewState.published.slug,
    verdict: "FAIL",
    flagged_groups: ["Black or African American"],
    published_standard: currentPublishedReference(),
    audit_report: {
      metrics: {
        reference_group: previewState.config.fairness_target,
        fairness_threshold: previewState.config.fairness_threshold,
        disparate_impact: {
          White: 1,
          "Black or African American": 0.8,
          Latinx: 0.75,
        },
      },
      note: "Static preview build uses the bundled vendor sample rather than a live upload.",
    },
    warning: "Sample vendor evidence check.",
    submission_id: previewState.submissions.length + 1,
  };
}

function sampleVendorEvidence(vendorName: string, reportingPeriod: string): VendorEvidenceResponse {
  return {
    status: "success",
    standard_slug: previewState.published.slug,
    verdict: "INSUFFICIENT_EVIDENCE",
    verification_status: "insufficient",
    flagged_groups: [],
    source_integrity: {
      manifest_hash: pseudoHash("preview_manifest"),
      evidence_hash: pseudoHash("preview_evidence"),
      package_hash: pseudoHash("preview_package"),
      missing_attestation_types: ["vendor_log", "labeler_sample", "municipal_sample"],
    },
    audit_report: {
      status: "not_evaluated",
      deficiencies: [
        "Static preview does not process uploaded VEF files.",
        "Submit co-signed source attestations in live mode for PASS_VERIFIED eligibility.",
      ],
    },
    cure_brief: {
      type: "evidence_deficiency",
      status: "open",
      deficiencies: ["Static preview VEF package is illustrative only."],
      required_retest_evidence: [
        "Submit manifest.json, evidence.csv, and attestations.json in live API mode.",
      ],
      allowed_remediation_families: ["Provide co-signed source logs.", "Re-submit complete VEF package."],
    },
    warning: "Sample VEF evidence check.",
    submission_id: previewState.submissions.length + 1,
  };
}

function sampleVefPackageBuilder(manifest: Record<string, unknown>): VefPackageBuilderResponse {
  const normalizedManifest = {
    ...manifest,
    evidence_csv_hash: pseudoHash("preview_evidence"),
    evidence_package_hash: pseudoHash("preview_package"),
  };
  return {
    status: "success",
    manifest: normalizedManifest,
    attestations: [],
    hashes: {
      manifest_hash: pseudoHash("preview_manifest"),
      evidence_hash: String(normalizedManifest.evidence_csv_hash),
      package_hash: String(normalizedManifest.evidence_package_hash),
    },
    attestation_signing_payload: String(normalizedManifest.evidence_csv_hash),
    note: "Static preview produces illustrative hashes only.",
  };
}

function sampleBensonPacket(): BensonPacketResponse {
  return {
    status: "demo_baseline_for_planning",
    title: "Libra Detroit District 3 Emily Pre-Pilot Proof Packet",
    demo_notice:
      "This packet is a planning artifact for Benson / District 3 conversations. It does not claim that a real District 3 resident session has occurred.",
    standard_slug: "demo-detroit-district-3-emily-v0",
    what_libra_does: [
      "Turns resident-facing fairness choices into a signed technical standard.",
      "Checks vendor VEF evidence against that standard without requiring model weights.",
      "Separates model failure, evidence insufficiency, and source-verification weakness.",
      "Produces cure briefs and contract-ready proof artifacts for city review.",
    ],
    demo_vs_not_authorized: {
      demo: [
        "Sample District 3 Emily standard",
        "Sample VEF manifest/evidence/attestations",
        "Demo-only trusted attestor public keys",
        "Generated cure-brief scenarios",
      ],
      not_yet_authorized: [
        "A real District 3 fairness threshold",
        "A resident mandate",
        "A procurement enforcement action",
        "A live vendor compliance finding",
      ],
      required_before_live_use: [
        "Real resident session",
        "Process-integrity audit",
        "Human observer approval",
        "Live attestor/key policy selected by the city",
      ],
    },
    district_3_decisions: [
      "Which speech varieties or protected groups must be measured.",
      "Which reference group vendor outcomes compare against.",
      "Which parity threshold applies, such as 0.90 or 0.95.",
      "Which minimum evidence tier vendors must submit.",
      "Whether absolute floors, such as 95% AAVE resolution success, are required.",
      "What cure, reconvening, or replacement path applies after a vendor failure.",
    ],
    vendor_requirements: [
      "manifest.json with system identity, protected attribute, evidence tier, and hashes.",
      "evidence.csv with row-level outcome evidence and no raw resident speech in the public registry.",
      "attestations.json with role-matched Ed25519 signatures from trusted vendor, labeler, and municipal/sample keys.",
    ],
    city_receives: [
      "A verdict: PASS_VERIFIED, FAIL_VERIFIED, PASS_SELF_ATTESTED, FAIL_SELF_ATTESTED, or INSUFFICIENT_EVIDENCE.",
      "Public source-integrity hashes and accepted/rejected attestor details.",
      "A cure brief when evidence fails or is incomplete.",
      "A contract appendix tied to the signed community standard.",
    ],
    proof_checks: [
      {
        label: "Demo evidence with no minimum tier",
        meaning: "The sample package verifies its source chain, then fails the 0.90 AAVE parity threshold.",
        verdict: "FAIL_VERIFIED",
        verification_status: "verified",
        flagged_groups: ["AAVE"],
        failed_metrics: [],
        deficiencies: [],
        source_integrity: {},
        cure_brief_type: "gap_analysis",
      },
      {
        label: "Same evidence under validation-test requirement",
        meaning: "The output-log package is too weak for the stricter standard, so metrics are not treated as authoritative.",
        verdict: "INSUFFICIENT_EVIDENCE",
        verification_status: "insufficient",
        flagged_groups: [],
        failed_metrics: [],
        deficiencies: ["manifest.evidence_tier 'output_logs_only' does not meet the standard's minimum required tier 'validation_test'"],
        source_integrity: {},
        cure_brief_type: "evidence_deficiency",
      },
      {
        label: "Demo keys against a live standard",
        meaning: "Demo-only keys cannot create a verified live finding; the same evidence downgrades to self-attested.",
        verdict: "FAIL_SELF_ATTESTED",
        verification_status: "self_attested",
        flagged_groups: ["AAVE"],
        failed_metrics: [],
        deficiencies: [],
        source_integrity: {},
        cure_brief_type: "gap_analysis",
      },
    ],
    artifacts: {
      markdown_packet: "/api/v1/registry/demo/vef/benson-packet.md",
      manifest_json: "/api/v1/registry/demo/vef/manifest.json",
      evidence_csv: "/api/v1/registry/demo/vef/evidence.csv",
      attestations_json: "/api/v1/registry/demo/vef/attestations.json",
      trusted_attestors: "/api/v1/registry/vef/trusted-attestors",
    },
    privacy_boundary: {
      public_registry_contains: ["Hashes", "Aggregate verdicts", "Attestor key IDs and roles", "Cure-brief deficiencies"],
      public_registry_excludes: [
        "Raw resident audio",
        "Raw resident transcripts",
        "Searchable resident statements",
        "Vendor model weights or training data unless separately authorized",
      ],
    },
  };
}

async function previewRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const method = (init.method ?? "GET").toUpperCase();

  if (method === "GET" && path === "/health") {
    return clone(PREVIEW_SERVICE) as T;
  }
  if (method === "GET" && path === "/api/v1/stats/public") {
    return clone(PREVIEW_STATS) as T;
  }
  if (method === "GET" && path === "/api/v1/fairness/community/status") {
    return clone(currentStatus()) as T;
  }
  if (method === "GET" && path === "/api/v1/fairness/community/active") {
    return clone(currentActiveStandard()) as T;
  }
  if (method === "GET" && path === "/api/v1/billing/usage") {
    return clone(previewState.usage) as T;
  }
  if (method === "POST" && path === "/api/v1/fairness/community/session/draft") {
    const payload = parseJsonBody<CommunitySessionRequest>(init.body);
    const response: CommunityDraftResponse = {
      status: "draft_saved",
      state: "draft",
      draft_id: "draft_preview_001",
      draft: {
        session: clone(payload),
        config_preview: buildConfig(payload),
        validation: {
          is_valid: true,
          is_community_valid: true,
          issues: [],
        },
        process_integrity_state: "clean",
      },
    };
    previewState.draft = clone(response);
    return response as T;
  }
  if (method === "POST" && path.startsWith("/api/v1/fairness/community/session/") && path.endsWith("/facilitation-audit")) {
    const parts = path.split("/");
    const draftId = parts[parts.length - 2] ?? "draft_preview_001";
    const payload = parseJsonBody<FacilitationAuditRequest>(init.body);
    const processState =
      payload.framing_sensitivity_score >= 0.1 || payload.flags.length
        ? "review_required"
        : "clean";
    if (previewState.draft) {
      previewState.draft.draft.process_integrity_state = processState;
    }
    return {
      status: "facilitation_audit_recorded",
      draft_id: draftId,
      process_integrity_state: processState,
      requires_observer_review: processState === "review_required",
      facilitation_audit: payload,
    } as T;
  }
  if (method === "POST" && path.startsWith("/api/v1/fairness/community/session/") && path.endsWith("/observer-attestation")) {
    const parts = path.split("/");
    const draftId = parts[parts.length - 2] ?? "draft_preview_001";
    const payload = parseJsonBody<ObserverAttestationRequest>(init.body);
    const stateByAction = {
      approve: "approved_for_signature",
      return: "returned_for_reconsideration",
      block: "blocked_due_to_process_integrity",
    } as const;
    const processState = stateByAction[payload.action];
    if (previewState.draft) {
      previewState.draft.draft.process_integrity_state = processState;
    }
    return {
      status: "observer_attestation_recorded",
      draft_id: draftId,
      process_integrity_state: processState,
      approved_for_signature: processState === "approved_for_signature",
      observer_attestation: payload,
    } as T;
  }
  if (method === "POST" && path === "/api/v1/fairness/community/session/finalize") {
    const payload = parseJsonBody<CommunitySessionRequest>(init.body);
    previewState.session = clone(payload);
    previewState.config = buildConfig(payload);
    previewState.receipt = buildReceipt(payload);
    previewState.draft = null;
    const response: CommunityFinalizeResponse = {
      status: "finalized",
      state: "active_standard",
      config: clone(previewState.config),
      receipt: clone(previewState.receipt),
      ledger_entry_id: 1,
      staleness: {
        is_stale: false,
        days_since_governance: 0,
      },
    };
    return response as T;
  }
  if (method === "GET" && path === "/api/v1/fairness/community/public-key") {
    return clone(PREVIEW_PUBLIC_KEY) as T;
  }
  if (method === "POST" && path === "/api/v1/fairness/community/verify") {
    const payload = parseJsonBody<ProvenanceReceipt | Record<string, unknown>>(init.body);
    const ledgerHash = String((payload as Record<string, unknown>).ledger_hash ?? "");
    const signature = String((payload as Record<string, unknown>).signature ?? "");
    const verified =
      ledgerHash === previewState.receipt.ledger_hash &&
      signature === previewState.receipt.signature;
    return {
      verified,
      hash_chain_valid: verified,
      signature_valid: verified,
      key_id: PREVIEW_PUBLIC_KEY.key_id,
    } as T;
  }
  if (method === "POST" && path === "/api/v1/demo/analyze") {
    const payload = parseJsonBody<{ text?: string; categories?: string[] }>(init.body);
    const text = payload.text ?? "";
    return {
      status: "preview_complete",
      text,
      categories: payload.categories ?? [],
      matches: [
        text.toLowerCase().includes("chairman")
          ? {
              category: "gender",
              term: "chairman",
              reason: "Gender-coded role title detected in preview analysis.",
            }
          : {
              category: "none",
              term: "No strong-coded term detected",
              reason: "Preview mode returns bundled example findings.",
            },
      ],
    } as T;
  }
  if (method === "POST" && path === "/api/v1/analyze/text") {
    return {
      status: "preview_complete",
      governance_state: "active_standard",
      provenance_receipt: clone(previewState.receipt),
      note: "Static preview response.",
    } as T;
  }
  if (method === "POST" && path === "/api/v1/fairness/audit") {
    return sampleAuditReport("json_audit") as T;
  }
  if (method === "POST" && path === "/api/v1/registry/standards/publish") {
    previewState.published = buildPublishedStandard(previewState.config, previewState.receipt);
    return clone(previewState.published) as T;
  }
  if (method === "GET" && path === "/api/v1/registry/standards") {
    return { items: [currentPublishedSummary()] } as T;
  }
  if (method === "GET" && path === `/api/v1/registry/standards/${previewState.published.slug}`) {
    return clone(previewState.published) as T;
  }
  if (method === "GET" && path === `/api/v1/registry/standards/${previewState.published.slug}/vendor-submissions`) {
    return { items: clone(previewState.vendorSubmissions) } as T;
  }
  if (method === "POST" && path === `/api/v1/registry/standards/${previewState.published.slug}/vendor-check`) {
    const body = init.body instanceof FormData ? init.body : new FormData();
    const vendorName = String(body.get("vendor_name") ?? "Preview Vendor");
    const reportingPeriod = String(body.get("reporting_period") ?? "2026-Q2");
    const response = sampleVendorCheck(vendorName, reportingPeriod);
    previewState.submissions.unshift({
      id: Number(response.submission_id ?? previewState.submissions.length + 1),
      vendor_name: vendorName,
      standard_slug: previewState.published.slug,
      verdict: response.verdict,
      reporting_period: reportingPeriod,
      created_at: PREVIEW_TIMESTAMP,
    });
    previewState.vendorSubmissions.unshift({
      id: Number(response.submission_id ?? previewState.vendorSubmissions.length + 1),
      vendor_name: vendorName,
      reporting_period: reportingPeriod,
      verdict: response.verdict,
      flagged_groups: clone(response.flagged_groups),
      created_at: PREVIEW_TIMESTAMP,
    });
    return response as T;
  }
  if (method === "POST" && path === `/api/v1/registry/standards/${previewState.published.slug}/vendor-evidence`) {
    const body = init.body instanceof FormData ? init.body : new FormData();
    let manifest: Record<string, unknown> = {};
    try {
      manifest = JSON.parse(String(body.get("manifest_json") ?? "{}")) as Record<string, unknown>;
    } catch {
      manifest = {};
    }
    const vendorName = String(manifest.vendor_name ?? "Preview Vendor");
    const reportingPeriod = String(manifest.reporting_period ?? "2026-Q2");
    const response = sampleVendorEvidence(vendorName, reportingPeriod);
    previewState.submissions.unshift({
      id: Number(response.submission_id ?? previewState.submissions.length + 1),
      vendor_name: vendorName,
      standard_slug: previewState.published.slug,
      verdict: response.verdict,
      verification_status: response.verification_status,
      reporting_period: reportingPeriod,
      created_at: PREVIEW_TIMESTAMP,
    });
    return response as T;
  }
  if (method === "POST" && path === "/api/v1/registry/vef/package-builder") {
    const body = init.body instanceof FormData ? init.body : new FormData();
    let manifest: Record<string, unknown> = {};
    try {
      manifest = JSON.parse(String(body.get("manifest_json") ?? "{}")) as Record<string, unknown>;
    } catch {
      manifest = {};
    }
    return sampleVefPackageBuilder(manifest) as T;
  }
  if (method === "GET" && path === "/api/v1/registry/vef/trusted-attestors") {
    return {
      items: [
        {
          key_id: "378c5aaf6f88d90d",
          name: "Preview Emily Vendor Logs",
          role: "vendor",
          allowed_types: ["vendor_log"],
          public_key_pem: PREVIEW_PUBLIC_KEY.public_key_pem,
          demo_only: true,
          status: "active",
          valid_from: null,
          expires_at: null,
        },
        {
          key_id: "dece178da2a40ee7",
          name: "Preview Independent Labeler",
          role: "labeler",
          allowed_types: ["labeler_sample"],
          public_key_pem: PREVIEW_PUBLIC_KEY.public_key_pem,
          demo_only: true,
          status: "active",
          valid_from: null,
          expires_at: null,
        },
        {
          key_id: "053bac2201292b3e",
          name: "Preview Municipal Sample Auditor",
          role: "municipal",
          allowed_types: ["municipal_sample"],
          public_key_pem: PREVIEW_PUBLIC_KEY.public_key_pem,
          demo_only: true,
          status: "active",
          valid_from: null,
          expires_at: null,
        },
      ],
    } as T;
  }
  if (method === "GET" && path === "/api/v1/registry/demo/benson-packet") {
    return sampleBensonPacket() as T;
  }
  if (method === "GET" && path === "/api/v1/registry/submissions") {
    return { items: clone(previewState.submissions) } as T;
  }
  if (method.startsWith("GET") && path.match(/^\/api\/v1\/registry\/submissions\/\d+\/cure-brief$/)) {
    const parts = path.split("/");
    return {
      submission_id: Number(parts[parts.length - 2]),
      cure_brief: {
        type: "evidence_deficiency",
        status: "open",
        deficiencies: ["Static preview submission detail."],
      },
    } as T;
  }
  if (method.startsWith("GET") && path.match(/^\/api\/v1\/registry\/submissions\/\d+$/)) {
    const parts = path.split("/");
    const id = Number(parts[parts.length - 1]);
    const submission = previewState.submissions.find((item) => item.id === id) ?? previewState.submissions[0];
    return {
      ...clone(submission),
      submission_kind: "vef_v1",
      flagged_groups: ["Black or African American"],
      source_integrity: { package_hash: pseudoHash("preview_package") },
      cure_brief: {
        type: "evidence_deficiency",
        status: "open",
        deficiencies: ["Static preview submission detail."],
      },
      report: { status: "preview_complete" },
    } as T;
  }
  if (method === "GET" && path === "/api/v1/analyze/reports") {
    return { items: clone(previewState.reports) } as T;
  }
  if (method === "POST" && path.startsWith("/api/v1/fairness/audit/")) {
    const action = path.replace("/api/v1/fairness/audit/", "");
    return sampleAuditReport(action) as T;
  }

  throw new Error(`Static preview does not implement ${method} ${path}.`);
}

export function getApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) ?? "";
}

export function setApiKey(value: string) {
  localStorage.setItem(API_KEY_STORAGE, value);
}

async function request<T>(path: string, init: RequestInit = {}, apiKey?: string): Promise<T> {
  if (STATIC_PREVIEW) {
    return previewRequest<T>(path, init);
  }

  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  const resolvedApiKey = apiKey ?? getApiKey();
  if (resolvedApiKey) {
    headers.set("X-API-Key", resolvedApiKey);
  }

  const response = await fetch(path, { ...init, headers });
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const detail =
      typeof payload === "object" && payload !== null && "detail" in payload
        ? String((payload as { detail: string }).detail)
        : String(payload);
    throw new Error(detail || `Request failed with status ${response.status}`);
  }
  return payload as T;
}

export const api = {
  getHealth: () => request<{ status: string; version: string; service: string }>("/health"),
  getPublicStats: () => request<PublicStats>("/api/v1/stats/public"),
  getGovernanceStatus: () => request<GovernanceStatusResponse>("/api/v1/fairness/community/status"),
  getActiveStandard: () => request<ActiveStandardResponse>("/api/v1/fairness/community/active"),
  getUsage: () => request<Record<string, unknown>>("/api/v1/billing/usage"),
  saveDraft: (payload: CommunitySessionRequest) =>
    request<CommunityDraftResponse>("/api/v1/fairness/community/session/draft", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  finalizeSession: (payload: CommunitySessionRequest) =>
    request<CommunityFinalizeResponse>("/api/v1/fairness/community/session/finalize", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  recordFacilitationAudit: (draftId: string, payload: FacilitationAuditRequest) =>
    request<ProcessIntegrityResponse>(`/api/v1/fairness/community/session/${draftId}/facilitation-audit`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  recordObserverAttestation: (draftId: string, payload: ObserverAttestationRequest) =>
    request<ProcessIntegrityResponse>(`/api/v1/fairness/community/session/${draftId}/observer-attestation`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  getCommunityPublicKey: () =>
    request<PublicKeyResponse>("/api/v1/fairness/community/public-key"),
  verifyReceipt: (payload: ProvenanceReceipt | Record<string, unknown>) =>
    request<ReceiptVerifyResponse>("/api/v1/fairness/community/verify", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  analyzeTextDemo: (payload: unknown) =>
    request<Record<string, unknown>>("/api/v1/demo/analyze", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  analyzeText: (payload: unknown) =>
    request<Record<string, unknown>>("/api/v1/analyze/text", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  auditJson: (payload: unknown) =>
    request<Record<string, unknown>>("/api/v1/fairness/audit", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  publishActiveStandard: () =>
    request<PublishedStandardDetail>("/api/v1/registry/standards/publish", {
      method: "POST",
    }),
  listPublishedStandards: () =>
    request<{ items: PublishedStandardSummary[] }>("/api/v1/registry/standards"),
  getPublishedStandard: (slug: string) =>
    request<PublishedStandardDetail>(`/api/v1/registry/standards/${slug}`),
  getVendorSubmissions: (slug: string) =>
    request<{ items: VendorSubmissionSummary[] }>(`/api/v1/registry/standards/${slug}/vendor-submissions`),
  listMySubmissions: () =>
    request<{ items: SubmissionSummary[] }>("/api/v1/registry/submissions"),
  getSubmissionDetail: (submissionId: number) =>
    request<SubmissionDetail>(`/api/v1/registry/submissions/${submissionId}`),
  getSubmissionCureBrief: (submissionId: number) =>
    request<{ submission_id: number; cure_brief: Record<string, unknown> | null }>(
      `/api/v1/registry/submissions/${submissionId}/cure-brief`,
    ),
  getBensonPacket: () =>
    request<BensonPacketResponse>("/api/v1/registry/demo/benson-packet"),
  listReports: () =>
    request<{ items: ReportSummary[] }>("/api/v1/analyze/reports"),
};

export function makeUploadForm(fields: Record<string, string>, file: File) {
  const form = new FormData();
  Object.entries(fields).forEach(([key, value]) => form.append(key, value));
  form.append("file", file);
  return form;
}

export async function uploadAction(
  path: string,
  fields: Record<string, string>,
  file?: File | null,
): Promise<Record<string, unknown>> {
  const body = new FormData();
  Object.entries(fields).forEach(([key, value]) => body.append(key, value));
  if (file) {
    body.append("file", file);
  }
  return request<Record<string, unknown>>(path, {
    method: "POST",
    body,
  });
}

export async function uploadVendorEvidence(
  slug: string,
  manifestJson: string,
  evidenceFile?: File | null,
  attestationsJson?: string,
): Promise<VendorEvidenceResponse> {
  const body = new FormData();
  body.append("manifest_json", manifestJson);
  if (attestationsJson) {
    body.append("attestations_json", attestationsJson);
  }
  if (evidenceFile) {
    body.append("evidence_csv", evidenceFile);
  }
  return request<VendorEvidenceResponse>(`/api/v1/registry/standards/${slug}/vendor-evidence`, {
    method: "POST",
    body,
  });
}

export async function buildVendorEvidencePackage(
  manifestJson: string,
  evidenceFile?: File | null,
  attestationsJson?: string,
): Promise<VefPackageBuilderResponse> {
  const body = new FormData();
  body.append("manifest_json", manifestJson);
  if (attestationsJson) {
    body.append("attestations_json", attestationsJson);
  }
  if (evidenceFile) {
    body.append("evidence_csv", evidenceFile);
  }
  return request<VefPackageBuilderResponse>("/api/v1/registry/vef/package-builder", {
    method: "POST",
    body,
  });
}
