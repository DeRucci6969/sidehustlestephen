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

    missing_from_manifest = app_ids - manifest_ids
    missing_from_app = manifest_ids - app_ids
    missing_from_generator = app_ids - generator_ids
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
