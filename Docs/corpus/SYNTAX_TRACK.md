# Example Corpus — Golden Syntax Track

**Status:** **CANONICAL** (Example repository — syntax-first golden specimens; orthogonal to Classic L1–L4 and L5 modular track)
**Coverage:** **15 / 18** **LANDED** (see §19.6 queue). **Layout (current):** [POLICY.md](POLICY.md) §1–§2 (**SY-A1**, **SY-STR-A1/A2**). **Target corpus architecture (post-R2, migration R3):** [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md). **Owner decisions:** [DECISIONS.md](DECISIONS.md). **OPEN gaps / blockers:** [GAPS.md §8](GAPS.md#8-syntax-track-coverage-gaps-monolith-195). **Level taxonomy:** [CHARTER.md](CHARTER.md).


**L3 Advanced Syntax (subtrack):** Additional golden specimens under `programs/03-advanced/syntax/` are documented in **[L3_ADVANCED_SYNTAX.md](L3_ADVANCED_SYNTAX.md)** (**OQ-L3-ADV-A2=B**) — **not** in this file. **SY-L*** queue (**15/18 LANDED**) unchanged.

**Physical layout (current):** explicit modules under `programs/<level>/syntax/<module-slug>/` (`pair/`, `graph_set/`, `graph_set_block/`, `graph_set_param/`, …); **SY-L4.1**–**L4.4** under `programs/03-advanced/syntax/` (`on_emit/`, `graph_connect/`, `fail_guard/`, `exists_if_present/`, `exists_if_guard/`, `null_narrowing/`) — queue Level **L4** unchanged (**OQ-SY-L4.4-A7=B**); module-less specimens may remain flat under `syntax/` (**SY-STR-A2**). Queue **SY-L3.*** IDs do not require `programs/03-advanced/` placement.

**Compat:** [EXAMPLE_CORPUS_ORGANIZATION.md](../EXAMPLE_CORPUS_ORGANIZATION.md) §19 legacy stubs.


---

## 19. Syntax Track (Golden Standard — language surface)

**Status:** **ACTIVE** — registry + queue; on-disk Syntax Track **SY-L1.1**–**SY-L1.5**, **SY-L2.1**–**SY-L2.3**, **SY-L3.1**, **SY-L3.2**, **SY-L3.3**, **SY-L4.1**, **SY-L4.2**, **SY-L4.3**, **SY-L4.4** landed (§19.6.1–§19.6.11, §19.6.12–§19.6.15). Remaining queue rows **NOT LANDED** until approved spec (where applicable) and files exist under `syntax/` (**SY-L5.1**–**L5.3**).
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
| `set` / `set:` block | Runtime §15 | **N** | **N** | **N** | **N** | **N** | **Y** (**SY-L3.1** — single `set` via entity param; **SY-L3.2** — `set:` two fields; **SY-L3.3** — inline single `set`) |
| `action` / `on` / `emit` / graph ops | Runtime §4, §9+ | **N** | **N** | **N** | **N** | **N** | **P** (**SY-L3.3** — `action` + `create`/`set`; **SY-L4.1** — `on` + `emit` + domain event; **SY-L4.2** — typed **`connect`** + one relation property — source-level only; **`delete`** / **`disconnect`** **N**; relation persistence/runtime **not** verified) |
| `fail` | Runtime §8 | **N** | **N** | **N** | **N** | **N** | **P** (**SY-L4.3** — scalar **`if`** guard + **`fail "message"`** — source-level only; parser support / executed abort / rollback / gm-error mapping **not** verified) |
| `exists` | Common §22 | **N** | **N** | **N** | **N** | **N** | **Y** (**SY-L2.3** — `exists` / `not exists` as **Bool** locals; **SY-L4.4** — `if exists` / `if not exists` statement guards + narrowing — source-level only §19.6.15) |
| `module` / `use` / `pub use` | Module decisions | **N** | **N** | **N** | **N** | Y | P (modular track) |
| Import negatives (cycle, alias) | #22.* | **N** | **N** | **N** | **N** | Y + R | **PROPOSED** SY negatives |
| `break` / `continue` | Core §5 | **N** | **N** | **N** | **N** | **N** | **PROPOSED** |
| `while` / `defer` | Sugar closure post | DEFERRED | — | — | — | — | — |
| Sample / verify ergonomics | §11 | P | Y | Y | Y | Y | **Y** (**SY-L1.1**–**SY-L2.3** `fn`; **SY-L3.1**–**SY-L3.3** `action` per §11 exception) |

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
| SY-L3.1 | L3 | S1 | `set` single | graph ref param | one property write | S1 | **LANDED** — §19.6.11 |
| SY-L3.2 | L3 | S1 | `set:` block | multiple fields | batched mutation | S1 | **LANDED** — §19.6.10 |
| SY-L3.3 | L3 | S2 | `action` + `set` | `return` | minimal action body | S2 | **LANDED** — §19.6.9 |
| SY-L4.1 | L4 | S1 | `on` handler | `emit` | event + handler pairing | S2 | **LANDED** — §19.6.12 |
| SY-L4.2 | L4 | S1 | `connect` / `create` | explicit rel type | graph edge creation | S2 | **LANDED** — §19.6.13 |
| SY-L4.3 | L4 | S0 | `fail` | `if` guard | explicit abort path | S1 | **LANDED** — §19.6.14 |
| SY-L4.4 | L4 | S0 | `exists` | `if` | predicate before use | S1 | **LANDED** — §19.6.15 |
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
| `is null` / `is not null` | VAR_LET §11–§12 | **N** | **N** | **N** | **N** | **N** | **Y** (**SY-L4.4** — `null_narrowing`; parser narrowing **GAP-05** — **RUNTIME NOT VERIFIED**) |
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
| **SY-L3.1** | **LANDED** — [§19.6.11](SYNTAX_TRACK.md#19611-sy-l31-graph_set_param-landed) (delegated param); this row remains inline single **`set`**. |
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
| **SY-L3.1** | **LANDED** — [§19.6.11](SYNTAX_TRACK.md#19611-sy-l31-graph_set_param-landed) (`graph_set_param/`). |
| **SY-L3.3** | Sibling module under `02-composition/syntax/graph_set/` — separate fixture. |
| **Parser / runtime** | [PARSER_AUDIT.md](PARSER_AUDIT.md) / parser gaps remain **OPEN**; no parser/runtime execution claim. |
| **Normative refs** | Runtime §5–§6, §15–§16; Parser §7.5; Core §16; `GSCHEMA_V0_1.md` §7; §11 exception; L3-A1…A4 |

**OPEN blockers for queue authoring:** see [GAPS.md §8.1](GAPS.md#81-syntax-track-queue-authoring-blockers-196-footer).


#### 19.6.11 SY-L3.1 — `graph_set_param` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-GOLDEN-SYNTAX-SY-L3.1-LAND-1** (contract **GS-EXAMPLE-CORPUS-SY-L3.1-SPEC-2**; program **SY-L3.1-LAND-1** `d96f5ed`) |
| **Purpose** | Minimal **delegated** persisted mutation: typed **entity parameter** on a helper `action` with exactly **one** single-line **`set`**; caller **`create`** + **`action` invocation** + read-back — distinct from **SY-L3.3** inline `set` in the same entry `action`. |
| **Status** | **LANDED** — `programs/02-composition/syntax/graph_set_param/graph_set_param.gs` + `graph_set_param_carrier.gschema`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Queue ID** | **SY-L3.1** — Level **L3**, depth **S1**; Primary **`set` single**; Secondary **graph ref param** (typed entity parameter per language SoT — no separate `ref`/`mut` keyword) |
| **Module** | `example.syntax.graph_set_param` (**OQ-SY-L3.1-A2=A**) |
| **GS path** | `programs/02-composition/syntax/graph_set_param/graph_set_param.gs` (**SY-A1=B**, **SY-STR-A1=A**) |
| **Schema path** | `programs/02-composition/syntax/graph_set_param/graph_set_param_carrier.gschema` — unified `module`; **minimal `public entity`** with one property suitable for a single `set` (**L3-A1=B**, **OQ-SY-3=B**) |
| **Owner decisions** | **OQ-SY-L3.1-A1=B** (outer sample/verify + nested helper); **OQ-SY-L3.1-A3=B** (unique coverage); **L3-A4=C**; **VERIFY-A3=A**; global **L3-A3=C** unchanged — SY-L3.1 interprets self-contained boundary per **OQ-SY-L3.1-A1** |
| **Required structure** | **`private` helper `action`** with typed entity parameter; **exactly one** `set holder.field = value` in helper; **no** `set:` block in helper; **sample `action`:** `create` entity → invoke helper → read-back property (CMP-01); **verify `action`:** independent `create` → invoke helper → read-back checks; **no** `set` in caller bodies |
| **GS surface** | `graph_set_param_sample() -> Bool`; `graph_set_param_verify() -> Bool` (**L3-A4**); eager **`Bool`** locals + **`and`** in verify (**VERIFY-A3**) |
| **Primary construct** | `private action writeLabel(holder: LabelHolder)` with `set holder.label = …` (Runtime §15); caller `writeLabel(holder)` after `create` (Runtime §6) |
| **Secondary** | Typed entity parameter (`holder: LabelHolder`); CMP-01 read-after-write in outer `action` |
| **Metadata** | **S1** (registry column; **SY-A2=B**) |
| **Expected behavior (positive)** | **sample:** after `writeLabel(holder)`, `holder.label is "wired"` → **`true`**; **verify:** `okValue` and `okNotSeed` → **`true`**. Outermost sample/verify `action` owns transaction boundary (Runtime §5). |
| **Source-level acceptance** | Reviewed **SY-L3.1-STATUS-1**: delegated mutation via param + helper; one `set` in helper only; no inline `set` in callers; module/carrier match — **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **SY-L3.2** | Sibling `graph_set_block/` — `set:` block; no param delegation. |
| **SY-L3.3** | Sibling `graph_set/` — inline single `set` in entry `action`; **does not** satisfy **SY-L3.1** registry row. |
| **Parser / runtime** | [PARSER_AUDIT.md](PARSER_AUDIT.md) gaps remain **OPEN**; no parser/runtime execution claim in this contract slice. |
| **Normative refs** | Runtime §3–§6, §15–§16, §24; Parser §5.2, §7.5; `GSCHEMA_V0_1.md` §7; [POLICY.md](POLICY.md) §4.3; [DECISIONS.md](DECISIONS.md) **OQ-SY-L3.1-A1…A4** |


#### 19.6.12 SY-L4.1 — `on_emit` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-GOLDEN-SYNTAX-SY-L4.1-LAND-1** (contract **GS-EXAMPLE-CORPUS-SY-L4.1-SPEC-2**; status **GS-EXAMPLE-CORPUS-SY-L4.1-STATUS-1**) |
| **Purpose** | Minimal **domain event + handler pairing**: module-level **`on`** for a typed **domain event**; outermost sample/verify **`action`** performs **`create`** (fixture staging only) → **`emit`** with scalar payload — distinct from **SY-L3.3** inline **`set`** mutation. |
| **Status** | **LANDED** — `programs/03-advanced/syntax/on_emit/on_emit.gs` + `on_emit_carrier.gschema`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Queue ID** | **SY-L4.1** — Level **L4**; **Depth** **S1** (primary **`on`**); registry **S0/S1/S2** metadata **S2** (event + handler pairing); Primary **`on` handler**; Secondary **`emit`** |
| **Module** | `example.syntax.on_emit` (**OQ-SY-L4.1-A2=A**) |
| **GS path** | `programs/03-advanced/syntax/on_emit/on_emit.gs` (**SY-A1=B**, **SY-STR-A1=A**; physical path reconciled **OQ-SY-L4.4-A7=B**) |
| **Schema path** | `programs/03-advanced/syntax/on_emit/on_emit_carrier.gschema` — unified `module`; **`public event`** + minimal **`public entity`** for **`create`** fixture (**L3-A1=B**, **OQ-SY-3=B**) |
| **Owner decisions** | **OQ-SY-L4.1-A1=A** … **A5=C**; **L3-A4=C**; **VERIFY-A3=A**; **OQ-SY-L4.1-A4=A** (no L3-style **`set`** coverage) |
| **Event contract** | **Domain event** (not lifecycle §25): `public event … { <one scalar field>: <scalar type> }` in `.gschema`; **`emit EventName:`** with **one** payload field; handler **`on EventName(event: EventName) { … }`** (**OQ-SY-L4.1-A3=A**); **no** `on Entity.created(...)` / dotted lifecycle ref |
| **GS contract** | Module-level **`on`** handler; **`action`** entry points **`on_emit_sample` / `on_emit_verify`**; emitting **`action`:** `create` fixture entity → **`emit`** typed event; **no** inline **`set`** in sample/verify bodies; handler body **read-only** w.r.t. graph (`fn` / local logic only per Runtime §13–§14) unless a future owner slice explicitly expands — **not** in this contract |
| **Primary construct** | `on EventName(event: EventName) { … }` (Parser §5.3; Runtime §11) |
| **Secondary** | `emit EventName:\n    field: value` or bare `emit EventName` when payload empty per Parser §7.7 (this specimen uses **one** scalar field) |
| **Metadata** | **S2** (registry column; **SY-A2=B**); **Depth** column **S1** = primary construct tier |
| **Transaction / dispatch (normative)** | **`emit`** in **`action`** is transactional; handlers run **after** commit in a **separate** transaction (Runtime §10–§12). Specimen **must not** assert handler completion inside the emitting **`action`** return path. |
| **GS surface** | `on_emit_sample() -> Bool`; `on_emit_verify() -> Bool` (**L3-A4**); eager **`Bool`** locals + **`and`** where aggregation applies (**VERIFY-A3**) |
| **Source-level acceptance (LAND-1 target)** | (1) Co-located `.gschema` declares **one** `public event` with **one** scalar field + minimal `public entity` for `create`. (2) Module-level **`on`** with typed event parameter. (3) Sample/verify **`action`** each: independent **`create`** → **`emit`** with distinct scalar payload values. (4) **No** **`set`** / **`set:`** in specimen (distinct from **SY-L3.3**). (5) **No** `fn`-hosted graph mutation. (6) Emitting **`action`** returns **`Bool`** checks **wiring only** (e.g. fixture + emit present) — **not** post-commit handler side effects. (7) Self-contained module; no external fixture dependency. |
| **Expected behavior (positive)** | **sample:** after `create` + `emit`, `stage.tag is "sample-fixture"` → **`true`** (fixture only; **not** handler dispatch). **verify:** `okTag` and `okNotSample` on fixture tag → **`true`**. Distinct emit payload `code` values (`sample` / `verify`). |
| **Source-level acceptance** | Reviewed **SY-L4.1-STATUS-1**: module/carrier match; `SignalRaised` + `on SignalRaised(event: SignalRaised)`; `emit` payload field `code`; no `set`/`set:`; sample/verify independent fixtures; **no** sync-dispatch Bool — **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Dispatch verification limit** | **RUNTIME NOT VERIFIED** — successful **emit** delivery, post-commit **handler** execution, and asynchronous handler side effects are **not** verified; `*_verify() -> Bool` asserts **fixture** state only (Runtime §10–§12, §29 OPEN). |
| **SY-L3.3** | **`action` + `create` + inline `set`** + read-back — does **not** satisfy **SY-L4.1** (`on` + `emit`). |
| **Parser / runtime** | [PARSER_AUDIT.md](PARSER_AUDIT.md) snapshot may lag `emit`/`on` parser work in `graph-memory-language`; no parser/runtime execution claim. |
| **Normative refs** | `graph-memory-language`: `GS_V0_1_RUNTIME_MODEL.md` §4, §9–§12, §25, §27–§28; `GS_PARSER_CONTRACT_V0_1.md` §5.3, §7.7; [POLICY.md](POLICY.md) §4.3; [DECISIONS.md](DECISIONS.md) **OQ-SY-L4.1-A1…A5**; [GAPS.md §8.1](GAPS.md#81-syntax-track-queue-authoring-blockers-196-footer) (**REL-1** scope) |

#### 19.6.13 SY-L4.2 — `graph_connect` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-EXAMPLE-CORPUS-SY-L4.2-LAND-1** (contract **GS-EXAMPLE-CORPUS-SY-L4.2-SPEC-2**; status **GS-EXAMPLE-CORPUS-SY-L4.2-STATUS-1**) |
| **Purpose** | Minimal **graph edge creation**: two **`create`** endpoint entities → **typed** **`connect`** with **one** scalar relation property — first dedicated Syntax Track **`connect`** golden; distinct from **SY-L3.3** **`set`** and **SY-L4.1** **`emit`**. |
| **Status** | **LANDED** — `programs/03-advanced/syntax/graph_connect/graph_connect.gs` + `graph_connect_carrier.gschema`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Queue ID** | **SY-L4.2** — Level **L4**; **Depth** **S1**; registry **S2**; Primary **`connect` / `create`**; Secondary **explicit rel type** |
| **Module** | `example.syntax.graph_connect` (**OQ-SY-L4.2-A2=A**) |
| **GS path** | `programs/03-advanced/syntax/graph_connect/graph_connect.gs` (**SY-A1=B**, **SY-STR-A1=A**; **OQ-SY-L4.4-A7=B**) |
| **Schema path** | `programs/03-advanced/syntax/graph_connect/graph_connect_carrier.gschema` — unified `module` (**L3-A1=B**, **OQ-SY-3=B**) |
| **Owner decisions** | **OQ-SY-L4.2-A1=A** … **A5=C**; **L3-A4=C**; **VERIFY-A3=A**; language connect **A1/A2** (Parser §16) |
| **GSchema contract** | **Two** `public entity` types (one scalar field each, e.g. `label: String`) + **one** `public relation` with explicit `from` / `to` endpoint types and cardinality per `GSCHEMA_V0_1.md` §4–§5 (full `public relation` form, not inline-only). **Exactly one** scalar in relation `properties:` (schema) matching the **one** field in the **`connect:`** block (**OQ-SY-L4.2-A3=B**). Illustrative relation name **`LINK`** (specimen-local). |
| **GS contract** | Outermost **`action`** sample/verify: `let left EndpointA = create EndpointA:` …; `let right EndpointB = create EndpointB:` …; **`let edge LINK = connect left -LINK-> right:`** + **one** scalar property (normative shape per Runtime §17; Parser §16 **A2**). **V0.1** operator **`-LINK->`** (**OQ-SY-L4.2-A5=C**). **No** **`set`** / **`set:`** in specimen (**OQ-SY-L4.2-A4**). |
| **Primary construct** | `connect` + typed binding `let edge RelType = connect … -RelType-> …` (Runtime §17) |
| **Secondary** | `create` endpoint entities (Runtime §16); explicit relation type in binding |
| **Metadata** | **S2** (registry); **Depth** **S1** |
| **Transaction note** | Outermost **`action`** = transaction boundary (Runtime §5); relation creation participates in same outer transaction as endpoint **`create`** calls. |
| **GS surface** | `graph_connect_sample() -> Bool`; `graph_connect_verify() -> Bool` (**L3-A4**) |
| **Sample / verify (normative)** | Each **`action`:** independent endpoint **`create`** values → **`connect`** with distinct endpoint labels and property scalar where applicable → **`Bool`** from **endpoint fixture** fields only (e.g. `left.label is "…"`) — **not** relation edge read-back (**OQ-SY-L4.2-A4=A**). Eager **`Bool`** + **`and`** in verify (**VERIFY-A3**). |
| **Expected behavior (positive)** | **sample:** `EndpointA`/`EndpointB` labels `sample-left` / `sample-right`; `connect` `weight: 1`; `okLeft and okRight` on endpoint labels → **`true`**. **verify:** labels `verify-left` / `verify-right`; `weight: 2`; `okLeft and okRight and okNotSample` → **`true`**. Typed binding `let edge LINK = connect …` present; **`edge`** not used in Bool (wiring only). |
| **Source-level acceptance** | Reviewed **SY-L4.2-STATUS-1**: module/carrier match; `LINK` relation `from EndpointA` / `to EndpointB`; `weight: Int` in schema + `connect:` block; typed `-LINK->` operator; no `set`/`emit`/`on`; independent sample/verify fixtures — **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Relation verification limit** | **RUNTIME NOT VERIFIED** — relation persistence, relation read-back, graph integrity, and parser/runtime **`connect`** compatibility are **not** verified; `*_verify() -> Bool` asserts **endpoint fixture** state only. Provisional four-token `-REL->` lexing may apply until language **A3** unified token lands ([GAPS.md §8.1](GAPS.md#81-syntax-track-queue-authoring-blockers-196-footer)). |
| **Unique coverage** | **SY-L3.3:** `create` + inline **`set`**. **SY-L4.1:** `create` + **`emit`** + **`on`**. **SY-L4.2:** **`create` ×2** + typed **`connect`** + **one** relation property — **no** dedicated **`connect`** in prior rows. |
| **Parser / runtime** | [PARSER_AUDIT.md](PARSER_AUDIT.md) may not reflect `connect`/`create` parser slices; no parser/runtime execution claim in this contract slice. |
| **Normative refs** | `GS_V0_1_RUNTIME_MODEL.md` §4–§6, §16–§17; `GS_PARSER_CONTRACT_V0_1.md` §3.2, §6.1, §16 (A1–A3, REL-1); `GSCHEMA_V0_1.md` §4–§5, §12; [POLICY.md](POLICY.md) §4.3; [DECISIONS.md](DECISIONS.md) **OQ-SY-L4.2-A1…A5** |

#### 19.6.14 SY-L4.3 — `fail_guard` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-EXAMPLE-CORPUS-SY-L4.3-LAND-1** (contract **GS-EXAMPLE-CORPUS-SY-L4.3-SPEC-2**; status **GS-EXAMPLE-CORPUS-SY-L4.3-STATUS-1**) |
| **Purpose** | Minimal **explicit abort path**: scalar **`if`** guard → **`fail "message"`** for invalid input; valid input proceeds — first dedicated Syntax Track **`fail`** golden; distinct from **SY-L1.3** (branching without **`fail`**) and **SY-L4.4** (**`exists`** + **`if`**). |
| **Status** | **LANDED** — `programs/03-advanced/syntax/fail_guard/fail_guard.gs` + `fail_guard_carrier.gschema`; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Queue ID** | **SY-L4.3** — Level **L4**; **Depth** **S0**; registry metadata **S1**; Primary **`fail`**; Secondary **`if` guard** |
| **Module** | `example.syntax.fail_guard` (**OQ-SY-L4.3-A2=A**) |
| **GS path** | `programs/03-advanced/syntax/fail_guard/fail_guard.gs` (**SY-A1=B**, **SY-STR-A1=A**; **OQ-SY-L4.4-A7=B**) |
| **Schema path** | `programs/03-advanced/syntax/fail_guard/fail_guard_carrier.gschema` — unified `module`; minimal **`public entity`** only (**OQ-SY-L4.3-A4=B**, **L3-A1=B**) |
| **Owner decisions** | **OQ-SY-L4.3-A1=B** … **A6=A**; **L3-A4=C**; **VERIFY-A3=A** |
| **GS contract** | **`private fn`** (e.g. `requireNonNegative(value Int) -> Int`): **`if value is below 0:`** (CMP-01) → **`fail "…"`** (reachable when `value` invalid); else **`return value`**. **`action fail_guard_sample() -> Bool`** / **`fail_guard_verify() -> Bool`**: call helper with **valid** distinct scalars; **`Bool`** from successful-path locals only — **no** executed **`fail`** on sample/verify entry paths (**OQ-SY-L4.3-A3=A**). Eager **`Bool`** + **`and`** in verify (**VERIFY-A3**). **No** try/catch; **no** graph **`set`** / **`emit`** / **`connect`** for coverage. |
| **Negative path** | **`fail`** branch must be **reachable** for invalid helper arguments (control-flow live in **`fn`**), not dead code — e.g. invalid `value` would enter guard; sample/verify **do not** invoke that path. |
| **GSchema contract** | One **`public entity`** with one scalar field (e.g. `label: String` or `tag: String`) for optional module fixture symmetry — **no** error types, **no** gm-error/registry constructs in `.gschema` (**GSCHEMA_V0_1.md** §7). |
| **Primary construct** | **`fail "message"`** (Runtime §8; Parser §7.6) |
| **Secondary** | **`if`** scalar guard (Core §8; CMP-01 ordering words) |
| **Metadata** | Registry column **S1** (S0 depth + S1 GS-specific **`fail`**) |
| **Transaction note (normative language only)** | Runtime §5–§8: **`fail`** aborts outermost **action** transaction when executed — specimen **does not** execute **`fail`** in sample/verify; **no** rollback assertion in corpus acceptance. |
| **gm-error direction** | **OWNER ARCHITECTURAL DIRECTION** ([DECISIONS.md §2.3](DECISIONS.md#23-gm-error--owner-architectural-direction-sy-l43-not-implementation-contract)): GS **`fail`** should eventually map into **`graph-memory-error`** (`ErrorInstance` / registry model) — **OPEN** implementation (**GM-ERR-A1…A5**; **MOD-ERR-PROP** DEFERRED). **OQ-SY-L4.3-A5=A**: source stays **`fail "literal"`** only — no error-code syntax in `.gs`. |
| **GS surface** | `fail_guard_sample() -> Bool`; `fail_guard_verify() -> Bool` (**L3-A4**) |
| **Expected behavior (positive)** | **sample:** `requireNonNegative(5)` → **`5`**; `ok` when `n is 5` → **`true`**. **verify:** `requireNonNegative(10)`; `okValue and okNotSample` → **`true`**. **`fail`** branch not taken on sample/verify paths. |
| **Source-level acceptance** | Reviewed **SY-L4.3-STATUS-1**: module/carrier match; `requireNonNegative` + `if value is below 0:` + `fail "Negative value"`; sample `5` / verify `10`; eager **`Bool`** + **`and`**; no graph ops / **`exists`** primary — **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **Verification limit** | **RUNTIME NOT VERIFIED** — parser **`fail`** support, **executed abort**, transaction **rollback**, **`ErrorInstance`** construction, **gm-error** mapping, and **`ErrorEnvelope`** propagation **not** verified; `*_verify() -> Bool` asserts helper return on **positive** paths only ([GAPS.md §8.4](GAPS.md#84-gm-error-integration-open-questions-sy-l43)). |
| **Unique coverage** | **SY-L1.3:** **`if`** without **`fail`**. **SY-L2.3:** **`exists`** optional guards. **SY-L4.3:** scalar guard + **`fail`**. **SY-L4.4:** **`exists`** + **`if`** narrowing family (§19.6.15). |
| **Parser / runtime** | [PARSER_AUDIT.md](PARSER_AUDIT.md); `Lexicon/LANGUAGE_SCRIPT_V0_1.md` — **`fail`** parser **NOT IMPLEMENTED**; no parser/runtime execution claim in this contract slice. |
| **Normative refs** | `GS_V0_1_RUNTIME_MODEL.md` §3–§6, §8; `GS_PARSER_CONTRACT_V0_1.md` §7.6; `GS_V0_1_LANGUAGE_CORE.md` §8; `GS_V0_1_TYPE_SYSTEM.md` §17 (deferred typed errors); [POLICY.md](POLICY.md) §4.3; [DECISIONS.md](DECISIONS.md) **OQ-SY-L4.3-A1…A6**, [§2.3](DECISIONS.md#23-gm-error--owner-architectural-direction-sy-l43-not-implementation-contract) |

#### 19.6.15 SY-L4.4 — `exists_if` family (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Slice** | **GS-EXAMPLE-CORPUS-SY-L4.4-SPEC-2** (contract); **GS-EXAMPLE-CORPUS-SY-L4.4-LAND-1A/B/C** (mandatory on-disk); status **GS-EXAMPLE-CORPUS-SY-L4.4-STATUS-1** |
| **Purpose** | **Predicate before use:** optional `T?` bindings exercised through **`if exists` / `if not exists`** statement guards and flow narrowing — distinct from **SY-L2.3** ( **`exists` / `not exists` as `Bool` locals** without `if` narrowing body) and **SY-L4.3** (scalar **`if`** + **`fail`**, not **`exists`** primary). Expanded null surface per **OQ-SY-L4.4-A8=B** via separate **`null_narrowing`** specimen. |
| **Status** | **LANDED** — three mandatory modules under `programs/03-advanced/syntax/` (§19.6.15.1–§19.6.15.3); **SOURCE-LEVEL ACCEPTED** (reviewed **SY-L4.4-STATUS-1**); **RUNTIME NOT VERIFIED**. **Expanded coverage** specimens (§19.6.15.4) remain **NOT LANDED**. |
| **Queue ID** | **SY-L4.4** — Level **L4** (historical queue identity); **Depth** **S0**; registry metadata **S1**; Primary **`exists`**; Secondary **`if`**; Concept **predicate before use** |
| **Physical placement** | `programs/03-advanced/syntax/` (**OQ-SY-L4.4-A4=A**, **OQ-SY-L4.4-A7=B**) — **not** `programs/04-complex/syntax/` (relocated L4.1–L4.3 precedent). Queue Level **L4** does **not** require `programs/04-complex/`. |
| **Owner decisions** | **OQ-SY-L4.4-A1=C** (two narrowing patterns → **two** programs); **A2=A**; **A3=A**; **A4=A**; **A5=A**; **A6=EXPANDED COVERAGE** (§19.6.15.4 backlog); **A7=B**; **A8=B** (expanded null checks); **VERIFY-A3=A**; **VERIFY-A5=B** |
| **GSchema** | **None** for §19.6.15.1–§19.6.15.3 — pure scalar optional specimens (**no** invented carrier). Graph fixtures **not** in scope. |
| **Normative refs (language SoT)** | Common §22 (`exists` / `not exists`); `GS_V0_1_TYPE_SYSTEM.md` §12–§13; `GS_VAR_LET_TYPE_AND_NULLABILITY_CONTRACT_CANONICAL.md` §12.1–§12.2 (`exists` narrowing), §12.4 (`is null` / `is not null`); Core control-flow / `if` (statement blocks). **Owner block `let` / `pub` semantics** — **OQ-GS-LET-PUB-1** ([DECISIONS.md](DECISIONS.md)) — **Example direction**; **not** automatic GS V0.1 grammar. |
| **Parser / runtime** | [PARSER_AUDIT.md](PARSER_AUDIT.md) — `exists` may parse in isolation; VAR_LET §14 lists **`exists`**, **`is null`**, control-flow narrowing as **NOT IMPLEMENTED** / **GAP-05**. **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** — no compile/run/narrowing proof. |
| **Unique coverage** | **SY-L2.3:** optional + **`exists` Bool** guards. **SY-L4.4:** **`if exists` / guard** + **use narrowed `T`** in statement bodies. **SY-L4.3:** **`fail`** + scalar **`if`**. **`null_narrowing`:** **`is null` / `is not null`** narrowing path (VAR_LET §12.4) — orthogonal to **`exists`** primary row but landed under same queue contract family. |
| **Mandatory paths (on disk)** | `exists_if_present/exists_if_present.gs`; `exists_if_guard/exists_if_guard.gs`; `null_narrowing/null_narrowing.gs` |

##### 19.6.15.1 `exists_if_present` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Module** | `example.syntax.exists_if_present` |
| **Path** | `programs/03-advanced/syntax/exists_if_present/exists_if_present.gs` |
| **Coverage** | `String?` (or equivalent scalar `T?`) via **literal / `null` only** — **no** `.get` OOB matrix (**OQ-SY-L4.4-A2=A**). **`if exists identifier:`** true branch **uses** binding as narrowed **`String`** (e.g. `return candidate`). Absent path returns **fallback** string — **no** **`fail`** (**OQ-SY-L4.4-A3=A**). |
| **GS surface** | `exists_if_present_sample() -> String`; `exists_if_present_verify() -> Bool` (**fn** only — **OQ-SY-L4.4-A5=A**) |
| **Verify (positive)** | Present optional → sample/verify return expected string; absent (`null`) → fallback; eager **`Bool`** locals + **`and`** (**VERIFY-A3**). |
| **Source-level acceptance** | Reviewed **SY-L4.4-STATUS-1**: module/path match; `presentOrFallback` + `if exists candidate:` + `return candidate`; sample `"sample-present"` / verify present+`null` paths; eager **`Bool`** + **`and`**; no `.gschema` — **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |

##### 19.6.15.2 `exists_if_guard` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Module** | `example.syntax.exists_if_guard` |
| **Path** | `programs/03-advanced/syntax/exists_if_guard/exists_if_guard.gs` |
| **Coverage** | Separate program from §19.6.15.1 (**OQ-SY-L4.4-A1=C**). **`if not exists identifier:`** → **early `return`** fallback; subsequent code **uses** binding as narrowed **`String`** (VAR_LET §12.2 guard-clause pattern). Optional literals / **`null` only** (**A2=A**). **No** **`fail`**. |
| **GS surface** | `exists_if_guard_sample() -> String`; `exists_if_guard_verify() -> Bool` |
| **Verify (positive)** | Present path returns narrowed value after guard; absent path returns fallback from guard branch; eager **`Bool`** + **`and`**. |
| **Source-level acceptance** | Reviewed **SY-L4.4-STATUS-1**: distinct module; `requireOrFallback` + `if not exists` early return + post-guard `return candidate`; independent fixtures — **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |

##### 19.6.15.3 `null_narrowing` (**LANDED**)

| Field | Specification |
| ----- | ------------- |
| **Module** | `example.syntax.null_narrowing` |
| **Path** | `programs/03-advanced/syntax/null_narrowing/null_narrowing.gs` |
| **Coverage** | Nullable **identifier** `T?`; **`if x is not null:`** / **`if x is null:`** per VAR_LET §12.4.1. **No** `exists` / `not exists` in source. **Separate program** from exists specimens (**OQ-SY-L4.4-A8=B**). |
| **GS surface** | `null_narrowing_sample() -> String`; `null_narrowing_verify() -> Bool` |
| **Verify (positive)** | Four paths via `presentOrFallback` + `nullGuardOrValue`; four eager **`Bool`** locals + **`and`**; **no** **`fail`**. |
| **Source-level acceptance** | Reviewed **SY-L4.4-STATUS-1**: `is null` / `is not null` helpers; present/absent fixtures; no `.gschema` — **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |

##### 19.6.15.4 Expanded coverage backlog (**OQ-SY-L4.4-A6** — separate golden programs, **NOT LANDED**)

Owner requires **additional** isolated specimens (each its **own** directory module under `programs/03-advanced/syntax/` unless a future decision relocates). **Do not** merge into §19.6.15.1–§19.6.15.3. **Do not** assert undefined language semantics as normative — specimens document **owner-approved direction** (**OQ-GS-LET-PUB-1**, scope rules) pending language SoT.

| Proposed slug | Intent | Owner direction vs language SoT |
| ------------- | ------ | ------------------------------- |
| `let_block_pub` | `let:` block; **`pub`** exports; private default bindings | **A** approved semantics **OQ-GS-LET-PUB-1**; **B** grammar OPEN |
| `let_block_shadow` | Shadowing / nested `let:` blocks | **B** scope contract OPEN |
| `nested_if_let` | Nested **`if`** + block-local **`let`** | **B** lexical scope OPEN |
| `multi_binding_calc` | Multiple bindings + cross-binding arithmetic in block | **C** specimen backlog |
| `var_block_mut` | `var:` block vs standalone **`var`** mutability parity | **A** mutability direction; **B** `var:` grammar OPEN |
| `action_readonly_warn` | Read-only **`action`** body (diagnostic narrative) | **A** **OQ-GS-ACTION-DIAG-1** warning direction; **D** implementation OPEN |

Landing order for §19.6.15.4 is **out of scope** for **SY-L4.4** registry flip — track in [GAPS.md §8.5](GAPS.md#85-sy-l44-coverage-backlog).

**OPEN blockers for queue authoring:** see [GAPS.md §8.1](GAPS.md#81-syntax-track-queue-authoring-blockers-196-footer).

### 19.7 Blocking owner questions (Syntax Track)

Canonical **OQ-SY-*** and Syntax Track gaps: **[GAPS.md §8.2](GAPS.md#82-syntax-track-owner-questions-monolith-197)**. **DECIDED** outcomes: [DECISIONS.md](DECISIONS.md). **OQ-SY-2** remains **OPEN**.

**L5 saturation:** Modular track remains **NOT SATURATED** (queue [L5_PROJECT_SYSTEM.md §16](L5_PROJECT_SYSTEM.md#16-l5-golden-project-queue): L5.6–L5.7 **CONFIRMED**, L5.8 **BLOCKED**, L5.10 **CONFIRMED**, L5.11 **PROPOSED**). Syntax Track does not change L5 saturation criteria.
