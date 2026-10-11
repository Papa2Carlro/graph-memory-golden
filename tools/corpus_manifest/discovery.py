from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import List, Tuple

from .constants import PROGRAMS_DIRNAME


@dataclass(frozen=True)
class CorpusPaths:
    corpus_root: Path
    programs_root: Path


def resolve_corpus(corpus_root: Path) -> CorpusPaths:
    root = corpus_root.resolve()
    programs = root / PROGRAMS_DIRNAME
    return CorpusPaths(corpus_root=root, programs_root=programs)


def find_specimen_manifests(programs_root: Path) -> List[Path]:
    if not programs_root.is_dir():
        return []
    return sorted(programs_root.rglob("specimen.yaml"))


def find_pipeline_manifests(programs_root: Path) -> List[Path]:
    if not programs_root.is_dir():
        return []
    out: List[Path] = []
    for path in sorted(programs_root.rglob("pipeline.yaml")):
        # Authoritative layout: .../pipelines/<id>/pipeline.yaml
        if path.parent.parent.name == "pipelines":
            out.append(path)
    return out


def specimen_programs_path(manifest_path: Path, programs_root: Path) -> Path:
    return manifest_path.parent.relative_to(programs_root).as_posix()
