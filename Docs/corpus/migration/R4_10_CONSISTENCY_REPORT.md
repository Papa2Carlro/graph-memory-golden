# R4-10 — documentation & consistency report

**Status:** **COMPLETE** (2026-10-11) — **uncommitted**  
**HEAD (committed):** `bcc194544a55da70e4de28bf3314a81a130619df`  
**Slice:** [R3_EXECUTION_PLAN.md](R3_EXECUTION_PLAN.md) §R4-10

## 1. Documentation audit inventory

| Area | Finding |
| ---- | ------- |
| [migration/README.md](README.md) | Stale top status (67/73, R4-08 pending); R4-05 «uncommitted»; R4-07 «6 modular legacy» |
| [R3_EXECUTION_PLAN.md](R3_EXECUTION_PLAN.md) | R4-05/08/09/10 status rows outdated |
| [R3_PIPELINE_PLAN.md](R3_PIPELINE_PLAN.md) | Header «без production pipeline.yaml» |
| [tools/corpus_manifest/README.md](../../../tools/corpus_manifest/README.md) | R4-02 bounds implied zero production manifests |
| [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](../GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md) | «не виконана міграція» vs working tree |
| [R4_BASELINE.md](R4_BASELINE.md) | No post-R4 verification summary |
| [SYNTAX_TRACK.md](../SYNTAX_TRACK.md) | §19.6 paths = registry narrative; needed post-R4 pointer |
| [L3_ADVANCED_SYNTAX.md](../L3_ADVANCED_SYNTAX.md) | §1 paths `03-advanced/syntax` without target pointer |
| [R4_08_MIGRATION_REPORT.md](R4_08_MIGRATION_REPORT.md) | **Not edited** (R4-10) |
| [R4_09_PIPELINE_REPORT.md](R4_09_PIPELINE_REPORT.md) | **Not edited** (R4-10) |

**Out of scope (not rewritten):** full §19.6 path table in SYNTAX_TRACK; POLICY/EXAMPLE_CORPUS_ORGANIZATION monolith sweep (R4-10 partial); GAPS §8.6 **D2** narrative drift.

## 2. Confirmed inconsistencies (fixed)

1. Migration README implied incomplete specimen migration (**67/73**) while working tree has **73/73**.
2. R4-05 documented as uncommitted though **R4-05.1** is on `master` (`f939a4b`).
3. R4-07 section claimed modular still on `05-modular/` after **R4-08** WIP.
4. Execution plan / pipeline plan did not reflect **R4-08/09** completion state.
5. Architecture doc denied migration while target layout populated in working tree.

## 3. Corrections applied (R4-10 files only)

| File | Change |
| ---- | ------ |
| `migration/README.md` | Inventory table; R4-05/08/09/10 sections; status line; doc index (**preserves** R4-07 § body from prior WIP) |
| `migration/R3_EXECUTION_PLAN.md` | R4-05 committed; R4-08/09/10 status (**preserves** R4-07 row) |
| `migration/R3_PIPELINE_PLAN.md` | AUTHORING status + 18 pipelines |
| `migration/R4_BASELINE.md` | §11 post-R4 integrity |
| `../GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md` | R4 working-tree status + historical path note |
| `../SYNTAX_TRACK.md` | Post-R4 dual-state banner (acceptance unchanged) |
| `../L3_ADVANCED_SYNTAX.md` | Post-R4 path pointer; 4/4 SOURCE-LEVEL preserved |
| `../../../tools/corpus_manifest/README.md` | R4-02 vs post-R4 manifests |

## 4. Remaining unresolved issues

- **Owner commits:** R4-07.1, R4-08.1, R4-09.1 (and optional combined policy).
- **Production `registry.yaml`** under `_generated/` (R4-09 scope: `/tmp` only).
- **SYNTAX_TRACK** row-level path updates vs `historical.classic_level_path` (deferred; dual-state documented).
- **R3_PIPELINE_PLAN** §3.2 «14 collections» text vs **13** map rows (documented in R4-09 report).
- **GAPS §8.6 / D2** nested-if-optional narrative vs manifest `prerequisites: []` (OPEN; not auto-fixed).

## 5. Canonical counts (verified)

| Bucket | Count |
| ------ | ----- |
| Specimens | **73** = 21 LF + 46 algo + 6 modular |
| Artifacts | **89** = 28 LF + 46 algo `.gs` + 15 modular `.gs` |
| `specimen.yaml` | **73** |
| `pipeline.yaml` (READY) | **18** |
| BLOCKED pipelines | **2** (`syntax-track-l5-modules`, `syntax-negative-per-level`) |

## 6. Acceptance preservation

- **15/18** Syntax Track **LANDED**; **SY-L5.1–L5.3 NOT LANDED** — unchanged.
- **L3-ADV 4/4** SOURCE-LEVEL ACCEPTED — unchanged.
- `acceptance.runtime_verified: false` on manifests — unchanged.
- Migration success **does not** imply runtime verification.

## 7. Validation

| Check | Result |
| ----- | ------ |
| `corpus_manifest validate` | **PASS** — 73 specimens, 18 pipelines |
| `pytest corpus_manifest/tests` | **20/20** |

## 8. Registry (temporary)

| Item | Value |
| ---- | ----- |
| Path | `/tmp/r4-10-registry.yaml` |
| Fingerprint | `02e4330dfdc17cadde98787071909e124495bc56bf379c1f75d6fab3412f0f40` |
| Determinism | **byte-identical** double generate |
| `check-generated` | **PASS** |

## 9. SHA-256

**89/89 PASS** (baseline legacy keys → canonical on-disk paths).

## 10. WIP isolation

| Item | Preserved |
| ---- | --------- |
| Staged R100 renames | **27** (12 R4-07 + 15 R4-08) |
| Untracked `specimen.yaml` | **18** |
| Untracked `pipeline.yaml` | **18** |
| R4_08 / R4_09 reports | **unchanged** |
| Git index | **not** modified by R4-10 |
| `specimen.yaml` / `pipeline.yaml` / golden source | **not** modified |

## 11. Readiness for next stage

- **R4-11** (optional legacy root removal) — owner-gated; empty `01-classical`… shells may remain until policy commit.
- **Production registry** + CI — after owner commits R4-07…09.
- **OQ-SY-2**, **SY-L5.1–L5.3**, modular queue order — remain **OPEN**.
