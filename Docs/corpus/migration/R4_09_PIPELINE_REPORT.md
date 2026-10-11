# R4-09 — canonical pipeline manifests report

**Status:** **COMPLETE** (2026-10-11) — **uncommitted** (owner commit gate)  
**HEAD:** `bcc194544a55da70e4de28bf3314a81a130619df` (unchanged)  
**Source:** [R3_PIPELINE_PLAN.md](R3_PIPELINE_PLAN.md)

## 1. Pipeline inventory (20 defined in plan)

| pipeline_id | § | Members | Prerequisites (plan) | Readiness |
| ----------- | - | ------- | -------------------- | --------- |
| `syntax-track-l1-core` | 1.1 | 5 | empty (**confirmed**) | **READY** |
| `syntax-track-l2-types-and-optionals` | 1.2 | 3 | unknown | **READY** |
| `syntax-track-graph-mutation` | 1.3 | 3 | unknown | **READY** |
| `syntax-track-l4-surface` | 1.4 | 6 | unknown | **READY** |
| `l3-advanced-syntax-subtrack` | 1.5 | 4 | nested-if-optional → branch **proposed** (not in `specimen.yaml`) | **READY** |
| `syntax-track-full` | 1.6 | 17 | composite of §1.1–1.4 | **READY** |
| `bindings-intro` | 2 | 3 | proposed only | **READY** |
| `optional-null-track` | 2 | 4 | — | **READY** |
| `control-flow-flat-and-nested` | 2 | 3 | proposed only | **READY** |
| `algorithms-numbers-l1` | 3.1 | 13 | unknown | **READY** |
| `algorithms-collections-l1` | 3.2 | 13 | unknown | **READY** |
| `algorithms-strings-l1` | 3.3 | 8 | unknown | **READY** |
| `algorithms-composition-l2` | 3.4 | 4 | unknown | **READY** |
| `algorithms-advanced-l3` | 3.5 | 3 | unknown | **READY** |
| `algorithms-complex-l4` | 3.6 | 5 | unknown | **READY** |
| `modular-systems-positive` | 4.1 | 5 | unknown (L5 queue) | **READY** |
| `modular-systems-negative` | 4.2 | 1 | — | **READY** |
| `algorithms-sorts-and-search` | 5 | 5 | unknown | **READY** |
| `syntax-track-l5-modules` | 7 | — | SY-L5.1–L5.3 **NOT LANDED** | **BLOCKED** |
| `syntax-negative-per-level` | 7 | — | **OQ-SY-2** OPEN | **BLOCKED** |

**Counts:** **18 READY**, **2 BLOCKED**.  
**Note:** R3 §3.2 text says «14» collections; R3 §3.2 table + map = **13** `gs.algo.collections.*` (R4-06 reconciliation) — manifest uses **13**.

## 2. READY pipeline.yaml paths (18)

### language-features (9)

| pipeline_id | path | members |
| ----------- | ---- | ------- |
| `syntax-track-l1-core` | `programs/language-features/pipelines/syntax-track-l1-core/pipeline.yaml` | 5 |
| `syntax-track-l2-types-and-optionals` | `programs/language-features/pipelines/syntax-track-l2-types-and-optionals/pipeline.yaml` | 3 |
| `syntax-track-graph-mutation` | `programs/language-features/pipelines/syntax-track-graph-mutation/pipeline.yaml` | 3 |
| `syntax-track-l4-surface` | `programs/language-features/pipelines/syntax-track-l4-surface/pipeline.yaml` | 6 |
| `l3-advanced-syntax-subtrack` | `programs/language-features/pipelines/l3-advanced-syntax-subtrack/pipeline.yaml` | 4 |
| `syntax-track-full` | `programs/language-features/pipelines/syntax-track-full/pipeline.yaml` | 17 |
| `bindings-intro` | `programs/language-features/pipelines/bindings-intro/pipeline.yaml` | 3 |
| `optional-null-track` | `programs/language-features/pipelines/optional-null-track/pipeline.yaml` | 4 |
| `control-flow-flat-and-nested` | `programs/language-features/pipelines/control-flow-flat-and-nested/pipeline.yaml` | 3 |

### algorithms (9)

| pipeline_id | path | members |
| ----------- | ---- | ------- |
| `algorithms-numbers-l1` | `programs/algorithms/pipelines/algorithms-numbers-l1/pipeline.yaml` | 13 |
| `algorithms-collections-l1` | `programs/algorithms/pipelines/algorithms-collections-l1/pipeline.yaml` | 13 |
| `algorithms-strings-l1` | `programs/algorithms/pipelines/algorithms-strings-l1/pipeline.yaml` | 8 |
| `algorithms-composition-l2` | `programs/algorithms/pipelines/algorithms-composition-l2/pipeline.yaml` | 4 |
| `algorithms-advanced-l3` | `programs/algorithms/pipelines/algorithms-advanced-l3/pipeline.yaml` | 3 |
| `algorithms-complex-l4` | `programs/algorithms/pipelines/algorithms-complex-l4/pipeline.yaml` | 5 |
| `modular-systems-positive` | `programs/algorithms/pipelines/modular-systems-positive/pipeline.yaml` | 5 |
| `modular-systems-negative` | `programs/algorithms/pipelines/modular-systems-negative/pipeline.yaml` | 1 |
| `algorithms-sorts-and-search` | `programs/algorithms/pipelines/algorithms-sorts-and-search/pipeline.yaml` | 5 |

Schema: `pipeline_schema_version: 1`, `pipeline_id`, `title`, `members` (ordered canonical IDs only).

## 3. BLOCKED pipelines (not authored)

| pipeline_id | Blocker |
| ----------- | ------- |
| `syntax-track-l5-modules` | Members SY-L5.1–L5.3 **NOT LANDED** (R3 §7) |
| `syntax-negative-per-level` | **OQ-SY-2** OPEN — syntax negative layout undecided |

## 4. Validation

| Check | Result |
| ----- | ------ |
| `corpus_manifest validate` | **PASS** — 73 specimens, 18 pipelines |
| Unique `pipeline_id` | **PASS** |
| Dangling pipeline members | **0** |
| `pytest corpus_manifest/tests` | **20/20** |

## 5. Registry (temporary)

| Item | Value |
| ---- | ----- |
| Output | `/tmp/r4-09-registry.yaml` |
| Specimens | **73** |
| Pipelines | **18** |
| Fingerprint (CLI) | `02e4330dfdc17cadde98787071909e124495bc56bf379c1f75d6fab3412f0f40` |
| Double `generate` | **byte-identical** |
| `check-generated` | **PASS** |
| Production `registry.yaml` | **не** створено |

## 6. SHA-256

**89/89 PASS** vs [R4_BASELINE_ARTIFACTS.sha256](R4_BASELINE_ARTIFACTS.sha256) (artifact paths unchanged by R4-09).

## 7. OPEN owner decisions

| ID | Impact |
| -- | ------ |
| **OQ-SY-2** | Blocks `syntax-negative-per-level` pipeline only |
| **SY-L5.1–L5.3** | Blocks `syntax-track-l5-modules` |
| **proposed** `nested-if-optional` → `nested-if-branch` | Narrative only; **not** added to `specimen.yaml` or pipeline prereq fields (schema v1 has no member-level prereqs) |
| **L5 modular queue order** | Documented **unknown**; pipeline uses R3 §4.1 table order |

## 8. WIP isolation

R4-09 added **only** 18× `pipeline.yaml` + this report.  
**Not modified:** `specimen.yaml`, R4-07 docs (`README.md`, `R3_EXECUTION_PLAN.md` unchanged vs pre-R4-09), `R4_08_MIGRATION_REPORT.md`, Git index (**27** staged renames preserved).

## 9. Remaining work

- Owner commits: R4-07.1, R4-08.1, then R4-09.1 (or combined policy).
- **R4-10** documentation sweep per execution plan.
- Production `registry.yaml` generation (post–commit policy, `--allow-production-output`).
- BLOCKED pipelines when OQ-SY-2 / SY-L5 land.
