import { Link } from "react-router-dom";
import { SectionLabel, Window } from "../components/Chrome";

export function AboutPage() {
  return (
    <div className="desktop">
      <SectionLabel>About Libra</SectionLabel>

      <Window title="What This Project Is">
        <div className="story-grid">
          <p>
            Libra is a working demo built by Matthew Jackson — a Morehouse computer
            science graduate and University of Michigan MADS student — focused on
            community-governed AI fairness.
          </p>
          <p>
            The core claim: fairness thresholds in AI systems are not neutral technical
            defaults. They are governance choices. Libra makes that choice visible as a
            public record — drafted by a community, cryptographically signed, published
            to a registry, and used to check vendor evidence.
          </p>
        </div>
      </Window>

      <SectionLabel>The Problem</SectionLabel>

      <div className="grid-two">
        <Window title="How It Has Worked">
          <p>
            Cities deploy AI systems — voice agents, screening tools, routing models —
            that make decisions affecting residents. The fairness threshold embedded in
            those systems is typically set privately: by the vendor, inherited from a
            regulatory default, or chosen by a researcher before any community input.
          </p>
          <p>
            Residents may only ever see the finished claim: the system passed, failed,
            or needs review. The standard itself is invisible.
          </p>
        </Window>
        <Window title="What Libra Changes">
          <p>
            Libra starts before procurement. A community defines the fairness floor it
            wants vendors measured against. That standard is drafted, reviewed,
            finalized, and signed into a tamper-evident receipt.
          </p>
          <p>
            The receipt is published to a public registry. Anyone can cite it. Vendor
            evidence is then checked against the community's published standard — not
            the vendor's own benchmark.
          </p>
        </Window>
      </div>

      <SectionLabel>How the Registry Works</SectionLabel>

      <Window title="From Community Session to Public Record">
        <div className="story-grid">
          <p>
            The governance workflow has four steps. A community session produces a
            draft fairness standard. The draft is finalized and locked into a governed
            configuration. A cryptographic receipt is generated and signed with an
            Ed25519 key. The signed standard is published to the public registry where
            it can be cited, downloaded, and used in procurement review.
          </p>
          <p>
            Once published, a vendor submits evidence — typically a bias audit or
            disparity measurement — and Libra checks whether the result clears the
            community's recorded threshold. The community defined the bar. The vendor
            is measured against it.
          </p>
        </div>
      </Window>

      <SectionLabel>The Demo Use Case</SectionLabel>

      <Window title="District 3 · Emily Voice Agent">
        <div className="story-grid">
          <p>
            The planned first live session involves District 3 in Detroit and Emily, an
            AI voice agent used to answer resident calls. Residents have raised concerns
            that voice agents may understand some accents, dialects, or speech patterns
            better than others. Libra's governance mechanism lets District 3 residents
            set the fairness floor before the vendor is evaluated — not after.
          </p>
          <p>
            The current site shows a sample standard and a complete demo workflow.
            The real District 3 resident session has not happened yet. All
            demo&thinsp;/&thinsp;sample artifacts are visibly labeled as such and will
            remain so until live governance begins.
          </p>
        </div>
      </Window>

      <SectionLabel>Similar Public Registries</SectionLabel>

      <Window title="What This Builds Toward">
        <div className="story-grid">
          <p>
            Libra is inspired by existing public AI accountability registries such as
            the City of Helsinki AI Register and the Dutch Algorithmic Transparency
            Register. Those registries document what AI systems are in use and why.
            Libra adds the upstream governance step: recording the community's fairness
            standard before a system is measured — not just after it is deployed.
          </p>
          <p>
            The goal is a procurement-ready artifact: a citeable, signed public record
            that a city council, oversight body, or resident can point to and ask
            whether the vendor cleared the community's bar.
          </p>
        </div>
      </Window>

      <div className="btn-row" style={{ marginTop: "2rem", marginBottom: "3rem" }}>
        <Link className="btn btn-primary" to="/community">
          See the Governance Model
          <span className="btn-arrow">→</span>
        </Link>
        <Link className="btn" to="/registry">
          Browse the Registry
        </Link>
        <Link className="btn" to="/audit">
          Check Vendor Evidence
        </Link>
      </div>
    </div>
  );
}
