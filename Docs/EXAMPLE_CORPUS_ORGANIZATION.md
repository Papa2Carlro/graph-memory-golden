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
| L4 saturation | **not applicable** until the queue slice is reviewed; **one** program landed does not close L4 |

#### 8.4.1 L4 landed registry

| Filename | Status | Structural role (reference) |
| -------- | ------ | --------------------------- |
| `parse_decimal_strict.gs` | **landed** — `programs/04-complex/parse_decimal_strict.gs` (**L4.1**) | Strict decimal string → `Int?`; lexical validation; digit accumulation with overflow guard; sign handling; `null` for invalid input; signed `Int{64}` boundaries including leading-zero `INT_MIN` lexeme |

**L4.1 acceptance (corpus-organization):** **source-level ACCEPTED** — reference target on canonical GS surface. **GS runtime execution not verified** in this registry slice.

**L4.1 pipeline (landed specimen):** lexical validation → sign / digit-run handling → bounded accumulation → `apply_sign` → orchestration via `parse_decimal_strict`.

**L4.1 validation record (honest):** `parse_decimal_strict_sample` includes prior golden cases plus **seven** signed `Int{64}` boundary cases (max, max+1, min, min−1, leading-zero variants). Verification is **source-level** (specimen + sample wiring); **not** end-to-end compiler/runtime execution.

`parse_decimal_strict.gs` was the **first** L4 target in the **CONFIRMED** queue (historical selection only).

#### 8.4.2 L4 target queue (CONFIRMED order)

| Order | Filename | Status | Structural role (reference intent) |
| ----- | -------- | ------ | ---------------------------------- |
| **L4-01** | `parse_decimal_strict.gs` | **landed** — see §8.4.1 | Strict decimal pipeline in one file |
| **L4-02** | `rle_roundtrip.gs` | **not landed** | RLE encode + decode + roundtrip invariant |
| **L4-03** | `n_queens_backtrack.gs` | **not landed** | Backtracking search with explicit board state and constraints |
| **L4-04** | `bfs_shortest_path_flat.gs` | **not landed** | Unweighted shortest path on flat-encoded graph; BFS + distance invariant |
| **L4-05** | `shunting_yard_eval.gs` | **not landed** | Infix expression: tokenize + shunting-yard + RPN evaluation |

- **L3** remains **saturated** at the corpus-organization level (§8.3).
- Do **not** treat L4 as saturated, closed, or complete until the intended five-program queue is reviewed.

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
