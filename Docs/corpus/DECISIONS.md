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
| **L3-A2** | — | **B** | DECIDED | §19.1 | `action` introduced with SY-L3.3; SY-L3.1 remains NOT LANDED. |
| **L3-A3** | — | **C** | DECIDED | §19.1 | Self-contained `create` + `set` + read-back in `action`. |
| **L3-A4** | — | **C** | DECIDED | §19.1, §11 | Graph sample/verify as separate `action … -> Bool` (see §11 exception prose). |
| **OQ-SY-1** | — | **A** | DECIDED (Syntax Track) | §19.7 | Accept `[expr,…]` literals per Core §2 SOURCE-LEVEL; parser **GS-C001** remains OPEN in language repo. |
| **OQ-SY-3** | — | **B** | DECIDED | §19.7 | Mini GSchema stub per specimen/module; aligns **L3-A1=B**. |
| **OQ-SY-4** | — | **A** | DECIDED (metadata) | §19.7 | `syntax_depth` in registry only (**SY-A2=B**); not duplicated in file headers. |
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
| **L5.8** queue | **L5-A3** (package visibility OPEN) |
| **L4.4-BFS-A1** | Distinct from **L5-PROG-A1** and **VERIFY-A1** |

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
| [SYNTAX_TRACK.md](SYNTAX_TRACK.md) | Golden Syntax Track registry (**10/18** landed) |
| [GAPS.md](GAPS.md) | OPEN/blocker/deferred registry ([§2](GAPS.md#2-owner-open-decisions-decisionsmd-3) mirrors §3) |
| [PARSER_AUDIT.md](PARSER_AUDIT.md) | GSParser snapshot (**DOC-Q5=B** parser slice) |
| [annexes/](annexes/README.md) | L4.1–L4.5 specimen annexes (**DOC-Q4=B**) |

Compat index: [EXAMPLE_CORPUS_ORGANIZATION.md](../EXAMPLE_CORPUS_ORGANIZATION.md) (legacy §1–§19 stubs). Broader implementation-gap audit: [CANONICAL_TARGET_AUDIT_FINDINGS.md](../CANONICAL_TARGET_AUDIT_FINDINGS.md) (**DOC-Q5=B**; separate from [PARSER_AUDIT.md](PARSER_AUDIT.md)).
