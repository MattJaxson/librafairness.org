"""Shared test bootstrap for libra_core."""

from __future__ import annotations

import sys
from pathlib import Path


TESTS_DIR = Path(__file__).resolve().parent
WORKSPACE_ROOT = TESTS_DIR.parents[2]
LIBRA_CORE_SRC = WORKSPACE_ROOT / "packages" / "libra_core" / "src"

if str(LIBRA_CORE_SRC) not in sys.path:
    sys.path.insert(0, str(LIBRA_CORE_SRC))
