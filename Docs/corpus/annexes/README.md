# Example Corpus — L4 Annexes

**Status:** **MIGRATED / CANONICAL** (**DOC-Q4=B**) — per-specimen L4 validation narratives, contracts, and tooling qualifications.

**Classic registry (summary table, queues, saturation):** [CLASSIC_LEVELS.md](../CLASSIC_LEVELS.md) §8.  
**Compat entry:** [EXAMPLE_CORPUS_ORGANIZATION.md](../../EXAMPLE_CORPUS_ORGANIZATION.md) §8.4.1 (legacy headings + anchor stubs).  
**Owner decisions:** [DECISIONS.md](../DECISIONS.md) (**L4.3-CONTRACT**, **L4.4-BFS-A1**, **L4-QUEUE**, …).  
**OPEN gaps:** [GAPS.md](../GAPS.md) (**L4-SATURATION**, language/parser gaps).  
**Parser snapshot:** [PARSER_AUDIT.md](../PARSER_AUDIT.md) (corpus-wide; not specimen runtime proof).

## Index

| ID | Annex | Program |
| -- | ----- | ------- |
| **L4.1** | [L4.1.md](L4.1.md) | `parse_decimal_strict.gs` |
| **L4.2** | [L4.2.md](L4.2.md) | `rle_roundtrip.gs` |
| **L4.3** | [L4.3.md](L4.3.md) | `n_queens_backtrack.gs` |
| **L4.4** | [L4.4.md](L4.4.md) | `bfs_shortest_path_flat.gs` |
| **L4.5** | [L4.5.md](L4.5.md) | `shunting_yard_eval.gs` |

## Shared notes

- **SOURCE-LEVEL ACCEPTED** ≠ **PARSER VERIFIED** ≠ **RUNTIME VERIFIED** — see [CHARTER.md §3.1](../CHARTER.md#31-documented-target-vs-verification-evidence).
- Cross-specimen L4 language gaps (`String` from `[Char]`, `Int / Int`, optional collections) are tracked once in [GAPS.md §4](../GAPS.md#4-classic-l4-language-runtime-and-corpus-gaps-841843); annexes cite specimen-local use only.
