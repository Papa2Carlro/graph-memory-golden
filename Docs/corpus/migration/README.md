# Golden Syntax Corpus — міграція (R3 planning)

**Status:** **R4 IN PROGRESS** — golden syntax **11/21** на target (L1 + L2/graph-set batch committed у **R4-04.1**)
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

| Документ | Призначення |
| -------- | ----------- |
| [R3_MIGRATION_MAP.md](R3_MIGRATION_MAP.md) | Повний inventory + target mapping (canonical ID, шляхи, метадані) |
| [R3_PIPELINE_PLAN.md](R3_PIPELINE_PLAN.md) | План pipelines (посилання canonical ID, порядок, prerequisites) |
| [R3_MODULE_SAFETY.md](R3_MODULE_SAFETY.md) | Module/import ризики при move |
| [R3_EXECUTION_PLAN.md](R3_EXECUTION_PLAN.md) | Розбиття **R4** на implementation slices |
| [R4_BASELINE.md](R4_BASELINE.md) | **R4-00** baseline, SHA-256, safety gate |
| [R4_BASELINE_ARTIFACTS.sha256](R4_BASELINE_ARTIFACTS.sha256) | Pre-commit baseline (HEAD `d96f5ed`) |
| [R4_BASELINE_ARTIFACTS.post_r4_00_1.sha256](R4_BASELINE_ARTIFACTS.post_r4_00_1.sha256) | Post **R4-00.1** (`4d03e60`) — all artifacts **tracked** |

**Цільова архітектура:** [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](../GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md)

### OQ-SY-2 (лишається OPEN)

**Derived engineering (R3, не закриває owner):** для target layout — L5 negatives під `algorithms/modular-systems/_negative/` (**L5-N1** parity); майбутні syntax negatives під `language-features/_negative/<canonical-id>/`. Per-level `programs/<level>/syntax/negative/` **не** затверджується автоматично (опція A в GAPS лишається recommendation only).
