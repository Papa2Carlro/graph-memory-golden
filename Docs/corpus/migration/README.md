# Golden Syntax Corpus — міграція (R3 planning)

**Status:** **R4 IN PROGRESS** — target scaffolding у Git (README + `_generated/.gitkeep`); порожні каталоги on-disk **ephemeral**; specimens **не** перенесені
**Slice:** **GS-EXAMPLE-CORPUS-REORG-R3-MIGRATION-PLAN**

## R4-01 — target scaffolding (2026-10-11)

**Status:** **COMPLETE** — commit **R4-01.1** `chore(corpus): scaffold feature-first target layout` (після `35dca9e`).

| Створено | Деталі |
| -------- | ------ |
| `programs/language-features/` | 10 feature categories × `specimens/`; `pipelines/` (9 IDs); `_generated/`; `_negative/` |
| `programs/algorithms/` | 7 subject categories × `specimens/`; `modular-systems/_negative/`; `pipelines/` (9 IDs) |
| README | `programs/language-features/README.md`, `programs/algorithms/README.md` |
| `.gitkeep` | лише `language-features/_generated/.gitkeep` |

**Не створено:** 72 specimen leaf dirs; production `specimen.yaml` / `pipeline.yaml` / `registry.yaml`; placeholder `.gs`.

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
