import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, PublishedStandardDetail, PublishedStandardSummary } from "../lib/api";
import { JsonBlock, SectionLabel, Window } from "../components/Chrome";
import { STATIC_PREVIEW } from "../lib/runtime";

function detailRows(detail: PublishedStandardDetail | null) {
  if (!detail) return [];
  return [
    ["Slug", detail.slug],
    ["Jurisdiction", detail.jurisdiction],
    ["Domain", detail.domain.replace(/_/g, " ")],
    ["Version", detail.version],
    ["Status", detail.status],
    ["Published", detail.published_at.slice(0, 10)],
    ["Signature", detail.signature_status],
  ] as Array<[string, string]>;
}

export function RegistryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState<PublishedStandardSummary[]>([]);
  const [detail, setDetail] = useState<PublishedStandardDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .listPublishedStandards()
      .then((response) => {
        setItems(response.items);
        if (!slug && response.items[0]) {
          navigate(`/registry/${response.items[0].slug}`, { replace: true });
        }
      })
      .catch((err) => setError((err as Error).message));
  }, [navigate, slug]);

  useEffect(() => {
    if (!slug) {
      setDetail(null);
      return;
    }
    api
      .getPublishedStandard(slug)
      .then(setDetail)
      .catch((err) => setError((err as Error).message));
  }, [slug]);

  return (
    <>
      <div className="desktop">
        <section className="page-head">
          <div className="eyebrow">Public Registry</div>
          <h1>Browse and download published community standards.</h1>
          <p className="lede">
            The registry is where a finalized standard becomes a citeable public artifact. Demo
            records remain visibly marked until a live community session creates a real one.
          </p>
        </section>

        <SectionLabel>Published Standards</SectionLabel>
        <div className="grid-two">
          <Window title="Registry List">
            <div className="stack-buttons">
              {items.map((item) => (
                <button
                  key={item.slug}
                  className={`list-button ${slug === item.slug ? "active" : ""}`.trim()}
                  onClick={() => navigate(`/registry/${item.slug}`)}
                >
                  <strong>{item.title}</strong>
                  <span>{item.slug}</span>
                  <span>{item.status} · {item.signature_status}</span>
                </button>
              ))}
            </div>
          </Window>
          <Window title="Registry Detail">
            {detail?.is_demo ? (
              <div className="notice-banner warning-banner">
                Demo / Sample — not a real District 3 session result
              </div>
            ) : null}
            {detail ? (
              <>
                <div className="dl-list">
                  {detailRows(detail).map(([label, value]) => (
                    <div className="dl-row" key={label}>
                      <span className="dl-label">{label}</span>
                      <span className="dl-value">{value}</span>
                    </div>
                  ))}
                </div>
                <SectionLabel>Governed Config</SectionLabel>
                <JsonBlock value={detail.config} />
                <SectionLabel>Receipt Reference</SectionLabel>
                <JsonBlock value={detail.receipt} />
              </>
            ) : (
              <p className="small-copy">Select a standard to inspect its public record.</p>
            )}
            {detail ? (
              <div className="btn-row" style={{ marginTop: "12px" }}>
                {STATIC_PREVIEW ? (
                  <span className="small-copy">
                    Appendix download is disabled in the static preview build.
                  </span>
                ) : (
                  <a
                    className="btn"
                    href={`/api/v1/registry/standards/${detail.slug}/appendix`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Contract Appendix
                  </a>
                )}
              </div>
            ) : null}
          </Window>
        </div>
        {error ? <p className="error-text">{error}</p> : null}
      </div>
    </>
  );
}
