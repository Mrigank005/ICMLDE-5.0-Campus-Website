# ICMLDE 5.0 Campus app

A phone web app for ICMLDE 5.0 (27–28 Nov 2026, UPES Dehradun): what's on now, the schedule, and an in-app Google Map with walking directions to any campus location. No login, no backend. Attendees scan a QR code and it opens. It can be installed as a PWA and works offline after the first load.

Stack: Vite, React, TypeScript, Tailwind CSS v4, `vite-plugin-pwa`. Design rules are in [DESIGN.md](DESIGN.md), product context in [PRODUCT.md](PRODUCT.md), and a visual reference in [design.html](design.html).

```
npm install
npm run dev        # http://localhost:5173
npm test           # time logic (current/next, IST, edge cases)
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ at http://localhost:4173 (the service worker only runs here and in production)
```

## The two data files

Everything the OC edits lives in `public/data/`. No code changes needed.

**`schedule.json`** has the days and every session. Times are always India time, written with `+05:30`.

```json
{
  "id": "s03", "day": "day1", "title": "Keynote 1", "type": "keynote",
  "start": "2026-11-27T10:30:00+05:30", "end": "2026-11-27T11:30:00+05:30",
  "locationId": "hallA", "speakers": ["Name"], "status": "scheduled", "note": ""
}
```

- `locationId` must match an `id` in `locations.json`. A session with an unknown id shows no "Take me there" button.
- `status` is `scheduled`, `delayed`, `moved` or `cancelled`. `note` is free text shown under the session, for example `"Moved from Room 204."`.
- **Delayed sessions:** add `"delayMin": 15` (whole minutes). The app then counts down to the *expected* start and shows "Expected 14:45–16:15 IST (planned 14:30)". Without `delayMin`, only the note changes.
- Cancelled sessions drop out of Now/Next and lose their button.
- Parallel sessions: give them the same `start`. They show together as a list.
- The days list (`label`, `date`) drives the tabs. Add or remove days there.

**`locations.json`** has every place on the map: session buildings, food, registration and the guest house.

```json
{
  "id": "hallA", "name": "Auditorium", "category": "venue",
  "hint": "Block 11 · Floor 2",
  "entrance": { "lat": 30.0000, "lng": 78.0000 },
  "indoor": ["Enter through the glass doors.", "Take the lift to floor 2.", "The auditorium is on your left."],
  "tags": ["keynote", "hall"]
}
```

- `category` is one of `venue`, `registration`, `food`, `stay` (a place with any other category is not shown).
- **`entrance` is the lat/lng the map pins and routes to**, so use the door people should use, not the building's centre. Right-click the entrance in Google Maps and copy the coordinates. A place with `entrance: null` shows no map.
- `indoor` is optional. A list of short steps shown under the map; leave it as `[]` and the section is hidden. Include the stairs alternative and a sign to look for.
- The seven places in `locations.json` are the real campus places and coordinates. **The sessions in `schedule.json` are still sample data** (titles start with "(Sample)", and which room each is in is a placeholder). Replace them before the event.

## Edit the schedule during the event, and redeploy

1. Edit `public/data/schedule.json` (for example set `"status": "delayed"`, `"delayMin": 15` and a `note`).
2. Commit and push to `main`. Vercel rebuilds and redeploys in about a minute.
3. Open attendees' apps pick it up within about a minute. Nobody needs to reinstall anything.

`schedule.json` is fetched network-first and re-fetched every 60 seconds while the app is open, so changes show quickly. `locations.json` and the app itself are cached on the phone, so edits to those reach people on their next visit with network.

## Deploy on Vercel

The repository is ready for Vercel: `vercel.json` sets the build, the cache headers (`sw.js` and `data/*` are never cached by browsers, hashed `assets/*` are cached for a year) and basic security headers. `.vercelignore` keeps brand files, docs and `.env.local` out of uploads.

1. vercel.com → Add New → Project → import the GitHub repository.
2. Vercel detects Vite from `vercel.json`: install `npm ci`, build `npm run build`, output `dist`. Node 22 is pinned in `package.json`.
3. Before the first deploy, open **Settings → Environment Variables** and add `VITE_GOOGLE_MAPS_KEY` with your key, for Production (and Preview if you want maps on preview links). Then **Deploy**.
4. Your address is `https://<project>.vercel.app`. A custom domain can be added under Settings → Domains.
5. Add that address to the Maps key's allowed referrers (see "Google Maps key"), or the map shows "referrer not allowed".

Every push to `main` redeploys automatically, so editing `public/data/schedule.json` on GitHub and committing is enough to update the live schedule. The key is read at build time: after changing it in Vercel, redeploy.

Without the environment variable the app still builds and works; the location sheet just shows an "Open in Google Maps" link instead of the map.

## Google Maps key

The map on each location sheet is Google's Maps Embed API, which needs an API key. The key is visible in the app's code, so **restrict it** or anyone could use it.

1. Google Cloud Console → create a project → enable billing (Google requires it to issue a key; the Embed API itself has no usage charge, but check Google's current pricing page).
2. APIs & Services → Library → enable **Maps Embed API**.
3. Credentials → Create credentials → API key. Then edit it:
   - *Application restrictions*: HTTP referrers, and add your final address (for example `https://icmlde.example.com/*`) and `http://localhost:*/*` for testing.
   - *API restrictions*: Restrict key → **Maps Embed API** only.
4. Put the key in the build:
   - Local: copy `.env.example` to `.env.local` and set `VITE_GOOGLE_MAPS_KEY=...`, then restart `npm run dev`.
   - Vercel: add `VITE_GOOGLE_MAPS_KEY` under Settings → Environment Variables, then redeploy (the key is baked in at build time).
   - In the key's *HTTP referrers*, add `https://<project>.vercel.app/*` and any custom domain. Preview deployments use other `*.vercel.app` addresses; add `https://*.vercel.app/*` only if you want maps on previews too.

Without a key, or when the phone is offline, the sheet shows an "Open in Google Maps" link instead. If the map area shows a grey "API key is invalid" or "referrer not allowed" message, the key or its referrer list is wrong. The route needs the phone's location: the button asks once, when tapped, and nothing is stored.

## QR codes

Print only after you've settled the final address. Re-printing is expensive.

```
npm run qr -- https://your-final-address.example badge
```

This writes `qr/badge.png` (1200 px, for print) and `qr/badge.svg` (for standees). Scan it with a phone before sending it to the printer.

## Before the event

- [ ] Get a Google Maps key, restrict it, and set `VITE_GOOGLE_MAPS_KEY` (see "Google Maps key").
- [ ] Replace the sample sessions and locations.
- [ ] Add indoor steps for each place that needs them.
- [ ] Add the Nourd font files to `public/fonts/` as `Nourd-Regular.woff2` and `Nourd-Bold.woff2`. Until then the app uses Lexend. Convert `.otf`/`.ttf` to `.woff2` first.
- [ ] Replace `src/assets/logo.webp` with the real logo, then rebuild the icons (`python tools/make-assets.py` builds them from the banner, so adapt it to the real mark). The current logo and app icon are a rough crop from the banner.
- [ ] Deploy on Vercel, then open it on a real Android phone and an iPhone: install it, switch to airplane mode, reopen it.
- [ ] Test with a fake clock by adding `?now=2026-11-27T10:50:00%2B05:30` to the address. This works in any browser and shows each state of the Now card.
