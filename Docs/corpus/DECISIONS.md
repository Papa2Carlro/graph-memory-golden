# Example Corpus — Owner Decision Ledger

**Status:** **CANONICAL** (Example repository — owner decisions only; not GS language SoT)
**Scope:** `graph-memory-example` decision IDs, selected options, and status. Normative consequences (verify ergonomics, L5 charter, Syntax Track specs, classic registry) live in [POLICY.md](POLICY.md), [L5_PROJECT_SYSTEM.md](L5_PROJECT_SYSTEM.md), [SYNTAX_TRACK.md](SYNTAX_TRACK.md), [CLASSIC_LEVELS.md](CLASSIC_LEVELS.md), and related `Docs/corpus/` documents — not in this ledger.
**OPEN / gap detail:** IDs and status in [§3](#3-open-and-unresolved-status-preserved); expanded descriptions, blockers, and deferred work: **[GAPS.md](GAPS.md)** — **MIGRATED / CANONICAL** ([§2](GAPS.md#2-owner-open-decisions-decisionsmd-3) mirrors §3; [§3–§9](GAPS.md#3-workflow-and-documentation-gaps) inventory).

---

## 1. Purpose and ID conventions

- **Owner decision:** an explicit Example-repository choice among labeled options (**A**, **B**, **C**, …) or a recorded **DECIDED** program-local contract.
- **Language decisions** (#22.*, Core, Runtime) are cited but not owned here unless mirrored as Example IDs (**L5-A***).
- **VERIFY-A1…A5** are canonical IDs for sample/verify ergonomics (**DOC-Q3=A**). Legacy aliases **§11 A1–A5** remain valid in prose.
- **L5-PROG-A1/A2** denote program-level direction in §4/§15 (not **VERIFY-A*** and not **L4.4-BFS-A1**).

---

## 2. Decision registry (DECIDED)

| Canonical ID | Legacy / alias | Option | Status | Source (monolith) | Meaning (verbatim summary) |
| ------------ | ---------------- | ------ | ------ | ----------------- | -------------------------- |
| **CP-A1** | — | **C** | DECIDED | §19.1, §19.2 | Three separate checkpoint commits for L4 corpus, L5 corpus, and L2–L4 sample/verify ergonomics (completed on `master`; see §2.3). |
| **VERIFY-A1** | §11 **A1** | **A** | DECIDED | §11 | Standalone call-as-statement. |
| **VERIFY-A2** | §11 **A2** | — | **OPEN** | §11 | No explicit discard syntax (not decided). |
| **VERIFY-A3** | §11 **A3** | **A** | DECIDED | §11 | Bool aggregation via canonical `and` with eager check evaluation. |
| **VERIFY-A4** | §11 **A4** | **C** | DECIDED | §11 | No `assert`/`expect` in GS v0.1. |
| **VERIFY-A5** | §11 **A5** | **B** | DECIDED | §11 | Separate demonstration vs verification functions (`fn` sample/verify for classic specimens). |
| **L5-PROG-A1** | Program **A1**, §8.6 **A1** | **C** | DECIDED | §4, §8.6, §15 | L5 multi-file next level. |
| **L5-PROG-A2** | Program **A2**, §8.6 **A2** | **C** | DECIDED | §4, §8.6, §15 | Complete project system — end-state scope, **staged** golden coverage. |
| **L5-A1** | — | **B** | DECIDED | §15 | Module identity = explicit `module` per unit; filesystem path does not define identity (Example conventions in charter). |
| **L5-A2** | — | **C** | DECIDED | §15 | `use` may appear anywhere in a module; Example style prefers top-of-file. |
| **L5-A3** | — | **C** | DECIDED | §15 | Visibility coverage staged; `package` visibility **OPEN** gate before multi-package goldens. |
| **L5-A4** | — | **C** | DECIDED | §15 | Namespace/symbol resolution via logical module graph; unified cross-language modules in later phase. |
| **L5-A5** | — | **B** | DECIDED | §15 | `Graph.toml` in positive project directory when manifest in scope. |
| **L5-A6** | — | **C** | DECIDED | §15 | Staged package/versioning coverage. |
| **L5-A7** | — | **A** | DECIDED | §15 | Document expected resolution outcomes without implementing resolver. |
| **L5-A8** | — | **C** | DECIDED | §15 | Negative golden scenarios across queue (cycles, etc.). |
| **L5-A9** | — | **C** | DECIDED | §15 | Entry behavior = explicit function calls, not module auto-init. |
| **L5-A10** | — | **A** | DECIDED | §15 | Positive specimens at `programs/05-modular/<project>/`. |
| **L5-N1** | — | **B** | DECIDED | §3, §15 | `negative/` vs `warnings/` layout under `05-modular/`. |
| **L5-N2** | — | **B** | DECIDED | §15, §17 | Expected diagnostic registry fields: category, severity, normative rule, location precision. |
| **SY-A1** | — | **B** | DECIDED | §19.1 | Syntax specimens under `programs/<level>/syntax/`; incorporates **SY-STR-A1/A2** layout rules in meaning column of §19.1 (see ledger rows). |
| **SY-A2** | — | **B** | DECIDED | §19.1 | **S0/S1/S2** = registry metadata only (no directory tiers). |
| **SY-STR-A1** | — | **A** | DECIDED | §19.1 | Module directory = last segment of module identity (`…/syntax/<slug>/`). |
| **SY-STR-A2** | — | **A** | DECIDED | §19.1 | Module-less specimens may remain flat under `syntax/`. |
| **SY-STR-A3** | — | **C** | DECIDED | §19.1 | Detailed documentation decomposition (separate narrow slices; monolith §14 reserved per **DOC-Q1=A**). |
| **SY-L2.3-A1** | — | **B** | DECIDED | §19.1 | Collection literals `[…]` allowed at SOURCE-LEVEL ACCEPTED; does not resolve **GS-C001**. |
| **SY-L2.3-A2** | — | **A** | DECIDED | §19.1 | SY-L2.3 uses non-empty literal; no `append` path. |
| **SY-L2.3-A3** | — | **A** | DECIDED | §19.1 | OOB `.get()` absence via `not exists`, not `is null`. |
| **L3-A1** | — | **B** | DECIDED | §19.1 | Mini GSchema carrier alongside `.gs` (unified `module`). |
| **L3-A2** | — | **B** | DECIDED | §19.1 | `action` introduced with SY-L3.3; **SY-L3.1** was **NOT LANDED** at adoption (historical snapshot; did not prohibit later landing). Clarification: [§2.2](#22-l3-a2--sy-l31-landing-clarification). |
| **L3-A3** | — | **C** | DECIDED | §19.1 | Self-contained `create` + `set` + read-back in `action`. |
| **L3-A4** | — | **C** | DECIDED | §19.1, §11 | Graph sample/verify as separate `action … -> Bool` (see §11 exception prose). |
| **OQ-SY-1** | — | **A** | DECIDED (Syntax Track) | §19.7 | Accept `[expr,…]` literals per Core §2 SOURCE-LEVEL; parser **GS-C001** remains OPEN in language repo. |
| **OQ-SY-3** | — | **B** | DECIDED | §19.7 | Mini GSchema stub per specimen/module; aligns **L3-A1=B**. |
| **OQ-SY-4** | — | **A** | DECIDED (metadata) | §19.7 | `syntax_depth` in registry only (**SY-A2=B**); not duplicated in file headers. |
| **OQ-SY-L3.1-A1** | — | **B** | DECIDED | §19.6.11 | **SY-L3.1** self-contained mutation boundary: outermost sample/verify `action` invokes nested helper `action`; caller **`create`** + read-back; helper exactly one single-line **`set`** (refines **L3-A3=C** for this specimen only). Language: nested actions — **RESOLVED BY EXISTING CONTRACT** (`GS_V0_1_RUNTIME_MODEL.md` §5–§6). |
| **OQ-SY-L3.1-A2** | — | **A** | DECIDED | §19.6.11 | **SY-L3.1** module `example.syntax.graph_set_param`; path `programs/02-composition/syntax/graph_set_param/`; files `graph_set_param.gs`, `graph_set_param_carrier.gschema` (**SY-STR-A1=A**, **L3-A1=B**). |
| **OQ-SY-L3.1-A3** | — | **B** | DECIDED | §19.6.11 | **SY-L3.1** unique coverage: `create` in caller; typed entity param in helper; entity passed via `action` invocation; one single-line `set` in helper; read-back in caller; self-contained sample/verify — distinct from **SY-L3.3** inline `set`. Param syntax — **RESOLVED BY EXISTING CONTRACT** (Runtime §4, §15–§16; `GS_V0_1_TYPE_SYSTEM.md` §1–§2; no separate `ref`/`mut` keyword). |
| **OQ-SY-L3.1-A4** | — | **B** | DECIDED | §19.6.11 | Owner approves **SY-L3.1** specimen contract in this slice; on-disk landing in separate implementation slice (**SY-L3.1-LAND-1**). Does **not** close global **TARGET-LANDING-WORKFLOW** (§3). |
| **OQ-SY-L4.1-A1** | — | **A** | DECIDED | §19.6.12 | **SY-L4.1** topology: outermost sample/verify **`action`** performs minimal **`create`** fixture → **`emit`** typed domain event (scalar payload) → **no** `set` / persisted mutation for coverage; module-level **`on`** handler registered separately; **no** Bool in the emitting `action` that assumes synchronous post-commit handler completion (**Runtime** §10–§12). |
| **OQ-SY-L4.1-A2** | — | **A** | DECIDED | §19.6.12 | **SY-L4.1** module `example.syntax.on_emit`; path `programs/03-advanced/syntax/on_emit/` (reconciled **OQ-SY-L4.4-A7=B**); files `on_emit.gs`, `on_emit_carrier.gschema` (**SY-A1=B**, **SY-STR-A1=A**, queue Level **L4**). |
| **OQ-SY-L4.1-A3** | — | **A** | DECIDED | §19.6.12 | **SY-L4.1** domain **event** contract in co-located `.gschema`: `public event` with **exactly one** scalar payload field; handler `on EventName(event: EventName)`; **no** runtime lifecycle form (`Entity.created`, …). Language: **RESOLVED BY EXISTING CONTRACT** (`GS_V0_1_RUNTIME_MODEL.md` §9, §11, §25; gschema parser canonical `public event Name { … }`). |
| **OQ-SY-L4.1-A4** | — | **A** | DECIDED | §19.6.12 | **SY-L4.1** unique coverage: **`action` + `emit` + typed `on` handler** pairing — distinct from **SY-L3.3** (`action` + inline **`set`** + read-back). **No** specimen-local **`set`** / **`set:`** solely to mirror L3 graph-mutation rows. |
| **OQ-SY-L4.1-A5** | — | **C** | DECIDED | §19.6.12, [GAPS.md §8.1](GAPS.md#81-syntax-track-queue-authoring-blockers-196-footer) | **REL-1** corpus wording **scoped**: **`emit`** surface **RESOLVED BY EXISTING CONTRACT** (Runtime §9–§10; Parser §7.7); **REL-1** operator-token gap applies to **`connect`** (Parser §3.2). Owner approves **SY-L4.1** contract in **SPEC-2** without waiting on connect **REL-1**. **SOURCE-LEVEL ACCEPTED** landing does **not** verify emit delivery or handler execution; future runtime verification remains separate (**RUNTIME NOT VERIFIED**). Handler ordering/retry/idempotency remain language-deferred (Runtime §29). Does **not** close **TARGET-LANDING-WORKFLOW** (§3). |
| **OQ-SY-L4.2-A1** | — | **A** | DECIDED | §19.6.13 | **SY-L4.2** topology: outermost sample/verify **`action`** performs two **`create`** endpoint fixtures → **`let edge RelType = connect source -RelType-> target:`** with **mandatory typed relation binding** (language **A2**); **no** untyped `let edge = connect…`. |
| **OQ-SY-L4.2-A2** | — | **A** | DECIDED | §19.6.13 | **SY-L4.2** module `example.syntax.graph_connect`; path `programs/03-advanced/syntax/graph_connect/` (**OQ-SY-L4.4-A7=B**); files `graph_connect.gs`, `graph_connect_carrier.gschema` (**SY-A1=B**, **SY-STR-A1=A**, queue Level **L4**). |
| **OQ-SY-L4.2-A3** | — | **B** | DECIDED | §19.6.13 | **SY-L4.2** **`connect:`** block carries **exactly one** scalar relation property (Runtime §17; Parser connect property block). **No** bare `connect` without property block for this specimen. |
| **OQ-SY-L4.2-A4** | — | **A** | DECIDED | §19.6.13 | **SY-L4.2** `*_verify() -> Bool` / `*_sample() -> Bool` assert **endpoint entity fixture** fields only after `create` + `connect` wiring — **not** relation persistence, relation read-back, or runtime graph integrity (**RUNTIME NOT VERIFIED**). **No** **`set`** solely to fabricate verify read-back. |
| **OQ-SY-L4.2-A5** | — | **C** | DECIDED | §19.6.13, [GAPS.md §8.1](GAPS.md#81-syntax-track-queue-authoring-blockers-196-footer) | Adopt normative V0.1 surface **`source -REL-> target`** (Runtime §17) for **SPEC-2** / landing now; language **A3** unified lexical relation-operator token remains **implementation OPEN**; **REL-1** future operator/direction models remain **OPEN**. Parser/runtime verification **separate** from source-level specimen contract. Does **not** close **TARGET-LANDING-WORKFLOW** (§3). |
| **OQ-SY-L4.3-A1** | — | **B** | DECIDED | §19.6.14 | **SY-L4.3** topology: **`private fn`** hosts scalar **`if`** guard + **`fail "…"`** for invalid input; valid input returns normally; outer **`action`** sample/verify call helper with **positive** arguments only (**OQ-SY-L4.3-A3=A**). |
| **OQ-SY-L4.3-A2** | — | **A** | DECIDED | §19.6.14 | **SY-L4.3** module `example.syntax.fail_guard`; path `programs/03-advanced/syntax/fail_guard/` (**OQ-SY-L4.4-A7=B**); files `fail_guard.gs`, `fail_guard_carrier.gschema` (**SY-A1=B**, **SY-STR-A1=A**, queue Level **L4**). |
| **OQ-SY-L4.3-A3** | — | **A** | DECIDED | §19.6.14 | Abort branch **reachable** for invalid helper argument (not dead code); **`fail_guard_sample` / `fail_guard_verify`** execute **positive** paths only — **no** executed **`fail`** in sample/verify return paths; **no** rollback / abort Bool claims (**RUNTIME NOT VERIFIED**). |
| **OQ-SY-L4.3-A4** | — | **B** | DECIDED | §19.6.14 | Co-located **`fail_guard_carrier.gschema`** — minimal **`public entity`** stub per **L3-A1=B** / module symmetry; **not** an error registry and **no** gm-error declarations in GSchema. |
| **OQ-SY-L4.3-A5** | — | **A** | DECIDED | §19.6.14, [GAPS.md §8.4](GAPS.md#84-gm-error-integration-open-questions-sy-l43) | Normative V0.1 **`fail "message"`** string literal in source (**Runtime** §8; Parser §7.6); **no** new GS syntax for error codes / registry identities. **Owner architectural direction:** ecosystem errors via **`graph-memory-error`** — **not** an approved implementation contract (**GM-ERR-A1…A5** remain **OPEN**; **MOD-ERR-PROP** language-deferred). |
| **OQ-SY-L4.3-A6** | — | **A** | DECIDED | §19.6.14 | Scalar **`if`** guard (e.g. CMP-01 ordering on **`Int`**) — **not** **`exists` / `not exists`** as primary coverage (distinct from **SY-L4.4**). |
| **OQ-SY-L4.4-A1** | — | **C** (REFINED) | DECIDED | §19.6.15 | **Both** normative narrowing patterns — **`if exists x:`** use in true branch (§19.6.15.1) **and** **`if not exists x:`** guard + narrowed use after guard (§19.6.15.2) — as **separate golden programs**, not two helpers in one module. |
| **OQ-SY-L4.4-A2** | — | **A** | DECIDED | §19.6.15 | Optional via literals / **`null`** only — **no** **SY-L2.3** `.get` / OOB duplication. |
| **OQ-SY-L4.4-A3** | — | **A** | DECIDED | §19.6.15 | Absent path uses **fallback** return — **no** **`fail`** in **SY-L4.4** family. |
| **OQ-SY-L4.4-A4** | — | **A** | DECIDED | §19.6.15 | Directory-based modules under `programs/03-advanced/syntax/<slug>/` (**SY-STR-A1=A**). |
| **OQ-SY-L4.4-A5** | — | **A** | DECIDED | §19.6.15 | **`fn`** sample/verify — **not** **`action`** when graph mutation absent (**VERIFY-A5=B**; contrast **L3-A4**). |
| **OQ-SY-L4.4-A6** | — | **EXPANDED COVERAGE** | DECIDED | §19.6.15.4 | Additional **separate** golden programs for nested **`if`**, block-local **`let`**, lexical scope, shadowing, multi-binding calculations, **`var:`** block, action diagnostic narrative — backlog §19.6.15.4 / [GAPS.md §8.5](GAPS.md#85-sy-l44-coverage-backlog); **not** implied normative where language SoT silent. |
| **OQ-SY-L4.4-A7** | — | **B** | DECIDED | §19.6.15 | Reconcile documentation paths for relocated **SY-L4.1**–**L4.3** to `programs/03-advanced/syntax/`; preserve queue **L4** IDs and **LANDED** status; **do not** restore `programs/04-complex/syntax/`. |
| **OQ-SY-L4.4-A8** | — | **B** (EXPANDED) | DECIDED | §19.6.15.3 | Cover **`exists` / `not exists`** (§19.6.15.1–§19.6.15.2) **and** **`is null` / `is not null`** narrowing (**`null_narrowing`** specimen) — **separate** program for null-check surface. |
| **OQ-GS-LET-PUB-1** | — | — | DECIDED | §19.6.15.4, [GAPS.md §8.5](GAPS.md#85-sy-l44-coverage-backlog) | **Owner semantics (Example / language direction — not GS V0.1 grammar proof):** Standalone `let name Type = expr` is **publicly accessible** within its applicable enclosing declaration scope. **`pub let name Type = expr`** is **NOT allowed**. **`let:`** block: bindings **private by default**; only bindings explicitly marked **`pub`** export (multiple **`pub`** allowed). Exported block bindings behave like equivalent standalone **`let`** in enclosing scope — **not** module-level visibility. Illustrative column alignment in owner notes is **not** canonical grammar. |
| **OQ-GS-ACTION-DIAG-1** | — | **A** | DECIDED | §19.6.15.4 | If an **`action`** body contains **no direct graph mutation**, emit a **warning** (not error); **local** to action body; **no** whole-call-graph analysis; **not** a prohibition of read-only programs; **not** a requirement that every program use **`action`**. Diagnostic code/severity — **OPEN** ([GAPS.md §8.5](GAPS.md#85-sy-l44-coverage-backlog)). |
| **OQ-GS-FMT-ALIGN-1** | — | — | DECIDED (direction) | [GAPS.md §8.5](GAPS.md#85-sy-l44-coverage-backlog) | Formatter **direction:** align columns within logical blocks; nested blocks formatted independently; columns aligned to longest declaration in block; **no** semantic changes; formatter may be disabled; idempotent; indentation remains significant. Applies conceptually to **`let`**, **`var`**, **`create`**, compatible declaration blocks. Exact grouping/wrap rules — **OPEN**. **Does not** change parser contracts; **not** implemented. |
| **OQ-L3-ADV-A1** | — | — | DECIDED | [L3_ADVANCED_SYNTAX.md §3](L3_ADVANCED_SYNTAX.md#3-owner-decisions-decided--contract-summary) | **`let:`** authoring contract: no nested **`let:`**; declaration-only; one binding per entry (`name Type = expr` or `pub name Type = expr`); conditional **expressions** in initializers only per Language SoT; **no** statement `if`/`elif`/`else`, nested **`var:`**, loops, **`action`**, or arbitrary statements inside **`let:`**; duplicate declarations invalid; forbidden forms → **syntax error** (not silent conditional-decl parse). |
| **OQ-L3-ADV-A2** | — | **B** | DECIDED | [L3_ADVANCED_SYNTAX.md §1](L3_ADVANCED_SYNTAX.md#1-purpose-and-boundaries) | Separate **L3 Advanced Syntax** subtrack doc; **do not** grow monolithic **SYNTAX_TRACK.md** for these specimens; preserve **SY-L*** IDs and **15/18** landed Syntax Track; **no** physical level migration. |
| **OQ-L3-ADV-A3** | — | **A** | DECIDED | [L3_ADVANCED_SYNTAX.md §3](L3_ADVANCED_SYNTAX.md#oq-l3-adv-a3--pub-inside-let-a) | **`pub`** in **`let:`** exports to **immediate enclosing lexical scope** (e.g. **`fn`** body); **not** automatic export outside enclosing function; non-**`pub`** private to **`let:`**; multiple **`pub`** bindings allowed. Refines Example narrative **OQ-GS-LET-PUB-1** (fn vs module). |
| **OQ-L3-ADV-A4** | — | **A** | DECIDED | [L3_ADVANCED_SYNTAX.md §3](L3_ADVANCED_SYNTAX.md#oq-l3-adv-a4--var-block-a) | **`var:`** grouping-only; semantically equivalent to standalone **`var`** in enclosing scope; **no** extra scope/visibility/lifetime/mutability; **no** implicit **`pub`**. Aligns Common §6.2. |
| **L4-MODEL** | §8.4 qualitative model | — | DECIDED | §8.4 | L4 = complex single-file (§2). |
| **L4-PATH** | §8.4 filesystem | — | DECIDED | §3, §8.4 | `programs/04-complex/*.gs` flat layout. |
| **L4-PROGRESSION** | §8.4 corpus progression | — | DECIDED | §8.4 | Land all five CONFIRMED queue entries (not gated on L3 completion). |
| **L4-QUEUE** | — | — | CONFIRMED | §8.4.2 | Order L4-01…L4-05 as registered (all **LANDED**). |
| **L4.3-CONTRACT** | L4.3 counting | — | DECIDED (program-specific) | §8.4.1 | `count_n_queens_solutions`: `n<0→null`, `n=0→1`, `n>0→` count; not global GS law. |
| **L4.4-BFS-A1** | §8.4.1 owner **A1=C** | **C** | DECIDED (program-specific) | §8.4.1 | Two-call distinction: `bfs_input_valid` vs `null` path from `bfs_shortest_path_flat` for invalid vs unreachable. |
| **DOC-Q1** | — | **A** | DECIDED | migration plan | Reserve §14 in monolith; no renumbering of §15+. |
| **DOC-Q2** | — | **A** | DECIDED | migration plan | Preserve legacy `## N.` headings and anchors during decomposition. |
| **DOC-Q3** | — | **A** | DECIDED | migration plan | **VERIFY-A1…A5** canonical with §11 legacy aliases. |
| **DOC-Q4** | — | **B** | DECIDED | migration plan | L4 validation narratives → `corpus/annexes/` (separate files). |
| **DOC-Q5** | — | **B** | DECIDED | migration plan | **PARSER_AUDIT** (§13) separate from `CANONICAL_TARGET_AUDIT_FINDINGS.md`. |

### 2.1 Dependencies (selected)

| ID | Depends on / relates to |
| -- | ------------------------ |
| **L3-A4** | **VERIFY-A3**, **VERIFY-A5**; Runtime §3–§4 |
| **SY-A1** | **SY-STR-A1**, **SY-STR-A2** |
| **OQ-SY-1** | **SY-L2.3-A1** |
| **OQ-SY-3** | **L3-A1**, **L3-A3** |
| **OQ-SY-4** | **SY-A2** |
| **OQ-SY-L3.1-A1** | **L3-A3**, **L3-A4**, **VERIFY-A3**; Runtime §5–§6 |
| **OQ-SY-L3.1-A2** | **SY-STR-A1**, **L3-A1**, **OQ-SY-3** |
| **OQ-SY-L3.1-A3** | **OQ-SY-L3.1-A1**; distinct from **SY-L3.3** / **L3-A2** |
| **OQ-SY-L3.1-A4** | **TARGET-LANDING-WORKFLOW** (global OPEN) |
| **OQ-SY-L4.1-A1** | **L3-A4**, **VERIFY-A3**; **OQ-SY-L3.1-A3** (distinct coverage); Runtime §5–§6, §9–§12 |
| **OQ-SY-L4.1-A2** | **SY-STR-A1**, **L3-A1**, **OQ-SY-3** |
| **OQ-SY-L4.1-A3** | **OQ-SY-L4.1-A1**; Runtime §9, §25 |
| **OQ-SY-L4.1-A4** | **SY-L3.3** / **L3-A2**; **OQ-SY-L4.1-A1** |
| **OQ-SY-L4.1-A5** | **REL-1** (connect token — OPEN); **TARGET-LANDING-WORKFLOW** (global OPEN) |
| **OQ-SY-L4.2-A1** | **L3-A4**, **VERIFY-A3**; language Parser §16 **A2**; Runtime §16–§17 |
| **OQ-SY-L4.2-A2** | **SY-STR-A1**, **L3-A1**, **OQ-SY-3**; **OQ-SY-L4.1-A2** (L4 path convention) |
| **OQ-SY-L4.2-A3** | **OQ-SY-L4.2-A1**; Runtime §17 |
| **OQ-SY-L4.2-A4** | **OQ-SY-L4.1-A4** (fixture-only Bool); **OQ-SY-L4.2-A1** |
| **OQ-SY-L4.2-A5** | **REL-1** (lexer token + future operators — OPEN); **OQ-SY-L4.1-A5=C** (pattern); **TARGET-LANDING-WORKFLOW** (global OPEN) |
| **OQ-SY-L4.3-A1** | **OQ-SY-L3.1-A1** (fn helper pattern); **L3-A4**, **VERIFY-A3**; Runtime §8 |
| **OQ-SY-L4.3-A2** | **SY-STR-A1**, **OQ-SY-L4.1-A2** / **OQ-SY-L4.2-A2** (L4 path convention) |
| **OQ-SY-L4.3-A3** | **OQ-SY-L4.3-A1**; **OQ-SY-L4.1-A4** (fixture-only Bool pattern) |
| **OQ-SY-L4.3-A4** | **L3-A1=B**, **OQ-SY-3=B** |
| **OQ-SY-L4.3-A5** | **GM-ERR-A1…A5** (OPEN); **MOD-ERR-PROP** (language DEFERRED); **TARGET-LANDING-WORKFLOW** (global OPEN) |
| **OQ-SY-L4.3-A6** | **SY-L4.4** (distinct); **SY-L1.3** (CMP-01 `if`) |
| **OQ-SY-L4.4-A1** | **OQ-SY-L4.4-A4**, **A5**; VAR_LET §12.1–§12.2 |
| **OQ-SY-L4.4-A2** | **SY-L2.3** (distinct); **OQ-SY-L4.4-A3** |
| **OQ-SY-L4.4-A7** | **OQ-SY-L4.1-A2**, **OQ-SY-L4.2-A2**, **OQ-SY-L4.3-A2** (path text) |
| **OQ-SY-L4.4-A8** | **OQ-SY-L4.4-A1**; VAR_LET §12.4; **null_narrowing** specimen |
| **OQ-SY-L4.4-A6** | **OQ-GS-LET-PUB-1**, **OQ-GS-ACTION-DIAG-1**, §19.6.15.4 backlog |
| **OQ-GS-LET-PUB-1** | **OQ-SY-L4.4-A6**; language grammar **OPEN** — [GAPS.md §8.5](GAPS.md#85-sy-l44-coverage-backlog) |
| **OQ-GS-ACTION-DIAG-1** | Runtime graph mutation boundary; diagnostic implementation **OPEN** |
| **OQ-GS-FMT-ALIGN-1** | Tooling only; parser **unchanged** |
| **OQ-L3-ADV-A1** | **OQ-GS-LET-PUB-1**, Common §6.1; **OQ-L3-ADV-A3** |
| **OQ-L3-ADV-A2** | [L3_ADVANCED_SYNTAX.md](L3_ADVANCED_SYNTAX.md); **SYNTAX_TRACK.md** (pointer only) |
| **OQ-L3-ADV-A3** | **OQ-GS-LET-PUB-1**; **OQ-L3-ADV-A1** |
| **OQ-L3-ADV-A4** | **OQ-L3-ADV-A1** (contrast **`let:`**); Common §6.2 |
| **L5.8** queue | **L5-A3** (package visibility OPEN) |
| **L4.4-BFS-A1** | Distinct from **L5-PROG-A1** and **VERIFY-A1** |
| **L3-A2** | **SY-L3.3** landing context; **OQ-SY-L3.1-A1…A4** (later **SY-L3.1** landing — [§2.2](#22-l3-a2--sy-l31-landing-clarification)) |

### 2.2 L3-A2 / SY-L3.1 landing clarification

**L3-A2=B** is unchanged: `action` entered the Syntax Track with **SY-L3.3**; at that moment **SY-L3.1** had no on-disk specimen. That snapshot did **not** block a later **SY-L3.1** landing under separate owner decisions.

**Historical status:** **SY-L3.1** was **NOT LANDED** when **L3-A2=B** was adopted.

**Current status:** **SY-L3.1** is **LANDED** under [SYNTAX_TRACK.md §19.6.11](SYNTAX_TRACK.md#19611-sy-l31-graph_set_param-landed), following **OQ-SY-L3.1-A1=B**, **A2=A**, **A3=B**, **A4=B**. **TARGET-LANDING-WORKFLOW** (§3) remains **OPEN**.

### 2.3 gm-error — owner architectural direction (**SY-L4.3**; not implementation contract)

**OWNER ARCHITECTURAL DIRECTION (recorded; not an approved integration contract):**

- **`graph-memory-error`** is the shared, ecosystem-wide mechanism for defining and representing errors (`graph-memory-error/Docs/DESIGN.md`, `CANONICAL_DECISIONS.md`).
- Graph Memory components — including execution of GS **`fail`** statements — **should integrate** with this common error model over time.

**Explicitly NOT decided in this direction (do not infer):** exact **`ErrorCode`**; **`ErrorDefinition`** identity; GS **`fail`** → **`ErrorInstance`** mapping algorithm; runtime adapter API; registry YAML entry for this specimen; cross-boundary propagation; **`ErrorEnvelope`** wire/serialization (**D-09** remains **OPEN** in gm-error); interaction with action transaction rollback beyond normative Runtime §5–§8 prose.

**OPEN IMPLEMENTATION CONTRACTS:** [GAPS.md §8.4](GAPS.md#84-gm-error-integration-open-questions-sy-l43) (**GM-ERR-A1…A5**). Language **MOD-ERR-PROP** remains **DEFERRED** (`graph-memory-language` planning inventory) — **not** closed by Example corpus.

### 2.4 Block `let` / `var` visibility and diagnostics (owner direction — **not** language SoT)

**L3 Advanced Syntax subtrack:** canonical queue and specimens — **[L3_ADVANCED_SYNTAX.md](L3_ADVANCED_SYNTAX.md)** (**OQ-L3-ADV-A2=B**). **`let:`** / **`var:`** authoring contracts — **OQ-L3-ADV-A1**, **A3**, **A4**.

**OQ-GS-LET-PUB-1** records owner-approved **visibility intent** for standalone vs block **`let`** and **`pub`** inside **`let:`** blocks (refined by **OQ-L3-ADV-A3** for fn-level export). **Does not** amend `graph-memory-language` canonical grammar or parser contracts. Implementation gaps: [GAPS.md §8.5](GAPS.md#85-sy-l44-coverage-backlog), [§8.6](GAPS.md#86-l3-advanced-syntax-subtrack).

**`var` block:** **OQ-L3-ADV-A4=A** — grouping-only parity with standalone **`var`**; parser **GAP-01** / **GAP-02** unchanged.

**OQ-GS-ACTION-DIAG-1=A:** Read-only **`action`** warning — see ledger row; severity/code registry **OPEN**.

**OQ-GS-FMT-ALIGN-1:** Formatter alignment direction only — see ledger row; line-wrap/grouping **OPEN**.

**OQ-GS-CREATE-INIT-COLON-1:** **OPEN** — colon in **`create`** initialization may be confused with control-flow block opening; **no** replacement syntax selected; future Language Design review ([GAPS.md §8.5](GAPS.md#85-sy-l44-coverage-backlog)).

### 2.5 REORG R2 — Golden Syntax Corpus (owner decisions **GS-REORG-R2-A1…A9**)

**Slice:** **GS-EXAMPLE-CORPUS-REORG-R2-ARCHITECTURE-FINALIZATION**. **Normative target architecture:** [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md). **Physical migration:** **DEFERRED** → **R3** ([GAPS.md §3.4](GAPS.md#34-reorg-r3--migration-plan-open)).

**Coexistence with current layout:** **SY-A1=B** (`programs/<level>/syntax/`) remains **DECIDED** for **on-disk state until R3**; **GS-REORG-R2-A1=B** defines the **target** roots `language-features/` + `algorithms/` without revoking historical paths in this slice.

| Canonical ID | Option | Status | Meaning |
| ------------ | ------ | ------ | ------- |
| **GS-REORG-R2-A1** | **B** | DECIDED | Two independent corpus roots: `programs/language-features/`, `programs/algorithms/`. |
| **GS-REORG-R2-A2** | **C** | DECIDED | Stable specimen directory names; execution order in **pipeline.yaml**; no numeric directory prefixes. |
| **GS-REORG-R2-A3** | **A** | DECIDED | One physical location per specimen; multiple pipeline membership via canonical ID; no physical duplication. |
| **GS-REORG-R2-A4** | **B** | DECIDED | Stable **canonical ID**; historical IDs as **aliases**; ID independent of path. |
| **GS-REORG-R2-A5** | **C** | DECIDED | Per-specimen **specimen.yaml** = SoT; central **registry.yaml** generated only (not hand-edited). |
| **GS-REORG-R2-A6** | **C** | DECIDED | Algorithms grouped by subject categories; thematic pipelines may reference cross-category specimens. |
| **GS-REORG-R2-A7** | **C** | DECIDED | Metadata split: **complexity**, **features**, **prerequisites**; historical classification stored separately. |
| **GS-REORG-R2-A8** | **C** | DECIDED | Future runner: **strict** (auto prerequisites, BLOCKED on failed prereq) vs **direct** (no auto prerequisites). |
| **GS-REORG-R2-A9** | **C** | DECIDED | Dependency-aware stable ordering: transitive prerequisites, DAG, stable topo sort, once per ID per run, cycles = config error. |

### 2.6 REORG R2 — derived engineering decisions

**Status:** **DERIVED** (not owner approval). Full contracts: [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md §3–§10](GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md#3-похідні-інженерні-рішення-не-owner-approval).

| Topic | Decision |
| ----- | -------- |
| Failure policy | **continue-independent** (default); **fail-fast** (optional) |
| Execution statuses | `PASSED`, `FAILED`, `BLOCKED`, `NOT RUN` |
| Identity invariants | Unique canonical ID; unique aliases; no alias/canonical collision across specimens |
| Pipeline references | Canonical ID only; cross-pipeline allowed |
| Registry | Generated artifact; stale registry detected by validator (R3+) |
| Validation scope | Schema, IDs, aliases, refs, prerequisites, cycles, missing files, invalid pipelines |
| Canonical ID format (R2) | `gs.specimen.<slug>` with historical aliases (e.g. **SY-L1.1**, **L3-ADV-SY-01**) |
| Historical preservation | Landed/not-landed, source-level vs runtime, negative specimens — see architecture §9 |

---

## 3. OPEN and unresolved (status preserved)

| ID | Status | Source | Notes |
| -- | ------ | ------ | ----- |
| **VERIFY-A2** | OPEN | §11 | Explicit discard syntax not decided. |
| **OQ-SY-2** | OPEN | §19.7 | `syntax/negative/` per level vs central vs L5-only; monolith **recommendation A** (not a DECIDED option). |
| **SY01-D-01** | OPEN | §19.6.6 | Destructuring missing-field semantics not demonstrated. |
| **L4-SATURATION** | OPEN | §8.4.3 | Whether to declare L4 **SATURATED** after queue completion; options A/B/C sketched; **recommendation B** (corpus-organization only, not owner DECIDED). |
| **L2-DOMAIN-DIRS** | OPEN | §3 | L2 domain subdirectories under `02-composition/`. |
| **L3-DOMAIN-DIRS** | OPEN | §3 | L3 domain subdirectories under `03-advanced/`. |
| **TARGET-LANDING-WORKFLOW** | OPEN | §10 | Target → landed `.gs` workflow and status machinery. |
| **GS-REORG-R3** | **PLAN COMPLETE** | [GAPS.md §3.4](GAPS.md#34-reorg-r3--migration-plan), [migration/README.md](migration/README.md) | Path map + pipelines + module safety + R4 slices documented. **Physical move = R4 (OPEN).** |
| **GM-ERR-A1** | OPEN | [GAPS.md §8.4](GAPS.md#84-gm-error-integration-open-questions-sy-l43) | What **SY-L4.3** / Example corpus documents vs requires in **`graph-memory-error`** registry. |
| **GM-ERR-A2** | OPEN | §8.4 | GS **`fail "message"`** → **`ErrorDefinition`** / **`message_parameters`** mapping. |
| **GM-ERR-A3** | OPEN | §8.4 | Authoritative **registry** location and registration lifecycle. |
| **GM-ERR-A4** | OPEN | §8.4 | **`ErrorEnvelope`** / wire format scope vs source-level specimen (**D-09** OPEN). |
| **GM-ERR-A5** | OPEN | §8.4 | Future **`fail expr`** / string interpolation vs **OQ-SY-L4.3-A5=A** literal-only specimen. |
| **OQ-GS-CREATE-INIT-COLON-1** | OPEN | §2.4, [GAPS.md §8.5](GAPS.md#85-sy-l44-coverage-backlog) | **`create`** init `:` vs block-opening ambiguity — no syntax replacement chosen. |
| **OQ-GS-LET-PUB-GRAM-1** | OPEN | §2.4, [GAPS.md §8.5](GAPS.md#85-sy-l44-coverage-backlog) | Exact **`let:`** block grammar; **`pub`** placement; binding lifetime; lexical scope; shadowing; nested block exports; type-checking; parser/runtime support (**OQ-GS-LET-PUB-1** semantics ≠ implemented grammar). |
| **OQ-GS-ACTION-DIAG-CODE-1** | OPEN | §2.4 | Diagnostic code, severity, and tooling hook for **OQ-GS-ACTION-DIAG-1** warning. |
| **OQ-GS-FMT-WRAP-1** | OPEN | §2.4 | Exact formatter grouping and line-wrap rules for **OQ-GS-FMT-ALIGN-1**. |
| **OQ-L3-ADV-GRAM-1** | OPEN | [L3_ADVANCED_SYNTAX.md §5](L3_ADVANCED_SYNTAX.md#5-open-contracts-example--language) | Illegal **`let:`** / **`var:`** body — syntax-error shapes (**GAP-01**). |
| **OQ-L3-ADV-INIT-1** | OPEN | §5 | Allowlist for conditional **expression** initializers in **`let:`** entries. |

Parser/language gaps (**GS-C001**, **Int / Int**, VM overflow, etc.) are **not** owner decisions; track in [GAPS.md §4](GAPS.md#4-classic-l4-language-runtime-and-corpus-gaps-841843), [§6](GAPS.md#6-parser-and-runtime-verification-13) (parser evidence: [PARSER_AUDIT.md](PARSER_AUDIT.md)).

---

## 4. Historical checkpoints (**CP-A1=C**)

Recorded for audit; **no push** required by owner.

| # | Commit (`master`) | Message | Scope |
| - | ----------------- | ------- | ----- |
| 1 | `97c2650` | `golden(gs): complete L4 complex corpus queue` | L4.3–L4.5 `.gs` + L4 registry |
| 2 | `8e46cde` | `golden(gs): add L5 modular corpus foundation` | L5.1–L5.5, L5.9 `negative/`, L5 charter §15–§16 |
| 3 | `24afef0` | `golden(gs): standardize sample and verify examples` | L2–L4 `*_sample` / `*_verify` ergonomics + registry §11/§13 |

Baseline ancestor: `634624a` (`feat(corpus): add L4.2 rle_roundtrip`).

---

## 5. Related canonical documents

| Document | Role |
| -------- | ---- |
| [CHARTER.md](CHARTER.md) | Purpose, scope, L1–L5 taxonomy, reference vs implementation |
| [POLICY.md](POLICY.md) | Filesystem layout, sample/verify conventions |
| [CLASSIC_LEVELS.md](CLASSIC_LEVELS.md) | Classic L1–L4 registry, queues, saturation |
| [L5_PROJECT_SYSTEM.md](L5_PROJECT_SYSTEM.md) | L5 charter, golden queue, project specs |
| [SYNTAX_TRACK.md](SYNTAX_TRACK.md) | Golden Syntax Track registry (**15/18** landed) |
| [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md) | **Target** Golden Syntax Corpus architecture (**GS-REORG-R2**); manifests and directory contracts |
| [migration/README.md](migration/README.md) | **R3** migration plan; **R4** execution slices |
| [L3_ADVANCED_SYNTAX.md](L3_ADVANCED_SYNTAX.md) | L3 Advanced Syntax subtrack (**OQ-L3-ADV-A2=B**) |
| [GAPS.md](GAPS.md) | OPEN/blocker/deferred registry ([§2](GAPS.md#2-owner-open-decisions-decisionsmd-3) mirrors §3) |
| [PARSER_AUDIT.md](PARSER_AUDIT.md) | GSParser snapshot (**DOC-Q5=B** parser slice) |
| [annexes/](annexes/README.md) | L4.1–L4.5 specimen annexes (**DOC-Q4=B**) |

Compat index: [EXAMPLE_CORPUS_ORGANIZATION.md](../EXAMPLE_CORPUS_ORGANIZATION.md) (legacy §1–§19 stubs). Broader implementation-gap audit: [CANONICAL_TARGET_AUDIT_FINDINGS.md](../CANONICAL_TARGET_AUDIT_FINDINGS.md) (**DOC-Q5=B**; separate from [PARSER_AUDIT.md](PARSER_AUDIT.md)).
