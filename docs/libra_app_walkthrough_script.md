# Libra App Walkthrough Script

Use this as a spoken walkthrough while clicking through the app. It is written for people who do not work in technology.

## Opening

Today I am going to walk you through Libra.

Libra is a tool for making AI systems answer to a community standard. The simple idea is this: when an AI system affects residents, workers, applicants, or callers, the vendor should not be the only one deciding what "fair" means. The community should help set the standard, and then the vendor should have to show evidence against that standard.

This demo is centered on a planned District 3 use case called Emily, an AI voice agent. The important thing to understand is that the real District 3 resident session has not happened yet. So anything marked "demo" or "sample" is a working example, not a claim that District 3 has already adopted a real standard.

The walkthrough starts on the Home page, then moves through Community, Session, Audit, Dashboard, Registry, and the reference pages under More.

## Home

Start on the Home page.

This first page explains the main promise of Libra: "The community sets the standard, not the vendor."

In normal language, that means a city, neighborhood, or affected group can decide what level of fairness is acceptable before a vendor system is judged. Libra then turns that decision into a record that can be checked later.

On the left side, the page describes the overall workflow. A community standard can be created, finalized, signed, published, and then used to check vendor evidence. Think of it like turning a community meeting decision into a public rule that can be tested.

On the right side, the receipt card is for the planned District 3 Emily pilot. It shows the subject, jurisdiction, status, threshold, public outputs, and timeline. The key thing to point out here is the status: this is still a planned pilot. Libra is careful not to pretend that a real resident session has already happened.

Below that, there are summary numbers and two plain-language sections.

The "Founder Workflow" box explains what the app can do right now:

1. Load a sample community standard.
2. Save it as a draft.
3. Finalize it into an active standard.
4. Generate a signed receipt.
5. Publish it.
6. Check vendor evidence against it.

The "District 3 Truth" box explains the boundary of the demo. District 3 is the planned first live session, but the current artifacts are samples until residents actually meet and decide.

The main takeaway from Home is simple: Libra is not just an audit tool. It is a way to connect community input, public records, and vendor accountability.

## Community

Click Community.

This page explains the governance model. Governance just means "who gets to make the rule."

Here, Libra says the rule should come from the affected community, not only from the vendor or from a default technical setting.

The "Current Standard" area shows the active standard, if one has been finalized. If it is a demo standard, it is clearly labeled as demo or sample. The table lists things like jurisdiction, domain, threshold, reference group, priority groups, and the date it was governed.

In plain English:

- Jurisdiction means where the standard applies.
- Domain means what kind of system is being judged.
- Threshold means the minimum acceptable fairness level.
- Reference group means the group used for comparison.
- Priority groups means the groups the community specifically wants protected.

The "Why This Matters" box explains the point: residents define what minimum fairness should mean in their context. A draft is not treated as reality. A finalized record is signed, and publication turns it into something other people can cite and review.

The Verification section shows two important concepts.

First, there is a public key. You do not need to explain the math. Say: this is like a public way to check that a receipt really came from the system and was not quietly changed.

Second, there is a receipt verifier. If someone has a receipt from a finalized standard, they can paste it here and check whether the signature and history are valid.

At the bottom, the District 3 section explains the timeline:

- Today, the demo workflow works.
- Next, the real District 3 resident session would create the real standard.
- After that, the standard could be used in procurement, audits, and vendor accountability.

The main takeaway from Community is this: Libra is designed to make fairness decisions public, reviewable, and tied to the people affected.

## Session

Click Session.

This is the facilitator workflow. A facilitator is the person or team helping run the community process.

At the top, there are four steps: Prepare, Draft, Finalize, and Publish.

Prepare means gathering the session information. Draft means saving a proposed standard without making it official. Finalize means turning the approved standard into an active signed record. Publish means putting that standard into the public registry so it can be used for vendor checks.

The Session Workspace is where the standard is entered.

The demo form is already filled with a District 3 Emily example. It includes:

- The council label, which names the standard.
- Priority groups, such as AAVE speakers.
- The fairness target, which is the comparison group.
- The threshold, such as 0.90.
- The domain, such as voice agent.
- The jurisdiction, such as Detroit District 3.
- Participant count, facilitator, notes, and a consensus summary.

When speaking to a nontechnical audience, describe the threshold this way:

A threshold of 0.90 means the system should work at least 90 percent as well for the priority group as it does for the comparison group. It is a fairness floor.

There are two main buttons:

Save Draft stores the proposal, but it does not make it official.

Finalize Demo Standard creates the signed demo standard. For a real non-demo standard, the app expects stronger process integrity evidence before finalization.

Below the workspace, the page shows Current State. This tells us whether the system is still using defaults, whether there is a pending draft, whether a standard is active, and whether the standard is demo or real.

The Process Integrity section is there to prevent fake governance. It records evidence about the process, such as facilitation review and observer approval. In plain language: Libra does not want someone to type in a number and claim "the community decided this" unless the process supports that claim.

The Draft and Finalize outputs show the raw record the app produces. You do not need to read all of the JSON. Just say: this is the machine-readable receipt that makes the decision traceable.

The main takeaway from Session is this: Libra separates a draft from an official standard, and it makes finalization a deliberate step.

## Audit

Click Audit.

This page is where evidence gets tested.

An audit asks: given a set of outcomes, did different groups receive fair results according to the standard?

The JSON Audit section is a quick test using a small example. It is useful for demonstration because you can click a button and show that Libra can calculate fairness results.

The CSV Workflow is for spreadsheet-style data. A CSV is just a table file, like something exported from Excel. The app asks which column contains the group, which column contains the outcome, and which outcome counts as favorable.

For example, if we were checking whether a system successfully resolved calls, the outcome column might say whether the call was resolved. The protected attribute might be speech variety, race, gender, age, disability, or another group category depending on the use case.

The buttons in this section do different kinds of checks:

- Audit CSV checks the data.
- Remediate suggests adjustments.
- Debias runs a correction workflow.
- Regulation Report produces a report for a specific compliance context.

The Audit Result section shows the outcome. The important fields are the governance state, the reference group, the threshold, and any flagged groups. A flagged group means the data did not meet the required fairness floor.

The Vendor Evidence Check section is more specific. This is where a vendor submits evidence against a published standard.

The VEF package stands for Vendor Evidence Framework. In simple terms, it is the package a vendor provides to prove how their system performed. It can include a data file, a manifest describing the evidence, and attestations, which are statements signed by trusted parties.

The Build Hashes button helps prepare the evidence package. The Submit VEF Package button sends the evidence for checking.

The Published Standard Compliance section lets someone choose a published standard and check a vendor CSV against it.

The Vendor Check Result gives a verdict. The most important thing here is that the verdict is tied to a published standard, not just to a private vendor promise.

The main takeaway from Audit is this: Libra connects a community standard to actual vendor evidence.

## Dashboard

Click Dashboard.

The Dashboard is the operational overview.

This page answers questions like:

- Is the API connected?
- How many analyses have been run?
- Is there an active standard?
- Is the active standard demo or real?
- Are there recent vendor checks?
- Are there recent audit reports?

The Runtime State section shows the active standard and governance status. This is useful because it tells us whether the system is currently governed by a finalized standard or whether it is still in a default state.

The Recent Vendor Checks table shows submissions from vendors. For each one, it can show the vendor, standard, period, verdict, and verification status.

The Audit History table shows previous audit reports.

The Usage box shows platform usage data.

For a nontechnical audience, frame the Dashboard this way:

This is the accountability screen. It tells us what is live, what has been checked, what passed or failed, and whether the system is connected.

The main takeaway from Dashboard is this: Libra is not only a one-time form. It keeps a running record of standards, checks, and system health.

## Registry

Click Registry.

The Registry is the public record area.

A finalized standard becomes useful only if other people can find it, cite it, and inspect it. That is what the Registry is for.

On the left, there is a list of published standards. On the right, there is the detail view for the selected standard.

The detail view shows:

- Slug, which is the public identifier.
- Jurisdiction.
- Domain.
- Version.
- Status.
- Published date.
- Signature status.

If the standard is a demo, the page says so clearly.

The Governed Config section shows the actual standard. The Receipt Reference section shows the receipt tied to that standard.

There is also a Download Contract Appendix button when the live backend supports it. This matters because procurement teams often need language they can attach to a contract, request for proposals, or vendor review packet.

The main takeaway from Registry is this: Libra turns a community fairness standard into a public artifact that can be cited and used.

## More Menu

Open the More menu.

The More menu contains the reference pages: Compliance, Docs, Research, and Text Demo.

These pages are not the main workflow, but they explain and support it.

## Compliance

Click Compliance.

This page connects Libra to procurement and risk management.

The NIST AI Risk Management Framework is a national framework for thinking about AI risk. You do not need to explain every category. The simple version is that NIST asks organizations to govern, map, measure, and manage AI risk.

The crosswalk table shows how Libra features fit into those ideas.

For example:

- A community governance session supports governance.
- A published registry supports public accountability.
- A vendor CSV check supports measurement.
- A contract appendix supports management and procurement review.

The Procurement Checklist is written for people buying or reviewing AI systems. It gives questions to ask vendors, such as:

- Can you provide outcome data by protected group?
- Was your fairness threshold set by the affected community?
- Will you submit periodic evidence for independent review?

The "What Libra Answers" box explains how the app responds to those questions.

The Buyer Packet section explains the product in plain language for council members and procurement officers.

The main takeaway from Compliance is this: Libra helps turn fairness from a vague promise into something a buyer can ask for, review, and attach to procurement.

## Docs

Click Docs.

This page is more technical, but we can explain it simply.

Docs shows the app's live routes and rules. A route is just a doorway into a function of the system.

The page groups functions into Analysis, Community, Registry, and Platform.

The Governance Rules section is the most important part for a general audience.

It says:

- No active standard means the system uses a default threshold.
- Drafts are visible, but they do not govern anything.
- Only finalization creates an active governed standard.
- Real non-demo standards need process integrity approval.
- Publishing is manual.
- Vendor evidence must meet the required evidence level.
- District 3 remains proposed until the real pilot session happens.

The Pre-Pilot Proof Kit section provides planning materials for the Benson and District 3 use case. It explains what is already demonstrated, what still needs the real resident process, and what a vendor would need to submit.

The Onboarding section explains API keys. In plain language: some actions require a key so the system knows who is using it and can keep tenant-specific records separate.

The main takeaway from Docs is this: this page states the operating rules of the system.

## Research

Click Research.

This page explains the research argument behind Libra.

The key sentence is: fairness thresholds are policy choices, not technical defaults.

That means the number we use to judge fairness is not just a computer decision. It is a value judgment. Different thresholds can lead to different conclusions.

The Michigan Finding explains that in lending data, a group can be close enough to the default threshold that a stricter community-defined threshold changes the result from pass to fail.

This matters because community input is not symbolic. It can change the actual outcome of an audit.

The Research Package lists the types of evidence behind the product, including mortgage lending data, COMPAS data, HR data, regression tests, the community-defined fairness specification, and registry outputs.

The "What the Product Makes Operational" box connects the research to the app:

- Threshold selection.
- Signed receipts.
- Public registry records.
- Vendor evidence checks.
- Procurement appendices.

The main takeaway from Research is this: Libra is built around the idea that fairness standards are civic decisions, not just engineering defaults.

## Text Demo

Click Text Demo.

This is a simple demonstration of a separate analysis endpoint.

It lets someone type or paste text and run a deterministic analysis. Deterministic means the same input should produce the same kind of result each time.

This page is intentionally separate from the governed community workflow. It does not create a District 3 receipt. It does not publish a community standard. It simply shows an analysis engine in isolation.

Use this page to explain that Libra can include smaller analysis tools, but the main product is still the governed workflow: community standard, signed receipt, registry, and vendor evidence check.

The main takeaway from Text Demo is this: this is a small side demo, not the official governance process.

## Closing

To close the walkthrough, bring the audience back to the main idea.

Libra is built around one question: when an AI system affects a community, who gets to decide what fair enough means?

Most tools start with the vendor or the model. Libra starts with the community standard.

Then it creates a chain:

1. The community defines the fairness floor.
2. The facilitator records it.
3. The system saves it as a draft.
4. The approved standard is finalized.
5. A signed receipt proves what was decided.
6. The standard is published in the registry.
7. Vendors submit evidence against that standard.
8. Procurement teams can review the result.

For District 3 and Emily, the demo proves the workflow, but the real civic standard still depends on the live resident session.

That is the point of Libra: not just to measure AI, but to make AI accountability understandable, public, and governed by the people it affects.
