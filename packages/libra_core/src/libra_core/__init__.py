"""Shared fairness, governance, and compliance logic for Libra."""

from .adversarial_debiaser import adversarial_fairness_pipeline
from .community_governance import (
    DEFAULT_COMMUNITY_DEFS,
    STALE_MONTHS,
    VALID_PROTOCOLS,
    build_community_config,
    is_community_valid,
    staleness_status,
    validate_community_config,
)
from .compliance_adapter import (
    generate_colorado_ai_act_report,
    generate_ll144_report,
    generate_michigan_hb4668_report,
)
from .fairness_audit import (
    RacialFairnessAuditor,
    calculate_racial_bias_score,
    coerce_favorable,
    compute_group_rates,
    disparate_impact,
    group_outcomes_by_race,
)
from .fairness_reweight import build_reweight_report, reweight_samples_with_community
from .q2q import rating_to_epsilon
from .report_generator import generate_pdf_report

__all__ = [
    "DEFAULT_COMMUNITY_DEFS",
    "STALE_MONTHS",
    "VALID_PROTOCOLS",
    "RacialFairnessAuditor",
    "adversarial_fairness_pipeline",
    "build_community_config",
    "build_reweight_report",
    "calculate_racial_bias_score",
    "coerce_favorable",
    "compute_group_rates",
    "disparate_impact",
    "generate_colorado_ai_act_report",
    "generate_ll144_report",
    "generate_michigan_hb4668_report",
    "generate_pdf_report",
    "group_outcomes_by_race",
    "is_community_valid",
    "rating_to_epsilon",
    "reweight_samples_with_community",
    "staleness_status",
    "validate_community_config",
]
