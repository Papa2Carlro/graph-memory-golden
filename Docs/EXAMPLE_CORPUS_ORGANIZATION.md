# Example Corpus Organization — Canonical Reference

**Status:** CANONICAL (Example repository)  
**Scope:** `graph-memory-example` — reference corpus layout, level taxonomy, and target registry.  
**Non-scope:** Language/compiler/runtime implementation; automated test suites; owner decisions recorded in `graph-memory-language`.

---

## 1. Purpose / role of the Example corpus

The **Graph Memory Example** repository is an **evolving reference corpus** of real, small Graph Script (`.gs`) programs used as ecosystem specimens.

- It is **not** a test suite.
- It is **not** a collection of synthetic fixtures whose primary job is to pass CI.
- Programs are **reference targets**: they express intended language usage, algorithmic shapes, and corpus evolution over time.
- Implementation or parser/runtime gaps **do not cancel** a target whose semantics are honestly defined on the canonical language surface; they are tracked separately (see `Docs/CANONICAL_TARGET_AUDIT_FINDINGS.md`).

---

## 2. Level taxonomy (Classic programs)

**LOC ranges are orientation only**, not hard gates. Qualitative structure dominates classification.

| Level | Approx. LOC (orientation) | Qualitative boundary |
| ----- | ------------------------- | -------------------- |
| **L1** | ~10–40 | Single-file; **one dominant algorithmic genre**; 1–2 core functions; one main pass or compact construct; 0–1 helper without deep composition; **local** invariant; may include one sentinel-like edge case. |
| **L2** | ~100–150 | First **composition jump**: 3+ meaningful **dependent** helpers; 2–3 **related phases**; **shared state / invariant**; composition of several L1 primitives; deeper control flow; **without** full divide-and-conquer / DP machinery (that is L3). |
| **L3** | ~200–300+ (or equivalent complexity) | D&C recursion; partition/rebuild machinery; DP tables; deeper multi-level state interaction. A **short** program with full L3 machinery remains **L3**. A **long** program without L2/L3 composition does **not** become L2 automatically. |
| **L4** | ~150–280+ (orientation) | **Complex single-file**: one `.gs` per reference program; **≥2 cooperating algorithmic components**; **shared state or intermediate artifacts** between phases; **explicit cross-phase invariants**; **one coherent end-to-end problem**; qualitative complexity increase over L3 (not merely more LOC). |
| **L5+** | (hypothetical) | **Not decided.** Multi-file / modular programs may be a future corpus stage; no filesystem, module layout, or manifest rules are defined here (see §8.6). |

---

## 3. Corpus filesystem layout (owner decision)

**Status:** OWNER-DECIDED (Example repository)

| Corpus level | On-disk path |
| ------------ | ------------ |
| **L1** | `programs/01-classical/` |
| **L2** | `programs/02-composition/` |
| **L3** | `programs/03-advanced/` |
| **L4** | `programs/04-complex/*.gs` |

Canonical tree (current and intended):

```text
programs/
├── 01-classical/
│   ├── numbers/
│   ├── collections/
│   └── strings/
├── 02-composition/
├── 03-advanced/
└── 04-complex/            # flat; one landed L4 program = one .gs file
```

- **`programs/01-classical/`** is the **L1** corpus. Existing domain folders (**numbers/**, **collections/**, **strings/**) stay as they are; this slice does **not** move or rename L1 files.
- **`programs/02-composition/`** is the **L2** corpus root. L2 programs are **physically separated** from L1.
- **`programs/03-advanced/`** is the **L3** corpus root for single-file L3 reference programs. Initial layout is **flat** (no domain subdirectories under `03-advanced/` at this stage).
- **L2 domain subdirectories** under `02-composition/` (if ever needed) are **OPEN** — not defined in this document; do not invent them until an owner decision lands them.
- **L3 domain subdirectories** under `03-advanced/` are **OPEN** — not introduced in this owner decision; do not invent them until a future owner decision lands them.
- **`programs/04-complex/`** is the **L4** corpus root (**DECIDED**). Layout is **flat**: each landed L4 reference program is a single `.gs` file at `programs/04-complex/<filename>.gs` (see §8.4).

Landed L2 `.gs` files from the queue below belong under `programs/02-composition/` (filename as registered; no extra path segments until domain dirs are decided). Landed L3 `.gs` files belong under `programs/03-advanced/` (flat; filename as registered in §8). Landed L4 programs belong under `programs/04-complex/` (flat; filename as registered in §8.4).

---

## 4. Current corpus status

| Item | State |
| ---- | ----- |
| Repository role | Reference corpus (this document) |
| L1 on-disk programs | `programs/01-classical/` — **numbers/**, **collections/**, **strings/** |
| L2 on-disk path | `programs/02-composition/` (flat layout; no domain subdirs yet) |
| Program count (L1 bucket) | **34** single-file `.gs` programs (as of registry creation) |
| Level 2 programs on disk | **4** landed under `programs/02-composition/`: `sieve_primes_to_limit.gs`, `merge_overlapping_intervals.gs`, `run_length_encode.gs`, `mode_element_two_pass.gs` |
| L3 on-disk path | `programs/03-advanced/` (flat layout; no L3 domain subdirectories) |
| Level 3 programs on disk | **3** landed under `programs/03-advanced/`: `mergesort_recursive.gs`, `levenshtein.gs`, `quicksort_partition.gs` (see §8) |
| L4 on-disk path | `programs/04-complex/*.gs` (**DECIDED**; see §3, §8.4) |
| Level 4 programs on disk | **1** landed under `programs/04-complex/`: `parse_decimal_strict.gs` (L4.1; see §8.4) |
| L4 target queue | **5** entries — **CONFIRMED** order (§8.4); **1 landed**, **4 not landed**; owner decision to progress through all five |

---

## 5. L1 saturation status

Level **1** is treated as **saturated / representative** for the current Classical slice: the existing 34 programs under `programs/01-classical/` cover the intended L1 algorithmic shapes without requiring reclassification or rewrites in this registry slice.

`programs/01-classical/` is the **canonical L1 corpus location** per §3. Whether future L1 additions still land only there is **not** decided here.

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

Level **3** is treated as **saturated** for the current slice: the three landed programs under `programs/03-advanced/` cover the intended orthogonal L3 mechanisms — **merge-style recursive D&C**, **pivot partition/rebuild**, and **tabular DP**. Remaining `knapsack.gs` would add another DP recurrence but **no missing top-level L3 mechanism** from §2 and is **not** a prerequisite for L4. Additional L3 `.gs` files are **not** required unless a future owner/registry slice adds them.

### 8.4 L4 path, landed programs, and target queue

**Registry distinction:** **landed** means a single `.gs` exists on disk at `programs/04-complex/<filename>.gs` (see §4). **Queued** entries are approved targets not yet on disk. **Queued ≠ landed.**

| Item | Status |
| ---- | ------ |
| L4 qualitative model | **DECIDED** — Complex single-file (§2) |
| L4 filesystem / path | **DECIDED** — `programs/04-complex/*.gs` (flat; §3) |
| L4 corpus progression | **DECIDED** — owner intends to land **all five** queue entries below (none required for L3 completion) |
| L4 queue sequence | **CONFIRMED** — order in table below |
| L4 saturation | **reviewed** — five-program **CONFIRMED** queue **complete** on disk; **not** declared **SATURATED** (§8.4.3) |

#### 8.4.1 L4 landed registry

| Filename | Status | Structural role (reference) |
| -------- | ------ | --------------------------- |
| `parse_decimal_strict.gs` | **LANDED** — `programs/04-complex/parse_decimal_strict.gs` (**L4.1**) | Strict decimal string → `Int?`; lexical validation; digit accumulation with overflow guard; sign handling; `null` for invalid input; signed `Int{64}` boundaries including leading-zero `INT_MIN` lexeme |
| `rle_roundtrip.gs` | **LANDED** — `programs/04-complex/rle_roundtrip.gs` (**L4.2**; **221** LOC) | RLE encode → `validate_encoded_rle` → `decode_rle` → roundtrip verify; parallel `[Char]` / `[Int]` encoded form; decoder writes **`[Char]`**, not `String`; roundtrip via Unicode scalar equivalence to source `String` |
| `n_queens_backtrack.gs` | **LANDED** — `programs/04-complex/n_queens_backtrack.gs` (**L4.3**; **116** LOC) | N×N queens: recursive backtracking with constraint checks; shared mutable `board: [Int]` (`board[row]` = column or **`-1`**); `.set(row, col)` placement and `.set(row, -1)` restoration |
| `bfs_shortest_path_flat.gs` | **LANDED** — `programs/04-complex/bfs_shortest_path_flat.gs` (**L4.4**; **352** LOC) | Unweighted shortest path on flat directed adjacency `adjacency[u*n+v]` ∈ {0,1}; BFS with head-index FIFO queue; shared mutable `visited` / `distance` / `predecessor`; predecessor path reconstruction → `[Int]?` |
| `shunting_yard_eval.gs` | **LANDED** — `programs/04-complex/shunting_yard_eval.gs` (**L4.5**; **556** LOC) | Infix arithmetic: lex → grammar validation → shunting-yard → postfix eval; parallel token `kinds` / `values`; `evaluate_expression` → `Int?`; program-local `*_int64` guards |

**L4.1 acceptance (corpus-organization):** **SOURCE-LEVEL ACCEPTED** — reference target on canonical GS surface. **RUNTIME NOT VERIFIED** in this registry slice.

**L4.1 pipeline (landed specimen):** lexical validation → sign / digit-run handling → bounded accumulation → `apply_sign` → orchestration via `parse_decimal_strict`.

**L4.1 validation record (honest):** `parse_decimal_strict_verify() -> Bool` `parse_decimal_strict_sample` demonstrates parsing only — prior golden cases plus **seven** signed `Int{64}` boundary cases (max, max+1, min, min−1, leading-zero variants). Verification is **source-level** (specimen + sample wiring); **not** end-to-end compiler/runtime execution.

`parse_decimal_strict.gs` was the **first** L4 target in the **CONFIRMED** queue (historical selection only).

**L4.2 acceptance (corpus-organization):** **LANDED**; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED**. This registry slice does **not** claim that the GS program was compiled or executed end-to-end.

**L4.2 pipeline (landed specimen):** encode (`rle_encode`) → validate (`validate_encoded_rle`) → decode (`decode_rle`) → verify (`rle_roundtrip_verified` / `text_equals_chars`).

**L4.2 representation:** encoded runs as parallel **`[Char]`** (run symbols) and **`[Int]`** (run lengths). **`decode_rle`** appends decoded scalars into an output **`[Char]`** buffer; it does **not** return or construct a **`String`**.

**L4.2 encoded invariants (`validate_encoded_rle`):** `chars.count()` equals `lens.count()`; every run length is **positive**; adjacent runs use **distinct** `Char` values; sum of run lengths equals the decoded scalar count implied by a valid roundtrip (and matches the original `String` scalar count on success).

**L4.2 rejection:** invalid encodings (count mismatch, zero/negative length, adjacent duplicate runs) are rejected **before** decode proceeds (`validate_encoded_rle`; `decode_rle` returns false when validation fails).

**L4.2 validation record (honest):** `rle_roundtrip_verify() -> Bool` `rle_roundtrip_sample` demonstrates encode/decode only — golden roundtrips: empty, singleton (`"a"`), repeated (`"aaaa"`), alternating (`"abc"`), mixed runs (`"aabbbcc"`, `"aaabbbaa"`); negative validation: count mismatch, zero length, negative length, adjacent duplicate; decode guard on invalid input; Unicode scalar roundtrip **`"aπb"`**. Verification is **source-level** (specimen + sample wiring); **not** end-to-end compiler/runtime execution.

**Language gap (corpus honesty, not an owner decision):** Canonical construction of `String` from `[Char]` remains **OPEN**. L4.2 verifies Unicode scalar equivalence without claiming that `decode_rle` returns `String`.

`rle_roundtrip.gs` was the **second** L4 target in the **CONFIRMED** queue (historical selection only).

**L4.3 acceptance (corpus-organization):** **LANDED**; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED**. This registry slice does **not** claim that the GS program was compiled or executed end-to-end, and does **not** claim that golden cases passed at runtime.

**L4.3 pipeline (landed specimen):** board initialization (`init_n_queens_board`) → candidate placement and constraint validation (`queens_safe_at`) → recursive search (`queens_search_from_row`) → state restoration (backtrack via `.set(row, -1)`) → solution counting (`count_n_queens_solutions`) → sample verification (`n_queens_backtrack_sample`).

**L4.3 representation:** flat **`board: [Int]`** of length `n`; **`board[row]`** is the queen column for that row, or **`-1`** when unassigned. No matrix, map, or auxiliary set types.

**L4.3 constraints (`queens_safe_at`):** for a candidate `(row, col)`, reject same column as any prior row and reject diagonal conflicts against rows `0..row-1` (unique column and non-conflicting diagonals among assigned rows).

**L4.3 mutation and backtracking:** shared board mutated in place with **`board.set(row, col)`** before recursion; after exploring each column, **`board.set(row, -1)`** restores the row. Board is passed by reference through recursive calls (no per-call board copy).

**L4.3 counting contract (program-specific, DECIDED — not a global GS rule):** `count_n_queens_solutions(n: Int) -> Int?` — **`n < 0` → `null`**; **`n = 0` → `1`** (empty-board convention); **`n > 0` →** count of valid complete placements.

**L4.3 validation record (honest):** `n_queens_backtrack_verify() -> Bool` `n_queens_backtrack_sample` demonstrates search only — golden solution counts for **N = 0…8** (0→1, 1→1, 2→0, 3→0, 4→2, 5→10, 6→4, 7→40, 8→92); negative-**N** expects **`null`** for `n = -1`; restoration via `search_restores_board` for **N = 4** and **N = 8**. Verification is **source-level** (specimen + sample wiring); **not** end-to-end compiler/runtime execution.

`n_queens_backtrack.gs` was the **third** L4 target in the **CONFIRMED** queue (historical selection only).

**L4.4 acceptance (corpus-organization):** **LANDED**; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED**. This registry slice does **not** claim that the GS program was compiled or executed end-to-end, and does **not** claim that golden cases passed at runtime.

**L4.4 pipeline (landed specimen):** graph representation (flat `n × n` adjacency) → input validation (`bfs_input_valid`) → BFS traversal (`run_bfs_flat`) → shared `visited` / `distance` / `predecessor` state → path reconstruction (`reconstruct_shortest_path`) → sample verification (`bfs_shortest_path_flat_sample`).

**L4.4 representation:** directed graph as **`adjacency: [Int]`** with **`adjacency.count() == n * n`**; cell **`adjacency[u * n + v]`** is **`1`** (edge **u → v**) or **`0`** (no edge). **`queue: [Int]`** with **head-index** dequeue (no front removal). **`visited: [Bool]`**, **`distance: [Int]`** (unvisited **`-1`**), **`predecessor: [Int]`** (missing **`-1`**).

**L4.4 traversal:** FIFO by advancing queue head; neighbors inspected in **ascending** vertex order; first discovery sets **`distance[v] = distance[u] + 1`** and **`predecessor[v] = u`** (deterministic tie-breaking for equal-length paths).

**L4.4 reconstruction:** walk predecessor links from target toward source, reverse into **`[Int]`** from source to target; no sentinel **`-1`** in the returned path.

**L4.4 path invariants (reference intent):** each vertex discovered at most once; reconstructed path starts at source and ends at target; consecutive vertices correspond to directed edges with cell **`1`**; edge count equals BFS distance when reachable.

**L4.4 input/output contract (program-specific, owner decision A1=C — DECIDED — not a global GS rule):**

- **`bfs_input_valid(adjacency, n, source, target) -> Bool`** — shape (`n >= 0`, `n × n` matrix), vertex indices in range, and **binary** matrix cells (**`0`** or **`1`** only).
- **`bfs_shortest_path_flat(n, adjacency, source, target) -> [Int]?`** — calls the same validation; on failure returns **`null`**.
- **Invalid input:** **`bfs_input_valid` → false**; BFS → **`null`** (caller must check validation first to distinguish from unreachable).
- **Valid but unreachable target:** **`bfs_input_valid` → true**; BFS → **`null`**.
- **Valid and reachable:** **`bfs_input_valid` → true**; BFS → path **`[Int]`** from source to target.
- **`source == target`:** singleton path **`[source]`** when input is valid.

**Two-call distinction (A1=C):** callers that need to separate **invalid input** from **unreachable** must consult **`bfs_input_valid`** before interpreting a **`null`** path from **`bfs_shortest_path_flat`**.

**L4.4 validation record (honest):** `bfs_shortest_path_flat_verify() -> Bool` `bfs_shortest_path_flat_sample` demonstrates BFS only — direct edge, multi-hop chain, deterministic diamond tie (`[0, 1, 3]`), unreachable with valid input, `source == target`, directed asymmetry, invalid indices, invalid adjacency shape, empty **`n = 0`** graph with invalid indices, non-binary cells (**`2`**, **`-1`**); path edge-count and directed-edge checks on a chain specimen. Verification is **source-level** (specimen + sample wiring); **not** end-to-end compiler/runtime execution.

**Language-contract verification gaps (corpus honesty):** optional collection **`[Int]?`** and mutable **`[Bool]`** with **`.set`** are used on the canonical GS surface in this specimen; they are **not** claimed verified by current compiler/runtime in this registry slice.

`bfs_shortest_path_flat.gs` was the **fourth** L4 target in the **CONFIRMED** queue (historical selection only).

**L4.5 acceptance (corpus-organization):** **LANDED**; **SOURCE-LEVEL ACCEPTED** (post–closure audit, this registry slice); **RUNTIME NOT VERIFIED**. This registry slice does **not** claim compiler/runtime execution or golden-case runtime pass.

**L4.5 pipeline (landed specimen):** lexical analysis (`lex_expression`) → token grammar validation (`validate_token_stream`) → infix-to-postfix (`shunting_yard`) → postfix evaluation (`eval_postfix`) → orchestration (`evaluate_expression`) → sample (`shunting_yard_eval_sample`).

**L4.5 grammar (initial target, program-specific):** binary `+` `-` `*` `/`; parentheses; non-negative **ASCII_DIGIT+** integer literals; ASCII **space** whitespace; **no unary** `+`/`-`. Rejects empty input, malformed operators/parentheses, implicit multiplication, invalid characters.

**L4.5 token representation:** parallel **`kinds: [Int]`** and **`values: [Int]`** (INTEGER, OPERATOR, LEFT_PAREN, RIGHT_PAREN); postfix stream uses the same parallel shape without parentheses.

**L4.5 shunting-yard:** operator stack with parenthesis marker; precedence `*/` > `+-`; **left-associative** pop rule (`>=`); deterministic infix order preserved in postfix output.

**L4.5 arithmetic (program-local guards — not global GS overflow law):** `add_int64`, `sub_int64`, `mul_int64`, `div_int64` gate **`null`** on overflow, divide-by-zero, and **`INT_MIN / -1`**. **`mul_int64`** overflow checks use **`mul_pos_would_overflow`** with **`Int / Int` only when both operands are strictly positive** (unambiguous trunc-toward-zero for the specimen); magnitudes for negative factors come from **`sub_int64(0, ·)`** and explicit **`INT_MIN`** / **`-1`** special cases — **no** mixed-sign division in guards. **`div_int64`** still applies surface **`/`** only after guards; goldens use **exact** positive divisions only. Integer literals reuse L4.1-style **Int{64}** magnitude overflow checks during lex (`magnitude_would_overflow` / `parse_uint_lexeme`).

**L4.5 result contract:** **`evaluate_expression(text: String) -> Int?`** — invalid lex/grammar/shunting/eval → **`null`**; success → **`Int`**.

**L4.5 validation record (honest):** `shunting_yard_eval_verify() -> Bool` `shunting_yard_eval_sample` demonstrates evaluation only — precedence, left associativity, nested parentheses, whitespace, multi-digit literals, negative **results** via subtraction (`3-5`), division by zero, malformed/unary/implicit-mul cases; **Int{64}** max literal, lex overflow literal, add/mul overflow rejection; **multiply sign-quadrant** goldens (`12*34`, `(0-25)*4`, `4*(0-25)`, `(0-6)*(0-7)`); **zero** multiplication; **`INT_MAX*1`**, **`INT_MIN*1`** via subtraction-built **`INT_MIN`**; reject **`INT_MIN*2`**, **`INT_MIN*(0-1)`**, **`INT_MAX*INT_MAX`**. Verification is **source-level** only.

**L4.5 verification readiness (tooling, 2026-10-09):** declared **`requires-python >= 3.12`** (`graph-memory-language/pyproject.toml`); default **`python3`** on host was **3.9.6** (environment mismatch). **`python3.12`** imports **`GSParser`** successfully; **parse** outcomes on Example specimens are recorded in §8.4.1 **parser slice** below — **not** runtime execution.

**Known semantic gaps (corpus honesty):**

- **GS `Int / Int` rounding/truncation** — **OPEN** in normative language contracts (`GS_V0_1_TYPE_SYSTEM.md`: arithmetic overflow **`DEFERRED_TO_VM_ERROR_MODEL`**). L4.5 **`div_int64`** still uses surface **`/`** after divide-by-zero and **`INT_MIN / -1`** guards; **no** golden depends on disputed **negative non-exact** division rounding.
- **Global GS checked arithmetic** — **not** normatively closed; L4.5 guards are **specimen-local** policy aligned with L4.1 magnitude bounds, not a language owner decision.
- **Parser vs corpus surface:** **`GSParser`** (Python **3.12**) may still reject specimens that use **`[Int]`** types, **`Int?`**, **`0..n` each**, or other **ahead-of-parser** surface — classify as **parser/surface gap**, not specimen arithmetic defect.

`shunting_yard_eval.gs` was the **fifth** L4 target in the **CONFIRMED** queue (historical selection only).

#### 8.4.2 L4 target queue (CONFIRMED order)

| ID | Program | Status |
| --- | --- | --- |
| **L4-01** | `parse_decimal_strict.gs` | **LANDED** — see §8.4.1 |
| **L4-02** | `rle_roundtrip.gs` | **LANDED** — see §8.4.1 (L4.2) |
| **L4-03** | `n_queens_backtrack.gs` | **LANDED** — see §8.4.1 (L4.3) |
| **L4-04** | `bfs_shortest_path_flat.gs` | **LANDED** — see §8.4.1 (L4.4) |
| **L4-05** | `shunting_yard_eval.gs` | **LANDED** — see §8.4.1 (L4.5) |

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

**Residual weaknesses / gaps:** no landed specimen for **module/multi-file** composition (**multi-file** composition (deferred §8.6); **runtime-verified** L4 behavior **not** established; **OPEN** language gaps (**`String` from `[Char]`**, **`Int / Int` semantics**, optional collections) remain; **knapsack.gs**-class L3 reserve unused; no second graph or second parser specimen within L4.

**L4.6 need:** **not evidenced** as required for the current **CONFIRMED** queue goal. A future **L4.6+** slot would be an **owner/registry** decision (e.g. second graph algorithm, Unicode-heavy lexer, or module-ready split) — **not** automatic because five programs landed.

**SATURATED verdict (this slice):** **Withhold.** Landing all five **CONFIRMED** targets completes the **approved queue** but does **not**, by itself, justify an **L4 SATURATED** label comparable to L2/L3 without owner review of residual gaps above.

**Owner decision surface (optional follow-up):** Whether to declare **L4 SATURATED** after queue completion.

| Option | Summary | Pros | Cons |
| ------ | ------- | ---- | ---- |
| **A — SATURATED now** | Close L4 like L2/L3 after five landed | Clear milestone; matches queue intent | Overstates runtime proof; ignores OPEN language gaps |
| **B — SATURATED after runtime slice** | Keep **not SATURATED** until compile/run spot-check | Honest vs implementation | Delayed closure; needs tooling |
| **C — Extend queue (L4.6+)** | Add targets before saturation | Fills graph/module gaps | Scope creep without owner priorities |

**Recommendation (corpus-organization only):** **B** — treat queue completion as **landed**, not **saturated**, until a future owner slice explicitly accepts residual gaps or extends the queue.

### 8.5 Superseded historical L4 direction (multi-file)

A prior registry slice selected **multi-file** L4 under `programs/04-modular/parse_decimal_strict/*.gs` (lexical / parse / orchestration split across module units). That direction is **superseded** and is **not** the active L4 target.

**Historical context only:** that selection motivated early module/import evidence gathering in `graph-memory-language`; Example corpus L4 no longer uses multi-file layout.

**Active L4 specimen for `parse_decimal_strict`:** **landed** — `programs/04-complex/parse_decimal_strict.gs` (§8.4.1).

### 8.6 Hypothetical L5+ (multi-file — not decided)

Multi-file structured programs may become a **future** corpus stage **after** L4 complex single-file. **Nothing** about L5+ is decided in this document:

- level naming or numbering beyond “L5+”
- on-disk directory or filesystem layout
- correspondence between files and logical modules
- `module` / `use` / import surface in Example specimens
- `Graph.toml` or other manifest
- assembly or project compile mechanism for Example programs

Do not author L5+ paths or module graphs in the Example repository until a future owner/registry slice closes those decisions.

---

## 9. Target registry ≠ test suite

The L2/L3/L4 **target registry** names intended reference programs and order of work. It does **not** define automated tests, pass/fail criteria, or CI obligations. Example remains a **reference corpus**, not a test harness.

---

## 10. OPEN — proposed target → landed `.gs`

The workflow and conventions for moving a target from **planned/proposed** to an **on-disk** `.gs` file (review steps, naming on disk, status updates) are **OPEN**. This document registers targets only; it does not define the landing process.

**Also OPEN (not decided here):** target → landed workflow; automatic status machinery for registry rows; all **L5+** multi-file topics (§8.6).

---

## 11. Reference targets vs implementation gaps

A program remains a **valid reference target** when its intended semantics are defined on the **canonical Graph Script surface**, even if the current parser, semantic layer, or runtime cannot compile or execute it yet.

- Track implementation gaps in audit/supporting docs (e.g. `Docs/CANONICAL_TARGET_AUDIT_FINDINGS.md`), not by removing or demoting targets from this registry.
- **Language** “L1/L2” wording in `graph-memory-language` docs (e.g. semantic research tiers) is **unrelated** to Example corpus **Level L1/L2** in this document.

---

## Related documents

| Document | Role |
| -------- | ---- |
| `Docs/CANONICAL_TARGET_AUDIT_FINDINGS.md` | Supporting **audit record** (implementation gaps); not corpus level SoT |
| `README.md` | High-level introduction; defer level/queue detail to **this file** |
