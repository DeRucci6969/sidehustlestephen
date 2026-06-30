from __future__ import annotations

import json
import re
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "content" / "member-assets" / "manifest.json"
PACKS_TS = ROOT / "src" / "data" / "packs.ts"
GENERATOR = ROOT / "scripts" / "generate_member_assets.py"


def asset_ids_from_text(path: Path) -> set[str]:
    return set(re.findall(r'"(asset-[a-z0-9-]+)"', path.read_text()))


def main() -> None:
    manifest = json.loads(MANIFEST.read_text())
    manifest_ids = {item["id"] for item in manifest}
    app_ids = asset_ids_from_text(PACKS_TS)
    generator_ids = asset_ids_from_text(GENERATOR)

    # Automation assets are injected programmatically (identical token logic in both
    # packs.ts and the generator). They may appear as app-side detail copy, but they
    # should not be required as literal generator entries. Exclude them from the
    # literal cross-check and instead assert every pack has exactly one in manifest.
    automation_ids = {item_id for item_id in manifest_ids if item_id.endswith("-automation")}
    manifest_core = manifest_ids - automation_ids
    app_core = app_ids - {item_id for item_id in app_ids if item_id.endswith("-automation")}

    by_pack: dict[str, list[str]] = {}
    for item in manifest:
        by_pack.setdefault(item["packSlug"], []).append(item["id"])
    packs_missing_automation = sorted(
        slug for slug, ids in by_pack.items() if not any(i.endswith("-automation") for i in ids)
    )
    if packs_missing_automation:
        raise SystemExit(f"Packs missing an automation asset: {packs_missing_automation}")

    missing_from_manifest = app_core - manifest_core
    missing_from_app = manifest_core - app_ids
    missing_from_generator = app_core - generator_ids
    if missing_from_manifest or missing_from_app or missing_from_generator:
        raise SystemExit(
            "Asset ID mismatch: "
            f"missing_from_manifest={sorted(missing_from_manifest)} "
            f"missing_from_app={sorted(missing_from_app)} "
            f"missing_from_generator={sorted(missing_from_generator)}"
        )

    for item in manifest:
        path = ROOT / item["path"]
        if not path.exists():
            raise SystemExit(f"Missing asset file: {path}")
        if path.stat().st_size != item["bytes"]:
            raise SystemExit(f"Manifest byte count is stale for {item['id']}")
        if item["type"] in {"DOCX", "XLSX"}:
            with zipfile.ZipFile(path) as z:
                bad = z.testzip()
                if bad:
                    raise SystemExit(f"Invalid zip member in {path}: {bad}")
        elif item["type"] == "PDF" and not path.read_bytes().startswith(b"%PDF-1.4"):
            raise SystemExit(f"Invalid PDF header: {path}")

    print(f"Validated {len(manifest)} member assets")


if __name__ == "__main__":
    main()
