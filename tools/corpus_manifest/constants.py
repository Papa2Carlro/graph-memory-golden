"""Schema version constants and corpus paths."""

SPECIMEN_SCHEMA_VERSION = 1
PIPELINE_SCHEMA_VERSION = 1
REGISTRY_SCHEMA_VERSION = 1

GENERATOR_NAME = "corpus_manifest"

# Relative to corpus root (repo root for graph-memory-golden).
PROGRAMS_DIRNAME = "programs"
PRODUCTION_REGISTRY_REL = (
    "programs/language-features/_generated/registry.yaml"
)

KIND_VALUES = frozenset({"positive", "negative", "warning"})
HOME_ROOT_VALUES = frozenset({"language-features", "algorithms"})
COMPLEXITY_SYNTAX_DEPTH = frozenset({"S0", "S1", "S2"})
COMPLEXITY_CONTROL_FLOW = frozenset(
    {"none", "branch", "nested", "graph-action"}
)
COMPLEXITY_FILES = frozenset({"single", "multi"})
