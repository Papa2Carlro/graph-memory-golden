# Example Corpus — Classic Levels (L1–L4)

**Status:** **CANONICAL** (Example repository — classic L1–L4 inventory, queues, saturation; not per-specimen L4 annex prose)
**Level taxonomy:** [CHARTER.md §2](CHARTER.md#2-level-taxonomy-classic-programs). **Paths / layout:** [POLICY.md](POLICY.md). **Owner decisions:** [DECISIONS.md](DECISIONS.md) (**L4-MODEL**, **L4-PATH**, **L4-QUEUE**, **L4.3-CONTRACT**, **L4.4-BFS-A1**, …). **OPEN gaps:** [GAPS.md](GAPS.md) (**L4-SATURATION**, language/parser gaps §4–§6).
**Compat:** [EXAMPLE_CORPUS_ORGANIZATION.md](../EXAMPLE_CORPUS_ORGANIZATION.md) §8.4.1 legacy stubs; L4 annex prose → [annexes/](annexes/README.md) (**DOC-Q4=B**).
**Syntax Track** landed counts in §4 are a status snapshot; specimen registry → [SYNTAX_TRACK.md](SYNTAX_TRACK.md). **L5** summary rows → [L5_PROJECT_SYSTEM.md](L5_PROJECT_SYSTEM.md).

---

## 4. Current corpus status

| Item | State |
| ---- | ----- |
| Repository role | Reference corpus (this document) |
| L1 on-disk programs | `programs/01-classical/` — **numbers/**, **collections/**, **strings/**, **syntax/** (Syntax Track — [SYNTAX_TRACK.md](SYNTAX_TRACK.md)) |
| Syntax Track specimens (landed) | **10** — **SY-L1.1**–**SY-L1.5** (`01-classical/syntax/`); **SY-L2.1**–**SY-L2.3**, **SY-L3.2**, **SY-L3.3** (`02-composition/syntax/` — explicit modules in `syntax/pair/`, `syntax/graph_set/`, `syntax/graph_set_block/` per **SY-STR-A1**; **SY-L2.2**–**SY-L2.3** flat) — [SYNTAX_TRACK.md §19.6](SYNTAX_TRACK.md#196-syntax-track-queue) |
| L2 on-disk path | `programs/02-composition/` (flat layout; no domain subdirs yet) |
| Program count (L1 bucket) | **34** single-file `.gs` programs (as of registry creation) |
| Level 2 programs on disk | **4** landed under `programs/02-composition/`: `sieve_primes_to_limit.gs`, `merge_overlapping_intervals.gs`, `run_length_encode.gs`, `mode_element_two_pass.gs` |
| L3 on-disk path | `programs/03-advanced/` (flat layout; no L3 domain subdirectories) |
| Level 3 programs on disk | **3** landed under `programs/03-advanced/`: `mergesort_recursive.gs`, `levenshtein.gs`, `quicksort_partition.gs` (see §8) |
| L4 on-disk path | `programs/04-complex/*.gs` (**DECIDED**; see [POLICY.md §1](POLICY.md#1-physical-corpus-layout), §8.4) |
| Level 4 programs on disk | **5** landed / **5** selected under `programs/04-complex/`: `parse_decimal_strict.gs` (**L4.1**), `rle_roundtrip.gs` (**L4.2**), `n_queens_backtrack.gs` (**L4.3**), `bfs_shortest_path_flat.gs` (**L4.4**), `shunting_yard_eval.gs` (**L4.5**); see §8.4 |
| L4 target queue | **5** entries — **CONFIRMED** order (§8.4); **all five landed** (**L4.1**–**L4.5**); approved queue **complete** on disk (§8.4.2–§8.4.3) |
| L4 saturation | **SATURATION PENDING** — queue **5/5** complete; specimens **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** (§8.4.3; not **SATURATED**) |
| L5 on-disk path | Positive: `programs/05-modular/<project>/` (**L5-A10=A**); errors: `programs/05-modular/negative/<project>/` (**L5-N1=B**); warnings: `programs/05-modular/warnings/<project>/` (**L5-N1=B**); [L5_PROJECT_SYSTEM.md §15.4](L5_PROJECT_SYSTEM.md#154-canonical-filesystem-layout-l5-a10a-l5-n1b) |
| Level 5 golden projects (valid) | **5** landed — **L5.1**–**L5.5** under `programs/05-modular/<project>/` |
| Level 5 golden projects (invalid) | **1** landed — **L5.9** `negative/cycle_import_bad/` (**SOURCE-LEVEL NEGATIVE**; must **not** compile per #22.31) |
| L5 charter / queue | **CHARTER DECIDED** — [L5_PROJECT_SYSTEM.md §15](L5_PROJECT_SYSTEM.md#15-l5-project-system-charter); **queue** [§16](L5_PROJECT_SYSTEM.md#16-l5-golden-project-queue); diagnostic contract **L5-N2=B** |
| L5 program-level direction | **DECIDED** — **L5-PROG-A1=C**, **L5-PROG-A2=C** ([DECISIONS.md](DECISIONS.md)) |

---

## 5. L1 saturation status

Level **1** is treated as **saturated / representative** for the current Classical slice: the existing 34 programs under `programs/01-classical/` cover the intended L1 algorithmic shapes without requiring reclassification or rewrites in this registry slice.

`programs/01-classical/` is the **canonical L1 corpus location** per [POLICY.md](POLICY.md). Whether future L1 additions still land only there is **not** decided here.

---

## 6. L2 target queue (approved order)

This table is the **target registry** for the approved L2 sequence. All four entries are **landed** on disk at `programs/02-composition/` (see §4).

| ID | Filename | Status |
| -- | -------- | ------ |
| **L2-01** | `sieve_primes_to_limit.gs` | **landed** — `programs/02-composition/sieve_primes_to_limit.gs` |
| **L2-02** | `merge_overlapping_intervals.gs` | **landed** — `programs/02-composition/merge_overlapping_intervals.gs` |
| **L2-03** | `run_length_encode.gs` | **landed** — `programs/02-composition/run_length_encode.gs` |
| **L2-04** | `mode_element_two_pass.gs` | **landed** — `programs/02-composition/mode_element_two_pass.gs` |

No other L2 queue entries are approved in this registry. The approved L2 queue is **complete** (no further L2-0x slots in this registry).

### 6.1 L2 saturation status

Level **2** is treated as **saturated** for the current approved queue: the four landed programs under `programs/02-composition/` provide the intended structural diversity for this L2 slice (composition jump across distinct algorithmic shapes). This is a **corpus-organization** judgment, not a language-design level. Additional L2 `.gs` files are **not** approved in §6 unless a future owner/registry slice adds them.

---

## 7. L2 reserve targets (not queue)

Reserved for possible later L2 consideration; **not** part of the approved L2-01…L2-04 sequence:

| Filename | Note |
| -------- | ---- |
| `one_row_ca_next_generation.gs` | reserve |

**Historical note:** `parse_decimal_strict.gs` was previously listed here as an L2 reserve. It is **retired** from L2 reserves and **realized** as **L4.1** — `programs/04-complex/parse_decimal_strict.gs` (§8.4).

`one_row_ca_next_generation.gs` is **not** an L3 candidate (see §8).

---

## 8. L3 landed programs, candidate pool, and saturation

**Registry distinction:** **landed** means a `.gs` file exists on disk at `programs/03-advanced/` (see §4). **Optional / reserve** pool entries are **not** landed and do **not** imply L3 is incomplete. **L3 saturation** does not require exhausting the candidate pool.

### 8.1 L3 landed registry

| Filename | Status | Structural role (reference) |
| -------- | ------ | --------------------------- |
| `mergesort_recursive.gs` | **landed** — `programs/03-advanced/mergesort_recursive.gs` | Recursive divide-and-conquer; midpoint split; recursive subproblems; merge combine |
| `levenshtein.gs` | **landed** — `programs/03-advanced/levenshtein.gs` | Flat 2D DP; base row/column; recurrence; String/Char interaction |
| `quicksort_partition.gs` | **landed** — `programs/03-advanced/quicksort_partition.gs` | Pivot-based partition; three-way `<` / `==` / `>` buckets; recursive less/greater; reconstruction |

`mergesort_recursive.gs` was the **first** L3 target selected for authoring; it is **landed** (historical selection only).

### 8.2 L3 optional / reserve (not landed)

| Filename | Status | Note |
| -------- | ------ | ---- |
| `knapsack.gs` | **optional / reserve** — **not landed** | Second tabular-DP specimen (optimization / take–skip); **not** required for L3 saturation |

No other filenames are in the L3 optional/reserve list in this registry slice.

### 8.3 L3 saturation status

Level **3** is treated as **saturated** for the current slice: the three landed programs under `programs/03-advanced/` cover the intended orthogonal L3 mechanisms — **merge-style recursive D&C**, **pivot partition/rebuild**, and **tabular DP**. Remaining `knapsack.gs` would add another DP recurrence but **no missing top-level L3 mechanism** from [CHARTER §2](CHARTER.md#2-level-taxonomy-classic-programs) and is **not** a prerequisite for L4. Additional L3 `.gs` files are **not** required unless a future owner/registry slice adds them.

### 8.4 L4 path, landed programs, and target queue

**Registry distinction:** **landed** means a single `.gs` exists on disk at `programs/04-complex/<filename>.gs` (see §4). **Queued** entries are approved targets not yet on disk. **Queued ≠ landed.**

| Item | Status |
| ---- | ------ |
| L4 qualitative model | **DECIDED** — Complex single-file ([CHARTER §2](CHARTER.md#2-level-taxonomy-classic-programs)) |
| L4 filesystem / path | **DECIDED** — `programs/04-complex/*.gs` (flat; [POLICY.md](POLICY.md)) |
| L4 corpus progression | **DECIDED** — owner intends to land **all five** queue entries below (none required for L3 completion) |
| L4 queue sequence | **CONFIRMED** — order in §8.4.2 |
| L4 saturation | **reviewed** — five-program **CONFIRMED** queue **complete** on disk; **not** declared **SATURATED** (§8.4.3) |

#### 8.4.1 L4 landed registry (summary)

Per-specimen pipelines, contracts, validation records, and parser notes: **[annexes/](annexes/README.md)** (**L4.1**–**L4.5**); monolith **[§8.4.1](../EXAMPLE_CORPUS_ORGANIZATION.md#841-l4-landed-registry)** retains legacy heading stubs.

| Filename | Status | Structural role (reference) |
| -------- | ------ | --------------------------- |
| `parse_decimal_strict.gs` | **LANDED** — `programs/04-complex/parse_decimal_strict.gs` (**L4.1**) — [annexes/L4.1.md](annexes/L4.1.md) | Strict decimal string → `Int?`; lexical validation; digit accumulation with overflow guard; sign handling; `null` for invalid input; signed `Int{64}` boundaries including leading-zero `INT_MIN` lexeme |
| `rle_roundtrip.gs` | **LANDED** — `programs/04-complex/rle_roundtrip.gs` (**L4.2**; **221** LOC) — [annexes/L4.2.md](annexes/L4.2.md) | RLE encode → `validate_encoded_rle` → `decode_rle` → roundtrip verify; parallel `[Char]` / `[Int]` encoded form; decoder writes **`[Char]`**, not `String`; roundtrip via Unicode scalar equivalence to source `String` |
| `n_queens_backtrack.gs` | **LANDED** — `programs/04-complex/n_queens_backtrack.gs` (**L4.3**; **116** LOC) — [annexes/L4.3.md](annexes/L4.3.md) | N×N queens: recursive backtracking with constraint checks; shared mutable `board: [Int]` (`board[row]` = column or **`-1`**); `.set(row, col)` placement and `.set(row, -1)` restoration |
| `bfs_shortest_path_flat.gs` | **LANDED** — `programs/04-complex/bfs_shortest_path_flat.gs` (**L4.4**; **352** LOC) — [annexes/L4.4.md](annexes/L4.4.md) | Unweighted shortest path on flat directed adjacency `adjacency[u*n+v]` ∈ {0,1}; BFS with head-index FIFO queue; shared mutable `visited` / `distance` / `predecessor`; predecessor path reconstruction → `[Int]?` |
| `shunting_yard_eval.gs` | **LANDED** — `programs/04-complex/shunting_yard_eval.gs` (**L4.5**; **556** LOC) — [annexes/L4.5.md](annexes/L4.5.md) | Infix arithmetic: lex → grammar validation → shunting-yard → postfix eval; parallel token `kinds` / `values`; `evaluate_expression` → `Int?`; program-local `*_int64` guards |

Registry-wide acceptance labels: specimens **SOURCE-LEVEL ACCEPTED** where stated in annex prose; **RUNTIME NOT VERIFIED** unless a future slice records execution evidence.

#### 8.4.2 L4 target queue (CONFIRMED order)

| ID | Program | Status |
| --- | --- | --- |
| **L4-01** | `parse_decimal_strict.gs` | **LANDED** — [annexes/L4.1.md](annexes/L4.1.md) |
| **L4-02** | `rle_roundtrip.gs` | **LANDED** — [annexes/L4.2.md](annexes/L4.2.md) |
| **L4-03** | `n_queens_backtrack.gs` | **LANDED** — [annexes/L4.3.md](annexes/L4.3.md) |
| **L4-04** | `bfs_shortest_path_flat.gs` | **LANDED** — [annexes/L4.4.md](annexes/L4.4.md) |
| **L4-05** | `shunting_yard_eval.gs` | **LANDED** — [annexes/L4.5.md](annexes/L4.5.md) |

- **L3** remains **saturated** at the corpus-organization level (§8.3).
- The **CONFIRMED** five-program L4 queue is **complete** on disk; **L4 saturation** is reviewed in §8.4.3 and is **not** declared **SATURATED** in this slice.

#### 8.4.3 L4 saturation review (evidence — not a SATURATED declaration)

**Queue status:** **5 / 5** landed at `programs/04-complex/*.gs` per §8.4.2. This subsection records **qualitative coverage** after closure of the approved queue; it does **not** promote L4 to **SATURATED** (contrast L2/L3 saturation judgments in §6.1 and §8.3).

| Program | Primary L4 signals demonstrated |
| ------- | ------------------------------ |
| **L4.1** `parse_decimal_strict` | Multi-phase parse pipeline; lexical + numeric invariants; **`Int?`** invalid propagation; **Int{64}** boundary honesty |
| **L4.2** `rle_roundtrip` | Encode → validate → decode → verify; cross-phase invariants; parallel collections; explicit rejection before later phases |
| **L4.3** `n_queens_backtrack` | Recursive search; shared mutable state; backtracking restoration; counting contract with **`null`** invalid **`n`** |
| **L4.4** `bfs_shortest_path_flat` | Flat graph encoding; coordinated BFS state; reconstruction; **A1=C** validation vs unreachable split |
| **L4.5** `shunting_yard_eval` | Tokenization; grammar gate; shunting-yard; postfix eval; program-local arithmetic guards |

**Coverage strengths:** orthogonal **string/parse**, **compression roundtrip**, **search/backtrack**, **graph traversal**, and **expression evaluation** shapes; repeated use of **explicit validation before interpretation** and **honest `null` failure** paths.

**Residual weaknesses / gaps:** no landed specimen for **module/multi-file** composition (L5 — [L5_PROJECT_SYSTEM.md §15–§16](L5_PROJECT_SYSTEM.md#15-l5-project-system-charter)); **runtime-verified** L4 behavior **not** established; **OPEN** language gaps (**`String` from `[Char]`**, **`Int / Int` semantics**, optional collections) remain — [GAPS.md §4](GAPS.md#4-classic-l4-language-runtime-and-corpus-gaps-841843); **knapsack.gs**-class L3 reserve unused; no second graph or second parser specimen within L4.

**L4.6 need:** **not evidenced** as required for the current **CONFIRMED** queue goal. A future **L4.6+** slot would be an **owner/registry** decision — **not** automatic because five programs landed.

**SATURATED verdict (this slice):** **Withhold.** Landing all five **CONFIRMED** targets completes the **approved queue** but does **not**, by itself, justify an **L4 SATURATED** label comparable to L2/L3 without owner review of residual gaps above.

**Owner decision surface:** **L4-SATURATION** — **OPEN** ([DECISIONS.md §3](DECISIONS.md#3-open-and-unresolved-status-preserved)). Options A/B/C sketched in [GAPS.md §5](GAPS.md#5-l4-saturation-follow-up-l4-saturation). **Recommendation (corpus-organization only):** **B** — not an owner **DECIDED** option.

### 8.5 Superseded historical L4 direction (multi-file)

A prior registry slice selected **multi-file** L4 under `programs/04-modular/parse_decimal_strict/*.gs` (lexical / parse / orchestration split across module units). That direction is **superseded** and is **not** the active L4 target.

**Historical context only:** that selection motivated early module/import evidence gathering in `graph-memory-language`; Example corpus L4 no longer uses multi-file layout.

**Active L4 specimen for `parse_decimal_strict`:** **landed** — `programs/04-complex/parse_decimal_strict.gs` (§8.4.1).

### 8.6 Superseded L5+ placeholder

Prior slices listed **hypothetical L5+** topics here as undecided. **Superseded** by monolith **§15–§17** (**L5-PROG-A1=C**, **L5-PROG-A2=C**, **L5-A1…L5-A10**, **L5-N1/N2** — [DECISIONS.md](DECISIONS.md), 2026-10-09). Do **not** use this subsection for new L5 planning.
