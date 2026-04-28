"""
PDF Report Generator — converts audit results into professional PDF reports.
"""

from __future__ import annotations

import io
from datetime import datetime, timezone
from typing import Any

try:
    from reportlab.lib import colors
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
    HAS_REPORTLAB = True
except ImportError:
    HAS_REPORTLAB = False

DARK = None
ACCENT = None
FLAG_RED = None
FLAG_YELLOW = None
GREEN = None
LIGHT_GREY = None
MID_GREY = None

if HAS_REPORTLAB:
    DARK = colors.HexColor("#1a1a2e")
    ACCENT = colors.HexColor("#4f46e5")
    FLAG_RED = colors.HexColor("#ef4444")
    FLAG_YELLOW = colors.HexColor("#f59e0b")
    GREEN = colors.HexColor("#10b981")
    LIGHT_GREY = colors.HexColor("#f3f4f6")
    MID_GREY = colors.HexColor("#9ca3af")


def generate_pdf_report(audit_result: dict[str, Any]) -> bytes:
    if not HAS_REPORTLAB:
        raise ImportError("reportlab is required for PDF generation. pip install reportlab")

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=0.75*inch, leftMargin=0.75*inch, topMargin=0.75*inch, bottomMargin=0.75*inch)

    styles = getSampleStyleSheet()
    story = []

    title_style = ParagraphStyle("Title", parent=styles["Title"], fontSize=22, textColor=DARK, spaceAfter=4)
    subtitle_style = ParagraphStyle("Subtitle", parent=styles["Normal"], fontSize=11, textColor=MID_GREY, spaceAfter=2)
    body_style = ParagraphStyle("Body", parent=styles["Normal"], fontSize=10, leading=15, textColor=DARK, spaceAfter=6)
    heading_style = ParagraphStyle("Heading", parent=styles["Heading2"], fontSize=13, textColor=ACCENT, spaceBefore=14, spaceAfter=6)
    small_style = ParagraphStyle("Small", parent=styles["Normal"], fontSize=8, textColor=MID_GREY)

    story.append(Paragraph("Racial Fairness Audit Report", title_style))
    story.append(Paragraph(f"Generated {datetime.now(timezone.utc).strftime('%B %d, %Y at %H:%M UTC')}", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT, spaceAfter=12))

    # Audit type badge
    audit_type = audit_result.get("audit_type", "standard")
    badge_color = GREEN if audit_type == "community_valid" else FLAG_YELLOW
    badge_label = "COMMUNITY-VALID AUDIT" if audit_type == "community_valid" else "STANDARD AUDIT"
    badge_style = ParagraphStyle("Badge", parent=styles["Normal"], fontSize=9, textColor=colors.white, backColor=badge_color, borderPadding=4, spaceAfter=10)
    story.append(Paragraph(f"  {badge_label}  ", badge_style))
    story.append(Spacer(1, 8))

    # Summary
    summary = audit_result.get("summary", {})
    metrics = audit_result.get("metrics", {})
    flagged = summary.get("flagged_groups", [])

    story.append(Paragraph("Summary", heading_style))
    summary_data = [
        ["Total Records", str(summary.get("total_records", "—"))],
        ["Groups Analyzed", ", ".join(summary.get("groups_analyzed", []))],
        ["Outcome Column", summary.get("outcome_column", "—")],
        ["Favorable Value", str(summary.get("favorable_value", "—"))],
        ["Disparity Score", f"{metrics.get('disparity_score', 0):.4f}"],
        ["Statistical Parity Gap", f"{metrics.get('statistical_parity_gap', 0):.1f} pp"],
        ["Groups Flagged", str(len(flagged)) + (f" ({', '.join(flagged)})" if flagged else "")],
    ]
    summary_table = Table(summary_data, colWidths=[2.2*inch, 4.5*inch])
    summary_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), LIGHT_GREY), ("TEXTCOLOR", (0, 0), (0, -1), DARK),
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"), ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.white, LIGHT_GREY]),
        ("GRID", (0, 0), (-1, -1), 0.25, MID_GREY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 10))

    # DI table
    story.append(Paragraph("Disparate Impact by Group", heading_style))
    group_outcomes = metrics.get("group_outcomes", {})
    di_ratios = metrics.get("disparate_impact", {})
    di_header = ["Group", "Outcome Rate", "Disparate Impact", "Status"]
    di_rows = [di_header]
    for group, rate in sorted(group_outcomes.items()):
        di = di_ratios.get(group)
        if di is None:
            status, di_str = "—", "—"
        elif group in flagged:
            status, di_str = "⚠ FLAGGED", f"{di:.4f}"
        else:
            status, di_str = "✓ OK", f"{di:.4f}"
        di_rows.append([group, f"{rate:.1%}", di_str, status])

    di_table = Table(di_rows, colWidths=[1.8*inch, 1.5*inch, 1.8*inch, 1.6*inch])
    di_style_list = [
        ("BACKGROUND", (0, 0), (-1, 0), ACCENT), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"), ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("GRID", (0, 0), (-1, -1), 0.25, MID_GREY),
        ("ROWBACKGROUNDS", (1, 1), (-1, -1), [colors.white, LIGHT_GREY]),
        ("ALIGN", (1, 1), (-1, -1), "CENTER"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    for i, row in enumerate(di_rows[1:], start=1):
        if "FLAGGED" in row[3]:
            di_style_list.append(("TEXTCOLOR", (3, i), (3, i), FLAG_RED))
            di_style_list.append(("FONTNAME", (3, i), (3, i), "Helvetica-Bold"))
    di_table.setStyle(TableStyle(di_style_list))
    story.append(di_table)
    story.append(Spacer(1, 10))

    # Findings
    story.append(Paragraph("Findings", heading_style))
    for finding in audit_result.get("findings", []):
        story.append(Paragraph(f"• {finding}", body_style))

    # Recommendation
    story.append(Paragraph("Recommendation", heading_style))
    rec_color = FLAG_RED if flagged else GREEN
    rec_bg = colors.HexColor("#fef2f2") if flagged else colors.HexColor("#f0fdf4")
    rec_style = ParagraphStyle("Rec", parent=body_style, backColor=rec_bg, borderColor=rec_color, borderWidth=1, borderPadding=8, leading=16)
    story.append(Paragraph(audit_result.get("recommendation", ""), rec_style))
    story.append(Spacer(1, 10))

    # Community config
    community_config = audit_result.get("community_config", {})
    provenance = community_config.get("provenance") if community_config else None
    story.append(Paragraph("Community Configuration", heading_style))
    config_data = [
        ["Priority Groups", ", ".join(community_config.get("priority_groups", []) or ["(defaults)"])],
        ["Fairness Target", community_config.get("fairness_target", "—")],
        ["Fairness Threshold", str(community_config.get("fairness_threshold", 0.8))],
    ]
    if provenance:
        config_data += [
            ["Input Protocol", provenance.get("input_protocol", "—")],
            ["Input Date", provenance.get("input_date", "—")],
            ["Participants", str(provenance.get("input_participants", "—"))],
            ["Record ID", provenance.get("record_id", "—")],
        ]
    else:
        config_data.append(["Provenance", "No provenance record — standard audit only"])
    config_table = Table(config_data, colWidths=[2.2*inch, 4.5*inch])
    config_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), LIGHT_GREY), ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9), ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.white, LIGHT_GREY]),
        ("GRID", (0, 0), (-1, -1), 0.25, MID_GREY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(config_table)

    # Footer
    story.append(Spacer(1, 20))
    story.append(HRFlowable(width="100%", thickness=0.5, color=MID_GREY, spaceAfter=6))
    story.append(Paragraph(
        "Project Libra — Powered by Community-Defined Fairness Protocol v1.0",
        small_style,
    ))

    doc.build(story)
    return buffer.getvalue()


def generate_contract_appendix(standard: dict[str, Any], config: dict[str, Any], ledger: dict[str, Any]) -> bytes:
    """Generate a contract appendix PDF for a published community standard."""
    if not HAS_REPORTLAB:
        raise ImportError("reportlab is required for PDF generation. pip install reportlab")

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer, pagesize=letter,
        rightMargin=0.75 * inch, leftMargin=0.75 * inch,
        topMargin=0.75 * inch, bottomMargin=0.75 * inch,
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle("Title", parent=styles["Title"], fontSize=20, textColor=DARK, spaceAfter=4)
    subtitle_style = ParagraphStyle("Subtitle", parent=styles["Normal"], fontSize=10, textColor=MID_GREY, spaceAfter=2)
    heading_style = ParagraphStyle("Heading", parent=styles["Heading2"], fontSize=13, textColor=ACCENT, spaceBefore=14, spaceAfter=6)
    body_style = ParagraphStyle("Body", parent=styles["Normal"], fontSize=10, leading=15, textColor=DARK, spaceAfter=6)
    req_style = ParagraphStyle("Req", parent=body_style, backColor=colors.HexColor("#f0fdf4"), borderColor=GREEN, borderWidth=1, borderPadding=10, leading=16)
    small_style = ParagraphStyle("Small", parent=styles["Normal"], fontSize=8, textColor=MID_GREY)
    demo_style = ParagraphStyle("Demo", parent=styles["Normal"], fontSize=9, textColor=colors.HexColor("#92400e"), backColor=colors.HexColor("#fffbeb"), borderColor=colors.HexColor("#f59e0b"), borderWidth=1, borderPadding=6, spaceAfter=10)

    story = []

    title = standard.get("title", "Community Fairness Standard")
    story.append(Paragraph(f"{title} — Vendor Contract Appendix", title_style))
    story.append(Paragraph(
        f"Generated {datetime.now(timezone.utc).strftime('%B %d, %Y at %H:%M UTC')}",
        subtitle_style,
    ))
    story.append(HRFlowable(width="100%", thickness=1, color=ACCENT, spaceAfter=12))

    if standard.get("is_demo"):
        story.append(Paragraph(
            "SAMPLE / DEMO — This appendix was generated from a demo standard. "
            "The District 3 community session has not yet been held. "
            "This document is for demonstration and procurement planning purposes only.",
            demo_style,
        ))

    # Standard metadata
    story.append(Paragraph("Standard Metadata", heading_style))
    slug = standard.get("slug", "—")
    meta_data = [
        ["Standard ID (slug)", slug],
        ["Jurisdiction", standard.get("jurisdiction", "—")],
        ["Domain", standard.get("domain", "—").replace("_", " ").title()],
        ["Version", standard.get("version", "—")],
        ["Status", standard.get("status", "—").upper()],
        ["Published", standard.get("published_at", "—")[:10] if standard.get("published_at") else "—"],
    ]
    meta_table = Table(meta_data, colWidths=[2.2 * inch, 4.5 * inch])
    meta_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), LIGHT_GREY),
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.white, LIGHT_GREY]),
        ("GRID", (0, 0), (-1, -1), 0.25, MID_GREY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(meta_table)

    # Fairness requirements
    story.append(Paragraph("Fairness Requirements", heading_style))
    threshold = config.get("fairness_threshold", "—")
    priority_groups = config.get("priority_groups", [])
    reference_group = config.get("fairness_target", "—")
    jurisdiction = config.get("jurisdiction", "—")
    domain = config.get("domain", "—").replace("_", " ")

    groups_str = ", ".join(priority_groups) if priority_groups else "designated priority groups"
    boilerplate = (
        f"The vendor agrees to achieve a disparate impact ratio of ≥ {threshold} "
        f"for {groups_str} relative to {reference_group} in all {domain} decisions "
        f"within {jurisdiction}. This requirement derives from the community-governed "
        f"standard referenced above, finalized and cryptographically signed as specified "
        f"in the Receipt Reference section below."
    )
    story.append(Paragraph(boilerplate, req_style))
    story.append(Spacer(1, 6))

    # Key thresholds table
    threshold_data = [
        ["Fairness Threshold", f"≥ {threshold} disparate impact ratio"],
        ["Priority Groups", groups_str],
        ["Reference Group", reference_group],
        ["Domain", domain.title()],
        ["Measurement", "Disparate Impact (DI) — group approval rate ÷ reference group approval rate"],
        ["Failure Condition", f"DI < {threshold} for any priority group"],
    ]
    threshold_table = Table(threshold_data, colWidths=[2.2 * inch, 4.5 * inch])
    threshold_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), LIGHT_GREY),
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.white, LIGHT_GREY]),
        ("GRID", (0, 0), (-1, -1), 0.25, MID_GREY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(threshold_table)

    # Receipt reference
    story.append(Paragraph("Receipt Reference", heading_style))
    ledger_hash = ledger.get("entry_hash", ledger.get("ledger_hash", ""))
    hash_display = f"{ledger_hash[:16]}…" if len(ledger_hash) > 16 else ledger_hash
    signed_at = ledger.get("signed_at", ledger.get("governed_at", "—"))
    if signed_at and signed_at != "—":
        signed_at = str(signed_at)[:19].replace("T", " ") + " UTC"
    key_id = ledger.get("signature_key_id", "—")

    receipt_data = [
        ["Ledger Hash (prefix)", hash_display],
        ["Signed At", signed_at or "—"],
        ["Signature Key ID", key_id or "—"],
        ["Algorithm", ledger.get("signature_alg", "Ed25519")],
        ["Verify At", f"/api/v1/registry/standards/{slug}"],
    ]
    receipt_table = Table(receipt_data, colWidths=[2.2 * inch, 4.5 * inch])
    receipt_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), LIGHT_GREY),
        ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.white, LIGHT_GREY]),
        ("GRID", (0, 0), (-1, -1), 0.25, MID_GREY),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(receipt_table)

    # Footer
    story.append(Spacer(1, 20))
    story.append(HRFlowable(width="100%", thickness=0.5, color=MID_GREY, spaceAfter=6))
    story.append(Paragraph(
        f"Governed under Libra Protocol v1.0  ·  Standard ID: {slug}  ·  "
        f"Verify at /registry/{slug}",
        small_style,
    ))

    doc.build(story)
    return buffer.getvalue()
