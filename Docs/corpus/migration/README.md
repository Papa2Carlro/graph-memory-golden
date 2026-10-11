# Golden Syntax Corpus — міграція (R3 planning)

**Status:** **R4 EXECUTION (working tree)** — **73/73** specimens + **18** pipelines authored (**uncommitted**); last **committed** migration slice **R4-06.1** (`bcc1945`); **R4-07…R4-09** WIP; **R4-10** doc sweep — [R4_10_CONSISTENCY_REPORT.md](R4_10_CONSISTENCY_REPORT.md)

| Inventory | Count |
| --------- | ----- |
| Specimens | **73** (21 language-features + 46 classic algorithms + 6 modular projects) |
| Golden artifacts | **89** (28 + 46 + 15) — SHA-256 vs baseline **89/89** at canonical paths |
| `specimen.yaml` | **73** |
| `pipeline.yaml` (READY) | **18** (+ **2** BLOCKED per [R3_PIPELINE_PLAN.md](R3_PIPELINE_PLAN.md) §7) |
| Syntax Track | **15/18 LANDED**; **SY-L5.1–L5.3 NOT LANDED**; runtime **not** verified |
**Slice:** **GS-EXAMPLE-CORPUS-REORG-R3-MIGRATION-PLAN**

## R4-01 — target scaffolding (2026-10-11)

**Status:** **COMPLETE** — commit **R4-01.1** `chore(corpus): scaffold feature-first target layout` (після `35dca9e`).

| Створено | Деталі |
| -------- | ------ |
| `programs/language-features/` | 10 feature categories × `specimens/`; `pipelines/` (9 IDs); `_generated/`; `_negative/` |
| `programs/algorithms/` | 7 subject categories × `specimens/`; `modular-systems/_negative/`; `pipelines/` (9 IDs) |
| README | `programs/language-features/README.md`, `programs/algorithms/README.md` |
| `.gitkeep` | лише `language-features/_generated/.gitkeep` |

**Не створено (на R4-01):** 73 specimen leaf dirs; production manifests/registry (до **R4-03** — 5 L1 `specimen.yaml`).

**Safety:** 89/89 artifacts на legacy шляхах; SHA-256 = [R4_BASELINE_ARTIFACTS.sha256](R4_BASELINE_ARTIFACTS.sha256).

## R4-02 — manifest tooling foundation (2026-10-11)

**Status:** **COMPLETE** — commit **R4-02.1** `feat(corpus): add deterministic manifest validation and registry tooling` (після `d0e5794`).

**Tooling:** [tools/corpus_manifest/README.md](../../../tools/corpus_manifest/README.md).

| Компонент | Шлях |
| --------- | ---- |
| Validator + generator + stale check | `tools/corpus_manifest/` |
| JSON Schema (довідка) | `tools/corpus_manifest/schemas/` |
| Unit tests + fixtures | `tools/corpus_manifest/tests/` |

**CLI** (`PYTHONPATH=tools` з кореня example): `python -m corpus_manifest validate|generate|check-generated`.

**Межі slice:** немає production manifests; запис у `programs/language-features/_generated/registry.yaml` заблоковано без `--allow-production-output`; runner / strict execution — **не** в scope. Порожній production corpus на `validate` — OK.

**OQ-SY-2** лишається **OPEN**; historical acceptance tooling **не** змінює.

## R4-03 — pilot L1 syntax (2026-10-11)

**Status:** **COMPLETE** — commit **R4-03.1** `feat(corpus): migrate pilot L1 syntax specimens` (після `6e4c9c5`).

### R3 map gate (перед move)

| Перевірка | Результат |
| --------- | --------- |
| §3.1 specimens | 21 рядків, 21 унікальних `gs.specimen.*` |
| §3.2 algorithms | 46 рядків, 46 унікальних `gs.algo.*`, 46 source `.gs` |
| §3.3 modular | 6 рядків (+ 1 auxiliary `gs.project.modular.*`) |
| Дублі canonical ID | **0** |
| §1 vs §3.2 | **виправлено:** §1 казав **45** algo — підрахунок; таблиця §3.2 завжди мала **46** фізичних classic specimens (**73** logical загалом: 21+46+6) |

### Migrated specimens (5)

| canonical_id | alias | source → target `.gs` |
| ------------ | ----- | --------------------- |
| `gs.specimen.let-vs-var` | SY-L1.1 | `programs/01-classical/syntax/let_vs_var.gs` → `programs/language-features/bindings/specimens/let-vs-var/let-vs-var.gs` |
| `gs.specimen.equality-operators` | SY-L1.2 | `…/equality_operators.gs` → `…/comparisons/specimens/equality-operators/equality-operators.gs` |
| `gs.specimen.if-elif-else` | SY-L1.3 | `…/if_elif_else.gs` → `…/control-flow/specimens/if-elif-else/if-elif-else.gs` |
| `gs.specimen.match-literals` | SY-L1.4 | `…/match_literals.gs` → `…/control-flow/specimens/match-literals/match-literals.gs` |
| `gs.specimen.each-range` | SY-L1.5 | `…/each_range.gs` → `…/control-flow/specimens/each-range/each-range.gs` |

Кожен target dir: `specimen.yaml` (schema v1), historical `classic_level_path` + acceptance **без зміни семантики**.

### Verification

| Check | Result |
| ----- | ------ |
| `corpus_manifest validate` | **PASS** |
| `generate` → `/tmp/r4-03-registry.yaml` | **5** specimens; registry byte-identical між двома runs |
| `check-generated` | **PASS** |
| SHA-256 (89 artifacts, content @ new/legacy paths) | **89/89** vs [R4_BASELINE_ARTIFACTS.sha256](R4_BASELINE_ARTIFACTS.sha256) |
| `pytest corpus_manifest/tests` | **20/20** |
| Production `registry.yaml` | **не** створено |

**Rollback:** reverse `git mv` + видалити 5 `specimen.yaml`.

## R4-04 — L2 syntax + graph-set batch (2026-10-11)

**Status:** **COMPLETE** — commit **R4-04.1** `feat(corpus): migrate L2 syntax and graph mutation specimens` (після `7f30085`). Scope за [R3_EXECUTION_PLAN.md](R3_EXECUTION_PLAN.md) §R4-04.

### Scope (6 canonical IDs)

| canonical_id | alias | artifacts | module safety |
| ------------ | ----- | ----------- | ------------- |
| `gs.specimen.destructuring-flat` | SY-L2.1 | `.gs` + `.gschema` | **SAFE** — `example.syntax.pair`, move-only |
| `gs.specimen.int32-bounds` | SY-L2.2 | 1× `.gs` | **SAFE** — module-less |
| `gs.specimen.optional-get` | SY-L2.3 | 1× `.gs` | **SAFE** — module-less |
| `gs.specimen.graph-set-param` | SY-L3.1 | `.gs` + carrier | **SAFE** — `example.syntax.graph_set_param` |
| `gs.specimen.graph-set-block` | SY-L3.2 | `.gs` + carrier | **SAFE** — `example.syntax.graph_set_block` |
| `gs.specimen.graph-set-action` | SY-L3.3 | `.gs` + carrier | **SAFE** — `example.syntax.graph_set`; target `graph-set-action/` |

**Prerequisites:** `[]` (R3 §5.2). **Blockers:** немає.

### Source → target (summary)

- `02-composition/syntax/pair/*` → `language-features/destructuring/specimens/destructuring-flat/` (імена файлів збережені)
- `int32_bounds.gs` → `types-width/specimens/int32-bounds/int32-bounds.gs`
- `optional_get.gs` → `optional-null/specimens/optional-get/optional-get.gs`
- `graph_set_param/` → `graph-mutation/specimens/graph-set-param/`
- `graph_set_block/` → `graph-mutation/specimens/graph-set-block/`
- `graph_set/` → `graph-mutation/specimens/graph-set-action/`

### Verification

| Check | Result |
| ----- | ------ |
| `corpus_manifest validate` | **PASS** — **11** production `specimen.yaml` |
| `generate` / `check-generated` (`/tmp/r4-04-registry.yaml`) | **11** specimens; byte-identical double generate |
| SHA-256 | **89/89** content vs baseline |
| `pytest corpus_manifest/tests` | **20/20** |
| Production `registry.yaml` | **не** створено |

**Rollback:** reverse 10 `git mv` + видалити 6 `specimen.yaml`.

## R4-05 — L3/L4 advanced syntax (10 specimens)

**Status:** **COMPLETE** — commit **R4-05.1** `feat(corpus): migrate L3/L4 advanced syntax specimens` (`f939a4b`). Scope: решта **10** language-feature specimens з R3 §3.1 (`21 − 11` після R4-04.1). Усі artifacts були під `programs/03-advanced/syntax/` (13 files → 10 logical specimens).

### Canonical IDs (10)

| canonical_id | historical (syntax track) | source → target |
| ------------ | ------------------------- | --------------- |
| `gs.specimen.on-emit` | SY-L3.1 | `03-advanced/syntax/on_emit/` → `language-features/events/specimens/on-emit/` |
| `gs.specimen.graph-connect` | SY-L3.2 | `…/graph_connect/` → `graph-edges/specimens/graph-connect/` |
| `gs.specimen.fail-guard` | SY-L3.3 | `…/fail_guard/` → `control-abort/specimens/fail-guard/` |
| `gs.specimen.exists-if-present` | SY-L4.4 (§19.6.15.1) | `…/exists_if_present.gs` → `optional-null/specimens/exists-if-present/` |
| `gs.specimen.exists-if-guard` | SY-L4.4 (§19.6.15.2) | `…/exists_if_guard.gs` → `optional-null/specimens/exists-if-guard/` |
| `gs.specimen.null-narrowing` | SY-L4.4 (§19.6.15.3) | `…/null_narrowing.gs` → `optional-null/specimens/null-narrowing/` |
| `gs.specimen.let-block-pub` | SY-L4.1 | `…/let_block_pub.gs` → `bindings/specimens/let-block-pub/` |
| `gs.specimen.var-block-mut` | SY-L4.2 | `…/var_block_mut.gs` → `bindings/specimens/var-block-mut/` |
| `gs.specimen.nested-if-branch` | SY-L4.3 | `…/nested_if_branch.gs` → `control-flow/specimens/nested-if-branch/` |
| `gs.specimen.nested-if-optional` | SY-L4.5 | `…/nested_if_optional.gs` → `control-flow/specimens/nested-if-optional/` |

**Artifacts:** 13× `git mv` (R100): 7× single `.gs`, 3× `.gs` + `.gschema` pairs (`on_emit`, `graph_connect`, `fail_guard`). Імена файлів без змін (snake_case + carriers).

### Module / import safety

Усі **SAFE** per [R3_MODULE_SAFETY.md](R3_MODULE_SAFETY.md) §2 (move-only; `module` / `use` / relative paths не змінювались). Приклади: `example.syntax.on_emit`, `example.syntax.graph_connect`, `example.syntax.fail_guard`; решта — module-less flat `.gs`.

### Alias note (validator, не послаблення)

Три optional-null specimens ділять historical track id **SY-L4.4** (різні підрозділи §19.6.15.x). У `specimen.yaml` поле `aliases` для них **`[]`**; narrative збережено в `historical.syntax_track_id` + `historical.syntax_track_subsection`. Унікальність alias у registry — **0** `E_DUP_ALIAS`.

### Verification

| Check | Result |
| ----- | ------ |
| `corpus_manifest validate` | **PASS** — **21** production `specimen.yaml`, 21 unique canonical IDs |
| `generate` → `/tmp/r4-05-registry.yaml` | **21** specimens; fingerprint `bffd6ffd…`; byte-identical double generate |
| `check-generated` | **PASS** |
| SHA-256 (89 artifacts, legacy baseline paths → current paths) | **89/89** vs [R4_BASELINE_ARTIFACTS.sha256](R4_BASELINE_ARTIFACTS.sha256) |
| `pytest corpus_manifest/tests` | **20/20** |
| Production `registry.yaml` | **не** створено |
| Parser/runtime acceptance | **не** запускалось (SOURCE-LEVEL ACCEPTED ≠ RUNTIME VERIFIED) |

**Blockers:** немає.

**Rollback:** reverse 13 `git mv` + видалити 10 `specimen.yaml`.

**Readiness:** commit **R4-05.1** — **COMMITTED** (`f939a4bb64ff83cc2662fcb0aeb82611063465cb`).

## R4-06 — algorithms L1 (numbers, collections, strings)

**Status:** **COMPLETE** — commit **R4-06.1** `feat(corpus): migrate L1 classic algorithm specimens` (після `f939a4b`). Scope: усі **L1** рядки R3 §3.2 з `programs/01-classical/{numbers,collections,strings}/` (**34** specimens; plan «33» — reconciliation з §3.2).

### Scope summary

| Category | Count | canonical prefix |
| -------- | ----- | ---------------- |
| numbers | 13 | `gs.algo.numbers.*` |
| collections | 13 | `gs.algo.collections.*` |
| strings | 8 | `gs.algo.strings.*` |
| **Total** | **34** | — |

**Pattern:** `programs/01-classical/<cat>/<file>.gs` → `programs/algorithms/<cat>/specimens/<kebab-slug>/<file>.gs` (імена `.gs` без змін).

### Module / import safety

Усі **SAFE** per [R3_MODULE_SAFETY.md](R3_MODULE_SAFETY.md) §4 — single-file, без `module` / `use`; move-only.

### Manifests

34× `specimen.yaml` (`home.root: algorithms`, `historical.classic_level: L1`, `prerequisites: []`, `acceptance.runtime_verified: false`). Без syntax-track aliases (classic reference).

### Verification

| Check | Result |
| ----- | ------ |
| `corpus_manifest validate` | **PASS** — **55** production manifests (21 + 34) |
| `generate` / `check-generated` (`/tmp/r4-06-registry.yaml`) | **55** specimens; byte-identical double generate |
| SHA-256 | **89/89** vs baseline |
| `pytest corpus_manifest/tests` | **20/20** |
| Production `registry.yaml` | **не** створено |

**Blockers:** немає (лише note: R4-06 plan count «33» vs map **34** — scope за §3.2 + affected dirs).

**Rollback:** reverse 34 `git mv` + видалити 34 `specimen.yaml`.

**Readiness:** **R4-06.1** — **COMMITTED** (`bcc1945`).

## R4-07 — algorithms L2–L4 (12 specimens)

**Status:** **COMPLETE** (2026-10-11) — **не** committed (owner gate); HEAD **`bcc1945`**. Scope: R3 §3.2 rows **L2/L3/L4** — flat `.gs` у `02-composition/`, `03-advanced/`, `04-complex/` (не `syntax/`, не **R4-08** modular).

### Canonical IDs (12)

| Level | canonical_id | source → target category |
| ----- | ------------ | ------------------------ |
| L2 | `gs.algo.composition.merge-overlapping-intervals` | `02-composition/merge_overlapping_intervals.gs` → `algorithms/composition/specimens/merge-overlapping-intervals/` |
| L2 | `gs.algo.composition.mode-element-two-pass` | `…/mode_element_two_pass.gs` → `…/mode-element-two-pass/` |
| L2 | `gs.algo.composition.run-length-encode` | `…/run_length_encode.gs` → `…/run-length-encode/` |
| L2 | `gs.algo.composition.sieve-primes-to-limit` | `…/sieve_primes_to_limit.gs` → `…/sieve-primes-to-limit/` |
| L3 | `gs.algo.advanced.levenshtein` | `03-advanced/levenshtein.gs` → `algorithms/advanced/specimens/levenshtein/` |
| L3 | `gs.algo.advanced.mergesort-recursive` | `…/mergesort_recursive.gs` → `…/mergesort-recursive/` |
| L3 | `gs.algo.advanced.quicksort-partition` | `…/quicksort_partition.gs` → `…/quicksort-partition/` |
| L4 | `gs.algo.complex.bfs-shortest-path-flat` | `04-complex/bfs_shortest_path_flat.gs` → `algorithms/complex/specimens/bfs-shortest-path-flat/` |
| L4 | `gs.algo.complex.n-queens-backtrack` | `…/n_queens_backtrack.gs` → `…/n-queens-backtrack/` |
| L4 | `gs.algo.complex.parse-decimal-strict` | `…/parse_decimal_strict.gs` → `…/parse-decimal-strict/` |
| L4 | `gs.algo.complex.rle-roundtrip` | `…/rle_roundtrip.gs` → `…/rle-roundtrip/` |
| L4 | `gs.algo.complex.shunting-yard-eval` | `…/shunting_yard_eval.gs` → `…/shunting-yard-eval/` |

**Artifacts:** 12× `git mv` (R100); імена `.gs` без змін.

### Module / import safety

**SAFE** per [R3_MODULE_SAFETY.md](R3_MODULE_SAFETY.md) §4 — module-less single-file; move-only.

### Verification

| Check | Result |
| ----- | ------ |
| `corpus_manifest validate` | **PASS** — **67** production manifests |
| `generate` / `check-generated` (`/tmp/r4-07-registry.yaml`) | **67** specimens; byte-identical double generate |
| SHA-256 | **89/89** vs baseline |
| `pytest corpus_manifest/tests` | **20/20** |
| Production `registry.yaml` | **не** створено |

**Blockers:** немає.

**Rollback:** reverse 12 `git mv` + видалити 12 `specimen.yaml`.

**Readiness:** await owner for **R4-07.1** commit (no commit in slice).

## R4-08 — modular / L5 (6 projects)

**Status:** **COMPLETE** — **uncommitted**; див. [R4_08_MIGRATION_REPORT.md](R4_08_MIGRATION_REPORT.md). **6** projects, **15** artifacts → `programs/algorithms/modular-systems/…`.

## R4-09 — pipeline manifests (18 READY)

**Status:** **COMPLETE** — **uncommitted**; див. [R4_09_PIPELINE_REPORT.md](R4_09_PIPELINE_REPORT.md). **18**× `pipeline.yaml`; **2** pipelines **BLOCKED** (`syntax-track-l5-modules`, `syntax-negative-per-level`).

## R4-10 — documentation consistency

**Status:** **COMPLETE** — [R4_10_CONSISTENCY_REPORT.md](R4_10_CONSISTENCY_REPORT.md). **OQ-SY-2** лишається **OPEN**.

| Документ | Призначення |
| -------- | ----------- |
| [R3_MIGRATION_MAP.md](R3_MIGRATION_MAP.md) | Повний inventory + target mapping (canonical ID, шляхи, метадані) |
| [R3_PIPELINE_PLAN.md](R3_PIPELINE_PLAN.md) | План pipelines (посилання canonical ID, порядок, prerequisites) |
| [R3_MODULE_SAFETY.md](R3_MODULE_SAFETY.md) | Module/import ризики при move |
| [R3_EXECUTION_PLAN.md](R3_EXECUTION_PLAN.md) | Розбиття **R4** на implementation slices |
| [R4_BASELINE.md](R4_BASELINE.md) | **R4-00** baseline, SHA-256, safety gate |
| [R4_BASELINE_ARTIFACTS.sha256](R4_BASELINE_ARTIFACTS.sha256) | Pre-commit baseline (HEAD `d96f5ed`) |
| [R4_BASELINE_ARTIFACTS.post_r4_00_1.sha256](R4_BASELINE_ARTIFACTS.post_r4_00_1.sha256) | Post **R4-00.1** (`4d03e60`) — all artifacts **tracked** |
| [R4_08_MIGRATION_REPORT.md](R4_08_MIGRATION_REPORT.md) | **R4-08** modular slice (uncommitted) |
| [R4_09_PIPELINE_REPORT.md](R4_09_PIPELINE_REPORT.md) | **R4-09** pipeline manifests (uncommitted) |
| [R4_10_CONSISTENCY_REPORT.md](R4_10_CONSISTENCY_REPORT.md) | **R4-10** doc sweep |

**Цільова архітектура:** [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](../GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md)

### OQ-SY-2 (лишається OPEN)

**Derived engineering (R3, не закриває owner):** для target layout — L5 negatives під `algorithms/modular-systems/_negative/` (**L5-N1** parity); майбутні syntax negatives під `language-features/_negative/<canonical-id>/`. Per-level `programs/<level>/syntax/negative/` **не** затверджується автоматично (опція A в GAPS лишається recommendation only).
