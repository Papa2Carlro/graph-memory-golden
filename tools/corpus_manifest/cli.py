from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from .constants import PRODUCTION_REGISTRY_REL
from .diagnostics import DiagnosticBag
from .registry import (
    build_registry_document,
    is_registry_stale,
    registry_fingerprint,
    write_registry,
)
from .validate import validate_corpus


def _print_diagnostics(bag: DiagnosticBag, as_json: bool) -> None:
    items = [
        {"code": d.code, "path": d.path, "message": d.message}
        for d in bag.sorted()
    ]
    if as_json:
        print(json.dumps({"ok": bag.ok(), "diagnostics": items}, indent=2))
    else:
        for d in items:
            print(f"{d.code}\t{d.path}\t{d.message}")


def cmd_validate(args: argparse.Namespace) -> int:
    bag = validate_corpus(
        Path(args.corpus_root),
        check_artifact_files=not args.skip_artifact_files,
    )
    _print_diagnostics(bag, args.json)
    return 0 if bag.ok() else 1


def cmd_generate(args: argparse.Namespace) -> int:
    corpus = Path(args.corpus_root)
    out = Path(args.output)

    if args.output is None:
        print("error: --output is required", file=sys.stderr)
        return 2

    prod = (corpus / PRODUCTION_REGISTRY_REL).resolve()
    if out.resolve() == prod and not args.allow_production_output:
        print(
            "error: refusing to write production registry "
            f"({PRODUCTION_REGISTRY_REL}); use --allow-production-output after R4-03",
            file=sys.stderr,
        )
        return 2

    bag = validate_corpus(
        corpus,
        check_artifact_files=not args.skip_artifact_files,
    )
    if not bag.ok():
        _print_diagnostics(bag, args.json)
        return 1

    reg = build_registry_document(corpus)
    if args.json:
        print(json.dumps(reg, indent=2, sort_keys=True))
    else:
        write_registry(out, reg)
        print(f"wrote {out}")
        print(f"fingerprint {registry_fingerprint(reg)}")
    return 0


def cmd_check_generated(args: argparse.Namespace) -> int:
    corpus = Path(args.corpus_root)
    reg_path = Path(args.registry)
    stale, reason = is_registry_stale(corpus, reg_path)
    if args.json:
        print(json.dumps({"stale": stale, "reason": reason}))
    else:
        if stale:
            print(f"STALE: {reason}")
        else:
            print("OK: registry matches manifests")
    return 1 if stale else 0


def build_parser() -> argparse.ArgumentParser:
    common = argparse.ArgumentParser(add_help=False)
    common.add_argument(
        "--corpus-root",
        default=".",
        help="Repository root containing programs/ (default: .)",
    )
    common.add_argument("--json", action="store_true", help="Machine-readable output")
    common.add_argument(
        "--skip-artifact-files",
        action="store_true",
        help="Do not require artifact files on disk",
    )

    p = argparse.ArgumentParser(
        prog="corpus_manifest",
        description="Golden Syntax Corpus manifest validate / generate / check-generated",
    )

    sub = p.add_subparsers(dest="command", required=True)

    sub.add_parser(
        "validate",
        parents=[common],
        help="Validate specimen and pipeline manifests",
    )

    gen = sub.add_parser(
        "generate",
        parents=[common],
        help="Generate registry.yaml from manifests",
    )
    gen.add_argument("--output", required=True, help="Output registry path")
    gen.add_argument(
        "--allow-production-output",
        action="store_true",
        help="Allow writing programs/language-features/_generated/registry.yaml",
    )

    chk = sub.add_parser(
        "check-generated",
        parents=[common],
        help="Detect stale registry vs current manifests",
    )
    chk.add_argument(
        "--registry",
        required=True,
        help="Path to registry.yaml to check",
    )

    return p


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    if args.command == "validate":
        return cmd_validate(args)
    if args.command == "generate":
        return cmd_generate(args)
    if args.command == "check-generated":
        return cmd_check_generated(args)
    return 2


if __name__ == "__main__":
    raise SystemExit(main())
