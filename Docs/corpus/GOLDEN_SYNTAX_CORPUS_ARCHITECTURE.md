# Golden Syntax Corpus — цільова архітектура (R2)

**Status:** **CANONICAL** (Example repository — цільова організація корпусу; **не** мова GS; **не** виконана міграція)
**Slice:** **GS-EXAMPLE-CORPUS-REORG-R2-ARCHITECTURE-FINALIZATION**
**Owner decisions:** [DECISIONS.md §2.5](DECISIONS.md#25-reorg-r2--golden-syntax-corpus-owner-decisions-gs-reorg-r2-a1a9)
**Derived engineering:** [DECISIONS.md §2.6](DECISIONS.md#26-reorg-r2--derived-engineering-decisions)
**Поточний on-disk layout (до R3):** [POLICY.md](POLICY.md) §1–§2
**Міграційний план:** **R3 COMPLETE** — [migration/README.md](migration/README.md). **R4** — physical execution ([R3_EXECUTION_PLAN.md](migration/R3_EXECUTION_PLAN.md)).
**Історичні реєстри (не скасовуються):** [SYNTAX_TRACK.md](SYNTAX_TRACK.md), [L3_ADVANCED_SYNTAX.md](L3_ADVANCED_SYNTAX.md), [CLASSIC_LEVELS.md](CLASSIC_LEVELS.md)

---

## 1. Мета та межі

Цей документ фіксує **затверджену** цільову архітектуру Golden Syntax Corpus після **R2**. Він **не** переміщує файли, **не** змінює `.gs` / `.gschema` / `.gq` / `.gi`, **не** запускає runner і **не** генерує production manifests.

**Два незалежні напрями корпусу (GS-REORG-R2-A1=B):**

```text
programs/
├── language-features/     # Golden Syntax / мовні механізми (pipelines)
└── algorithms/            # алгоритмічні еталони (предметні категорії)
```

Класичні шляхи `programs/01-classical/` … `05-modular/` залишаються **чинними до R3**; їхні історичні рівні та acceptance **не переписуються** цим документом.

---

## 2. Owner decisions (A1–A9) — зведення

| ID | Option | Зміст |
| -- | ------ | ----- |
| **GS-REORG-R2-A1** | **B** | Два корені: `language-features/` + `algorithms/` |
| **GS-REORG-R2-A2** | **C** | Стабільні імена директорій specimens; порядок у **pipeline.yaml**; **без** числових префіксів у назвах директорій |
| **GS-REORG-R2-A3** | **A** | Один specimen = одне фізичне місце; кілька pipelines → ті самі canonical ID; **заборона** фізичного дублювання |
| **GS-REORG-R2-A4** | **B** | Стабільний **canonical ID**; історичні ID — **aliases**; ID **не** залежить від шляху |
| **GS-REORG-R2-A5** | **C** | Локальний **specimen.yaml** = SoT ідентичності; **registry.yaml** лише **generated** |
| **GS-REORG-R2-A6** | **C** | Алгоритми — за **предметними категоріями**; додатково **тематичні pipelines** (cross-category посилання) |
| **GS-REORG-R2-A7** | **C** | Метадані: **complexity**, **features**, **prerequisites** (+ окремо **historical**) |
| **GS-REORG-R2-A8** | **C** | Runner modes: **strict** (auto prerequisites, BLOCKED) vs **direct** (без auto prerequisites) |
| **GS-REORG-R2-A9** | **C** | Dependency ordering: транзитивні prerequisites, DAG, стабільне топосортування, один запуск на ID, цикли = помилка конфігурації |

---

## 3. Похідні інженерні рішення (не owner approval)

| Тема | Рішення |
| ---- | ------- |
| **Failure policy** | **continue-independent** (default); **fail-fast** (optional на рівні запуску) |
| **Execution statuses** | `PASSED`, `FAILED`, `BLOCKED`, `NOT RUN` |
| **Identity** | canonical ID глобально унікальний; aliases унікальні; alias ≠ canonical іншого specimen; move не змінює ID |
| **Pipeline** | references лише canonical ID; cross-pipeline OK; фізичне дублювання заборонене |
| **Registry** | generated; ручне редагування заборонене; stale registry виявляє validator (R3+) |
| **Validation** | schema, ID/alias uniqueness, unresolved refs, missing prerequisites, cycles, missing files, invalid pipelines |

---

## 4. Контракт директорій

### 4.1 Загальні правила

- Кожен **Golden Specimen** (language-features) має **власну директорію**, навіть якщо зараз один `.gs` файл.
- **Без** числових префіксів у назвах директорій (**A2**); slug — стабільний, kebab-case або snake_case (один стиль на корпус — **DERIVED:** kebab-case для директорій, узгоджено з поточними `let_block_pub`, `graph_set_param`).
- **Один** фізичний каталог на canonical ID (**A3**).
- **Module declarations** (`module example.syntax.<slug>`) **не** змінюються автоматично при move (**L5-A1=B**; **SY-STR-A1** legacy slug rule). R3 зріз має явно визначити, чи зберігається logical module vs directory slug.

### 4.2 `language-features/`

```text
language-features/
├── <feature-category>/           # стабільна категорія (напр. bindings, control-flow, optional-null)
│   └── specimens/
│       └── <specimen-dir>/       # стабільний slug (≠ числовий префікс)
│           ├── specimen.yaml     # SoT (обов'язково після R3)
│           ├── <primary>.gs
│           ├── *.gschema | *.gq | *.gi   # за потреби
│           └── README.md         # optional, не SoT
├── pipelines/
│   └── <pipeline-id>/
│       └── pipeline.yaml         # порядок + prerequisites (не фізичний шлях)
└── _generated/
    └── registry.yaml             # GENERATED — не редагувати
```

**Тематичні pipelines** (`pipelines/<id>/pipeline.yaml`) можуть посилатися на specimens з **різних** `<feature-category>` (**A6** + cross-pipeline).

**Cross-feature specimens:** фіксуються в `specimen.yaml` → `features: [primary, …]`; фізично лежать у **одній** primary category directory (DERIVED: категорія = перший primary feature або окреме поле `home_category`).

### 4.3 `algorithms/`

```text
algorithms/
├── <subject-category>/         # напр. collections, strings, graphs-modular
│   └── <algorithm-slug>/
│       ├── specimen.yaml         # optional для чистих classic algo до R3+; рекомендовано після R3
│       └── *.gs
```

Алгоритмічні програми **не** підміняють Syntax Track ID; при наявності golden syntax зв’язку — `specimen.yaml` → `historical.aliases` / `related_syntax_ids`.

### 4.4 Multi-file specimens

- Усі артефакти одного logical specimen **в одній** директорії (**A3**).
- `.gs` + `.gschema` з **unified module** (чинне **L3-A1**, **OQ-SY-3**) — переносяться **разом**.
- Майбутні `.gq` / `.gi` — ті самі directory + `specimen.yaml` → `artifacts:`.

### 4.5 Negative / warning specimens

- Класифікація в `specimen.yaml` → `kind: positive | negative | warning`.
- **Positive** golden syntax — під `language-features/.../specimens/`.
- **Negative** (compile-time / diagnostic) — DERIVED шлях до R3 уточнення: `language-features/_negative/<canonical-id>/` або `algorithms/_negative/<project>/` для L5-стилю; **зберегти** семантику **L5-N1**, **L5-N2**.
- Negative **не** позначаються як LANDED positive; expected outcome у manifest (`expected: compile_error` тощо).

---

## 5. Контракт `specimen.yaml` (SoT)

**Schema version:** `specimen_schema_version: 1` (ціле; bump лише з явною міграцією схеми).

### 5.1 Обов'язкові поля (language-features golden)

| Поле | Тип | Опис |
| ---- | --- | ---- |
| `specimen_schema_version` | int | Версія схеми |
| `canonical_id` | string | Стабільний ID (див. §5.3) |
| `kind` | enum | `positive` \| `negative` \| `warning` |
| `home` | object | `root: language-features`, `category`, `directory` (відносно `programs/`) |
| `artifacts` | list | `{ role, path, language }` — напр. `primary.gs` / `carrier.gschema` |
| `features` | object | `primary`, `secondary[]` — таксономія механізмів (**A7**) |
| `complexity` | object | Нормативні осі складності (**A7**) — див. §5.5 |
| `prerequisites` | list | canonical ID (**A9**) |
| `historical` | object | Збереження legacy (**§6**) |

### 5.2 Опційні поля

| Поле | Опис |
| ---- | ---- |
| `aliases` | Історичні ID (**A4**) |
| `module` | Logical `module …` як у `.gs` (не виводити лише з шляху) |
| `entrypoints` | `sample`, `verify` імена функцій |
| `acceptance` | `source_level`, `runtime_verified` — **не вигадувати**; копія з історичного реєстру |
| `expected` | Для negative: `compile_error`, `warning`, … |
| `pipelines` | Підказка membership; **authoritative order** — у `pipeline.yaml` |

### 5.3 Формат canonical ID

**DERIVED (R2):** `gs.specimen.<slug>` де `<slug>` — стабільний ASCII slug (напр. `let-vs-var`, `graph-set-param`).

- **Унікальність** глобальна.
- **Aliases:** `SY-L1.1`, `L3-ADV-SY-01`, … — список рядків; жоден alias не збігається з canonical ID іншого specimen.

### 5.4 Physical path resolution

1. Базовий корінь: `programs/`.
2. `home.directory` — повний відносний шлях (напр. `language-features/bindings/specimens/let-vs-var`).
3. Validator перевіряє існування `artifacts[].path` відносно директорії specimen.
4. **Move** оновлює лише `home` у `specimen.yaml`; **canonical_id** не змінюється.

### 5.5 Таксономії (**A7**)

**complexity** (illustrative axes, не classic L1–L5):

```yaml
complexity:
  syntax_depth: S0 | S1 | S2    # legacy SY-A2 metadata
  control_flow: none | branch | nested | graph-action
  files: single | multi
```

**features** (приклади категорій): `bindings`, `comparisons`, `control-flow`, `optional-null`, `graph-mutation`, `events`, `modules-imports`, …

**prerequisites:** список `canonical_id`; порожній = немає.

### 5.6 Illustrative example (не production data)

```yaml
# ILLUSTRATIVE ONLY — не імпортувати як факт acceptance
specimen_schema_version: 1
canonical_id: gs.specimen.let-vs-var
kind: positive
aliases:
  - SY-L1.1
home:
  root: language-features
  category: bindings
  directory: language-features/bindings/specimens/let-vs-var
module: null
artifacts:
  - { role: primary, path: let-vs-var.gs, language: gs }
features:
  primary: let-var
  secondary: [reassignment-narrative]
complexity:
  syntax_depth: S0
  control_flow: none
  files: single
prerequisites: []
entrypoints:
  sample: let_vs_var_sample
  verify: let_vs_var_verify
historical:
  syntax_track_id: SY-L1.1
  classic_level_path: programs/01-classical/syntax/let_vs_var.gs
acceptance:
  landed: true
  source_level_accepted: true
  runtime_verified: false
```

---

## 6. Контракт `pipeline.yaml`

**Schema:** `pipeline_schema_version: 1`

| Поле | Обов'язковість | Опис |
| ---- | -------------- | ---- |
| `pipeline_id` | required | Стабільний ID (напр. `bindings-core`) |
| `title` | required | Людська назва |
| `members` | required | Впорядкований список `canonical_id` (**A2** — порядок тут, не в імені папки) |
| `prerequisites_policy` | optional | override для pipeline (default inherit specimen) |
| `description` | optional | |

**Cross-pipeline:** pipeline лише посилається ID; specimen фізично один (**A3**).

### 6.1 Illustrative `pipeline.yaml`

```yaml
# ILLUSTRATIVE ONLY
pipeline_schema_version: 1
pipeline_id: bindings-and-control-intro
title: Bindings then flat control flow
members:
  - gs.specimen.let-vs-var
  - gs.specimen.equality-operators
  - gs.specimen.if-elif-else
```

---

## 7. Контракт `registry.yaml` (generated)

**Schema:** `registry_schema_version: 1`

| Поле | Опис |
| ---- | ---- |
| `generated_at` | ISO timestamp |
| `generator` | ім’я/версія tool (R3+) |
| `specimens` | map canonical_id → snapshot полів з specimen.yaml |
| `pipelines` | map pipeline_id → members + resolved paths |
| `indexes` | alias → canonical_id; feature → [ids] |

**Інваріанти:**

- Файл під `language-features/_generated/registry.yaml` (**A5**).
- **Заборонено** ручне редагування.
- Validator порівнює hash / mtime / вміст з локальними manifests (**stale detection**).

---

## 8. Runner semantics (**A8**, **A9**)

### 8.1 Режими

| Mode | Prerequisites | Поведінка |
| ---- | ------------- | --------- |
| **strict** | Транзитивно розгортаються | Залежний specimen → **BLOCKED**, якщо prerequisite **FAILED** |
| **direct** | Не виконуються auto | Лише вибраний ID; пропущені перевірки **не** PASSED |

### 8.2 Ordering (**A9**)

1. Зібрати транзитивне замикання `prerequisites` для множини запуску.
2. Побудувати DAG (ребра: prereq → dependent).
3. Топологічне сортування з **tie-break**: зберегти порядок з `pipeline.yaml`, потім lexicographic `canonical_id`.
4. Кожен `canonical_id` — **щонайбільше один** запуск за сесію.
5. Цикл → **помилка конфігурації** (validator / planner).

### 8.3 Failure policy (derived)

- **continue-independent** (default): падіння одного specimen не зупиняє незалежні в тій же сесії.
- **fail-fast**: перший **FAILED** зупиняє решту (окрім уже завершених).

---

## 9. Історична сумісність

### 9.1 Що зберігається без зміни смислу

| Артефакт | Правило |
| -------- | ------- |
| **SY-L*** | Залишаються **aliases**; **15/18 LANDED** у [SYNTAX_TRACK.md](SYNTAX_TRACK.md) не перераховується R2 |
| **L3-ADV-SY-*** | Окремий підтрек; aliases; acceptance з [L3_ADVANCED_SYNTAX.md](L3_ADVANCED_SYNTAX.md) |
| **Classic L1–L5** | `historical.classic_level_path` у manifest після R3 |
| **LANDED / NOT LANDED** | Не підвищувати статус при move |
| **SOURCE-LEVEL ACCEPTED** | ≠ **RUNTIME NOT VERIFIED** |
| **Negative** L5 | `programs/05-modular/negative/` до міграції algorithms/modular |

### 9.2 Перенесення посилань (R3)

- Документи з hardcoded `programs/…` оновлюються **після** path map у R3.
- **Canonical ID** у нових документах; старі §19 anchors залишаються через compat ([DOC-Q2](DECISIONS.md)).
- **POLICY.md** §1 tree = **current**; цей документ = **target**.

### 9.3 Відомі drift (не вирішується R2)

- [GAPS.md §8.6](GAPS.md#86-l3-advanced-syntax-subtrack) може відставати від L3 doc — синхронізувати в R3 doc slice.
- Untracked `programs/03-advanced/syntax/` — зафіксувати в git до масової міграції.

---

## 10. Валідація (майбутній validator, R3+)

| Перевірка | Тип |
| --------- | --- |
| YAML schema version | error |
| canonical_id unique | error |
| alias unique, no alias/canonical collision | error |
| prerequisites resolve | error |
| DAG acyclic | error |
| artifacts exist on disk | error |
| pipeline members resolve | error |
| registry stale vs manifests | error |
| `kind: negative` має `expected` | error |

---

## 11. Зв'язок з існуючими документами

| Документ | Роль після R2 |
| -------- | ------------- |
| **Цей файл** | **Єдиний canonical target architecture** |
| [POLICY.md](POLICY.md) | Поточний фізичний layout до R3 |
| [SYNTAX_TRACK.md](SYNTAX_TRACK.md) | Історичний Syntax Track registry + specs |
| [L3_ADVANCED_SYNTAX.md](L3_ADVANCED_SYNTAX.md) | Підтрек L3-ADV |
| [DECISIONS.md](DECISIONS.md) | Owner + derived ledger |
| [GAPS.md](GAPS.md) | OPEN / R3 tracking |

---

## 12. R2 acceptance checklist

- [x] A1–A9 відображені (§2)
- [x] Canonical architecture document (цей файл)
- [x] Три YAML contracts (§5–§7)
- [x] Directory contract (§4)
- [x] Dependency + failure semantics (§8)
- [x] Historical compatibility (§9)
- [x] Negative specimens враховані (§4.5)
- [x] Без move specimens / без migration / без commit

**R2 status:** **COMPLETE** (документація). **R3** — окремий зріз.
