import { Link } from "react-router-dom";
import { SectionLabel, Window } from "../components/Chrome";

const recordItems = [
  ["01", "Community fairness standard", "The public rule the community wants vendors measured against."],
  ["02", "Signed governance receipt", "A tamper-evident proof of what standard was recorded."],
  ["03", "Public registry record", "A citeable page that keeps the standard visible for review."],
  ["04", "Vendor evidence check", "A sample way to compare vendor evidence with the published standard."],
] as const;

export function HomePage() {
  return (
    <>
      <div className="dark-hero">
        <div className="desktop">
          <section className="hero-stage hero-stage-dark">
            <div className="hero-copy">
              <div className="eyebrow">Community-Governed AI Fairness</div>
              <h1>
                <span className="chroma" data-text="The community sets the standard, not the vendor.">
                  The community sets the standard, not the vendor.
                </span>
              </h1>
              <div className="hero-rule">
                <span className="hero-rule-block accent" />
                <span className="hero-rule-block soft" />
                <span className="hero-rule-line" />
              </div>
              <p className="lede">
                Libra is a public record system for AI fairness decisions. It helps a community
                choose what “fair enough” should mean, records that choice, and checks vendor
                evidence against it before the result is treated as trustworthy.
              </p>
              <div className="btn-row hero-btn-row">
                <a className="btn btn-primary btn-strong" href="#what-is-libra">
                  Start With the Story
                  <span className="btn-arrow">→</span>
                </a>
                <Link className="btn btn-on-dark" to="/community">
                  See the Governance Model
                </Link>
                <Link className="btn btn-on-dark" to="/audit">
                  Check Vendor Evidence
                </Link>
              </div>
              <div className="hero-meta">
                <span className="hero-meta-amber">◆ ED25519</span>
                <span>signed receipts</span>
                <span className="hero-meta-sep">·</span>
                <span>sha256:a3f7c2…</span>
              </div>
            </div>
            <div className="hero-receipt hero-receipt-light">
              <div className="hero-receipt-head">
                <div className="hero-receipt-stamp">SESSION EXAMPLE</div>
                <div className="hero-receipt-title">District 3 · Emily</div>
                <p className="hero-receipt-note">
                  Proposed resident session to set the community fairness standard before procurement
                  review and vendor measurement begin.
                </p>
              </div>
              <div className="hero-receipt-row"><span>SUBJECT</span><span>Emily AI voice agent</span></div>
              <div className="hero-receipt-row"><span>JURISDICTION</span><span>Detroit District 3</span></div>
              <div className="hero-receipt-row"><span>CONVENED BY</span><span>Office of CM Benson</span></div>
              <div className="hero-receipt-row"><span>STATUS</span><span>Session not yet conducted</span></div>
              <div className="hero-receipt-row"><span>THRESHOLD</span><span>0.90 disparate impact ratio</span></div>
              <div className="hero-receipt-row"><span>WORKFLOW</span><span>Demo standard live now</span></div>
              <div className="hero-receipt-row"><span>PUBLIC OUTPUTS</span><span>Registry · appendix · vendor check</span></div>
              <div className="hero-receipt-row"><span>TIMELINE</span><span>60 days from go-ahead</span></div>
              <div className="hero-receipt-foot">
                Real District 3 governance begins after the live resident session.
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="desktop">
        <SectionLabel>What Is Libra?</SectionLabel>
        <Window title="Plain-Language Background" className="clarity-window" >
          <div id="what-is-libra" className="story-grid">
            <p>
              Cities are starting to use AI systems in public services: voice agents, screening
              tools, routing systems, scoring models, and other automated helpers. These systems
              can work well for some residents and worse for others.
            </p>
            <p>
              The important question is not only whether a system is accurate. It is who gets to
              decide the fairness standard before a vendor claims the system is acceptable. Libra
              makes that decision visible as a public record.
            </p>
          </div>
        </Window>

        <div className="grid-two">
          <Window title="The Old Way">
            <p>
              A vendor, researcher, or default rule often defines the fairness threshold privately.
              Residents may only see a finished claim: the system passed, failed, or needs review.
            </p>
          </Window>
          <Window title="What Libra Changes">
            <p>
              Libra starts with the affected community. The community standard is drafted,
              finalized, signed, published, and then used to check vendor evidence.
            </p>
          </Window>
        </div>

        <SectionLabel>Human Entry Point</SectionLabel>
        <Window title="Start With a Resident Concern">
          <div className="story-grid">
            <p>
              Imagine a city uses an AI voice agent to answer resident calls. Residents may worry
              that it understands some accents, dialects, or speech patterns better than others.
            </p>
            <p>
              Libra’s demo asks: before the vendor is evaluated, what fairness floor should the
              community require? The current District 3 / Emily material is only a session example;
              the real resident session has not happened yet.
            </p>
          </div>
        </Window>

        <SectionLabel>What the Demo Is Showing</SectionLabel>
        <div className="grid-two">
          <Window title="What You Can Inspect">
            <ol className="stack-list">
              <li>A sample community standard.</li>
              <li>A draft-to-finalize workflow for approving that standard.</li>
              <li>A signed receipt proving what standard was recorded.</li>
              <li>A public registry entry that others can cite.</li>
              <li>A vendor evidence check against the published standard.</li>
            </ol>
          </Window>
          <Window title="What It Is Not Claiming">
            <ol className="stack-list">
              <li>It is not claiming a real District 3 resident decision yet.</li>
              <li>It is not official city branding or a completed public outcome.</li>
              <li>It is a working demo of the governance mechanism before a real session.</li>
            </ol>
          </Window>
        </div>

        <SectionLabel>What Libra Records</SectionLabel>
        <div className="stat-strip stat-strip-upgraded record-strip">
          {recordItems.map(([number, label, detail]) => (
            <div className="stat record-stat" key={label}>
              <div className="stat-num">{number}</div>
              <div className="stat-lbl">{label}</div>
              <div className="stat-trend-foot">{detail}</div>
            </div>
          ))}
        </div>

        <SectionLabel>What Ships Now</SectionLabel>
        <div className="grid-two">
          <Window title="Governance Workflow">
            <ol className="stack-list">
              <li>Load a sample community standard and save a draft.</li>
              <li>Finalize the standard into the active governed configuration.</li>
              <li>Generate a signed receipt and verify it with the public key.</li>
              <li>Publish the standard and check vendor evidence against it.</li>
            </ol>
          </Window>
          <Window title="District 3 Truth">
            <ol className="stack-list">
              <li>The planned live use case is Emily, the District 3 AI voice agent.</li>
              <li>District 3 is still the planned first live session.</li>
              <li>Demo/sample artifacts exist today and stay visibly marked as such.</li>
              <li>No real District 3 standard is claimed before the live resident session.</li>
              <li>The live session is what turns the workflow into real civic governance.</li>
            </ol>
          </Window>
        </div>

        <SectionLabel>Why It Matters</SectionLabel>
        <Window title="From Research to Civic Mechanism">
          <div className="story-grid">
            <p>
              AI systems already make decisions about residents, workers, callers, and applicants.
              In Detroit, that includes voice systems that route calls and interpret what residents
              say. Most of the time the fairness threshold is inherited from regulation defaults or
              set privately by a vendor.
            </p>
            <p>
              Libra changes who gets to define the floor. The app now demonstrates the whole path
              from community-defined standard to public record to vendor evidence check, with
              cryptographic receipts and procurement-ready review artifacts attached.
            </p>
          </div>
        </Window>
      </div>
    </>
  );
}
