# ICMLDE 5.0 Campus

The campus companion web app for **ICMLDE 5.0**, the 5th International Conference on Machine Learning and Data Engineering, held at **UPES, Dehradun, on 27–28 November 2026**.

Attendees scan a QR code on their badge and the app opens: what's on now, the full schedule, and a map with walking directions to every venue on campus. No login, no install, works offline once loaded.

**Live: [icmlde.vercel.app](https://icmlde.vercel.app)**

## Features

- **Now / Next.** The session running right now, or the next one, with its venue and a *Take me there* button. Handles parallel sessions, the time before the event, the gap between days and the end of the conference.
- **Schedule.** One tab per day, opening on today. Shows the sessions around the current one (3 on phones, 4 on desktop) with an option to see the whole day. Sessions can be marked *delayed*, *room changed* or *cancelled*.
- **Find a place.** Every venue, food spot and the guest house, grouped by category, with search.
- **In-app map.** Each place opens a Google Map pinned to its exact entrance coordinates, with walking directions from the visitor's location on request.
- **India time everywhere.** All times are computed and shown in IST, whatever timezone a visitor's phone is set to.
- **Offline-ready PWA.** Installable, and once loaded it keeps working without a connection, showing when the schedule was last updated.
- **Accessible.** WCAG AA contrast, large tap targets, screen-reader labels, and no state shown by colour alone. Lighthouse: 100 accessibility, 98+ performance on mobile.

## Tech stack

[Vite](https://vite.dev) · [React](https://react.dev) · TypeScript · [Tailwind CSS v4](https://tailwindcss.com) · [vite-plugin-pwa](https://vite-pwa-org.netlify.app) (Workbox) · [Lucide](https://lucide.dev) icons · Google Maps Embed API · [Vitest](https://vitest.dev). There is no backend: the schedule and places are two JSON files, and the site is fully static.

## Credits and licence

Built for ICMLDE 5.0 by the School of Computer Science, UPES.

No open-source licence has been chosen for the code yet, so it is all rights reserved for now. The ICMLDE and UPES names and logos, partner logos and the files in `Brand/` and `design-assets/` belong to their owners and are not licensed for reuse.
