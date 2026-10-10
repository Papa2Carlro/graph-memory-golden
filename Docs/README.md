# Graph Memory Example — Documentation

**Migration:** Documentation decomposition per **SY-STR-A3=C** — **structural migration complete** (slices **DOC-DECOMP-0** … **DOC-DECOMP-8**). This index is the canonical entry point for corpus documentation.

## Canonical corpus documents

**[EXAMPLE_CORPUS_ORGANIZATION.md](EXAMPLE_CORPUS_ORGANIZATION.md)** remains the **compatibility monolith**: legacy **§1–§19** headings and GitHub anchors, plus lightweight stubs pointing to `corpus/`. Normative registry and charter content lives in the documents below.

| Document | Status | Role |
| -------- | ------ | ---- |
| [corpus/CHARTER.md](corpus/CHARTER.md) | **CANONICAL** | Purpose, scope, qualitative L1–L5 taxonomy, reference vs implementation |
| [corpus/POLICY.md](corpus/POLICY.md) | **CANONICAL** | Filesystem layout, module isolation, sample/verify conventions |
| [corpus/CLASSIC_LEVELS.md](corpus/CLASSIC_LEVELS.md) | **CANONICAL** | Classic L1–L4 status, inventories, queues, saturation |
| [corpus/L5_PROJECT_SYSTEM.md](corpus/L5_PROJECT_SYSTEM.md) | **CANONICAL** | L5 charter (§15), golden queue and project specs (§16) |
| [corpus/SYNTAX_TRACK.md](corpus/SYNTAX_TRACK.md) | **CANONICAL** | Golden Syntax Track — **10/18** landed (§19) |
| [corpus/DECISIONS.md](corpus/DECISIONS.md) | **CANONICAL** | Owner decision ledger (VERIFY-A* aliases per **DOC-Q3=A**) |
| [corpus/GAPS.md](corpus/GAPS.md) | **CANONICAL** | OPEN, DEFERRED, BLOCKED gaps |
| [corpus/PARSER_AUDIT.md](corpus/PARSER_AUDIT.md) | **CANONICAL** | GSParser compatibility snapshot (§13; **DOC-Q5=B** parser slice) |
| [corpus/annexes/](corpus/annexes/) | **CANONICAL** | L4.1–L4.5 per-specimen annexes (**DOC-Q4=B**) |
| [EXAMPLE_CORPUS_ORGANIZATION.md](EXAMPLE_CORPUS_ORGANIZATION.md) | **COMPAT** | Stubs for §8.4.1, §15–§16, §19; §14 reserved; §18 related-doc index |

**Broader implementation-gap audit (**DOC-Q5=B**):** [CANONICAL_TARGET_AUDIT_FINDINGS.md](CANONICAL_TARGET_AUDIT_FINDINGS.md) — separate from the historical parser snapshot [PARSER_AUDIT.md](corpus/PARSER_AUDIT.md). Corpus OPEN/DEFERRED registry: [GAPS.md](corpus/GAPS.md).

## Compatibility

- **DOC-Q1=A:** [§14 reserved stub](EXAMPLE_CORPUS_ORGANIZATION.md#14-reserved--compatibility-placeholder) in the monolith; **§15+** numbering unchanged.
- **DOC-Q2=A:** Legacy `## N.` headings and anchors remain in the monolith; bodies migrated to `corpus/` as listed above.

## Repository entry

Root [README.md](../README.md) links here and to the compatibility monolith.
