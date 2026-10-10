# Example Corpus — L5 Project System

**Status:** **CANONICAL** (Example repository — L5 charter, golden project queue, per-project specs; not GS language SoT)  
**Owner decisions:** [DECISIONS.md](DECISIONS.md) (**L5-PROG-A1/A2**, **L5-A1…A10**, **L5-N1/N2**). **OPEN / DEFERRED / BLOCKED L5 contracts:** [GAPS.md §7](GAPS.md#7-l5-open-contracts-and-design-gates-monolith-17).  
**Level L5 taxonomy:** [CHARTER.md §2](CHARTER.md#2-level-taxonomy-classic-programs). **Filesystem / sample-verify:** [POLICY.md](POLICY.md). **Classic L4 parity:** [annexes/L4.1.md](annexes/L4.1.md).  
**Compat:** [EXAMPLE_CORPUS_ORGANIZATION.md](../EXAMPLE_CORPUS_ORGANIZATION.md) §15–§16 legacy stubs; language SoT links in monolith §18.

---

## 15. L5 Project System Charter

**Status:** CANONICAL (Example repository — golden-standard roadmap; not GS language SoT)

**Owner decisions (2026-10-09):** Canonical ledger — [DECISIONS.md](DECISIONS.md) (**L5-PROG-A1/A2**, **L5-A1…A10**, **L5-N1/N2**).

Normative GS module/import/project rules live in `graph-memory-language` (see [monolith §18](../EXAMPLE_CORPUS_ORGANIZATION.md#18-related-documents)). This charter defines **how the Example corpus** authors and registers L5 golden **projects**.

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

Diagnostic **codes/format** remain **OPEN** ([GAPS.md §7](GAPS.md#7-l5-open-contracts-and-design-gates-monolith-17)); negatives are specified as **expected behavior** text until codes exist.

### 15.13 Cross-language unified module coverage (L5-A4=C, phase 3)

- At least one **PROPOSED** golden project combining **two or more** of `.gschema`, `.gq`, `.gs`, `.gi` under one logical `module` (§16 **L5.11**).
- **BLOCKED** on any extra owner closure not already in `UNIFIED_MODULE_SYMBOL_SPACE.md` + import rules (#22.6 cross-language imports).

### 15.14 Source-level acceptance

Each landed L5 project:

- Registers **module graph**, **public surface**, and **orchestration** (`*_sample` / `*_verify` per §11 where applicable).
- States **SOURCE-LEVEL ACCEPTED** when specimen + registry row complete.
- Does **not** imply parser/compiler/runtime pass.

### 15.15 Runtime / tooling verification boundary

**RUNTIME NOT VERIFIED** unless a future owner slice explicitly records tool execution. Parser compatibility audits ([PARSER_AUDIT.md](PARSER_AUDIT.md)) apply to `.gs` units but **do not** block L5 authoring on canonical surface.

### 15.16 Saturation criteria (not declared here)

**L5 SATURATED** is **not** defined in this slice. Withhold until owner reviews queue completion against **A2=C** end-state coverage (single-package, external packages, unified modules, manifest, negatives, versioning/conflicts).

### 15.17 OPEN design gates (summary)

See **[GAPS.md §7](GAPS.md#7-l5-open-contracts-and-design-gates-monolith-17)** for the full OPEN / DEFERRED registry. Gates that **block** queue rows: **package visibility syntax** (before L5.8), **unified-module authoring conventions** (before L5.11 closure), **diagnostic codes** (optional for landing, required for strict tooling alignment).

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
| **Negative golden (registry narrative, #22.4, #22.19)** | If added to a separate compilation unit, these imports are **compile-time errors** (private / non-public symbol); diagnostic **codes OPEN** ([GAPS.md §7](GAPS.md#7-l5-open-contracts-and-design-gates-monolith-17)): `use example.visibility.internal::secret_token` — explicit **private**; `use example.visibility.internal::default_token` — **default-private** (not `public`). |
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
| **Negative golden (registry narrative)** | `use example.alias.a::token` then `use example.alias.b::token` (no `as`) — **ERROR** unqualified import collision (#22.10); `use example.alias.a::token` twice — **ERROR** duplicate import (#22.14); `use example.alias.a::token as token_from_a` then `let token_from_a = …` or local `fn token_from_a` — **ERROR** namespace collision (#22.13); `use …::token as token_from_a` then `fn token_from_a` — **ERROR** cannot shadow imported binding (#22.17). Diagnostic **codes OPEN** ([GAPS.md §7](GAPS.md#7-l5-open-contracts-and-design-gates-monolith-17)). |
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
| **Purpose** | Split superseded §8.5 design: scan/parse/orchestrate modules; **semantic parity** with [annexes/L4.1.md](annexes/L4.1.md) `parse_decimal_strict.gs`. |
| **Directory tree** | `main.gs`, `scan.gs`, `parse.gs` (names illustrative) |
| **Module graph** | Logical namespaces under `example.parse_decimal.*`; public surface mirrors L4.1 contracts. |
| **Classification** | Positive. |
| **Source-level acceptance** | Registry references [annexes/L4.1.md](annexes/L4.1.md) validation record; `*_verify` aggregates same golden obligations as L4.1. |
| **Depends on** | L5.1, L5.2 recommended |
| **Owner refs** | [CLASSIC_LEVELS.md §8.5](CLASSIC_LEVELS.md#85-superseded-historical-l4-direction-multi-file) historical; L5-A1=B |

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
| **Blocker** | **Package visibility syntax** OPEN (§15.7, [GAPS.md §7](GAPS.md#7-l5-open-contracts-and-design-gates-monolith-17)) — owner **L5-A3=C** requires design gate before multi-package examples. |
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
| **Expected diagnostic contract (L5-N2=B)** | **Severity:** ERROR. **Category:** `import_cycle` (registry label; **code OPEN** [GAPS.md §7](GAPS.md#7-l5-open-contracts-and-design-gates-monolith-17)). **Normative rule:** #22.31 — ordinary dependency cycles are compile-time errors. **Involved modules:** `example.cycle.a`, `example.cycle.b`. **Involved import edges:** `example.cycle.a` → `example.cycle.b` (`token_b`); `example.cycle.b` → `example.cycle.a` (`token_a`). **Source location precision:** **OPEN** — contract does not fix whether the diagnostic anchors on a `use` declaration, a module, or the cycle as a whole; do **not** assert file/line/column in registry. **Scope (normative):** project logical import graph (#22.7). |
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
