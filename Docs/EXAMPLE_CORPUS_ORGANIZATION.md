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
| **L5** | (varies by project) | **Multi-file project system** — logical modules, `use` / `pub use`, visibility, namespaces, manifest, staged packages and dependency expectations; one golden **project** per directory under `programs/05-modular/<project>/` (§15). **Not SATURATED.** |

---

## 3. Corpus filesystem layout (owner decision)

**Status:** OWNER-DECIDED (Example repository)

| Corpus level | On-disk path |
| ------------ | ------------ |
| **L1** | `programs/01-classical/` |
| **L2** | `programs/02-composition/` |
| **L3** | `programs/03-advanced/` |
| **L4** | `programs/04-complex/*.gs` |
| **L5** | `programs/05-modular/<project>/` (**DECIDED** — §15) |

Canonical tree (current and intended):

```text
programs/
├── 01-classical/
│   ├── numbers/
│   ├── collections/
│   └── strings/
├── 02-composition/
├── 03-advanced/
├── 04-complex/            # flat; one landed L4 program = one .gs file
└── 05-modular/            # L5 golden projects (§15–§16)
    ├── <project>/         # positive (valid) specimens — L5-A10=A
    ├── negative/
    │   └── <project>/     # compile-time error specimens — **L5-N1=B**
    └── warnings/
        └── <project>/     # warning-only specimens — **L5-N1=B**
```

Positive project directory (when manifest in scope):

```text
programs/05-modular/<project>/
├── Graph.toml             # when manifest coverage is in scope
├── Graph.lock             # when dependency resolution coverage is in scope
└── …                      # .gs / .gq / .gschema / .gi per project spec
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
| Level 4 programs on disk | **5** landed / **5** selected under `programs/04-complex/`: `parse_decimal_strict.gs` (**L4.1**), `rle_roundtrip.gs` (**L4.2**), `n_queens_backtrack.gs` (**L4.3**), `bfs_shortest_path_flat.gs` (**L4.4**), `shunting_yard_eval.gs` (**L4.5**); see §8.4 |
| L4 target queue | **5** entries — **CONFIRMED** order (§8.4); **all five landed** (**L4.1**–**L4.5**); approved queue **complete** on disk (§8.4.2–§8.4.3) |
| L4 saturation | **SATURATION PENDING** — queue **5/5** complete; specimens **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** (§8.4.3; not **SATURATED**) |
| L5 on-disk path | Positive: `programs/05-modular/<project>/` (**L5-A10=A**); errors: `programs/05-modular/negative/<project>/` (**L5-N1=B**); warnings: `programs/05-modular/warnings/<project>/` (**L5-N1=B**); §15 |
| Level 5 golden projects (valid) | **5** landed — **L5.1**–**L5.5** under `programs/05-modular/<project>/` |
| Level 5 golden projects (invalid) | **1** landed — **L5.9** `negative/cycle_import_bad/` (**SOURCE-LEVEL NEGATIVE**; must **not** compile per #22.31) |
| L5 charter / queue | **CHARTER DECIDED** (§15); **queue** per §16; diagnostic contract **L5-N2=B** |
| L5 program-level direction | **DECIDED** — owner **A1=C** (L5 multi-file next level), **A2=C** (complete project system — staged coverage, not first-project requirement) |

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

**L4.1 validation record (honest):** `parse_decimal_strict_verify() -> Bool` aggregates wired checks (§11); `parse_decimal_strict_sample` demonstrates parsing only — prior golden cases plus **seven** signed `Int{64}` boundary cases (max, max+1, min, min−1, leading-zero variants). Verification is **source-level** (specimen + sample wiring); **not** end-to-end compiler/runtime execution.

`parse_decimal_strict.gs` was the **first** L4 target in the **CONFIRMED** queue (historical selection only).

**L4.2 acceptance (corpus-organization):** **LANDED**; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED**. This registry slice does **not** claim that the GS program was compiled or executed end-to-end.

**L4.2 pipeline (landed specimen):** encode (`rle_encode`) → validate (`validate_encoded_rle`) → decode (`decode_rle`) → verify (`rle_roundtrip_verified` / `text_equals_chars`).

**L4.2 representation:** encoded runs as parallel **`[Char]`** (run symbols) and **`[Int]`** (run lengths). **`decode_rle`** appends decoded scalars into an output **`[Char]`** buffer; it does **not** return or construct a **`String`**.

**L4.2 encoded invariants (`validate_encoded_rle`):** `chars.count()` equals `lens.count()`; every run length is **positive**; adjacent runs use **distinct** `Char` values; sum of run lengths equals the decoded scalar count implied by a valid roundtrip (and matches the original `String` scalar count on success).

**L4.2 rejection:** invalid encodings (count mismatch, zero/negative length, adjacent duplicate runs) are rejected **before** decode proceeds (`validate_encoded_rle`; `decode_rle` returns false when validation fails).

**L4.2 validation record (honest):** `rle_roundtrip_verify() -> Bool` aggregates wired checks (§11); `rle_roundtrip_sample` demonstrates encode/decode only — golden roundtrips: empty, singleton (`"a"`), repeated (`"aaaa"`), alternating (`"abc"`), mixed runs (`"aabbbcc"`, `"aaabbbaa"`); negative validation: count mismatch, zero length, negative length, adjacent duplicate; decode guard on invalid input; Unicode scalar roundtrip **`"aπb"`**. Verification is **source-level** (specimen + sample wiring); **not** end-to-end compiler/runtime execution.

**Language gap (corpus honesty, not an owner decision):** Canonical construction of `String` from `[Char]` remains **OPEN**. L4.2 verifies Unicode scalar equivalence without claiming that `decode_rle` returns `String`.

`rle_roundtrip.gs` was the **second** L4 target in the **CONFIRMED** queue (historical selection only).

**L4.3 acceptance (corpus-organization):** **LANDED**; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED**. This registry slice does **not** claim that the GS program was compiled or executed end-to-end, and does **not** claim that golden cases passed at runtime.

**L4.3 pipeline (landed specimen):** board initialization (`init_n_queens_board`) → candidate placement and constraint validation (`queens_safe_at`) → recursive search (`queens_search_from_row`) → state restoration (backtrack via `.set(row, -1)`) → solution counting (`count_n_queens_solutions`) → sample verification (`n_queens_backtrack_sample`).

**L4.3 representation:** flat **`board: [Int]`** of length `n`; **`board[row]`** is the queen column for that row, or **`-1`** when unassigned. No matrix, map, or auxiliary set types.

**L4.3 constraints (`queens_safe_at`):** for a candidate `(row, col)`, reject same column as any prior row and reject diagonal conflicts against rows `0..row-1` (unique column and non-conflicting diagonals among assigned rows).

**L4.3 mutation and backtracking:** shared board mutated in place with **`board.set(row, col)`** before recursion; after exploring each column, **`board.set(row, -1)`** restores the row. Board is passed by reference through recursive calls (no per-call board copy).

**L4.3 counting contract (program-specific, DECIDED — not a global GS rule):** `count_n_queens_solutions(n: Int) -> Int?` — **`n < 0` → `null`**; **`n = 0` → `1`** (empty-board convention); **`n > 0` →** count of valid complete placements.

**L4.3 validation record (honest):** `n_queens_backtrack_verify() -> Bool` aggregates wired checks (§11); `n_queens_backtrack_sample` demonstrates search only — golden solution counts for **N = 0…8** (0→1, 1→1, 2→0, 3→0, 4→2, 5→10, 6→4, 7→40, 8→92); negative-**N** expects **`null`** for `n = -1`; restoration via `search_restores_board` for **N = 4** and **N = 8**. Verification is **source-level** (specimen + sample wiring); **not** end-to-end compiler/runtime execution.

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

**L4.4 validation record (honest):** `bfs_shortest_path_flat_verify() -> Bool` aggregates wired checks (§11); `bfs_shortest_path_flat_sample` demonstrates BFS only — direct edge, multi-hop chain, deterministic diamond tie (`[0, 1, 3]`), unreachable with valid input, `source == target`, directed asymmetry, invalid indices, invalid adjacency shape, empty **`n = 0`** graph with invalid indices, non-binary cells (**`2`**, **`-1`**); path edge-count and directed-edge checks on a chain specimen. Verification is **source-level** (specimen + sample wiring); **not** end-to-end compiler/runtime execution.

**Language-contract verification gaps (corpus honesty):** optional collection **`[Int]?`** and mutable **`[Bool]`** with **`.set`** are used on the canonical GS surface in this specimen; they are **not** claimed verified by current compiler/runtime in this registry slice.

`bfs_shortest_path_flat.gs` was the **fourth** L4 target in the **CONFIRMED** queue (historical selection only).

**L4.5 acceptance (corpus-organization):** **LANDED**; **SOURCE-LEVEL ACCEPTED** (post–closure audit, this registry slice); **RUNTIME NOT VERIFIED**. This registry slice does **not** claim compiler/runtime execution or golden-case runtime pass.

**L4.5 pipeline (landed specimen):** lexical analysis (`lex_expression`) → token grammar validation (`validate_token_stream`) → infix-to-postfix (`shunting_yard`) → postfix evaluation (`eval_postfix`) → orchestration (`evaluate_expression`) → sample (`shunting_yard_eval_sample`).

**L4.5 grammar (initial target, program-specific):** binary `+` `-` `*` `/`; parentheses; non-negative **ASCII_DIGIT+** integer literals; ASCII **space** whitespace; **no unary** `+`/`-`. Rejects empty input, malformed operators/parentheses, implicit multiplication, invalid characters.

**L4.5 token representation:** parallel **`kinds: [Int]`** and **`values: [Int]`** (INTEGER, OPERATOR, LEFT_PAREN, RIGHT_PAREN); postfix stream uses the same parallel shape without parentheses.

**L4.5 shunting-yard:** operator stack with parenthesis marker; precedence `*/` > `+-`; **left-associative** pop rule (`>=`); deterministic infix order preserved in postfix output.

**L4.5 arithmetic (program-local guards — not global GS overflow law):** `add_int64`, `sub_int64`, `mul_int64`, `div_int64` gate **`null`** on overflow, divide-by-zero, and **`INT_MIN / -1`**. **`mul_int64`** overflow checks use **`mul_pos_would_overflow`** with **`Int / Int` only when both operands are strictly positive** (unambiguous trunc-toward-zero for the specimen); magnitudes for negative factors come from **`sub_int64(0, ·)`** and explicit **`INT_MIN`** / **`-1`** special cases — **no** mixed-sign division in guards. **`div_int64`** still applies surface **`/`** only after guards; goldens use **exact** positive divisions only. Integer literals reuse L4.1-style **Int{64}** magnitude overflow checks during lex (`magnitude_would_overflow` / `parse_uint_lexeme`).

**L4.5 result contract:** **`evaluate_expression(text: String) -> Int?`** — invalid lex/grammar/shunting/eval → **`null`**; success → **`Int`**.

**L4.5 validation record (honest):** `shunting_yard_eval_verify() -> Bool` aggregates wired checks (§11); `shunting_yard_eval_sample` demonstrates evaluation only — precedence, left associativity, nested parentheses, whitespace, multi-digit literals, negative **results** via subtraction (`3-5`), division by zero, malformed/unary/implicit-mul cases; **Int{64}** max literal, lex overflow literal, add/mul overflow rejection; **multiply sign-quadrant** goldens (`12*34`, `(0-25)*4`, `4*(0-25)`, `(0-6)*(0-7)`); **zero** multiplication; **`INT_MAX*1`**, **`INT_MIN*1`** via subtraction-built **`INT_MIN`**; reject **`INT_MIN*2`**, **`INT_MIN*(0-1)`**, **`INT_MAX*INT_MAX`**. Verification is **source-level** only.

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

**Residual weaknesses / gaps:** no landed specimen for **module/multi-file** composition (**L5** charter §15; queue §16); **runtime-verified** L4 behavior **not** established; **OPEN** language gaps (**`String` from `[Char]`**, **`Int / Int` semantics**, optional collections) remain; **knapsack.gs**-class L3 reserve unused; no second graph or second parser specimen within L4.

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

### 8.6 Superseded L5+ placeholder

Prior slices listed **hypothetical L5+** topics here as undecided. **Superseded** by **§15–§17** (owner decisions **A1=C**, **A2=C**, **L5-A1…L5-A10**, 2026-10-09). Do **not** use this subsection for new L5 planning.

---

## 9. Target registry ≠ test suite

The L2/L3/L4 **target registry** names intended reference programs and order of work. It does **not** define automated tests, pass/fail criteria, or CI obligations. Example remains a **reference corpus**, not a test harness.

---

## 10. OPEN — proposed target → landed `.gs`

The workflow and conventions for moving a target from **planned/proposed** to an **on-disk** `.gs` file (review steps, naming on disk, status updates) are **OPEN**. This document registers targets only; it does not define the landing process.

**Also OPEN (not decided here):** target → landed workflow; automatic status machinery for registry rows. **L5** charter and queue: **§15–§16** (not §8.6).

---

## 11. Entry, sample, and verify conventions (owner decisions)

**Status:** CANONICAL (Example repository — corpus style; not GS language entry-point law)

**Owner decisions (2026-10-09):** **A1=A** standalone call-as-statement; **A2=OPEN** (no explicit discard syntax); **A3=A** Bool aggregation via canonical `and` with eager check evaluation; **A4=C** (no `assert`/`expect` in GS v0.1); **A5=B** separate demonstration vs verification functions.

Normative GS rules for ignored call results and standalone invocations: `graph-memory-language` — `GS_V0_1_LANGUAGE_CORE.md` §13a.

### `*_sample` (demonstration)

- **Role:** demonstration entry; wires representative calls and may return an algorithm result (e.g. sorted array, parsed `Int`, path length).
- **Does not** mean automatic PASS or runtime verification success.
- May use **call-as-statement** for side effects or discarded `Int` results where the call’s value is not part of the demonstration return.

### `*_verify` (verification)

- **Signature:** `fn <program>_verify() -> Bool` (or equivalent per-file naming aligned with the specimen).
- **`true`:** every included check succeeded.
- **`false`:** at least one included check failed.
- **Eager evaluation:** each independent check is evaluated into its own `Bool` local **before** aggregation.
- **Aggregation:** combine locals with canonical **`and`** (short-circuit on aggregation only; checks are already computed).
- **Does not** replace an external test runner (**A4=C**).

### Anti-patterns

- Do **not** treat a trailing `ignored = okLast` assignment chain as aggregate success.
- Do **not** treat a demonstration `return` value as proof that all wired checks passed unless the function is explicitly `*_verify() -> Bool` and the caller interprets it.

---

## 12. Reference targets vs implementation gaps

A program remains a **valid reference target** when its intended semantics are defined on the **canonical Graph Script surface**, even if the current parser, semantic layer, or runtime cannot compile or execute it yet.

- Track implementation gaps in audit/supporting docs (e.g. `Docs/CANONICAL_TARGET_AUDIT_FINDINGS.md`), not by removing or demoting targets from this registry.
- **Language** “L1/L2” wording in `graph-memory-language` docs (e.g. semantic research tiers) is **unrelated** to Example corpus **Level L1/L2** in this document.

---

## 13. GS corpus ↔ GSParser compatibility (audit snapshot)

**Status:** AUDIT RECORD (Example repository — tooling alignment; not language SoT)
**Date:** 2026-10-09
**Tooling:** `graph-memory-language` `GSParser` (`PYTHONPATH=src`), **Python 3.12.13** per `pyproject.toml` (`requires-python >= 3.12`). Default host `python3` **3.9.x** is an **environment mismatch** (class **D**).

### Summary matrix

| Metric | Count (46 programs) |
| ------ | -------------------: |
| **GSParser PASS** | **0** |
| **Blocked by parser implementation gap (class A)** | **46** (every file; see dominant gap below) |
| **Blocked by lexer internal defect (class E)** | **1** additionally (`n_queens_backtrack.gs` — `SyntaxError` on blank line inside indented `each` body; see below) |
| **Proven Example noncanonical syntax (class B)** | **0** (no corpus rewrite performed) |
| **Compiler success on corpus sources** | **0** (parse stage fails first) |
| **Runtime verified** | **0** (unchanged — **RUNTIME NOT VERIFIED**) |

### Dominant failure classes (minimal reproduction verified)

| Class | Construct | Canonical ref | Parser behavior | Classification |
| ----- | --------- | ------------- | --------------- | -------------- |
| **A1** | `fn name(...) -> ReturnType {` | `GS_PARSER_CONTRACT_V0_1.md` §3.1 row 1; `GS_V0_1_RUNTIME_MODEL.md` §3 | Expects **`fn name(...) : ReturnType {`** (`declarations.py`); `->` tokenized as `-` then `>` → **FAIL** | **A** — valid GS, parser gap |
| **A2** | `[T]` parameters / returns (`[Int]`, `[Char]`, `Int?` in types) | `GS_PARSER_CONTRACT_V0_1.md` §3.1 rows 27–28; `GS_V0_1_TYPE_SYSTEM.md` | Return/param type parser accepts **single `IDENT` only** → **`[`** FAIL | **A** — valid GS, parser gap |
| **A3** | Multiline formal parameter lists | `GRAPH_LANGUAGE_COMMON_SYNTAX_V0_1.md` (shared layout) | `NEWLINE` after `(` in params → FAIL | **A** — valid GS, parser gap (`run_length_encode.gs` hits this **before** A1) |
| **E1** | Blank line inside indentation block | Shared indentation rules (`GRAPH_LANGUAGE_COMMON_SYNTAX_V0_1.md`) | Lexer treats blank line as **indent 0** → **Inconsistent indentation** (`lexer.py`) | **E** — lexer defect; **not** fixed in corpus (valid GS must not be rewritten to parser limits) |

**Note:** After retokenizing with workarounds for A1–A3, corpus constructs such as **`each` / ranges**, **`exists`**, **`is not`**, **standalone calls**, **`var` reassignment**, and **`Int?` locals** **do** parse in isolation (smoke snippets, Python 3.12). Failures on full files are dominated by **declaration-header** gaps, not by those statement forms alone.

### Per-level first-failure distribution (heuristic, first `fn` signature)

| Level | Files | Primary gap |
| ----- | ----: | ----------- |
| **L1** | 34 | **A2** (18) or **A1** (16) |
| **L2** | 4 | **A2** (2), **A3** (1), **A1** (1) |
| **L3** | 3 | **A2** (2), **A1** (1) |
| **L4** | 5 | **A1** (4), **E1** (1 — `n_queens_backtrack.gs`) |

### Blockers (honest)

1. **Parser `->` return type** vs canonical **`->`** (implementation uses **`:`**).
2. **Collection / optional type syntax** in annotations (`[T]`, `T?`) not parsed in headers.
3. **Multiline parameter lists** not accepted.
4. **Lexer blank-line / indent stack** interaction inside braced `fn` bodies with colon blocks (`n_queens_backtrack.gs`).
5. **OPEN language** items unchanged (e.g. global **`Int / Int`**, arithmetic overflow **`DEFERRED_TO_VM_ERROR_MODEL`**) — not Example syntax defects.

**L4.5 arithmetic (specimen-local):** `mul_int64` overflow guards use **`mul_pos_would_overflow`** (**positive / positive** `Int / Int` only) and **`sub_int64(0, ·)`** for magnitudes; **`INT_MIN`** / **`-1`** special-cased; final `*` / `/` remain surface operators after guards — see §8.4.1 L4.5.

---

## 15. L5 Project System Charter

**Status:** CANONICAL (Example repository — golden-standard roadmap; not GS language SoT)

**Owner decisions (2026-10-09):** Program **A1=C** (L5 multi-file next level), **A2=C** (complete project system — end-state scope, **staged** golden coverage). Foundation: **L5-A1=B**, **L5-A2=C**, **L5-A3=C**, **L5-A4=C**, **L5-A5=B**, **L5-A6=C**, **L5-A7=A**, **L5-A8=C**, **L5-A9=C**, **L5-A10=A**. Negative/warning layout: **L5-N1=B** (`negative/` vs `warnings/`). Expected diagnostic registry fields: **L5-N2=B** (category, severity, normative rule, location precision).

Normative GS module/import/project rules live in `graph-memory-language` (see §18). This charter defines **how the Example corpus** authors and registers L5 golden **projects**.

### 15.1 Purpose

Provide **reference multi-file Graph Script (and related surface) projects** that exercise the **project system** on the canonical language surface: modules, cross-file symbols, visibility, manifests, packages, and dependency expectations — without conflating corpus specimens with parser/compiler/runtime implementation.

### 15.2 Scope (staged, owner A2=C)

End-state **complete project system** coverage includes:

1. **Single-package** multi-module programs (`.gs` and related units).
2. **External packages** via `Graph.toml` dependencies and `use`.
3. **Cross-language unified logical modules** (`.gs` / `.gq` / `.gschema` / `.gi` sharing one `module` namespace per `UNIFIED_MODULE_SYMBOL_SPACE.md`).

**Staged delivery:** not every capability appears in **L5.1**. The golden queue (§16) orders projects by dependency and design gates.

### 15.3 Non-goals

- Parser, compiler, runtime, package manager, or dependency **resolver** implementation.
- Automated test harness or CI pass/fail for Example.
- Rewriting L1–L4 single-file specimens into L5 layout.
- Declaring **L5 SATURATED** in this charter slice.
- Inventing GS syntax not supported by language contracts (package visibility keywords, init lifecycle, etc.).

### 15.4 Canonical filesystem layout (L5-A10=A, L5-N1=B)

- **Positive (valid) specimens:** `programs/05-modular/<project>/` (**L5-A10=A**).
- **Compile-time error specimens:** `programs/05-modular/negative/<project>/` (**L5-N1=B**). Do **not** mix error and warning-only scenarios in one directory.
- **Warning-only specimens:** `programs/05-modular/warnings/<project>/` (**L5-N1=B**); e.g. **L5.10** `pub_use_cycle_warn`.
- **`<project>`** = stable golden project slug (kebab-case recommended; **not** module identity).
- Manifest and lockfiles, when in scope for that project, live **inside** the positive project directory (**L5-A5=B**). Negative/warning specimens omit manifest unless a future slice explicitly requires it.

### 15.5 Logical module identity (L5-A1=B)

- **Module identity** = explicit `module namespace.path` per compilation unit (**DECIDED** — `GS_MODULE_IMPORT_DECISIONS_V0_1.md` #22.2, #22.8, §B1).
- **Filesystem path does not define** module identity.
- **Example naming conventions (corpus-only, non-normative for GS):**
  - Prefer logical namespaces that reflect the project slug and role, e.g. `example.hello.main`, `example.hello.greet`.
  - File names may mirror role (`main.gs`, `greet.gs`) but are **not** authoritative for `use` paths.
  - Document the module graph in each project’s registry row (§16).

### 15.6 Import / export conventions (L5-A2=C)

- **Language:** `use` has **module-wide scope** regardless of position (**DECIDED** #22.15). `use` may appear anywhere in a module per owner **L5-A2=C** (affirms language freedom).
- **Example style:** place `use` declarations at the **top** of each file (after `module`, before other declarations) unless a specimen intentionally demonstrates mid-file `use`.
- **Exports:** non-transitive imports (**#22.21**); re-export via **`pub use`** per #22.22–30.
- **Relative imports:** `use ./path::Symbol` — **DECIDED** for V0.1 (same package); see language open-question reconciliation in `GS_MODULE_IMPORT_DECISIONS_V0_1.md` (relative imports marked decided in document open-questions list).

### 15.7 Visibility coverage (L5-A3=C)

- **First L5 wave:** `public` / `private` only (**DECIDED** #22.4–5).
- **`package` visibility** (three-level model in `GRAPH_PROJECT_AND_MODULE_SYSTEM.md` §9): **OPEN design gate** — required before **multi-package** golden projects (§16 **L5.8** **BLOCKED** until closed). Do **not** invent `package` keyword syntax in Example.

### 15.8 Namespace and symbol resolution (L5-A4=C)

- Resolution via **project logical module graph**, not filesystem traversal (**DECIDED** #22.7).
- Golden projects document **expected** symbol visibility and import graphs at **source level** until tooling exists.
- **Cross-language unified modules:** covered in a **later queue phase** (§16 **L5.11** **PROPOSED**); requires same logical `module` across surfaces without inventing new merge rules.

### 15.9 Manifest coverage (L5-A5=B)

- When a golden project’s scope includes manifest semantics, include **`Graph.toml`** in that project directory.
- Follow conceptual shape in `graph-memory-language/Docs/Language/GRAPH_PROJECT_AND_MODULE_SYSTEM.md` (§2–3, §6).
- **`[entry.runtime]`** (and other entry sections when relevant) may name orchestrator sources; **L5-A9=C** — entry behavior is **explicit function calls** (e.g. `*_sample` / project orchestrator `fn`), not module auto-init.

### 15.10 Package and versioning coverage (L5-A6=C)

- **Staged:** local / single-package → manifest dependencies → version constraints → conflict cases.
- **Version constraints** and **single resolved version per package name** — **DECIDED** at ecosystem level (`GRAPH_PROJECT_AND_MODULE_SYSTEM.md` §11); golden may document **expected** resolution outcomes without implementing resolver (**L5-A7=A**).

### 15.11 Dependency resolution expectations (L5-A7=A)

- Projects that declare dependencies must ship **normative expected resolution** narrative: constraint → resolved versions in **`Graph.lock`** (mandatory in project doc §4) as **documentation**, not executable resolver output.
- **Do not** claim runtime or tool execution in registry rows.

### 15.12 Negative golden scenarios (L5-A8=C)

Cover, across the queue:

| Scenario | Language basis | Queue item |
| -------- | -------------- | ---------- |
| Valid import **DAG** | #22.7 | L5.1–L5.7+ |
| Ordinary **import cycle** → error | #22.31 | **L5.9** |
| **`pub use` re-export cycle** → warning | #22.31–32 | **L5.10** |

Diagnostic **codes/format** remain **OPEN** (§17); negatives are specified as **expected behavior** text until codes exist.

### 15.13 Cross-language unified module coverage (L5-A4=C, phase 3)

- At least one **PROPOSED** golden project combining **two or more** of `.gschema`, `.gq`, `.gs`, `.gi` under one logical `module` (§16 **L5.11**).
- **BLOCKED** on any extra owner closure not already in `UNIFIED_MODULE_SYMBOL_SPACE.md` + import rules (#22.6 cross-language imports).

### 15.14 Source-level acceptance

Each landed L5 project:

- Registers **module graph**, **public surface**, and **orchestration** (`*_sample` / `*_verify` per §11 where applicable).
- States **SOURCE-LEVEL ACCEPTED** when specimen + registry row complete.
- Does **not** imply parser/compiler/runtime pass.

### 15.15 Runtime / tooling verification boundary

**RUNTIME NOT VERIFIED** unless a future owner slice explicitly records tool execution. Parser compatibility audits (§13) apply to `.gs` units but **do not** block L5 authoring on canonical surface.

### 15.16 Saturation criteria (not declared here)

**L5 SATURATED** is **not** defined in this slice. Withhold until owner reviews queue completion against **A2=C** end-state coverage (single-package, external packages, unified modules, manifest, negatives, versioning/conflicts).

### 15.17 OPEN design gates (summary)

See **§17** for the full OPEN / DEFERRED registry. Gates that **block** queue rows: **package visibility syntax** (before L5.8), **unified-module authoring conventions** (before L5.11 closure), **diagnostic codes** (optional for landing, required for strict tooling alignment).

---

## 16. L5 Golden Project Queue

**Status:** CANONICAL queue (Example repository). Rows are **CONFIRMED** only where acceptance criteria follow **DECIDED** language contracts without unresolved syntax invention.

**Queue summary**

| ID | Project slug | Status | Phase (A2=C) |
| --- | ------------ | ------ | ------------- |
| **L5.1** | `two_module_hello` | **LANDED** | 1 — single-package GS |
| **L5.2** | `visibility_gate` | **LANDED** | 1 |
| **L5.3** | `reexport_facade` | **LANDED** | 1 |
| **L5.4** | `import_alias_collision` | **LANDED** | 1 |
| **L5.5** | `relative_local_use` | **LANDED** | 1 |
| **L5.6** | `parse_decimal_modular` | **CONFIRMED** | 1 |
| **L5.7** | `manifest_minimal` | **CONFIRMED** | 2 — manifest |
| **L5.8** | `dependency_two_pkg` | **BLOCKED** | 3 — packages (gate §15.7) |
| **L5.9** | `cycle_import_bad` | **LANDED** | 1 — negative (invalid) |
| **L5.10** | `pub_use_cycle_warn` | **CONFIRMED** | 1 — warning (`warnings/`) |
| **L5.11** | `unified_module_stub` | **PROPOSED** | 3 — cross-language |

**Recommended authoring order:** L5.1 → L5.2 → L5.3 → L5.4 → L5.5 → L5.9 → L5.10 → L5.6 → L5.7 → (gate) → L5.8 → L5.11.

### 16.1 Coverage matrix (owner A2=C)

| Capability | Covered by |
| ---------- | ---------- |
| Multi-module `use` | L5.1, L5.6 |
| `public` / `private` | L5.2 |
| `pub use` | L5.3, L5.10 |
| Aliases / collisions | L5.4 |
| Relative `use ./` | L5.5 |
| `Graph.toml` + entry | L5.7 |
| External deps + lock expectations | L5.8 (blocked) |
| Import cycle error | L5.9 |
| Pub-use cycle warning | L5.10 |
| Unified cross-format module | L5.11 (proposed) |
| Version conflict story | L5.8 (blocked; staged per L5-A6=C) |

### 16.2 Project specifications

#### L5.1 — `two_module_hello` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Purpose** | Minimal cross-module call: public function import. |
| **Status** | **LANDED** — `programs/05-modular/two_module_hello/`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Directory tree** | `programs/05-modular/two_module_hello/greet.gs`, `main.gs` |
| **Module graph** | `example.hello.greet` — `public fn greet() -> String` (constant greeting `"Hello, Graph Script!"`). `example.hello.main` — `use example.hello.greet::greet`; calls `greet()` unqualified (#22.15). File basenames `greet.gs` / `main.gs` are **not** module identity (**L5-A1=B**). |
| **Package graph** | Single implicit package (no external deps). |
| **Public API** | `example.hello.greet::greet() -> String` |
| **GS constructs** | `module`, `use` (explicit symbol `::greet`), `public fn`, `-> String`, §11 `two_module_hello_sample` / `two_module_hello_verify`. |
| **Manifest** | None (out of scope). |
| **Classification** | Positive. |
| **Expected behavior** | `two_module_hello_sample()` returns the same string as `greet()`; `two_module_hello_verify()` is `true` when `greet()` matches `"Hello, Graph Script!"` (char-wise `strings_equal` in `main.gs`). No module init; entry is explicit function calls (**L5-A9=C**). |
| **Acceptance evidence** | Two distinct `module` declarations; import path matches logical module `example.hello.greet`; only **public** symbol imported; sample vs verify separated (§11). |
| **Depends on** | — |
| **Owner refs** | L5-A1=B, L5-A9=C, #22.1–5, #22.8, #22.15 |

#### L5.2 — `visibility_gate` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Purpose** | Document private vs public boundary (negative: private import). |
| **Status** | **LANDED** — `programs/05-modular/visibility_gate/`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Directory tree** | `programs/05-modular/visibility_gate/internal.gs`, `client.gs` |
| **Module graph** | `example.visibility.internal` — `public fn public_label`, `private fn secret_token`, default-private `fn default_token`, `public fn internal_visibility_self_test` (calls private/default symbols in-module). `example.visibility.client` — `use` of **public** symbols only (`public_label`, `internal_visibility_self_test`); `visibility_gate_sample` / `visibility_gate_verify`. |
| **Public API (cross-module)** | `example.visibility.internal::public_label() -> String`; `example.visibility.internal::internal_visibility_self_test() -> Bool` |
| **In-module only** | `secret_token` (**explicit private** #22.5); `default_token` (**default private** #22.5) |
| **Manifest** | None. |
| **Classification** | Positive on-disk specimen + **registry-documented** negative import snippets (no invalid `.gs` in landed tree — keeps positive project parse-valid at source level). |
| **Expected behavior (positive)** | Client obtains `"gate-open"` via imported `public_label`; `internal_visibility_self_test` confirms private/default symbols work inside `internal`; `visibility_gate_verify` aggregates `okPublic and okInternal`. |
| **Negative golden (registry narrative, #22.4, #22.19)** | If added to a separate compilation unit, these imports are **compile-time errors** (private / non-public symbol); diagnostic **codes OPEN** (§17): `use example.visibility.internal::secret_token` — explicit **private**; `use example.visibility.internal::default_token` — **default-private** (not `public`). |
| **Acceptance evidence** | Distinct modules; only public symbols in `client.gs` `use`; private/default exercised only in `internal.gs`; sample/verify in `client.gs` (§11). |
| **Depends on** | L5.1 |
| **Owner refs** | L5-A1=B, L5-A3=C, L5-A9=C, #22.4–5, #22.19 |

#### L5.3 — `reexport_facade` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Purpose** | Facade module: `pub use` re-exports implementation module. |
| **Status** | **LANDED** — `programs/05-modular/reexport_facade/`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Directory tree** | `programs/05-modular/reexport_facade/implementation.gs`, `api.gs`, `client.gs` |
| **Module graph** | `example.reexport.implementation` — `public fn compute_value(base: Int) -> Int` (uses in-module `private fn scale_seed`); `example.reexport.api` — `pub use example.reexport.implementation::compute_value` (#22.22); `example.reexport.client` — `use example.reexport.api::compute_value` only (no direct `use` of implementation). |
| **Public API (consumer-facing)** | `example.reexport.api::compute_value` (re-exported binding; consumer imports facade module). |
| **Classification** | Positive on-disk + registry-documented contract negatives. |
| **Expected behavior (positive)** | `compute_value(5) -> 15`, `compute_value(0) -> 10`, `compute_value(1) -> 11` via facade; `reexport_facade_verify` checks 15 and 10. |
| **Contract evidence (#22.21)** | Plain `use` in `api` without `pub use` would **not** expose `compute_value` to consumers of `api`; landed `api.gs` uses **`pub use`** so `client` may import from `api`. |
| **Negative golden (registry narrative)** | `pub use example.reexport.implementation::scale_seed` — **ERROR** cannot re-export private (#22.29); `pub use example.reexport.implementation::*` — **ERROR** wildcard requires alias (#22.23); hypothetical `use example.reexport.implementation::compute_value` in `client` bypasses facade pattern (allowed at language level for **public** symbols — L5.3 **discourages** direct impl import in corpus style). |
| **Acceptance evidence** | Three distinct logical modules; explicit `pub use` path; client imports only `api`; sample/verify in `client.gs` (§11). |
| **Depends on** | L5.1 |
| **Owner refs** | L5-A1=B, L5-A9=C, #22.21–30 |

#### L5.4 — `import_alias_collision` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Purpose** | `as` aliases; duplicate import / name collision errors. |
| **Status** | **LANDED** — `programs/05-modular/import_alias_collision/`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Directory tree** | `programs/05-modular/import_alias_collision/a.gs`, `b.gs`, `main.gs` |
| **Module graph** | `example.alias.a` / `example.alias.b` — each `public fn token() -> String` (distinct literals `"alias-alpha"` / `"alias-beta"`). `example.alias.main` — `use example.alias.a::token as token_from_a`, `use example.alias.b::token as token_from_b`; `import_alias_collision_sample` / `import_alias_collision_verify`. File names `a.gs`/`b.gs` are **not** module identity (**L5-A1=B**). |
| **Public API (providers)** | `example.alias.a::token`, `example.alias.b::token` (same simple name, different modules). |
| **Classification** | Positive on-disk + registry-documented collision negatives. |
| **Expected behavior (positive)** | Unqualified `token_from_a()` / `token_from_b()` resolve via **symbol aliases** (#22.11); verify checks both strings; sample eagerly calls both providers, returns `beta` string. |
| **Negative golden (registry narrative)** | `use example.alias.a::token` then `use example.alias.b::token` (no `as`) — **ERROR** unqualified import collision (#22.10); `use example.alias.a::token` twice — **ERROR** duplicate import (#22.14); `use example.alias.a::token as token_from_a` then `let token_from_a = …` or local `fn token_from_a` — **ERROR** namespace collision (#22.13); `use …::token as token_from_a` then `fn token_from_a` — **ERROR** cannot shadow imported binding (#22.17). Diagnostic **codes OPEN** (§17). |
| **Wildcard / module alias** | `use module::* as ns` — **DECIDED** (#22.12) but **out of scope** for this specimen (explicit symbol aliases only). |
| **Acceptance evidence** | Two providers + aliased imports; verify aggregates both checks (§11); no duplicate unqualified `token` binding. |
| **Depends on** | L5.1 |
| **Owner refs** | L5-A1=B, L5-A2=C, L5-A9=C, #22.10–14, #22.17 |

#### L5.5 — `relative_local_use` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Purpose** | Relative `use ./…::` within same package/project. |
| **Status** | **LANDED** — `programs/05-modular/relative_local_use/`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Directory tree** | `main.gs`, `lib/helper.gs`, `lib/support.gs` |
| **Module graph** | `example.relative.main` — `use ./lib/helper::tag_line` (project-relative path). `example.relative.lib` (`lib/helper.gs`) — `use ./support::part_b` (sibling under `lib/`). `example.relative.support` (`lib/support.gs`) — `public fn part_b`. Logical identities declared explicitly; paths are resolution hints only (**L5-A1=B**, #22.2, #22.7). |
| **Relative → logical resolution (documentation)** | `./lib/helper::tag_line` → module `example.relative.lib`, symbol `tag_line`; `./support::part_b` (from `helper.gs`) → module `example.relative.support`, symbol `part_b`. **Absolute equivalent (same logical graph):** `use example.relative.lib::tag_line`, `use example.relative.support::part_b`. |
| **Classification** | Positive on-disk + registry-documented negatives. |
| **Expected behavior (positive)** | `tag_line()` returns `"relative-tag-local"` when sibling relative import resolves `part_b()` → `"local"`. |
| **Negative golden (registry narrative)** | `use ../outside/pkg::Sym` or dependency bypass — violates package boundary (`GRAPH_PROJECT_AND_MODULE_SYSTEM.md` §7); `use ./lib/helper::private_sym` — non-public (#22.19); unresolved relative path — missing module (#22.18). **`..` parent segments** — not shown in canonical examples (`GRAPH_LANGUAGE_COMMON_SYNTAX_V0_1.md` §2); **not demonstrated** on-disk; normalization rules **OPEN** beyond `./` + `/` segments. |
| **Acceptance evidence** | Two-hop relative chain (main→helper, helper→support); no `Graph.toml`; sample/verify in `main.gs` (§11). |
| **Depends on** | L5.1 |
| **Owner refs** | L5-A1=B, L5-A9=C; relative imports **DECIDED** (`GS_MODULE_IMPORT_DECISIONS_V0_1.md` OQ §5 A1); `GRAPH_PROJECT_AND_MODULE_SYSTEM.md` §7 |

#### L5.6 — `parse_decimal_modular` (**CONFIRMED**)

| Field | Specification |
| ----- | ------------- |
| **Purpose** | Split superseded §8.5 design: scan/parse/orchestrate modules; **semantic parity** with L4.1 `parse_decimal_strict.gs`. |
| **Directory tree** | `main.gs`, `scan.gs`, `parse.gs` (names illustrative) |
| **Module graph** | Logical namespaces under `example.parse_decimal.*`; public surface mirrors L4.1 contracts. |
| **Classification** | Positive. |
| **Source-level acceptance** | Registry references L4.1 validation record; `*_verify` aggregates same golden obligations as L4.1. |
| **Depends on** | L5.1, L5.2 recommended |
| **Owner refs** | §8.5 historical; L5-A1=B |

#### L5.7 — `manifest_minimal` (**CONFIRMED**)

| Field | Specification |
| ----- | ------------- |
| **Purpose** | Minimal `Graph.toml` + `source_roots` + `[entry.runtime]` pointing at orchestrator module. |
| **Directory tree** | `Graph.toml`, `src/main.gs` (or flat `.gs` if `source_roots` lists `.`) |
| **Manifest fields** | `[project]` name/version/edition; `source_roots`; `[entry.runtime] main = …` per project doc §6. |
| **Classification** | Positive. |
| **Source-level acceptance** | Manifest fields enumerated; entry invokes explicit `fn` per L5-A9=C. |
| **Depends on** | L5.1 |
| **Owner refs** | L5-A5=B, `GRAPH_PROJECT_AND_MODULE_SYSTEM.md` §2–3, §6 |

#### L5.8 — `dependency_two_pkg` (**BLOCKED**)

| Field | Specification |
| ----- | ------------- |
| **Purpose** | Two-package dependency, `Graph.toml` + `Graph.lock` **expected resolution** (incl. version constraint / conflict narrative per L5-A6=C). |
| **Blocker** | **Package visibility syntax** OPEN (§15.7, §17) — owner **L5-A3=C** requires design gate before multi-package examples. |
| **Status** | **BLOCKED** until gate closes; then **CONFIRMED** pending registry update. |
| **Depends on** | L5.7, package visibility gate |
| **Owner refs** | L5-A6=C, L5-A7=A; `GRAPH_PROJECT_AND_MODULE_SYSTEM.md` §11 |

#### L5.9 — `cycle_import_bad` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Purpose** | Ordinary import cycle **compile-time error** (#22.31). |
| **Status** | **LANDED** — `programs/05-modular/negative/cycle_import_bad/`; **SOURCE-LEVEL ACCEPTED AS NEGATIVE GOLDEN**; **EXPECTED COMPILE-TIME ERROR**; **RUNTIME NOT VERIFIED** |
| **Directory tree** | `programs/05-modular/negative/cycle_import_bad/a.gs`, `b.gs` (**L5-N1=B**) |
| **Module graph** | `example.cycle.a` — `use example.cycle.b::token_b`; `public fn token_a`. `example.cycle.b` — `use example.cycle.a::token_a`; `public fn token_b`. Import edges: **A→B**, **B→A** (ordinary `use` only, no `pub use`). File names **not** module identity (**L5-A1=B**). |
| **Project validity** | **INVALID** (intentional). **LANDED** ≠ compiles. |
| **Classification** | Negative golden (compile-time error). No `*_sample` / `*_verify` (§11 applies to valid specimens). |
| **Expected diagnostic contract (L5-N2=B)** | **Severity:** ERROR. **Category:** `import_cycle` (registry label; **code OPEN** §17). **Normative rule:** #22.31 — ordinary dependency cycles are compile-time errors. **Involved modules:** `example.cycle.a`, `example.cycle.b`. **Involved import edges:** `example.cycle.a` → `example.cycle.b` (`token_b`); `example.cycle.b` → `example.cycle.a` (`token_a`). **Source location precision:** **OPEN** — contract does not fix whether the diagnostic anchors on a `use` declaration, a module, or the cycle as a whole; do **not** assert file/line/column in registry. **Scope (normative):** project logical import graph (#22.7). |
| **Distinction from L5.10** | #22.31 — `pub use` re-export cycles are **warnings**, not this specimen. |
| **Acceptance evidence** | Two-module cycle via public symbols only (no private-import masking); isolated under `negative/`; no Graph.toml. |
| **Depends on** | L5.1 |
| **Owner refs** | L5-A8=C, L5-A9=C, L5-N1=B, L5-N2=B, #22.31 |

#### L5.10 — `pub_use_cycle_warn` (**CONFIRMED**)

| Field | Specification |
| ----- | ------------- |
| **Purpose** | Permitted **pub use** cycle with **warning** (#22.32). |
| **Directory tree (planned)** | `programs/05-modular/warnings/pub_use_cycle_warn/` (**L5-N1=B**) |
| **Classification** | Warning-only golden (not under `negative/`). |
| **Source-level acceptance** | Document expected warning; strict-mode promotion #22.33 noted as OPEN tooling. |
| **Depends on** | L5.3 |
| **Owner refs** | L5-A8=C, #22.31–33 |

#### L5.11 — `unified_module_stub` (**PROPOSED**)

| Field | Specification |
| ----- | ------------- |
| **Purpose** | Cross-language **unified logical module** (e.g. `model.gschema` + `runtime.gs` + optional `queries.gq`) per `UNIFIED_MODULE_SYMBOL_SPACE.md`. |
| **Status** | **PROPOSED** — satisfies **L5-A4=C** phase 3; not **CONFIRMED** until owner approves project slug, surfaces included, and Example authoring conventions for cross-file same-module (no new language rules). |
| **Depends on** | L5.7 recommended; L5.1 patterns |
| **Owner refs** | L5-A4=C, #22.6, `UNIFIED_MODULE_SYMBOL_SPACE.md` |

---

## 17. L5 OPEN contracts and design gates

**Status:** AUDIT + REGISTRY (Example). Labels: **DECIDED** (language or owner), **OPEN**, **DEFERRED**, **PROPOSED** (Example-only), **IMPLEMENTATION-ONLY**.

| Topic | Label | Notes |
| ----- | ----- | ----- |
| Module identity (`module` decl) | **DECIDED** | #22.2, #22.8; L5-A1=B conventions **PROPOSED** (Example) |
| `use` placement | **DECIDED** module-wide (#22.15); **L5-A2=C** anywhere allowed; top-of-file **PROPOSED** style |
| Import section ordering (#22.16) | **OPEN** | Language defers exact positioning; Example style in §15.6 |
| `public` / `private` | **DECIDED** | #22.4–5 |
| `package` visibility keyword | **OPEN** | `GRAPH_PROJECT_AND_MODULE_SYSTEM.md` §9; blocks **L5.8** |
| `pub use` / re-export rules | **DECIDED** | #22.21–30 |
| Import / pub-use cycles | **DECIDED** | #22.31–33 |
| Relative `use ./` | **DECIDED** | `GS_MODULE_IMPORT_DECISIONS_V0_1.md` (open-questions §5) |
| Cross-language imports (GS←GSchema/GQ) | **DECIDED** | #22.6 |
| Cross-language **unified module** Example layout | **PROPOSED** | **L5.11** |
| `Graph.toml` shape | **DECIDED** (concept) | `GRAPH_PROJECT_AND_MODULE_SYSTEM.md` §2–3 |
| `Graph.lock` mandatory | **DECIDED** | §4 project doc |
| `[exports]` TOML section | **OPEN** | §10 project doc |
| Dependency resolution algorithm | **DEFERRED** / tooling | L5-A7=A — **expected results** only in Example |
| Version specifier on `use` | **DEFERRED** | #22 open Q.4 |
| Module init lifecycle / order | **OPEN** | L5-A9=C — explicit calls only for now |
| Diagnostic codes/messages (#22 OQ.2) | **OPEN** | Negative goldens: **L5-N2=B** contract (category/severity/rule); codes/messages/lines not invented |
| L5 negative vs warning layout | **DECIDED** | **L5-N1=B** — `negative/` vs `warnings/` |
| L5 expected diagnostic registry | **DECIDED** | **L5-N2=B** — §16 negative rows |
| Parser/project assembly | **IMPLEMENTATION-ONLY** | §13; not acceptance gate for charter |
| Target → landed workflow (§10) | **OPEN** | Applies when first L5 project lands |

**Contract validation:** No **BLOCKED** conflict between owner **L5-A2=C** and #22.15 (module-wide `use`). **L5-A9=C** aligns with manifest entrypoints without claiming static init (**OPEN**). Stale open-question #3 (cycles) in `GS_MODULE_IMPORT_DECISIONS_V0_1.md` vs **#22.31 DECIDED** — treat **#22.31** as authoritative; language doc hygiene is **language-repo** concern (Example does not edit).

---

## 18. Related documents

| Document | Role |
| -------- | ---- |
| `Docs/CANONICAL_TARGET_AUDIT_FINDINGS.md` | Supporting **audit record** (implementation gaps); not corpus level SoT |
| `graph-memory-language/Docs/Language/GS_MODULE_IMPORT_DECISIONS_V0_1.md` | GS module/import **DECIDED** contract (#22.*) |
| `graph-memory-language/Docs/Language/GRAPH_PROJECT_AND_MODULE_SYSTEM.md` | Project manifest, lock, packages, entries |
| `graph-memory-language/Docs/Language/UNIFIED_MODULE_SYMBOL_SPACE.md` | Unified logical module across surfaces |
| `graph-memory-language/Docs/Language/GS_PARSER_CONTRACT_V0_1.md` | Parser-ready syntax inventory |
| `graph-memory-language/Docs/Language/GS_V0_1_LANGUAGE_CORE.md` | Core GS semantics (shadowing, etc.) |
| `README.md` | High-level introduction; defer level/queue detail to **this file** |
