# language-features — canonical syntax corpus root

**Status:** **R4 migrated** (working tree) — golden syntax specimens and manifests live under this tree. Legacy layout `programs/01-classical/` … `03-advanced/syntax/` is removed on disk; provenance remains in `specimen.yaml` → `historical.classic_level_path` and corpus docs.

**Historical baseline:** **21** language-feature specimens · **28** artifacts (`.gs` + `.gschema` where applicable). This baseline is not the live discovery count.

**GS-VAR-16-LAND-1:** four additional control-flow specimens (`inline-if-basic`, `inline-if-multiline`, `inline-if-nested`, `inline-if-null-expected`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not Syntax Track rows. Not in a READY pipeline.

**GS-VAR-21-LAND-1:** four additional optional-null specimens (`optional-member-basic`, `optional-access-coalesce`, `nullable-fallback`, `explicit-null-fallback`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not Syntax Track rows. Not in a READY pipeline. `person.company?.name` was not added (**BLOCKED**).

**GS-VAR-23-LAND-1:** two additional control-flow specimens (`each-break`, `each-continue`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not Syntax Track rows. Not in a READY pipeline.

**GS-VAR-24-LAND-1:** one collections specimen (`collection-set`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-27-LAND-1:** one collections specimen (`collection-each`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-35-LAND-1:** one control-flow specimen (`each-string`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-36-LAND-1:** three expression specimens (`arithmetic-add`, `arithmetic-subtract`, `arithmetic-multiply`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not Syntax Track rows. Not in a READY pipeline. `arithmetic-divide` was not created.

**GS-VAR-37-LAND-1:** three expression specimens (`logical-and`, `logical-or`, `logical-not`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not Syntax Track rows. Not in a READY pipeline.

**GS-VAR-39-LAND-1:** one control-flow specimen (`match-no-else`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-40-LAND-1:** one control-flow specimen (`match-nested`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-41-LAND-1:** one control-flow specimen (`match-pattern-or`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-43-LAND-1:** one control-flow specimen (`if-logical-condition`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-45-LAND-1:** one control-flow specimen (`if-multiple-elif`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-47-LAND-1:** one control-flow specimen (`each-nested-control`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-48-LAND-1:** one control-flow specimen (`each-early-return`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-49-LAND-1:** one control-flow specimen (`match-pattern-or-chain`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-51-LAND-1:** one expression specimen (`logical-short-circuit`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-53-LAND-1:** one expression specimen (`arithmetic-precedence-associativity`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-54-LAND-1:** one control-flow specimen (`each-header-shadowing`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-55-LAND-1:** one bindings specimen (`module-private-let`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-56-LAND-1:** one collections specimen (`collection-alias`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-58-LAND-1:** one types-width specimen (`float-binding`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-60-LAND-1:** one types-width specimen (`uint-binding`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline. **GS-VAR-59-A1=A** canonicalized in Language.

**GS-VAR-62-LAND-1:** one source-syntax specimen (`single-line-comment`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline.

**GS-VAR-63-LAND-1:** one functions specimen (`public-function`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline. Same-module `public fn` only; no cross-module proof.

**GS-VAR-64-LAND-1:** one bindings specimen (`module-public-let`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline. Explicit `public let`; same-module read only; **GAP-MODULE-LOCALS** remains.

**GS-VAR-65-A-LAND-1:** one comparisons specimen (`ordering-comparisons`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline. CMP-01 four ordering operators; twelve-case matrix; **GS-VAR-65** blocked predecessor.

**GS-VAR-69-LAND-1:** one expression specimen (`arithmetic-divide`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline. **GS-VAR-68** D11 quotient semantics; five-case `Int / Int` matrix; no div-zero; no unary `-` in division expressions.

**GS-VAR-72-LAND-1:** one expression specimen (`arithmetic-remainder`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline. **GS-VAR-71** D12 truncated remainder; six-case matrix. **GS-C002** normative **CLOSED** (GS-VAR-74 language + **GS-VAR-75-DOC-1** Golden sync) for signed `Int % Int`; parser/runtime **NOT VERIFIED**.

**GS-VAR-79-LAND-1:** one control-flow specimen (`each-range-equal-bounds`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline. **GS-VAR-76-A1=B** equal bounds `3..3` → zero iterations; counter + sentinel observability; parser/runtime **NOT VERIFIED**. Discovered language-feature manifests: **62**. Landed language-feature manifests: **62**. Candidates not landed: **0**.

**GS-VAR-81-DOC-1:** owner **GS-VAR-80-A1=A** — partial **A4** coverage policy ([DECISIONS.md §2.40](../../Docs/corpus/DECISIONS.md#240-gs-var-81--reversed-bounds-partial-coverage-owner-decision-canonicalization)).

**GS-VAR-82-LAND-1:** one control-flow specimen (`each-range-reversed-bounds`). `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Outside the historical **21**. Not a Syntax Track row. Not in a READY pipeline. `each i in 5..3:` zero-trip counter + sentinel; **A4** warning **not** observed; **A4** **PARTIAL ONLY**; parser/runtime **NOT VERIFIED**. Discovered language-feature manifests: **63**. Landed language-feature manifests: **63**. Candidates not landed: **0**.

**GS-VAR-110-LAND-1:** six grammar-coverage specimens for previously unlinked Language index rules: `enum-qualified`, `string-interpolation`, `parameter-default`, `graph-delete-entity`, `graph-disconnect-relation`, `graph-disconnect-endpoint`. `acceptance.landed` is **true**. `source_level_accepted` and `runtime_verified` are **false**. Normative syntax only; **GAP-03** (delete/disconnect implementation) unchanged. Parser/runtime **NOT VERIFIED**.

**Canonical map:** [Docs/corpus/migration/R3_MIGRATION_MAP.md](../../Docs/corpus/migration/R3_MIGRATION_MAP.md) §3.1  
**Architecture:** [Docs/corpus/GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](../../Docs/corpus/GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md) §4.2

## Layout (`<category>/specimens/<slug>/`)

| Piece | Role |
| ----- | ---- |
| `specimen.yaml` | Canonical metadata (`canonical_id`, artifacts, acceptance, historical paths) |
| `*.gs` / `*.gschema` | Golden source (content unchanged by path migration) |

**Categories:** `bindings`, `comparisons`, `control-flow`, `destructuring`, `types-width`, `optional-null`, `collections`, `graph-mutation`, `events`, `graph-edges`, `control-abort`, `expressions`, `source-syntax`, `functions`

## Pipelines & generated registry

| Path | Role |
| ---- | ---- |
| `pipelines/<pipeline-id>/pipeline.yaml` | Canonical ordered membership ([R3_PIPELINE_PLAN.md](../../Docs/corpus/migration/R3_PIPELINE_PLAN.md)) — **9** READY pipelines under this root |
| `_generated/registry.yaml` | **Generated** derivative (`corpus_manifest generate`); not authored by hand |
| `<category>/_negative/<slug>/` | Negative syntax home (**OQ-SY-2=A**). None landed. Root `_negative/` is not that home |

## Whole-corpus totals (with `programs/algorithms/`)

| | |
| --- | --- |
| Historical baseline specimens | **73** (**21** language-features + algorithms / modular) |
| Discovered `specimen.yaml` | **113** |
| `acceptance.landed: true` | **113** |
| Candidates not landed | **0** |
| Historical artifacts | **89** (R4 baseline; the four inline-if `.gs` files are outside it) |
| READY pipelines | **18** (9 here + 9 under `algorithms/`) |
| BLOCKED pipelines | **2** (`syntax-track-l5-modules`, `syntax-negative-per-level`) |

Historical acceptance paths in [SYNTAX_TRACK.md](../../Docs/corpus/SYNTAX_TRACK.md) and related docs are **not** upgraded by filesystem migration alone.
