from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Optional


@dataclass
class Diagnostic:
    """Stable, sortable validation diagnostic."""

    code: str
    path: str
    message: str
    sort_key: str = field(init=False, repr=False)

    def __post_init__(self) -> None:
        object.__setattr__(
            self,
            "sort_key",
            f"{self.code}\0{self.path}\0{self.message}",
        )


class DiagnosticBag:
    def __init__(self) -> None:
        self._items: List[Diagnostic] = []

    def add(self, code: str, path: str, message: str) -> None:
        self._items.append(Diagnostic(code=code, path=path, message=message))

    def sorted(self) -> List[Diagnostic]:
        return sorted(self._items, key=lambda d: d.sort_key)

    def ok(self) -> bool:
        return len(self._items) == 0

    def extend(self, other: DiagnosticBag) -> None:
        self._items.extend(other._items)
