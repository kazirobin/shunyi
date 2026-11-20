# Design Territories: Shunyi Garments public landing

> Superseded by v2 ("Bolt") on 2026-11-20. See design-dna.md amendment log.

## Inputs that existed before any visual decision

1. **Live copy** (shunyi.vercel.app, mirrored in the previous `app/page.tsx`): hero "Crafting quality. Building trust.", four capabilities (Apparel Manufacturing, Cutting & Sewing, Quality Control, Finishing & Packaging), four benefits, a four-step process (Inquiry → Planning → Production → Delivery), values "Quality First / Production Focus / Partnership", and the line "Quality in every detail." The site lists no stats, clients, certifications, or address. **Nothing may be invented.**
2. **Existing brand asset:** the live site uses sage `#718c58` as its only brand colour, with a deep green `#20291f`.
3. **Real data shape:** the admin (`app/admin/layout/models.ts`) tracks each product as ordered `processes` (`serial`) and records cutting input and output in `pieces`. The business literally runs on pieces moving through a numbered sequence on the factory floor.
4. **Audience:** B2B apparel buyers and sourcing managers judging a manufacturer. The copy talks only to buyers ("buyer requirements and product specifications").

## Territory A: "Cutting Room" (light · technical · tactile · geometric)
The page is built from the artefacts of garment production: a cutting marker (every piece of a shirt nested on marker paper), sage twill as the fabric, a selvedge edge, running-stitch dividers, a woven care label, and thread sewn through the process. Bodoni (the typeface of fashion) set against precise technical line drawing.
- Product fit: high. A buyer recognises a marker instantly, and the hero shows how a garment gets made without a single invented claim.
- Journey fit: the process section maps directly onto `processes.serial` (input 3).
- Risk: costume-like if overdone. Mitigation: one orchestrated moment (the marker draft). Every other artefact stays static or responds only to the user.

## Territory B: "Export Ledger" (dark · industrial · dense · stencil)
Forest-green night palette, stencil shipping marks, carton labels, a manifest-table layout with big condensed type. It reads as a logistics or exporter brand.
- Product fit: medium. It sells shipping more than craft, and "Crafting quality" fights a stencil voice.
- Risk: dark industrial with condensed type is the stock look for factory and "manufacturing" templates.

## Territory C: "Atelier Quiet" (warm light · editorial · spacious · organic)
Large-format fabric macro photography, cream ground, a high-contrast serif, wide margins, and a fashion-magazine pace.
- Product fit: low to medium. It positions the company as a fashion label, not a manufacturer, and it needs photography that does not exist (no images on the live site).
- Risk: cream plus serif plus whitespace is the stock luxury-fashion template, and stock photos would be the only way to fill it. That is AI slop by definition.

## Scoring (1–5)

| Criterion | A Cutting Room | B Export Ledger | C Atelier Quiet |
|---|---|---|---|
| Truthful to inputs (no invented assets or claims) | 5 | 4 | 2 |
| Specific to garment manufacturing | 5 | 3 | 2 |
| Distinct from category defaults | 5 | 2 | 1 |
| Buildable at full quality with no photography | 5 | 4 | 1 |
| Continuity with existing brand sage | 5 | 3 | 3 |
| **Total** | **25** | **16** | **9** |

**Anti-bias check:** A is light, but it wasn't chosen *because* it is light. B lost on specificity and genericness, not on darkness. A still uses dark (forest and ink) for the "why" section and the footer, where contrast helps the reader.

**Selected: A, Cutting Room.**
