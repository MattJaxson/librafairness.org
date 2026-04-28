# Libra Detroit District 3 Pre-Pilot Proof Packet

Status: demo baseline for planning. This packet does not claim that a District 3 resident session has occurred.

## What Libra Does

Libra turns a community fairness decision into a signed technical standard, then checks vendor evidence against that standard. The workflow covers draft session capture, process-integrity review, signed receipt generation, registry publication, VEF v1 vendor evidence review, and cure briefs.

## What Is Demo vs. Not Yet Authorized

- Demo: the sample District 3 Emily standard, sample VEF package, demo attestor public keys, and generated cure brief.
- Not yet authorized: any real District 3 fairness threshold, resident mandate, or procurement enforcement action.
- Required before live use: a real resident session, process-integrity audit, and observer approval.

## What District 3 Residents Would Decide

- Which protected or priority speech groups need explicit measurement.
- Which reference group the vendor must be compared against.
- Which fairness threshold applies, such as 0.90 or 0.95 disparate impact.
- Which minimum evidence tier applies before vendor metrics are accepted.
- Whether any absolute floor, such as 95% resolution success for AAVE, is required.
- Whether a vendor failure triggers cure, reconvening, or replacement.

## What Vendors Submit

Vendors submit a VEF v1 package:

- `manifest.json`: system identity, reporting period, protected attribute, outcome columns, sample method, evidence tier, and package hashes.
- `evidence.csv`: row-level outcome logs with event hashes, protected attribute, label source, exclusion status, and outcome columns.
- `attestations.json`: Ed25519 signatures from trusted vendor, labeler, and municipal/sample attestors over the submitted hashes.
- The active standard may pin which public key IDs are trusted for each role, so a vendor key cannot sign the labeler or municipal sample slot.

## What The City Receives

- A verdict: `PASS_VERIFIED`, `FAIL_VERIFIED`, `PASS_SELF_ATTESTED`, `FAIL_SELF_ATTESTED`, or `INSUFFICIENT_EVIDENCE`.
- A public source-integrity record with hashes and verified attestor key IDs.
- A role-based attestor-policy result showing which vendor, labeler, and municipal keys were accepted or rejected.
- A cure brief when evidence fails or is incomplete.
- A contract appendix tied back to the signed community standard.
- A structured JSON proof brief at `/api/v1/registry/demo/benson-packet` for demos, email follow-up, and future export automation.

## Demo Outcome

The included Emily sample package is marked `output_logs_only`. Against a standard with no minimum evidence tier, it produces a verified failure against a 0.90 parity threshold: AAVE resolution success is 26/30 while the reference group is 30/30, creating a 0.8667 disparate impact ratio and a cure brief for the flagged group. Against a stricter standard requiring `validation_test`, the same package returns `INSUFFICIENT_EVIDENCE` before metrics are treated as authoritative.

The structured packet also shows a live-boundary check: the same demo attestations become `FAIL_SELF_ATTESTED` against a non-demo standard because demo-only keys cannot create verified live findings.
