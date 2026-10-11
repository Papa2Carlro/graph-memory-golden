from __future__ import annotations

import hashlib
import json
from pathlib import Path
from typing import Any, Dict, List, Tuple

from . import __version__
from .constants import GENERATOR_NAME, REGISTRY_SCHEMA_VERSION
from .discovery import (
    find_pipeline_manifests,
    find_specimen_manifests,
    resolve_corpus,
)
from .yaml_io import dump_yaml, load_yaml


def _specimen_snapshot(
    data: Dict[str, Any],
    manifest_rel: str,
) -> Dict[str, Any]:
    snap: Dict[str, Any] = {
        "canonical_id": data["canonical_id"],
        "kind": data["kind"],
        "home": data["home"],
        "artifacts": data["artifacts"],
        "features": data["features"],
        "complexity": data["complexity"],
        "prerequisites": data.get("prerequisites", []),
        "historical": data.get("historical", {}),
        "acceptance": data.get("acceptance", {}),
        "manifest": manifest_rel,
    }
    if "aliases" in data:
        snap["aliases"] = data["aliases"]
    if "expected" in data:
        snap["expected"] = data["expected"]
    return snap


def _sorted_id_list(ids: List[str]) -> List[str]:
    return sorted(set(ids))


def build_registry_document(corpus_root: Path) -> Dict[str, Any]:
    paths = resolve_corpus(corpus_root)
    programs = paths.programs_root

    specimens_map: Dict[str, Any] = {}
    alias_index: Dict[str, str] = {}
    feature_index: Dict[str, List[str]] = {}
    manifest_index: Dict[str, str] = {}

    for mf in find_specimen_manifests(programs):
        rel_manifest = mf.relative_to(paths.corpus_root).as_posix()
        data, _ = load_yaml(mf)
        if not isinstance(data, dict):
            continue
        cid = data.get("canonical_id")
        if not isinstance(cid, str):
            continue
        specimens_map[cid] = _specimen_snapshot(data, rel_manifest)
        manifest_index[cid] = rel_manifest
        for alias in data.get("aliases") or []:
            if isinstance(alias, str):
                alias_index[alias] = cid
        features = data.get("features") or {}
        if isinstance(features, dict):
            primary = features.get("primary")
            if isinstance(primary, str):
                feature_index.setdefault(primary, []).append(cid)
            for sec in features.get("secondary") or []:
                if isinstance(sec, str):
                    feature_index.setdefault(sec, []).append(cid)

    for key in feature_index:
        feature_index[key] = _sorted_id_list(feature_index[key])

    pipelines_map: Dict[str, Any] = {}
    for pf in find_pipeline_manifests(programs):
        rel_manifest = pf.relative_to(paths.corpus_root).as_posix()
        data, _ = load_yaml(pf)
        if not isinstance(data, dict):
            continue
        pid = data.get("pipeline_id")
        if not isinstance(pid, str):
            continue
        members = data.get("members") or []
        if not isinstance(members, list):
            members = []
        pipelines_map[pid] = {
            "pipeline_id": pid,
            "title": data.get("title"),
            "members": list(members),
            "manifest": rel_manifest,
        }

    registry: Dict[str, Any] = {
        "registry_schema_version": REGISTRY_SCHEMA_VERSION,
        "generator": f"{GENERATOR_NAME}/{__version__}",
        "specimens": dict(sorted(specimens_map.items())),
        "pipelines": dict(sorted(pipelines_map.items())),
        "indexes": {
            "aliases": dict(sorted(alias_index.items())),
            "features": dict(sorted(feature_index.items())),
            "specimen_manifests": dict(sorted(manifest_index.items())),
        },
    }
    return registry


def render_registry_yaml(corpus_root: Path) -> str:
    """Deterministic registry YAML (no volatile timestamps)."""
    return dump_yaml(build_registry_document(corpus_root))


def registry_fingerprint(registry: Dict[str, Any]) -> str:
    """Stable hash of canonical registry body (excludes optional legacy keys)."""
    body = registry_body_for_compare(registry)
    payload = json.dumps(body, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def registry_body_for_compare(registry: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "registry_schema_version": registry.get("registry_schema_version"),
        "specimens": registry.get("specimens"),
        "pipelines": registry.get("pipelines"),
        "indexes": registry.get("indexes"),
    }


def is_registry_stale(corpus_root: Path, registry_path: Path) -> Tuple[bool, str]:
    if not registry_path.is_file():
        return True, "registry file missing"
    expected_yaml = render_registry_yaml(corpus_root)
    actual_yaml = registry_path.read_text(encoding="utf-8")
    if actual_yaml != expected_yaml:
        data, _ = load_yaml(registry_path)
        if isinstance(data, dict):
            expected_doc = build_registry_document(corpus_root)
            if registry_fingerprint(data) == registry_fingerprint(expected_doc):
                return True, "registry YAML serialization differs from canonical output"
        return True, "registry content does not match manifests"
    return False, ""


def write_registry(path: Path, registry: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(dump_yaml(registry), encoding="utf-8")
