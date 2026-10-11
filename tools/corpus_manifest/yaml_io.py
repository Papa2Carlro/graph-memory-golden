from __future__ import annotations

from pathlib import Path
from typing import Any, Tuple

import yaml

from .diagnostics import DiagnosticBag


def load_yaml(path: Path) -> Tuple[Any, DiagnosticBag]:
    bag = DiagnosticBag()
    try:
        text = path.read_text(encoding="utf-8")
    except OSError as exc:
        bag.add("E_IO", str(path), str(exc))
        return None, bag
    try:
        data = yaml.safe_load(text)
    except yaml.YAMLError as exc:
        bag.add("E_YAML_PARSE", str(path), str(exc))
        return None, bag
    if data is None:
        bag.add("E_YAML_EMPTY", str(path), "empty YAML document")
        return None, bag
    if not isinstance(data, dict):
        bag.add("E_YAML_TYPE", str(path), "root must be a mapping")
        return None, bag
    return data, bag


def _sort_recursive(obj: Any) -> Any:
    if isinstance(obj, dict):
        return {k: _sort_recursive(obj[k]) for k in sorted(obj.keys())}
    if isinstance(obj, list):
        return [_sort_recursive(item) for item in obj]
    return obj


def dump_yaml(data: Any) -> str:
    return dump_yaml_deterministic(data)


def dump_yaml_deterministic(data: Any) -> str:
    """Stable key order for byte-for-byte reproducible registry output."""
    ordered = _sort_recursive(data)
    return yaml.safe_dump(
        ordered,
        sort_keys=False,
        allow_unicode=True,
        default_flow_style=False,
    )
