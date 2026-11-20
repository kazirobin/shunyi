# Design DNA: Shunyi public landing (v3, "Signal")

> **v3 supersedes v2 below (2026-11-20).**
>
> The client asked for "a marketing site, landing page style: no 3D, just the best colour selection with micro-interactions and animations". They named the real company site as the content source: https://www.shunyigarment.com/ (Zhongshan Shunyi Intelligent Protective Equipment Technology Co., Ltd).
>
> **Evidence for v3:**
> - **Category:** technical OEM/ODM apparel (cycling, ski, motocross, hunting, outdoor, heated, protective gear), per the original site.
> - **Facts used:** 20 years, 10,000 m², 210 staff, 200 partner brands; partner logos LEATT, Klim, IXON, Yamaha, Kawasaki and others; ISO 9001/14001/45001 and CE; MOQ 500 pieces a style. All are from the original site.
> - **Palette:** navy, from the company's blue building signage and corporate banners. Signal orange, the hi-vis colour of protective and riding gear and also used in the site's own banners. Glacier and ice neutrals, so product photography carries the colour.
> - **Type:** Inter Tight, heavy and tight, matching the client's own Contra templates.
> - **Imagery:** only the company's own product and factory photos. No stock, no 3D.
> - **Motion:** load reveal, an auto-rotating product showcase, counting stats, a partner marquee, hover lifts, timeline wipes, checklist ticks, a smooth FAQ, and reveal on scroll. All are disabled under reduced motion.

---

# Design DNA: Shunyi Garments public landing (v2, "Bolt")

v1 ("Cutting Room": Bodoni and line drawings) was rejected by the client on 2026-11-20 as the worst design they had seen. They directed that the new design take its cue from their own Contra template library (`~/Desktop/creation/saas/contra`), in particular **Gantry** (B2B industrial: a 3D trailer with the headline painted on it, and every section an interactive object from the industry) and **Heddle** (textile and thread metaphors).

## Evidence Binding

| Decision | Evidence | Source | Mechanism |
|---|---|---|---|
| 3D hero object built in code, with the headline printed on it | Client pointed to their own library; Gantry paints its headline on a trailer modelled in three.js | client feedback 2026-11-20; `saas/gantry/src/lib/hero-scene.ts` | A bolt of twill whose drop carries the headline as a screen print, the factory's equivalent of the trailer side |
| Pointer = inspection lamp raking the weave | Gantry's pointer is a headlamp; the live copy names "Quality Control: careful quality checks throughout production" | `saas/gantry` hero; live copy | Light skims the twill bump map so the weave flares, the way cloth is actually inspected |
| Scroll chalks the cutting marker onto the cloth | The admin tracks production in `pieces`; the copy covers "Planning" and "Cutting & Sewing" | `app/admin/layout/models.ts`; live copy | The hero scroll tells the planning step without invented claims |
| Inter Tight, heavy (680), tracking −0.045em | Gantry, Heddle, Cairn and Strait all use this voice | client's own templates | Matches the bar the client set |
| Sage twill as the brand material, tape yellow as the highlight | Sage `#718c58` is the only brand colour on the live site; Gantry pairs one brand colour with a paint yellow | live site; `saas/gantry/src/app/globals.css` | Brand continuity, with a high-energy accent for selected states |
| Capabilities as hang tags on a garment rail | Gantry's FAQ uses overhead exit signs as a tablist | `saas/gantry/src/components/signs.tsx` | A tag on a rail is how a garment identifies itself |
| Why-us as QC inspection slips that get stamped | Gantry's dock doors reveal a carrier check each; live copy lists four benefits | `saas/gantry/src/components/dock.tsx`; live copy | Each benefit is shown as something checked |
| Process as a pinned production line | Process is stored as ordered `serial` steps; the copy lists four ordered steps | `models.ts`; live copy | One garment travels Inquiry → Delivery |

## Category Default Analysis

**Category:** B2B garment manufacturer.

| Common strategy | Used here? | Evidence row |
|---|---|---|
| Stock photo of a sewing floor | No | — |
| Stat counters / client logos | No (none exist) | — |
| Icon-card service grid | No (hang-tag rail instead) | — |

## Design Thesis
A bolt of the brand's sage twill, modelled in code, drops its cloth like a studio sweep with the headline screen-printed on it. Every section below is a real object from the factory, built so a visitor can use it.

## Desired Perception
Buyers should come away thinking "This factory sweats the details, even on its website."

## Audience
Apparel buyers and sourcing managers evaluating a manufacturing partner.

## Emotional Register
- **Confident and loud at the top.** The hero is the one spectacle, as Gantry's is.
- **Crisp and practical below.** The sections are tools, not decoration, because buyers judge a supplier on how organised it is.

## Visual Territory
"Bolt": a studio-lit factory floor, built from concrete, twill, steel rail, kraft tags and QC stamps.

## Color Philosophy
- **Dominant field:** concrete `#e7e5df`, and white within the stages.
- **Brand material:** sage twill `#6b8a4e`. Deep green `#21331d` for the dark stage.
- **Highlight:** tape yellow `#f2c230`, only for the selected or active state.
- **Ink:** `#121412`.

## Typography Philosophy
- **Inter Tight:** headings at weight 660–700, tracking −0.042 to −0.05em.
- **IBM Plex Mono:** tag and slip fields only, the way real tags are printed.

## Composition Philosophy
- **Stages:** rounded, inset panels (Gantry's `.stage`), each holding one object.
- **Headings:** left-aligned, with the lead paragraph pushed to the right column.

## Spatial Philosophy
Dense inside the objects; generous between stages.

## Shape Language
- Stages: radius 34px.
- Tags: real die-cut shapes (clipped corners, punched holes).
- Slips: perforated edges.

## Surface / Material Language
Twill, kraft card, chrome rail, paper slips and an ink stamp, all as real materials with real shadows.

## Image Direction
No photography. The 3D is modelled in code and the illustrations are drawn in SVG.

## Interaction Philosophy
- Tags swing when chosen.
- Stamps thump down.
- The lamp follows the pointer.
- Arrow keys work on the rail.

## Motion Philosophy
- The scroll drives the hero camera and the production line.
- Reduced motion turns these off: the hero becomes one screen and the line becomes a list.

## Signature Moments
1. **The printed bolt** with its inspection lamp.
2. **The hang-tag rail.**
3. **The production line:** one garment carried through four steps.

## Anti-Patterns
- v1's Bodoni, line-drawing and editorial-margin look.
- Invented facts.
- Fade-up on every block.

## Responsive Philosophy
- On phones, the printed headline becomes live HTML over the bolt.
- The rail scrolls sideways.
- The production line becomes a stacked list.

---

## Amendment Log

| Date | What changed | Why | Approved by |
|---|---|---|---|
| 2026-11-20 | v1 Cutting Room | Initial | — |
| 2026-11-20 | Replaced with v2 Bolt | Client rejected v1; directed to own Contra library | Client |
