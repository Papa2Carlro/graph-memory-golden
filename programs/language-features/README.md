# language-features — canonical syntax corpus root

**Status:** **R4 migrated** (working tree) — golden syntax specimens and manifests live under this tree. Legacy layout `programs/01-classical/` … `03-advanced/syntax/` is removed on disk; provenance remains in `specimen.yaml` → `historical.classic_level_path` and corpus docs.

**Counts (corpus):** **21** specimens · **28** artifacts (`.gs` + `.gschema` where applicable).

**Canonical map:** [Docs/corpus/migration/R3_MIGRATION_MAP.md](../../Docs/corpus/migration/R3_MIGRATION_MAP.md) §3.1  
**Architecture:** [Docs/corpus/GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](../../Docs/corpus/GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md) §4.2

## Layout (`<category>/specimens/<slug>/`)

| Piece | Role |
| ----- | ---- |
| `specimen.yaml` | Canonical metadata (`canonical_id`, artifacts, acceptance, historical paths) |
| `*.gs` / `*.gschema` | Golden source (content unchanged by path migration) |

**Categories:** `bindings`, `comparisons`, `control-flow`, `destructuring`, `types-width`, `optional-null`, `graph-mutation`, `events`, `graph-edges`, `control-abort`

## Pipelines & generated registry

| Path | Role |
| ---- | ---- |
| `pipelines/<pipeline-id>/pipeline.yaml` | Canonical ordered membership ([R3_PIPELINE_PLAN.md](../../Docs/corpus/migration/R3_PIPELINE_PLAN.md)) — **9** READY pipelines under this root |
| `_generated/registry.yaml` | **Generated** derivative (`corpus_manifest generate`); not authored by hand |
| `_negative/` | Reserved for syntax negatives (**OQ-SY-2** OPEN — not landed) |

## Whole-corpus totals (with `programs/algorithms/`)

| | |
| --- | --- |
| Specimens | **73** |
| Artifacts | **89** |
| READY pipelines | **18** (9 here + 9 under `algorithms/`) |
| BLOCKED pipelines | **2** (`syntax-track-l5-modules`, `syntax-negative-per-level`) |

Historical acceptance paths in [SYNTAX_TRACK.md](../../Docs/corpus/SYNTAX_TRACK.md) and related docs are **not** upgraded by filesystem migration alone.
