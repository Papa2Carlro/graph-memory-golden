# R3 — pipeline migration plan

**Status:** **PLANNING** (без production `pipeline.yaml`)
**Slice:** **GS-EXAMPLE-CORPUS-REORG-R3-MIGRATION-PLAN**
**Map:** [R3_MIGRATION_MAP.md](R3_MIGRATION_MAP.md)

Усі посилання — **canonical_id**. Порядок `members` відповідає історичному Syntax Track queue, де застосовно (**GS-REORG-R2-A2=C**).

**Легенда prerequisites:**

| Мітка | Значення |
| ----- | -------- |
| **confirmed** | Явно зафіксовано в canonical doc як залежність |
| **proposed** | Рекомендація в GAPS/narrative, не DECIDED |
| **unknown** | Немає даних |

---

## 1. language-features pipelines

### 1.1 `syntax-track-l1-core`

**Призначення:** історичний блок **SY-L1.***.

| order | canonical_id | aliases |
| ----- | ------------ | ------- |
| 1 | gs.specimen.let-vs-var | SY-L1.1 |
| 2 | gs.specimen.equality-operators | SY-L1.2 |
| 3 | gs.specimen.if-elif-else | SY-L1.3 |
| 4 | gs.specimen.match-literals | SY-L1.4 |
| 5 | gs.specimen.each-range | SY-L1.5 |

**Prerequisites:** немає (**confirmed** empty).

**Cross-pipeline:** specimen може входити також у thematic pipelines (§2).

---

### 1.2 `syntax-track-l2-types-and-optionals`

| order | canonical_id | aliases |
| ----- | ------------ | ------- |
| 1 | gs.specimen.destructuring-flat | SY-L2.1 |
| 2 | gs.specimen.int32-bounds | SY-L2.2 |
| 3 | gs.specimen.optional-get | SY-L2.3 |

**Prerequisites:** **unknown** (реєстр не вимагає SY-L1 перед L2).

---

### 1.3 `syntax-track-graph-mutation`

| order | canonical_id | aliases |
| ----- | ------------ | ------- |
| 1 | gs.specimen.graph-set-param | SY-L3.1 |
| 2 | gs.specimen.graph-set-block | SY-L3.2 |
| 3 | gs.specimen.graph-set-action | SY-L3.3 |

**Prerequisites:** **unknown** (sibling modules; без документованого DAG).

**Примітка:** порядок param → block → action — registry narrative order, не hard dependency.

---

### 1.4 `syntax-track-l4-surface`

| order | canonical_id | aliases |
| ----- | ------------ | ------- |
| 1 | gs.specimen.on-emit | SY-L4.1 |
| 2 | gs.specimen.graph-connect | SY-L4.2 |
| 3 | gs.specimen.fail-guard | SY-L4.3 |
| 4 | gs.specimen.exists-if-present | SY-L4.4 §19.6.15.1 |
| 5 | gs.specimen.exists-if-guard | SY-L4.4 §19.6.15.2 |
| 6 | gs.specimen.null-narrowing | SY-L4.4 §19.6.15.3 |

**Prerequisites:** **unknown** між L4.1–L4.3 та exists-family.

**NOT LANDED** (не в pipeline): §19.6.15.4 expanded slugs.

---

### 1.5 `l3-advanced-syntax-subtrack`

| order | canonical_id | aliases |
| ----- | ------------ | ------- |
| 1 | gs.specimen.let-block-pub | L3-ADV-SY-01 |
| 2 | gs.specimen.var-block-mut | L3-ADV-SY-02 |
| 3 | gs.specimen.nested-if-branch | L3-ADV-SY-03 |
| 4 | gs.specimen.nested-if-optional | L3-ADV-SY-04 |

**Prerequisites:**

| member | prerequisite | status |
| ------ | ------------ | ------ |
| gs.specimen.nested-if-optional | gs.specimen.nested-if-branch | **proposed** (GAPS §8.6 narrative «after 03») — **не** включати в production manifest без owner slice |

---

### 1.6 `syntax-track-full` (thematic)

Об’єднує **1.1 → 1.4** у порядку: L1 → L2 → graph-mutation → L4 (без L3-ADV; без algorithms).

**Cross-pipeline membership:** усі members з §1.1–1.4.

---

## 2. Thematic language pipelines (optional runners)

| pipeline_id | members (canonical_id) | Примітка |
| ----------- | ---------------------- | -------- |
| `bindings-intro` | let-vs-var, let-block-pub, var-block-mut | cross-level thematic |
| `optional-null-track` | optional-get, exists-if-present, exists-if-guard, null-narrowing | feature axis **A7** |
| `control-flow-flat-and-nested` | if-elif-else, nested-if-branch, nested-if-optional | |

**Prerequisites:** лише **proposed** для nested-if-optional (§1.5).

---

## 3. Algorithm category pipelines

Порядок усередині категорії — **лексикографічний slug** (стабільний default для R4 generator).

### 3.1 `algorithms-numbers-l1`

Усі `gs.algo.numbers.*` (12 members) — див. [R3_MIGRATION_MAP.md §3.2](R3_MIGRATION_MAP.md#32-algorithms--classic-reference-45).

### 3.2 `algorithms-collections-l1`

12 members `gs.algo.collections.*`.

### 3.3 `algorithms-strings-l1`

8 members `gs.algo.strings.*`.

### 3.4 `algorithms-composition-l2`

4 members `gs.algo.composition.*`.

### 3.5 `algorithms-advanced-l3`

3 members `gs.algo.advanced.*`.

### 3.6 `algorithms-complex-l4`

5 members `gs.algo.complex.*`.

**Prerequisites:** **unknown** (classic queues не визначають syntax-style DAG).

---

## 4. Modular / L5 pipelines

### 4.1 `modular-systems-positive`

| order | canonical_id |
| ----- | ------------ |
| 1 | gs.project.modular.two-module-hello |
| 2 | gs.project.modular.relative-local-use |
| 3 | gs.project.modular.visibility-gate |
| 4 | gs.project.modular.reexport-facade |
| 5 | gs.project.modular.import-alias-collision |

**Prerequisites:** **unknown** (L5 charter staged queue — детальний порядок у [L5_PROJECT_SYSTEM.md](../L5_PROJECT_SYSTEM.md) §16; не дублювати тут без перечитання queue rows).

### 4.2 `modular-systems-negative`

| order | canonical_id | expected |
| ----- | ------------ | -------- |
| 1 | gs.project.modular.negative.cycle-import-bad | compile_error |

**Cross-pipeline:** negative **не** входить у positive pipeline.

---

## 5. Thematic algorithm pipeline

**`algorithms-sorts-and-search` (thematic):**

- gs.algo.collections.binary-search
- gs.algo.collections.linear-search
- gs.algo.collections.sorting
- gs.algo.advanced.mergesort-recursive
- gs.algo.advanced.quicksort-partition

**Prerequisites:** **unknown**.

---

## 6. Strict vs direct runner (нагадування **A8**)

- **strict:** transitive prerequisites з manifest (коли з’являться **confirmed** edges).
- **direct:** один canonical_id; **proposed** prerequisites не auto-run.

---

## 7. Майбутні pipelines (NOT LANDED)

| pipeline_id | Статус |
| ----------- | ------ |
| `syntax-track-l5-modules` | BLOCKED до **SY-L5.1**–**L5.3** land |
| `syntax-negative-per-level` | BLOCKED — **OQ-SY-2** OPEN |

---

## 8. Перевірка

- [x] Усі 21 golden syntax ID покриті §1.x
- [x] Усі 45 + 6 algorithm/project ID покриті §3–4
- [x] Немає вигаданих **confirmed** prerequisites
- [x] Cross-pipeline дозволено (**A3**)
