import { useEffect, useState } from "react";
import {
  ActiveStandardResponse,
  api,
  PublicKeyResponse,
  PublishedStandardDetail,
  ReceiptVerifyResponse,
} from "../lib/api";
import { JsonBlock, Marquee, SectionLabel, Window } from "../components/Chrome";

function standardRows(active: ActiveStandardResponse | null) {
  const config = active?.config;
  const receipt = active?.receipt;

  if (!config) {
    return [
      ["State", "No active governed standard"],
      ["Fallback", "EEOC default threshold applies"],
      ["Planned D3 Pilot", "Emily session still planned, not yet adopted"],
    ] as Array<[string, string]>;
  }

  return [
    ["Jurisdiction", String(config.jurisdiction ?? "—")],
    ["Domain", String(config.domain ?? "—").replace(/_/g, " ")],
    ["Threshold", `≥ ${config.fairness_threshold}`],
    ["Reference Group", String(config.fairness_target ?? "—")],
    ["Priority Groups", Array.isArray(config.priority_groups) ? config.priority_groups.join(", ") : "—"],
    ["Governed At", receipt?.governed_at ? receipt.governed_at.slice(0, 10) : "—"],
  ] as Array<[string, string]>;
}

export function CommunityPage() {
  const [active, setActive] = useState<ActiveStandardResponse | null>(null);
  const [publicKey, setPublicKey] = useState<PublicKeyResponse | null>(null);
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyResult, setVerifyResult] = useState<ReceiptVerifyResponse | null>(null);
  const [publishResult, setPublishResult] = useState<PublishedStandardDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.getActiveStandard(), api.getCommunityPublicKey()])
      .then(([activeResp, keyResp]) => {
        setActive(activeResp);
        setPublicKey(keyResp);
      })
      .catch((err) => setError((err as Error).message));
  }, []);

  const verifyReceipt = async () => {
    setError("");
    setVerifyResult(null);
    try {
      const payload = JSON.parse(verifyInput);
      setVerifyResult(await api.verifyReceipt(payload));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const publish = async () => {
    setError("");
    try {
      const published = await api.publishActiveStandard();
      setPublishResult(published);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const activeIsDemo = Boolean(active?.config?.is_demo);

  return (
    <>
      <Marquee
        items={[
          "<b>COMMUNITY</b> · fairness is a governance decision, not a vendor default",
          "The session creates the standard · finalization makes it live",
          "Receipts can be verified with the public key",
          "District 3 stays planned until the actual resident session happens",
        ]}
      />
      <div className="desktop">
        <section className="editorial-hero">
          <div className="eyebrow">CDF v1 · Community-Defined Fairness</div>
          <h1>The community sets the standard, not the vendor.</h1>
          <p className="lede">
            Libra treats community thresholds as governance outputs. The session produces the
            decision, finalization records it, the receipt proves it, and the registry makes it
            publicly citeable. In District 3, the planned first live use case is Emily, a city
            voice-agent workflow residents would evaluate together in the proposed session.
          </p>
        </section>

        <SectionLabel>Current Standard</SectionLabel>
        <div className="grid-two">
          <Window title={activeIsDemo ? "Active Demo Standard" : "Active Standard"}>
            {activeIsDemo ? (
              <div className="notice-banner warning-banner">
                Demo / Sample — District 3 session not yet held
              </div>
            ) : null}
            <div className="dl-list">
              {standardRows(active).map(([label, value]) => (
                <div className="dl-row" key={label}>
                  <span className="dl-label">{label}</span>
                  <span className="dl-value">{value}</span>
                </div>
              ))}
            </div>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={publish}>
                Publish Active Standard
              </button>
            </div>
          </Window>
          <Window title="Why This Matters">
            <ol className="stack-list">
              <li>Residents define what minimum fairness should mean in context.</li>
              <li>The platform does not treat a draft as governed reality.</li>
              <li>Finalization creates the signed, tamper-evident record.</li>
              <li>Publication turns the standard into a public, procurement-ready record for review.</li>
            </ol>
          </Window>
        </div>

        <SectionLabel>Verification</SectionLabel>
        <div className="grid-two">
          <Window title="Public Key">
            <p className="small-copy">
              The active founder key can be used to verify governed receipts without exposing any
              private signing material.
            </p>
            <div className="dl-list" style={{ marginBottom: "18px" }}>
              <div className="dl-row">
                <span className="dl-label">Key ID</span>
                <span className="dl-value">{publicKey?.key_id ?? "—"}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Algorithm</span>
                <span className="dl-value">{publicKey?.algorithm ?? "—"}</span>
              </div>
            </div>
            <JsonBlock value={publicKey} />
          </Window>
          <Window title="Receipt Verifier">
            <textarea
              className="code-input"
              placeholder="Paste a governed receipt JSON payload here"
              value={verifyInput}
              onChange={(event) => setVerifyInput(event.target.value)}
            />
            <div className="btn-row">
              <button className="btn" onClick={verifyReceipt}>
                Verify Receipt
              </button>
            </div>
            {verifyResult ? (
              <div className="dl-list" style={{ marginBottom: "18px" }}>
                <div className="dl-row">
                  <span className="dl-label">Verified</span>
                  <span className="dl-value">{String(verifyResult.verified)}</span>
                </div>
                <div className="dl-row">
                  <span className="dl-label">Hash Chain Valid</span>
                  <span className="dl-value">{String(verifyResult.hash_chain_valid)}</span>
                </div>
                <div className="dl-row">
                  <span className="dl-label">Signature Valid</span>
                  <span className="dl-value">{String(verifyResult.signature_valid)}</span>
                </div>
              </div>
            ) : null}
            <JsonBlock value={verifyResult} />
          </Window>
        </div>

        {publishResult ? (
          <Window title="Published Standard">
            <div className="notice-banner warning-banner">
              Public demo record created — still not a real District 3 session result
            </div>
            <div className="dl-list" style={{ marginBottom: "18px" }}>
              <div className="dl-row">
                <span className="dl-label">Slug</span>
                <span className="dl-value">{publishResult.slug}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Status</span>
                <span className="dl-value">{publishResult.status}</span>
              </div>
              <div className="dl-row">
                <span className="dl-label">Signature</span>
                <span className="dl-value">{publishResult.signature_status}</span>
              </div>
            </div>
            <JsonBlock value={publishResult} />
          </Window>
        ) : null}

        <SectionLabel>District 3</SectionLabel>
        <Window title="Planned First Live Session">
          <div className="timeline-grid">
            <div className="timeline-row">
              <span>Today</span>
              <p>Draft, finalize, sign, verify, publish, and vendor-check all work in demo/sample mode.</p>
            </div>
            <div className="timeline-row">
              <span>Next</span>
              <p>The District 3 resident session for Emily turns the workflow into a real community standard.</p>
            </div>
            <div className="timeline-row">
              <span>After</span>
              <p>That standard becomes a public civic record the city can review in procurement, audit, and vendor accountability around Emily and future city AI systems.</p>
            </div>
          </div>
        </Window>

        {error ? <div className="notice-banner warning-banner">{error}</div> : null}
      </div>
    </>
  );
}
