# R4-00 — Migration Baseline & Safety Gate

**Status:** **BASELINE RECORDED** (без commit, без on-disk move)
**Slice:** **GS-EXAMPLE-CORPUS-REORG-R4-00-BASELINE**
**Git:** `master` @ `d96f5ed2478cc855f3b61dce58f5bff5d85744d0`
**Дата фіксації:** 2026-10-11 (UTC+3)

**Canonical plans:** [R3_MIGRATION_MAP.md](R3_MIGRATION_MAP.md), [R3_EXECUTION_PLAN.md](R3_EXECUTION_PLAN.md)

---

## 1. Git state (inventory)

| Поле | Значення |
| ---- | -------- |
| **Repository** | `graph-memory-example` (власний `.git`) |
| **Branch** | `master` |
| **HEAD** | `d96f5ed2478cc855f3b61dce58f5bff5d85744d0` |
| **Staged** | *(немає)* |
| **`.gitignore`** | мінімальний; corpus artifacts **не** ignored |

**Примітка (parent workspace):** у кореневому `graph-memory` каталог `graph-memory-example/` може відображатися як `??` — це **окремий** git root; baseline R4-00 стосується **лише** `graph-memory-example`.

### 1.1 Modified (tracked, unstaged)

| File |
| ---- |
| `Docs/EXAMPLE_CORPUS_ORGANIZATION.md` |
| `Docs/corpus/CHARTER.md` |
| `Docs/corpus/DECISIONS.md` |
| `Docs/corpus/GAPS.md` |
| `Docs/corpus/SYNTAX_TRACK.md` |

### 1.2 Untracked

| File / tree |
| ----------- |
| `Docs/corpus/GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md` |
| `Docs/corpus/L3_ADVANCED_SYNTAX.md` |
| `Docs/corpus/migration/README.md` |
| `Docs/corpus/migration/R3_*.md` (4 файли) |
| `Docs/corpus/migration/R4_BASELINE.md` *(цей slice)* |
| `Docs/corpus/migration/R4_BASELINE_ARTIFACTS.sha256` *(цей slice)* |
| `programs/03-advanced/syntax/**` — **13** artifact files у **10** module directories |

---

## 2. Baseline integrity vs R3

| Перевірка | Очікування R3 | Факт (2026-10-11) | Результат |
| --------- | ------------- | ----------------- | --------- |
| Logical specimens | 72 | 72 (map не змінювався) | **OK** |
| Artifact files | 89 | 89 (`find programs/`) | **OK** |
| Target mappings | 72 | 72 ([R3_MIGRATION_MAP.md](R3_MIGRATION_MAP.md)) | **OK** |
| Canonical ID collisions | 0 | 0 | **OK** |
| Target path collisions | 0 | 0 | **OK** |
| Module/import blockers | 0 | 0 ([R3_MODULE_SAFETY.md](R3_MODULE_SAFETY.md)) | **OK** |

**Aggregate checksum (усі 89 файлів, sorted paths, SHA-256 per file then hash of manifest):**

`16d265a258a008f7766c7a1289a9274f71e9398b90ed3d042ee1845af6f359cc`

**Повний per-artifact baseline:** [R4_BASELINE_ARTIFACTS.sha256](R4_BASELINE_ARTIFACTS.sha256)  
Формат рядка: `<sha256>  <bytes>  <tracked|untracked>  <path>`

| Статус git (artifacts) | Кількість |
| ---------------------- | --------- |
| tracked | **76** |
| untracked | **13** |

---

## 3. WIP classification

### A — R2/R3 architecture + migration planning

| Files | Для migration baseline? | Безпечно в baseline commit? |
| ----- | ------------------------ | ---------------------------- |
| `Docs/corpus/GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md` | Так (цільова архітектура) | Так — **окремий** commit від golden source |
| `Docs/corpus/migration/README.md`, `R3_*.md` | Так | Так — разом з A |
| Частини змін у `DECISIONS.md`, `GAPS.md`, `EXAMPLE_CORPUS_ORGANIZATION.md`, `CHARTER.md` (**GS-REORG-R2/R3**) | Так | Так — після або разом з A; **не** змішувати з SYNTAX_TRACK landing hunks без review |

**Acceptance:** документаційний; не змінює runtime verification.

### B — Historical corpus documentation WIP

| Files | Для migration baseline? | Безпечно в baseline commit? |
| ----- | ------------------------ | ---------------------------- |
| `Docs/corpus/SYNTAX_TRACK.md` (modified, +204 рядків) | Частково — фіксує **SY-L*** specs/status | Так, але **логічно після** commit групи C (on-disk paths) |
| `Docs/corpus/DECISIONS.md`, `GAPS.md`, `CHARTER.md`, `EXAMPLE_CORPUS_ORGANIZATION.md` — зміни поза REORG | Можливо (OQ-SY-L4.*, L3 pointers) | Розділити hunks: REORG → A; Syntax Track registry → B |

**Acceptance:** не підвищує RUNTIME VERIFIED; зберігає SOURCE-LEVEL labels.

### C — Untracked L3 Advanced + SY-L4 on-disk golden (03-advanced/syntax)

| Facts | |
| ----- | |
| **Directories** | **10** (не 11): `exists_if_guard`, `exists_if_present`, `fail_guard`, `graph_connect`, `let_block_pub`, `nested_if_branch`, `nested_if_optional`, `null_narrowing`, `on_emit`, `var_block_mut` |
| **Artifacts** | **13** files (3× `.gs`+`.gschema`; 7× лише `.gs`) |
| **Документація** | `Docs/corpus/L3_ADVANCED_SYNTAX.md` (untracked) |

| Для migration baseline? | **Так — обов’язково** до R4-03+ move |
| Безпечно в commit? | **Так** — окремий commit «golden source» |
| Acceptance | L3-ADV: LANDED, SOURCE-LEVEL ACCEPTED, **RUNTIME NOT VERIFIED** ([L3_ADVANCED_SYNTAX.md](../L3_ADVANCED_SYNTAX.md)); SY-L4.1–4.4: з [SYNTAX_TRACK.md](../SYNTAX_TRACK.md) — ті самі labels |

**Відповідність R3 map:** усі 10 dirs покривають `gs.specimen.*` у [R3_MIGRATION_MAP.md §3.1](R3_MIGRATION_MAP.md#31-language-features--golden-syntax-21).

### D — Інше / unrelated

| Item | Примітка |
| ---- | -------- |
| *(немає в `graph-memory-example`)* | Немає змін `.gs` поза `03-advanced/syntax/`; немає scripts з hardcoded `programs/0N-*` |

---

## 4. Untracked `03-advanced/syntax` — деталі

| Directory | Artifacts | Historical IDs | module | imports |
| --------- | --------- | -------------- | ------ | ------- |
| `let_block_pub/` | `let_block_pub.gs` | L3-ADV-SY-01 | `example.syntax.let_block_pub` | — |
| `var_block_mut/` | `var_block_mut.gs` | L3-ADV-SY-02 | `example.syntax.var_block_mut` | — |
| `nested_if_branch/` | `nested_if_branch.gs` | L3-ADV-SY-03 | `example.syntax.nested_if_branch` | — |
| `nested_if_optional/` | `nested_if_optional.gs` | L3-ADV-SY-04 | `example.syntax.nested_if_optional` | — |
| `on_emit/` | `.gs` + carrier | SY-L4.1 | `example.syntax.on_emit` | — |
| `graph_connect/` | `.gs` + carrier | SY-L4.2 | `example.syntax.graph_connect` | — |
| `fail_guard/` | `.gs` + carrier | SY-L4.3 | `example.syntax.fail_guard` | — |
| `exists_if_present/` | `.gs` | SY-L4.4 §19.6.15.1 | `example.syntax.exists_if_present` | — |
| `exists_if_guard/` | `.gs` | SY-L4.4 §19.6.15.2 | `example.syntax.exists_if_guard` | — |
| `null_narrowing/` | `.gs` | SY-L4.4 §19.6.15.3 | `example.syntax.null_narrowing` | — |

**Джерела не змінювались** у R4-00. **Runtime verification не заявлялась.**

### 4.1 Пропозиція Git baseline (specimens)

**Рекомендація:** включити **усі 13** untracked artifact files + `Docs/corpus/L3_ADVANCED_SYNTAX.md` у **перший** commit перед REORG docs, щоб `master` відобжав on-disk truth для SY-L4.* та L3-ADV перед будь-яким `git mv` у R4-03+.

---

## 5. Baseline commit policy (не виконувати автоматично)

### 5.1 Не включати в migration baseline commit

- Файли поза списками A/B/C без owner review
- Будь-які зміни вмісту `.gs`/`.gschema` «під час baseline»
- `R4_BASELINE_ARTIFACTS.sha256` у тому ж commit, що й **переміщення** specimens (фіксувати **після** R4-00 slice doc, **перед** R4-03 — окремий малий commit або разом з A)

### 5.2 Рекомендований порядок (3 commits)

| # | Scope | Paths (приклад) | Message (пропозиція) |
| - | ----- | ----------------- | --------------------- |
| **1** | **C** — golden on disk | `programs/03-advanced/syntax/**`, `Docs/corpus/L3_ADVANCED_SYNTAX.md`, релевантні оновлення `SYNTAX_TRACK.md` для §19.6.12–15 | `golden(gs): add 03-advanced syntax specimens (SY-L4, L3-ADV)` |
| **2** | **A** — R2/R3 | `GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md`, `Docs/corpus/migration/*`, REORG hunks у `DECISIONS`, `GAPS`, `CHARTER`, `EXAMPLE_CORPUS_ORGANIZATION` | `docs(corpus): R2 architecture and R3 migration plan` |
| **3** | **B** — залишок doc WIP | Інші зміни `SYNTAX_TRACK`, `DECISIONS`, … якщо не ввійшли в 1–2 | `docs(corpus): syntax track registry updates` *(лише якщо залишились hunks)* |

**Альтернатива:** commit **1** + **2**; commit **3** відкласти, якщо `SYNTAX_TRACK` diff повністю стосується тих самих specimens (об’єднати 1 і 3).

### 5.3 Verification перед commit (owner/agent)

```bash
cd graph-memory-example
test "$(find programs -type f \( -name '*.gs' -o -name '*.gschema' \) | wc -l)" = 89
shasum -a 256 -c Docs/corpus/migration/R4_BASELINE_ARTIFACTS.sha256  # після оновлення manifest якщо змінились лише doc
git status   # жодних випадкових paths
```

Після commit **1**: повторно згенерувати `R4_BASELINE_ARTIFACTS.sha256` (untracked → tracked) **перед** R4-03.

### 5.4 Owner question

**Не потрібне** для R4-00: порядок 3 commits — derived engineering; об’єднання 1+3 допустиме, якщо diff review показує єдиний зміст.

---

## 6. Safety gate → R4-01

| Критерій | Статус |
| -------- | ------ |
| Inventory повний | **PASS** (89 artifacts) |
| Усі 89 знайдені on-disk | **PASS** |
| SHA-256 baseline зафіксовано | **PASS** ([R4_BASELINE_ARTIFACTS.sha256](R4_BASELINE_ARTIFACTS.sha256)) |
| 72 mappings (R3) | **PASS** |
| WIP класифіковано | **PASS** (§3) |
| Untracked L3 Advanced враховано | **PASS** (10 dirs / 13 files; розбіжність «11 modules» → фактично **10**) |
| Commit scope визначено | **PASS** (§5) |
| Невідомі втрати | **PASS** — немає ignored corpus artifacts |

### 6.1 Результат gate

**R4-01 readiness: PASS** за умови, що owner виконає **commit 1** (specimens) **до** фізичного scaffolding/move — інакше `git mv` ризикує втратити untracked files при cleanup.

**R4-00 slice status: PASS** (baseline задокументовано; commit **не** створений згідно обмежень slice).

---

## 7. Discrepancies (зафіксовано)

| ID | Опис |
| -- | ---- |
| **BL-D1** | Нарратив «11 untracked L3 Advanced modules» vs **10** directories on-disk |
| **BL-D2** | [GAPS.md §8.6](../GAPS.md) L3-ADV NOT LANDED vs [L3_ADVANCED_SYNTAX.md](../L3_ADVANCED_SYNTAX.md) — documentation drift (не змінювати acceptance у R4-00) |
| **BL-D3** | Untracked corpus **не** на `master` — baseline SHA на working tree, не на HEAD |

---

## 8. Наступний крок

1. Owner: commits за §5 (мінімум **#1**).
2. Оновити `R4_BASELINE_ARTIFACTS.sha256` після commit #1 (tracked bits).
3. **R4-01** — empty target tree scaffolding ([R3_EXECUTION_PLAN.md](R3_EXECUTION_PLAN.md)).

**Заборонено в R4-00:** move specimens, зміни source, commit, push, R4-01.

---

## 9. R4-00.1 — golden specimens baseline commit (2026-10-11)

| Поле | Значення |
| ---- | -------- |
| **Previous HEAD** | `d96f5ed2478cc855f3b61dce58f5bff5d85744d0` |
| **New HEAD** | `4d03e609f8a6880e777582f0422be87ea21ed545` |
| **Message** | `golden(gs): add 03-advanced syntax specimens (SY-L4, L3-ADV)` |
| **SHA-256 content** | Усі **89** artifacts збігаються з [R4_BASELINE_ARTIFACTS.sha256](R4_BASELINE_ARTIFACTS.sha256) (лише `tracked` → `tracked` для колишніх 13) |
| **Post-commit manifest** | [R4_BASELINE_ARTIFACTS.post_r4_00_1.sha256](R4_BASELINE_ARTIFACTS.post_r4_00_1.sha256) — **не** замінює pre-commit baseline |

**SYNTAX_TRACK у R4-00.1:** scoped diff (§19.6.12–§19.6.15, L3-ADV pointer, **14/18**); **без** §19.6.11 і **без** R2 pointer — відновлено в **R4-00.2** (окремий commit).

### 9.1 R4-00.2 — documentation baseline (planned in slice)

Другий documentation commit: architecture + migration docs + **SYNTAX_TRACK** recovery (**15/18**, §19.6.11, R2 pointer, fix §19.3 Runtime row).

---

## 10. R4-03 inventory reconciliation (correction note)

**§2 вище** фіксує gate **R4-00** (очікування **72** logical specimens за тодішнім §1 map). Після звірки таблиць **R4-03** canonical inventory: **73** logical (**21** + **46** classic algo + **6** modular), **89** artifacts — без зміни вмісту файлів.

- [R3_MIGRATION_MAP.md](R3_MIGRATION_MAP.md) §1 оновлено; immutable [R4_BASELINE_ARTIFACTS.sha256](R4_BASELINE_ARTIFACTS.sha256) **не** переписується (шляхи в manifest — historical; content hash перевіряється з target/legacy mapping після move).
