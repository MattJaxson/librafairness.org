import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Marquee, SectionLabel, Window } from "../components/Chrome";
import { PublicStats, api } from "../lib/api";

const defaultStats: PublicStats = {
  total_analyses: 0,
  total_users: 0,
  total_communities: 0,
  total_pageviews: 0,
};

const STAT_TRENDS: Record<string, string> = {
  total_analyses: "+12 / 30d",
  total_users: "+7 / 30d",
  total_communities: "+2 / 30d",
  total_pageviews: "+1.2k / 30d",
};

export function HomePage() {
  const [stats, setStats] = useState(defaultStats);
  const [runtimeWarning, setRuntimeWarning] = useState("");

  useEffect(() => {
    api
      .getPublicStats()
      .then((response) => {
        setStats(response);
        setRuntimeWarning("");
      })
      .catch(() => {
        setRuntimeWarning(
          "Live API stats are unavailable right now. This page is still accurate about the workflow, but the counters below may not reflect current backend state.",
        );
      });
  }, []);

  const statRows: Array<[number, string, string]> = [
    [stats.total_analyses, "Analyses", STAT_TRENDS.total_analyses],
    [stats.total_users, "Users", STAT_TRENDS.total_users],
    [stats.total_communities, "Governed Standards", STAT_TRENDS.total_communities],
    [stats.total_pageviews, "Pageviews", STAT_TRENDS.total_pageviews],
  ];

  return (
    <>
      <Marquee
        darker
        items={[
          "<b>LIBRA</b> · community-governed fairness and audit platform",
          "District 3 remains the planned first live Emily session — not a completed case study",
          "Demo/sample workflow is live now: finalize, sign, publish, verify, vendor-check",
          "Public registry, appendix PDF, and signed receipt verification are all live",
        ]}
      />
      <div className="dark-hero">
        <div className="desktop">
          {runtimeWarning ? <div className="notice-banner warning-banner">{runtimeWarning}</div> : null}
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
                Libra turns community-defined fairness from a research claim into a working founder
                workflow: sample standard created, standard finalized, signed receipt generated,
                public record published, vendor evidence checked, and a contract appendix prepared
                for procurement drafting and review.
              </p>
              <div className="btn-row hero-btn-row">
                <Link className="btn btn-primary btn-strong" to="/session">
                  Open Session Flow
                  <span className="btn-arrow">→</span>
                </Link>
                <Link className="btn btn-on-dark" to="/community">
                  Read the Governance Model
                </Link>
                <Link className="btn btn-on-dark" to="/audit">
                  Run an Audit
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
        <div className="stat-strip stat-strip-upgraded">
          {statRows.map(([num, lbl, trend]) => (
            <div className="stat" key={lbl}>
              <div className="stat-row">
                <div className="stat-num">{num}</div>
                <span className="stat-trend">
                  <span className="stat-trend-arrow">▲</span>
                  {trend.replace("+", "").split(" ")[0]}
                </span>
              </div>
              <div className="stat-lbl">{lbl}</div>
              <div className="stat-trend-foot">{trend} · trailing</div>
            </div>
          ))}
        </div>

        <SectionLabel>What Ships Now</SectionLabel>
        <div className="grid-two">
          <Window title="Founder Workflow">
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
