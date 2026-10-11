# Example Corpus — L3 Advanced Syntax (subtrack)

**Status:** **CANONICAL** (Example repository — golden specimens for advanced GS surface under **physical L3**; not GS language SoT)
**Slice:** **GS-EXAMPLE-CORPUS-L3-ADV-SY-OWNER-CONTRACT-1**; **L3-ADV-SY-01…04** — **LANDED** §7–§10 (**GS-EXAMPLE-CORPUS-L3-ADV-SY-04-STATUS-1**); initial subtrack backlog **complete**
**Owner decisions:** [DECISIONS.md](DECISIONS.md) (**OQ-L3-ADV-A1** … **A4**). **OPEN / gaps:** [GAPS.md §8.6](GAPS.md#86-l3-advanced-syntax-subtrack).
**Related (unchanged):** [SYNTAX_TRACK.md](SYNTAX_TRACK.md) — historical **SY-L1.1**–**SY-L5.3** queue (**15/18 LANDED**); [POLICY.md](POLICY.md) §1–§2 (current paths); [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md) (target layout, **R3** migration); [CHARTER.md](CHARTER.md) §2 (classic L3 algorithms).

**Post-R4 paths:** **L3-ADV-SY-01…04** specimens — `programs/language-features/…` (див. `specimen.yaml` → `historical.classic_level_path` was `programs/03-advanced/syntax/…`). §7–§10 нижче описують **authoring contract**; **4/4 SOURCE-LEVEL ACCEPTED**; runtime **not** verified.

---

## 1. Purpose and boundaries

**L3 Advanced Syntax** documents **additional** golden specimens that:

- Live under **`programs/03-advanced/syntax/<module-slug>/`** (**SY-A1=B**, **SY-STR-A1=A**).
- Extend GS **block bindings**, **control flow**, and related surface **without** growing the monolithic Syntax Track registry body.
- Remain on **physical / corpus L3** — **no** classic level migration, **no** renumbering of historical **SY-L*** queue IDs, **no** change to **15/18** landed Syntax Track rows unless a **separate** owner slice explicitly updates a **SY-L*** row.

**Non-goals:** Parser/compiler implementation; declaring L3 classic algorithms **SATURATED**; replacing **L5_PROJECT_SYSTEM.md** modular projects; Graph Intelligence authoring (future owner epic).

**Naming:** Subtrack specimen IDs **`L3-ADV-SY-01…04`** — **LANDED** (§7–§10). They are **not** automatic aliases of **SY-L*** registry rows.

---

## 2. Normative alignment (language SoT)

Example specimens follow `graph-memory-language` where cited. **Owner decisions below** refine **Example authoring**; they do **not** amend language repos unless a future language slice explicitly adopts them.

| Topic | Language SoT (primary) | Owner contract | Consistency |
| ----- | ---------------------- | -------------- | ----------- |
| **`let:` block** | Common §6.1; Core §1a / §11a–§11b (scope) | **OQ-L3-ADV-A1**, **A3** | **Aligned** on declaration-only, no nested `let:`, no statement `if:` inside `let:` |
| **`var:` block** | Common §6.2; Core §1b | **OQ-L3-ADV-A4** | **Aligned** on grouping-only, no `pub` |
| **Duplicate bindings** | Core §1 **D-10** (`GS_SEM_DUPLICATE_VARIABLE`); open-questions registry | **OQ-L3-ADV-A1** (invalid duplicates) | **Aligned** (semantic error; diagnostic codes **OPEN** in tooling) |
| **`pub` in `let:`** | Common §6.1 (export to immediate enclosing scope); BB-06 collisions | **OQ-L3-ADV-A3** (fn-level, not module auto-export) | **Refinement** of Example visibility narrative (**OQ-GS-LET-PUB-1**); **not** module `public` |
| **Conditional initializers** | VP `if … then:` (Common §20a / IF-11.2); **not** statement `if:` in `let:` | **OQ-L3-ADV-A1** | **Conditional expr** only if SoT permits; otherwise specimen **must not** use |
| **Forbidden forms → syntax error** | Parser/grammar detail **OPEN** (GAP-01) | **OQ-L3-ADV-A1** | Example **authoring rule**; language diagnostic tier **OPEN** until parser contract lands |
| **Shadowing / nested `let:`** | Nested `let:` **forbidden** (Common §6.1) | **OQ-L3-ADV-A1** | **`let_block_shadow`** backlog remains **BLOCKED** |

**Conflicts:** None requiring silent language rewrite. **OPEN:** exact lexer/parser rejection paths for illegal `let:` bodies (**OQ-L3-ADV-GRAM-1**); inline conditional initializer allowlist (**OQ-L3-ADV-INIT-1**).

---

## 3. Owner decisions (DECIDED) — contract summary

Full ledger: [DECISIONS.md §2](DECISIONS.md#2-decision-registry-decided).

### OQ-L3-ADV-A1 — `let:` block authoring contract

- Nested **`let:`** blocks **forbidden**.
- **`let:`** is **declaration-only**.
- Each non-empty logical entry declares **exactly one** binding: `name Type = expression` or `pub name Type = expression`.
- **Conditional expressions** as initializers **only** where normative Language SoT permits (not statement `if`/`elif`/`else` blocks inside `let:`).
- **Forbidden inside `let:`:** statement `if`/`elif`/`else` blocks; nested **`var:`**; loops; **`action`**; arbitrary statements.
- **Duplicate** binding declarations in the same `let:` block are **invalid**.
- Forbidden statement forms **must** be diagnosed as **syntax errors** (not silently parsed as conditional declarations).

### OQ-L3-ADV-A2 — Documentation subtrack (**B**)

- Maintain this **separate** document; **avoid** further growth of [SYNTAX_TRACK.md](SYNTAX_TRACK.md) for L3 Advanced specimens.
- Preserve historical **SY-L*** IDs and **15/18** Syntax Track landed status.
- **Do not** migrate physical corpus levels.

### OQ-L3-ADV-A3 — `pub` inside `let:` (**A**)

- **`pub`** exports a binding into the **immediate enclosing lexical scope** (typically **`fn`** / callable body).
- **`pub` does not** automatically export the binding **outside** the enclosing function (e.g. **not** module-level export by itself).
- Non-**`pub`** bindings remain **private** to the **`let:`** block.
- **Multiple** distinct **`pub`** bindings allowed.

### OQ-L3-ADV-A4 — `var:` block (**A**)

- **`var:`** is **grouping-only**.
- Declarations are semantically equivalent to **standalone `var`** in the enclosing scope.
- **No** additional scope, visibility, lifetime, or mutability semantics beyond Common §6.2.
- **No** implicit **`pub`** semantics.

---

## 4. Specimen backlog

**Initial queue (L3-ADV-SY-01…04):** all **LANDED** ([§7](#7-l3-adv-sy-01--let_block_pub-spec)–[§10](#10-l3-adv-sy-04--nested_if_optional-spec)) — **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED**. Further specimens require a **separate** owner slice (not auto-created here).

### 4.1 Initial queue (READY for SPEC at source level)

| ID | Slug | Primary | Secondary | Path | Notes |
| -- | ---- | ------- | --------- | ---- | ----- |
| **L3-ADV-SY-01** | `let_block_pub` | `let:` + `pub` | private bindings, multi-binding | `programs/03-advanced/syntax/let_block_pub/` | **LANDED** [§7](#7-l3-adv-sy-01--let_block_pub-spec); **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **L3-ADV-SY-02** | `var_block_mut` | `var:` | reassignment parity | `programs/03-advanced/syntax/var_block_mut/` | **LANDED** [§8](#8-l3-adv-sy-02--var_block_mut-spec); **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **L3-ADV-SY-03** | `nested_if_branch` | nested `if` | scalar CMP | `programs/03-advanced/syntax/nested_if_branch/` | **LANDED** [§9](#9-l3-adv-sy-03--nested_if_branch-spec); **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |
| **L3-ADV-SY-04** | `nested_if_optional` | nested `if` | optional narrowing | `programs/03-advanced/syntax/nested_if_optional/` | **LANDED** [§10](#10-l3-adv-sy-04--nested_if_optional-spec); **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |

**Conventions:** `module example.syntax.<slug>`; **`fn`** sample/verify unless graph mutation requires **`action`** (**VERIFY-A3**, **VERIFY-A5=B**); **SOURCE-LEVEL ACCEPTED** / **RUNTIME NOT VERIFIED** unless a future slice records execution.

### 4.2 Blocked / deferred (registry narrative only)

| Slug / topic | Status | Reason |
| ------------ | ------ | ------ |
| `let_block_shadow` | **BLOCKED** | Nested **`let:`** forbidden (**OQ-L3-ADV-A1**; Common §6.1) |
| `if_body_let_compact` | **BLOCKED** | Lexical scope for compact `let` in `if` body — **CONTRACT GAP** |
| `multi_binding_calc` | **DEFERRED** | Overlaps **L3-ADV-SY-01** unless split by owner |
| `action_readonly_warn` | **DEFERRED** | **OQ-GS-ACTION-DIAG-1** tooling, not pure syntax |
| Formatter alignment | **DEFERRED** | **OQ-GS-FMT-ALIGN-1** / **OQ-GS-FMT-WRAP-1** |

### 4.3 Relation to SYNTAX_TRACK §19.6.15.4

Expanded coverage slugs listed in [SYNTAX_TRACK.md §19.6.15.4](SYNTAX_TRACK.md#196154-expanded-coverage-backlog-oq-sy-l44-a6--separate-golden-programs-not-landed) are **superseded for authoring** by this subtrack queue where IDs overlap — landing status tracked **here** for **L3-ADV-SY-*** rows. **SY-L4.4** mandatory trio remains **LANDED** in §19.6.15; §19.6.15.4 items stay **NOT LANDED**.

---

## 5. OPEN contracts (Example + language)

| ID | Status | Notes |
| -- | ------ | ----- |
| **OQ-L3-ADV-GRAM-1** | OPEN | Parser syntax-error shapes for illegal `let:` / `var:` bodies (**GAP-01**) |
| **OQ-L3-ADV-INIT-1** | OPEN | Allowlist of initializer expressions (VP conditional vs forbidden statement forms) |
| **OQ-GS-LET-PUB-GRAM-1** | OPEN | Shadowing, lifetime, type-check depth (**OQ-GS-LET-PUB-1** partial overlap) |
| **OQ-GS-ACTION-DIAG-CODE-1** | OPEN | Read-only `action` warning |
| **OQ-GS-FMT-WRAP-1** | OPEN | Formatter wrap rules |

---

## 6. Acceptance labels

| Label | Meaning |
| ----- | ------- |
| **NOT LANDED** | No on-disk specimen under approved path (SPEC alone does **not** land) |
| **SOURCE-LEVEL ACCEPTED** | Specimen + review per POLICY; not parser/runtime proof |
| **RUNTIME NOT VERIFIED** | Default until explicit tool execution slice |

---

## 7. L3-ADV-SY-01 — `let_block_pub` (SPEC + LANDED)

**Slice:** **GS-EXAMPLE-CORPUS-L3-ADV-SY-01-SPEC-1**; **LAND-1**; **STATUS-1** (**GS-EXAMPLE-CORPUS-L3-ADV-SY-01-STATUS-1**)  
**Corpus level:** L3 Advanced Syntax (**physical** `programs/03-advanced/syntax/`). **No** L4/L5 transition. **Orthogonal** to historical Syntax Track **SY-L*** (**15/18 LANDED** unchanged).

### 7.1 Identity

| Field | Value |
| ----- | ----- |
| **ID** | **L3-ADV-SY-01** |
| **Slug** | `let_block_pub` |
| **GS path** | `programs/03-advanced/syntax/let_block_pub/let_block_pub.gs` (**SY-A1=B**, **SY-STR-A1**) |
| **Module** | `example.syntax.let_block_pub` |
| **Metadata** | **S0** (core binding surface; registry column semantics per [POLICY.md](POLICY.md)) |
| **Primary construct** | **`let:`** declaration block (Common §6.1) |
| **Secondary construct** | **`pub`** binding export to **immediate enclosing lexical scope** (**OQ-L3-ADV-A3**; **OQ-GS-LET-PUB-1**) |
| **Status** | **LANDED** — `let_block_pub.gs` on disk; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |

### 7.2 Normative references

| Tier | Anchor | Role |
| ---- | ------ | ---- |
| Shared | `GRAPH_LANGUAGE_COMMON_SYNTAX_V0_1.md` **§6.1** | `let:` shape: `name Type = expr` / `pub name Type = expr`; isolated scope; no nested `let:`; no statement `if:` |
| Core | `GS_V0_1_LANGUAGE_CORE.md` §1a, §11a–§11b | Immutable `let` semantics; GS scope architecture |
| Example | **OQ-L3-ADV-A1** | Declaration-only `let:`; forbidden interiors; duplicate bindings invalid |
| Example | **OQ-L3-ADV-A3** | `pub` → fn-level (immediate enclosing scope); not module auto-export |
| Example | **OQ-GS-LET-PUB-1** | Private-by-default in `let:`; **`pub let`** standalone **forbidden**; multiple **`pub`** in block allowed |
| Example | [POLICY.md](POLICY.md) §1–§2, §11 | Path/module layout; **`fn`** sample/verify convention |
| Compare | [SYNTAX_TRACK.md](SYNTAX_TRACK.md) **SY-L1.1** | Standalone compact `let` / `var` only — **not** `let:` block |

### 7.3 Semantics contract (authoring)

**Required (positive):**

- **`let:`** introduces an **isolated lexical scope** for its non-**`pub`** bindings.
- Each logical entry declares **exactly one** binding: `name Type = expression` or `pub name Type = expression`.
- **Non-**`pub` bindings are **private** to the `let:` block and **must not** be referenced after the block ends.
- **`pub`** bindings are exported into the **immediate enclosing lexical scope** (the enclosing **`private fn`** body in this specimen).
- **Multiple** distinct **`pub`** bindings are allowed by contract; this specimen uses **one** **`pub`** binding (minimal positive path).
- **`pub` does not** imply module-level **`public`** export; exported names are visible only within the enclosing function body unless separately exported at module scope (out of scope here).

**Forbidden inside `let:` (must not appear in this specimen):**

- Nested **`let:`**; **`var:`**; statement **`if` / `elif` / `else`**; loops; **`action`**; arbitrary statements.
- **Duplicate** binding names in the same block.
- **Inline conditional expressions** in initializers (**OQ-L3-ADV-INIT-1** — excluded from this specimen by design).
- Standalone **`pub let name Type = expr`** (**OQ-GS-LET-PUB-1**).

**Normative example shape (language SoT — not a substitute for §7.4):**

```gs
let:
    count Int = 0
    pub total Int = count + 1
```

(Common §6.1 — indentation significant; one binding per line.)

### 7.4 On-disk specimen (LAND-1)

**Path:** `programs/03-advanced/syntax/let_block_pub/let_block_pub.gs`. Grammar per Common §6.1 at source level; parser acceptance **not** claimed (**GAP-01**).

```gs
module example.syntax.let_block_pub

private fn calculate() -> Int {
    let:
        first Int = 10
        second Int = 20
        pub total Int = first + second

    return total
}

fn let_block_pub_sample() -> Int {
    return calculate()
}

fn let_block_pub_verify() -> Bool {
    let result Int = let_block_pub_sample()
    let expected Int = 30

    let okSum Bool = result is expected
    let okNotFirst Bool = result is not 10
    let okNotSecond Bool = result is not 20

    return okSum and okNotFirst and okNotSecond
}
```

**Behavioral intent:**

- **`calculate`:** enter `let:`; **two** private **`Int`** bindings; **one** **`pub`** computed binding (`first + second`); use **`total`** **after** the `let:` block via **`return total`**.
- **`let_block_pub_sample`:** delegate to **`calculate`**; return **`Int`** (**30**).
- **`let_block_pub_verify`:** independent eager **`Bool`** locals; combine with **`and`**; **no** reference to **`first`** / **`second`** outside `let:`.

### 7.5 Sample / verify design

| Entrypoint | Signature | Contract |
| ---------- | --------- | -------- |
| **sample** | `fn let_block_pub_sample() -> Int` | Calls **`calculate()`**; returns computed sum |
| **verify** | `fn let_block_pub_verify() -> Bool` | **`result is 30`** plus negated partial sums; **`and`** combination |

**Expected positive values:** `let_block_pub_sample()` → **30**; `let_block_pub_verify()` → **`true`** under source-level review (CMP-01 `is` / `is not`).

### 7.6 Coverage boundary

**Demonstrates:**

- `let:` block with multiple bindings;
- private-by-default + **`pub`** export;
- initializer expressions referencing earlier **private** bindings inside the block;
- use of **exported** binding after block end;
- **`private fn`** helper + public **`fn`** sample/verify pair.

**Does not demonstrate:**

- Shadowing; nested **`let:`**; nested **`if`**; conditional initializer; **`var:`**; graph **`action`** / **`set`** / **`connect`**; module-level **`public`** export; parser acceptance or runtime execution.

### 7.7 Acceptance gates (STATUS-1 review)

**Labels:** **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED**. Independent file review **GS-EXAMPLE-CORPUS-L3-ADV-SY-01-STATUS-1** — **no** parser/runtime execution.

| Gate | Criterion | STATUS-1 |
| ---- | --------- | -------- |
| **G-01** | Module `example.syntax.let_block_pub`; path `programs/03-advanced/syntax/let_block_pub/let_block_pub.gs` | **PASS** |
| **G-02** | Valid **`let:`** block per Common §6.1 / **OQ-L3-ADV-A1** (declaration-only entries) | **PASS** |
| **G-03** | ≥ **2** private bindings; ≥ **1** **`pub`** binding; **one** binding per declaration line | **PASS** |
| **G-04** | **`pub`** binding used **after** `let:` block; private bindings **not** referenced outside block | **PASS** |
| **G-05** | **`fn let_block_pub_sample` / `let_block_pub_verify`** present; verify uses eager **`Bool`** locals + **`and`** | **PASS** |
| **G-06** | No forbidden constructs (§7.3); no **`pub let`** standalone; no inline conditional initializer | **PASS** |
| **G-07** | Source-level review against §7.2 SoT; **no** claim of parser/runtime proof | **PASS** |

### 7.8 Known implementation gaps

| Gap | Notes |
| --- | ----- |
| **GAP-01** / **GAP-02** | `let:` / block surface parser implementation — [GAPS.md §8.6](GAPS.md#86-l3-advanced-syntax-subtrack) |
| **OQ-L3-ADV-GRAM-1** | Syntax-error shapes for illegal `let:` bodies |
| **OQ-GS-LET-PUB-GRAM-1** | Full grammar, shadowing, lifetime, type-check depth for **`pub`** in **`let:`** |
| **OQ-GS-FMT-ALIGN-1** | Column alignment — illustrative layout in §7.4 is **not** normative |

### 7.9 Readiness

| Phase | Status |
| ----- | ------ |
| **SPEC-1** | **DONE** |
| **LAND-1** | **DONE** — on-disk `.gs` per §7.4 |
| **STATUS-1** | **DONE** — **LANDED**; **G-01…G-07** **PASS** |
| **Next** | Initial **L3-ADV-SY-01…04** backlog **complete** — no further queue row in §4.1 |

---

## 8. L3-ADV-SY-02 — `var_block_mut` (SPEC + LANDED)

**Slice:** **GS-EXAMPLE-CORPUS-L3-ADV-SY-02-SPEC-1**; **LAND-1**; **STATUS-1** (**GS-EXAMPLE-CORPUS-L3-ADV-SY-02-STATUS-1**)  
**Corpus level:** L3 Advanced Syntax (**physical** `programs/03-advanced/syntax/`). **No** L4/L5 transition. **Orthogonal** to historical Syntax Track **SY-L*** (**15/18 LANDED** unchanged).

### 8.1 Identity

| Field | Value |
| ----- | ----- |
| **ID** | **L3-ADV-SY-02** |
| **Slug** | `var_block_mut` |
| **GS path** | `programs/03-advanced/syntax/var_block_mut/var_block_mut.gs` (**SY-A1=B**, **SY-STR-A1**) |
| **Module** | `example.syntax.var_block_mut` |
| **Metadata** | **S0** (core binding / mutability surface; [POLICY.md](POLICY.md)) |
| **Primary construct** | **`var:`** declaration grouping (Common §6.2) |
| **Secondary construct** | Semantic parity with **standalone `var`** + post-block reassignment (**OQ-L3-ADV-A4**) |
| **Status** | **LANDED** — `var_block_mut.gs` on disk; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |

### 8.2 Normative references

| Tier | Anchor | Role |
| ---- | ------ | ---- |
| Shared | `GRAPH_LANGUAGE_COMMON_SYNTAX_V0_1.md` **§6.2** | `var:` grouping-only; `name Type = expr`; **mutable**; **no** `pub` / `let`; optional nested `var:` in SoT — **excluded** from this specimen |
| Core | `GS_V0_1_LANGUAGE_CORE.md` §1b | Mutable `var` semantics; assignment to `var` bindings |
| Example | **OQ-L3-ADV-A4** | Block ≡ standalone `var` in enclosing scope; no extra scope/visibility/lifetime/mutability |
| Example | [POLICY.md](POLICY.md) §1–§2, §11 | Path/module; **`fn`** sample/verify |
| Compare | [SYNTAX_TRACK.md](SYNTAX_TRACK.md) **SY-L1.1** | `let_vs_var` — compact **`let`** / **`var`** + reassignment; **not** **`var:`** block |
| Contrast | [§7](#7-l3-adv-sy-01--let_block_pub-spec) **L3-ADV-SY-01** | **`let:`** + **`pub`** — **out of scope** here |

**Equivalence (authoring contract — OQ-L3-ADV-A4):**

```gs
var:
    first Int = 10
    second Int = 20
```

is semantically equivalent to standalone:

```gs
var first Int = 10
var second Int = 20
```

in the same enclosing **`fn`** body. **No** special block-only mutability rules.

### 8.3 Semantics contract (authoring)

**Required (positive):**

- One **`var:`** block declares **≥ 2** mutable **`Int`** bindings (`name Type = expression` per line).
- Bindings live in the **enclosing** scope (**no** isolated block scope); **must** remain **readable and assignable after** the `var:` block ends.
- After leaving the block, **reassign** at least one binding (e.g. `first = 30`).
- Return **`first + second`** after reassignment → **50** with initial **10** / **20** and **`first`** updated to **30**.
- **No** `pub`; **no** `let:` block in this specimen.

**Forbidden in this specimen:**

- **`let:`** block; **`pub`**; shadowing narratives; **nested `var:`**; statement **`if` / `elif` / `else`**; loops; **`action`**; graph ops; conditional initializers; duplicate binding names in the same grouping.

**Normative shape (language SoT):**

```gs
var:
    count Int = 0
    total Int = 100
```

(Common §6.2 — indentation significant; declaration-only body entries.)

### 8.4 On-disk specimen (LAND-1)

**Path:** `programs/03-advanced/syntax/var_block_mut/var_block_mut.gs`. Grammar per Common §6.2 at source level; parser acceptance **not** claimed (**GAP-02**).

```gs
module example.syntax.var_block_mut

private fn sumAfterReassign() -> Int {
    var:
        first Int = 10
        second Int = 20

    first = 30

    return first + second
}

fn var_block_mut_sample() -> Int {
    return sumAfterReassign()
}

fn var_block_mut_verify() -> Bool {
    let result Int = var_block_mut_sample()
    let expected Int = 50
    let initialSum Int = 30

    let okSum Bool = result is expected
    let okNotInitialSum Bool = result is not initialSum
    let okNotSecondAlone Bool = result is not 20

    return okSum and okNotInitialSum and okNotSecondAlone
}
```

**Behavioral intent:**

- **`sumAfterReassign`:** `var:` declares **`first`**=10, **`second`**=20; exit block; **`first = 30`**; **`return first + second`** → **50**.
- **`var_block_mut_sample`:** delegate to helper; return **50**.
- **`var_block_mut_verify`:** **`result is 50`**; **`result is not 30`** (initial sum before reassignment); third check distinguishes final sum from **`second`** alone; **`and`** combination.

### 8.5 Sample / verify design

| Entrypoint | Signature | Contract |
| ---------- | --------- | -------- |
| **sample** | `fn var_block_mut_sample() -> Int` | Calls **`sumAfterReassign()`**; returns **50** |
| **verify** | `fn var_block_mut_verify() -> Bool` | Expected **50**; not initial **30**; eager **`Bool`** + **`and`** |

**Expected (source-level):** `var_block_mut_sample()` → **50**; `var_block_mut_verify()` → **`true`** (CMP-01 `is` / `is not`).

### 8.6 Coverage boundary

**Demonstrates:**

- **`var:`** block with multiple declarations;
- **enclosing-scope** visibility (read/use bindings after block);
- **post-block** assignment to a **`var`** binding;
- combined read after mutation;
- **`private fn`** helper + **`fn`** sample/verify.

**Does not demonstrate:**

- **`let:`** / **`pub`**; shadowing; nested **`var:`**; nested **`if`**; conditional initializer; graph surface; module **`public`** export; parser/runtime proof.

### 8.7 Acceptance gates (STATUS-1 review)

**Labels:** **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED**. Independent file review **GS-EXAMPLE-CORPUS-L3-ADV-SY-02-STATUS-1** — **no** parser/runtime execution.

| Gate | Criterion | STATUS-1 |
| ---- | --------- | -------- |
| **G-01** | Module `example.syntax.var_block_mut`; path `programs/03-advanced/syntax/var_block_mut/var_block_mut.gs` | **PASS** |
| **G-02** | Valid **`var:`** block per Common §6.2 / **OQ-L3-ADV-A4** (declaration-only `name Type = expr` entries; **no** `pub` / `let`) | **PASS** |
| **G-03** | ≥ **2** declarations inside one **`var:`** block | **PASS** |
| **G-04** | Both bindings referenced **after** the `var:` block (in assignment and/or `return`) | **PASS** |
| **G-05** | At least one **post-block** reassignment (`first = 30` or equivalent) before final read | **PASS** |
| **G-06** | **`fn var_block_mut_sample` / `var_block_mut_verify`**; verify uses independent eager **`Bool`** locals + **`and`** | **PASS** |
| **G-07** | Source-level consistency with §8.2; no unsupported constructs; **no** parser/runtime claim | **PASS** |

### 8.8 Known implementation gaps

| Gap | Notes |
| --- | ----- |
| **GAP-02** | `var:` block parser surface — [GAPS.md §8.6](GAPS.md#86-l3-advanced-syntax-subtrack) |
| **GAP-01** | Related block-keyword inventory |
| **OQ-L3-ADV-GRAM-1** | Illegal **`var:`** body syntax-error shapes |
| **OQ-GS-FMT-ALIGN-1** | Column alignment in §8.4 — **not** normative |

### 8.9 Readiness

| Phase | Status |
| ----- | ------ |
| **SPEC-1** | **DONE** |
| **LAND-1** | **DONE** — on-disk `.gs` per §8.4 |
| **STATUS-1** | **DONE** — **LANDED**; **G-01…G-07** **PASS** |
| **Next** | Initial **L3-ADV-SY-01…04** backlog **complete** — no further queue row in §4.1 |

---

## 9. L3-ADV-SY-03 — `nested_if_branch` (SPEC + LANDED)

**Slice:** **GS-EXAMPLE-CORPUS-L3-ADV-SY-03-SPEC-1**; **LAND-1**; **STATUS-1** (**GS-EXAMPLE-CORPUS-L3-ADV-SY-03-STATUS-1**)  
**Corpus level:** L3 Advanced Syntax (**physical** `programs/03-advanced/syntax/`). **No** L4/L5 transition. **Orthogonal** to historical Syntax Track **SY-L*** (**15/18 LANDED** unchanged).

### 9.1 Identity

| Field | Value |
| ----- | ----- |
| **ID** | **L3-ADV-SY-03** |
| **Slug** | `nested_if_branch` |
| **GS path** | `programs/03-advanced/syntax/nested_if_branch/nested_if_branch.gs` (**SY-A1=B**, **SY-STR-A1**) |
| **Module** | `example.syntax.nested_if_branch` |
| **Metadata** | **S0** (core control flow; [POLICY.md](POLICY.md)) |
| **Primary construct** | **Nested** statement **`if condition:`** bodies (Core §8) |
| **Secondary construct** | Branch-local **`return`**; word-based scalar ordering (**CMP-01** / Common §19a) |
| **Status** | **LANDED** — `nested_if_branch.gs` on disk; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |

### 9.2 Normative references

| Tier | Anchor | Role |
| ---- | ------ | ---- |
| Core | `GS_V0_1_LANGUAGE_CORE.md` **§8** | `if` / `elif` / `else` statement form; indented bodies; nested control flow permitted |
| Shared | `GRAPH_LANGUAGE_COMMON_SYNTAX_V0_1.md` **§5–§6** (block shape); **§19a** | `if condition:` + significant indentation; **`.gs`** word ordering: `is above`, `is below`, `is at least`, `is at most` |
| Decision | `GS_COMPARISON_OPERATORS_CANONICAL.md` (**CMP-01**) | Golden specimens use word-based ordering only |
| Example | [POLICY.md](POLICY.md) §1–§2, §11 | Path/module; **`fn`** sample/verify |
| Contrast | [SYNTAX_TRACK.md](SYNTAX_TRACK.md) **SY-L1.3** | **Flat** `if` / `elif` / `else` chain — **not** the primary surface of this row |
| Compare | `fail_guard.gs` (L4 queue) | Single-level **`if`** + guard — not nested classification |

**Nested `if`:** Normative Core §8 does **not** forbid nesting statement `if:` blocks; indentation defines branch bodies. **No** new owner grammar required for SPEC-1.

### 9.3 Semantics contract (authoring)

**Classification (`classify(value Int) -> String`):**

| Input condition | Result |
| --------------- | ------ |
| `value is at most 0` | `"non-positive"` |
| `0 < value` and `value is at most 10` | `"positive"` |
| `value is above 10` | `"large"` |

**Structure (minimal nesting — avoid flat `elif` chain per §9.6):**

1. **Outer** `if value is at most 0:` → `return "non-positive"`.
2. **Outer** `if value is above 0:` with **inner** `if value is at most 10:` → `return "positive"`.
3. **Fall-through** after inner/outer (inner condition false, e.g. `value` **15**) → `return "large"`.

When the **inner** condition is false but the **outer** `value is above 0` held, execution leaves the nested block without returning from the inner branch, then exits the outer `if` body, then reaches the final `return "large"`.

**Forbidden in this specimen:** `let:` / `var:` blocks; `pub`; shadowing; optional/null narrowing; graph **`action`**; value-producing `if … then` expressions; flat **`elif`** / **`else`** chain as the **primary** control-flow shape.

Standalone compact **`let`** in sample/verify is allowed (Core §1; **SY-L1.1** precedent).

### 9.4 On-disk specimen (LAND-1)

**Path:** `programs/03-advanced/syntax/nested_if_branch/nested_if_branch.gs`. Grammar per Core §8 / CMP-01 at source level; parser acceptance **not** claimed (**GS-C001**).

```gs
module example.syntax.nested_if_branch

private fn classify(value Int) -> String {
    if value is at most 0:
        return "non-positive"

    if value is above 0:
        if value is at most 10:
            return "positive"

    return "large"
}

fn nested_if_branch_sample() -> String {
    return classify(15)
}

fn nested_if_branch_verify() -> Bool {
    let large String = classify(15)
    let positive String = classify(5)
    let zero String = classify(0)
    let negative String = classify(-5)

    let okLarge Bool = large is "large"
    let okPositive Bool = positive is "positive"
    let okZero Bool = zero is "non-positive"
    let okNegative Bool = negative is "non-positive"

    return okLarge and okPositive and okZero and okNegative
}
```

### 9.5 Sample / verify design

| Entrypoint | Signature | Contract |
| ---------- | --------- | -------- |
| **sample** | `fn nested_if_branch_sample() -> String` | `classify(15)` → **`"large"`** |
| **verify** | `fn nested_if_branch_verify() -> Bool` | **15** → large; **5** → positive; **0** / **-5** → non-positive; **`and`** |

**Expected (source-level):** `nested_if_branch_sample()` → **`"large"`**; `nested_if_branch_verify()` → **`true`** (CMP-01 `is`).

### 9.6 Coverage boundary

**Demonstrates:**

- **Two-level** nested statement `if:` (outer + inner);
- branch-local **`return`**;
- fall-through to final **`return`** when inner test fails;
- four input classes via verify.

**Does not demonstrate:**

- Flat **`elif`** / **`else`** ladder (**SY-L1.3**);
- `let:` / `var:` grouping; **`pub`**; optional/null; graph ops; conditional expressions; parser/runtime proof.

### 9.7 Acceptance gates (STATUS-1 review)

**Labels:** **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED**. Independent file review **GS-EXAMPLE-CORPUS-L3-ADV-SY-03-STATUS-1** — **no** parser/runtime execution.

| Gate | Criterion | STATUS-1 |
| ---- | --------- | -------- |
| **G-01** | Module `example.syntax.nested_if_branch`; path `programs/03-advanced/syntax/nested_if_branch/nested_if_branch.gs` | **PASS** |
| **G-02** | Statement `if condition:` + indented bodies per Core §8 / Common block shape | **PASS** |
| **G-03** | ≥ **2** levels of nested `if` (inner `if` under outer `if value is above 0`) | **PASS** |
| **G-04** | Branch matrix §9.3 — **non-positive**, **positive**, **large** | **PASS** |
| **G-05** | Verify covers **15**, **5**, **0**, **-5** (all classes) | **PASS** |
| **G-06** | **`fn nested_if_branch_sample` / `nested_if_branch_verify`**; eager **`Bool`** locals + **`and`** | **PASS** |
| **G-07** | Word-based CMP only; no forbidden constructs; **no** parser/runtime claim | **PASS** |

### 9.8 Known implementation gaps

| Gap | Notes |
| --- | ----- |
| **GS-C001** / [PARSER_AUDIT.md](PARSER_AUDIT.md) | Parser vs canonical doc for word-based ordering — Syntax Track acceptance remains **source-level** |
| **CMP-01 §8 (A8)** | Multi-word comparison grammar precedence — **OPEN** in language repo; specimen follows normative **target** surface |
| **GAP-01** | General parser inventory — not a specimen blocker at doc level |

### 9.9 Readiness

| Phase | Status |
| ----- | ------ |
| **SPEC-1** | **DONE** |
| **LAND-1** | **DONE** — on-disk `.gs` per §9.4 |
| **STATUS-1** | **DONE** — **LANDED**; **G-01…G-07** **PASS** |
| **Next** | Initial **L3-ADV-SY-01…04** backlog **complete** — no further queue row in §4.1 |

---

## 10. L3-ADV-SY-04 — `nested_if_optional` (SPEC + LANDED)

**Slice:** **GS-EXAMPLE-CORPUS-L3-ADV-SY-04-SPEC-1**; **LAND-1**; **STATUS-1** (**GS-EXAMPLE-CORPUS-L3-ADV-SY-04-STATUS-1**)  
**Corpus level:** L3 Advanced Syntax (**physical** `programs/03-advanced/syntax/`). **No** L4/L5 transition. **Orthogonal** to historical Syntax Track **SY-L*** (**15/18 LANDED** unchanged). **Distinct** from landed **SY-L4.4** `exists_if_*` / `null_narrowing` (same tree; this row = **nested `if`** + narrowing).

### 10.1 Identity

| Field | Value |
| ----- | ----- |
| **ID** | **L3-ADV-SY-04** |
| **Slug** | `nested_if_optional` |
| **GS path** | `programs/03-advanced/syntax/nested_if_optional/nested_if_optional.gs` (**SY-A1=B**, **SY-STR-A1**) |
| **Module** | `example.syntax.nested_if_optional` |
| **Metadata** | **S0** |
| **Primary construct** | Nested `if` + **`if exists`** narrowing (VAR_LET §12.1, §12.4.3) |
| **Secondary construct** | Inner CMP-01 `is` on narrowed `String` |
| **Status** | **LANDED** — `nested_if_optional.gs` on disk; **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED** |

### 10.2 Normative references

VAR_LET **§12.1–§12.4.3**, **§12.5**; Core **§8**; Common **§22**, **§18**; CMP-01. Contrast: `exists_if_present`, `null_narrowing`, **§9** `nested_if_branch`. **GAP-05** — narrowing not implemented in toolchain.

### 10.3 Narrowing contract (SoT)

| Topic | Answer | Ref |
| ----- | ------ | --- |
| **A** Optional decl | `let x String? = …` / `null` | §9–§10 |
| **B** Presence | `if exists x:` | §12.1; Common §22 |
| **C** Narrowing site | True branch: `T?` → `T` | §12.1 |
| **D** Nested `if` | Narrowing **in branch**; outer `exists` body includes nested `if` | **§12.4.3** |
| **E** After block | No persistence outside | §12.1 |
| **F** Reassignment | Invalidates — not used | §12.3 |
| **G** Early `return` | Per branch paths | §12.2 analog |

### 10.4 On-disk specimen (LAND-1)

**Path:** `programs/03-advanced/syntax/nested_if_optional/nested_if_optional.gs`. On-disk source (STATUS-1 verified vs SPEC); parser narrowing **not** claimed (**GAP-05**).

```gs
module example.syntax.nested_if_optional

private fn labelOptional(candidate String?, innerTag String) -> String {
    if exists candidate:
        if candidate is innerTag:
            return candidate

        return "present-other"

    return "absent"
}

fn nested_if_optional_sample() -> String {
    let hit String? = "nio-sample-hit"

    return labelOptional(hit, "nio-sample-hit")
}

fn nested_if_optional_verify() -> Bool {
    let presentHit String? = "nio-verify-hit"
    let presentOther String? = "nio-verify-other"
    let absent String? = null

    let fromHit String = labelOptional(presentHit, "nio-verify-hit")
    let fromOther String = labelOptional(presentOther, "nio-verify-hit")
    let fromAbsent String = labelOptional(absent, "nio-verify-hit")

    let okHit Bool = fromHit is "nio-verify-hit"
    let okOther Bool = fromOther is "present-other"
    let okAbsent Bool = fromAbsent is "absent"
    let okHitNotOther Bool = fromHit is not "present-other"

    return okHit and okOther and okAbsent and okHitNotOther
}
```

### 10.5 Behavior matrix

| Case | Result |
| ---- | ------ |
| Present, `candidate is innerTag` | `return candidate` (narrowed) |
| Present, inner false | `"present-other"` |
| Absent (`null`) | `"absent"` |

### 10.6 Coverage boundary

**In:** nested `if`, `exists`, narrowed use, three verify paths. **Out:** `let:` / `var:`, SNP, `is null` primary, `and` guards, graph, parser proof.

### 10.7 Acceptance gates (STATUS-1 review)

**Labels:** **SOURCE-LEVEL ACCEPTED**; **RUNTIME NOT VERIFIED**. Independent review **GS-EXAMPLE-CORPUS-L3-ADV-SY-04-STATUS-1** — **no** parser/runtime execution.

| Gate | Criterion | STATUS-1 |
| ---- | --------- | -------- |
| **G-01** | Path/module `example.syntax.nested_if_optional` | **PASS** |
| **G-02** | `String?`, `null`, `if exists`, `is` / `is not` | **PASS** |
| **G-03** | Inner `if` inside outer `if exists candidate` body | **PASS** |
| **G-04** | `return candidate` in inner true (narrowed `String`) | **PASS** |
| **G-05** | Verify: hit / other / absent (+ `okHitNotOther`) | **PASS** |
| **G-06** | `nested_if_optional_sample` / `_verify`; eager `Bool` + `and` | **PASS** |
| **G-07** | §10.3; no forbidden constructs; no runtime claim | **PASS** |

### 10.8 OPEN gaps

**GAP-05**, **GAP-01**, **GAP-02**, **OQ-L3-ADV-GRAM-1**, **OQ-L3-ADV-INIT-1**, **GS-C001**, **CMP-01 A8** — no parser/runtime claim.

### 10.10 Readiness

| Phase | Status |
| ----- | ------ |
| **SPEC-1** | **DONE** |
| **LAND-1** | **DONE** — on-disk `.gs` per §10.4 |
| **STATUS-1** | **DONE** — **LANDED**; **G-01…G-07** **PASS** |
| **Next** | Initial **L3-ADV-SY-01…04** backlog **complete** ([§4](#4-specimen-backlog)) — no new specimen without owner slice |
