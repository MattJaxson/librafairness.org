import { useEffect, useState } from "react";
import { getApiKey, setApiKey } from "../lib/api";
import { STATIC_PREVIEW } from "../lib/runtime";

export function ApiKeyBar() {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(STATIC_PREVIEW ? "Static preview build" : getApiKey());
  }, []);

  return (
    <div className="key-wrap">
      <div className="key-bar">
        <label>
          <span>API Key</span>
          <input
            value={value}
            disabled={STATIC_PREVIEW}
            onChange={(event) => {
              const next = event.target.value;
              setValue(next);
              setApiKey(next);
            }}
            placeholder={STATIC_PREVIEW ? "No API key needed for this preview" : "Paste your Libra API key"}
          />
        </label>
        <span className="key-note">
          {STATIC_PREVIEW
            ? "Static preview mode: bundled sample data is baked into this build for viewing and navigation only."
            : "Stored locally so session, audit, publish, verify, and vendor-check actions can use the live API."}
        </span>
      </div>
    </div>
  );
}
