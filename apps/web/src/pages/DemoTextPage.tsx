import { useState } from "react";
import { JsonBlock, Marquee, SectionLabel, Window } from "../components/Chrome";
import { api } from "../lib/api";

export function DemoTextPage() {
  const [text, setText] = useState("We need a chairman who can mentor a young aggressive team.");
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");

  const run = async () => {
    setError("");
    try {
      const response = await api.analyzeTextDemo({
        text,
        categories: ["gender", "age", "race", "disability"],
      });
      setResult(response);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <>
      <Marquee
        items={[
          "<b>TEXT DEMO</b> · deterministic analysis endpoint",
          "Uses the unauthenticated demo route",
          "No District 3 receipt is implied here",
        ]}
      />
      <div className="desktop">
        <section className="page-head">
          <div className="eyebrow">Secondary Workflow</div>
          <h1>Text analysis demo — no governed session required.</h1>
          <p className="lede">
            This route stays intentionally separate from the governed community workflow. It shows
            the analysis engine in isolation, not a finalized community standard.
          </p>
        </section>

        <SectionLabel>Deterministic Text Analysis</SectionLabel>
        <Window title="Demo Analyze">
          <textarea
            className="code-input"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <div className="btn-row">
            <button className="btn btn-primary" onClick={run}>
              Analyze Text
            </button>
          </div>
          {error ? <p className="error-text">{error}</p> : null}
        </Window>
        <Window title="Result">
          <JsonBlock value={result} />
        </Window>
      </div>
    </>
  );
}
