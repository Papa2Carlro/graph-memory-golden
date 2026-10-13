# corpus_manifest — Golden Syntax Corpus (R4-02)

Мінімальний фундамент для **specimen.yaml**, **pipeline.yaml** та **generated registry.yaml** без production manifests у `programs/`.

**Language integration (canonical):** [GML_GOLDEN_INTEGRATION_CONTRACT.md](../../../graph-memory-language/Docs/Tooling/GML_GOLDEN_INTEGRATION_CONTRACT.md) — `graph-memory-language` consumes this package via a **Golden adapter** (`gml` / GML MCP shared operations). Golden does not depend on Language MCP.

**Negative coverage (GS-VAR-108-A1=B):** `kind: negative` specimens, `expected` metadata, and acceptance flags are **Golden-owned**. The Language grammar rule index does **not** define `negative_specimen_refs`; cross-linking is positive `golden_specimen_refs` only (see [GRAMMAR_RULE_INDEX_CONTRACT.md](../../../graph-memory-language/Docs/Language/GRAMMAR_RULE_INDEX_CONTRACT.md) §5.1).

**CI (GS-VAR-111):** Language repo workflow `.github/workflows/grammar-golden-validation.yml` clones Golden as a **sibling** of `graph-memory-language` (matches `uv` path `../graph-memory-golden/tools`). Override remote via GitHub variable `GOLDEN_REPOSITORY` if needed.

## Контракти схем

| Файл | Версія | Довідка |
| ---- | ------ | ------- |
| `specimen.yaml` | `specimen_schema_version: 1` | R2 §5, `schemas/specimen_schema_v1.json` |
| `pipeline.yaml` | `pipeline_schema_version: 1` | R2 §6, `schemas/pipeline_schema_v1.json` |
| `registry.yaml` | `registry_schema_version: 1` | R2 §7 (лише generated) |

**SoT:** локальні `specimen.yaml` / `pipeline.yaml`. **registry.yaml** не редагують вручну.

Обов’язкові поля specimen (v1): `specimen_schema_version`, `canonical_id`, `kind`, `home`, `artifacts`, `features`, `complexity`, `prerequisites`, `historical`, `acceptance`. Опційно: `aliases`, `expected` (для `kind: negative`).

## Install (package)

From `graph-memory-golden/tools`:

```bash
pip install -e .
# or: uv pip install -e .
```

Dependency: **PyYAML** (declared in `tools/pyproject.toml`).

## CLI

After install, from any directory (corpus root = `graph-memory-golden` repo root):

```bash
python -m corpus_manifest validate --corpus-root .
python -m corpus_manifest generate --corpus-root . --output /tmp/registry.yaml
python -m corpus_manifest check-generated --corpus-root . --registry /tmp/registry.yaml
```

| Команда | Опис |
| ------- | ---- |
| `validate` | Парсинг YAML, схема, унікальність ID/alias/home/artifacts, prerequisites, pipelines |
| `generate` | Детермінований registry з manifests (`--output` обов’язковий) |
| `check-generated` | Stale detection: fingerprint registry vs поточні manifests |

Прапорці:

- `--corpus-root` — корінь репозиторію з `programs/`
- `--json` — JSON на stdout
- `--skip-artifact-files` — не вимагати файлів artifacts на диску
- `--allow-production-output` — дозволити запис у `programs/language-features/_generated/registry.yaml` (після R4-03)

**R4-02:** запис у production `registry.yaml` **заблоковано** без `--allow-production-output`.

Exit code: `0` — OK, `1` — помилки валідації / stale registry, `2` — помилка аргументів.

## Діагностика

Коди (стабільне сортування `code`, `path`, `message`):

| Код | Сенс |
| --- | ---- |
| `E_YAML_*` | Парсинг / тип документа |
| `E_SCHEMA_VERSION` | Невірна версія схеми |
| `E_REQUIRED` / `E_TYPE` / `E_ENUM` | Поля та типи |
| `E_DUP_CANONICAL_ID` | Дубль `canonical_id` |
| `E_DUP_ALIAS` | Дубль alias |
| `E_ALIAS_ID_COLLISION` | Alias ↔ чужий `canonical_id` |
| `E_DUP_HOME` | Дубль `home.directory` |
| `E_DUP_ARTIFACT` | Дубль власності artifact |
| `E_ARTIFACT_PATH` | Файл artifact відсутній |
| `E_DANGLING_PREREQ` | Невідомий prerequisite |
| `E_PREREQ_CYCLE` | Цикл prerequisites |
| `E_DANGLING_PIPELINE_MEMBER` | Член pipeline без specimen |
| `E_DUP_PIPELINE_ID` | Дубль `pipeline_id` |

Порожній corpus (немає manifests) — **не** помилка.

## Життєвий цикл registry

1. Автори додають / оновлюють `specimen.yaml` (майбутні R4 move-slices).
2. `validate` на `--corpus-root`.
3. `generate --output …` → `registry.yaml` (індекси `aliases`, `features`, посилання на manifests).
4. CI / локально: `check-generated` проти закоміченого registry (після R4-03+).

Canonical registry YAML **не** містить `generated_at` (детермінізм byte-for-byte). `check-generated` порівнює повний YAML з `render_registry_yaml()`.

## Тести

```bash
cd tools && pip install -e . && python -m pytest corpus_manifest/tests -q
```

Fixtures лише під `corpus_manifest/tests/` (тимчасові каталоги через `tmp_path`).

## Межі R4-02 (tooling) vs R4 execution

- **R4-02 slice:** не створювало production manifests у `programs/`.
- **Після R4-03…09 (working tree):** `specimen.yaml` / `pipeline.yaml` під `programs/` — валідуються `validate`; **registry.yaml** лише через `generate --output` (production path потребує `--allow-production-output`).
- Немає runner / strict execution.
- Historical `acceptance` лише валідується, **не** змінюється tooling.

Залежність: `PyYAML` (`requirements.txt`).
