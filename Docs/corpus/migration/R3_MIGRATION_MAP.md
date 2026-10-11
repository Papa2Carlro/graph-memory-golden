# R3 — повний migration map (inventory + target)

**Status:** **PLANNING** (жодного on-disk move)
**Slice:** **GS-EXAMPLE-CORPUS-REORG-R3-MIGRATION-PLAN**
**Архітектура:** [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](../GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md) (**GS-REORG-R2-A1…A9**)
**Дата інвентаризації:** 2026-10-11 (повний `find programs/` + реєстри документації)

---

## 1. Зведення

| Метрика | Значення |
| ------- | -------- |
| **Logical specimens (усього)** | **73** |
| **language-features (golden syntax)** | **21** |
| **algorithms (classic reference)** | **46** |
| **modular projects (L5)** | **6** (5 positive + 1 negative) |
| **Artifact files (.gs/.gschema)** | **89** |
| **Mapped artifacts** | **89** |
| **Unmapped artifacts** | **0** |
| **Duplicate canonical ID** | **0** |
| **Target path collision** | **0** |
| **NOT LANDED registry rows (без файлів)** | **SY-L5.1**, **SY-L5.2**, **SY-L5.3**; §19.6.15.4 expanded — **не** входять у map |

**Правила map:** один logical specimen → один `canonical_id` → одна target directory (**A3**); кожен specimen отримує власну директорію (**A2**, R2 §4); імена target-директорій — **kebab-case** (DERIVED R2).

**Формат canonical ID (DERIVED R3):**

- Golden syntax: `gs.specimen.<kebab-slug>`
- Classic algorithms: `gs.algo.<category>.<kebab-slug>`
- L5 projects: `gs.project.modular.<kebab-slug>`; negative: `gs.project.modular.negative.<kebab-slug>`

---

## 2. Зафіксовані розбіжності (discrepancies)

| # | Спостереження | Джерело vs факт | Дія R3 |
| - | ------------- | --------------- | ------ |
| D1 | **POLICY.md** §1 tree показує `programs/04-complex/syntax/` | On-disk **немає** `04-complex/syntax/` (лише flat `04-complex/*.gs`) | Target map **не** відновлює `04-complex/syntax/` (**OQ-SY-L4.4-A7=B**) |
| D2 | **GAPS.md §8.6** — **L3-ADV-SY-01…04** = NOT LANDED | **[L3_ADVANCED_SYNTAX.md](../L3_ADVANCED_SYNTAX.md)** §4.1 — **LANDED**, SOURCE-LEVEL ACCEPTED | **Documentation drift**; acceptance **не** перераховувати; синхронізація GAPS — окремий doc slice після R3 |
| D3 | **Git / WIP:** можливі untracked `programs/03-advanced/syntax/*` | Файли **присутні** в inventory (11 dirs) | R4 slice: зафіксувати у git **до** mass move |
| D4 | **Glob/index** інколи показує `04-complex/syntax/fail_guard/` | `ls` — каталогу **немає** | Не включати в map; якщо з’явиться — **не** мігрувати (дубль **SY-L4.3**) |

---

## 3. Master table (усі specimens)

Колонки скорочено: **Cur** = current directory; **Tgt** = target directory (від `programs/`).

### 3.1 language-features — golden syntax (21)

| canonical_id | aliases | kind | Cur | Tgt | category | primary feature | S-depth | acceptance |
| ------------ | ------- | ---- | --- | --- | -------- | --------------- | ------- | ---------- |
| gs.specimen.let-vs-var | SY-L1.1 | positive | `01-classical/syntax/let_vs_var.gs` | `language-features/bindings/specimens/let-vs-var/` | bindings | let-var | S0 | LANDED; SOURCE-LEVEL; RUNTIME NOT VERIFIED |
| gs.specimen.equality-operators | SY-L1.2 | positive | `01-classical/syntax/equality_operators.gs` | `language-features/comparisons/specimens/equality-operators/` | comparisons | equality | S0 | same |
| gs.specimen.if-elif-else | SY-L1.3 | positive | `01-classical/syntax/if_elif_else.gs` | `language-features/control-flow/specimens/if-elif-else/` | control-flow | if-elif-else | S0 | same |
| gs.specimen.match-literals | SY-L1.4 | positive | `01-classical/syntax/match_literals.gs` | `language-features/control-flow/specimens/match-literals/` | control-flow | match | S0 | same |
| gs.specimen.each-range | SY-L1.5 | positive | `01-classical/syntax/each_range.gs` | `language-features/control-flow/specimens/each-range/` | control-flow | each-range | S0 | same |
| gs.specimen.destructuring-flat | SY-L2.1 | positive | `02-composition/syntax/pair/` | `language-features/destructuring/specimens/destructuring-flat/` | destructuring | let-destructure | S0 | same |
| gs.specimen.int32-bounds | SY-L2.2 | positive | `02-composition/syntax/int32_bounds.gs` | `language-features/types-width/specimens/int32-bounds/` | types-width | int32-literal | S0 | same |
| gs.specimen.optional-get | SY-L2.3 | positive | `02-composition/syntax/optional_get.gs` | `language-features/optional-null/specimens/optional-get/` | optional-null | optional-from-get | S0 | same |
| gs.specimen.graph-set-param | SY-L3.1 | positive | `02-composition/syntax/graph_set_param/` | `language-features/graph-mutation/specimens/graph-set-param/` | graph-mutation | set-delegated | S1 | same |
| gs.specimen.graph-set-block | SY-L3.2 | positive | `02-composition/syntax/graph_set_block/` | `language-features/graph-mutation/specimens/graph-set-block/` | graph-mutation | set-block | S1 | same |
| gs.specimen.graph-set-action | SY-L3.3 | positive | `02-composition/syntax/graph_set/` | `language-features/graph-mutation/specimens/graph-set-action/` | graph-mutation | action-set | S2 | same |
| gs.specimen.on-emit | SY-L4.1 | positive | `03-advanced/syntax/on_emit/` | `language-features/events/specimens/on-emit/` | events | on-emit | S1 | same |
| gs.specimen.graph-connect | SY-L4.2 | positive | `03-advanced/syntax/graph_connect/` | `language-features/graph-edges/specimens/graph-connect/` | graph-edges | connect-create | S1 | same |
| gs.specimen.fail-guard | SY-L4.3 | positive | `03-advanced/syntax/fail_guard/` | `language-features/control-abort/specimens/fail-guard/` | control-abort | fail-guard | S0 | same |
| gs.specimen.exists-if-present | SY-L4.4 (§19.6.15.1) | positive | `03-advanced/syntax/exists_if_present/` | `language-features/optional-null/specimens/exists-if-present/` | optional-null | exists-if | S0 | same |
| gs.specimen.exists-if-guard | SY-L4.4 (§19.6.15.2) | positive | `03-advanced/syntax/exists_if_guard/` | `language-features/optional-null/specimens/exists-if-guard/` | optional-null | exists-guard | S0 | same |
| gs.specimen.null-narrowing | SY-L4.4 (§19.6.15.3) | positive | `03-advanced/syntax/null_narrowing/` | `language-features/optional-null/specimens/null-narrowing/` | optional-null | null-narrowing | S0 | same |
| gs.specimen.let-block-pub | L3-ADV-SY-01 | positive | `03-advanced/syntax/let_block_pub/` | `language-features/bindings/specimens/let-block-pub/` | bindings | let-block-pub | S0 | LANDED (L3 doc); SOURCE-LEVEL; RUNTIME NOT VERIFIED |
| gs.specimen.var-block-mut | L3-ADV-SY-02 | positive | `03-advanced/syntax/var_block_mut/` | `language-features/bindings/specimens/var-block-mut/` | bindings | var-block-mut | S0 | same |
| gs.specimen.nested-if-branch | L3-ADV-SY-03 | positive | `03-advanced/syntax/nested_if_branch/` | `language-features/control-flow/specimens/nested-if-branch/` | control-flow | nested-if | S0 | same |
| gs.specimen.nested-if-optional | L3-ADV-SY-04 | positive | `03-advanced/syntax/nested_if_optional/` | `language-features/control-flow/specimens/nested-if-optional/` | control-flow | nested-if-optional | S0 | same |

**Примітка ownership:** `graph-set-action` target dir slug `graph-set-action` (не `graph_set`) — уникнення колізії з іншими `graph_set_*` modules; **module** лишається `example.syntax.graph_set` (**L5-A1**).

### 3.2 algorithms — classic reference (46)

Кожен рядок: один `.gs` → target `algorithms/<category>/specimens/<slug>/<filename>.gs`.

| canonical_id | Cur file | Tgt directory | historical level | acceptance |
| ------------ | -------- | ------------- | ---------------- | ---------- |
| gs.algo.numbers.average-int | `01-classical/numbers/average_int.gs` | `algorithms/numbers/specimens/average-int/` | L1 | classic reference (не Syntax Track) |
| gs.algo.numbers.collatz-step | `01-classical/numbers/collatz_step.gs` | `algorithms/numbers/specimens/collatz-step/` | L1 | — |
| gs.algo.numbers.count-digits | `01-classical/numbers/count_digits.gs` | `algorithms/numbers/specimens/count-digits/` | L1 | — |
| gs.algo.numbers.factorial | `01-classical/numbers/factorial.gs` | `algorithms/numbers/specimens/factorial/` | L1 | — |
| gs.algo.numbers.fibonacci | `01-classical/numbers/fibonacci.gs` | `algorithms/numbers/specimens/fibonacci/` | L1 | — |
| gs.algo.numbers.gcd-lcm | `01-classical/numbers/gcd_lcm.gs` | `algorithms/numbers/specimens/gcd-lcm/` | L1 | — |
| gs.algo.numbers.min-max | `01-classical/numbers/min_max.gs` | `algorithms/numbers/specimens/min-max/` | L1 | — |
| gs.algo.numbers.power | `01-classical/numbers/power.gs` | `algorithms/numbers/specimens/power/` | L1 | — |
| gs.algo.numbers.prime-numbers | `01-classical/numbers/prime_numbers.gs` | `algorithms/numbers/specimens/prime-numbers/` | L1 | — |
| gs.algo.numbers.reverse-integer | `01-classical/numbers/reverse_integer.gs` | `algorithms/numbers/specimens/reverse-integer/` | L1 | — |
| gs.algo.numbers.running-sum | `01-classical/numbers/running_sum.gs` | `algorithms/numbers/specimens/running-sum/` | L1 | — |
| gs.algo.numbers.sum-1-to-n | `01-classical/numbers/sum_1_to_n.gs` | `algorithms/numbers/specimens/sum-1-to-n/` | L1 | — |
| gs.algo.numbers.sum-digits | `01-classical/numbers/sum_digits.gs` | `algorithms/numbers/specimens/sum-digits/` | L1 | — |
| gs.algo.collections.binary-search | `01-classical/collections/binary_search.gs` | `algorithms/collections/specimens/binary-search/` | L1 | — |
| gs.algo.collections.copy-collection | `01-classical/collections/copy_collection.gs` | `algorithms/collections/specimens/copy-collection/` | L1 | — |
| gs.algo.collections.count-frequency | `01-classical/collections/count_frequency.gs` | `algorithms/collections/specimens/count-frequency/` | L1 | — |
| gs.algo.collections.dedupe-sorted | `01-classical/collections/dedupe_sorted.gs` | `algorithms/collections/specimens/dedupe-sorted/` | L1 | — |
| gs.algo.collections.filter-positive | `01-classical/collections/filter_positive.gs` | `algorithms/collections/specimens/filter-positive/` | L1 | — |
| gs.algo.collections.intersect-sorted | `01-classical/collections/intersect_sorted.gs` | `algorithms/collections/specimens/intersect-sorted/` | L1 | — |
| gs.algo.collections.is-sorted | `01-classical/collections/is_sorted.gs` | `algorithms/collections/specimens/is-sorted/` | L1 | — |
| gs.algo.collections.linear-search | `01-classical/collections/linear_search.gs` | `algorithms/collections/specimens/linear-search/` | L1 | — |
| gs.algo.collections.max-window-sum | `01-classical/collections/max_window_sum.gs` | `algorithms/collections/specimens/max-window-sum/` | L1 | — |
| gs.algo.collections.merge-sorted | `01-classical/collections/merge_sorted.gs` | `algorithms/collections/specimens/merge-sorted/` | L1 | — |
| gs.algo.collections.reverse-items | `01-classical/collections/reverse_items.gs` | `algorithms/collections/specimens/reverse-items/` | L1 | — |
| gs.algo.collections.sorting | `01-classical/collections/sorting.gs` | `algorithms/collections/specimens/sorting/` | L1 | — |
| gs.algo.collections.two-sum | `01-classical/collections/two_sum.gs` | `algorithms/collections/specimens/two-sum/` | L1 | — |
| gs.algo.strings.count-char | `01-classical/strings/count_char.gs` | `algorithms/strings/specimens/count-char/` | L1 | — |
| gs.algo.strings.count-runs | `01-classical/strings/count_runs.gs` | `algorithms/strings/specimens/count-runs/` | L1 | — |
| gs.algo.strings.ends-with | `01-classical/strings/ends_with.gs` | `algorithms/strings/specimens/ends-with/` | L1 | — |
| gs.algo.strings.find-char | `01-classical/strings/find_char.gs` | `algorithms/strings/specimens/find-char/` | L1 | — |
| gs.algo.strings.longest-run | `01-classical/strings/longest_run.gs` | `algorithms/strings/specimens/longest-run/` | L1 | — |
| gs.algo.strings.palindrome | `01-classical/strings/palindrome.gs` | `algorithms/strings/specimens/palindrome/` | L1 | — |
| gs.algo.strings.scalar-count | `01-classical/strings/scalar_count.gs` | `algorithms/strings/specimens/scalar-count/` | L1 | — |
| gs.algo.strings.starts-with | `01-classical/strings/starts_with.gs` | `algorithms/strings/specimens/starts-with/` | L1 | — |
| gs.algo.composition.merge-overlapping-intervals | `02-composition/merge_overlapping_intervals.gs` | `algorithms/composition/specimens/merge-overlapping-intervals/` | L2 | — |
| gs.algo.composition.mode-element-two-pass | `02-composition/mode_element_two_pass.gs` | `algorithms/composition/specimens/mode-element-two-pass/` | L2 | — |
| gs.algo.composition.run-length-encode | `02-composition/run_length_encode.gs` | `algorithms/composition/specimens/run-length-encode/` | L2 | — |
| gs.algo.composition.sieve-primes-to-limit | `02-composition/sieve_primes_to_limit.gs` | `algorithms/composition/specimens/sieve-primes-to-limit/` | L2 | — |
| gs.algo.advanced.levenshtein | `03-advanced/levenshtein.gs` | `algorithms/advanced/specimens/levenshtein/` | L3 | — |
| gs.algo.advanced.mergesort-recursive | `03-advanced/mergesort_recursive.gs` | `algorithms/advanced/specimens/mergesort-recursive/` | L3 | — |
| gs.algo.advanced.quicksort-partition | `03-advanced/quicksort_partition.gs` | `algorithms/advanced/specimens/quicksort-partition/` | L3 | — |
| gs.algo.complex.bfs-shortest-path-flat | `04-complex/bfs_shortest_path_flat.gs` | `algorithms/complex/specimens/bfs-shortest-path-flat/` | L4 | — |
| gs.algo.complex.n-queens-backtrack | `04-complex/n_queens_backtrack.gs` | `algorithms/complex/specimens/n-queens-backtrack/` | L4 | — |
| gs.algo.complex.parse-decimal-strict | `04-complex/parse_decimal_strict.gs` | `algorithms/complex/specimens/parse-decimal-strict/` | L4 | — |
| gs.algo.complex.rle-roundtrip | `04-complex/rle_roundtrip.gs` | `algorithms/complex/specimens/rle-roundtrip/` | L4 | — |
| gs.algo.complex.shunting-yard-eval | `04-complex/shunting_yard_eval.gs` | `algorithms/complex/specimens/shunting-yard-eval/` | L4 | — |

### 3.3 algorithms — modular / L5 (6 projects)

| canonical_id | kind | Cur | Tgt | historical | acceptance / expected |
| ------------ | ---- | --- | --- | ---------- | --------------------- |
| gs.project.modular.two-module-hello | positive | `05-modular/two_module_hello/` | `algorithms/modular-systems/specimens/two-module-hello/` | L5 golden | L5 queue per [L5_PROJECT_SYSTEM.md](../L5_PROJECT_SYSTEM.md) |
| gs.project.modular.relative-local-use | positive | `05-modular/relative_local_use/` | `algorithms/modular-systems/specimens/relative-local-use/` | L5 | — |
| gs.project.modular.reexport-facade | positive | `05-modular/reexport_facade/` | `algorithms/modular-systems/specimens/reexport-facade/` | L5 | — |
| gs.project.modular.import-alias-collision | positive | `05-modular/import_alias_collision/` | `algorithms/modular-systems/specimens/import-alias-collision/` | L5 | — |
| gs.project.modular.visibility-gate | positive | `05-modular/visibility_gate/` | `algorithms/modular-systems/specimens/visibility-gate/` | L5 | — |
| gs.project.modular.negative.cycle-import-bad | negative | `05-modular/negative/cycle_import_bad/` | `algorithms/modular-systems/_negative/cycle-import-bad/` | L5 **L5-N1** | compile_error (cycle); **L5-N2** fields TBD |

**Ownership:** L5 під **algorithms/modular-systems/** (**GS-REORG-R2-A6=C** subject category), не під `language-features/`.

---

## 4. Artifact-level mapping (multi-file)

| canonical_id | current artifacts | target artifacts (ті самі імена файлів) |
| ------------ | ----------------- | ---------------------------------------- |
| gs.specimen.destructuring-flat | `destructuring_flat.gs`, `pair_carrier.gschema` | `…/destructuring-flat/destructuring_flat.gs`, `pair_carrier.gschema` |
| gs.specimen.graph-set-param | `graph_set_param.gs`, `graph_set_param_carrier.gschema` | `…/graph-set-param/` (same filenames) |
| gs.specimen.graph-set-block | `graph_set_block.gs`, `graph_set_block_carrier.gschema` | `…/graph-set-block/` |
| gs.specimen.graph-set-action | `graph_set_action.gs`, `graph_set_carrier.gschema` | `…/graph-set-action/` |
| gs.specimen.on-emit | `on_emit.gs`, `on_emit_carrier.gschema` | `…/on-emit/` |
| gs.specimen.graph-connect | `graph_connect.gs`, `graph_connect_carrier.gschema` | `…/graph-connect/` |
| gs.specimen.fail-guard | `fail_guard.gs`, `fail_guard_carrier.gschema` | `…/fail-guard/` |
| gs.specimen.let-block-pub | `let_block_pub.gs` | `…/let-block-pub/let_block_pub.gs` |
| gs.specimen.var-block-mut | `var_block_mut.gs` | `…/var-block-mut/` |
| gs.specimen.nested-if-branch | `nested_if_branch.gs` | `…/nested-if-branch/` |
| gs.specimen.nested-if-optional | `nested_if_optional.gs` | `…/nested-if-optional/` |
| gs.specimen.exists-if-present | `exists_if_present.gs` | `…/exists-if-present/` |
| gs.specimen.exists-if-guard | `exists_if_guard.gs` | `…/exists-if-guard/` |
| gs.specimen.null-narrowing | `null_narrowing.gs` | `…/null-narrowing/` |
| gs.project.modular.* | усі `.gs` у project tree | той самий relative layout під target project dir |

---

## 5. Метадані (складність, features, prerequisites)

### 5.1 complexity (golden syntax)

Взято з [SYNTAX_TRACK.md](../SYNTAX_TRACK.md) §19.6 (колонка S0/S1/S2) та L3 doc для L3-ADV.

### 5.2 prerequisites

| canonical_id | prerequisites (manifest) | Підстава |
| ------------ | ------------------------ | -------- |
| *усі інші golden* | `[]` | Немає **підтвердженого** DAG у реєстрах |
| gs.specimen.nested-if-optional | *(порожньо в production)* | **Запропоновано** (не підтверджено owner): після `gs.specimen.nested-if-branch` — лише narrative у GAPS §8.6; **не** auto-prerequisite без owner slice |

**Заборонено в R3:** вигадані prerequisites за «схожістю» (напр. graph specimens → optional-get).

### 5.3 historical (збереження)

Кожен `specimen.yaml` (R4+) має містити:

```yaml
historical:
  classic_level_path: <current path from table>
  syntax_track_id: <alias if any>
  l3_adv_id: <if any>
  acceptance:
    landed: <bool per canonical doc>
    source_level_accepted: <bool>
    runtime_verified: false   # якщо так у реєстрі
```

Значення **копіювати** з SYNTAX_TRACK / L3_ADVANCED_SYNTAX — **не** підвищувати статус.

---

## 6. Migration risks (per specimen class)

| Клас | Ризик | Мітігація (R4) |
| ---- | ----- | -------------- |
| Module-less L1/L2 flat syntax | Низький | move + rename dir only |
| `example.syntax.*` + carrier | Середній | unified module (**L3-A1**); move directory atomically |
| L5 multi-module | Середній | move project root; **не** змінювати `module`/`use` |
| L5 relative `use ./` | Середній | зберегти internal relative paths у project tree |
| Negative cycle_import_bad | Низький | target `_negative/` (**derived**, OQ-SY-2 лишається OPEN) |
| Untracked L3-adv | Процесний | git add до move |

---

## 7. Майбутні NOT LANDED (без файлів — поза map)

| ID | Planned target (інформаційно) |
| -- | ----------------------------- |
| SY-L5.1 | `language-features/modules-imports/specimens/…` |
| SY-L5.2 | `language-features/_negative/…` або per **OQ-SY-2** |
| SY-L5.3 | unified stub — TBD |
| §19.6.15.4 expanded | окремі slugs — **NOT LANDED** |

---

## 8. Перевірка map (R3 acceptance)

- [x] 73/73 specimens з target directory (§1; reconciliation **R4-03** — раніше §1 помилково **72**/**45** algo)
- [x] 89/89 artifacts прив’язані
- [x] 0 duplicate canonical_id
- [x] 0 target path collision (перевірено побудовою таблиці)
- [x] aliases SY-L* / L3-ADV-SY-* збережені
- [x] acceptance не переписано
