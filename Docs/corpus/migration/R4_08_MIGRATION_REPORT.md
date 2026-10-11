# R4-08 — modular projects migration report

**Status:** **COMPLETE** (2026-10-11) — physical + manifests **uncommitted** (owner commit gate)  
**HEAD at slice start:** `bcc194544a55da70e4de28bf3314a81a130619df` (unchanged)  
**Slice:** R4-08 per [R3_EXECUTION_PLAN.md](R3_EXECUTION_PLAN.md) §R4-08, [R3_MIGRATION_MAP.md](R3_MIGRATION_MAP.md) §3.3

## Scope (6 projects, 15 artifacts)

| canonical_id | kind | source → target |
| ------------ | ---- | --------------- |
| `gs.project.modular.two-module-hello` | positive | `programs/05-modular/two_module_hello/` → `programs/algorithms/modular-systems/specimens/two-module-hello/` |
| `gs.project.modular.relative-local-use` | positive | `programs/05-modular/relative_local_use/` → `programs/algorithms/modular-systems/specimens/relative-local-use/` |
| `gs.project.modular.reexport-facade` | positive | `programs/05-modular/reexport_facade/` → `programs/algorithms/modular-systems/specimens/reexport-facade/` |
| `gs.project.modular.import-alias-collision` | positive | `programs/05-modular/import_alias_collision/` → `programs/algorithms/modular-systems/specimens/import-alias-collision/` |
| `gs.project.modular.visibility-gate` | positive | `programs/05-modular/visibility_gate/` → `programs/algorithms/modular-systems/specimens/visibility-gate/` |
| `gs.project.modular.negative.cycle-import-bad` | negative | `programs/05-modular/negative/cycle_import_bad/` → `programs/algorithms/modular-systems/_negative/cycle-import-bad/` |

### Artifact paths (15)

| # | baseline path | current path |
| - | ------------- | ------------ |
| 1 | `…/two_module_hello/main.gs` | `…/two-module-hello/main.gs` |
| 2 | `…/two_module_hello/greet.gs` | `…/two-module-hello/greet.gs` |
| 3 | `…/relative_local_use/main.gs` | `…/relative-local-use/main.gs` |
| 4 | `…/relative_local_use/lib/helper.gs` | `…/relative-local-use/lib/helper.gs` |
| 5 | `…/relative_local_use/lib/support.gs` | `…/relative-local-use/lib/support.gs` |
| 6 | `…/reexport_facade/api.gs` | `…/reexport-facade/api.gs` |
| 7 | `…/reexport_facade/client.gs` | `…/reexport-facade/client.gs` |
| 8 | `…/reexport_facade/implementation.gs` | `…/reexport-facade/implementation.gs` |
| 9 | `…/import_alias_collision/main.gs` | `…/import-alias-collision/main.gs` |
| 10 | `…/import_alias_collision/a.gs` | `…/import-alias-collision/a.gs` |
| 11 | `…/import_alias_collision/b.gs` | `…/import-alias-collision/b.gs` |
| 12 | `…/visibility_gate/client.gs` | `…/visibility-gate/client.gs` |
| 13 | `…/visibility_gate/internal.gs` | `…/visibility-gate/internal.gs` |
| 14 | `…/negative/cycle_import_bad/a.gs` | `…/_negative/cycle-import-bad/a.gs` |
| 15 | `…/negative/cycle_import_bad/b.gs` | `…/_negative/cycle-import-bad/b.gs` |

Move method: **whole project tree** via `git mv`; internal relative layout preserved (`lib/` unchanged).

## Module / import safety

Per [R3_MODULE_SAFETY.md](R3_MODULE_SAFETY.md) §5 — **SAFE** (move-only):

- `module` / `use` lines **unchanged** (absolute and `./` relative).
- No cross-project imports (§6).
- Negative cycle `example.cycle.a` ↔ `example.cycle.b` preserved; **expected** compile failure unchanged.

## Manifests (6× `specimen.yaml`)

- Schema v1; `home.root: algorithms`, `home.category: modular-systems`.
- Positive: `kind: positive`; negative: `kind: negative`, `expected: compile_error` (R3_PIPELINE §4.2; no invented L5-N2 fields).
- `prerequisites: []`; `acceptance.runtime_verified: false`; historical `classic_level: L5` + legacy `classic_level_path`.
- **No** syntax-track aliases; acceptance not upgraded.

## Verification

| Check | Result |
| ----- | ------ |
| `corpus_manifest validate` | **PASS** — **73** production manifests |
| `generate` / `check-generated` (`/tmp/r4-08-registry.yaml`) | **73** specimens; fingerprint `6b6e2db8…`; byte-identical double generate |
| SHA-256 vs [R4_BASELINE_ARTIFACTS.sha256](R4_BASELINE_ARTIFACTS.sha256) | **89/89**; **0** artifacts on legacy `05-modular/` paths |
| `pytest corpus_manifest/tests` | **20/20** |
| Production `registry.yaml` | **не** створено |
| Parser/runtime acceptance | **не** запускалось |

## OQ-SY-2

**OPEN** — affects future **syntax** negative golden layout only (GAPS §8.2); **does not** block this slice. R3 §3.3 target for `cycle-import-bad` under `modular-systems/_negative/` applied as mapped.

## R4-07 documentation

R4-07 WIP in `README.md` / `R3_EXECUTION_PLAN.md` was **not** modified in R4-08.

## Rollback

Reverse 6 directory `git mv` operations + remove 6 `specimen.yaml` under target trees + delete this report if reverting the slice.

## Readiness

Await owner: **R4-07.1** commit (prerequisite), then **R4-08.1** commit policy (standalone vs combined).
