# Example Corpus — Gaps, OPEN Questions, and Blockers

**Status:** **CANONICAL** (Example repository — unresolved issues; not owner decision ledger)
**Decisions:** [DECISIONS.md](DECISIONS.md) (**VERIFY-A2**, **OQ-SY-2**, **L4-SATURATION**, …).
**Policy:** [POLICY.md](POLICY.md). **Parser evidence:** [PARSER_AUDIT.md](PARSER_AUDIT.md) (historical snapshot).
**Broader audit:** [CANONICAL_TARGET_AUDIT_FINDINGS.md](../CANONICAL_TARGET_AUDIT_FINDINGS.md) (**DOC-Q5=B**; separate from [PARSER_AUDIT.md](PARSER_AUDIT.md)).
**Monolith:** [EXAMPLE_CORPUS_ORGANIZATION.md](../EXAMPLE_CORPUS_ORGANIZATION.md) (registry, specimens, queues).

---

## 1. Purpose and status taxonomy

| Label | Meaning in this registry |
| ----- | ------------------------ |
| **DECIDED** | Owner or language contract selected an option — see [DECISIONS.md](DECISIONS.md); not an open gap. |
| **OPEN** | Unresolved owner question, contract, or layout choice. |
| **DEFERRED** | Explicitly postponed language/tooling contract. |
| **BLOCKED** | Queue/work cannot proceed until a dependency closes. |
| **NOT LANDED** | Registry row without on-disk specimen — **not** automatically an architectural blocker. |
| **SOURCE-LEVEL ACCEPTED** | Specimen/registry accepted as documentation target — **not** parser/runtime proof. |
| **RUNTIME / PARSER VERIFIED** | Requires execution or parse evidence — corpus generally **NOT VERIFIED** (see §6). |

---

## 2. Owner OPEN decisions ([DECISIONS.md](DECISIONS.md) §3)

Canonical IDs and statuses — **do not change here**; detail below expands monolith references.

| ID | Status | Source | Issue |
| -- | ------ | ------ | ----- |
| **VERIFY-A2** | OPEN | §11 / [POLICY.md §4.1](POLICY.md#41-_sample-demonstration) | Explicit discard syntax for ignored call results not decided. |
| **OQ-SY-2** | OPEN | §19.7 | Dedicated `syntax/negative/` per level vs central `programs/syntax-negative/` vs L5-only diagnostics. **Recommendation (not DECIDED):** per-level layout **A** aligns with **SY-A1** + **L5-N1**. |
| **SY01-D-01** | OPEN | §19.6.6 | Destructuring missing-field semantics not demonstrated in **SY-L2.1**. |
| **L4-SATURATION** | OPEN | §8.4.3 | Whether to declare L4 **SATURATED** after five-program queue completion. Options A/B/C in §3.3; **recommendation B** (corpus-organization only, not owner DECIDED). |
| **L2-DOMAIN-DIRS** | OPEN | [POLICY.md §1](POLICY.md#1-physical-corpus-layout) | L2 domain subdirectories under `02-composition/`. |
| **L3-DOMAIN-DIRS** | OPEN | [POLICY.md §1](POLICY.md#1-physical-corpus-layout) | L3 domain subdirectories under `03-advanced/`. |
| **TARGET-LANDING-WORKFLOW** | OPEN | §10 | Target → landed `.gs` workflow and automatic registry status machinery. |

---

## 3. Workflow and documentation gaps

### 3.1 Target → landed workflow (§10)

The workflow and conventions for moving a target from **planned/proposed** to an **on-disk** `.gs` file (review steps, naming on disk, status updates) are **OPEN**. The monolith registers targets only; it does not define the landing process.

**Also OPEN:** automatic status machinery for registry rows. L5 charter and queue: [L5_PROJECT_SYSTEM.md §15–§16](L5_PROJECT_SYSTEM.md#15-l5-project-system-charter) (not §8.6).

### 3.2 Reserved §14 (**DOC-Q1=A**)

Documentation index section **§14** in the monolith is **reserved** ([EXAMPLE_CORPUS_ORGANIZATION.md §14](../EXAMPLE_CORPUS_ORGANIZATION.md#14-reserved--compatibility-placeholder); **DOC-Q1=A**). No renumbering of §15+.

### 3.3 `CANONICAL_TARGET_AUDIT_FINDINGS.md`

Referenced from monolith §12, §13, and §18 for broader implementation gaps. **Not** the same document as [PARSER_AUDIT.md](PARSER_AUDIT.md) (**DOC-Q5=B**). On-disk audit record: [CANONICAL_TARGET_AUDIT_FINDINGS.md](../CANONICAL_TARGET_AUDIT_FINDINGS.md). Live OPEN/DEFERRED inventory for corpus work: [GAPS.md](GAPS.md) (this file) plus parser snapshot [PARSER_AUDIT.md](PARSER_AUDIT.md).

---

## 4. Classic L4 language, runtime, and corpus gaps (§8.4.1–§8.4.3)

| Reference | Status | Issue | Affected scope |
| --------- | ------ | ----- | -------------- |
| L4.2 language gap | OPEN | Canonical construction of `String` from `[Char]` | `rle_roundtrip.gs`; decode returns `[Char]`, not `String` |
| L4.4 verification | OPEN (language/tooling) | `[Int]?`, mutable `[Bool]` with `.set` — not claimed verified by compiler/runtime | `bfs_shortest_path_flat.gs` |
| L4.5 `Int / Int` | OPEN | Rounding/truncation in normative contracts; arithmetic overflow **DEFERRED_TO_VM_ERROR_MODEL** | `shunting_yard_eval.gs` guards; no golden on disputed negative non-exact division |
| L4.5 global checked arithmetic | OPEN | Not normatively closed; L4.5 guards are specimen-local | L4.5 |
| L4.5 parser vs surface | IMPLEMENTATION | `GSParser` may reject `[Int]`, `Int?`, `0..n each`, etc. — parser/surface gap, not specimen defect | See [PARSER_AUDIT.md](PARSER_AUDIT.md) |
| L4 residual (§8.4.3) | OPEN / tracking | No runtime-verified L4; optional collections language gaps; **knapsack.gs** reserve unused; no second graph/parser L4 specimen | Classic L4 |
| **L4.6+** queue | OPEN (owner/registry) | Future slot **not evidenced** as required for current CONFIRMED queue | §8.4.3 |

### 4.1 SY-L2.2 dynamic overflow narrative

`Int{32} + Int{32}` result overflow semantics remain **DEFERRED_TO_VM_ERROR_MODEL** (`GS_V0_1_TYPE_SYSTEM.md` §8b) — **OPEN** for VM; specimen does not assert trap/wrap/compile-time rejection for dynamic overflow. No invalid `.gs` until VM error model frozen.

---

## 5. L4 saturation follow-up (**L4-SATURATION**)

**Queue status:** 5/5 **LANDED**; **SATURATED verdict withheld** in monolith §8.4.3.

| Option | Summary |
| ------ | ------- |
| **A — SATURATED now** | Close L4 like L2/L3 after five landed |
| **B — SATURATED after runtime slice** | Keep not SATURATED until compile/run spot-check |
| **C — Extend queue (L4.6+)** | Add targets before saturation |

**Recommendation (corpus-organization only):** **B** — treat queue completion as **landed**, not **saturated**, until a future owner slice accepts residual gaps or extends the queue.

---

## 6. Parser and runtime verification (§13)

**Canonical evidence:** [PARSER_AUDIT.md](PARSER_AUDIT.md) (**2026-10-09** snapshot).

- **GSParser PASS:** 0 / 46 programs; classes **A1–A3**, **E1** documented there.
- **Runtime verified:** 0 — **RUNTIME NOT VERIFIED** corpus-wide unless a future slice records tool execution.
- **GS-C001** (collection literals vs parser): **OPEN** in `graph-memory-language`; Syntax Track **SOURCE-LEVEL** policy **DECIDED** (**OQ-SY-1**, **SY-L2.3-A1** in [DECISIONS.md](DECISIONS.md)).

Do **not** infer parser/runtime success from **SOURCE-LEVEL ACCEPTED** registry rows.

---

## 7. L5 OPEN contracts and design gates (monolith §17)

**Status:** AUDIT + REGISTRY (Example). Labels: **DECIDED** (language or owner), **OPEN**, **DEFERRED**, **PROPOSED** (Example-only), **IMPLEMENTATION-ONLY**.

| Topic | Label | Notes |
| ----- | ----- | ----- |
| Module identity (`module` decl) | **DECIDED** | #22.2, #22.8; L5-A1=B conventions **PROPOSED** (Example) |
| `use` placement | **DECIDED** module-wide (#22.15); **L5-A2=C** anywhere allowed; top-of-file **PROPOSED** style |
| Import section ordering (#22.16) | **OPEN** | Language defers exact positioning; Example style in monolith §15.6 |
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
| L5 expected diagnostic registry | **DECIDED** | **L5-N2=B** — monolith §16 negative rows |
| Parser/project assembly | **IMPLEMENTATION-ONLY** | [PARSER_AUDIT.md](PARSER_AUDIT.md); not acceptance gate for charter |
| Target → landed workflow (§10) | **OPEN** | **TARGET-LANDING-WORKFLOW** |

**Contract validation:** No **BLOCKED** conflict between owner **L5-A2=C** and #22.15 (module-wide `use`). **L5-A9=C** aligns with manifest entrypoints without claiming static init (**OPEN**). Stale open-question #3 (cycles) in `GS_MODULE_IMPORT_DECISIONS_V0_1.md` vs **#22.31 DECIDED** — treat **#22.31** as authoritative; language doc hygiene is **language-repo** concern (Example does not edit).

### 7.1 L5 queue BLOCKED / dependency gaps

| Item | Status | Blocker / gap |
| ---- | ------ | --------------- |
| **L5.8** `dependency_two_pkg` | **BLOCKED** | **Package visibility syntax** OPEN (§15.7, §7 table); **L5-A3=C** gate before multi-package examples |
| **L5.11** `unified_module_stub` | **PROPOSED** | Cross-language unified module authoring conventions; **L5-A4=C** phase 3 |
| **L5.9** diagnostic contract | **OPEN** (partial) | **Source location precision** OPEN — do not assert file/line/column; **code OPEN** (§7 table) |
| **L5.5** relative imports | **OPEN** (narrative) | **`..` parent segments** — not demonstrated; normalization rules **OPEN** beyond `./` + `/` segments (monolith §16 L5.5) |
| **L5.10** | **OPEN** (tooling) | Strict-mode promotion #22.33 noted as OPEN tooling |

Monolith §15.17: gates blocking queue rows — **package visibility** (before L5.8), **unified-module conventions** (before L5.11), **diagnostic codes** (optional for landing, required for strict tooling alignment).

---

## 8. Syntax Track coverage gaps (monolith §19.5)

Constructs normatively specified but **absent** or **incidental** in the audited corpus (non-exhaustive):

- **`on`**, **`emit`**, **`connect`**, **`delete`**, **`disconnect`** — no dedicated Syntax Track golden (`create` incidental in **SY-L3.3** only).
- **`fail`** — no control-flow abort specimen (**PROPOSED** in coverage matrix).
- **`break` / `continue`** — in lexicon/core; unused in corpus (**PROPOSED** queue rows).
- **`Int{8}`…`Int{64}`** — only **`Int{32}`** dedicated golden (**SY-L2.2**).
- **Optional chaining `?.` / `??`** — Class B in parser contract; no corpus.
- **Cross-surface** GSchema/GQ/GI — **PROPOSED** **L5.11** / **SY-L5.3**.
- **Collection literal `[…]`** — **GS-C001** parser gap **OPEN**; Syntax Track source-level **DECIDED** per **OQ-SY-1** / **SY-L2.3-A1**.

### 8.1 Syntax Track queue authoring blockers (§19.6 footer)

**OPEN blockers for queue authoring:** `package` visibility (**L5.8**); diagnostic codes (§7); **`emit`/`connect` exact tokens (REL-1)**; optional **`?.` / `??`** semantics.

### 8.2 Syntax Track owner questions (monolith §19.7)

| # | Question | State | Options (sketch) | Recommendation |
| --- | -------- | ----- | ---------------- | -------------- |
| OQ-SY-1 | Accept `[expr,…]` collection literals in golden specimens? | **DECIDED** (Syntax Track) — **A** per Core §2 **SOURCE-LEVEL**; **GS-C001** parser alignment **OPEN** in `graph-memory-language` | A: yes per Core §2; B: reject until parser aligns; C: syntax-only positive + separate negative | Landed policy: **A** for Syntax Track (**SY-L2.3-A1=B**); parser gap unchanged — see [DECISIONS.md](DECISIONS.md) |
| OQ-SY-2 | Dedicated `syntax/negative/` per level vs only L5 `negative/`? | **OPEN** | A: per-level; B: central `programs/syntax-negative/`; C: L5-only for diagnostics | **A** aligns with SY-A1 + L5-N1 pattern |
| OQ-SY-3 | Minimum graph **fixture** for `set`/`action` specimens? | **DECIDED** — **B** (mini GSchema stub; **L3-A1=B**) | A: stringly refs; B: shared mini GSchema stub; C: narrative-only registry | Landed: co-located `.gschema` + `create` in **`action`** (**L3-A3**) — [DECISIONS.md](DECISIONS.md) |
| OQ-SY-4 | Tag syntax specimens with `syntax_depth: S0\|S1\|S2` in registry vs file header? | **DECIDED** metadata — **A** registry only (**SY-A2=B**) | A: registry only; B: duplicate in file header | **A** — [DECISIONS.md](DECISIONS.md) |

**Negative golden narratives** (SY-L1.1, SY-L2.2, etc.) remain off-disk until **OQ-SY-2** layout is decided.

### 8.3 Syntax Track queue — NOT LANDED (inventory only)

Registry rows without §19.6 landed spec: **SY-L3.1**, **SY-L4.1**–**SY-L4.4**, **SY-L5.1**–**SY-L5.3** — **NOT LANDED** until owner approves and files exist under `syntax/`. **SY-L3.1** is **NOT LANDED** even where **SY-L3.2**/**SY-L3.3** overlap on single `set` surface.

**Landed Syntax Track:** **10 / 18** (**SY-L1.1**–**L1.5**, **L2.1**–**L2.3**, **L3.2**, **L3.3**).

---

## 9. Language inventory notes (non-blocker)

Monolith §19.3 / §19.4: `null` literal (**OPEN** in nullability contract inventory); `while` / `defer` — **DEFERRED** (sugar closure). These are language-contract tracking, not Example owner decisions.
