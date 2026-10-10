# Example Corpus — Policy

**Status:** **CANONICAL** (Example repository — corpus organization and specimen conventions; not GS language SoT)
**Decisions:** [DECISIONS.md](DECISIONS.md) (**SY-A1**, **SY-STR-A1/A2**, **VERIFY-A1…A5**, **L3-A4**, **L5-A10**, **L5-N1**, …).
**Registry / queues:** [CLASSIC_LEVELS.md](CLASSIC_LEVELS.md), [L5_PROJECT_SYSTEM.md](L5_PROJECT_SYSTEM.md), [SYNTAX_TRACK.md](SYNTAX_TRACK.md); compat stubs in [EXAMPLE_CORPUS_ORGANIZATION.md](../EXAMPLE_CORPUS_ORGANIZATION.md).

---

## 1. Physical corpus layout

**Status:** OWNER-DECIDED (Example repository)

| Corpus level | On-disk path |
| ------------ | ------------ |
| **L1** | `programs/01-classical/` |
| **L2** | `programs/02-composition/` |
| **L3** | `programs/03-advanced/` |
| **L4** | `programs/04-complex/*.gs` |
| **L5** | `programs/05-modular/<project>/` (**DECIDED** — monolith §15; **L5-A10=A**) |

Canonical tree (current and intended):

```text
programs/
├── 01-classical/
│   ├── numbers/
│   ├── collections/
│   ├── strings/
│   └── syntax/            # Syntax Track (§19) — **DECIDED** **SY-A1=B**
├── 02-composition/
│   └── syntax/            # §19 — **SY-STR-A1=A** / **SY-STR-A2=A**
├── 03-advanced/
│   └── syntax/            # §19 (per-level; queue IDs ≠ classic L3 path)
├── 04-complex/            # flat; one landed L4 program = one .gs file
│   └── syntax/            # §19
└── 05-modular/            # L5 golden projects (§15–§16)
    └── syntax/            # §19 (per-level, not under <project>/)
    ├── <project>/         # positive (valid) specimens — L5-A10=A
    ├── negative/
    │   └── <project>/     # compile-time error specimens — L5-N1=B
    └── warnings/
        └── <project>/     # warning-only specimens — L5-N1=B
```

Positive project directory (when manifest in scope):

```text
programs/05-modular/<project>/
├── Graph.toml             # when manifest coverage is in scope
├── Graph.lock             # when dependency resolution coverage is in scope
└── …                      # .gs / .gq / .gschema / .gi per project spec
```

- **`programs/01-classical/`** is the **L1** corpus. Existing domain folders (**numbers/**, **collections/**, **strings/**) stay as they are; policy slices do **not** move or rename L1 files without an owner decision.
- **`programs/02-composition/`** is the **L2** corpus root. L2 programs are **physically separated** from L1.
- **`programs/03-advanced/`** is the **L3** corpus root for single-file L3 reference programs. Initial layout is **flat** (no domain subdirectories under `03-advanced/` at this stage).
- **L2 domain subdirectories** under `02-composition/` (if ever needed) are **OPEN** (**L2-DOMAIN-DIRS** in [DECISIONS.md](DECISIONS.md)) — not defined here; do not invent them until an owner decision lands them.
- **L3 domain subdirectories** under `03-advanced/` are **OPEN** (**L3-DOMAIN-DIRS**) — not introduced here; do not invent them until a future owner decision lands them.
- **`programs/04-complex/`** is the **L4** corpus root (**DECIDED**). Layout is **flat**: each landed L4 reference program is a single `.gs` file at `programs/04-complex/<filename>.gs` (see monolith §8.4).

Landed L2 `.gs` files from the approved queue belong under `programs/02-composition/` (filename as registered; no extra path segments until domain dirs are decided). Landed L3 `.gs` files belong under `programs/03-advanced/` (flat; filename as registered in monolith §8). Landed L4 programs belong under `programs/04-complex/` (flat; filename as registered in §8.4).

---

## 2. Syntax Track layout and module isolation

**SY-A1=B** ([DECISIONS.md](DECISIONS.md)): Golden Syntax Track specimens live under `programs/<level>/syntax/` for the appropriate classic/modular **level directory** — **not** mixed into domain folders (`numbers/`, …) or L5 `<project>/` trees.

**Queue IDs vs physical level:** Registry rows **SY-L3.*** (and **S0/S1/S2** metadata) name **syntax-depth queue** slots — **not** a requirement that the specimen file live under `programs/03-advanced/`. Physical placement follows **SY-A1** + **SY-STR-A1** / **SY-STR-A2**. Classic **level** (L1–L5 path prefix) reflects program complexity and corpus track, not the **SY-L*** queue label alone.

### 2.1 Explicit modules (**SY-STR-A1=A**)

When a specimen declares a logical `module` identity (often with co-located `.gschema`):

- Artifacts for that module live under `programs/<level>/syntax/<module-slug>/`.
- **`<module-slug>`** = **last segment** of the `module` identity (e.g. `module example.syntax.graph_set` → `syntax/graph_set/`).

Examples (landed):

- `programs/02-composition/syntax/pair/` — `module example.syntax.pair`
- `programs/02-composition/syntax/graph_set/` — `module example.syntax.graph_set`
- `programs/02-composition/syntax/graph_set_block/` — `module example.syntax.graph_set_block`

**Collision rule:** `<module-slug>` directory names must **not collide** within the same parent `syntax/` directory (one directory per distinct module slug).

### 2.2 Module-less specimens (**SY-STR-A2=A**)

Specimens **without** an explicit multi-file `module` boundary may remain a **single flat** file directly under `syntax/` (e.g. `optional_get.gs`, `int32_bounds.gs` under `02-composition/syntax/`).

### 2.3 Specimen naming (on disk)

- Syntax Track **registry IDs** (**SY-L1.1**, …) are queue labels; **filenames** on disk follow landed registry rows in monolith §19.6 (e.g. `destructuring_flat.gs`, `graph_set_action.gs`).
- L5 golden **project** slugs (`<project>/`) are **not** module identity (**L5-A1=B**); logical `module` lines in source remain authoritative for `use` paths.

---

## 3. Target registry ≠ test suite

The L2/L3/L4 **target registry** names intended reference programs and order of work. It does **not** define automated tests, pass/fail criteria, or CI obligations. Example remains a **reference corpus**, not a test harness.

---

## 4. Entry, sample, and verify conventions

**Status:** CANONICAL (Example repository — corpus style; not GS language entry-point law)

**Owner decisions (2026-10-09):** [DECISIONS.md](DECISIONS.md) — **VERIFY-A1…A5** (legacy labels monolith §11 **A1–A5**). **VERIFY-A2** remains **OPEN** (no established discard-syntax contract in this repository).

Normative GS rules for ignored call results and standalone invocations: `graph-memory-language` — `GS_V0_1_LANGUAGE_CORE.md` §13a.

### 4.1 `*_sample` (demonstration)

- **Role:** demonstration entry; wires representative calls and may return an algorithm result (e.g. sorted array, parsed `Int`, path length).
- **Does not** mean automatic PASS or runtime verification success.
- May use **call-as-statement** for side effects or discarded `Int` results where the call’s value is not part of the demonstration return (**VERIFY-A1=A**).

**VERIFY-A2 (OPEN):** This policy does **not** define explicit discard syntax; do not treat OPEN status as a language contract.

### 4.2 `*_verify` (verification)

- **Signature:** `fn <program>_verify() -> Bool` (or equivalent per-file naming aligned with the specimen) — **VERIFY-A5=B** for classic algorithm specimens.
- **`true`:** every included check succeeded.
- **`false`:** at least one included check failed.
- **Eager evaluation:** each independent check is evaluated into its own `Bool` local **before** aggregation (**VERIFY-A3=A**).
- **Aggregation:** combine locals with canonical **`and`** (short-circuit on aggregation only; checks are already computed).
- **Does not** replace an external test runner (**VERIFY-A4=C**).

### 4.3 Graph mutation specimens (Syntax Track exception)

**L3-A4=C** ([DECISIONS.md](DECISIONS.md)): For Syntax Track specimens whose normative demonstration requires persisted graph **`create`** / **`set`** inside the mutation boundary (`GS_V0_1_RUNTIME_MODEL.md` §3–§4), **`fn` must not** host graph mutation. **`graph_set_action_sample` / `graph_set_action_verify`** (and future S1/S2 graph-syntax rows) use separate **`action … -> Bool`** entry points instead of **`fn …_verify() -> Bool`**. Eager **`Bool`** locals + **`and`** aggregation rules in §4.2 still apply inside each **`action`** body. Classic algorithm specimens retain **VERIFY-A5=B** (`fn` sample/verify).

### 4.4 Anti-patterns

- Do **not** treat a trailing `ignored = okLast` assignment chain as aggregate success.
- Do **not** treat a demonstration `return` value as proof that all wired checks passed unless the function is explicitly `*_verify() -> Bool` and the caller interprets it.

### 4.5 Source-level acceptance vs runtime verification

Registry rows may state **SOURCE-LEVEL ACCEPTED** and **RUNTIME NOT VERIFIED** independently. Sample/verify wiring is **source-level** specimen policy unless a future owner slice records tool execution.
