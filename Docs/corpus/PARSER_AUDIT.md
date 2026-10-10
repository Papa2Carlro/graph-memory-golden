# GS corpus ↔ GSParser compatibility (audit snapshot)

**Status:** AUDIT RECORD (Example repository — tooling alignment; not language SoT)
**Date:** 2026-10-09
**Scope:** Historical **GSParser** snapshot for Example `.gs` programs at audit time. **Not** parser/runtime re-verification in this document. **RUNTIME NOT VERIFIED** (see [POLICY.md §4.5](POLICY.md#45-source-level-acceptance-vs-runtime-verification)).

**Related (separate responsibility, DOC-Q5=B):** Broader implementation-gap audit — [CANONICAL_TARGET_AUDIT_FINDINGS.md](../CANONICAL_TARGET_AUDIT_FINDINGS.md) (not this parser snapshot; monolith §13/§18). Corpus gap registry: [GAPS.md](GAPS.md).

**Monolith compatibility:** Legacy section **§13** — [EXAMPLE_CORPUS_ORGANIZATION.md §13](../EXAMPLE_CORPUS_ORGANIZATION.md#13-gs-corpus--gsparser-compatibility-audit-snapshot).

**Tooling:** `graph-memory-language` `GSParser` (`PYTHONPATH=src`), **Python 3.12.13** per `pyproject.toml` (`requires-python >= 3.12`). Default host `python3` **3.9.x** is an **environment mismatch** (class **D**).

---

## Summary matrix

| Metric | Count (46 programs) |
| ------ | -------------------: |
| **GSParser PASS** | **0** |
| **Blocked by parser implementation gap (class A)** | **46** (every file; see dominant gap below) |
| **Blocked by lexer internal defect (class E)** | **1** additionally (`n_queens_backtrack.gs` — `SyntaxError` on blank line inside indented `each` body; see below) |
| **Proven Example noncanonical syntax (class B)** | **0** (no corpus rewrite performed) |
| **Compiler success on corpus sources** | **0** (parse stage fails first) |
| **Runtime verified** | **0** (unchanged — **RUNTIME NOT VERIFIED**) |

---

## Dominant failure classes (minimal reproduction verified)

| Class | Construct | Canonical ref | Parser behavior | Classification |
| ----- | --------- | ------------- | --------------- | -------------- |
| **A1** | `fn name(...) -> ReturnType {` | `GS_PARSER_CONTRACT_V0_1.md` §3.1 row 1; `GS_V0_1_RUNTIME_MODEL.md` §3 | Expects **`fn name(...) : ReturnType {`** (`declarations.py`); `->` tokenized as `-` then `>` → **FAIL** | **A** — valid GS, parser gap |
| **A2** | `[T]` parameters / returns (`[Int]`, `[Char]`, `Int?` in types) | `GS_PARSER_CONTRACT_V0_1.md` §3.1 rows 27–28; `GS_V0_1_TYPE_SYSTEM.md` | Return/param type parser accepts **single `IDENT` only** → **`[`** FAIL | **A** — valid GS, parser gap |
| **A3** | Multiline formal parameter lists | `GRAPH_LANGUAGE_COMMON_SYNTAX_V0_1.md` (shared layout) | `NEWLINE` after `(` in params → FAIL | **A** — valid GS, parser gap (`run_length_encode.gs` hits this **before** A1) |
| **E1** | Blank line inside indentation block | Shared indentation rules (`GRAPH_LANGUAGE_COMMON_SYNTAX_V0_1.md`) | Lexer treats blank line as **indent 0** → **Inconsistent indentation** (`lexer.py`) | **E** — lexer defect; **not** fixed in corpus (valid GS must not be rewritten to parser limits) |

**Note:** After retokenizing with workarounds for A1–A3, corpus constructs such as **`each` / ranges**, **`exists`**, **`is not`**, **standalone calls**, **`var` reassignment**, and **`Int?` locals** **do** parse in isolation (smoke snippets, Python 3.12). Failures on full files are dominated by **declaration-header** gaps, not by those statement forms alone.

---

## Per-level first-failure distribution (heuristic, first `fn` signature)

| Level | Files | Primary gap |
| ----- | ----: | ----------- |
| **L1** | 34 | **A2** (18) or **A1** (16) |
| **L2** | 4 | **A2** (2), **A3** (1), **A1** (1) |
| **L3** | 3 | **A2** (2), **A1** (1) |
| **L4** | 5 | **A1** (4), **E1** (1 — `n_queens_backtrack.gs`) |

---

## Blockers (honest)

1. **Parser `->` return type** vs canonical **`->`** (implementation uses **`:`**).
2. **Collection / optional type syntax** in annotations (`[T]`, `T?`) not parsed in headers.
3. **Multiline parameter lists** not accepted.
4. **Lexer blank-line / indent stack** interaction inside braced `fn` bodies with colon blocks (`n_queens_backtrack.gs`).
5. **OPEN language** items unchanged (e.g. global **`Int / Int`**, arithmetic overflow **`DEFERRED_TO_VM_ERROR_MODEL`**) — not Example syntax defects.

**L4.5 arithmetic (specimen-local):** `mul_int64` overflow guards use **`mul_pos_would_overflow`** (**positive / positive** `Int / Int` only) and **`sub_int64(0, ·)`** for magnitudes; **`INT_MIN`** / **`-1`** special-cased; final `*` / `/` remain surface operators after guards — see [EXAMPLE_CORPUS_ORGANIZATION.md §8.4.1 L4.5](../EXAMPLE_CORPUS_ORGANIZATION.md#841-l4-landed-registry) (classic registry; not re-audited here).
