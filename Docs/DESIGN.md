---
name: ICMLDE 5.0 Campus
description: The campus companion for ICMLDE 5.0 at UPES Dehradun. What's on now, and how to get there.
colors:
  # Brand: fixed. Do not change without Mrigank.
  brand-navy: "#131e62"
  brand-purple: "#540274"
  brand-white: "#ffffff"
  gradient-deep-start: "#141d62"
  gradient-deep-end: "#520273"
  # Brand: sampled from assets, restricted use (see Colors)
  gradient-bright-start: "#013f96"
  gradient-bright-end: "#77019b"
  signal-cyan: "#67dcff"
  sparkle-lavender: "#d2c6ff"
  logo-magenta: "#d140b8"
  logo-pink: "#f46fba"
  on-gradient-muted: "#e6e2fb"
  # Light theme (default)
  bg: "#f6f6fb"
  surface: "#ffffff"
  surface-track: "#eceef6"
  ink: "#1b1f3b"
  ink-2: "#545a7a"
  line: "#dfe2ee"
  line-strong: "#8a8fab"
  primary: "#131e62"
  primary-hover: "#222e7e"
  primary-press: "#0b1240"
  accent: "#540274"
  accent-tint: "#f5ecfa"
  step-bg: "#eef0fa"
  delayed-ink: "#8a4500"
  delayed-tint: "#fff1d6"
  delayed-line: "#f0c47a"
  moved-ink: "#005f7a"
  moved-tint: "#e2f6fc"
  moved-line: "#8fd6ea"
  cancelled-ink: "#a8173f"
  cancelled-tint: "#fde8ee"
  cancelled-line: "#f2a7bb"
  # Dark theme
  dk-bg: "#0a0f2e"
  dk-surface: "#131a45"
  dk-surface-track: "#1b2459"
  dk-raised: "#232d6b"
  dk-ink: "#eef0fb"
  dk-ink-2: "#b4bad8"
  dk-line: "#2a3270"
  dk-line-strong: "#6670ad"
  dk-primary: "#67dcff"
  dk-primary-hover: "#8fe6ff"
  dk-on-primary: "#131e62"
  dk-accent: "#d2c6ff"
  dk-accent-tint: "#2a1c5e"
  dk-delayed-ink: "#ffc46b"
  dk-delayed-tint: "#3a2a14"
  dk-moved-ink: "#7fe0ff"
  dk-moved-tint: "#0e2f4d"
  dk-cancelled-ink: "#ff9bb6"
  dk-cancelled-tint: "#3d1530"
typography:
  headline:
    fontFamily: "Lexend, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Lexend, system-ui, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.005em"
  item:
    fontFamily: "Lexend, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0em"
  body:
    fontFamily: "Lexend, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  label:
    fontFamily: "Lexend, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0em"
  small:
    fontFamily: "Lexend, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.005em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
  tab: "10px"
  tab-track: "14px"
  sheet: "28px"
  pill: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.brand-white}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-active:
    backgroundColor: "{colors.primary-press}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  session-row-current:
    backgroundColor: "{colors.accent-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 16px"
  date-tab-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "48px"
  search-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: "52px"
  chip-delayed:
    backgroundColor: "{colors.delayed-tint}"
    textColor: "{colors.delayed-ink}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  chip-moved:
    backgroundColor: "{colors.moved-tint}"
    textColor: "{colors.moved-ink}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  chip-cancelled:
    backgroundColor: "{colors.cancelled-tint}"
    textColor: "{colors.cancelled-ink}"
    typography: "{typography.small}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
---

# Design System: ICMLDE 5.0 Campus

## Overview

**The conference badge, made useful.** The app extends the ICMLDE 5.0 print identity: the deep navy→purple gradient, cyan headlines, lavender sparkles and the pink logo mark. It turns that identity into a calm, high-contrast tool you can read in the sun on a hilly campus. The brand is strongest in one place, the gradient header band at the top of the home screen, which looks like the banners and danglers attendees pass on campus. Everything below it is white cards with navy type: a quiet tool that gets out of the way.

**Scene.** A visiting professor stands outside a block in Dehradun's late-November daylight, phone in one hand and bag in the other, with five minutes before the next talk. This scene makes light the only theme, for glare and sunlight. **The app is light only (Mrigank, 2026-11-20): it ignores the phone's dark-mode setting.** The dark tokens in this file are kept for reference and are not shipped.

**Mode:** Operate. Familiarity beats novelty. Every control is a known pattern (tabs, a list, a search box, a bottom sheet, a button).

**Principles**
1. **The 60-year-old test.** Would a visiting professor use this on day 1 without being told how? If a screen needs explaining, redesign it.
2. **One glance, one tap.** The answer to "where do I need to be?" sits at the top. Getting there is one big button.
3. **Never colour alone.** Every state (now, delayed, room changed, cancelled, ended) has a word and an icon as well as a colour.
4. **The door, not the building.** Location UI always shows a map pinned to the exact entrance coordinates, never just a place name, and shows the indoor steps when a place has them.
5. **Brand on the frame, clarity in the content.** The gradient frames the screen. Content sits on white or deep navy, never on the gradient's middle.

## Colors

**Strategy: Restrained, with one Committed band.** The deep gradient fills the header band (about 15–20% of the first screen). Everything else is neutral and tinted towards the navy, with purple reserved for "now". Every ratio below was measured (WCAG 2.1 relative luminance).

### Primary
- **Brand navy `#131e62`.** Headings, primary buttons and the app frame. 15.1:1 on white (AAA).
- **Deep gradient `#141d62 → #520273`** at 120°, sampled from the dangler. It matches the confirmed navy and purple. Used for the header band, the home-screen icon background and the closing/thank-you state. White on either end is 13.0–15.2:1.

### Secondary
- **Brand purple `#540274`.** The "happening now" accent: the current session's border and label, and the active date tab's text. 12.8:1 on white. Its tint `#f5ecfa` fills the current session row (ink on the tint is 14.0:1).
- **Navy on purple is 1.18:1.** Never put text of one on the other. Separate them with white or a neutral.

### Tertiary (on dark surfaces only)
- **Signal cyan `#67dcff`.** This is the cyan of every poster headline. In light theme it appears only on the header band, for the event dates. In dark theme it's the primary button colour, with navy text (9.5:1). **It never appears on white (1.58:1, fails).**
- **Sparkle lavender `#d2c6ff`.** From the dangler's sparkles and orbit dots. The dark-theme "now" accent (10.5:1 on dark surface) and the focus ring on dark surfaces.
- **Logo magenta `#d140b8` / pink `#f46fba`.** Only inside the logo mark. Never UI.
- **Bright gradient `#013f96 → #77019b`.** From the unipole and backdrop. Only for the PWA icon background and `theme_color` / splash, where it ties the app to the large-format banners. Never behind text in the app.

### Neutral (light)
| Token | Hex | Use | Contrast |
|---|---|---|---|
| `bg` | `#f6f6fb` | Page background | n/a |
| `surface` | `#ffffff` | Cards, sheet, search field | n/a |
| `surface-track` | `#eceef6` | Date-tab track | n/a |
| `ink` | `#1b1f3b` | Body text | 14.9:1 on `bg` |
| `ink-2` | `#545a7a` | Secondary text, times, past sessions | 6.7:1 on white, 6.25:1 on `bg`, 5.8:1 on track and accent tint |
| `line` | `#dfe2ee` | Dividers (decorative) | n/a |
| `line-strong` | `#8a8fab` | Input borders, secondary-button border | 3.2:1 on white (meets 1.4.11) |

Two small helper tokens:
- `step-bg` `#eef0fa` fills the numbered circles in indoor directions (navy on it is 13.3:1). In dark it's `dk-surface-track`.
- `on-gradient-muted` `#e6e2fb` is secondary text on the gradient (10.3:1 at the purple end).

There are only two text levels. A third grey tried at `#6b7090` measured 4.49:1 on `bg`, so it was dropped.

### Neutral (dark)
| Token | Hex | Use | Contrast |
|---|---|---|---|
| `dk-bg` | `#0a0f2e` | Page | n/a |
| `dk-surface` | `#131a45` | Cards, sheet | n/a |
| `dk-surface-track` | `#1b2459` | Tab track, search | n/a |
| `dk-ink` | `#eef0fb` | Body text | 14.7:1 on surface |
| `dk-ink-2` | `#b4bad8` | Secondary | 8.7:1 on surface, 7.6:1 on track |
| `dk-raised` | `#232d6b` | Active date-tab segment | lavender on it 8.0:1 |
| `dk-line` | `#2a3270` | Dividers | n/a |
| `dk-line-strong` | `#6670ad` | Input borders | 3.56:1 on surface, 3.11:1 on track |

### Status
Status colours sit near the brand: amber is warm against the navy, "moved" comes from the poster cyan, and "cancelled" comes from the logo magenta. **Each status always pairs its colour with an icon and a word.**

| State | Light ink / tint | Ratio | Dark ink / tint | Ratio | Icon + word |
|---|---|---|---|---|---|
| Delayed | `#8a4500` / `#fff1d6` | 6.4:1 | `#ffc46b` / `#3a2a14` | 8.8:1 | clock · "Delayed" |
| Moved | `#005f7a` / `#e2f6fc` | 6.5:1 | `#7fe0ff` / `#0e2f4d` | 9.1:1 | arrow-right-left · "Room changed" |
| Cancelled | `#a8173f` / `#fde8ee` | 6.3:1 | `#ff9bb6` / `#3d1530` | 7.9:1 | circle-slash · "Cancelled" |
| Now | `#540274` / `#f5ecfa` | 11.2:1 | `#d2c6ff` / `#2a1c5e` | 9.3:1 | filled dot · "Happening now" |

### Named Rules
- **No cyan on white. No navy on purple.** Both fail.
- **Purple means now.** Don't use `accent` for decoration, links or headings. It marks the current session and the active tab only.
- **The gradient is a frame, not a fill.** Text sits on the gradient only in the header band and the closing state, never inside a list or card.

## Typography

**Lexend** (Google Fonts, SIL Open Font License), bundled through `@fontsource/lexend`, latin and latin-ext subsets (for names like "Björn"), two weights only:
- **Lexend Bold (700):** headings, session and location titles, buttons, tabs, labels.
- **Lexend Regular (400):** body text, times, venue lines, indoor directions, chips.

**Why not Nourd:** the ICMLDE print work uses Nourd (Hanken Design Co.), but the licence held is free for personal use only, which excludes websites and redistribution (decided by Mrigank, 2026-11-20). Lexend is the closest free geometric match to the posters' lettering. Do not add Nourd font files to the app or the repository unless a Hanken webfont licence is bought, and even then keep the files out of the public repo.

Some print assets also use Montserrat, Poppins and Open Sans (identified by side-by-side rendering). They're for print only. The app uses Nourd alone so it loads fast.

### Hierarchy
Fixed rem scale, ratio about 1.2. Root 16px, body 17px.

| Token | Size / line | Weight | Use |
|---|---|---|---|
| `headline` | 28 / 34 px | Bold | Now/Next session title |
| `title` | 22 / 28 px | Bold | Card titles ("Happening now", "Schedule", "Find a place"), sheet title |
| `item` | 19 / 26 px | Bold | Session titles in lists, location names |
| `body` | 17 / 26 px | Regular | Running text, indoor directions, search input |
| `label` | 17 / 20 px | Bold | Buttons, tabs, category headers |
| `small` | 15 / 22 px | 400 | Times, venue lines, chips, "Updated" stamp. **Nothing smaller anywhere.** |

### Named Rules
- **Floor of 15px.** No text below `small`. Older eyes and sunlight come first.
- **Tabular figures for times** (`font-variant-numeric: tabular-nums`), so schedule columns line up.
- **Times always read "10:00–11:00 IST".** Use the 24-hour clock with an en-dash. Show IST once per block, not on every line: the header band says "India time (IST)", and the Schedule card says "All times are India time (IST)" under its title. The Now card's time line is `body` size in `ink`, not grey, because it's the most important fact after the title.
- **No all-caps labels and no eyebrows.** A heading carries itself.
- Balance headings (`text-wrap: balance`). Long session titles wrap; never truncate a session title.

## Layout

- **Responsive page width, shared by the header and the cards** (`WRAP`): 560px on phones, 720px from 768px (still one column), 1120px from 1024px. Side gutters are 16px, 24px from 640px and 32px from 1024px.
- **Desktop (1024px and up) is two columns, 5fr and 7fr:** the Now/Next card and Find a place on the left, the Schedule on the right, so the whole page fits one screen. On phones and tablets the order is Now/Next, Schedule, Find a place. The header grows too: logos 36px (UPES) and 48px (ICMLDE), and the dot-wave stays inside the page width.
- **Desktop vs tablet:** the two-column layout starts at 1024px wide, so a tablet in landscape gets the desktop layout and a tablet in portrait gets the phone layout, only wider.
- **Desktop only (1024px and up):** the Schedule shows 4 sessions (1 before and 2 after the current one, sliding to 4 at the first or last of the day; 4 is the count that brings the Schedule's height closest to the left column) and its link reads "See more" / "See fewer". Phones and tablet portrait keep 3 and "Show all N". The Schedule and Find a place cards stretch so both columns end on the same line, including after "See more". The "Updated HH:MM IST" stamp (or the Offline notice) moves from the footer to the header, right-aligned under the ICMLDE logo, on the same line as the dates ("27–28 November 2026"), opposite the Now / date block.
- **Location sheet on desktop (768px and up)** is a centred pop-up, 600px wide with all corners rounded (`sheet` radius) and no drag handle. It fades and lifts in 220ms. On phones it stays a bottom sheet.
- **Home order:** header band (logo, Updated stamp, place and dates) → Now/Next card (it overlaps the band by 36px) → Schedule card → Find a place card → footer (Updated stamp, credits).
- **Spacing:** 4px base. 16px inside groups, 20px card padding, 24px between cards, 32px above a card title.
- **Tap targets:** 48px minimum height for every interactive element (above the 44px floor). Full-row tap areas for sessions and locations.
- **Safe areas:** pad the header with `env(safe-area-inset-top)` and the sheet with `env(safe-area-inset-bottom)`. Use `100dvh`, never `100vh`.
- **Date tabs stick** to the top of the viewport while the Schedule card scrolls (`position: sticky`), so the day is always visible.

## Elevation & Depth

Three levels only. Shadows are navy-tinted, with an offset and a soft blur.

| Level | Shadow | Use |
|---|---|---|
| 0 | none, 1px `line` border | Rows inside cards, search field |
| 1 | `0 1px 2px rgb(19 30 98 / .06), 0 6px 20px rgb(19 30 98 / .07)` | Cards |
| 2 | `0 -6px 32px rgb(11 18 64 / .22)` plus a scrim `rgb(10 15 46 / .48)` | Location sheet |

In dark theme, shadows are replaced by surface steps (`dk-bg` → `dk-surface` → `dk-surface-track`) and a 1px `dk-line` border.

## Shapes

- **Concentric rule:** the date-tab track is `tab-track` 14px with 4px padding, so its active segment is `tab` 10px (14 − 4). The sheet's drag handle is `pill`.
- Radii: `sm` 8px (chips' inner icons, photo), `md` 12px (buttons, rows, tabs, search), `lg` 20px (cards), `sheet` 28px (sheet top corners), `pill` (status chips).
- **Brand motifs, used sparingly and always `aria-hidden`:**
  - **The four-point sparkle** from the dangler, in lavender. Two small sparkles in the header band, and one larger in the closing state. Never in lists.
  - **The dot-wave** from the posters. A faint arc of dots in the header band (≤ 12% opacity). It's inline SVG, so it adds no image weight.
- Hairline borders are 1px. The current session gets a **full 2px purple border** plus the tint, never a coloured side stripe.

## Components

### Header band
Deep gradient, 120°. Contents, top to bottom:
- the UPES + "School of Computer Science" lockup (height 26px) on the left, and the ICMLDE logo (white wordmark plus pink mark; height 36px) opposite on the right, on one centre line. The "Updated HH:MM IST" stamp moved to the page footer. The Offline notice stays in the band, above the clock,
- **"Now 10:50 · India time (IST)"** in `label` white. This is the app's own clock, so someone whose phone is on another timezone always has an anchor,
- "UPES Dehradun" in `small` white,
- "27–28 November 2026" in `small` cyan,
- two lavender sparkles and the dot-wave.

The band ends 32px below its content, and the Now/Next card overlaps it. *The logo is a temporary crop (`src/assets/logo.webp`, built by `tools/make-assets.py`) until Mrigank adds the real files.*

### Buttons
- **Primary ("Take me there", "Open in Google Maps").**
  - Light: navy fill, white `label`, 52px tall, full width inside its card, `md` radius, with a leading map-pin or navigation icon (20px, 2px stroke).
  - Hover: `primary-hover`. Press: `primary-press` with `scale(.98)` for 120ms. Focus: 2px purple ring at a 2px offset.
  - Dark: cyan fill with navy text, and a lavender focus ring.
  - Disabled: `surface-track` fill with `ink-2` text and **no icon** (an icon makes it look tappable). Buttons have 14px vertical padding, so a label that wraps never touches the edges.
- **Secondary ("Close", "Show details").** White fill, 1px `line-strong` border, navy text, 48px tall.
- **Text button ("Clear search").** Navy, underlined at a 3px offset, 48px tap area.

### Now/Next card (card 1)
A white card at level 1. Its title tells you which state you're in:

| State | Title | Body |
|---|---|---|
| A session is running | "Happening now" with a purple dot | Session title (`headline`), "10:00–11:00 IST · ends in 25 min", venue line with pin icon, primary button |
| Parallel sessions | "Happening now", then "3 sessions at the same time · 11:50–13:20 IST" | A compact list, each row with title, venue and its own "Take me there" (secondary style, 48px) |
| Gap between sessions | "Up next · in 20 min" | Same layout, no purple dot |
| Before the event | "First session" | "Fri 27 Nov · 09:30–10:30 IST", then the same layout |
| After the day's last session | "Tomorrow · Sat 28 Nov" | The first session of the next day |
| After the event | Shown on the gradient instead of white: "Thank you for joining ICMLDE 5.0" plus a sparkle | One line: "The schedule stays here if you need it." No button. |

**Delayed sessions.** The countdown uses the *expected* start, never the planned one: "Up next · in 20 min", then "Expected 14:45–16:15 IST (planned 14:30)". This needs an optional numeric `delayMin` on the session in `schedule.json`. Without it the app can't compute a delay from the free-text note.

A delayed, moved or cancelled session shows its status chip and note under the time. Every state except the closing one ends with a "See it in the schedule" text button. It switches to today's tab and scrolls the current (or next) row into view.

**Proposal, pending Mrigank's review:** the home page does **not** auto-scroll to the itinerary on open, because that would push card 1 off screen. The current row is highlighted, and "See it in the schedule" does the scrolling.

### Date tabs
A segmented control on the `surface-track` track, 48px tall, one segment per day: "Fri 27 Nov" and "Sat 28 Nov". The day number is part of the label, so it never says only "Day 1". The active segment has **four cues so it never relies on a shadow or hue alone** (measured: the fill is only 1.16:1 against the track): a 2px `accent` border, purple Bold text, a white (dark: `dk-raised`) fill, and a level-1 shadow. Inactive segments are Regular weight in `ink-2`. The control opens on today in IST (Day 1 before the event and the last day after it). The indicator moves in 200ms. Uses `role="tablist"`, with arrow-key support.

### Session row (Schedule card)
Stacked, so long titles get the full width on a 390px phone:
1. a time line (`small`, tabular, e.g. "10:30–11:30", plus the "Happening now" or "Ended" marker),
2. the title (`item`, never truncated),
3. the venue line (`small` `ink-2`, pin icon),
4. status chips and the note.

A chevron sits on the right. The whole row is a button and expands inline (no modal) to show:
- the time range,
- speakers (when present),
- the note,
- a primary "Take me there".

| State | Treatment |
|---|---|
| Normal | White, 1px `line` divider between rows |
| Current | `accent-tint` fill, full 2px purple border, `md` radius, "Happening now" chip with dot. The list scrolls it into view on open (`scroll-margin-top` clears the sticky tabs). |
| Ended | Title and time in `ink-2`, "Ended" in `small`. Stays tappable. When 2 or more sessions at the top of the day have ended, they fold into one "Show N earlier sessions" text button, so the current row sits near the top. |
| Delayed | Amber chip "Delayed", with the note on the next line ("Running 15 min late") |
| Moved | Cyan-ink chip "Room changed". The new venue is in the venue line in bold, and the old one follows struck through, with "was" read aloud by screen readers. |
| Cancelled | Title struck through in `ink-2`, magenta chip "Cancelled", no Take me there button |
| Expanded | Chevron rotates 180°. The detail block reveals by height in 220ms. |

### Find a place card (card 3)
- **Search box.** 52px tall, white, 1px `line-strong` border, leading search icon, placeholder "Search places, e.g. washroom". It filters as you type, matching name, category and tags. An ✕ button (48px) clears it.
- **Category header.** A 24px icon plus the `label` text in navy, and a count in `ink-2` only when the category has more than one place, e.g. "Session halls (6)". It sticks under the search box when the list is long. Categories appear in this order: Session halls, Registration, Help desk, Food & drinks, Washrooms, Parking, Guest house, Other.
- **Location row.** 56px minimum height:
  - the location name (`item`),
  - a one-line hint in `small` `ink-2` ("Block 11 · Floor 3"),
  - a trailing chevron.
  - Tapping the row opens the location sheet.
- **No results.** "No places match 'xyz'." plus a "Clear search" text button and "Ask at the Help desk" with its location.

### Location sheet
A bottom sheet built on `<dialog>` with a scrim. It rises in 280ms. It uses `sheet` radius on the top corners and a drag handle. The content order is:
1. **The map**, at the top, where the entrance photo used to be (entrance photos are out of scope for now). It is the Google Maps Embed: 4:3, `sm`-radius corners, 1px `line` border, opening on the entrance pin. Below it, a secondary button "Show walking route" asks for the phone's location once, on tap, and switches the map to walking directions to the entrance. "Show the entrance only" switches back. If location is refused or fails, a plain `small` message says what to do.
2. The name (`title`) and category.
3. "Inside the building": numbered steps (`body`), only for places that have them. Steps give the lift route and the stairs alternative, and end with the cue to look for.
4. Only when the map can't show (offline, or no API key): the primary "Open in Google Maps" button, with "Walking directions from where you are" underneath. There is no "Directions coming soon" button. A place without coordinates shows no map.
5. A secondary "Close" button.

The sheet stays open on reload. Its state lives in the URL hash (`#place=hubble`), so a reload or the back gesture behaves too. Close it with the button, the scrim, Esc or the back gesture.

### Updated stamp
In `small` `ink-2` with a refresh icon: "Updated 14:32 IST". While fetching: "Checking for changes…". Offline: a cloud-off icon with "Offline · schedule from 14:32 IST" on the `surface-track` pill. It lives in the header band, top right, opposite the logo, in lavender (8.2:1 or better on the gradient). It's announced politely (`aria-live="polite"`) only when the schedule actually changes.

### Accessibility notes for the build
- A moved venue is read aloud as "Room 210, was Room 204" (hidden "was" text), in the Now card and in the rows.
- The day tabs use `role="tablist"` with `aria-controls` pointing at the schedule list (`role="tabpanel"`). The location sheet is labelled with the place's name and should trap focus and return it on close.
- The Updated stamp must not be a persistent live region that changes every 60s. Announce only when the schedule actually changes.

### Empty and offline states
- **A day with no sessions:** "Nothing scheduled on this day." plus the venue's Help desk row.
- **First load with no network and no cache:** a full-card message, "You're offline. Connect once to load the schedule.", with a "Try again" secondary button.
- **No entrance photos:** out of scope for now. The map replaces them.
- **Missing coordinates:** no map and no directions button. The indoor steps (when present) still show.

## Do's and Don'ts

### Do:
- Show the map pinned to the entrance coordinates, and the indoor steps when a place has them.
- Give every state a word and an icon, not just a colour.
- Write times as "10:00–11:00 IST" and dates as "Fri 27 Nov".
- Keep every tap target at least 48px tall, and make entire rows tappable.
- Test in direct sunlight on a mid-range Android phone.

### Don't:
- Don't put cyan text on white, or navy on purple.
- Don't use purple for anything except "now" and the active tab.
- Don't add a splash screen, onboarding carousel, modal intro or sign-up.
- Don't use text below 15px, all-caps labels, eyebrows or gradient text.
- Don't use coloured side stripes on rows or cards. The current state is a full border plus a tint.
- Don't send people to a building name in Maps. Always use the entrance's lat/lng.
- Don't invent session, speaker or coordinate data. Label placeholders as samples.

## Motion

Motion explains a change of state, and nothing else. Durations are 120–280ms, using an expressive ease-out `cubic-bezier(.23, 1, .32, 1)` (`--ease-out`). There are no page-load sequences and no looping animation.

| Moment | What moves | Duration |
|---|---|---|
| Button press | `scale(.98)` | 120ms in, 160ms out |
| Session expand / collapse | `grid-template-rows: 0fr → 1fr`, opacity of the content, chevron rotation | 220ms / 180ms |
| Date tab change | active-segment slide (`translateX`) | 200ms |
| Location sheet open | `translateY(100%) → 0` plus the scrim fading in | 280ms |
| Location sheet close | `translateY → 100%` | 200ms (exits are faster) |
| Schedule refresh with a change | the changed row's background flashes the tint once | 600ms fade-out |

- **Never animate** the Now/Next card swapping between sessions, the list's first render, or scrolling. The "Happening now" dot does not pulse.
- **Reduced motion** (`prefers-reduced-motion: reduce`): no transforms. The sheet and expanders fade over 120ms, and the tab indicator jumps.
- The sheet follows the finger 1:1 when dragged. A release past 30% of its height or a flick dismisses it. It can be interrupted mid-animation.

## Icons & Imagery

- **Icons:** [Lucide](https://lucide.dev), 2px stroke, rounded caps. 20px in buttons and rows, 24px in category headers. Icons are inline SVG, tree-shaken, `currentColor`. They are never emoji or Unicode stand-ins. The set is: `map-pin`, `navigation`, `clock`, `arrow-right-left`, `circle-slash`, `search`, `x`, `chevron-down`, `chevron-right`, `refresh-cw`, `cloud-off`, `presentation` (halls), `clipboard-check` (registration), `info` (help), `utensils` (food), `bath` (washroom), `square-parking` (parking), `bed` (stay), `building-2` (other), `footprints` (indoor steps).
- **Entrance photos:** out of scope for now. If they return: daylight, from where someone actually approaches, 16:9 WebP of about 100 KB or less.
- **Logos:** the ICMLDE mark only appears on the gradient or on navy, because the wordmark is white. Keep clear space around it equal to the mark's height ÷ 2. There's no light-background version in the assets yet, so the logo never sits on white.

## Voice & Microcopy

Write for a careful reader whose first language may not be English.
- **Short, literal and plain.** "Take me there", not "Navigate". "Room changed", not "Venue updated". "Ended", not "Concluded".
- Name the action on buttons: "Open in Google Maps", "Show details", "Try again".
- Use complete times, with no relative-only phrasing. Write "Starts 14:00 IST · in 20 min", never just "soon".
- No idioms, no exclamation marks, no emoji. "Thank you for joining ICMLDE 5.0." is the one warm line.
- Indoor steps are imperative and landmark-based: "Enter through the glass doors. Take the lift to floor 3. Seminar Hall 2 is on your left. Stairs: to the right of reception."
- Errors say what happened and what to do: "Couldn't refresh. Showing the schedule from 14:32 IST."

## Tailwind Token Mapping

Tailwind v4, CSS-first. Semantic CSS variables are defined once per theme, and `@theme inline` exposes them as utilities (`bg-surface`, `text-ink-2`, `border-line-strong`, `bg-accent-tint`, `rounded-card` and so on). Components only use semantic names, never raw hex.

```css
/* src/styles/tokens.css */
:root {
  --bg: #f6f6fb; --surface: #fff; --surface-track: #eceef6; --raised: #fff; --step-bg: #eef0fa;
  --ink: #1b1f3b; --ink-2: #545a7a; --line: #dfe2ee; --line-strong: #8a8fab;
  --primary: #131e62; --primary-hover: #222e7e; --primary-press: #0b1240; --on-primary: #fff;
  --accent: #540274; --accent-tint: #f5ecfa; --focus: #540274;
  --delayed-ink: #8a4500; --delayed-tint: #fff1d6;
  --moved-ink: #005f7a; --moved-tint: #e2f6fc;
  --cancelled-ink: #a8173f; --cancelled-tint: #fde8ee;
  --gradient-deep: linear-gradient(120deg, #141d62, #520273);
  --shadow-card: 0 1px 2px rgb(19 30 98 / .06), 0 6px 20px rgb(19 30 98 / .07);
  --ease-out: cubic-bezier(.23, 1, .32, 1);
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0a0f2e; --surface: #131a45; --surface-track: #1b2459; --raised: #232d6b; --step-bg: #1b2459;
    --ink: #eef0fb; --ink-2: #b4bad8; --line: #2a3270; --line-strong: #6670ad;
    --primary: #67dcff; --primary-hover: #8fe6ff; --primary-press: #4bd1fb; --on-primary: #131e62;
    --accent: #d2c6ff; --accent-tint: #2a1c5e; --focus: #d2c6ff;
    --delayed-ink: #ffc46b; --delayed-tint: #3a2a14;
    --moved-ink: #7fe0ff; --moved-tint: #0e2f4d;
    --cancelled-ink: #ff9bb6; --cancelled-tint: #3d1530;
    --shadow-card: none;
    color-scheme: dark;
  }
}
@theme inline {
  --color-bg: var(--bg); --color-surface: var(--surface); --color-surface-track: var(--surface-track);
  --color-raised: var(--raised); --color-step-bg: var(--step-bg);
  --color-ink: var(--ink); --color-ink-2: var(--ink-2);
  --color-line: var(--line); --color-line-strong: var(--line-strong);
  --color-primary: var(--primary); --color-primary-hover: var(--primary-hover);
  --color-primary-press: var(--primary-press); --color-on-primary: var(--on-primary);
  --color-accent: var(--accent); --color-accent-tint: var(--accent-tint); --color-focus: var(--focus);
  --color-delayed-ink: var(--delayed-ink); --color-delayed-tint: var(--delayed-tint);
  --color-moved-ink: var(--moved-ink); --color-moved-tint: var(--moved-tint);
  --color-cancelled-ink: var(--cancelled-ink); --color-cancelled-tint: var(--cancelled-tint);
  --font-sans: "Lexend", system-ui, sans-serif;
  --text-small: 0.9375rem; --text-small--line-height: 1.45;
  --text-body: 1.0625rem;  --text-body--line-height: 1.55;
  --text-item: 1.1875rem;  --text-item--line-height: 1.35;
  --text-title: 1.375rem;  --text-title--line-height: 1.25;
  --text-headline: 1.75rem; --text-headline--line-height: 1.2;
  --radius-md: 12px; --radius-card: 20px; --radius-sheet: 28px;
  --shadow-card: var(--shadow-card);
  --ease-out: var(--ease-out);
}
```

The header band always uses `--gradient-deep` in both themes. Tailwind's default spacing scale (4px base) matches the spacing tokens, so it stays as is.
