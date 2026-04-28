import { SectionLabel, Window } from "../components/Chrome";

const CROSSWALK = [
  {
    feature: "Community governance session",
    fn: "GOVERN",
    subcategory: "GV-1.1",
    description: "AI risk policy established by affected community, not vendor",
  },
  {
    feature: "Provenance ledger (CPL)",
    fn: "GOVERN",
    subcategory: "GV-6.1",
    description: "Risk decisions documented with append-only SHA-256 audit trail",
  },
  {
    feature: "Published standard registry",
    fn: "GOVERN",
    subcategory: "GV-4.2",
    description: "Governing body roles made publicly accountable via citeable record",
  },
  {
    feature: "Staleness detection",
    fn: "GOVERN",
    subcategory: "GV-5.2",
    description: "Platform flags when a standard should be revisited after the governance window ages",
  },
  {
    feature: "Disparate impact audit",
    fn: "MAP",
    subcategory: "MP-2.3",
    description: "AI risks mapped per protected group using EEOC 4/5ths disparate impact ratio",
  },
  {
    feature: "Community priority groups",
    fn: "MAP",
    subcategory: "MP-5.1",
    description: "Risk magnitude and scope defined by affected community, not vendor defaults",
  },
  {
    feature: "Vendor CSV check",
    fn: "MEASURE",
    subcategory: "MS-2.5",
    description: "AI system tested against governing threshold via periodic evidence submissions",
  },
  {
    feature: "Flagged groups report",
    fn: "MEASURE",
    subcategory: "MS-2.6",
    description: "Risk metrics documented and stored per submission with PASS/FAIL verdict",
  },
  {
    feature: "Ed25519-signed receipt",
    fn: "MEASURE",
    subcategory: "MS-4.1",
    description: "Deployment decisions documented with cryptographic proof of community governance",
  },
  {
    feature: "PDF compliance report",
    fn: "MANAGE",
    subcategory: "MG-2.2",
    description: "Risk response documented and exportable for legal, policy, or procurement review",
  },
  {
    feature: "Contract appendix generator",
    fn: "MANAGE",
    subcategory: "MG-4.1",
    description: "Governed standard packaged for procurement drafting and vendor review as a PDF appendix",
  },
];

const VENDOR_QUESTIONS = [
  "Can you provide disparate impact ratios by protected group for all AI decisions made in our jurisdiction?",
  "Was your fairness threshold set by the affected community or by your own team?",
  "Do you maintain an auditable, tamper-evident record of every policy change to your fairness parameters?",
  "Will you submit periodic evidence CSVs for independent audit against a community-governed threshold?",
  "Is your fairness policy documented in a format a council member can read and a lawyer can cite?",
];

const LIBRA_ANSWERS = [
  "Yes — disparate impact ratios are computed and stored per vendor submission, queryable by jurisdiction.",
  "For a finalized standard, yes — the threshold is set by the resident session and signed into the provenance ledger.",
  "Yes — the receipt and published record preserve a tamper-evident governance trail for review.",
  "Yes — the vendor check endpoint accepts periodic CSV submissions and persists verdict history.",
  "Yes — contract appendix PDF cites slug, threshold, priority groups, and signed receipt hash.",
];

export function CompliancePage() {
  return (
    <>
      <div className="desktop">
        <section className="page-head">
          <div className="eyebrow">Compliance and Procurement</div>
          <h1>NIST RMF crosswalk and procurement tools.</h1>
          <p className="lede">
            This route explains how the live workflow translates into governance, measurement, and
            procurement-ready artifacts a city or procurement office can actually review and use in drafting.
          </p>
        </section>

        <SectionLabel>NIST AI Risk Management Framework Crosswalk</SectionLabel>
        <Window title="Feature → RMF Function Mapping">
          <p className="small-copy" style={{ marginBottom: "16px" }}>
            NIST AI RMF (NIST AI 100-1, 2023). Libra implements or enables the
            following risk management functions across Govern, Map, Measure, and Manage.
          </p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Libra Feature</th>
                <th>RMF Function</th>
                <th>Sub-category</th>
                <th>How It Applies</th>
              </tr>
            </thead>
            <tbody>
              {CROSSWALK.map((row) => (
                <tr key={row.subcategory}>
                  <td style={{ fontWeight: 500 }}>{row.feature}</td>
                  <td>
                    <span className={`fn-badge fn-${row.fn.toLowerCase()}`}>
                      {row.fn}
                    </span>
                  </td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: "11px" }}>{row.subcategory}</td>
                  <td className="small-copy">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Window>

        <SectionLabel>Procurement Checklist</SectionLabel>
        <div className="grid-two">
          <Window title="What to Ask AI Vendors">
            <ol className="compliance-list">
              {VENDOR_QUESTIONS.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ol>
          </Window>
          <Window title="What Libra Answers">
            <ol className="compliance-list answers">
              {LIBRA_ANSWERS.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ol>
          </Window>
        </div>

        <SectionLabel>Buyer Packet</SectionLabel>
        <Window title="For Council Members and Procurement Officers">
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <div className="buyer-label">What Libra Does</div>
              <p style={{ margin: 0 }}>
                Libra measures whether an AI system produces equally fair outcomes for the groups
                your community said matter most. It translates a resident session into a
                cryptographically signed fairness standard and then checks submitted vendor
                evidence against it.
              </p>
            </div>
            <div>
              <div className="buyer-label">How Your Voice Is Captured</div>
              <p style={{ margin: 0 }}>
                A facilitated community session sets the fairness threshold — for example,
                "AI decisions for Black or African American residents must achieve at least 90%
                parity with outcomes for white residents." That number is signed with a
                cryptographic key so a vendor cannot silently change it. The session is recorded
                in an append-only ledger with a tamper-evident receipt.
              </p>
            </div>
            <div>
              <div className="buyer-label">What Happens If a Vendor Fails</div>
              <p style={{ margin: 0 }}>
                The audit produces a PASS or FAIL verdict with specific group-level disparate
                impact data. The contract appendix — downloadable from the Registry — can be
                attached to RFP or contract drafting as a proposed fairness requirement. A failed
                vendor check produces documentation for procurement review, vendor follow-up, or
                contract discussions.
              </p>
            </div>
            <div className="notice-banner">
              <p className="small-copy" style={{ margin: 0 }}>
                <strong>Reference standard:</strong> NIST AI Risk Management Framework (AI 100-1),
                January 2023. Libra's design targets GOVERN, MAP, MEASURE, and MANAGE functions.
                Crosswalk above is informational. Libra supports procurement planning and review;
                formal adoption or enforcement still requires city process and legal counsel.
              </p>
            </div>
          </div>
        </Window>
      </div>
    </>
  );
}
