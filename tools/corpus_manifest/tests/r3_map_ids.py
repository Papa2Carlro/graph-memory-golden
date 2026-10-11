from __future__ import annotations

import re
from pathlib import Path
from typing import List

_SECTION_RE = re.compile(r"^### 3\.[123] ")


def load_r3_canonical_ids(repo_root: Path) -> List[str]:
    """Canonical IDs from R3 map inventory tables §3.1–§3.3 only."""
    path = repo_root / "Docs/corpus/migration/R3_MIGRATION_MAP.md"
    text = path.read_text(encoding="utf-8")
    in_inventory = False
    seen: set[str] = set()
    ids: List[str] = []
    for line in text.splitlines():
        if line.startswith("### 3.4"):
            break
        if _SECTION_RE.match(line):
            in_inventory = True
            continue
        if line.startswith("### ") and not _SECTION_RE.match(line):
            in_inventory = False
            continue
        if not in_inventory or not line.startswith("| gs."):
            continue
        cell = line.split("|", 2)[1].strip()
        if not cell or "*" in cell:
            continue
        if cell not in seen:
            seen.add(cell)
            ids.append(cell)
    return sorted(ids)
