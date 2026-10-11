# language-features — цільовий корінь (scaffolding)

**Status:** **SCAFFOLDING** (R4-01) — **без** on-disk golden specimens; **без** `specimen.yaml` / `pipeline.yaml` / `registry.yaml`.

**Canonical map:** [Docs/corpus/migration/R3_MIGRATION_MAP.md](../../Docs/corpus/migration/R3_MIGRATION_MAP.md) §3.1  
**Architecture:** [Docs/corpus/GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](../../Docs/corpus/GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md) §4.2

Поточні golden syntax залишаються під `programs/0N-*/` до фізичних R4 move-slices.

## Категорії (`<category>/specimens/`)

`bindings`, `comparisons`, `control-flow`, `destructuring`, `types-width`, `optional-null`, `graph-mutation`, `events`, `graph-edges`, `control-abort`

## Інше

| Шлях | Призначення |
| ---- | ----------- |
| `pipelines/<pipeline-id>/` | Майбутні `pipeline.yaml` ([R3_PIPELINE_PLAN.md](../../Docs/corpus/migration/R3_PIPELINE_PLAN.md) §1–2) |
| `_generated/` | Generated `registry.yaml` (**A5**) |
| `_negative/` | Майбутні syntax negatives (**OQ-SY-2** OPEN — derived engineering only) |
