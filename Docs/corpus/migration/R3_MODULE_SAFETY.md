# R3 — module / import safety

**Status:** **PLANNING**
**Slice:** **GS-EXAMPLE-CORPUS-REORG-R3-MIGRATION-PLAN**
**Default strategy:** **move-only** — `module` / `use` рядки **не** змінюються (**L5-A1=B**, user constraint).

---

## 1. Правила безпеки (зведення)

| Правило | Джерело | R4 наслідок |
| ------- | ------- | ----------- |
| Logical module ≠ path | **L5-A1=B** | Target path може не збігатися з останнім segment `module` |
| Directory slug = last module segment (legacy syntax) | **SY-STR-A1=A** | Після move slug **директорії** може відрізнятися (`graph-set-action/` vs `module example.syntax.graph_set`) — **дозволено** якщо `module` не змінюється |
| Module-less flat syntax | **SY-STR-A2=A** | Без `module` — лише file move |
| Unified `.gs` + `.gschema` | **L3-A1=B** | Переносити пару в одній target dir |
| Relative `use ./` | L5 charter | Зберегти tree shape всередині project |

**BLOCKED** означає: move за default стратегією **заборонений** без додаткового owner/language slice (не виявлено для поточного inventory).

---

## 2. language-features — explicit `module example.syntax.*`

| canonical_id | current module | target dir (slug) | imports | collision SY-STR-A1 | status |
| ------------ | -------------- | ----------------- | ------- | ------------------- | ------ |
| gs.specimen.destructuring-flat | `example.syntax.pair` | `destructuring-flat/` | none | slug ≠ `pair` | **SAFE** (move-only; module unchanged) |
| gs.specimen.graph-set-param | `example.syntax.graph_set_param` | `graph-set-param/` | none | kebab vs snake | **SAFE** |
| gs.specimen.graph-set-block | `example.syntax.graph_set_block` | `graph-set-block/` | none | **SAFE** |
| gs.specimen.graph-set-action | `example.syntax.graph_set` | `graph-set-action/` | none | dir ≠ `graph_set` | **SAFE** (documented in map) |
| gs.specimen.on-emit | `example.syntax.on_emit` | `on-emit/` | none | **SAFE** |
| gs.specimen.graph-connect | `example.syntax.graph_connect` | `graph-connect/` | none | **SAFE** |
| gs.specimen.fail-guard | `example.syntax.fail_guard` | `fail-guard/` | none | **SAFE** |
| gs.specimen.exists-if-present | `example.syntax.exists_if_present` | `exists-if-present/` | none | **SAFE** |
| gs.specimen.exists-if-guard | `example.syntax.exists_if_guard` | `exists-if-guard/` | none | **SAFE** |
| gs.specimen.null-narrowing | `example.syntax.null_narrowing` | `null-narrowing/` | none | **SAFE** |
| gs.specimen.let-block-pub | `example.syntax.let_block_pub` | `let-block-pub/` | none | **SAFE** |
| gs.specimen.var-block-mut | `example.syntax.var_block_mut` | `var-block-mut/` | none | **SAFE** |
| gs.specimen.nested-if-branch | `example.syntax.nested_if_branch` | `nested-if-branch/` | none | **SAFE** |
| gs.specimen.nested-if-optional | `example.syntax.nested_if_optional` | `nested-if-optional/` | none | **SAFE** |

**Potential breakage (tooling, not source):** future resolver, що виводить module з path (**заборонено** language SoT, але можливо в immature tooling) — мітігація: `specimen.yaml` → `module:` explicit field (**R2 contract**).

---

## 3. language-features — module-less (flat)

| canonical_id | module | target | status |
| ------------ | ------ | ------ | ------ |
| gs.specimen.let-vs-var | *(none)* | `let-vs-var/let_vs_var.gs` | **SAFE** |
| gs.specimen.equality-operators | *(none)* | `equality-operators/` | **SAFE** |
| gs.specimen.if-elif-else | *(none)* | `if-elif-else/` | **SAFE** |
| gs.specimen.match-literals | *(none)* | `match-literals/` | **SAFE** |
| gs.specimen.each-range | *(none)* | `each-range/` | **SAFE** |
| gs.specimen.int32-bounds | *(none)* | `int32-bounds/` | **SAFE** |
| gs.specimen.optional-get | *(none)* | `optional-get/` | **SAFE** |

---

## 4. algorithms — single-file (no module)

Усі **46** classic algorithm programs (§3.2 map) — без `module` / `use`. **SAFE** move-only. *(Раніше **45** — підрахунок §1; виправлено **R4-03** inventory reconciliation.)*

---

## 5. L5 modular projects

### 5.1 `gs.project.modular.two-module-hello`

| file | module | use |
| ---- | ------ | --- |
| main.gs | `example.hello.main` | `example.hello.greet::greet` |
| greet.gs | `example.hello.greet` | — |

**Strategy:** перенести каталог `two_module_hello/` → `two-module-hello/` цілком. **SAFE**.

### 5.2 `gs.project.modular.relative-local-use`

| file | module | use |
| ---- | ------ | --- |
| main.gs | `example.relative.main` | `./lib/helper::tag_line` |
| lib/helper.gs | `example.relative.lib` | `./support::part_b` |
| lib/support.gs | `example.relative.support` | — |

**Strategy:** зберегти `lib/` subtree. **SAFE**.

### 5.3 `gs.project.modular.reexport-facade`

Cross-module absolute `use example.reexport.*`. **SAFE** (project-internal).

### 5.4 `gs.project.modular.import-alias-collision`

Alias `use … as …`. **SAFE**.

### 5.5 `gs.project.modular.visibility-gate`

`public` / `private` symbols across modules. **SAFE**.

### 5.6 `gs.project.modular.negative.cycle-import-bad` (negative)

| file | module | use |
| ---- | ------ | --- |
| a.gs | `example.cycle.a` | `example.cycle.b::token_b` |
| b.gs | `example.cycle.b` | `example.cycle.a::token_a` |

**Strategy:** move to `algorithms/modular-systems/_negative/cycle-import-bad/`. **SAFE**; expected compile failure unchanged.

---

## 6. Cross-specimen imports

**Результат скану:** жоден `.gs` у `programs/` **не** імпортує інший specimen поза власним L5 project tree.

**Висновок:** міграція не вимагає reordering між specimens для `use`.

---

## 7. BLOCKED summary

| canonical_id | status |
| ------------ | ------ |
| *(немає)* | Усі **73** specimens (map §3.1–§3.3) — **SAFE** за move-only default |

**Альтернатива (не рекомендована без owner):** перейменувати `module` під новий path — **BLOCKED** семантично (зміна logical identity).

---

## 8. Verification checklist (R4)

1. `rg '^module '` — порівняти before/after per specimen (byte-identical sources).
2. `rg '^use '` — те саме для L5.
3. Relative paths у `relative_local_use` — tree isomorphism.
4. GSchema `module` lines match paired `.gs`.
