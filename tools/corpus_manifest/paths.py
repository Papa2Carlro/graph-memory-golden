from __future__ import annotations

from pathlib import Path
from typing import Optional

from .diagnostics import DiagnosticBag


def resolve_under_root(
    root: Path,
    relative: str,
    manifest_path: str,
    bag: DiagnosticBag,
    code: str = "E_PATH_TRAVERSAL",
) -> Optional[Path]:
    if not isinstance(relative, str) or not relative.strip():
        bag.add(code, manifest_path, "path must be a non-empty relative string")
        return None
    rel = Path(relative)
    if rel.is_absolute() or ".." in rel.parts:
        bag.add(code, manifest_path, f"path traversal rejected: {relative}")
        return None
    root_resolved = root.resolve()
    target = (root / rel).resolve()
    try:
        target.relative_to(root_resolved)
    except ValueError:
        bag.add(code, manifest_path, f"path escapes corpus root: {relative}")
        return None
    return target
