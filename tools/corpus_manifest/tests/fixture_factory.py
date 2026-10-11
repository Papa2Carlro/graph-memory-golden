from __future__ import annotations

from pathlib import Path
from typing import Any, Dict, List, Optional

import yaml


def _base_specimen(
    canonical_id: str,
    slug: str,
    *,
    category: str = "bindings",
    aliases: Optional[List[str]] = None,
    prerequisites: Optional[List[str]] = None,
    kind: str = "positive",
    expected: Optional[str] = None,
) -> Dict[str, Any]:
    directory = f"language-features/{category}/specimens/{slug}"
    doc: Dict[str, Any] = {
        "specimen_schema_version": 1,
        "canonical_id": canonical_id,
        "kind": kind,
        "home": {
            "root": "language-features",
            "category": category,
            "directory": directory,
        },
        "artifacts": [
            {
                "role": "primary",
                "path": f"{slug}.gs",
                "language": "gs",
            }
        ],
        "features": {"primary": category, "secondary": []},
        "complexity": {
            "syntax_depth": "S0",
            "control_flow": "none",
            "files": "single",
        },
        "prerequisites": prerequisites or [],
        "historical": {"syntax_track_id": "TEST"},
        "acceptance": {
            "landed": True,
            "source_level_accepted": True,
            "runtime_verified": False,
        },
    }
    if aliases:
        doc["aliases"] = aliases
    if expected is not None:
        doc["expected"] = expected
    return doc


def write_orphan_specimen_manifest(
    root: Path,
    manifest_parent_under_programs: str,
    doc: Dict[str, Any],
) -> Path:
    """Write specimen.yaml under an arbitrary programs/ path (tests only)."""
    d = root / "programs" / manifest_parent_under_programs
    d.mkdir(parents=True, exist_ok=True)
    manifest = d / "specimen.yaml"
    manifest.write_text(yaml.safe_dump(doc, sort_keys=False), encoding="utf-8")
    return manifest


def write_specimen(
    root: Path,
    slug: str,
    doc: Dict[str, Any],
    *,
    category: str = "bindings",
) -> Path:
    directory = doc["home"]["directory"]
    spec_dir = root / "programs" / directory
    spec_dir.mkdir(parents=True, exist_ok=True)
    gs_name = doc["artifacts"][0]["path"]
    (spec_dir / gs_name).write_text("// fixture\n", encoding="utf-8")
    manifest = spec_dir / "specimen.yaml"
    manifest.write_text(yaml.safe_dump(doc, sort_keys=False), encoding="utf-8")
    return manifest


def write_pipeline(
    root: Path,
    pipeline_id: str,
    members: List[str],
    *,
    title: str = "Test pipeline",
) -> Path:
    pdir = root / "programs" / "language-features" / "pipelines" / pipeline_id
    pdir.mkdir(parents=True, exist_ok=True)
    doc = {
        "pipeline_schema_version": 1,
        "pipeline_id": pipeline_id,
        "title": title,
        "members": members,
    }
    path = pdir / "pipeline.yaml"
    path.write_text(yaml.safe_dump(doc, sort_keys=False), encoding="utf-8")
    return path


def make_valid_corpus(tmp: Path) -> None:
    a = _base_specimen("gs.specimen.alpha", "alpha")
    b = _base_specimen(
        "gs.specimen.beta",
        "beta",
        aliases=["SY-TEST-1"],
        prerequisites=["gs.specimen.alpha"],
    )
    write_specimen(tmp, "alpha", a)
    write_specimen(tmp, "beta", b)
    write_pipeline(
        tmp,
        "bindings-core",
        ["gs.specimen.alpha", "gs.specimen.beta"],
    )
