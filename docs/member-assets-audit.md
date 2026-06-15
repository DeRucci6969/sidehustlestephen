# Member Assets — Audit & Fixes (2026-06-14)

Audit of all 61 generated member assets (49 DOCX, 9 PDF, 3 XLSX) across 10 packs,
all produced by `scripts/generate_member_assets.py`. Findings were verified against
the real rendered files, then fixed in the generator. A brand restyle to match
**elevenlabs.io** was applied at the same time.

## Visual system (new)

Aligned to the ElevenLabs brand:

- **Surfaces:** warm off-white `#FDFCFC`, warm stone panels `#F5F3F1`, hairline borders `#E0DFDD`.
- **Structure:** black-first (`#0A0A0A`) — header bands, rules, table headers, checklist accents.
- **Functional accent:** a single blue `#0A59D2` for key numbers, taglines, links, and active states.
- **Type:** Arial (a clean grotesque that renders identically in Word, Google Docs, Pages, and
  LibreOffice) replacing Aptos, which only ships with Microsoft 365 and silently substituted elsewhere.

## Findings and fixes

| ID | Severity | Finding | Fix |
|----|----------|---------|-----|
| E1 | P0 | 57% of DOCX content was byte-identical boilerplate repeated on every asset | Shared standards now live **once per pack** in the AI Prompt Pack; every other asset carries a single compact "Delivery standards (shared)" pointer. Boilerplate share: **57% → 25%**, total sections 702 → 400. |
| E2 | P1 | XLSX had 5 generic filler sheets per workbook | Consolidated to one "Delivery & QA" sheet; added a branded "Start Here" cover. 11 → 9 sheets. |
| A1/D3 | P1 | XLSX numbers unformatted; percentages stored as text | Added currency / thousands / percent number formats with right-alignment; `"62%"` strings converted to real `0.62` percentages. Heuristic uses both column header and row label so mixed key/value sheets format correctly. |
| Q1 | P1 | PDF worksheet pages had unwrapped lines running off the page edge | All worksheet notes flow through a wrapping helper; widest line x-end 586pt → 485pt (page right ≈ 558pt). |
| Q2 | P1 | Fonts (Aptos) not embedded → substituted on most readers | Switched to Arial across DOCX/XLSX; PDF keeps Helvetica (core font). |
| Q3 | P2 | DOCX Title line-spacing ≈ 3.83× created a large gap | Set to 1.25×. |
| Q4 | P3 | PDF `latin-1` encoding could emit `?` on curly punctuation | Added a sanitizer folding curly quotes / dashes / bullets to ASCII. |
| Q5 | P3 | PDF paginator drifted from the renderer | Unified line-height calculation across both passes. |
| A2 | P2 | PDF cover truncated long buyer names | Removed the slice; values wrap inside the chip. |
| E3 | P2 | Checklists used literal `[ ]` text | Use the `☐` ballot-box glyph (renders across all readers). |
| E4 | P2 | No navigation in long docs | DOCX gets a TOC field; PDF gets an "Inside this document" contents list. |
| D2 | P2 | Inconsistent covers across formats | Branded header band on DOCX, "Start Here" cover sheet on XLSX, restyled cover on PDF. |
| A3 | P3 | XLSX sample values could be shipped unchanged | "Start Here" cover instructs replacing sample values; sources already labelled. |

## Verification

- `python3 scripts/generate_member_assets.py` → 61 assets; `validate_assets.py` → pass.
- All DOCX/XLSX XML parts parse; all PDFs structurally sound (header/xref/EOF/root).
- Quick Look previews confirm the ElevenLabs styling on PDF cover, DOCX, and XLSX.
- Cell-format spot checks confirm `$` on prices, plain numbers on counts, `%` on rates.

No changes were needed to `src/data/packs.ts` or `manifest.json`: the asset list, ids,
and filenames are unchanged (still 61 assets), so the web app and download route are unaffected.

## Regenerating

```bash
npm run assets:generate   # python3 scripts/generate_member_assets.py
npm run assets:validate
```
