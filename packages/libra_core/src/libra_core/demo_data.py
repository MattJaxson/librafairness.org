"""Helpers for Libra demo datasets used in tests and demos."""

from __future__ import annotations

from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[4]
DEMO_DIR = ROOT / "data" / "demo"


DEMO_DATASETS = {
    "hmda": {
        "path": DEMO_DIR / "hmda_michigan_lending.csv",
        "label": "HMDA Michigan Lending",
        "race_col": "derived_race",
        "outcome_col": "action_taken",
        "favorable_value": "1",
    },
    "compas": {
        "path": DEMO_DIR / "compas_recidivism.csv",
        "label": "COMPAS Recidivism",
        "race_col": "race",
        "outcome_col": "two_year_recid",
        "favorable_value": "0",
    },
    "hr": {
        "path": ROOT / "adaptive-racial-fairness-framework" / "data" / "real_hr_data.csv",
        "label": "HR Hiring Demo",
        "race_col": "race",
        "outcome_col": "outcome",
        "favorable_value": "1",
    },
}


def load_demo_dataset(name: str) -> pd.DataFrame:
    if name not in DEMO_DATASETS:
        raise ValueError(f"Unknown demo dataset '{name}'.")
    path = DEMO_DATASETS[name]["path"]
    if not path.exists():
        raise FileNotFoundError(path)
    df = pd.read_csv(path)
    df.columns = df.columns.str.strip()
    return df
