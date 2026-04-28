import { Marquee, SectionLabel, Window } from "../components/Chrome";

export function ResearchPage() {
  return (
    <>
      <Marquee
        items={[
          "<b>RESEARCH</b> · HMDA · COMPAS · HR validation base",
          "Threshold sensitivity is the empirical argument behind governance",
          "Michigan finding: the same data can flip depending on who sets the threshold",
        ]}
      />
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

        <SectionLabel>Project Code</SectionLabel>
        <Window title="Public Review Links">
          <ul className="stack-list">
            <li>
              <a href="https://librafairness.org" target="_blank" rel="noreferrer">
                Live static demo
              </a>
            </li>
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
