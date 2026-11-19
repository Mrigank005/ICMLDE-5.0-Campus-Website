# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + TypeScript, Tailwind CSS (tokens from DESIGN.md), `vite-plugin-pwa` (Workbox). Static hosting on Cloudflare Pages or Netlify. No backend. QR codes generated with the `qrcode` npm package. Decided in the project handoff, signed off by the faculty supervisor.

## Users

Invited guests, speakers and participants at ICMLDE 5.0, the 5th International Conference on Machine Learning and Data Engineering, at UPES, Dehradun, India. Many are international and senior academics, and most are visiting UPES for the first time. They are on their phones, outdoors and between buildings, with a few minutes between sessions. They need to know what's on now and where it is, and to get there. Many also explore the campus between sessions.

Design test for every screen: *would a 60-year-old visiting professor use this on day 1 without being told how?*

## Product Purpose

A campus companion web app, opened by scanning a QR code on the badge, at the registration desk or on standees. There's no login or install, though it can be installed as a PWA. One home screen with three stacked cards:

1. **Now / Next**: the session running now, or the next one, with a Take me there button.
2. **Full itinerary**: day tabs, opening on today, with the current session highlighted. Tapping a session shows its details.
3. **Take me there**: every relevant campus location, grouped by category, with search.

Take me there opens a location sheet: a Google Map shown inside the app at the top (entrance pin, and walking directions from the user's location on request), then indoor directions where a place has them. Entrance photos are out of scope for now. **Requirement changed (supervisor, 2026-11-19): the map is inside the web app, not a hand-off to the Maps app.** It uses Google's Maps Embed API with an API key (`VITE_GOOGLE_MAPS_KEY`). Without a key or a connection, the sheet falls back to an "Open in Google Maps" link. Success: an attendee reaches the right room on time without asking a volunteer.

## Positioning

It's built for this campus and this conference only. Google Maps already knows the buildings and paths, so the app embeds Google's map rather than building its own. It adds what Maps can't know: which entrance to use, how to get from the door to the room, and which session is in which room right now.

## Operating Context

- Conference dates: **27–28 November 2026** (2 days). Confirmed by Mrigank on 2026-11-19. The unipole banner's "27–29" is wrong.
- All times are IST (`Asia/Kolkata`). Attendees' phones may still be on their home timezone, so times are always computed and shown in IST.
- Hilly campus, outdoor daylight use, varying 4G. The app has to work offline after the first load.
- The organizing committee (OC) edits `schedule.json` and `locations.json` by hand and redeploys. Session `status` (`scheduled | delayed | moved | cancelled`) plus a `note` is how changes are flagged. There are no push notifications.

## Capabilities and Constraints

- In scope: the three cards, the location sheet, PWA install and offline caching, a re-fetch of the schedule every ~60 s with an "Updated HH:MM" stamp, and a QR generation script.
- Out of scope unless Mrigank asks: push notifications or reminders, login or accounts or personal data, a backend or database, a custom-built map, continuous GPS tracking or geofencing (the app reads the phone's location once, on tap, only to start the route), live Q&A, feedback, certificates, analytics.
- First screen in under 2 s on a mid-range Android phone on 4G. No splash, onboarding or sign-up.
- Open: whether there are parallel sessions, the final location list, indoor directions for each place, and the final domain for the QR codes.

## Brand Commitments

- Existing ICMLDE 5.0 identity (posters, banners, dangler, social posts in `Brand/`). The app extends it; it doesn't reinvent it.
- Fixed colours: deep navy `#131e62`, deep purple `#540274`, white. The deep gradient (`#141d62 → #520273`) is the UI gradient. The brighter banner gradient (`#013f96 → #77019b`) is used only for the app icon and splash colour.
- Typeface in the app: **Lexend** (free, OFL). The print typeface Nourd is licensed for personal use only, which does not cover the website (2026-11-20), so the app must not use it.
- Logo files (SVG or transparent PNG) are pending from Mrigank. Until they arrive, `src/assets/logo.webp` is a temporary crop from the banner (rebuilt by `tools/make-assets.py`).

## Evidence on Hand

- `Brand/`: unipole banner, backdrop, dangler, speaker social post, gradient reference.
- Real campus places and coordinates (supplied by Mrigank, 2026-11-20): Food Court, 1st Block (Food Court), Hubble Block, MAC, IT Block, 10th Block, MDC (Guest House). Still no real schedule or speaker list: the sessions are labelled samples. Never invent sessions, speakers or coordinates.

## Product Principles

1. **One glance, one tap.** The thing you need now is at the top, and getting there is one button.
2. **IST is the truth.** Never trust the device's timezone.
3. **The door, not the building.** Always point people to the specific entrance and say what to do once inside.
4. **Plain words for everyone.** Short, literal English for an international audience. No jargon, no idioms.
5. **Works when the network doesn't.** Cached and calm offline, and honest about when it last updated.

## Accessibility & Inclusion

The app is light only (Mrigank, 2026-11-20). WCAG 2.1 AA minimum: contrast, tap targets of at least 44 px (we use 48 px), screen-reader labels on every button, and generous text sizes for older readers. State is never shown by colour alone. Respect `prefers-reduced-motion`.
