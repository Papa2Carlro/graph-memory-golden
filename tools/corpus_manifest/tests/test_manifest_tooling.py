from __future__ import annotations

import copy
from pathlib import Path

import pytest
import yaml

from corpus_manifest.registry import (
    build_registry_document,
    is_registry_stale,
    render_registry_yaml,
    registry_fingerprint,
    write_registry,
)
from corpus_manifest.validate import validate_corpus

from corpus_manifest.tests.fixture_factory import (
    _base_specimen,
    make_valid_corpus,
    write_orphan_specimen_manifest,
    write_pipeline,
    write_specimen,
)


def _codes(bag) -> set[str]:
    return {d.code for d in bag.sorted()}


@pytest.fixture
def corpus_tmp(tmp_path: Path) -> Path:
    return tmp_path


def test_valid_specimen_manifest(corpus_tmp: Path) -> None:
    make_valid_corpus(corpus_tmp)
    bag = validate_corpus(corpus_tmp)
    assert bag.ok()


def test_invalid_schema_version(corpus_tmp: Path) -> None:
    doc = _base_specimen("gs.specimen.alpha", "alpha")
    doc["specimen_schema_version"] = 99
    write_specimen(corpus_tmp, "alpha", doc)
    bag = validate_corpus(corpus_tmp)
    assert "E_SCHEMA_VERSION" in _codes(bag)


def test_missing_required_field(corpus_tmp: Path) -> None:
    doc = _base_specimen("gs.specimen.alpha", "alpha")
    del doc["acceptance"]
    write_specimen(corpus_tmp, "alpha", doc)
    bag = validate_corpus(corpus_tmp)
    assert "E_REQUIRED" in _codes(bag)


def test_duplicate_canonical_id(corpus_tmp: Path) -> None:
    doc = _base_specimen("gs.specimen.alpha", "alpha")
    write_specimen(corpus_tmp, "alpha", doc)
    doc2 = _base_specimen("gs.specimen.alpha", "alpha-two", category="comparisons")
    write_specimen(corpus_tmp, "alpha-two", doc2, category="comparisons")
    bag = validate_corpus(corpus_tmp)
    assert "E_DUP_CANONICAL_ID" in _codes(bag)


def test_duplicate_alias(corpus_tmp: Path) -> None:
    write_specimen(
        corpus_tmp,
        "alpha",
        _base_specimen("gs.specimen.alpha", "alpha", aliases=["SY-DUP"]),
    )
    write_specimen(
        corpus_tmp,
        "beta",
        _base_specimen("gs.specimen.beta", "beta", aliases=["SY-DUP"]),
    )
    bag = validate_corpus(corpus_tmp)
    assert "E_DUP_ALIAS" in _codes(bag)


def test_alias_id_collision(corpus_tmp: Path) -> None:
    write_specimen(
        corpus_tmp,
        "alpha",
        _base_specimen("gs.specimen.alpha", "alpha"),
    )
    write_specimen(
        corpus_tmp,
        "beta",
        _base_specimen("gs.specimen.beta", "beta", aliases=["gs.specimen.alpha"]),
    )
    bag = validate_corpus(corpus_tmp)
    assert "E_ALIAS_ID_COLLISION" in _codes(bag)


def test_duplicate_physical_home(corpus_tmp: Path) -> None:
    doc = _base_specimen("gs.specimen.alpha", "alpha")
    write_orphan_specimen_manifest(
        corpus_tmp,
        "language-features/bindings/specimens/alpha",
        doc,
    )
    doc2 = _base_specimen("gs.specimen.beta", "beta")
    doc2["home"] = copy.deepcopy(doc["home"])
    write_orphan_specimen_manifest(
        corpus_tmp,
        "language-features/bindings/specimens/beta",
        doc2,
    )
    bag = validate_corpus(corpus_tmp, check_artifact_files=False)
    assert "E_DUP_HOME" in _codes(bag)


def test_duplicate_artifact_ownership(corpus_tmp: Path) -> None:
    doc = _base_specimen("gs.specimen.alpha", "alpha")
    write_orphan_specimen_manifest(
        corpus_tmp,
        "language-features/bindings/specimens/alpha",
        doc,
    )
    doc2 = copy.deepcopy(doc)
    doc2["canonical_id"] = "gs.specimen.beta"
    doc2["aliases"] = []
    write_orphan_specimen_manifest(
        corpus_tmp,
        "language-features/bindings/specimens/beta",
        doc2,
    )
    bag = validate_corpus(corpus_tmp, check_artifact_files=False)
    assert "E_DUP_ARTIFACT" in _codes(bag)


def test_dangling_prerequisite(corpus_tmp: Path) -> None:
    doc = _base_specimen(
        "gs.specimen.alpha",
        "alpha",
        prerequisites=["gs.specimen.missing"],
    )
    write_specimen(corpus_tmp, "alpha", doc)
    bag = validate_corpus(corpus_tmp)
    assert "E_DANGLING_PREREQ" in _codes(bag)


def test_dependency_cycle(corpus_tmp: Path) -> None:
    write_specimen(
        corpus_tmp,
        "alpha",
        _base_specimen(
            "gs.specimen.alpha",
            "alpha",
            prerequisites=["gs.specimen.beta"],
        ),
    )
    write_specimen(
        corpus_tmp,
        "beta",
        _base_specimen(
            "gs.specimen.beta",
            "beta",
            prerequisites=["gs.specimen.alpha"],
        ),
    )
    bag = validate_corpus(corpus_tmp)
    assert "E_PREREQ_CYCLE" in _codes(bag)


def test_dangling_pipeline_member(corpus_tmp: Path) -> None:
    write_specimen(corpus_tmp, "alpha", _base_specimen("gs.specimen.alpha", "alpha"))
    write_pipeline(corpus_tmp, "p1", ["gs.specimen.alpha", "gs.specimen.ghost"])
    bag = validate_corpus(corpus_tmp)
    assert "E_DANGLING_PIPELINE_MEMBER" in _codes(bag)


def test_duplicate_pipeline_id(corpus_tmp: Path) -> None:
    make_valid_corpus(corpus_tmp)
    dup_dir = corpus_tmp / "programs/language-features/pipelines/second-dir"
    dup_dir.mkdir(parents=True)
    (dup_dir / "pipeline.yaml").write_text(
        yaml.safe_dump(
            {
                "pipeline_schema_version": 1,
                "pipeline_id": "bindings-core",
                "title": "Duplicate id",
                "members": ["gs.specimen.alpha"],
            },
            sort_keys=False,
        ),
        encoding="utf-8",
    )
    bag = validate_corpus(corpus_tmp)
    assert "E_DUP_PIPELINE_ID" in _codes(bag)


def test_deterministic_registry_generation(corpus_tmp: Path) -> None:
    make_valid_corpus(corpus_tmp)
    yaml_a = render_registry_yaml(corpus_tmp)
    yaml_b = render_registry_yaml(corpus_tmp)
    assert yaml_a == yaml_b
    r1 = build_registry_document(corpus_tmp)
    r2 = build_registry_document(corpus_tmp)
    assert registry_fingerprint(r1) == registry_fingerprint(r2)
    assert r1["specimens"]["gs.specimen.alpha"]["manifest"].endswith(
        "specimen.yaml"
    )


def test_stale_registry_detection(corpus_tmp: Path) -> None:
    make_valid_corpus(corpus_tmp)
    reg_path = corpus_tmp / "registry.yaml"
    write_registry(reg_path, build_registry_document(corpus_tmp))
    stale, _ = is_registry_stale(corpus_tmp, reg_path)
    assert not stale
    write_specimen(
        corpus_tmp,
        "gamma",
        _base_specimen("gs.specimen.gamma", "gamma", category="events"),
        category="events",
    )
    stale, reason = is_registry_stale(corpus_tmp, reg_path)
    assert stale
    assert reason


def test_empty_corpus(corpus_tmp: Path) -> None:
    (corpus_tmp / "programs").mkdir()
    bag = validate_corpus(corpus_tmp)
    assert bag.ok()


def test_negative_specimen_fixture(corpus_tmp: Path) -> None:
    doc = _base_specimen(
        "gs.specimen.neg",
        "neg",
        kind="negative",
        expected="compile_error",
    )
    write_specimen(corpus_tmp, "neg", doc)
    bag = validate_corpus(corpus_tmp)
    assert bag.ok()
    reg = build_registry_document(corpus_tmp)
    assert reg["specimens"]["gs.specimen.neg"]["expected"] == "compile_error"


def test_stable_pipeline_member_ordering(corpus_tmp: Path) -> None:
    make_valid_corpus(corpus_tmp)
    reg = build_registry_document(corpus_tmp)
    members = reg["pipelines"]["bindings-core"]["members"]
    assert members == ["gs.specimen.alpha", "gs.specimen.beta"]


def test_path_traversal_rejected(corpus_tmp: Path) -> None:
    doc = _base_specimen("gs.specimen.alpha", "alpha")
    doc["home"]["directory"] = "../outside"
    write_orphan_specimen_manifest(
        corpus_tmp,
        "language-features/bindings/specimens/alpha",
        doc,
    )
    bag = validate_corpus(corpus_tmp, check_artifact_files=False)
    assert "E_PATH_TRAVERSAL" in _codes(bag)


def test_invalid_artifact_path(corpus_tmp: Path) -> None:
    doc = _base_specimen("gs.specimen.alpha", "alpha")
    doc["artifacts"][0]["path"] = "missing.gs"
    spec_dir = corpus_tmp / "programs" / doc["home"]["directory"]
    spec_dir.mkdir(parents=True, exist_ok=True)
    (spec_dir / "specimen.yaml").write_text(
        yaml.safe_dump(doc, sort_keys=False),
        encoding="utf-8",
    )
    bag = validate_corpus(corpus_tmp)
    assert "E_ARTIFACT_PATH" in _codes(bag)
