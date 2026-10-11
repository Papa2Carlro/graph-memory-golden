"""R3 canonical ID format (DERIVED R2 / R3_MIGRATION_MAP §canonical ID)."""

from __future__ import annotations

import re

# gs.specimen.<slug> | gs.algo.<category>.<slug> | gs.project.modular[.negative].<slug>
CANONICAL_ID_RE = re.compile(
    r"^gs\.(?:"
    r"specimen\.[a-z0-9]+(?:-[a-z0-9]+)*"
    r"|algo\.[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z0-9]+(?:-[a-z0-9]+)*"
    r"|project\.modular\.(?:negative\.)?[a-z0-9]+(?:-[a-z0-9]+)*"
    r")$"
)


def is_valid_canonical_id(canonical_id: str) -> bool:
    return bool(CANONICAL_ID_RE.match(canonical_id))
