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

## R4-05 — Move L3-advanced / L4 syntax (11 specimens)

| Поле | Значення |
| ---- | -------- |
| **Scope** | усі `03-advanced/syntax/*` per map |
| **Prerequisites** | R4-04; **untracked files committed** in R4-00 |
| **Affected** | 11 directories |
| **Verification** | 89-file inventory → target paths; L3_ADVANCED_SYNTAX paths |
| **Rollback** | revert |
| **Acceptance** | GAPS §8.6 doc sync slice (optional separate) — **не** змінювати acceptance labels |

---

## R4-06 — Move algorithms L1 (33 specimens)

| Поле | Значення |
| ---- | -------- |
| **Scope** | numbers, collections, strings |
| **Prerequisites** | R4-05 or parallel if no conflict |
| **Affected** | `01-classical/{numbers,collections,strings}/` |
| **Verification** | CLASSIC_LEVELS references |
| **Rollback** | revert |
| **Acceptance** | 33 algo manifests (minimal historical block) |

---

## R4-07 — Move algorithms L2–L4 (12 specimens)

| Поле | Значення |
| ---- | -------- |
| **Scope** | composition + advanced + complex flat |
| **Prerequisites** | R4-06 |
| **Affected** | `02-composition/*.gs`, `03-advanced/*.gs`, `04-complex/*.gs` |
| **Verification** | annex refs if any |
| **Rollback** | revert |
| **Acceptance** | empty legacy level dirs policy (keep or remove — owner) |

---

## R4-08 — Move L5 modular (6 projects)

| Поле | Значення |
| ---- | -------- |
| **Scope** | 5 positive + 1 negative project trees |
| **Prerequisites** | R4-07 |
| **Affected** | `05-modular/` |
| **Verification** | R3_MODULE_SAFETY §5 |
| **Rollback** | revert |
| **Acceptance** | L5_PROJECT_SYSTEM path table updated |

---

## R4-09 — Pipeline YAML + registry generation

| Поле | Значення |
| ---- | -------- |
| **Scope** | Author `pipeline.yaml` per [R3_PIPELINE_PLAN.md](R3_PIPELINE_PLAN.md); generate `language-features/_generated/registry.yaml` |
| **Prerequisites** | R4-03…08 manifests exist |
| **Affected** | pipelines/, _generated/ |
| **Verification** | validator: IDs, aliases, no cycles, files exist |
| **Rollback** | delete generated; keep manifests |
| **Acceptance** | CI hook optional (out of scope if no CI) |

---

## R4-10 — Documentation sweep + integrity

| Поле | Значення |
| ---- | -------- |
| **Scope** | POLICY dual-state; EXAMPLE_CORPUS_ORGANIZATION; SYNTAX_TRACK paths; fix **D2** GAPS §8.6 drift |
| **Prerequisites** | R4-09 |
| **Affected** | `Docs/corpus/*`, monolith stubs |
| **Verification** | grep old `programs/0N-` paths — only historical/historical blocks |
| **Rollback** | doc revert |
| **Acceptance** | migration README status → EXECUTED; R4 complete |

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
