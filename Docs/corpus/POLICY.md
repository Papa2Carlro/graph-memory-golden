# Example Corpus — Policy

**Status:** **CANONICAL** (Graph Memory Golden — corpus organization and specimen conventions; not GS language SoT)
**Decisions:** [DECISIONS.md](DECISIONS.md) (**SY-A1**, **SY-STR-A1/A2**, **VERIFY-A1…A5**, **L3-A4**, **L5-A10**, **L5-N1**, …).
**Registry / queues:** [CLASSIC_LEVELS.md](CLASSIC_LEVELS.md), [L5_PROJECT_SYSTEM.md](L5_PROJECT_SYSTEM.md), [SYNTAX_TRACK.md](SYNTAX_TRACK.md); compat index in [EXAMPLE_CORPUS_ORGANIZATION.md](../EXAMPLE_CORPUS_ORGANIZATION.md).
**Architecture:** [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md) (**GS-REORG-R2-A1=B**).
**R4 physical migration:** **COMPLETE** on `master` (commits `d7f8e80`…`24a9e2c`) — [migration/README.md](migration/README.md).

---

## 1. Physical corpus layout (canonical, post-R4)

**Status:** OWNER-DECIDED + **R4 executed**

Golden source and manifests live under **two roots** only. Legacy level directories (`programs/01-classical/` … `programs/05-modular/`) are **not** on disk; they remain **historical** identifiers in acceptance docs and manifests (§3).

```text
programs/
├── language-features/          # 21 specimens · 28 artifacts · 9 READY pipelines
│   ├── <category>/specimens/<slug>/   # specimen.yaml + golden .gs / .gschema
│   ├── pipelines/<pipeline-id>/pipeline.yaml
│   ├── _generated/             # generated registry.yaml (owner-gated; not committed yet)
│   └── _negative/              # reserved — syntax negatives (**OQ-SY-2** OPEN)
└── algorithms/                   # 52 specimens · 61 artifacts · 9 READY pipelines
    ├── <category>/specimens/<slug>/
    ├── modular-systems/
    │   ├── specimens/<slug>/   # L5 positive projects (6 specimens)
    │   └── _negative/          # L5 negative (e.g. cycle import)
    └── pipelines/<pipeline-id>/pipeline.yaml
```

**Corpus inventory (confirmed):**

| Item | Count |
| ---- | ----- |
| Specimens | **73** (= 21 language-features + 46 classic algorithms + 6 modular projects) |
| Golden artifacts | **89** (content SHA vs [migration/R4_BASELINE_ARTIFACTS.sha256](migration/R4_BASELINE_ARTIFACTS.sha256)) |
| `specimen.yaml` | **73** |
| `pipeline.yaml` (READY) | **18** |
| BLOCKED pipelines (documented only) | **2** — [migration/R3_PIPELINE_PLAN.md](migration/R3_PIPELINE_PLAN.md) §7 |

**Classic level (L1–L5)** still describes **complexity / queue taxonomy** in registries — not an on-disk path prefix after R4. Algorithm categories (`numbers`, `collections`, `strings`, `composition`, `advanced`, `complex`, `modular-systems`) and language-feature categories follow [GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md](GOLDEN_SYNTAX_CORPUS_ARCHITECTURE.md) §4.

---

## 2. Canonical metadata

| Artifact | Role |
| -------- | ---- |
| **`specimen.yaml`** | Source of truth per specimen: stable **`canonical_id`**, `home`, `artifacts`, `acceptance`, `historical`, optional `aliases` |
| **`pipeline.yaml`** | Source of truth per pipeline: ordered **member** specimen IDs; **18** READY pipelines authored |
| **`registry.yaml`** | **Generated** aggregate (`corpus_manifest generate`); target path `language-features/_generated/registry.yaml` — **not** production-committed until owner enables CI/policy |

**Rules (GS-REORG-R2-A3/A4/A5):** one specimen → one physical home; no duplicate golden files; canonical IDs do not change when paths move.

---

## 3. Historical paths and R4 mapping (**A1=B**)

**Owner decision:** active documentation describes **canonical** layout (§1); **legacy** `programs/0N-*` paths are preserved as **evidence**, not as live directories.

| Mechanism | Purpose |
| --------- | ------- |
| **[migration/R3_MIGRATION_MAP.md](migration/R3_MIGRATION_MAP.md)** | Authoritative **legacy → canonical** table (specimen IDs, source paths, target homes) |
| **`specimen.yaml` → `historical.classic_level_path`** | Per-specimen provenance (file or directory at land time) |
| **Acceptance docs** ([SYNTAX_TRACK.md](SYNTAX_TRACK.md), [L3_ADVANCED_SYNTAX.md](L3_ADVANCED_SYNTAX.md), [CLASSIC_LEVELS.md](CLASSIC_LEVELS.md)) | Row-level **LANDED** / **SOURCE-LEVEL ACCEPTED** records; paths cited there are often **historical** physical placement |

**Mapping rules:**

- Each golden artifact exists **once** on disk under its canonical home; SHA-256 content matches the R4 baseline manifest (legacy path keys → current files).
- **Syntax Track:** **15/18 LANDED**; **SY-L5.1–L5.3 NOT LANDED** — unchanged by migration.
- **L3 Advanced Syntax:** **4/4 SOURCE-LEVEL ACCEPTED** — unchanged; runtime verification **not** claimed.
- Migration success does **not** upgrade acceptance or imply parser/runtime verification.

**Illustrative mapping (full table in migration map):**

| Historical prefix | Canonical root |
| ----------------- | -------------- |
| `01-classical/syntax/`, `02-composition/syntax/`, `03-advanced/syntax/` (language specimens) | `programs/language-features/<category>/specimens/<slug>/` |
| `01-classical/{numbers,collections,strings}/`, `02-composition/*.gs`, `03-advanced/*.gs`, `04-complex/*.gs` | `programs/algorithms/<category>/specimens/<slug>/` |
| `05-modular/<project>/`, `05-modular/negative/` | `programs/algorithms/modular-systems/specimens/` or `_negative/` |

Do **not** restore legacy directories to satisfy old links; update navigation to canonical paths or cite §3 + migration map.

---

## 4. Syntax Track layout and module isolation

**SY-A1=B** ([DECISIONS.md](DECISIONS.md)): Golden Syntax Track specimens are **logically** tied to classic **level** directories in registries; **physically** (post-R4) they live under `programs/language-features/…`, not under `programs/<level>/syntax/` on disk.

**Queue IDs vs physical level:** Registry rows **SY-L3.*** (and **S0/S1/S2** metadata) name **syntax-depth queue** slots — **not** a requirement that files remain under `programs/03-advanced/`. Physical placement follows **R3 migration map** + **SY-STR-A1** / **SY-STR-A2** within the canonical feature category.

### 4.1 Explicit modules (**SY-STR-A1=A**)

When a specimen declares a logical `module` identity (often with co-located `.gschema`):

- **Canonical:** artifacts under `programs/language-features/<category>/specimens/<slug>/` (directory slug may differ from last `module` segment per migration).
- **Historical:** module directories often lived under `programs/<level>/syntax/<module-slug>/` (e.g. `graph_set/`, `on_emit/`).

Examples (landed; historical paths in [SYNTAX_TRACK.md](SYNTAX_TRACK.md) §19.6):

- `example.syntax.pair` — historical `02-composition/syntax/pair/` → canonical `language-features/destructuring/specimens/destructuring-flat/`
- `example.syntax.graph_set` — historical `02-composition/syntax/graph_set/` → canonical `language-features/graph-mutation/specimens/graph-set-action/`

**Collision rule:** within a canonical category, specimen slugs and `canonical_id` values must remain unique.

### 4.2 Module-less specimens (**SY-STR-A2=A**)

Single-file syntax specimens may be one `.gs` under a specimen directory (e.g. `let-vs-var/let-vs-var.gs`). Historical flat files under `01-classical/syntax/` map per [R3_MIGRATION_MAP.md](migration/R3_MIGRATION_MAP.md) §3.1.

### 4.3 Specimen naming (on disk)

- Syntax Track **registry IDs** (**SY-L1.1**, …) are queue labels; **filenames** follow landed registry rows (e.g. `destructuring_flat.gs`, `graph_set_action.gs`).
- L5 golden **project** slugs are **not** module identity (**L5-A1=B**); logical `module` / `use` in source remain authoritative.

---

## 5. Target registry ≠ test suite

The L2/L3/L4 **target registry** names intended reference programs and order of work. It does **not** define automated tests, pass/fail criteria, or CI obligations. Example remains a **reference corpus**, not a test harness.

---

## 6. Entry, sample, and verify conventions

**Status:** CANONICAL (Example repository — corpus style; not GS language entry-point law)

**Owner decisions (2026-10-09):** [DECISIONS.md](DECISIONS.md) — **VERIFY-A1…A5** (legacy labels monolith §11 **A1–A5**). **VERIFY-A2** remains **OPEN** (no established discard-syntax contract in this repository).

Normative GS rules for ignored call results and standalone invocations: `graph-memory-language` — `GS_V0_1_LANGUAGE_CORE.md` §13a.

### 6.1 `*_sample` (demonstration)

- **Role:** demonstration entry; wires representative calls and may return an algorithm result (e.g. sorted array, parsed `Int`, path length).
- **Does not** mean automatic PASS or runtime verification success.
- May use **call-as-statement** for side effects or discarded `Int` results where the call’s value is not part of the demonstration return (**VERIFY-A1=A**).

**VERIFY-A2 (OPEN):** This policy does **not** define explicit discard syntax; do not treat OPEN status as a language contract.

### 6.2 `*_verify` (verification)

- **Signature:** `fn <program>_verify() -> Bool` (or equivalent per-file naming aligned with the specimen) — **VERIFY-A5=B** for classic algorithm specimens.
- **`true`:** every included check succeeded.
- **`false`:** at least one included check failed.
- **Eager evaluation:** each independent check is evaluated into its own `Bool` local **before** aggregation (**VERIFY-A3=A**).
- **Aggregation:** combine locals with canonical **`and`** (short-circuit on aggregation only; checks are already computed).
- **Does not** replace an external test runner (**VERIFY-A4=C**).

### 6.3 Graph mutation specimens (Syntax Track exception)

**L3-A4=C** ([DECISIONS.md](DECISIONS.md)): For Syntax Track specimens whose normative demonstration requires persisted graph **`create`** / **`set`** inside the mutation boundary (`GS_V0_1_RUNTIME_MODEL.md` §3–§4), **`fn` must not** host graph mutation. **`graph_set_action_sample` / `graph_set_action_verify`** (and future S1/S2 graph-syntax rows) use separate **`action … -> Bool`** entry points instead of **`fn …_verify() -> Bool`**. Eager **`Bool`** locals + **`and`** aggregation rules in §6.2 still apply inside each **`action`** body. Classic algorithm specimens retain **VERIFY-A5=B** (`fn` sample/verify).

### 6.4 Anti-patterns

- Do **not** treat a trailing `ignored = okLast` assignment chain as aggregate success.
- Do **not** treat a demonstration `return` value as proof that all wired checks passed unless the function is explicitly `*_verify() -> Bool` and the caller interprets it.

### 6.5 Source-level acceptance vs runtime verification

Registry rows may state **SOURCE-LEVEL ACCEPTED** and **RUNTIME NOT VERIFIED** independently. Sample/verify wiring is **source-level** specimen policy unless a future owner slice records tool execution.

---

## 7. OPEN (not closed by R4)

| Topic | Status |
| ----- | ------ |
| **OQ-SY-2** | Syntax negative layout — blocks `syntax-negative-per-level` pipeline |
| **SY-L5.1–L5.3** | **NOT LANDED** — blocks `syntax-track-l5-modules` pipeline |
| **nested-if-optional** prerequisite | Owner narrative vs manifest `prerequisites` — see [GAPS.md](GAPS.md) |
| **Production `registry.yaml` / CI** | Generated registry policy — owner-gated |
