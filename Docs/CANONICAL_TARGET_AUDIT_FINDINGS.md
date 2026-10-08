# Canonical Target Audit Findings

**Status:** AUDIT RECORD (read-only documentation)  
**Date:** 2026-10-06  
**Trigger:** Creation of canonical target `programs/01-classical/strings/palindrome.gs` (relocated under entity taxonomy)  
**Convention:** Corpus-scoped implementation gaps and open L1/L2 questions (aligned with gap-note style in `graph-memory-language/Docs/Syntax/CONFORMANCE_INVENTORY.md`; not an owner decision record).

**Scope of this document:** Record evidence only. Does not change language contracts, corpus programs, or implementation.

---

## Finding 1 — Function return-type syntax (`-> Type`)

| Field | Record |
|-------|--------|
| **Exact issue** | Canonical GS function declarations use an explicit return type after `->` (e.g. `fn is_palindrome(text: String) -> Bool { ... }`). The current `GSParser` rejects this surface: `ParserDiagnosticException: Expected SYM '{' but got OP '-'` at the `->` token. |
| **Evidence / sources** | **Language (canonical):** `graph-memory-language/Docs/Language/GS_V0_1_TYPE_SYSTEM.md` §1–§2 (`explicit return type with -> Type`; example `) -> Float {`). `graph-memory-language/Docs/Language/Concepts/LANGUAGE_SCRIPT_CONCEPTS_V0_1.md` (signature form `[visibility] fn name(params) -> ReturnType { body }`). `graph-memory-language/Docs/Language/GS_PARSER_CONTRACT_V0_1.md` (return types checked statically; fn declaration grammar). **Corpus (canonical examples):** `programs/01-classical/numbers/fibonacci.gs` (`fn fibonacci(n: Int) -> Int`), `programs/01-classical/numbers/prime_numbers.gs` (`fn is_prime(n: Int) -> Bool`), `programs/01-classical/strings/palindrome.gs` (`fn is_palindrome(text: String) -> Bool`). **Implementation (repro, read-only):** `GSParser().parse(...)` on `fibonacci.gs` and `palindrome.gs` fails with the diagnostic above (`graph-memory-language`, `PYTHONPATH=src`). **Inventory drift (non-authoritative):** `LANGUAGE_SCRIPT_V0_1.md` / `LANGUAGE_SYMBOLS_V0_1.md` mark `->` as “IMPLEMENTED” in lexicon tables — contradicts parser behavior for classical corpus sources. |
| **Current status** | **Implementation gap** (parser). Not a language-design blocker: canonical syntax and examples are fixed; parser does not yet accept the established surface. |
| **Why it matters** | Classical reference programs and `palindrome.gs` cannot be parsed or compiled end-to-end until `-> ReturnType` is accepted before `{`. Blocks corpus validation without changing canonical syntax. |
| **Scope boundary** | Do **not** change canonical syntax, classical examples, or `palindrome.gs`. Do **not** treat as open A-question. Parser recovery is a separate bounded implementation track. |
| **Decision** | **Deferred** to future parser implementation work. No owner decision recorded here. |

---

## Finding 2 — Optional `Char?` narrowing (`String.get` → `Char` binding)

| Field | Record |
|-------|--------|
| **Exact issue** | Canonical API types `String.get(i)` as `Char?` (present `Char` or `ABSENT`). The palindrome target binds results as non-optional locals: `var left Char = text.get(i)` and `var right Char = text.get(n - i - 1)` after index reasoning. The L1/L2 mechanism that permits or rejects narrowing `Char?` → `Char` when the programmer has established a valid index (or other proof) is **not specified** in closed contract text for this corpus usage. |
| **Evidence / sources** | **Language (canonical):** `graph-memory-language/Docs/Language/GS_STRING_AND_CHAR_CONTRACT_V0_1.md` §6 (`text.get(i) -> Char?`; in-range → present `Char`; OOB → `ABSENT`). Collection optional semantics cross-ref: `GS_V0_1_LANGUAGE_CORE.md` §3; `LANGUAGE_POST_SUGAR_DECISIONS_V0_1.md` §1 (safe `.get()` / optional absent). **Corpus (target usage):** `programs/01-classical/strings/palindrome.gs` lines binding `Char` from `text.get(...)`. |
| **Current status** | **OPEN** language/semantic question for future **L1/L2 research** only. Not an implementation gap record for this slice; not a parser/runtime defect claim. |
| **Why it matters** | Future semantic checker and runtime must define whether proof after bounds checks allows direct `Char` binding, requires explicit optional handling, or uses another canonical narrowing rule—without contradicting `Char?` / `ABSENT` for OOB `.get()`. |
| **Scope boundary** | Do **not** decide unwrap syntax, flow-sensitive rules, or new A-questions here. Do **not** explore L3/L4/L5 (IR, VM, physical representation). Do **not** change `GS_STRING_AND_CHAR_CONTRACT_V0_1.md` or A1–A8. Do **not** modify `palindrome.gs` to paper over the open question. |
| **Decision** | **Deferred** to future bounded language/semantic research. No owner decision recorded here. |

---

## Related corpus artifact

| Artifact | Role |
|----------|------|
| `programs/01-classical/strings/palindrome.gs` | Canonical String/Char target reference (unchanged by this audit doc). |

---

## Explicit non-changes (this audit)

- No edits to `palindrome.gs`, other classical `.gs` files, `GS_STRING_AND_CHAR_CONTRACT_V0_1.md`, parser, semantic layer, runtime, IR, VM, or foundation recovery tracks.
