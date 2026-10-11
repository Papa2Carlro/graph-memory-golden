# R3 — execution plan (R4 implementation slices)

**Status:** **PLANNING** — slices **не** виконуються в R3
**Slice:** **GS-EXAMPLE-CORPUS-REORG-R3-MIGRATION-PLAN**
**Inputs:** [R3_MIGRATION_MAP.md](R3_MIGRATION_MAP.md), [R3_PIPELINE_PLAN.md](R3_PIPELINE_PLAN.md), [R3_MODULE_SAFETY.md](R3_MODULE_SAFETY.md)

---

## 0. Глобальні інваріанти R4

- Зберегти git snapshot / branch перед кожним slice (rollback = revert slice commit).
- **Не** редагувати вміст `.gs` / `.gschema` у move-slices (лише path).
- `specimen.yaml` — окремі slices після schema freeze.
- Registry — лише generated.
- Документація: pointer updates після відповідного physical slice.

---

## R4-00 — Baseline freeze

| Поле | Значення |
| ---- | -------- |
| **Status** | **COMPLETE** (2026-10-11) — [R4_BASELINE.md](R4_BASELINE.md); safety gate **PASS** для R4-01 за умови specimen commit |
| **Scope** | Зафіксувати inventory checksum; `git status` clean або documented WIP list |
| **Prerequisites** | R3 plan COMPLETE |
| **Affected** | [R4_BASELINE_ARTIFACTS.sha256](R4_BASELINE_ARTIFACTS.sha256), [R4_BASELINE.md](R4_BASELINE.md) |
| **Changes** | Commit **не** виконувався в R4-00; owner: див. §5 commit plan у R4_BASELINE |
| **Verification** | 89 artifacts; aggregate SHA `16d265a258a008f7766c7a1289a9274f71e9398b90ed3d042ee1845af6f359cc` |
| **Rollback** | N/A (read-only) |
| **Acceptance** | Baseline recorded; untracked `03-advanced/syntax/` (13 files) documented |

---

## R4-01 — Target tree scaffolding (empty)

| Поле | Значення |
| ---- | -------- |
| **Status** | **COMPLETE** (2026-10-11) — **R4-01.1** committed (README + `.gitkeep` + migration pointers); on-disk empty dirs **ephemeral**; див. [migration/README.md](README.md) §R4-01 |
| **Scope** | Категорії + `specimens/` + `pipelines/<id>/` + `_generated/` + `_negative/` за [R3_MIGRATION_MAP.md](R3_MIGRATION_MAP.md); **без** 73 leaf specimen dirs (inventory **R4-03**) |
| **Prerequisites** | R4-00.1, R4-00.2 |
| **Affected** | `programs/language-features/`, `programs/algorithms/` (+ README, `_generated/.gitkeep`) |
| **Verification** | 89/89 legacy artifacts; SHA-256 baseline unchanged |
| **Rollback** | `rm -rf programs/language-features programs/algorithms` |
| **Acceptance** | README scaffolding; OQ-SY-2 лишається OPEN |

---

## R4-02 — Manifest schema + generator stub

| Поле | Значення |
| ---- | -------- |
| **Status** | **COMPLETE** (2026-10-11) — **R4-02.1** committed; `tools/corpus_manifest/`; див. [migration/README.md](README.md) §R4-02 |
| **Scope** | Schema v1 (specimen, pipeline, registry); validator; deterministic `generate`; `check-generated` stale detection; unit tests (fixtures only) |
| **Prerequisites** | R4-01.1 |
| **Affected** | `tools/corpus_manifest/` — **not** production manifests under `programs/` |
| **Verification** | `cd tools && python -m pytest corpus_manifest/tests -q`; `validate` на порожній production corpus → exit 0 |
| **Rollback** | видалити `tools/corpus_manifest/` |
| **Acceptance** | 17 тестів; production `registry.yaml` не генерується в slice |

---

## R4-03 — Pilot move: L1 flat syntax (5 specimens)

| Поле | Значення |
| ---- | -------- |
| **Status** | **COMPLETE** (2026-10-11) — **R4-03.1** committed; див. [migration/README.md](README.md) §R4-03 |
| **Scope** | `gs.specimen.let-vs-var` … `each-range` per map |
| **Prerequisites** | R4-01.1, R4-02.1 |
| **Affected** | 5 dirs under `language-features/`; `01-classical/syntax/` порожній (dir лишається до policy cleanup) |
| **Verification** | `validate` PASS; SHA 89/89 content; registry `/tmp` only |
| **Rollback** | `git mv` reverse + drop `specimen.yaml` |
| **Acceptance** | 5 `specimen.yaml`; historical acceptance unchanged; SYNTAX_TRACK paths via `historical.classic_level_path` + aliases |

---

## R4-04 — Move L2 syntax (6 specimens)

| Поле | Значення |
| ---- | -------- |
| **Status** | **COMPLETE** (2026-10-11) — **R4-04.1** committed; див. [migration/README.md](README.md) §R4-04 |
| **Scope** | `destructuring-flat`, `int32-bounds`, `optional-get`, `graph-set-param`, `graph-set-block`, `graph-set-action` |
| **Prerequisites** | R4-03.1 |
| **Affected** | `02-composition/syntax/` (10 artifact renames); **11** production manifests загалом |
| **Verification** | `validate` PASS; carriers з `.gs`; [R3_MODULE_SAFETY.md](R3_MODULE_SAFETY.md) §2 **SAFE** |
| **Rollback** | revert slice + drop 6 `specimen.yaml` |
| **Acceptance** | 6 manifests; окремі target dirs `graph-set-*` (без колізії) |

---

## R4-05 — Move L3-advanced / L4 syntax (10 specimens)

| Поле | Значення |
| ---- | -------- |
| **Status** | **COMPLETE** — **R4-05.1** committed (`f939a4b`); див. [migration/README.md](README.md) §R4-05 |
| **Scope** | 10 canonical IDs: `on-emit`, `graph-connect`, `fail-guard`, `exists-if-present`, `exists-if-guard`, `null-narrowing`, `let-block-pub`, `var-block-mut`, `nested-if-branch`, `nested-if-optional` — усі з `03-advanced/syntax/` per [R3_MIGRATION_MAP.md](R3_MIGRATION_MAP.md) §3.1 |
| **Prerequisites** | R4-04.1 |
| **Affected** | 13 artifact renames (R100); 10× `specimen.yaml`; **21** production manifests загалом |
| **Verification** | `validate` PASS; SHA **89/89**; registry `/tmp/r4-05-registry.yaml` only; `pytest` **20/20** |
| **Module safety** | [R3_MODULE_SAFETY.md](R3_MODULE_SAFETY.md) §2 — усі **SAFE** (move-only) |
| **Aliases** | SY-L4.4 trio: `aliases: []` + `historical.syntax_track_*` (unique alias rule; не змінювати validator) |
| **Rollback** | reverse 13 `git mv` + drop 10 `specimen.yaml` |
| **Acceptance** | historical acceptance **без зміни**; runtime **не** перевірялось |

---

## R4-06 — Move algorithms L1 (34 specimens)

| Поле | Значення |
| ---- | -------- |
| **Status** | **COMPLETE** — **R4-06.1** committed; див. [migration/README.md](README.md) §R4-06 |
| **Scope** | Усі R3 §3.2 **L1** під `01-classical/numbers/`, `collections/`, `strings/` — **13+13+8=34** `gs.algo.*` (plan раніше «33» — reconciliation з §3.2, не окремий scope) |
| **Prerequisites** | R4-05.1 |
| **Affected** | 34× `git mv`; **55** production manifests загалом |
| **Verification** | `validate` PASS; SHA **89/89**; [R3_MODULE_SAFETY.md](R3_MODULE_SAFETY.md) §4 **SAFE** |
| **Rollback** | reverse 34 moves + drop manifests |
| **Acceptance** | minimal `historical` + `acceptance`; runtime **не** перевірялось |

---

## R4-07 — Move algorithms L2–L4 (12 specimens)

| Поле | Значення |
| ---- | -------- |
| **Status** | **COMPLETE** (2026-10-11) — physical + manifests **uncommitted** (owner commit gate); див. [migration/README.md](README.md) §R4-07 |
| **Scope** | 12× `gs.algo.*` L2/L3/L4 per §3.2 — flat algos only (не `syntax/`, не modular) |
| **Prerequisites** | R4-06.1 |
| **Affected** | 12× `git mv`; **67** production manifests загалом |
| **Verification** | `validate` PASS; SHA **89/89**; §4 **SAFE** |
| **Rollback** | reverse 12 moves + drop manifests |
| **Acceptance** | minimal historical; runtime **не** перевірялось |

---

## R4-08 — Move L5 modular (6 projects)

| Поле | Значення |
| ---- | -------- |
| **Status** | **COMPLETE** — physical + manifests **uncommitted**; [R4_08_MIGRATION_REPORT.md](R4_08_MIGRATION_REPORT.md) |
| **Scope** | 5 positive + 1 negative project trees (15 artifacts) |
| **Prerequisites** | R4-07.1 (process) |
| **Affected** | `05-modular/` → `algorithms/modular-systems/`; **73** `specimen.yaml` |
| **Verification** | `validate` PASS; SHA **89/89**; R3_MODULE_SAFETY §5 **SAFE** |
| **Rollback** | reverse 6 tree moves + drop manifests |
| **Acceptance** | `historical.classic_level_path` preserved; runtime **не** перевірялось |

---

## R4-09 — Pipeline YAML + registry generation

| Поле | Значення |
| ---- | -------- |
| **Status** | **COMPLETE** — **18** `pipeline.yaml` **uncommitted**; [R4_09_PIPELINE_REPORT.md](R4_09_PIPELINE_REPORT.md) |
| **Scope** | READY pipelines per [R3_PIPELINE_PLAN.md](R3_PIPELINE_PLAN.md); **не** production `registry.yaml` |
| **Prerequisites** | Specimens on disk (R4-03…08 WIP OK) |
| **Affected** | `programs/*/pipelines/<id>/pipeline.yaml` |
| **Verification** | `validate`: 73 specimens + 18 pipelines; `/tmp` registry deterministic |
| **Rollback** | delete 18 `pipeline.yaml` |
| **Acceptance** | 2 pipelines залишаються **BLOCKED** (§7 plan) |

---

## R4-10 — Documentation sweep + integrity

| Поле | Значення |
| ---- | -------- |
| **Status** | **COMPLETE** — [R4_10_CONSISTENCY_REPORT.md](R4_10_CONSISTENCY_REPORT.md); **R4** physical migration **done** in working tree; commits **pending** owner |
| **Scope** | Migration README/plan sync; dual-state pointers; **не** повний rewrite SYNTAX_TRACK §19.6 paths |
| **Prerequisites** | R4-09 |
| **Affected** | `Docs/corpus/migration/*`, selected corpus doc banners |
| **Verification** | counts 73/89/18; `validate`; SHA **89/89** |
| **Rollback** | doc revert |
| **Acceptance** | **OQ-SY-2** лишається OPEN; historical acceptance unchanged |

---

## R4-11 — Legacy root removal (optional, owner-gated)

| Поле | Значення |
| ---- | -------- |
| **Scope** | Remove empty `01-classical` … `05-modular` shells |
| **Prerequisites** | R4-10; owner confirms |
| **Risk** | external links break |
| **Acceptance** | compat redirects in EXAMPLE_CORPUS_ORGANIZATION |

---

## Рекомендований перший slice після R3

**R4-00** (baseline + untracked L3-adv commit policy), потім **R4-03** (pilot 5 L1 syntax) — найменший blast radius, перевірка module-less move.

---

## Final corpus integrity check (після R4-10)

1. Artifact count = 89 (або новий baseline якщо додані manifests only).
2. `canonical_id` uniqueness.
3. No duplicate target paths.
4. `rg` module/use unchanged vs R4-00 baseline export.
5. SYNTAX_TRACK **15/18 LANDED** unchanged; L3-ADV **4 LANDED** unchanged in meaning.
6. Negative `cycle-import-bad` still negative.
