# Example Corpus — Golden Syntax Track

**Status:** **CANONICAL** (Example repository — syntax-first golden specimens; orthogonal to Classic L1–L4 and L5 modular track)
**Coverage:** **10 / 18** **LANDED** (see §19.6 queue). **Layout:** [POLICY.md](POLICY.md) §1–§2 (**SY-A1**, **SY-STR-A1/A2**). **Owner decisions:** [DECISIONS.md](DECISIONS.md). **OPEN gaps / blockers:** [GAPS.md §8](GAPS.md#8-syntax-track-coverage-gaps-monolith-195). **Level taxonomy:** [CHARTER.md](CHARTER.md).
**Compat:** [EXAMPLE_CORPUS_ORGANIZATION.md](../EXAMPLE_CORPUS_ORGANIZATION.md) §19 legacy stubs.

**Physical layout (current):** explicit modules under `programs/<level>/syntax/<module-slug>/` (`pair/`, `graph_set/`, `graph_set_block/`); module-less specimens may remain flat under `syntax/` (**SY-STR-A2**). Queue **SY-L3.*** IDs do not require `programs/03-advanced/` placement.

---

## 19. Syntax Track (Golden Standard — language surface)

**Status:** **ACTIVE** — registry + queue; on-disk Syntax Track **SY-L1.1**–**SY-L1.5**, **SY-L2.1**–**SY-L2.3**, **SY-L3.2**, **SY-L3.3** landed (§19.6.1–§19.6.10). Remaining queue rows **NOT LANDED** until files exist under `syntax/`.
**Scope:** Isolated **syntax-first** golden programs under `programs/<level>/syntax/` — orthogonal to Classic (L1–L4 algorithm) and Modular (L5 project) tracks.

**Queue IDs vs on-disk level:** Registry rows **SY-L3.*** (and **S1** / **S2** metadata) name **syntax-depth queue** slots — **not** a requirement that the specimen file live under `programs/03-advanced/`. Physical placement follows **SY-A1** + **SY-STR-A1** / **SY-STR-A2** (§19.1 below; [DECISIONS.md](DECISIONS.md)).

### 19.1 Owner decisions (DECIDED)

Canonical Syntax Track and decomposition decisions: **[DECISIONS.md](DECISIONS.md)** (**CP-A1**, **SY-A1/A2**, **SY-STR-A1…A3**, **SY-L2.3-A1…A3**, **L3-A1…A4**, **OQ-SY-*** where DECIDED).

**S0 — Core:** constructs shared with general-purpose languages (`let`/`var`, `if`/`elif`/`else`, `each`, arithmetic, `fn`, `return`, …).

**S1 — GS-specific:** graph/runtime surface (`action`, `on`, `set`, `emit`, `connect`, `fail`, graph references, …).

**S2 — Combined:** deliberate interaction of S0 + S1 (or multi-construct control/data-flow) in one minimal specimen.

### 19.2 Checkpoint commits (CP-A1=C)

Recorded for audit; **no push** required by owner. Commit SHAs and scope: [DECISIONS.md §4](DECISIONS.md#4-historical-checkpoints-cp-a1c) (**CP-A1=C**).

### 19.3 Normative document inventory (GS + shared contract)

Read-only sources for Syntax Track acceptance (parser implementation **does not** override these):

| Tier | Document | Role |
| ---- | -------- | ---- |
| Core | `GS_V0_1_LANGUAGE_CORE.md` | Bindings, collections, `each`, ranges, `if`/`match`, destructuring, scope |
| Core | `GS_V0_1_TYPE_SYSTEM.md` | Signatures, inference, `Int{N}`, `Type?`, enums, no overload/generics MVP |
| Core | `GS_V0_1_RUNTIME_MODEL.md` | `fn` / `action` / `on`, transactions, `set` / `emit` / graph ops, `fail` |
| Shared | `GRAPH_LANGUAGE_COMMON_SYNTAX_V0_1.md` | Lexical, expressions, `is` / `is not`, visibility keywords |
| Parser | `GS_PARSER_CONTRACT_V0_1.md` | Class A/B parser-ready inventory (syntax vs deferred semantics) |
| Match | `GS_MATCH_DECISIONS_V0_1.md`, `ADR/0001-gs-match-v0.1-canonical-decisions.md` | `match` / pattern arms |
| Modules | `GS_MODULE_IMPORT_DECISIONS_V0_1.md`, `GRAPH_PROJECT_AND_MODULE_SYSTEM.md` | `module`, `use`, `pub use`, manifest |
| Collections | `GS_COLLECTION_REFERENCE_SEMANTICS_V0_1.md`, `GS_COLLECTION_BUILDER_SEMANTIC_CONTRACT_V0_1.md` | Indexing, `.get`, mutation API |
| Strings | `GS_STRING_AND_CHAR_CONTRACT_V0_1.md` | `String`, `Char` |
| Each/range | `planning/decisions/GS_EACH_AND_RANGE_CONTRACT_CANONICAL.md`, `GS_RANGE_CONTRACT_CANONICAL.md` | `each`, `start..end` |
| Arithmetic | `planning/decisions/GS_ARITHMETIC_SEMANTICS_CANONICAL.md` | Precedence, `%` |
| Integers | `planning/decisions/GS_*INTEGER*` (width, overflow, literals) | Literal ↔ type width |
| Nullability | `planning/decisions/GS_VAR_LET_TYPE_AND_NULLABILITY_CONTRACT_CANONICAL.md` | `Type?`, `null` (OPEN literal) |
| Lexicon | `Lexicon/LANGUAGE_SCRIPT_V0_1.md` | Master construct table + conflicts |
| Cross-surface | `GSCHEMA_V0_1.md`, `GQ_V0_1.md`, `GI_V0_1.md`, `UNIFIED_MODULE_SYMBOL_SPACE.md` | Boundaries — specimens **tag** surface; GS Syntax Track does not subsume GQ/GSchema/GI grammar |
| Compiler | `Compiler/GS_IR_CONTRACT_V0_1.md` | Lowering reference only |

### 19.4 Coverage matrix (Classic + Modular corpus vs normative GS)

Legend: **Y** = exercised in landed golden `.gs`; **P** = partial / indirect; **N** = no dedicated specimen; **R** = registry narrative only (e.g. L5 negatives not on disk).

| Feature cluster | Normative anchor | L1 | L2 | L3 | L4 | L5 | Syntax Track |
| ----------------- | ---------------- | -- | -- | -- | -- | -- | ------------ |
| `let` / `var`, assignment | Core §1 | Y | Y | Y | Y | Y | **Y** (**SY-L1.1**) |
| `fn`, params, `->` types | Runtime §3, Types §1 | Y | Y | Y | Y | Y | **N** |
| `if` / `elif` / `else` | Core §8 | Y | Y | Y | Y | P | **Y** (**SY-L1.3**) |
| `each` + `..` range | Each contract | P | Y | Y | Y | P | **Y** (**SY-L1.5** — `0..n` half-open) |
| `return` | Core §13 | Y | Y | Y | Y | Y | **Y** (**SY-L3.3** — compact `return` in `action`) |
| `is` / comparisons / logic | Common §19–20; CMP-01 | Y | Y | Y | Y | Y | **Y** (**SY-L1.2** — `is` / `is not` / `not`; ordering words **N**) |
| `match` + arms | Match decisions | **N** | **N** | **N** | **N** | **N** | **Y** (**SY-L1.4** — int literals + `else`) |
| `let { }` destructuring | Core §10; TYPE-16 | **N** | **N** | **N** | **N** | **N** | **Y** (**SY-L2.1** — flat; `.gschema` carrier) |
| `Int{N}` / `Type?` annotations | Types §8b, Common §13 | P | P | P | P | P | **Y** (**SY-L2.2** `Int{32}`; **SY-L2.3** `String?` + `null`) |
| Collection `[T]` ops / index | Collection ref §5 | P | P | P | Y | **N** | **Y** (**SY-L2.3** — `[String]` literal + `.get` in/out of bounds) |
| `set` / `set:` block | Runtime §15 | **N** | **N** | **N** | **N** | **N** | **Y** (**SY-L3.2** — `set:` two fields; **SY-L3.3** — single `set`; SY-L3.1 **N**) |
| `action` / `on` / `emit` / graph ops | Runtime §4, §9+ | **N** | **N** | **N** | **N** | **N** | **P** (**SY-L3.3** — `action` + `create`/`set`; **on**/**emit**/**connect** **N**) |
| `fail` | Runtime §8 | **N** | **N** | **N** | **N** | **N** | **PROPOSED** |
| `exists` | Common §22 | **N** | **N** | **N** | **N** | **N** | **Y** (**SY-L2.3** — `exists` / `not exists` on optional bindings) |
| `module` / `use` / `pub use` | Module decisions | **N** | **N** | **N** | **N** | Y | P (modular track) |
| Import negatives (cycle, alias) | #22.* | **N** | **N** | **N** | **N** | Y + R | **PROPOSED** SY negatives |
| `break` / `continue` | Core §5 | **N** | **N** | **N** | **N** | **N** | **PROPOSED** |
| `while` / `defer` | Sugar closure post | DEFERRED | — | — | — | — | — |
| Sample / verify ergonomics | §11 | P | Y | Y | Y | Y | **Y** (**SY-L1.1**–**SY-L2.3** `fn`; **SY-L3.2**–**SY-L3.3** `action` per §11 exception) |

**Coverage kinds:** **syntax** = construct appears in source; **semantic** = normative behavior demonstrated end-to-end; **diagnostic** = negative/warning goldens with **L5-N2=B**-style contracts. Classic track is strong on **algorithmic** semantics; **weak** on GS-specific and pattern-heavy syntax.

### 19.5 Gaps vs prior audit (non-exhaustive highlights)

Canonical Syntax Track and corpus coverage gaps: **[GAPS.md §8](GAPS.md#8-syntax-track-coverage-gaps-monolith-195)**.

### 19.6 Syntax Track queue

Smallest programs first; IDs are **SY-L*.*.*** registry labels. Rows without a §19.6.* landed specification remain **NOT LANDED** until owner approves and files exist under `syntax/`.

| ID | Level | Depth | Primary | Secondary | Specimen concept | S0/S1/S2 | Status |
| ---- | ----- | ----- | ------- | --------- | ---------------- | -------- | ------ |
| SY-L1.1 | L1 | S0 | `let` vs `var` | reassignment error narrative | two bindings + illegal `let` reassign (negative doc) | S0 | **LANDED** — §19.6.1 |
| SY-L1.2 | L1 | S0 | `is` / `is not` | `not` | equality matrix on literals | S0 | **LANDED** — §19.6.2 |
| SY-L1.3 | L1 | S0 | `if`/`elif`/`else` | — | branch selection without algorithm | S0 | **LANDED** — §19.6.3 |
| SY-L1.4 | L1 | S0 | `match` | literal arms, `else` | enum-like ints or strings | S0 | **LANDED** — §19.6.4 |
| SY-L1.5 | L1 | S0 | `each` + `0..n` | — | half-open range iteration | S0 | **LANDED** — §19.6.5 |
| SY-L2.1 | L2 | S0 | `let {a,b}` | — | flat destructuring | S0 | **LANDED** — §19.6.6 |
| SY-L2.2 | L2 | S0 | `Int{32}` + literal | overflow narrative | width boundary (negative registry) | S0 | **LANDED** — §19.6.7 |
| SY-L2.3 | L2 | S0 | `String?` / absent | `.get` OOB | optional from collection access | S0 | **LANDED** — §19.6.8 |
| SY-L3.1 | L3 | S1 | `set` single | graph ref param | one property write | S1 | NOT LANDED |
| SY-L3.2 | L3 | S1 | `set:` block | multiple fields | batched mutation | S1 | **LANDED** — §19.6.10 |
| SY-L3.3 | L3 | S2 | `action` + `set` | `return` | minimal action body | S2 | **LANDED** — §19.6.9 |
| SY-L4.1 | L4 | S1 | `on` handler | `emit` | event + handler pairing | S2 | NOT LANDED |
| SY-L4.2 | L4 | S1 | `connect` / `create` | explicit rel type | graph edge creation | S2 | NOT LANDED |
| SY-L4.3 | L4 | S0 | `fail` | `if` guard | explicit abort path | S1 | NOT LANDED |
| SY-L4.4 | L4 | S0 | `exists` | `if` | predicate before use | S1 | NOT LANDED |
| SY-L5.1 | L5 | S0 | `syntax/` module | `use` only | two-file syntax micro-project | S0 | NOT LANDED |
| SY-L5.2 | L5 | S0 | import alias negative | #22.10 | `syntax/negative/` mirror L5-N1 | S0 | NOT LANDED |
| SY-L5.3 | L5 | S2 | unified module stub | GSchema+GS | defers **L5.11** gate | S2 | NOT LANDED |

#### 19.6.1 SY-L1.1 — `let_vs_var` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-GOLDEN-SYNTAX-SY-L1.1-LAND-1** |
| **Purpose** | Minimal **let** (immutable) vs **var** (mutable) contrast; legal `var` reassignment; word-based equality in verify. |
| **Status** | **LANDED** — `programs/01-classical/syntax/let_vs_var.gs`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Path** | `programs/01-classical/syntax/let_vs_var.gs` (**SY-A1=B**) |
| **Primary construct** | Compact `let` / `var` with explicit types; `var` reassignment |
| **Secondary** | Illegal `let` reassignment — **registry negative narrative only** (no invalid `.gs`; **OQ-SY-2** **OPEN**) |
| **Metadata** | **S0** (registry column only; **SY-A2=B**) |
| **GS surface** | `let_vs_var_sample() -> Int`; `let_vs_var_verify() -> Bool` (§11); `result is expected` (CMP-01 word-based) |
| **Expected behavior (positive)** | `let_vs_var_sample()` returns **11** (`fixed` 10 + `counter` 1 after increment); `let_vs_var_verify()` is **true** when sample matches **11**. |
| **Negative golden (registry narrative)** | See below (no invalid `.gs`; **OQ-SY-2** **OPEN**) |
| **Normative refs** | Core §1; `GS_VAR_LET_TYPE_AND_NULLABILITY_CONTRACT_CANONICAL.md` §2; CMP-01 |

**Negative golden (registry narrative — SY-L1.1):**

```gs
let fixed Int = 10
fixed = 20
```

**Expected:** compile-time error — reassignment of immutable **`let`** (`graph-memory-language` — `GS_V0_1_LANGUAGE_CORE.md` §1). Not on disk until **OQ-SY-2** layout is decided.

#### 19.6.2 SY-L1.2 — `equality_operators` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-GOLDEN-SYNTAX-SY-L1.2-LAND-1** |
| **Purpose** | Word-based equality (**CMP-01**): `is`, `is not`, and unary `not` on `Bool`; `and` aggregation in sample return. |
| **Status** | **LANDED** — `programs/01-classical/syntax/equality_operators.gs`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Path** | `programs/01-classical/syntax/equality_operators.gs` (**SY-A1=B**) |
| **Primary construct** | `left is right`; `left is not right` |
| **Secondary** | `not equal` (boolean negation) |
| **Metadata** | **S0** (registry column only; **SY-A2=B**) |
| **GS surface** | `equality_operators_sample() -> Bool`; `equality_operators_verify() -> Bool` (§11); `result is true` (CMP-01) |
| **Expected behavior (positive)** | `equal` is **false**, `different` is **true**, `negated` is **true**; `equality_operators_sample()` returns **true**; `equality_operators_verify()` is **true**. |
| **Normative refs** | `GS_COMPARISON_OPERATORS_CANONICAL.md` CMP-01–02; Core §15; Common §18–§20 (`not`, `and`) |

#### 19.6.3 SY-L1.3 — `if_elif_else` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-GOLDEN-SYNTAX-SY-L1.3-LAND-1** |
| **Purpose** | Statement **`if` / `elif` / `else`** with indentation bodies; **`return`** per branch; branch selection without algorithmic payload. |
| **Status** | **LANDED** — `programs/01-classical/syntax/if_elif_else.gs`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Path** | `programs/01-classical/syntax/if_elif_else.gs` (**SY-A1=B**) |
| **Primary construct** | `if` / `elif` / `else` + `:` + indented body (Core §8) |
| **Secondary** | CMP-01 ordering test **`value is below 0`**; equality **`value is 0`** in `elif` |
| **Metadata** | **S0** (registry column only; **SY-A2=B**) |
| **GS surface** | `classify_number(value Int) -> String`; `if_elif_else_sample() -> String`; `if_elif_else_verify() -> Bool` (§11 eager `Bool` locals + `and`) |
| **Expected behavior (positive)** | `classify_number(-1)` → `"negative"`; `0` → `"zero"`; `1` → `"positive"`; sample returns `"zero"`; verify **true**. |
| **Normative refs** | Core §8, §13; CMP-01 (`is below`, `is`); §11 |

**Note (CMP):** specimen uses **`is below`**, not symbolic `<`, per CMP-01 for new positive Golden specimens.

#### 19.6.4 SY-L1.4 — `match_literals` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-GOLDEN-SYNTAX-SY-L1.4-LAND-1** |
| **Purpose** | **`match expr:`** with **integer literal** arms and final **`else:`**; scalar value branching (MATCH-02, MATCH-05). |
| **Status** | **LANDED** — `programs/01-classical/syntax/match_literals.gs`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Path** | `programs/01-classical/syntax/match_literals.gs` (**SY-A1=B**) |
| **Primary construct** | `match code:` → `0:` / `1:` / `2:` arms + `else:` (Parser §7.4; MATCH-03) |
| **Secondary** | `return` String per arm (Core §13); no guards (MATCH-07 deferred) |
| **Metadata** | **S0** (registry column only; **SY-A2=B**) |
| **GS surface** | `classify_status(code Int) -> String`; `match_literals_sample() -> String`; `match_literals_verify() -> Bool` (§11) |
| **Expected behavior (positive)** | `0`→`"idle"`, `1`→`"running"`, `2`→`"finished"`, other (e.g. **99**)→`"unknown"`; sample returns `"running"`; verify **true**. |
| **Normative refs** | `GS_MATCH_DECISIONS_V0_1.md` MATCH-01…03, MATCH-05; Parser §7.4; Core §13; CMP-01 (verify); §11 |

#### 19.6.5 SY-L1.5 — `each_range` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-GOLDEN-SYNTAX-SY-L1.5-LAND-1** |
| **Purpose** | **`each item in start..end:`** half-open range; **`var`** accumulator mutated in loop body. |
| **Status** | **LANDED** — `programs/01-classical/syntax/each_range.gs`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Path** | `programs/01-classical/syntax/each_range.gs` (**SY-A1=B**) |
| **Primary construct** | `each i in 0..n:` + indented body (EACH contract §3; Core §4, §6) |
| **Secondary** | `var total` accumulation; range **lower inclusive / upper exclusive** (`0..4` → 0…3) |
| **Metadata** | **S0** (registry column only; **SY-A2=B**) |
| **GS surface** | `sum_range(n Int) -> Int`; `each_range_sample() -> Int`; `each_range_verify() -> Bool` (§11) |
| **Expected behavior (positive)** | `sum_range(4)` → **6** (0+1+2+3); sample returns **6**; verify **true**. |
| **Normative refs** | `GS_EACH_AND_RANGE_CONTRACT_CANONICAL.md`; Core §4, §6; CMP-01 (verify); §11 |

#### 19.6.6 SY-L2.1 — `destructuring_flat` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-GOLDEN-SYNTAX-SY-L2.1-LAND-1** |
| **Purpose** | Flat **`let { left, right } = …`**; structured carrier **`Pair`** via **`return:`** (TYPE-16 / SR-T1); **не** graph `create`. |
| **Status** | **LANDED** — `programs/02-composition/syntax/pair/destructuring_flat.gs` + `pair_carrier.gschema`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **GS path** | `programs/02-composition/syntax/pair/destructuring_flat.gs` (**SY-A1=B**, **SY-STR-A1**; L2 queue) |
| **Schema path** | `programs/02-composition/syntax/pair/pair_carrier.gschema` — `module example.syntax.pair`; **`public entity Pair`** з `left: Int`, `right: Int` (`GSCHEMA_V0_1.md` §7; TYPE-16 §2a.1) |
| **Module** | Єдиний logical module **`example.syntax.pair`** у `.gs` і `.gschema` (unified symbol space; **не** L5 project tree) |
| **Primary construct** | `let { left, right } = make_pair()` (Core §10; D-12) |
| **Secondary** | `return:` field schema з entity `Pair` (Core §13b; RET-Q1…Q3) |
| **Metadata** | **S0** (registry column only; **SY-A2=B**) |
| **Expected behavior (positive)** | `make_pair()` → structured **Pair** (`left=2`, `right=3`); `sum_pair()` → **5**; verify **true**. |
| **SY01-D-01** | **OPEN** — specimen **не** демонструє missing-field; **не** стверджує semantics absent fields |
| **Normative refs** | Core §10, §13b; `GS_V0_1_TYPE_SYSTEM.md` §2a (TYPE-16); `GSCHEMA_V0_1.md` §7; Parser §6.3; §11; CMP-01 |

#### 19.6.7 SY-L2.2 — `int32_bounds` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-GOLDEN-SYNTAX-SY-L2.2-LAND-1** |
| **Purpose** | Explicit **`Int{32}`** declaration; in-range integer literal via contextual typing; same-width **`+`** without overflow edge in positive path. |
| **Status** | **LANDED** — `programs/02-composition/syntax/int32_bounds.gs`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Path** | `programs/02-composition/syntax/int32_bounds.gs` (**SY-A1=B**, L2) |
| **Primary construct** | `let name Int{32} = …` (VAR/LET §6.2–§6.3; TYPE_SYSTEM §8b) |
| **Secondary** | `low + high` with both operands **`Int{32}`** (same width; no narrowing specimen) |
| **Metadata** | **S0** (registry column only; **SY-A2=B**) |
| **GS surface** | `int32_bounds_sample() -> Int{32}`; `int32_bounds_verify() -> Bool` (§11); `result is expected` (CMP-01) |
| **Expected behavior (positive)** | `40 + 2` → **42**; `int32_bounds_sample()` returns **42**; `int32_bounds_verify()` is **true**. |
| **Negative golden (registry narrative)** | See below (no invalid `.gs`; **OQ-SY-2** **OPEN**) |
| **Normative refs** | `GS_V0_1_TYPE_SYSTEM.md` §8b (`Int{32}` width); `GS_VAR_LET_TYPE_AND_NULLABILITY_CONTRACT_CANONICAL.md` §6.1–§6.3; CMP-01; §11 |

**Int{32} representable range (normative):** signed 32-bit two's complement — **−2 147 483 648** … **2 147 483 647** (`GS_V0_1_TYPE_SYSTEM.md` §8b).

**Negative golden (registry narrative — SY-L2.2, literal width overflow):**

```gs
let too_wide Int{32} = 2147483648
```

**Expected:** **compile-time semantic error** — compile-time-known literal exceeds **`Int{32}`** representable range (`GS_VAR_LET_TYPE_AND_NULLABILITY_CONTRACT_CANONICAL.md` §6.3; supersedes prior integer-only runtime-error wording). Not on disk until **OQ-SY-2** layout is decided.

**Arithmetic overflow (distinct from literal bounds):** `Int{32} + Int{32}` result overflow semantics remain **`DEFERRED_TO_VM_ERROR_MODEL`** (`GS_V0_1_TYPE_SYSTEM.md` §8b) — **OPEN**; this specimen does **not** assert trap, wrap, or compile-time rejection for dynamic overflow. No invalid `.gs` for arithmetic overflow until owner freezes VM error model.

#### 19.6.8 SY-L2.3 — `optional_get` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-GOLDEN-SYNTAX-SY-L2.3-LAND-1** |
| **Purpose** | **`String?`** present + **`null`**; **`[String]`** non-empty literal; **`.get(i) -> String?`** in-bounds / OOB; **`exists` / `not exists`** guards (**SY-L2.3-A3**). |
| **Status** | **LANDED** — `programs/02-composition/syntax/optional_get.gs`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Path** | `programs/02-composition/syntax/optional_get.gs` (**SY-A1=B**, L2) |
| **Owner decisions (Syntax Track)** | **SY-L2.3-A1=B** — collection literals allowed source-level; **SY-L2.3-A2=A** — `["only"]`, no `append`; **SY-L2.3-A3=A** — OOB absence via **`not exists miss`** (not `is null`) |
| **Primary construct** | `let name String? = …` / `= null`; `let rows [String] = ["only"]` (Core §2; **OQ-SY-1** **DECIDED** for Syntax Track) |
| **Secondary** | `rows.get(0)` present; `rows.get(1)` OOB → optional absent per Core §3 / COLLECTION_REF §5.1 (**ABSENT** runtime — **not** a source keyword; **not** equated to **`null`** in this specimen) |
| **Metadata** | **S0** (registry column only; **SY-A2=B**) |
| **GS surface** | `optional_get_sample() -> String?`; `optional_get_verify() -> Bool` (§11 eager `Bool` locals + `and`) |
| **Expected behavior (positive)** | `optional_get_sample()` → **`"only"`** (in-bounds `.get(0)`); `optional_get_verify()` **true** when `exists present`, `not exists absent`, `exists hit`, `not exists miss`. |
| **Parser note** | **GS-C001** remains **OPEN** in language repo (canonical doc vs parser); Syntax Track acceptance is **source-level** per [PARSER_AUDIT.md](PARSER_AUDIT.md). |
| **Normative refs** | Core §2–§3; `GS_COLLECTION_REFERENCE_SEMANTICS_V0_1.md` §5.1; VAR_LET §9–§11; Common §22 / §22d (`not exists`); §11 |

#### 19.6.9 SY-L3.3 — `graph_set_action` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-GOLDEN-SYNTAX-SY-L3.3-LAND-1** |
| **Purpose** | Minimal **`action`** mutation boundary: **`create LabelHolder:`** → single **`set holder.label = …`** → read-back + **`return Bool`**; self-contained graph fixture (**L3-A3**). |
| **Status** | **LANDED** — `programs/02-composition/syntax/graph_set/graph_set_action.gs` + `graph_set_carrier.gschema`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **GS path** | `programs/02-composition/syntax/graph_set/graph_set_action.gs` (**SY-A1=B**, **SY-STR-A1**; queue **SY-L3.3** — not `03-advanced/`) |
| **Schema path** | `programs/02-composition/syntax/graph_set/graph_set_carrier.gschema` — `module example.syntax.graph_set`; **`public entity LabelHolder`** (`label: String`) |
| **Owner decisions** | **L3-A1=B**, **L3-A2=B**, **L3-A3=C**, **L3-A4=C**; **OQ-SY-3** **DECIDED** (mini GSchema); §11 graph-mutation exception |
| **Primary construct** | `action … -> Bool` with `{ … }` body (Parser §5.2); `set entity.prop = value` (Runtime §15) |
| **Secondary** | `let holder LabelHolder = create LabelHolder:` (Runtime §16); CMP-01 `is` / `is not` on property read-after-write |
| **Metadata** | **S2** (registry column; **SY-A2=B**) |
| **GS surface** | `graph_set_action_sample() -> Bool`; `graph_set_action_verify() -> Bool` (**L3-A4** — not `fn` sample/verify) |
| **Expected behavior (positive)** | **sample:** after `set`, `holder.label is "wired"` → **`true`**; **verify:** `okValue` and `okNotSeed` → **`true`**. Each action runs its own transaction when invoked as outermost action (Runtime §5). |
| **SY-L3.1** | **NOT LANDED** — this specimen includes one single **`set`** per action (surface overlap with L3.1) but does **not** register **SY-L3.1** as landed. |
| **Parser / runtime** | **GS-C001** and other [PARSER_AUDIT.md](PARSER_AUDIT.md) / parser gaps remain **OPEN**; no claim of parser/runtime execution. |
| **Normative refs** | Runtime §3–§6, §15–§16, §24; Parser §5.2, §6.1, §7.2, §7.5; Core §16; `GSCHEMA_V0_1.md` §7; §11 exception |

#### 19.6.10 SY-L3.2 — `graph_set_block` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-GOLDEN-SYNTAX-SY-L3.2-LAND-1** |
| **Purpose** | Batched persisted mutation via **`set:`** with **two** member assignments on one **`TagHolder`**; read-back + **`return Bool`** in separate **`action`** entry points (**L3-A4**). |
| **Status** | **LANDED** — `programs/02-composition/syntax/graph_set_block/graph_set_block.gs` + `graph_set_block_carrier.gschema`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **GS path** | `programs/02-composition/syntax/graph_set_block/graph_set_block.gs` (**SY-A1=B**, **SY-STR-A1**; queue **SY-L3.2** — not `03-advanced/`) |
| **Schema path** | `programs/02-composition/syntax/graph_set_block/graph_set_block_carrier.gschema` — `module example.syntax.graph_set_block`; **`public entity TagHolder`** (`label: String`, `code: String`) — **isolated** from **SY-L3.3** `LabelHolder` |
| **Primary construct** | `set:` + indented `holder.label = …` / `holder.code = …` (Runtime §15; Parser §7.5) |
| **Secondary** | `create TagHolder:` with both fields; CMP-01 read-after-write; §11 graph-mutation **`action`** sample/verify |
| **Metadata** | **S1** (registry column; **SY-A2=B**) |
| **Transaction note** | **Outermost `action`** = transaction boundary (Runtime §5); rollback on failure applies to the **action**, not a separate `set:` micro-transaction. Block vs single `set` — semantically equivalent **where applicable** (Runtime §15). |
| **Expected behavior (positive)** | **sample:** after `set:`, `label is "alpha"` and `code is "v1"` → **`true`**; **verify:** `okLabel`, `okCode`, `okNotSeed` → **`true`**. |
| **SY-L3.1** | **NOT LANDED** — compact single-line **`set`** not isolated as its own specimen row. |
| **SY-L3.3** | Sibling module under `02-composition/syntax/graph_set/` — separate fixture. |
| **Parser / runtime** | [PARSER_AUDIT.md](PARSER_AUDIT.md) / parser gaps remain **OPEN**; no parser/runtime execution claim. |
| **Normative refs** | Runtime §5–§6, §15–§16; Parser §7.5; Core §16; `GSCHEMA_V0_1.md` §7; §11 exception; L3-A1…A4 |

**OPEN blockers for queue authoring:** see [GAPS.md §8.1](GAPS.md#81-syntax-track-queue-authoring-blockers-196-footer).

### 19.7 Blocking owner questions (Syntax Track)

Canonical **OQ-SY-*** and Syntax Track gaps: **[GAPS.md §8.2](GAPS.md#82-syntax-track-owner-questions-monolith-197)**. **DECIDED** outcomes: [DECISIONS.md](DECISIONS.md). **OQ-SY-2** remains **OPEN**.

**L5 saturation:** Modular track remains **NOT SATURATED** (queue [L5_PROJECT_SYSTEM.md §16](L5_PROJECT_SYSTEM.md#16-l5-golden-project-queue): L5.6–L5.7 **CONFIRMED**, L5.8 **BLOCKED**, L5.10 **CONFIRMED**, L5.11 **PROPOSED**). Syntax Track does not change L5 saturation criteria.
