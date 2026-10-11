# algorithms — canonical classic & modular corpus root

**Status:** **R4 migrated** (working tree) — L1–L4 classic algorithms and L5 modular projects with `specimen.yaml` under this tree. Legacy roots `programs/01-classical/` … `05-modular/` are removed on disk; provenance remains in manifests and migration docs.

**Counts (this tree):** **52** specimens (**46** classic algorithms + **6** modular projects) · **61** artifacts (46 single-file classics + 15 modular `.gs` files).

**Canonical map:** [Docs/corpus/migration/R3_MIGRATION_MAP.md](../../Docs/corpus/migration/R3_MIGRATION_MAP.md) §3.2–3.3  
**Architecture:** [Docs/corpus/GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](../../Docs/corpus/GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md) §4.3

## Layout (`<category>/specimens/<slug>/`)

| Piece | Role |
| ----- | ---- |
| `specimen.yaml` | Canonical metadata (`canonical_id`, artifacts, `historical.classic_level_path`, acceptance) |
| `*.gs` | Golden source (filenames preserved from legacy paths) |

**Categories:** `numbers`, `collections`, `strings`, `composition`, `advanced`, `complex`, `modular-systems`

## Pipelines & negatives

| Path | Role |
| ---- | ---- |
| `pipelines/<pipeline-id>/pipeline.yaml` | Canonical ordered membership — **9** READY pipelines under this root |
| `modular-systems/_negative/` | L5-style negative specimen(s) (e.g. cycle import); **OQ-SY-2** remains OPEN for broader negative track |

## Whole-corpus totals (with `programs/language-features/`)

| | |
| --- | --- |
| Specimens | **73** (= 21 language-features + 52 here) |
| Artifacts | **89** (= 28 language-features + 61 here) |
| READY pipelines | **18** |
| BLOCKED pipelines | **2** |

`registry.yaml` is a **generated** aggregate over all manifests; production copy under `_generated/` is owner-gated. Parser/runtime acceptance is **not** implied by layout alone.
