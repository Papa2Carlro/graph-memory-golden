# Example Corpus — Charter

**Status:** **CANONICAL** (Example repository — purpose, scope, qualitative levels; not GS language SoT)
**Compat registry:** [EXAMPLE_CORPUS_ORGANIZATION.md](../EXAMPLE_CORPUS_ORGANIZATION.md) (status tables, queues, specimen specs).
**Owner decisions:** [DECISIONS.md](DECISIONS.md). **Filesystem layout (current):** [POLICY.md](POLICY.md). **Target corpus architecture (R2):** [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md). **Parser snapshot:** [PARSER_AUDIT.md](PARSER_AUDIT.md). **OPEN gaps:** [GAPS.md](GAPS.md).

**Scope:** `graph-memory-golden` — reference corpus layout, level taxonomy, and evolution principles.
**Non-scope:** Language/compiler/runtime implementation; automated test suites; owner decisions recorded in `graph-memory-language`.

---

## 1. Purpose and role of the Example corpus

The **Graph Memory Golden** repository (`graph-memory-golden`) is an **evolving reference corpus** of real, small Graph Script (`.gs`) programs used as ecosystem specimens.

- It is **not** a test suite.
- It is **not** a collection of synthetic fixtures whose primary job is to pass CI.
- Programs are **reference targets**: they express intended language usage, algorithmic shapes, and corpus evolution over time.
- Implementation or parser/runtime gaps **do not cancel** a target whose semantics are honestly defined on the canonical language surface; they are tracked separately ([GAPS.md](GAPS.md); parser evidence in [PARSER_AUDIT.md](PARSER_AUDIT.md); broader implementation-gap audit in [CANONICAL_TARGET_AUDIT_FINDINGS.md](../CANONICAL_TARGET_AUDIT_FINDINGS.md) — **DOC-Q5=B**, distinct from [PARSER_AUDIT.md](PARSER_AUDIT.md)).

### 1.1 What this document owns vs other canonical docs

| Topic | Canonical owner |
| ----- | ----------------- |
| Purpose, scope, qualitative **L1–L5** boundaries | **This charter** |
| Physical paths (current), module isolation, sample/verify conventions | [POLICY.md](POLICY.md) |
| Target **language-features** / **algorithms** layout, manifests, pipelines (**GS-REORG-R2**) | [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md) |
| Owner decision IDs and selected options | [DECISIONS.md](DECISIONS.md) |
| Classical L1–L4 inventories, queues, saturation tables | [CLASSIC_LEVELS.md](CLASSIC_LEVELS.md) |
| L5 golden project charter, queue, per-project specs | [L5_PROJECT_SYSTEM.md](L5_PROJECT_SYSTEM.md) |
| Syntax Track **SY-L*** queue and landed specimen specs | [SYNTAX_TRACK.md](SYNTAX_TRACK.md) |
| L3 Advanced Syntax subtrack (**L3-ADV-SY-***, physical `03-advanced/syntax/`) | [L3_ADVANCED_SYNTAX.md](L3_ADVANCED_SYNTAX.md) |
| OPEN / DEFERRED / BLOCKED issue registry | [GAPS.md](GAPS.md) |

**Syntax Track** identifiers (**SY-L1.1**, **SY-L2.1**, …) name golden syntax specimens; they are **not** the same labels as classic qualitative **Level L1–L5** in §2. On-disk directories (`programs/01-classical/`, …) follow [POLICY.md](POLICY.md); landing and verification labels on registry rows are documented per specimen and must not be conflated (§3).

---

## 2. Level taxonomy (Classic programs)

**LOC ranges are orientation only**, not hard gates. Qualitative structure dominates classification.

| Level | Approx. LOC (orientation) | Qualitative boundary |
| ----- | ------------------------- | -------------------- |
| **L1** | ~10–40 | Single-file; **one dominant algorithmic genre**; 1–2 core functions; one main pass or compact construct; 0–1 helper without deep composition; **local** invariant; may include one sentinel-like edge case. |
| **L2** | ~100–150 | First **composition jump**: 3+ meaningful **dependent** helpers; 2–3 **related phases**; **shared state / invariant**; composition of several L1 primitives; deeper control flow; **without** full divide-and-conquer / DP machinery (that is L3). |
| **L3** | ~200–300+ (or equivalent complexity) | D&C recursion; partition/rebuild machinery; DP tables; deeper multi-level state interaction. A **short** program with full L3 machinery remains **L3**. A **long** program without L2/L3 composition does **not** become L2 automatically. |
| **L4** | ~150–280+ (orientation) | **Complex single-file**: one `.gs` per reference program; **≥2 cooperating algorithmic components**; **shared state or intermediate artifacts** between phases; **explicit cross-phase invariants**; **one coherent end-to-end problem**; qualitative complexity increase over L3 (not merely more LOC). |
| **L5** | (varies by project) | **Multi-file project system** — logical modules, `use` / `pub use`, visibility, namespaces, manifest, staged packages and dependency expectations; one golden **project** per directory under `programs/05-modular/<project>/` ([monolith §15](../EXAMPLE_CORPUS_ORGANIZATION.md#15-l5-project-system-charter)). **Not SATURATED.** |

---

## 3. Reference targets vs implementation gaps

A program remains a **valid reference target** when its intended semantics are defined on the **canonical Graph Script surface**, even if the current parser, semantic layer, or runtime cannot compile or execute it yet.

- Track implementation gaps in [GAPS.md](GAPS.md) and supporting audits ([CANONICAL_TARGET_AUDIT_FINDINGS.md](../CANONICAL_TARGET_AUDIT_FINDINGS.md); **DOC-Q5=B**), not by removing or demoting targets from the corpus registry.
- **Language** “L1/L2” wording in `graph-memory-language` docs (e.g. semantic research tiers) is **unrelated** to Example corpus **Level L1/L2** in §2.

### 3.1 Documented target vs verification evidence

The Example Corpus is a **reference and verification target**, not proof that every specimen currently parses or runs.

Preserve distinct meanings (registry and audit prose; do not infer success across labels):

| Label | Meaning |
| ----- | ------- |
| **Documented target** | Registry or charter describes intended semantics on the canonical surface. |
| **SOURCE-LEVEL ACCEPTED** | Specimen accepted as documentation/example at source level — **not** parser/runtime proof. |
| **PARSER VERIFIED** | Requires parse/tooling evidence (see [PARSER_AUDIT.md](PARSER_AUDIT.md) snapshot; corpus-wide claims unchanged unless a future slice records new execution). |
| **RUNTIME VERIFIED** | Requires end-to-end compile/run evidence; most registry rows remain **RUNTIME NOT VERIFIED** unless explicitly stated otherwise on the row. |

**NOT LANDED** means no on-disk specimen yet; it is **not** automatically an architectural blocker ([GAPS.md](GAPS.md) §1).
