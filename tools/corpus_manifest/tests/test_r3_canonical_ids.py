from __future__ import annotations

from pathlib import Path

from corpus_manifest.canonical_ids import is_valid_canonical_id

from .r3_map_ids import load_r3_canonical_ids


def test_r3_map_all_72_canonical_ids_accepted() -> None:
    repo = Path(__file__).resolve().parents[3]
    ids = load_r3_canonical_ids(repo)
    specimens = [i for i in ids if i.startswith("gs.specimen.")]
    algos = [i for i in ids if i.startswith("gs.algo.")]
    projects = [i for i in ids if i.startswith("gs.project.")]
    assert len(specimens) == 21
    assert len(projects) == 6
    assert len(algos) >= 45
    assert len(ids) >= 72
    rejected = [cid for cid in ids if not is_valid_canonical_id(cid)]
    assert rejected == []
