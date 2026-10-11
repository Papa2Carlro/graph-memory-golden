from __future__ import annotations

from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

from .canonical_ids import is_valid_canonical_id
from .constants import (
    COMPLEXITY_CONTROL_FLOW,
    COMPLEXITY_FILES,
    COMPLEXITY_SYNTAX_DEPTH,
    HOME_ROOT_VALUES,
    KIND_VALUES,
    PIPELINE_SCHEMA_VERSION,
    SPECIMEN_SCHEMA_VERSION,
)
from .diagnostics import DiagnosticBag
from .discovery import (
    CorpusPaths,
    find_pipeline_manifests,
    find_specimen_manifests,
    resolve_corpus,
)
from .paths import resolve_under_root
from .yaml_io import load_yaml


def _is_str_list(value: Any) -> bool:
    return isinstance(value, list) and all(isinstance(x, str) for x in value)


def validate_specimen_document(
    data: Dict[str, Any],
    manifest_path: str,
    programs_root: Optional[Path] = None,
    check_artifact_files: bool = True,
) -> DiagnosticBag:
    bag = DiagnosticBag()
    mp = manifest_path

    ver = data.get("specimen_schema_version")
    if ver != SPECIMEN_SCHEMA_VERSION:
        bag.add(
            "E_SCHEMA_VERSION",
            mp,
            f"specimen_schema_version must be {SPECIMEN_SCHEMA_VERSION}, got {ver!r}",
        )

    required = (
        "canonical_id",
        "kind",
        "home",
        "artifacts",
        "features",
        "complexity",
        "prerequisites",
        "historical",
        "acceptance",
    )
    for key in required:
        if key not in data:
            bag.add("E_REQUIRED", mp, f"missing required field '{key}'")

    cid = data.get("canonical_id")
    if cid is not None and not isinstance(cid, str):
        bag.add("E_TYPE", mp, "canonical_id must be a string")
    elif isinstance(cid, str) and not is_valid_canonical_id(cid):
        bag.add("E_CANONICAL_ID", mp, f"canonical_id format not accepted: {cid}")

    kind = data.get("kind")
    if kind is not None:
        if not isinstance(kind, str) or kind not in KIND_VALUES:
            bag.add(
                "E_ENUM",
                mp,
                f"kind must be one of {sorted(KIND_VALUES)}",
            )

    aliases = data.get("aliases", [])
    if "aliases" in data and not _is_str_list(aliases):
        bag.add("E_TYPE", mp, "aliases must be a list of strings")

    home = data.get("home")
    if home is not None:
        if not isinstance(home, dict):
            bag.add("E_TYPE", mp, "home must be an object")
        else:
            for hk in ("root", "category", "directory"):
                if hk not in home:
                    bag.add("E_REQUIRED", mp, f"home missing '{hk}'")
            root = home.get("root")
            if root is not None and root not in HOME_ROOT_VALUES:
                bag.add(
                    "E_ENUM",
                    mp,
                    f"home.root must be one of {sorted(HOME_ROOT_VALUES)}",
                )

    artifacts = data.get("artifacts")
    if artifacts is not None:
        if not isinstance(artifacts, list) or not artifacts:
            bag.add("E_TYPE", mp, "artifacts must be a non-empty list")
        else:
            for i, art in enumerate(artifacts):
                if not isinstance(art, dict):
                    bag.add("E_TYPE", mp, f"artifacts[{i}] must be an object")
                    continue
                for ak in ("role", "path", "language"):
                    if ak not in art:
                        bag.add(
                            "E_REQUIRED",
                            mp,
                            f"artifacts[{i}] missing '{ak}'",
                        )

    features = data.get("features")
    if features is not None:
        if not isinstance(features, dict) or "primary" not in features:
            bag.add("E_REQUIRED", mp, "features.primary is required")
        sec = features.get("secondary", []) if isinstance(features, dict) else []
        if isinstance(features, dict) and "secondary" in features:
            if not _is_str_list(sec):
                bag.add("E_TYPE", mp, "features.secondary must be a list of strings")

    complexity = data.get("complexity")
    if complexity is not None:
        if not isinstance(complexity, dict):
            bag.add("E_TYPE", mp, "complexity must be an object")
        else:
            sd = complexity.get("syntax_depth")
            if sd not in COMPLEXITY_SYNTAX_DEPTH:
                bag.add("E_ENUM", mp, "invalid complexity.syntax_depth")
            cf = complexity.get("control_flow")
            if cf not in COMPLEXITY_CONTROL_FLOW:
                bag.add("E_ENUM", mp, "invalid complexity.control_flow")
            fl = complexity.get("files")
            if fl not in COMPLEXITY_FILES:
                bag.add("E_ENUM", mp, "invalid complexity.files")

    prereq = data.get("prerequisites")
    if prereq is not None and not _is_str_list(prereq):
        bag.add("E_TYPE", mp, "prerequisites must be a list of strings")

    historical = data.get("historical")
    if historical is not None and not isinstance(historical, dict):
        bag.add("E_TYPE", mp, "historical must be an object")

    acceptance = data.get("acceptance")
    if acceptance is not None:
        if not isinstance(acceptance, dict):
            bag.add("E_TYPE", mp, "acceptance must be an object")
        else:
            for ak in (
                "landed",
                "source_level_accepted",
                "runtime_verified",
            ):
                if ak not in acceptance:
                    bag.add("E_REQUIRED", mp, f"acceptance missing '{ak}'")

    if kind == "negative" and "expected" not in data:
        bag.add("E_REQUIRED", mp, "negative specimens require 'expected'")

    if programs_root is not None and isinstance(home, dict):
        hd = home.get("directory")
        if isinstance(hd, str):
            spec_dir = resolve_under_root(programs_root, hd, mp, bag)
        else:
            spec_dir = None
        if (
            check_artifact_files
            and spec_dir is not None
            and isinstance(artifacts, list)
        ):
            for art in artifacts:
                if not isinstance(art, dict):
                    continue
                rel = art.get("path")
                if not isinstance(rel, str):
                    continue
                target = resolve_under_root(spec_dir, rel, mp, bag)
                if target is not None and not target.is_file():
                    bag.add(
                        "E_ARTIFACT_PATH",
                        mp,
                        f"artifact not found: {target}",
                    )

    return bag


def validate_pipeline_document(
    data: Dict[str, Any],
    manifest_path: str,
) -> DiagnosticBag:
    bag = DiagnosticBag()
    mp = manifest_path

    ver = data.get("pipeline_schema_version")
    if ver != PIPELINE_SCHEMA_VERSION:
        bag.add(
            "E_SCHEMA_VERSION",
            mp,
            f"pipeline_schema_version must be {PIPELINE_SCHEMA_VERSION}, got {ver!r}",
        )

    for key in ("pipeline_id", "title", "members"):
        if key not in data:
            bag.add("E_REQUIRED", mp, f"missing required field '{key}'")

    members = data.get("members")
    if members is not None:
        if not _is_str_list(members):
            bag.add("E_TYPE", mp, "members must be a list of strings")
        elif len(members) != len(set(members)):
            bag.add("E_DUP_PIPELINE_MEMBER", mp, "duplicate member in pipeline")

    return bag


def _artifact_keys(
    home_dir: str, artifacts: List[Dict[str, Any]]
) -> List[str]:
    keys: List[str] = []
    for art in artifacts:
        if isinstance(art, dict) and isinstance(art.get("path"), str):
            keys.append(f"{home_dir}/{art['path']}")
    return keys


def _detect_prereq_cycles(
    graph: Dict[str, List[str]],
) -> List[Tuple[str, ...]]:
    cycles: List[Tuple[str, ...]] = []
    visited: Set[str] = set()
    stack: Set[str] = set()
    path: List[str] = []

    def dfs(node: str) -> None:
        if node in stack:
            idx = path.index(node)
            cycles.append(tuple(path[idx:] + [node]))
            return
        if node in visited:
            return
        visited.add(node)
        stack.add(node)
        path.append(node)
        for nxt in graph.get(node, []):
            dfs(nxt)
        path.pop()
        stack.remove(node)

    for n in sorted(graph):
        dfs(n)
    return cycles


def validate_corpus(
    corpus_root: Path,
    check_artifact_files: bool = True,
) -> DiagnosticBag:
    paths = resolve_corpus(corpus_root)
    bag = DiagnosticBag()
    programs = paths.programs_root

    specimen_files = find_specimen_manifests(programs)
    pipeline_files = find_pipeline_manifests(programs)

    specimens: Dict[str, Dict[str, Any]] = {}
    specimen_sources: Dict[str, str] = {}
    alias_owner: Dict[str, str] = {}
    home_owner: Dict[str, str] = {}
    artifact_owner: Dict[str, str] = {}

    for mf in specimen_files:
        rel = mf.relative_to(paths.corpus_root).as_posix()
        data, load_bag = load_yaml(mf)
        bag.extend(load_bag)
        if data is None:
            continue
        doc_bag = validate_specimen_document(
            data,
            rel,
            programs_root=programs,
            check_artifact_files=check_artifact_files,
        )
        bag.extend(doc_bag)

        cid = data.get("canonical_id")
        if isinstance(cid, str):
            if cid in specimens:
                bag.add(
                    "E_DUP_CANONICAL_ID",
                    rel,
                    f"duplicate canonical_id '{cid}' (also in {specimen_sources[cid]})",
                )
            else:
                specimens[cid] = data
                specimen_sources[cid] = rel

            if cid in alias_owner:
                bag.add(
                    "E_ALIAS_ID_COLLISION",
                    rel,
                    f"canonical_id collides with alias '{cid}'",
                )

            for alias in data.get("aliases") or []:
                if not isinstance(alias, str):
                    continue
                if alias == cid:
                    bag.add("E_ALIAS_ID_COLLISION", rel, "alias equals own canonical_id")
                if alias in specimens:
                    bag.add(
                        "E_ALIAS_ID_COLLISION",
                        rel,
                        f"alias '{alias}' collides with canonical_id",
                    )
                if alias in alias_owner:
                    bag.add(
                        "E_DUP_ALIAS",
                        rel,
                        f"duplicate alias '{alias}' (also {alias_owner[alias]})",
                    )
                else:
                    alias_owner[alias] = rel

        home = data.get("home")
        if isinstance(home, dict) and isinstance(home.get("directory"), str):
            hd = home["directory"]
            if hd in home_owner:
                bag.add(
                    "E_DUP_HOME",
                    rel,
                    f"duplicate home.directory '{hd}' (also {home_owner[hd]})",
                )
            else:
                home_owner[hd] = rel

        if isinstance(home, dict) and isinstance(data.get("artifacts"), list):
            hd = home.get("directory")
            if isinstance(hd, str):
                for key in _artifact_keys(hd, data["artifacts"]):
                    if key in artifact_owner:
                        bag.add(
                            "E_DUP_ARTIFACT",
                            rel,
                            f"artifact '{key}' also claimed by {artifact_owner[key]}",
                        )
                    else:
                        artifact_owner[key] = rel

    for mf in pipeline_files:
        rel = mf.relative_to(paths.corpus_root).as_posix()
        data, load_bag = load_yaml(mf)
        bag.extend(load_bag)
        if data is None:
            continue
        bag.extend(validate_pipeline_document(data, rel))

    # Second pass pipelines for cross refs and dup ids
    pipeline_by_id: Dict[str, str] = {}
    for mf in pipeline_files:
        rel = mf.relative_to(paths.corpus_root).as_posix()
        data, _ = load_yaml(mf)
        if not isinstance(data, dict):
            continue
        pid = data.get("pipeline_id")
        if isinstance(pid, str):
            if pid in pipeline_by_id:
                bag.add(
                    "E_DUP_PIPELINE_ID",
                    rel,
                    f"duplicate pipeline_id '{pid}' (also {pipeline_by_id[pid]})",
                )
            else:
                pipeline_by_id[pid] = rel
        for member in data.get("members") or []:
            if isinstance(member, str) and member not in specimens:
                bag.add(
                    "E_DANGLING_PIPELINE_MEMBER",
                    rel,
                    f"pipeline member '{member}' not found",
                )

    # Prerequisites
    graph: Dict[str, List[str]] = {}
    for cid, data in specimens.items():
        prereq = data.get("prerequisites") or []
        if isinstance(prereq, list):
            for p in prereq:
                if not isinstance(p, str):
                    continue
                if p not in specimens:
                    bag.add(
                        "E_DANGLING_PREREQ",
                        specimen_sources[cid],
                        f"prerequisite '{p}' not found",
                    )
                else:
                    graph.setdefault(cid, []).append(p)

    for cycle in _detect_prereq_cycles(graph):
        bag.add(
            "E_PREREQ_CYCLE",
            specimen_sources.get(cycle[0], ""),
            " -> ".join(cycle),
        )

    return bag
