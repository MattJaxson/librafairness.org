import { SectionLabel, Window } from "../components/Chrome";

export function ResearchPage() {
  return (
    <>
      <div className="desktop">
        <section className="page-head">
          <div className="eyebrow">Research Base</div>
          <h1>Fairness thresholds are policy choices, not technical defaults.</h1>
          <p className="lede">
            Libra’s civic argument rests on empirical sensitivity: modest changes to the minimum
            acceptable threshold can change whether an AI system passes or fails for the groups a
            community cares about most.
          </p>
        </section>

        <Window title="The Michigan Finding">
          <p>
            In the Michigan HMDA lending context, Black applicants sit close enough to the default
            EEOC threshold that a stricter community-defined floor can convert a technical pass into
            a fail. That is why community input changes outcomes rather than merely changing language.
          </p>
        </Window>

        <SectionLabel>Related Registry Models</SectionLabel>
        <Window title="Public Accountability Registries">
          <div className="story-grid">
            <p>
              The{" "}
              <a href="https://ai.hel.fi/en/ai-register/" target="_blank" rel="noreferrer">
                Helsinki AI Register
              </a>{" "}
              and the{" "}
              <a href="https://algoritmes.overheid.nl/en" target="_blank" rel="noreferrer">
                Dutch Algorithm Register
              </a>{" "}
              show how public institutions can disclose where AI and algorithmic systems are being
              used, what they do, and how the public can learn about them.
            </p>
            <p>
              Libra is complementary to those registries. It does not try to replace public AI
              disclosure. It focuses on the earlier governance question: who set the fairness
              threshold, what evidence did the vendor submit, and can the public trace that chain
              from community standard to registry record?
            </p>
          </div>
        </Window>

        <SectionLabel>Project Code</SectionLabel>
        <Window title="Public Review Links">
          <ul className="stack-list">
            <li>
              <a href="https://github.com/MattJaxson/librafairness.org" target="_blank" rel="noreferrer">
                Static demo source
              </a>
            </li>
            <li>
              <a href="https://github.com/MattJaxson/fairlens-api" target="_blank" rel="noreferrer">
                Implementation and API history
              </a>
            </li>
            <li>
              <a href="https://github.com/MattJaxson/adaptive-racial-fairness-framework" target="_blank" rel="noreferrer">
                Research framework foundation
              </a>
            </li>
          </ul>
        </Window>

        <SectionLabel>Validated Assets</SectionLabel>
        <div className="grid-two">
          <Window title="Research Package">
            <ul className="stack-list">
              <li>HMDA mortgage lending data</li>
              <li>COMPAS recidivism data</li>
              <li>HR hiring data</li>
              <li>Fairness pipeline regression tests</li>
              <li>CDF specification and registry outputs</li>
            </ul>
          </Window>
          <Window title="What the Product Makes Operational">
            <ul className="stack-list">
              <li>Community-defined fairness threshold selection</li>
              <li>Signed receipt and public verification</li>
              <li>Published standard registry record</li>
              <li>Vendor evidence checks against the published standard</li>
              <li>Procurement-facing appendix output</li>
            </ul>
          </Window>
        </div>
      </div>
    </>
  );
}
